import { Outlet } from "react-router-dom"
import DashHeader from "./DashHeader"

const DashLayout = () => {
  return (
    <>
      <div className="min-h-screen flex">
        <div className="w-[15%]">
          <div className="w-[15%] fixed top-0">
            <DashHeader />
          </div>
        </div>

        <div className="w-[85%] bg-yellow-100/10 dark:bg-[#1b1c31] p-4 py-10 lg:px-8 font-mono">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default DashLayout