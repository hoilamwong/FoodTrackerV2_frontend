import React from 'react'
import { useAddNewFoodMutation } from './foodsApiSlice'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectAllFoods } from "../foods/foodsApiSlice"

const FOOD_REGEX = /^[0-9A-z ]{1,50}$/
const DATE_REGEX = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/

const NewFood = () => {
  const [addNewFood, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewFoodMutation()

  const foods = useSelector(state => selectAllFoods(state))

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [validName, setValidName] = useState(false)
  const [container, setContainer] = useState('Fridge')
  const [newContainer, setNewContainer] = useState('')
  const [validNewContainer, setValidNewContainer] = useState(false)
  const [quantity, setQuantity] = useState('')
  const [validQuantity, setValidQuantity] = useState(false)
  const [expiration, setExpiration] = useState('')
  const [validExpiration, setExpirationValid] = useState(false)
  const [description, setDescription] = useState('')
  const [user, setUser] = useState('65f2f87e3e1f9be50b885490')
  const [image, setImage] = useState('')
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
    setImageValid(image.includes('.png'))
    setValidNewContainer(!(newContainer.length > 0))
  }, [name, quantity, expiration, image, newContainer])

  useEffect(() => {
    if (isSuccess) {
      setName('')
      setContainer('')
      setQuantity('')
      setExpiration(null)
      setDescription('')
      setUser('')
      setImage('')
      navigate('/dash/foodLists')
    }
  }, [isSuccess, navigate])

  const onNameChanged = e => setName(e.target.value)
  const onQuantityChanged = e => setQuantity(e.target.value)
  const onDescriptionChanged = e => setDescription(e.target.value)
  const onExpirationChanged = e => setExpiration(e.target.value)
  const onContainerChanged = e => setContainer(e.target.value)
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
      await addNewFood({ name, container, quantity, expiration_date: expiration, description, user, image })
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
          <li><button>
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
              <button
                className="btn btn-sm float-right"
                onClick={onContainerAdded}
                disabled={validNewContainer}
              >
                Add Container
              </button>
            </div>
          </button></li>
        </ul>
      </div>
    )
  }

  return (
    <div className='px-8'>
      <p className={`${errClass} `}>{error?.data?.message}</p>
      <div className="text-3xl font-bold text-base-content mx-auto">
        Add New Food
      </div>

      <div className='flex justify-center mx-auto pt-8'>
        <form onSubmit={canSaveFoodClicked} className='text-xl font-medium text-base-content w-full'>

          <div className="md:grid md:grid-cols-3 flex flex-col-reverse gap-8 mb-8">
            <div>
              <div className={`rounded-2xl bg-base-300 basis-1/2 aspect-square p-4 w-72 mx-auto ${validImage ? '' : 'border border-error'}`}>
                {image ?
                  <img src={`http://localhost:3500/foodImages/${image}`}
                    alt="Food" className='w-full' />
                  : <p className='text-center'>No Icon Selected</p>
                }

              </div>

              <div>
                <div className='text-sm text-center py-2'>
                  {image ? image : <p>Select Icon Below</p>}
                </div>
                <div className='h-52 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 grid-flow-row overflow-y-auto my-6'>
                  {JSONResponse.map((image, index) => (
                    <button name={image} value={image} key={index} onClick={onFoodImageClicked}>
                      <img
                        alt={image} name={image} value={image}
                        src={'http://localhost:3500/foodImages/' + image}
                        className="w-full hover:border "
                      />
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div className='col-span-2'>
              <label htmlFor="name" className="block mb-2 text-sm font-medium ">
                Name of Food * <span className='text-base-content/50'>[3-20 letters]</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                placeholder="Lemonade"
                required
                onChange={onNameChanged}
                className={`mb-9 bg-base-300 text-base rounded-lg block  p-2.5
                w-4/6 placeholder:text-base-content/50 font-bold
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
                className={`mb-9 bg-base-300 text-base text-base-content rounded-lg block p-2.5 
                placeholder:text-base-content/50 w-4/6 md:w-1/2 font-bold
                ${validExpiration ? '' : 'border border-error'}`}
              />

              <label htmlFor="description" className="block mb-2 text-sm font-medium ">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                value={description}
                onChange={onDescriptionChanged}
                placeholder="Very sweet and sour >w<"
                className="mb-9 w-full md:w-3/4 bg-base-300 text-base text-base-content font-bold rounded-lg block p-2.5 placeholder:text-base-content/50"
              />

              <label htmlFor="container" className="block mb-2 text-sm font-medium ">
                Container
              </label>
              {foodContainerDropDown()}
              <hr className='mt-9 border-neutral shadow-md shadow-neutral' />
            </div>


          </div>

          <button
            title="Save"
            className='
              rounded-lg bg-success text-success-content px-6 py-3 my-6 text-base font-bold
              disabled:bg-error disabled:hover:bg-error disabled:cursor-not-allowed hover:bg-success  hover:-translate-y-1 hover:scale-110 transition-all ease-in-out delay-150
            '
            disabled={!canSave}
          >
            Save
          </button>
          <button
            title="Cancel"
            className='px-6 py-3 text-sm font-bold'
            onClick={() => navigate('/dash/foodLists')}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewFood