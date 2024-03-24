import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineFastfood } from "react-icons/md";
import { RiFridgeLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";

const DashHeader = () => {

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onGoHomeClicked = () => navigate('/dash')

  let goHomeButton = null
  if (pathname !== '/dash') {
    goHomeButton = (
      <button
        title="Dash Home"
        onClick={onGoHomeClicked}
      >
        Home
      </button>
    )
  }

  const date = new Date()
  const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(date)
  const time = new Intl.DateTimeFormat('en-US', { timeStyle: 'long' }).format(date)

  const content = (
    <div className="flex flex-col justify-between bg-indigo-950/20 dark:bg-[#222338] min-h-screen py-8 font-semibold border-r border-[#3d3f5e] shadow-md shadow-[#3d3f5e] font-mono">
      <div className="font-extrabold text-white text-2xl text-center h-fit">
        <button
          title="Dash Home"
          onClick={onGoHomeClicked}
        >
          <div className="flex flex-row items-center justify-center">
            <div className="flex items-center justify-center p">
              <RiFridgeLine size={60} />
            </div>
            <span className="hidden lg:block">
              Fridge<br />Tracker
            </span>
          </div>

        </button>

        <div className="text-white mt-12 flex items-center">
          <nav id="sidebar" className="grid gap-10 text-base mx-auto">
            <NavLink
              to="/dash"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
              end
            >
              <div className="flex flex-row items-center">
                <div className="flex items-center justify-center p">
                  <HiOutlineHome size={35} />
                </div>
                <p className="px-6 hidden md:flex">Home</p>
              </div>
            </NavLink>

            <NavLink
              to="/dash/foodLists"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              <div className="flex flex-row items-center">
                <MdOutlineFastfood size={30} />
                <p className="px-6 hidden md:flex">My Foods</p>
              </div>
            </NavLink>

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
                <p className="px-6 hidden md:flex">Users</p>
              </div>
            </NavLink>

          </nav>
        </div>

      </div>



      <div className="text-white text-base text-center h-fit">
        {/* <button className="bg-indigo-950/70 dark:bg-indigo-900/90 border-4 w-full border-indigo-950/20 lg:rounded-3xl lg:w-4/6 py-1">
          LogOut
        </button> */}
        <p className="text-sm font-semibold text-indigo-200 pt-14">
          {today}<br />
          {time}
        </p>
      </div>


    </div>
  )

  return content
}

export default DashHeader