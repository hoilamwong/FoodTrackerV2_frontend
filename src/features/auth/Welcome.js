import { Link } from "react-router-dom"
import ExpiringSoon from "../dashboard/ExpiringSoon"
import { useGetFoodsQuery } from "../foods/foodsApiSlice"
import DonutChart from "../dashboard/DonutChart"

const Welcome = () => {
  const {
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetFoodsQuery()


  let status
  if (isLoading) status = <p>Fetching Foods...</p>
  if (isError) status = <p>{error?.data?.messge}</p>
  if (isSuccess) status = <p>Fetch Food Succesfully</p>

  const content = (
    <div className="min-h-screen md:w-full lg:w-4/5">
      <div className="text-3xl font-bold text-slate-900 w-full pb-6 dark:text-white">
        Overview
      </div>

      <div className="grid lg:grid-cols-3 lg:gap-8 gap-4 my-4
        ">
        <div className="bg-white dark:bg-[#26273b] rounded-3xl h-fit shadow-md">
          <DonutChart />
        </div >
        <div className="bg-white dark:bg-[#26273b] rounded-3xl h-full shadow-md p-6">
          Something
        </div>
        <div className="bg-indigo-800/30 dark:bg-[#26273b] rounded-3xl h-full shadow-md p-6">
          Food Saved
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ExpiringSoon />
        <div className="bg-white dark:bg-indigo-200/60 rounded-3xl h-full shadow-md p-6">
          Expired Items
        </div>
      </div>

      <div className="bg-white dark:bg-indigo-200/10 rounded-3xl h-80 shadow-md my-4">

      </div>

      <div className="bg-indigo-900/40 shadow-md rounded-lg p-2 w-fit fixed bottom-5 right-5">
        Status: {status}
      </div>
    </div>
  )
  return content
}

export default Welcome