import { Link } from "react-router-dom"
import ExpiringSoon from "../dashboard/ExpiringSoon"
import { useGetFoodsQuery } from "../foods/foodsApiSlice"
import DonutChart from "../dashboard/DonutChart"
import ThemeChanger from "../dashboard/ThemeChanger"
import { useSelector } from "react-redux"
import { selectAllFoods } from "../foods/foodsApiSlice";

const Welcome = () => {
  const {
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetFoodsQuery()

  const allFoods = useSelector(state => selectAllFoods(state))

  const expiringFoodPercentage = ((allFoods.filter(food => food.days_until_expiration <= 5).length / allFoods.length) * 100).toFixed(2) 

  let status
  if (isLoading) status = <p>Fetching Foods...</p>
  if (isError) status = <p>{error?.data?.messge}</p>
  if (isSuccess) status = <p>Fetch Food Succesfully</p>

  const content = (
    <div className="min-h-screen md:w-full p-3 bg-base-200">

      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 lg:gap-8 gap-4">

        <div className="card col-span-3 lg:col-span-2 card-side bg-base-100 shadow">
          <figure className="w-4/5">
            <DonutChart />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{expiringFoodPercentage}% of items are <br/>expiring soon / expired!</h2>
            <p>Click the button to view a list of food in your storage.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-accent">View Items</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow image-full">
          <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
          <div className="card-body">
            <h2 className="card-title">Foods!</h2>
            <p>Start Managing Your Storage</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Add Food</button>
            </div>
          </div>
        </div>

        <div className="card glass shadow">
          <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" /></figure>
          <div className="card-body">
            <h2 className="card-title">Life hack</h2>
            <p>How to park your car at your garage?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Learn now!</button>
            </div>
          </div>
        </div>

        {/* <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total Items:</h2>
            <p>Good:</p>
            <p>Expire Soon:</p>
            <p>Spoiled:</p>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Last Update:</h2>
            <p>Date:</p>
            <p>Item Name:</p>
            <p></p>
          </div>
        </div>

        <div className="card bg-base-300 shadow-xl col-span-3 lg:col-span-2">
          <div className="card-body">
            <h2 className="card-title">Some Graph</h2>
            <p>Timeline graph</p>
          </div>
        </div> */}
        {/* <div className="card bg-base-300 shadow-xl col-span-2 lg:col-span-4">
          <div className="card-body">
            <h2 className="card-title">Some Graph</h2>
            <p>Timeline graph</p>
          </div>
        </div> */}
      </div>
      <div className="w-full stats shadow bg-base-300 my-4">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </div>
          <div className="stat-title">Total Items</div>
          <div className="stat-value text-primary">25</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </div>
          <div className="stat-value">2</div>
          <div className="stat-title">Expiring Food</div>
          <div className="stat-desc text-secondary">3% food expiring</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <div className="stat-title">Last Clean Out </div>
          <div className="stat-value text-secondary">203 Days Ago</div>
          <div className="stat-desc">Should Clean Your Storage Soon!</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ExpiringSoon />
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Some Graph</h2>
            <p>Timeline graph</p>
          </div>
        </div>
      </div>

      <div className="bg-neutral/50 shadow-md rounded-lg p-2 w-fit fixed bottom-5 right-5">
        Status: {status}
      </div>
    </div>
  )
  return content
}

export default Welcome