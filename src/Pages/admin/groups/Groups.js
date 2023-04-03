import React , {useState, useEffect} from 'react'
import {BiImport , BiExport , BiSearchAlt} from 'react-icons/bi'
import {AiOutlinePlus,AiOutlineDelete} from 'react-icons/ai'
import {MdEdit} from 'react-icons/md'
import axios from 'axios'
import { Main_Url } from '../../../axios'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { changeRefresh } from '../../../Redux/slice/refreshSlice'
import '../../../styles/admin/groups/groups.scss'
import {IoMdCloseCircle} from 'react-icons/io'
import {BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill} from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify';


const Groups = () => {

    const [loading, setLoading] = useState(true)
    const [courses, setCourses] =  useState([]) 
    const [openForm, setOpenForm] = useState(true)
    const [openAdd, setOpenAdd] = useState(false)
    const [paginationData , setPaginationData] = useState([])
    const [paginationNumber, setPaginationNumber] = useState([])
    const [currentStart, setCurrentStart] = useState(0)
    const [currentEnd, setCurrentEnd] = useState(10)
    const [currentIndex, setCurrentIndex] = useState(0)

    const [deleteId, setDeletId] = useState(null)
    const [openDelete, setOpenDelete] = useState(false)

    const [name, setName] = useState('')
    const [education, setEducation] =  useState('offline')
    const [day, setDay] = useState([])
    const [status, setStatus] = useState('active')
    const [start, setStart] = useState('')
    const [finish, setFinish] = useState('')
    const [start_lesson, setStart_lesson] = useState('')
    const [finish_lesson, setFinish_lesson] = useState('')
    

   

    const refreshKey = useSelector(state=> state.refreshKey.refreshKey)
    const courseList = useSelector(state => state.courses.courses)
    const teacherList = useSelector(state => state.teachers.teachers)
    const groups = useSelector(state => state.groups.groups)
    const roomList = useSelector(state => state.rooms.rooms)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    // const [course, setCourse] = useState(courseList[0].id || 0)
    // const [teacher,setTeacher] = useState(teacherList[0].id || 0)
    // const [room, setRoom] = useState(roomList[0].id || 0)

    const [course, setCourse] = useState(0)
    const [teacher,setTeacher] = useState(0)
    const [room, setRoom] = useState(0)
     

    console.log(day);

    const handleChange = (e) => {
        if(e.target.checked){
            setDay([ ...day,   e.target.value ]);
        } else {
            setDay(day => day.filter(day => { 
                return day !== e.target.value;
              }))
        }
       
    };
     
    useEffect(()=>{
       axios.get(`${Main_Url}groups/`)
        .then(data=>{
            setCourses(data.data);
            setLoading(false)
            console.log(data)
        })
        .catch(err=>{
            console.log(err);
        })

    },[refreshKey])
    useEffect(() => {
        const close = (e) => {
          if(e.keyCode === 27){
            setOpenAdd(false)
          }
        }
        window.addEventListener('keydown', close)
      return () => window.removeEventListener('keydown', close)
    },[])
    const setPagination = () => {
        setPaginationData(groups.slice(currentStart , currentEnd))
    }
    useEffect(()=>{
        let num = Math.ceil(groups.length/10)

        var myArray = []

        if(num > 1){
           for(var i=0; i<num; i++){
              myArray.push(i+1)
           }
        }

        setPaginationNumber(myArray) 
 
        setPagination() 
    },[refreshKey])
    const nextPage = ()=>{
        if(currentEnd >= groups.length){
            setCurrentStart(currentStart )
            setCurrentEnd(currentEnd )
            setCurrentIndex(currentIndex)
        } else {
            setCurrentStart(currentStart + 10)
            setCurrentEnd(currentEnd + 10)
            setCurrentIndex(currentIndex + 1)
        }
        setPagination()
        dispatch(changeRefresh())
    }
    const prevPage = ()=>{
        if(currentStart == 0) {
            setCurrentStart(currentStart)
            setCurrentEnd(currentEnd)
            setCurrentIndex(currentIndex)
        } else {
         setCurrentStart(currentStart - 10)
         setCurrentEnd(currentEnd - 10)
         setCurrentIndex(currentIndex - 1)
        }
        setPagination()
        dispatch(changeRefresh())
    }
    const setCustomPagination = (start,end)=>{
        setCurrentStart(start)
        setCurrentEnd(end) 
        setCurrentIndex(end/10 - 1)
        dispatch(changeRefresh())
    }
    const submitGroup = ()=>{
        setLoading(true)
        let config = {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',   
              'Authorization': `Bearer ${user.access}`
        }}

        axios.post(`${Main_Url}groups/`,{
            name,
            education,
            day, 
            status,
            start,
            finish,
            start_lesson,
            finish_lesson,
            course,
            teacher,
            room
        }, config)
        .then(data=>{
            dispatch(changeRefresh())
            setLoading(false)
            toast.success('Guruh muvaffaqiyatli qo`shildi') 
            setOpenAdd(!openAdd)
        })
        .catch(err=>{
            console.log(err)
            setLoading(false)
            toast.error('Guruh qo`shishda xatolik') 
        })
        
    }
    const deleteOpen = (id) =>{
        setDeletId(id)
        setOpenDelete(true)
    }
    const deleteGroup=(id)=>{
         setLoading(true)
        setOpenDelete(false)
        let config = {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',   
              'Authorization': `Bearer ${user.access}`
        }}
         axios.delete(`${Main_Url}groups/${deleteId}/`,config)
         .then(data=>{
            dispatch(changeRefresh())
            setLoading(false)
            
         }) 
         .catch(err=>{
            console.log(err)
         })
    }
    


  return (
    <div className='home'>
        <ToastContainer/>
        <div className={openAdd ? "add-group" : "add-group close"}>
            <div className="add-group-content">
                <IoMdCloseCircle onClick={()=> setOpenAdd(!openAdd)} />
                <div className="add-group-content-title">
                    Guruh qo'shish
                </div>
                <form className="add-group-content-form">
                    <div className="add-group-content-form-title">
                        Guruh nomi
                    </div>
                    <label className='add-group-content-form-item' htmlFor="name">
                        <input 
                          required type="text" 
                          value={name}
                          onChange={(e)=> setName(e.target.value)} 
                          placeholder='Guruh nomi' name='name'
                          />
                    </label>
                    <div className="add-group-content-form-title">
                        Dars shakli
                    </div>
                    <label className='add-group-content-form-item' htmlFor="education">
                        <select 
                        name="education"
                        value={education}
                        onChange={(e)=> setEducation(e.target.value)} 
                        >
                            <option value="offline">Offline</option>
                            <option value="online">Online</option>
                        </select>
                    </label>
                    <div className="add-group-content-form-title">
                       Kursni tanlang
                    </div>
                    <label className='add-group-content-form-item' htmlFor="course">
                        <select
                        name="course"
                        value={course}
                        onChange={(e)=> setCourse(e.target.value)}
                        > 
                        {
                            courseList.map(course => (
                                <option value={course.id} key={course ? course.id : ''}>
                                {course.name  ? course.name : 'no course'}
                                </option>
                            ))
                        }
                        </select>
                    </label>
                    <div className="add-group-content-form-title">
                       O'qituvchini tanlang
                    </div>
                    <label className='add-group-content-form-item' htmlFor="teacher">
                        <select 
                        name="teacher" 
                        value={teacher}
                        onChange={(e)=> setTeacher(e.target.value)}
                        > 
                        {
                            teacherList.map(teacher => (
                                <option value={teacher.id} key={teacher ? teacher.id : ''}>
                                {teacher.username  ? teacher.username : 'no teacher'}
                                </option>
                            ))
                        }
                        </select>
                    </label>
                    <div className="add-group-content-form-title">
                       Xonani tanlang
                    </div>
                    <label className='add-group-content-form-item' htmlFor="room">
                        <select 
                        name="room" 
                        value={room}
                        onChange={(e)=> setRoom(e.target.value)}
                        > 
                        {
                            roomList.map(room => (
                                <option value={room.id} key={room ? room.id : ''}>
                                {room.name  ? room.name : 'no room'}
                                </option>
                            ))
                        }
                        </select>
                    </label>
                    <div className="add-group-content-form-title">
                        Dars kunlari
                    </div>
                    <label className='add-group-content-form-item day' htmlFor="day">
                        <label htmlFor="Mon">
                            <input type="checkbox" onChange={handleChange} name='Mon' id='Mon' value={'Mon'} />
                            Du
                        </label>
                        <label htmlFor="Tue">
                            <input type="checkbox" name='Tue' id='Tue' onChange={handleChange}  value={'Tue'} />
                            Se
                        </label>
                        <label htmlFor="Wed">
                            <input type="checkbox" name='Wed' id='Wed' onChange={handleChange} value={'Wed'} />
                            Chor
                        </label>
                        <label htmlFor="Thu">
                            <input type="checkbox" name='Thu' id='Thu' onChange={handleChange} value={'Thu'} />
                            Pay
                        </label>
                        <label htmlFor="Fri">
                            <input type="checkbox" name='Fri' id='Fri' onChange={handleChange} value={'Fri'} />
                            Ju
                        </label>
                        <label htmlFor="Sat">
                            <input type="checkbox" name='Sat' id='Sat' onChange={handleChange} value={'Sat'} />
                            Sha
                        </label>
                        <label htmlFor="Sun">
                            <input type="checkbox" name='Sun' id='Sun' onChange={handleChange} value={'Sun'} />
                            Yak
                        </label>
                        {/* Mon, Tue, Wed, Thu, Fri, Sat, Sun */}
                    </label>

                    <div className="add-group-content-form-title">
                        Guruh statusi
                    </div>
                    <label className='add-group-content-form-item' htmlFor="status">
                        <select  
                           name="status"
                           value={status}
                           onChange={(e)=> setStatus(e.target.value)} 
                           >
                            <option value="active">Active</option>
                            <option value="waiting">Waiting</option>
                        </select>
                    </label>
                    <div className="add-group-content-form-title">
                        Guruh boshlanishi
                    </div>
                    <label className='add-group-content-form-item' htmlFor="start">
                         <input required 
                         type="date" 
                         name='start'
                         value={start}
                         onChange={(e)=> setStart(e.target.value)} 
                          />
                    </label>
                    <div className="add-group-content-form-title">
                        Guruh yakunlanishi
                    </div>
                    <label className='add-group-content-form-item' htmlFor="finish">
                         <input 
                         required 
                         type="date" 
                         name='finish'
                         value={finish}
                         onChange={(e)=> setFinish(e.target.value)} 
                          />
                    </label>
                    <div className="add-group-content-form-title">
                        Dars boshlanishi
                    </div>
                    <label className='add-group-content-form-item' htmlFor="start_lesson">
                         <input 
                         required 
                         type="time" 
                         name='start_lesson'
                         value={start_lesson}
                         onChange={(e)=> setStart_lesson(e.target.value)} 
                          />
                    </label>
                    <div className="add-group-content-form-title">
                        Dars yakunlanishi
                    </div>
                    <label className='add-group-content-form-item' htmlFor="finish_lesson">
                         <input 
                         required 
                         type="time" 
                         name='finish_lesson'
                         value={finish_lesson}
                         onChange={(e)=> setFinish_lesson(e.target.value)} 
                          />
                    </label>

                    <div onClick={submitGroup}   className="submit-btn">
                    {loading ? <div class="lds-ring"><div></div><div></div><div></div><div></div></div> :  'Guruhni saqlash'}
                    </div>
                     
                </form>
            </div>
        </div>
         
        <div className="course-nav">
          <form className="course-nav-search">
              <input type="search" placeholder='Qidirish' /> 
              <BiSearchAlt className='search-btn'/>
           </form>
           <div className="course-nav-btns">
            <div onClick={()=> setOpenAdd(!openAdd)} className="course-nav-btn">
            <AiOutlinePlus/> Guruh qo'shish
            </div>
            <div className="course-nav-btn">
            <BiImport/>   Import
            </div>
            <div className="course-nav-btn">
            <BiExport/>  Export
            </div>
           </div>
           
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
           <div className="group-table">
            <div className="all-student">
            <span>Barcha guruhlar: </span> {groups.length} ta
        </div>
            <div className="group-table-head">
                <div className="group-table-head-count">T/R</div>
                <div className="group-table-head-item">Guruh nomi</div>
                <div className="group-table-head-item">Kurs nomi</div>
                <div className="group-table-head-item">O'qituvchi</div>
                <div className="group-table-head-item">Narxi</div>  
                <div className="group-table-head-item">Talabalar soni</div>  
                <div className="group-table-head-item">Kurs vaqti</div> 
                <div className="group-table-head-setting">Sozlamalar</div>
            </div>
            <div className="group-table-body">
                {
                paginationData.map((item,index)=>{
                    return(
                        <div key={index} className="group-table-body-items">
                            <div className="group-table-body-count">{
                       index == 9 ? `${currentIndex + 1}0` : `${currentIndex}${index + 1}`
                    }</div>
                            <Link to={`/admin/groups/${item.id}`} className="group-table-body-item">{item.name}</Link>
                            <div className="group-table-body-item">{item.course ? item.course.name : 'No course'}</div>
                            <div className="group-table-body-item">{item.teacher ? item.teacher.username : 'No Teacher'}</div>
                            <div className="group-table-body-item">{item.course ? item.course.cost.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : 'No Price'} so'm </div>  
                            <div className="group-table-body-item">{item.student.length}   </div> 
                            <div className="group-table-body-item ">
                            <div className="days">
                            {
                            item.day.map((day, index)=>(
                              <div key={index} className="single-day">
                                {day == 'Mon' ? 'Du' : ''}
                                {day == 'Tue' ? 'Se' : ''}
                                {day == 'Wed' ? 'Chor' : ''}
                                {day == 'Thu' ? 'Pay' : ''}
                                {day == 'Fri' ? 'Ju' : ''}
                                {day == 'Sat' ? 'Shan' : ''}
                                {day == 'Sun ' ? 'Yak' : ''}
                              </div>
                            ))
                            } 
                            </div>
                           
                            <span>{item.start_lesson ? item.start_lesson.substring(0,5) : ''} - {item.finish_lesson ? item.finish_lesson.substring(0,5) : ''} </span> </div> 
                            <div className="group-table-body-setting">
                                <div className="setting-edit"><MdEdit/></div>
                                <div className="setting-delete" onClick={()=>deleteOpen(item.id)}><AiOutlineDelete/></div>
                            </div>
                        </div>
                    )
                })
                }
            </div>
            <div className={openDelete ? "delete-modal active" : 'delete-modal'}>
                <div className="delete-modal-content">
                    Talaba: {deleteId ? groups.find(x => x.id == deleteId).name : ''}
                <div className="buttons">
                <div onClick={()=>setOpenDelete(false)} className="cancel">
                    Bekor qilish
                </div>
                <div onClick={deleteGroup} className="delete">
                  <AiOutlineDelete/>  O'chirish
                </div>
                </div>
                </div>
            </div>
            <div className="pagination">
             <div onClick={prevPage} className={currentStart == 0 ? "pagination-btn disable" : "pagination-btn"}>
                <BsFillArrowLeftSquareFill/>
             </div>
             <div className="pagination-content">
              {
                paginationNumber.map((number, index)=>(
                    <div onClick={()=> setCustomPagination((number-1)*10,number*10)} key={index} className={currentIndex + 1 == number ? "pagination-content-number active" : "pagination-content-number"} >
                        {number}
                    </div>
                ))
              }
             </div>
             <div onClick={nextPage} className={currentEnd >= groups.length ? "pagination-btn disable" : "pagination-btn"}>
                <BsFillArrowRightSquareFill/>
             </div>
            </div>
           </div>
        }
  </div>
  )
}

export default Groups








