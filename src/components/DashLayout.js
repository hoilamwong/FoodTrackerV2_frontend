import { Outlet } from "react-router-dom"
import { useSelector } from 'react-redux';
import { selectTheme } from "../features/auth/globalSlice";
import DashSideBar from "./DashSideBar"

const DashLayout = () => {
  const global = useSelector(selectTheme)
  const currentTheme = global?.theme
  return (
    <>
      <div data-theme={currentTheme} className="flex">

        <div className="w-full font-mono bg-base-200 ">
          <DashSideBar />
          <div className="lg:pl-64">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashLayout