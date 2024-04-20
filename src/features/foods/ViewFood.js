import React from 'react'
import { selectFoodById } from './foodsApiSlice'
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectAllFoods } from "../foods/foodsApiSlice"


const ViewFood = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const food = useSelector(state => selectFoodById(state, id))
  let content

  const convertDate = (date) => {
    const parsed_date = new Date(date)
    const exp_weekday = parsed_date.toLocaleString('en-Us', { timeZone: 'UTC', weekday: 'short' })
    const exp_date = parsed_date.toLocaleString('en-Us', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' })
    const parsed_exp_date = `${exp_date} (${exp_weekday})`
    return parsed_exp_date
  }

  // Set Expiration Indicator Color
  const expiration_color = food.days_until_expiration <= 0 ? 'bg-error'
    : food.days_until_expiration < 5 ? 'bg-orange-400'
      : food.days_until_expiration < 14 ? 'bg-yellow-400'
        : 'bg-green-600'

  if (food) {
    content = (
      <div className="relative min-h-lvh px-8">
        {/* <p className={`${errClass} `}>{error?.data?.message}</p> */}
        <div className="text-3xl font-bold text-base-content mx-auto">
          <button onClick={() => navigate('/dash/foodLists')}>My Foods</button> > {food.name}
        </div>

        <div className='flex flex-col justify-center mx-auto pt-8'>
          <form className='text-xl font-medium text-base-content w-full'>

            <div className="md:grid md:grid-cols-3 flex flex-col-reverse gap-8 mb-8">
              <div>
                <div className='rounded-2xl bg-base-300 basis-1/2 aspect-square p-4 w-72 mx-auto'>
                  <img
                    src={'http://localhost:3500/foodImages/' + food.image}
                    className="w-full"
                  />
                </div>
                <div className='text-sm text-center py-2'>
                  {food.image}
                </div>
              </div>


              <div className='col-span-2 text-base-content text-base'>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-base-content">
                  Name of Food
                </label>
                <input
                  id="name"
                  type="text"
                  value={food.name}
                  placeholder="Lemonade"
                  readOnly
                  className={`mb-6 bg-primary text-primary-content font-bold pointer-events-none text-base rounded-lg block p-2.5 w-4/6`}
                />

                <label htmlFor="quantity" className="block mb-2 text-sm font-medium ">
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="text"
                  value={food.quantity}
                  placeholder="1 big bottle"
                  readOnly
                  className={`mb-6 bg-base-300 text-base-content font-bold pointer-events-none text-base rounded-lg block p-2.5 
                    w-4/6 md:w-1/2`}
                />

                <label htmlFor="expiration" className="block mb-2 text-sm font-medium ">
                  Expiration Date
                </label>
                <input
                  id="expiration"
                  type='text'
                  value={convertDate(food.expiration_date)}
                  readOnly
                  className={`bg-base-300 text-base-content font-bold placeholder:text-neutral-content shadow-sm shadow${expiration_color} pointer-events-none text-base rounded-lg block p-2.5 
                   w-4/6 md:w-1/2`}
                />
                <div htmlFor="description" className="flex items-center text-sm font-medium mb-6 mt-1 text-base-content">
                  <div className={`h-2.5 w-2.5 rounded-full ${expiration_color} me-2`}></div> {food.days_until_expiration} day(s) left
                </div>

                <label htmlFor="description" className="block mb-2 text-sm font-medium ">
                  Description
                </label>
                <textarea
                  readOnly
                  id="description"
                  rows={3}
                  value={food.description}
                  placeholder="No description yet..."
                  className="mb-6 w-full md:w-3/4 bg-base-300 text-base-content placeholder:font-medium font-bold pointer-events-none text-base rounded-lg block p-2.5"
                />

                <label htmlFor="container" className="block mb-2 text-sm font-medium ">
                  Container
                </label>
                <select
                  id="container"
                  name="container"
                  readOnly
                  value={food.container}
                  className="mb-10 w-3/4 bg-base-300 text-base-content font-bold pointer-events-none text-base rounded-lg block p-2.5 "
                >
                  <option>
                    {food.container}
                  </option>
                </select>

                <div htmlFor="description" className="block text-sm font-medium text-base-content">
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
          </form>

          <div>
            <button
              onClick={() => navigate(`/dash/foodLists/${id}/edit`)}
              className="rounded-lg bg-accent text-accent-content hover:bg-secondary hover:-translate-y-1 hover:scale-110 transition-all ease-in-out delay-150 px-6 py-3 my-6 lg:text-sm font-bold"
            >
              Edit
            </button>
          </div>
        </div>


      </div>
    )
  } else return null

  return content
}

export default ViewFood