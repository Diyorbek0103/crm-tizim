import React from 'react'
import Sidebar from '../Components/Admin/Sidebar'

const AdminLayout = ({children}) => {
  return (
    <>
        <Sidebar/>
        {children}
    </>
  )
}

export default AdminLayout