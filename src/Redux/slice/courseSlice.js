import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  courses: []
}

export const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setupCourse: (state, action)=>{
        state.courses = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {  setupCourse } = courseSlice.actions

export default courseSlice.reducer