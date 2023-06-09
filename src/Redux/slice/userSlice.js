import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  isUser: false  ,
  access: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state,action) => {
      state.isUser = true
      state.access = action.payload
  }
  },
})

// Action creators are generated for each case reducer function
 export const { loginSuccess } = userSlice.actions

export default userSlice.reducer