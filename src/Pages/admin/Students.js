import React from 'react'
import StudentNav from './StudentNav'
import '../../styles/admin/student.scss'
import StudentList from './StudentList'

const Students = () => {
  return (
    <div className='home'>
        <StudentNav id={'Talabalar ro`yxati'}/>
        <StudentList/>
    </div>
  )
}

export default Students