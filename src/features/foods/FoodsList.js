import { useGetFoodsQuery } from "./foodsApiSlice"
import Food from "./Food"
import { useNavigate } from "react-router-dom"

const FoodsList = () => {

  const navigate = useNavigate()

  const {
    data: foods,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetFoodsQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let content

  if (isLoading) content = <p>Loading...</p>
  if (isError) content = <p>{error?.data?.messge}</p>

  if (isSuccess) {
    const { ids } = foods

    const tableContent = ids?.length
      ? ids.map(foodId => <Food key={foodId} foodId={foodId} />)
      : null

    content = (
      <div className="relative">
        <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 w-full pb-6">
          My Foods
        </div>

        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4">
          <div>
            <button id="sortDrowndownButton" data-dropdown-toggle="sortDropdown" className="inline-flex items-center text-gray-500 hover:text-white font-medium rounded-lg text-sm px-3 py-1.5" type="button">
              <span className="sr-only">Container button</span>
              Sort
              <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <button className="inline-flex items-center text-gray-500 hover:text-white font-medium rounded-lg text-sm px-3 py-1.5" type="button">
              <span className="sr-only">Container button</span>
              Filter
              <svg className="w-2.5 h-2.5 ms-2.5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <button className="inline-flex items-center text-gray-500 hover:text-white font-medium rounded-lg text-sm px-3 py-1.5" type="button">
              <span className="sr-only">Container button</span>
              Show
              <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            {/* DropDown Menu */}
            <div id="sortDropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                </li>
              </ul>
            </div>
            
<button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

<div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
      </li>
    </ul>
</div>


            <button
              className="mx-2 inline-flex items-center text-slate-200 bg-[#4f46bb] shadow-sm shadow-[#4f46bb] border-gray-200 hover:bg-[#675fbe] font-bold rounded-lg text-sm px-3 py-1.5
              hover:-translate-y-1 hover:scale-110 transition-all ease-in-out delay-150"
              type="button"
              onClick={() => navigate('/dash/foodLists/new')}
            >
              <span className="sr-only">Add New Food</span>
              Add Food
            </button>
          </div>

          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative dark:text-slate-200">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" className="block py-1 ps-10 text-sm text-gray-900 dark:text-slate-200 rounded-lg w-80 bg-[#26273b]" placeholder="Search for food" />
          </div>
        </div>

        <div className="relative overflow-x-auto rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">

            <thead className="text-xs text-gray-600/90 uppercase border-b ">
              <tr className="dark:text-slate-300">
                {/* check box */}
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Days Until Expire
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="">
              {tableContent}
            </tbody>
          </table>
          <p className="text-slate-500 pt-2">end of list . . .</p>
        </div>
      </div>
    )
  }


  return content
}

export default FoodsList