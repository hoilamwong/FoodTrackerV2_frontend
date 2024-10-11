import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    theme: localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')) : "cupcake"
  },
  reducers: {
    toggleTheme: (state) => {
      let newTheme
      if (state.theme == "cupcake")
        newTheme = "night"
      else
        newTheme = "cupcake"
      state.theme = newTheme
      localStorage.setItem('theme', JSON.stringify(newTheme));
    }
  }
})

export const selectTheme = (state) => state.global
export const {
  toggleTheme
} = globalSlice.actions

export default globalSlice.reducer