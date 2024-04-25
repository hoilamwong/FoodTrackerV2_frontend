import { Outlet } from "react-router-dom"
import { useSelector } from 'react-redux';
import { selectTheme } from "../features/auth/globalSlice";

const DashLayout = () => {
  const global = useSelector(selectTheme)
  const currentTheme = global?.theme
  return (
    <>
      <div data-theme={currentTheme} className="flex">
        <div className="w-full font-mono bg-base-200 h-screen">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default DashLayout