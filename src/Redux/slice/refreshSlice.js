import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    refreshKey : 0
}

export const refreshSlice = createSlice({
   name:'refreshKey',
   initialState,
   reducers:{
      changeRefresh: (state) =>{
           state.refreshKey = state.refreshKey + 1
      }
   }
})

export const { changeRefresh } = refreshSlice.actions

export default refreshSlice.reducer