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
            <div className="dropdown dropdown-hover text-base-neutral-content/10 text-sm px-4">
              <button tabIndex={0} role="button" className="inline-flex items-center">
                Expiration
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              <ul tabIndex={0} className="dropdown-content z-[1] menu md:p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
              </ul>
            </div>
            <div className="dropdown dropdown-hover text-base-neutral-content/10 text-sm px-4">
              <button tabIndex={0} role="button" className="inline-flex items-center">
                Container
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              <ul tabIndex={0} className="dropdown-content z-[1] menu md:p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
              </ul>
            </div>

            <button
              className="btn btn-sm btn-outline btn-secondary"
              type="button"
              onClick={() => navigate('/dash/foodLists/new')}
            >
              <span className="sr-only">Add New Food</span>
              Add Food
            </button>
          </div>
        </div>

        <div className="relative overflow-x-auto rounded-lg">
          <table className="table table-xs lg:table-md">
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
                <th>Container</th>
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
                <th>Container</th>
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