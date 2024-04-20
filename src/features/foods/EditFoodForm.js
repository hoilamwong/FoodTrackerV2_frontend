import { useDeleteFoodMutation, useUpdateFoodMutation, selectAllFoods, selectFoodById } from './foodsApiSlice'
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const FOOD_REGEX = /^[0-9A-z. ]{1,20}$/
const DATE_REGEX = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/

const EditFoodForm = () => {
  const { id } = useParams()

  const convertDate = (date) => {
    const parsed_date = new Date(date)
    const exp_weekday = parsed_date.toLocaleString('en-Us', { weekday: 'short' })
    const exp_date = parsed_date.toLocaleString('en-Us', { year: 'numeric', month: '2-digit', day: '2-digit' })
    const parsed_exp_date = `${exp_date} (${exp_weekday})`
    return parsed_exp_date
  }

  const [updateFood, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateFoodMutation()

  const [deleteFood, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delError
  }] = useDeleteFoodMutation()

  const foods = useSelector(state => selectAllFoods(state))
  const food = useSelector(state => selectFoodById(state, id))

  const navigate = useNavigate()

  const parsed_expiration = () => {
    const parsed_date = new Date(food.expiration_date)
    const actual_date = parsed_date.toISOString()
    const split_date = actual_date.split('T')[0]
    return split_date
  }

  const [name, setName] = useState(food.name)
  const [validName, setValidName] = useState(false)
  const [container, setContainer] = useState(food.container)
  const [newContainer, setNewContainer] = useState('')
  const [validNewContainer, setValidNewContainer] = useState(false)
  const [quantity, setQuantity] = useState(food.quantity)
  const [validQuantity, setValidQuantity] = useState(false)
  const [expiration, setExpiration] = useState(parsed_expiration())
  const [validExpiration, setExpirationValid] = useState(false)
  const [description, setDescription] = useState(food.description)
  const [user, setUser] = useState(food.user)
  const [newImage, setImage] = useState(food.image)
  const [validImage, setImageValid] = useState(false)

  const [JSONResponse, setJSONResponse] = useState([])

  // Fetch the filenames for all food images on load
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3500/foodImages');
      const jsonData = await response.json();
      setJSONResponse(jsonData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setValidName(FOOD_REGEX.test(name))
    setValidQuantity(FOOD_REGEX.test(quantity))
    setExpirationValid(DATE_REGEX.test(expiration))
    setImageValid(newImage.includes('.png'))
    setValidNewContainer(!(newContainer.length > 0))
  }, [name, quantity, expiration, newImage, newContainer])

  useEffect(() => {
    if (isSuccess) {
      setName('')
      setContainer('')
      setQuantity('')
      setExpiration(null)
      setDescription('')
      setUser('')
      setImage('')
      navigate(`/dash/foodLists/${id}`)
    }
  }, [isSuccess, navigate])

  const onNameChanged = e => setName(e.target.value)
  const onQuantityChanged = e => setQuantity(e.target.value)
  const onDescriptionChanged = e => setDescription(e.target.value)
  const onExpirationChanged = e => setExpiration(e.target.value)
  const onContainerChanged = e => {e.preventDefault(); setContainer(e.target.value)}
  const onFoodImageClicked = e => {
    e.preventDefault()
    setImage(e.target.name)
  }
  const onNewContainerChanged = e => {
    e.preventDefault()
    setNewContainer(e.target.value)
  }
  const onContainerAdded = () => {
    let newContainerValue = document.getElementById('newContainer').value
    setContainer(newContainerValue)
    setNewContainer('')
  }

  const canSave = [validName, validQuantity, validExpiration, validImage].every(Boolean) && !isLoading

  const canSaveFoodClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      await updateFood({ id: food.id, name, container, quantity, expiration_date: expiration, description, user, image: newImage })
    }
  }

  const errClass = isError ? "" : "hidden"
  const uniqueContainers = [...new Set(foods.map(food => food.container))]

  const foodContainerDropDown = () => {
    return (
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1">{container}</div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          {uniqueContainers.map(container => {
            return (
              <li
                id="container"
                name="container"
                key={container}
              >
                <button value={container} onClick={onContainerChanged}>{container}</button>
              </li >
            )
          })}
          <li><a>
            <div>
              <input
                id="newContainer"
                type="text"
                value={newContainer}
                placeholder="Snack Box"
                onChange={onNewContainerChanged}
                className={`bg-base-300 text-base rounded-lg block  p-2.5
              w-full placeholder:text-base-content/50 font-bold`}
              />
              <br />
              <input
                className="btn btn-sm float-right"
                onClick={onContainerAdded}
                disabled={validNewContainer}
                type='button'
                value='Add Container'
              />
            </div>
            </a></li>
        </ul>
      </div>
    )
  }

  const days_remaining = () => {
    const currentDate = new Date()
    const prevDate = new Date(expiration)
    const timeDiff = prevDate.getTime() - currentDate.getTime()
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return daysDiff
  }

  const expiration_color = days_remaining() <= 0 ? '-red-700/60'
    : days_remaining() < 5 ? '-orange-400'
      : days_remaining() < 14 ? '-yellow-400'
        : '-green-600'

  return (
    <div className='px-8'>
      <p className={`${errClass} `}>{error?.data?.message}</p>
      <div className="text-3xl font-bold text-base-content mx-auto">
        <button onClick={() => navigate('/dash/foodLists')}>My Foods&nbsp;</button> 
        > <button onClick={() => navigate(`/dash/foodLists/${id}`)}>{food.name}&nbsp;</button> 
        > Edit
      </div>

      <div className='flex justify-center mx-auto pt-8'>
        <form onSubmit={canSaveFoodClicked} className='text-xl font-medium text-base-content w-full'>

          <div className="md:grid md:grid-cols-3 flex flex-col-reverse gap-8 mb-8">
            <div>
              <div className='rounded-2xl bg-base-300 basis-1/2 aspect-square p-4 w-72 mx-auto'>
                <img
                  src={'http://localhost:3500/foodImages/' + newImage}
                  className="w-full"
                />
              </div>
              <div className='text-sm text-center py-2'>
                {newImage}
              </div>

              <div className='h-48 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 grid-flow-row overflow-y-auto my-6'>
                {JSONResponse.map((fileName, index) => (
                  <button name={fileName} value={fileName} key={index} onClick={onFoodImageClicked}>
                    <img
                      alt={fileName} name={fileName} value={fileName}
                      src={'http://localhost:3500/foodImages/' + fileName}
                      className="w-full hover:border "
                    />
                  </button>
                ))}
              </div>

            </div>

            <div className='col-span-2'>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Name of Food * <span className='text-base-content/50'>[3-20 letters]</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                placeholder="Lemonade"
                required
                onChange={onNameChanged}
                className={`mb-6 bg-base-300 text-base rounded-lg block p-2.5
                w-full placeholder:text-base-content/50 font-bold
                ${validName ? '' : 'border border-error'}`}
              />

              <label htmlFor="quantity" className="block mb-2 text-sm font-medium">
                Quantity *
              </label>
              <input
                id="quantity"
                type="text"
                value={quantity}
                placeholder="1 big bottle"
                required
                onChange={onQuantityChanged}
                className={`mb-9 bg-base-300 text-base text-base-content rounded-lg block p-2.5 
                placeholder:text-base-content/50 w-4/6 md:w-1/2 font-bold
                ${validQuantity ? '' : 'border border-error'}`}
              />

              <label htmlFor="expiration" className="block mb-2 text-sm font-medium">
                Expiration Date *
              </label>
              <input
                id="expiration"
                type="date"
                value={expiration}
                onChange={onExpirationChanged}
                required
                className={`bg-base-300 text-base text-base-content rounded-lg block p-2.5 
                placeholder:text-base-content/50 w-4/6 md:w-1/2 font-bold
                ${validExpiration ? '' : 'border border-error'}`}
              />
              <div htmlFor="description" className="flex items-center text-sm font-medium text-base-content mb-6 mt-1">
                <div className={`h-2.5 w-2.5 rounded-full bg${expiration_color} me-2`}></div> {days_remaining()} day(s) left
              </div>


              <label htmlFor="description" className="block mb-2 text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                value={description}
                onChange={onDescriptionChanged}
                placeholder="No description yet..."
                className="mb-9 w-full md:w-3/4 bg-base-300 text-base text-base-content font-bold rounded-lg block p-2.5 placeholder:text-base-content/50"
              />

              <label htmlFor="container" className="block mb-2 text-sm font-medium">
                Container
              </label>
              {foodContainerDropDown()}

              <div htmlFor="description" className="block text-sm font-medium text-base-content pt-4">
                Author: {food.username}
              </div>
              <div htmlFor="description" className="block text-sm font-medium text-base-content">
                Created On: {convertDate(food.createdAt)}
              </div>
              <div htmlFor="description" className="block text-sm font-medium text-base-content">
                Last Updated: {convertDate(food.updatedAt)}
              </div>
              <hr className='border-neutral mt-4' />

            </div>


          </div>

          <button
            title="Save"
            className='
              rounded-lg bg-success px-6 py-3 my-6 lg:text-sm font-bold
              disabled:bg-error disabled:hover:bg-error disabled:cursor-not-allowed hover:-translate-y-1 hover:scale-110 transition-all ease-in-out delay-150
            '
            disabled={!canSave}
          >
            Save
          </button>
          <button
            title="Cancel"
            className='px-6 py-3 lg:text-sm font-bold'
            onClick={() => navigate(`/dash/foodLists/${id}`)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditFoodForm