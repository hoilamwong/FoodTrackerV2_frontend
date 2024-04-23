import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineFastfood } from "react-icons/md";
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
    <div className="transition-transform -translate-x-full lg:translate-x-0 z-40 flex flex-col justify-between h-56 py-8 fixed top-20 w-64">
      <ul className="menu w-56 rounded-box mx-auto">
        <li>
          <h2 onClick={onGoHomeClicked} className="menu-title hidden lg:block">
            🥡🥡🥡
          </h2>

          <ul>
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

        </li>
      </ul>

      <div className="text-white text-base text-center h-fit">
        <p className="text-sm font-normal text-base-content/70 pt-14">
          {today}<br />
          {time}
        </p>
      </div>


    </div>
  )

  return content
}

export default DashHeader