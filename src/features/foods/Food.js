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
      await deleteFood({ id: foodId })
    }

    // Parse Food Expiration Date to UTC timezone
    const parsed_date = new Date(food.expiration_date)
    const exp_weekday = parsed_date.toLocaleString('en-Us', { timeZone: 'UTC', weekday: 'short' })
    const exp_date = parsed_date.toLocaleString('en-Us', { timeZone: 'UTC' , year: 'numeric', month: '2-digit', day: '2-digit' })
    const parsed_exp_date = `${exp_date} (${exp_weekday})`

    // Set Expiration Indicator Color
    const expiration_color = food.days_until_expiration <= 0 ? 'bg-red-700/60'
      : food.days_until_expiration < 5 ? 'bg-orange-400'
        : food.days_until_expiration < 14 ? 'bg-yellow-400'
          : 'bg-green-600'

    return (
      <tr className="hover">
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>

        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={'http://localhost:3500/foodImages/' + food.image} alt={food.image} />
              </div>
            </div>
            <div>
              <div className="font-bold">{food.name}</div>
              <div className="text-sm opacity-50">{food.description}</div>
            </div>
          </div>
        </td>

        <td>
          <div className="flex items-center text-sm ">
            <div className={`h-2.5 w-2.5 rounded-full ${expiration_color} me-2`}></div> {food.days_until_expiration} day(s)
          </div>
          <span className="badge badge-ghost badge-sm">Exp: {parsed_exp_date}</span>
        </td>

        <td>
          {food.quantity}
        </td>

        <td>
          {food.container}
        </td>

        <th className="px-6 font-medium text-blue-500">
          <button className="pr-6 hover:underline" onClick={handleView}>View</button>
          <button className="pr-6 hover:underline" onClick={handleEdit}>Edit</button>
          <button className="pr-6 hover:underline text-red-700/60" onClick={onDeleteFoodClicked}>Delete</button>
        </th>

      </tr>
    )
  } else return null

}

export default Food