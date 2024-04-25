import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'

// automatically include authorization headers for API requests
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3500',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token

    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  console.log(args);
  console.log(api);
  console.log(extraOptions);

  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 403){
    console.log('sending refresh token');

    // send refresh token to get new access token
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

    if (refreshResult?.data) {
      //store the new token
      api.dispatch(setCredentials({...refreshResult.data}))
    }
  }
}

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Food', 'User'],
  endpoints: builder => ({})
})