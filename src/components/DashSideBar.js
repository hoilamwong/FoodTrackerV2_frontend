import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineFastfood } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom"

import { useSendLogoutMutation } from "../features/auth/authApiSlice";

const DashSideBar = () => {

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const date = new Date()

  const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);

  const parts = dateTimeFormat.formatToParts(date);
  const partValues = parts.map((p) => p.value);

  console.log(parts[0]);

  const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date)
  const time = new Intl.DateTimeFormat('en-US', { timeStyle: 'medium' }).format(date)

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation()

  const onLogoutClicked = () => sendLogout()

  const logoutButton = (
    <button
      className="bottom-0 btn btn-sm rounded-md lg:my-0 bg-error/50"
      title="Logout"
      onClick={onLogoutClicked}
    >
      Logout
    </button>
  )

  const profile = (<div className="flex flex-col justify-center items-center">
    <div className="h-44 bg-neutral rounded-lg aspect-square ">
    </div>
    <button className="btn btn-sm bg-base-100 w-3/4 rounded-full my-4 text-xs">
      Profile
    </button>
  </div>)

  const content = (
    <div className="transition-transform -translate-x-full lg:translate-x-0 z-20 h-screen bg-base-200 px-3 fixed w-64 flex flex-col justify-between py-6">
      {/* {profile} */}
      <div>

        <div className="grid gap-4 grid-cols-1 mt-5">
          <ul className="menu text-base">
            <li>
              <NavLink
                to="/dash"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
                end
              >
                <div className="flex flex-row items-center">
                  <div className="flex">
                    <HiOutlineHome size={30} />
                  </div>
                  <p className="px-6">Dashboard</p>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dash/foodLists/"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                <div className="flex flex-row items-center">
                  <MdOutlineFastfood size={30} />
                  <p className="px-6 ">My Foods</p>
                </div>
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/dash/users"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                <div className="flex flex-row items-center">
                  <div className="flex flex-row items-center">
                    <FaRegUser size={30} />
                  </div>
                  <p className="px-6">Users</p>
                </div>
              </NavLink>
            </li> */}
          </ul>
        </div>

        <div className="grid grid-cols-3 justify-center">
          <button 
            className="btn btn-square btn-secondary btn-outline m-3"
            onClick={() => navigate('/dash/foodLists/new')}
          >
            Add Food
          </button>
          <button className="btn btn-square btn-primary btn-outline m-3">
            Scan
          </button>
        </div>
      </div>

      <div className="flex flex-col text-xs">
        <div className="mb-2">
          <div>
            {partValues[0]}
          </div>
          <div>
            {today}
          </div>
          <div>
            {time}
          </div>
        </div>
        {logoutButton}
      </div>
    </div>
  )

  console.log(partValues);
  return content
}

export default DashSideBar