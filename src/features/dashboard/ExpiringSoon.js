import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectAllFoods } from "../foods/foodsApiSlice"

export const ExpiringSoonFood = ({ food }) => {
  const navigate = useNavigate()

  const handleView = () => navigate(`/dash/foodLists/${food._id}`)

  const expiration_color = food.days_until_expiration <= 0 ? 'bg-red-700/40'
    : food.days_until_expiration < 5 ? 'bg-orange-400'
      : food.days_until_expiration < 14 ? 'bg-yellow-400'
        : 'bg-green-600'

  return (
    <tr className="hover" onClick={handleView}>
      <th>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
          <img src={'http://localhost:3500/foodImages/' + food.image} alt={food.image} />
          </div>
        </div>
      </th>

      <td>
        {food.name}
      </td>
      <td>
        <div className="flex items-center text-sm ">
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
    :
    <tr>
      <th className="">No Foods in Inventory..</th>
      <th className="">N/A</th>
    </tr>

  const content = (
    <div className="overflow-x-auto ">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Expiring Soon (Top 5)</th>
            <th>Days Left</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    </div>
  )
  return content
}

export default ExpiringSoon