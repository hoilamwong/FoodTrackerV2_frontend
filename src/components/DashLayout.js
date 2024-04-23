import { Outlet } from "react-router-dom"
import DashHeader from "./DashHeader"
import DashNavbar from "./DashNavbar"
import { useSelector } from 'react-redux';
import { selectTheme } from "../features/auth/globalSlice";

const DashLayout = () => {
  const global = useSelector(selectTheme)
  const currentTheme = global?.theme
  return (
    <>
      <div data-theme={currentTheme} className="flex">
        {/* <DashHeader /> */}

        <div className="w-full font-mono">
          <div className="justify-center fixed top-0 z-40 w-full p-3">
            {/* <DashNavbar /> */}
          </div>
          <div className=" pt-20  mt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashLayout