import React , {useState, useEffect} from 'react'
import {BiImport , BiExport , BiSearchAlt} from 'react-icons/bi'
import {AiOutlinePlus,AiOutlineDelete} from 'react-icons/ai'
import {MdEdit} from 'react-icons/md'
import axios from 'axios'
import { Main_Url } from '../../../axios'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { changeRefresh } from '../../../Redux/slice/refreshSlice'

const Classroom = () => {

    const [loading, setLoading] = useState(true)
    const [courses, setCourses] =  useState([])
    const [name, setName] = useState('')

    const refreshKey = useSelector(state=> state.refreshKey.refreshKey)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(()=>{
       axios.get(`${Main_Url}classroom/`)
        .then(data=>{
            setCourses(data.data);
            setLoading(false)
            console.log(data)
        })
        .catch(err=>{
            console.log(err);
        })

    },[refreshKey])

    const submitGroup = ()=>{
        let config = {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',   
              'Authorization': `Bearer ${user.access}`
        }}

        axios.post(`${Main_Url}classroom/`,{
            name
        }, config)
        .then(data=>{
            dispatch(changeRefresh())
        })
        .catch(err=>{
            console.log(err)
        })
        setName('')
        
    }

    const deleteGroup=(id)=>{
        let config = {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',   
              'Authorization': `Bearer ${user.access}`
        }}
         axios.delete(`${Main_Url}classroom/${id}/`,config)
         .then(data=>{
            dispatch(changeRefresh())
         }) 
         .catch(err=>{
            console.log(err)
         })
    }

  return (
    <div className='home'>
        <div className="classroom-grid">
           <div className="classroom-grid-left">
           <div className="course-nav">
           <div className="course-nav-btns">
            {/* <div className="course-nav-btn">
            <AiOutlinePlus/> Sinf qo'shish
            </div> */}
            <div className="course-nav-btn">
            <BiImport/>   Import
            </div>
            <div className="course-nav-btn">
            <BiExport/>  Export
            </div>
           </div>
           <form className="course-nav-search">
              <input type="search" placeholder='Qidirish' /> 
              <BiSearchAlt className='search-btn'/>
           </form>
        </div>

        {
            loading ? 
            <div className="box-loading">
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                <div className="loading-text">
                    Ma'lumotlar yuklanmoqda...
                </div>
            </div> 
            :
        <div className="course-content">
            <div className="course-content-head">
                <div className="course-content-head-item-mini">T/R</div>
                <div className="course-content-head-item">Sinf nomi</div>
                <div className="course-content-head-item">Talabalar soni</div>
                <div className="course-content-head-item-mini">Sozlamalar</div>
            </div>
            <div className="course-content-body">
                {
                    courses.map((item,index)=>{
                        return(
                            <div key={index} className="course-content-body-items">
                                <div className="course-content-body-item-mini">{index + 1}</div>
                                <Link to={`/admin/classroom/${item.id}`} className="course-content-body-item">{item.name}</Link>
                                <div className="course-content-body-item">{item.student.length}</div>
                                <div className="course-content-body-item-mini course-content-body-btns">
                                   <div className="course-content-body-btn edit"><MdEdit/></div>
                                   <div onClick={()=> deleteGroup(item.id)} className="course-content-body-btn delete"><AiOutlineDelete/></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        }
           </div>
           <div className="classroom-grid-right">
                <div className="classroom-right-top"></div>
                <form className="classroom-right-form">
                    <label htmlFor="name">
                        <p>Sinf nomi</p>
                        <input 
                             type="text" 
                             name='name' 
                             placeholder='Sinf nomi'
                             value={name}
                             onChange={(e)=>setName(e.target.value)}
                              />
                    </label>
                     
                    
                    <div onClick={submitGroup} className="classroom-right-form-btn">
                       Sinf qo'shish
                    </div>
                </form>
           </div>
        </div>
        
    </div>
  )
}

export default Classroom