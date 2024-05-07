import { RiFridgeLine } from "react-icons/ri";
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineFastfood } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import ThemeChanger from '../features/dashboard/ThemeChanger'

import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { useEffect } from "react";

const FOODS_REGEX = /^\/dash\/foods(\/)?$/

const PublicHeader = () => {

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) console.log('Success');
    // navigate('/')
  }, [isSuccess, navigate])

  const onLogoutClicked = () => sendLogout()

  // if (isLoading) return <p>Logging Out...</p>
  // if (isError) return <p>Error: {error.data?.message}</p>

  const logoutButton = (
    <button
      className="btn btn-sm rounded-md lg:my-0 bg-error"
      title="Logout"
      onClick={onLogoutClicked}
    >
      Logout
    </button>
  )

  const settingButton = (
    <button
      className="btn btn-sm rounded-md bg-primary"
      title="Setting"
      onClick={onLogoutClicked}
    >
      Setting
    </button>
  )

  return (
    <>
      <div className="navbar bg-base-100 rounded-xl shadow-md">
        <div className="flex-1">
          <div className="flex flex-row items-center">
            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} role="button" className="btn m-1 rounded-full lg:border-none lg:bg-base-100">
                <RiFridgeLine size={30} />
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52 ">
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
                      <p className="px-6">Home</p>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dash/foodLists"
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
                <li>
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
                </li>
                <li className="md:hidden my-2">
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
                      <p className="px-6">Profile</p>
                    </div>
                  </NavLink>
                </li>
                <div className="grid md:hidden my-2 gap-2">
                  {settingButton}
                  {logoutButton}
                </div>
              </ul>
            </div>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
              end
            >
              <p className="btn btn-ghost text-xl">foodTracker</p>
            </NavLink>

          </div>
        </div>

        <div className="flex-none gap-2">
          <ThemeChanger />

          <div className="form-control hidden md:block">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div>

          <div className="dropdown dropdown-end hidden md:block">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              {logoutButton}
            </ul>

          </div>
        </div>
      </div>
    </>
  )
}

export default PublicHeader