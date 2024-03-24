import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";

const User = ({ userId }) => {
  const user = useSelector(state => selectUserById(state, userId))

  const navigate = useNavigate()

  if (user){
    const handleEdit = () => navigate(`/dash/users/${userId}`)

    const userRolesString = user.roles.length?  user.roles.toString().replaceAll(',', ', ') : 'none'

    const cellStatusColor = user.active ? 'text-green-700' : 'text-red-200'
    const cellStatus = user.active ? 'active' : ''

    return (
      <tr className="border-b hover:bg-indigo-700/10 ">
        <td className="w-4 px-6 py-1 text-base font-bold">{user.username}</td>
        <td className="w-4 px-6">{userRolesString}</td>
        <td className={`${cellStatusColor} w-4 px-6`}>{cellStatus}</td>
        <td className="w-4 px-6 text-blue-500 font-medium">
          <button onClick={handleEdit}> Edit </button>
        </td>
      </tr>
    )

  } else return null
}

export default User