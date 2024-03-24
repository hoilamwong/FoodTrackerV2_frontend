import { useGetUsersQuery } from "./usersApiSlice"
import User from "./User"
import { useNavigate } from "react-router-dom"

const UsersList = () => {

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery(null, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  const navigate = useNavigate()

  let content

  if (isLoading) content = <p>Loading...</p>
  if (isError) content = <p>{error?.data?.messge}</p>
  if (isSuccess) {
    const { ids } = users

    const tableContent = ids?.length
      ? ids.map(userId => <User key={userId} userId={userId} />)
      : null

    content = (
      <div className="">
        <div className="text-3xl font-bold text-slate-800 w-full pb-6">
          Users
        </div>
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4">
          <button 
            className="inline-flex items-center text-gray-500 bg-white/60 shadow-md border border-gray-200 
            hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5" 
            type="button"
            onClick={() => navigate('/dash/users/new')}
          >
            <span className="sr-only">Add New User</span>
            Add User
          </button>
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" className="block py-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50/50" placeholder="Search for username" />
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-xl rounded-lg bg-white">
          <table className="table-auto mx-auto w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-600/90 uppercase bg-indigo-800/20 ">
              <tr>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">Roles</th>
                <th className="px-6 py-3">Active</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {tableContent}
            </tbody>
          </table>
        </div>

      </div>

    )
  }
  return content
}

export default UsersList