import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectAllFoods } from "../foods/foodsApiSlice"

export const ExpiringSoonFood = ({ food }) => {
  const navigate = useNavigate()

  const handleView = () => navigate(`/dash/foods/${food._id}`)

  const expiration_color = food.days_until_expiration <= 0 ? 'bg-red-700/40'
    : food.days_until_expiration < 5 ? 'bg-orange-400'
      : food.days_until_expiration < 14 ? 'bg-yellow-400'
        : 'bg-green-600'

  return (
    <tr className="border-b hover:bg-indigo-700/20 cursor-pointer" onClick={handleView}>
      <th scope="row" className="flex items-center px-4 py-4 text-indigo-900 whitespace-nowrap">
        <img className="w-10 h-5 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese" />
        <div className="ps-3">
          <div className="text-base font-semibold dark:text-slate-300">{food.name}</div>
        </div>
      </th>
      <td className="px-6 py-4">
        <div className="flex items-center text-slate-600 dark:text-slate-800 text-sm">
          <div className={`h-2.5 w-2.5 rounded-full ${expiration_color} me-2 `}></div>{food.days_until_expiration} day(s)
        </div>
      </td>
    </tr>
  )
}

const ExpiringSoon = () => {
  const foods = useSelector(state => selectAllFoods(state))
  const limitedFoods = foods.slice(0, 5) // Only get Top 5 
  const tableContent = limitedFoods.length
    ? limitedFoods.map(food => <ExpiringSoonFood key={food._id} food={food} />)
    : <tr>
      <th className="px-6 py-3">No Foods in Inventory..</th>
      <th className="px-6 py-3">N/A</th>
    </tr>

  const content = (
    <div className="relative overflow-x-auto shadow-xl rounded-2xl">
      <table className="w-full text-left rtl:text-right ">
        <thead className="text-xs text-white uppercase bg-indigo-800/30 dark:bg-indigo-200/10">
          <tr>
            <th scope="col" className="px-6 py-3 ">
              Expiring Soon (Top 5)
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Days Left
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-50/30 dark:bg-indigo-200/40">
          {tableContent}
        </tbody>
      </table>
    </div>
  )
  return content
}

export default ExpiringSoon