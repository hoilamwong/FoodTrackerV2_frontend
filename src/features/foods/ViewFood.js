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
    const exp_weekday = parsed_date.toLocaleString('en-Us', { weekday: 'short' })
    const exp_date = parsed_date.toLocaleString('en-Us', { year: 'numeric', month: '2-digit', day: '2-digit' })
    const parsed_exp_date = `${exp_date} (${exp_weekday})`
    return parsed_exp_date
  }

  if (food) {
    // Set Expiration Indicator Color
    const expiration_color = food.days_until_expiration <= 0 ? '-red-700/60'
      : food.days_until_expiration < 5 ? '-orange-400'
        : food.days_until_expiration < 14 ? '-yellow-400'
          : '-green-600'

    const expiration_color_ = food.days_until_expiration <= 0 ? 'border-red-700'
      : food.days_until_expiration < 5 ? 'border-orange-400'
        : food.days_until_expiration < 14 ? 'border-yellow-400'
          : 'border-green-600'

    content = (
      <>
        {/* <p className={`${errClass} `}>{error?.data?.message}</p> */}
        <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 pb-6 lg:pb-16 w-5/6 mx-auto">
          <button onClick={() => navigate('/dash/foodLists')}>My Foods</button> > {food.name}
        </div>

        <div className='flex flex-col justify-center w-5/6 mx-auto'>
          <form className='text-xl font-medium dark:text-slate-300 w-full'>

            <div className="md:grid md:grid-cols-3 flex flex-col-reverse gap-8 mb-8">
              <div className='rounded-2xl bg-[#26273b] shadow-2xl basis-1/2 aspect-square p-4'>
                Some Image
              </div>

              <div className='col-span-2'>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name of Food
                </label>
                <input
                  id="name"
                  type="text"
                  value={food.name}
                  placeholder="Lemonade"
                  readOnly
                  className={`mb-6 bg-[#26273b] pointer-events-none text-sm rounded-lg block p-2.5
                w-full md:w-4/6
               dark:placeholder-gray-400 dark:text-white`}
                />

                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="text"
                  value={food.quantity}
                  placeholder="1 big bottle"
                  readOnly
                  className={`mb-6 bg-[#26273b] pointer-events-none text-sm rounded-lg block p-2.5 
               dark:placeholder-gray-400 dark:text-white w-4/6 md:w-1/2`}
                />

                <label htmlFor="expiration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Expiration Date
                </label>
                <input
                  id="expiration"
                  type='text'
                  value={convertDate(food.expiration_date)}
                  readOnly
                  className={`bg-[#26273b]  ${expiration_color_} shadow-sm shadow${expiration_color} pointer-events-none text-sm rounded-lg block p-2.5 
                  dark:placeholder-gray-400 dark:text-white w-4/6 md:w-1/2`}
                />
                <div htmlFor="description" className="flex items-center text-sm font-medium text-gray-900 dark:text-slate-300 mb-6 mt-1">
                  <div className={`h-2.5 w-2.5 rounded-full bg${expiration_color} me-2`}></div> {food.days_until_expiration} day(s) left
                </div>

                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <textarea
                  readOnly
                  id="description"
                  rows={3}
                  value={food.description}
                  placeholder="No description yet..."
                  className="mb-6 w-full md:w-3/4 bg-[#26273b] pointer-events-none text-sm rounded-lg block p-2.5 darkdark:placeholder-gray-400 dark:text-white"
                />

                <label htmlFor="container" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Container
                </label>
                <select
                  id="container"
                  name="container"
                  readOnly
                  value={food.container}
                  className="mb-10 w-3/4 bg-[#26273b] pointer-events-none text-sm rounded-lg block p-2.5 darkdark:placeholder-gray-400 dark:text-white"
                >
                  <option>
                    {food.container}
                  </option>
                </select>

                <div htmlFor="description" className="block text-sm font-medium text-gray-900 dark:text-slate-600">
                  Author: {food.username}
                </div>
                <div htmlFor="description" className="block text-sm font-medium text-gray-900 dark:text-slate-600">
                  Created On: {convertDate(food.createdAt)}
                </div>
                <div htmlFor="description" className="block text-sm font-medium text-gray-900 dark:text-slate-600">
                  Last Updated: {convertDate(food.updatedAt)}
                </div>

                <hr className='border-[#3d3f5e] shadow-md shadow-[#3d3f5e] mt-4' />

              </div>
            </div>
          </form>

          <div>
            <button
              onClick={() => navigate(`/dash/foodLists/${id}/edit`)}
              className="rounded-lg bg-[#4f46bb] hover:bg-[#bba946] hover:-translate-y-1 hover:scale-110 transition-all ease-in-out delay-150 px-6 py-3 my-6 lg:text-sm font-bold"
            >
              Edit
            </button>
          </div>
        </div>


      </>
    )
  } else return null

  return content
}

export default ViewFood