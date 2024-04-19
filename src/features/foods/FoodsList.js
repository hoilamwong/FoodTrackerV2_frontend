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
      <div className="relative min-h-lvh px-8">
        <div className="text-3xl font-bold text-base-content mx-auto">
          <button onClick={() => navigate('/dash/foodLists')}>My Foods</button>
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

            <button
              className="btn btn-outline btn-secondary"
              type="button"
              onClick={() => navigate('/dash/foodLists/new')}
            >
              <span className="sr-only">Add New Food</span>
              Add Food
            </button>
          </div>
        </div>

        <div className="relative overflow-x-auto rounded-lg">
          <table className="table ">
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Name</th>
                <th>Days Until Expiration</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tableContent}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Days Until Expiration</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    )
  }


  return content
}

export default FoodsList