import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  darkMode: false
}

export const darkSlice = createSlice({
  name: 'dark',
  initialState,
  reducers: {
   darkToggle: (state)=>{
     state.darkMode = !state.darkMode
   }
  },
})

// Action creators are generated for each case reducer function
export const { darkToggle } = darkSlice.actions

export default darkSlice.reducer