import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { ROLES } from "../../config/roles"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {
  const [updateUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateUserMutation()


  const [deleteUser, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delError
  }] = useDeleteUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState(user.username)
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState(user.password)
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(user.roles)
  const [active, setActive] = useState(user.active)

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername('')
      setPassword('')
      setRoles([])
      navigate('/dash/users')
    }
  }, [isSuccess, isDelSuccess, navigate])

  const onUsernameChanged = e => setUsername(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)

  // If multiple roles can be selected
  const onRolesChanged = e => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      (option) => option.value
    )
    setRoles(values)
  }

  const onActiveChanged = () => setActive(prev => !prev)

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active })
    } else {
      await updateUser({ id: user.id, username, roles, active })
    }
  }

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id })
  }

  const onCancelActionClicked = () => {
    navigate('/dash/users')
  }

  const options = Object.values(ROLES).map(role => {
    return (
      <option
        key={role}
        value={role}

      > {role}</option >
    )
  })

  let canSave
  if (password) {
    canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading
  }

  const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
  const validUserClass = !validUsername ? 'border border-red' : ''
  const validPwdClass = password && !validPassword ? 'border border-red' : ''
  const validRolesClass = !Boolean(roles.length) ? 'border border-red' : ''

  const errContent = (error?.data?.message || delError?.data?.message) ?? ''

  const content = (
    <>
      <p className={`${errClass} `}>{errContent}</p>

      <form onSubmit={e => e.preventDefault()}>
        <h2 className="font-bold text-2xl text-gray-900">Edit Profile</h2>

        <div className="mb-5">
          <label className="font-medium text-gray-900" htmlFor="username">
            Username: [3-20 letters]</label>
          <div>
            <input
              className={`${validUserClass} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5`}
              id="username"
              name="username"
              type="text"
              autoComplete="off"
              value={username}
              onChange={onUsernameChanged}
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="font-medium text-gray-900">
            Password: [4-12 chars incl. !@#$%]</label>
          <div>
            <input
              className={`${validPwdClass} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5`}
              id="password"
              name="password"
              type="text"
              autoComplete="off"
              value={password}
              onChange={onPasswordChanged}
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="roles" className="font-medium text-gray-900">
            ASSIGNED ROLES:</label>
          <div>
            <select
              className={`${validRolesClass} `}
              id="roles"
              name="roles"
              multiple={true}
              size="4"
              value={roles}
              onChange={onRolesChanged}
            >
              {options}
            </select>
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="user-active" className="font-medium text-gray-900 pr-2">
            ACTIVE:
          </label>
          <input
              id="user-active"
              name="user-active"
              type="checkbox"
              checked={active}
              onChange={onActiveChanged}
              className="size-5"
            />
        </div>

        <button
          className="mb-5 rounded-3xl px-2 py-1 text-red-800 bg-red-300 hover:bg-red-400 shadow-sm text-sm font-semibold "
          title="Delete"
          onClick={onDeleteUserClicked}
        >
          Delete User
        </button>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            title="Cancel"
            onClick={onCancelActionClicked}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            title="Save"
            onClick={onSaveUserClicked}
            className="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm 
            bg-blue-700 disabled:bg-red-900/50 disabled:cursor-not-allowed
            hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={!canSave}
          >
            Save
          </button>
        </div>

      </form>
    </>
  )
  return content
}

export default EditUserForm