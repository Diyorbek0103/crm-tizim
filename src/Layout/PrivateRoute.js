import React, {useState, useEffect} from 'react'
import { Navigate , Outlet } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { loginSuccess } from '../Redux/slice/userSlice'
import { setupCourse } from '../Redux/slice/courseSlice'
import { setupTeacher } from '../Redux/slice/teacherSlice'
import { setupRoom } from '../Redux/slice/roomSlice'
import { setupStudent } from '../Redux/slice/studentSlice'
import { setupGroup } from '../Redux/slice/groupSlice'
import AdminLayout from './AdminLayout'
import axios from 'axios'
import { Main, Main_Url } from '../axios' 
 

const refreshToken = JSON.parse(localStorage.getItem('jwtToken'))

const PrivateRoute = () => {

    const [loading, setLoading] = useState(true)
    const user = useSelector(state => state.user) 
    const refreshKey = useSelector(state => state.refreshKey.refreshKey) 
    const dispatch = useDispatch()

  
    useEffect(()=>{
      axios.get(`${Main_Url}course/`)
      .then(data=>{ 
        dispatch(setupCourse(data.data))
      }) 
      .catch(err=>{
        console.log(err);
      })
    },[refreshKey])

    useEffect(()=>{
      axios.get(`${Main_Url}teacher/`)
      .then(data=>{ 
        dispatch(setupTeacher(data.data))
      })
      .catch(err=>{
        console.log(err);
      })
    },[refreshKey])

    useEffect(()=>{
      axios.get(`${Main_Url}rooms/`)
      .then(data=>{ 
        dispatch(setupRoom(data.data))
      })
      .catch(err=>{
        console.log(err);
      })
    },[refreshKey])

    useEffect(()=>{
      axios.get(`${Main_Url}students/`)
      .then(data=>{ 
        dispatch(setupStudent(data.data))
      })
      .catch(err=>{
        console.log(err);
      })
    },[refreshKey])

    useEffect(()=>{
      axios.get(`${Main_Url}groups/`)
      .then(data=>{ 
        dispatch(setupGroup(data.data))
      })
      .catch(err=>{
        console.log(err);
      })
    },[refreshKey])
   
 


    useEffect(() => { 
        axios.post(`${Main}auth/token/refresh/`,
        {
            refresh: refreshToken
        })
        .then(res => {   
            dispatch(loginSuccess(res.data.access)) 
        })
        .catch(err => {  
            console.log(err);
        }) 
      },[])
  
    setTimeout(()=>{
      setLoading(false)
    },2000)

      
  
    return loading ? 
    <div className="main-loading">
     <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      <div className="loading-text">
        Ma'lumotlar yuklanmoqda...
      </div>
    </div> :  !user.isUser ?  <Navigate to={'/'}/> : <AdminLayout><Outlet/></AdminLayout> 
}

export default PrivateRoute