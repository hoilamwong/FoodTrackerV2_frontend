import { RiFridgeLine } from "react-icons/ri";
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineFastfood } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import ThemeChanger from '../features/dashboard/ThemeChanger'

import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react";

const FOODS_REGEX = /^\/dash\/foods(\/)?$/

const PublicHeader = () => {

  const navigate = useNavigate()
  const { pathname } = useLocation()


  return (
    <>
      <div className="navbar bg-base-100 rounded-xl shadow-md">
        <div className="flex-1">
          <div className="flex flex-row items-center">
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="btn m-1 rounded-full lg:border-none lg:bg-base-100">
                <RiFridgeLine size={30} />
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow glass rounded-box w-52 ">
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
              </ul>
            </div>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
              end
            >
              <p className="btn btn-ghost text-xl">PixelPantry</p>
            </NavLink>

          </div>
        </div>

        <div className="flex-none gap-2">
          <ThemeChanger />
        </div>
      </div>
    </>
  )
}

export default PublicHeader