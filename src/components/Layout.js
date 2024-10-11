import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import DashSideBar from "./DashSideBar"
import PublicHeader from "./PublicHeader";
import { selectTheme } from "../features/auth/globalSlice";

const Layout = () => {
  const global = useSelector(selectTheme)
  const currentTheme = global?.theme
  return (
    <>
      <div data-theme={currentTheme} className="flex justify-center h-screen bg-base-200 ">
        <div className="fixed top-0 z-40 w-5/6 lg:w-3/6 min-w-fit px-2 py-4">
          <PublicHeader />
        </div>

        <div className="w-full font-mono bg-base-300">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout