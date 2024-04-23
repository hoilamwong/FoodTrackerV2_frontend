import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import DashHeader from "./DashHeader"
import PublicHeader from "./PublicHeader";
import { selectTheme } from "../features/auth/globalSlice";

const Layout = () => {
  const global = useSelector(selectTheme)
  const currentTheme = global?.theme
  return (
    <>
      <div data-theme={currentTheme} className="flex">
        <DashHeader />
        
        <div className="w-full font-mono ">
          <div className="justify-center fixed top-0 z-40 w-full p-3">
            <PublicHeader />
          </div>
          <div className="lg:pl-64 pt-20 mt-4 h-screen">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout