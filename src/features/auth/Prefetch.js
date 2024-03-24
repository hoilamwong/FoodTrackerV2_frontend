import { useEffect } from 'react'
import { store } from '../../app/store'
import { foodsApiSlice } from '../foods/foodsApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'
import { Outlet } from 'react-router-dom'

const Prefetch = () => {
  useEffect(() => {
    console.log('subscribing');
     const foods = store.dispatch(foodsApiSlice.endpoints.getFoods.initiate())
     const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

     return () => {
      console.log('unsubscribing');
      foods.unsubscribe()
      users.unsubscribe()
     }

  },[])

  return <Outlet />
}

export default Prefetch