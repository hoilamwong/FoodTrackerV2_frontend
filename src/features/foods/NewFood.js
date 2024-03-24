import React from 'react'
import { useAddNewFoodMutation } from './foodsApiSlice'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectAllFoods } from "../foods/foodsApiSlice"

const FOOD_REGEX = /^[0-9A-z ]{1,20}$/
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
  const [quantity, setQuantity] = useState('')
  const [validQuantity, setValidQuantity] = useState(false)
  const [expiration, setExpiration] = useState('')
  const [validExpiration, setExpirationValid] = useState(false)
  const [description, setDescription] = useState('')
  const [user, setUser] = useState('65f2f87e3e1f9be50b885490')

  useEffect(() => {
    setValidName(FOOD_REGEX.test(name))
    setValidQuantity(FOOD_REGEX.test(quantity))
    setExpirationValid(DATE_REGEX.test(expiration))
  }, [name, quantity, expiration])

  useEffect(() => {
    if (isSuccess) {
      setName('')
      setContainer('')
      setQuantity('')
      setExpiration(null)
      setDescription('')
      setUser('')
      navigate('/dash/foodLists')
    }
  }, [isSuccess, navigate])

  const onNameChanged = e => setName(e.target.value)
  const onQuantityChanged = e => setQuantity(e.target.value)
  const onDescriptionChanged = e => setDescription(e.target.value)
  const onExpirationChanged = e => setExpiration(e.target.value)
  const onContainerChanged = e => setContainer(e.target.value)

  const canSave = [validName, validQuantity, validExpiration].every(Boolean) && !isLoading

  const canSaveFoodClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewFood({ name, container, quantity, expiration_date: expiration, description, user })
    }
  }

  const errClass = isError ? "" : "hidden"

  const uniqueContainers = [...new Set(foods.map(food => food.container))]
  const options = uniqueContainers.map(container => {
    return (
      <option
        key={container}
        value={container}
      > {container}</option >
    )
  })

  return (
    <>
      <p className={`${errClass} `}>{error?.data?.message}</p>
      <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 pb-6 lg:pb-16 w-5/6 mx-auto">
        Add New Food
      </div>

      <div className='flex justify-center w-5/6 mx-auto'>
        <form onSubmit={canSaveFoodClicked} className='text-xl font-medium dark:text-slate-300 w-full'>

          <div className="md:grid md:grid-cols-3 flex flex-col-reverse gap-8 mb-8">
            <div className='rounded-2xl bg-[#26273b] border border-gray-600 shadow-2xl basis-1/2 aspect-square p-4'>
              Some Image
            </div>

            <div className='col-span-2'>
              <label htmlFor="name" className="block mb-2 lg:text-sm font-medium text-gray-900 dark:text-white">
                Name of Food * <span className='text-gray-500'>[3-20 letters]</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                placeholder="Lemonade"
                required
                onChange={onNameChanged}
                className={`mb-9 bg-[#26273b] border border-gray-300 text-gray-900 lg:text-sm rounded-lg block  p-2.5
                w-full md:w-4/6
               dark:placeholder-gray-400 dark:text-white
                ${validName ? 'border-gray-600' : 'border-red-500'}`}
              />

              <label htmlFor="quantity" className="block mb-2 lg:text-sm font-medium text-gray-900 dark:text-white">
                Quantity *
              </label>
              <input
                id="quantity"
                type="text"
                value={quantity}
                placeholder="1 big bottle"
                required
                onChange={onQuantityChanged}
                className={`mb-9 bg-[#26273b] border border-gray-300 text-gray-900 lg:text-sm rounded-lg block p-2.5 
               dark:placeholder-gray-400 dark:text-white w-4/6 md:w-1/2
                ${validQuantity ? 'border-gray-600' : 'border-red-500'}`}
              />

              <label htmlFor="expiration" className="block mb-2 lg:text-sm font-medium text-gray-900 dark:text-white">
                Expiration Date *
              </label>
              <input
                id="expiration"
                type="date"
                value={expiration}
                onChange={onExpirationChanged}
                required
                className={`mb-9 bg-[#26273b] border border-gray-300 text-gray-900 lg:text-sm rounded-lg block p-2.5 
               dark:placeholder-gray-400 dark:text-white w-4/6 md:w-1/2
                ${validExpiration ? 'border-gray-600' : 'border-red-500'}`}
              />

              <label htmlFor="description" className="block mb-2 lg:text-sm font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                value={description}
                onChange={onDescriptionChanged}
                placeholder="Very sweet and sour >w<"
                className="mb-9 w-full md:w-3/4 bg-[#26273b] border border-gray-300 text-gray-900 lg:text-sm rounded-lg block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />

              <label htmlFor="container" className="block mb-2 lg:text-sm font-medium text-gray-900 dark:text-white">
                Container
              </label>
              <select
                id="container"
                name="container"
                value={container}
                onChange={onContainerChanged}
                className="mb-10 w-3/4 bg-[#26273b] border border-gray-300 text-gray-900 lg:text-sm rounded-lg block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              >
                {options}
              </select>
              <hr className='border-[#3d3f5e] shadow-md shadow-[#3d3f5e]'/>
            </div>


          </div>

          <button
            title="Save"
            className='
              rounded-lg bg-[#4f46bb] px-6 py-3 my-6 lg:text-sm font-bold
              disabled:bg-[#654048] disabled:hover:bg-[#654048] disabled:cursor-not-allowed hover:bg-[#40654e]  hover:-translate-y-1 hover:scale-110 transition-all ease-in-out delay-150
            '
            disabled={!canSave}
          >
            Save
          </button>
          <button
            title="Cancel"
            className='px-6 py-3 lg:text-sm font-bold'
            onClick={() => navigate('/dash/foodLists')}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  )
}

export default NewFood