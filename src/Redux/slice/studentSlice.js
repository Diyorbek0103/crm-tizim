import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    students: []
}

export const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setupStudent: (state, action)=>{
        state.students = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {  setupStudent } = studentSlice.actions

export default studentSlice.reducer