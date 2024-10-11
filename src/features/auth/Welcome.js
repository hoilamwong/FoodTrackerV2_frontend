import { Link } from "react-router-dom"
import ExpiringSoon from "../dashboard/ExpiringSoon"
import { useGetFoodsQuery } from "../foods/foodsApiSlice"
import DonutChart from "../dashboard/DonutChart"
import ThemeChanger from "../dashboard/ThemeChanger"
import { useSelector } from "react-redux"
import { selectAllFoods } from "../foods/foodsApiSlice";

import { FaBoxOpen } from "react-icons/fa6";
import { PiBroomBold } from "react-icons/pi";

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
    <div className="min-h-screen  md:w-full p-3 bg-base-200 ">

      <div className="mt-28 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 lg:gap-8 gap-4">

        <div className="card col-span-3 lg:col-span-2 card-side bg-base-300 shadow">
          <figure className="w-4/5">
            <DonutChart />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{expiringFoodPercentage}% of items are <br />expiring soon / expired!</h2>
            <p>Click the button to view a list of food in your storage.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-accent bg-accent/70">View Items</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow image-full">
          {/* <figure><img src="https://www.foodhygienecompany.co.uk/wp-content/uploads/sites/4/2019/06/bigstock-158368310-1024x683.jpg" alt="Shoes" /></figure> */}

          <div className="card-body">
            <h2 className="card-title">Food Management</h2>
            <p>Managing food storage efficiently is key to reducing waste, saving money, and ensuring you always have what you need for meals.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary bg-primary/70">Add New Item</button>
            </div>
          </div>
        </div>

        {/* Scan Barcode */}
        <div className="card glass shadow">
          <figure><img src="https://media.istockphoto.com/id/660681512/photo/fresh-organic-tomatoes-inside-of-market-package-with-bar-code-label.jpg?s=2048x2048&w=is&k=20&c=4YUAjOWATmRGFbvjqcBbQtrDD081mUj6DJPLhxR8Uks=" alt="car!" /></figure>
          <div className="card-body">
            <h2 className="card-title">Barcode Scanning</h2>
            <div class="badge badge-secondary badge-outline">new feature</div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary bg-primary/70">Scan Item</button>
            </div>
          </div>
        </div>

      </div>
      <div className="w-full stats shadow bg-base-300 my-4">
        <div className="stat">
          <div className="stat-figure text-primary">
            <FaBoxOpen size={40} />
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
            <PiBroomBold size={38} />
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> */}
          </div>
          <div className="stat-title">Last Clean Out </div>
          <div className="stat-value text-secondary">203 Days Ago</div>
          <div className="stat-desc">Should Clean Your Storage Soon!</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 h-72">
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