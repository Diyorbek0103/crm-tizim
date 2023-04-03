import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  teachers: []
}

export const teacherSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    setupTeacher: (state, action)=>{
        state.teachers = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {  setupTeacher } = teacherSlice.actions

export default teacherSlice.reducer