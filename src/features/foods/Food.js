import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFoodById, useDeleteFoodMutation } from "./foodsApiSlice";

const Food = ({ foodId }) => {
  const food = useSelector(state => selectFoodById(state, foodId))
  const navigate = useNavigate()

  const [deleteFood, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delError
  }] = useDeleteFoodMutation()

  if (food) {
    const handleView = () => navigate(`/dash/foodLists/${foodId}`)
    const handleEdit = () => navigate(`/dash/foodLists/${foodId}/edit`)
    const onDeleteFoodClicked = async () => {
      await deleteFood({ id: foodId})
    }

    // Parse Food Expiration Date
    const parsed_date = new Date(food.expiration_date)
    const exp_weekday = parsed_date.toLocaleString('en-Us', {weekday: 'short'})
    const exp_date = parsed_date.toLocaleString('en-Us', { year: 'numeric', month: '2-digit', day: '2-digit'})
    const parsed_exp_date = `${exp_date} (${exp_weekday})`

    // Set Expiration Indicator Color
    const expiration_color = food.days_until_expiration <= 0 ? 'bg-red-700/60'
      : food.days_until_expiration < 5 ? 'bg-orange-400'
        : food.days_until_expiration < 14 ? 'bg-yellow-400'
          : 'bg-green-600'

    return (
      <tr className="border-b dark:border-slate-600 hover:bg-indigo-700/10 dark:text-slate-200 hover:underline">
        <td className="w-4 p-4 ">
          <div className="flex items-center">
            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
          </div>
        </td>
        <th scope="row" className="flex items-center px-6 py-3 whitespace-nowrap">
          <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese" />
          <div className="ps-3">
            <div className="text-lg font-bold">{food.name}</div>
            <div className="font-normal text-gray-500 dark:text-slate-400 text-xs">Exp: {parsed_exp_date}</div>
          </div>
        </th>
        <td className="px-6">
          {food.quantity}
        </td>
        <td className="px-6">
          <div className="flex items-center">
            <div className={`h-2.5 w-2.5 rounded-full ${expiration_color} me-2`}></div> {food.days_until_expiration} day(s)
          </div>
        </td>
        <td className="px-6 font-medium text-blue-500">
          <button className="pr-6 hover:underline" onClick={handleView}>View</button>
          <button className="pr-6 hover:underline" onClick={handleEdit}>Edit</button>
          <button className="pr-6 hover:underline text-red-700/60" onClick={onDeleteFoodClicked}>Delete</button>
        </td>
      </tr>
    )
  } else return null

}

export default Food