import { configureStore } from '@reduxjs/toolkit'
import user from './slice/userSlice'
import dark from './slice/darkSlice'
import refreshKey from './slice/refreshSlice'
import courses from './slice/courseSlice'
import teachers from './slice/teacherSlice'
import rooms from './slice/roomSlice'
import students from './slice/studentSlice'
import groups from './slice/groupSlice'

export const store = configureStore({
  reducer: {
    user,
    dark,
    refreshKey,
    courses,
    teachers,
    rooms,
    students,
    groups
  },
})