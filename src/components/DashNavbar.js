import React from 'react'
import ThemeChanger from '../features/dashboard/ThemeChanger'
import { RiFridgeLine } from "react-icons/ri";
import { NavLink, useNavigate } from 'react-router-dom';
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineFastfood } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import DashHeader from './DashHeader';

const DashNavbar = () => {

  const navigate = useNavigate()


  return (
    <>
      <div className="navbar bg-base-200 rounded-full shadow-xl">
        <div className="flex-1">
          <div className="flex flex-row items-center">
            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} role="button" className="btn m-1 lg:bg-base-100 lg:border-none">
                <RiFridgeLine size={30} />
              </div>
              <ul tabIndex={0} className="lg:hidden dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52">
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
              </ul>
            </div>
            <NavLink
              to="/dash"
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
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div>
          <div className="dropdown dropdown-end">
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
              <li><a>Logout</a></li>
            </ul>

          </div>
        </div>
      </div>
    </>
  )
}

export default DashNavbar