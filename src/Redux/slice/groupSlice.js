import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    groups: []
}

export const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setupGroup: (state, action)=>{
        state.groups = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {  setupGroup } = groupSlice.actions

export default groupSlice.reducer