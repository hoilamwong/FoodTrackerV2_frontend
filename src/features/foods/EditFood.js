import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectFoodById } from "./foodsApiSlice"
import EditFoodForm from "./EditFoodForm"

const EditFood = () => {
  const { id } = useParams()
  const food = useSelector(state => selectFoodById(state, id))

  const content = food ? <EditFoodForm food={food} /> : <p>Loading...</p>

  return content
}

export default EditFood