import {
  createSelector,
  createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const foodsAdapter = createEntityAdapter({
  // Keep the "all IDs" array sorted based on days until expiration
  sortComparer: (a, b) => a.days_until_expiration - b.days_until_expiration // Sort in ascending order (the one expiring first comes first)
})

const initialState = foodsAdapter.getInitialState()

export const foodsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getFoods: builder.query({
      query: () => '/foods',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      keepUnusedDataFor: 5,
      transformResponse: responseData => {
        const loadedFoods = responseData.map(food => {
          food.id = food._id
          return food
        })
        return foodsAdapter.setAll(initialState, loadedFoods)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Food', id:'LIST' },
            ...result.ids.map(id => ({ type: 'Food', id}))
          ]
        } else return [{ type: 'Food', id: 'List'}]
      }
    }),
    addNewFood: builder.mutation({
      query: initialFoodData => ({
        url: '/foods',
        method: 'POST',
        body: {
          ...initialFoodData,
        }
      }),
      invalidatesTags: [
        { type: 'Food', id: 'LIST' }
      ]
    }),
    updateFood: builder.mutation({
      query: initialFoodData => ({
        url: '/foods',
        method: 'PATCH',
        body: {
          ...initialFoodData,
        }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Food', id: arg.id } // invalid specific id of the food
      ]
    }),
    deleteFood: builder.mutation({
      query: ({ id }) => ({ //only needs to destructure id
        url: '/foods',
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Food', id: arg.id }
      ]
    }),
  })
})

export const {
  useGetFoodsQuery,
  useAddNewFoodMutation,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
} = foodsApiSlice

// returns the query result object
export const selectFoodsResult = foodsApiSlice.endpoints.getFoods.select()

// creates memoized selector
const selectFoodsData = createSelector(
  selectFoodsResult,
  foodsResult => foodsResult.data // normalized state object with ids & entities
)

export const {
  selectAll: selectAllFoods,
  selectById: selectFoodById,
  selectIds: selectFoodIds,
  // pass in a selector that returns the foods slice of state
} = foodsAdapter.getSelectors(state => selectFoodsData(state) ?? initialState)