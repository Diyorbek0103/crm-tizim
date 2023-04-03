import React , {useState , useEffect} from 'react'
import {AiOutlineFilter,AiOutlineEye , AiOutlineDelete, AiOutlineHistory} from 'react-icons/ai'
import {IoMdCloseCircle} from 'react-icons/io'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Main_Url } from '../../axios'
import { useSelector, useDispatch } from 'react-redux'
import { changeRefresh } from '../../Redux/slice/refreshSlice'
import {BsFillArrowLeftSquareFill,BsSearch, BsFillArrowRightSquareFill} from 'react-icons/bs'


const StudentList = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [studentData, setStudentData] = useState([])  
    const [openPayment, setOpenPayment] = useState(true)
    const [singlePaymentData, setSinglePaymentData] = useState(null)
    const [deleteId, setDeletId] = useState(null)
    const [openDelete, setOpenDelete] = useState(false)
    const [paginationData , setPaginationData] = useState([])
    const [paginationNumber, setPaginationNumber] = useState([])
    const [currentStart, setCurrentStart] = useState(0)
    const [currentEnd, setCurrentEnd] = useState(10)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [searchValue, setSearchValue] = useState('')
     
     
    
    const refreshKey = useSelector(state => state.refreshKey.refreshKey)
    const students = useSelector(state => state.students.students)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
 

     
    

    useEffect(()=>{
        axios.get(`${Main_Url}students/`)
         .then(data=>{ 
            setStudentData(data.data) 
            setIsLoading(false) 
            setDeletId(null)
            dispatch(changeRefresh())
         })
         .catch(err=>{
            console.log(err);
         }) 
    },[refreshKey]) 
    
     

     
 

    const setPagination = () => {
        setPaginationData(students.slice(currentStart , currentEnd))
    } 
    useEffect(()=>{
        let num = Math.ceil(students.length/10)

        var myArray = []

        if(num > 1){
           for(var i=0; i<num; i++){
              myArray.push(i+1)
           }
        }

        setPaginationNumber(myArray) 
 
        setPagination()
        setDeletId(null)
    },[]) 
    const nextPage = ()=>{
        if(currentEnd >= students.length){
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


    const searchStudent = ()=>{
        axios.get(`${Main_Url}students/?search=${searchValue}`)
        .then(data=>{
            console.log(data);
            setPaginationData(data.data)
        })
    }
     

   

    

     

    const singlePayment = (index) =>{
        setOpenPayment(!openPayment)
        setSinglePaymentData(paginationData[index])
    }
 

    const deleteOpen = (id) =>{
        setDeletId(id)
        setOpenDelete(true)
    }

    const deleteStudent=()=>{
        setIsLoading(true)
        setOpenDelete(false)
        let config = {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',   
              'Authorization': `Bearer ${user.access}`
        }}
         axios.delete(`${Main_Url}students/${deleteId}/`,config)
         .then(data=>{
            dispatch(changeRefresh())
            setIsLoading(false)
            
         }) 
         .catch(err=>{
            console.log(err)
         })
    }

    useEffect(() => {
        const close = (e) => {
          if(e.keyCode === 27){
            setOpenDelete(false)
            setOpenPayment(true)
          }
        }
        window.addEventListener('keydown', close)
      return () => window.removeEventListener('keydown', close)
    },[])




     

    


  return (
    isLoading ? 
                <div className="box-loading">
                    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    <div className="loading-text">
                        Ma'lumotlar yuklanmoqda...
                    </div>
                </div> 
                :
    <div className="student-filter-list">
        <div className="student-filter">
           <form className="student-filter-form">
            <label htmlFor="name">
                <input 
                type="text" 
                name='name' 
                placeholder='FIO, Tel raqam...'
                value={searchValue} 
                onChange={(e)=> setSearchValue(e.target.value)}
                />
            </label>
            {/* <label htmlFor="holat">
                <select name="holat"  id="holat">
                    <option className='default' value="">To'lov holati</option>
                    <option value="qarzdor">Qarzdor</option>
                    <option value="tolangan">To'langan</option>
                </select>
            </label>
            <label htmlFor="address">
                <input type="text" name='address' placeholder='Manzil...' />
            </label> */}
            <div onClick={searchStudent} className="filter-btn">
             <BsSearch/>   Qidirish
            </div>
           </form>
        </div>

        
        <div className='student-list'>
        <div className="all-student">
            <span>Barcha talabalar: </span> {studentData.length} nafar
        </div>
        <div className="list-head">
            <div className="list-head-check">
                <input type="checkbox" />
            </div>
            <div className="list-head-item-count">
                T/R
            </div>
            <div className="list-head-item">
                FIO
            </div>
            <div className="list-head-item">
                Telefon raqam
            </div>
            <div className="list-head-item">
                To'lov holati
            </div>
            <div className="list-head-item">
                Yaratilgan sanasi
            </div>
            <div className="list-head-item">
                Moderator
            </div>
            <div className="list-head-item">
                Sozlamalar
            </div>
        </div>
        <div className="list-body">
        { 
            paginationData.map((item,index) => {
            return (
                <div key={item.id} className="list-body-items">
                    <div className="list-body-check">
                        <input type="checkbox" />
                    </div>
                    <div className="list-body-item-count">{
                       index == 9 ? `${currentIndex + 1}0` : `${currentIndex}${index + 1}`
                    }</div>
                    <div className="list-body-item">
                        <Link to={`/admin/students/${item.id}`}>{item.name}</Link>
                    </div>
                    <div className="list-body-item"> {
                        item.phone ? 
                       <div>
                         +{item.phone.replace('+','').slice(0,3)} {"("}{item.phone.replace('+','').slice(3,5)}{")"} {item.phone.replace('+','').slice(5,8)}-{item.phone.replace('+','').slice(8,10)}-{item.phone.replace('+','').slice(10,12)}
                       </div> 
                        : 'No number'
                    } </div>
                    <div className="list-body-item ">  
                       {
                        item.payments.length > 0 ? 
                         item.payments.status ? 
                         <div onClick={()=>singlePayment(item.id)} className="tolangan">To'langan</div> :
                         <div onClick={()=>singlePayment(index)} className="qarzdor">Qarzdor</div>
                        : 
                        <div className="arxiv">kutilmoqda</div>
                        }
                        <div className={openPayment ? "student-payment-status close" : "student-payment-status"}>
                            
                        <div className="content">
                        <IoMdCloseCircle onClick={()=> setOpenPayment(true)} />
                        <div className="content-title">
                            Talaba: {singlePaymentData? singlePaymentData.name : 'Talaba'} | To'lovlar holati
                        </div>
                        <div className="content-table">
                            <div className="content-table-head">
                            <div className="content-table-head-item-count">T/R </div>
                            <div className="content-table-head-item">Guruh</div>
                            <div className="content-table-head-item">So'ngi to'lov</div>
                            <div className="content-table-head-item">Keyingi to'lov </div>
                            <div className="content-table-head-item">To'lov holati</div>
                            <div className="content-table-head-item">Kelgan sanasi</div>
                            </div>
                            <div className="content-table-body">
                                <div className="content-table-body-items">
                                    <div className="content-table-body-item-count">1</div>
                                    <div className="content-table-body-item">Matematika 15</div>
                                    <div className="content-table-body-item">12 Jan, 2023</div>
                                    <div className="content-table-body-item">12 Fev, 2023</div>
                                    <div className="content-table-body-item"> 
                                      <div className="tolangan">To'langan</div>
                                    </div>
                                    <div className="content-table-body-item">10 Jan, 2023</div>
                                </div>
                            </div>
                        </div>
                        </div>
                        </div> 
                    </div>
                    <div className="list-body-item">{item.added.substring(0,10)}</div>
                    <div className="list-body-item">{item.user == null ? "No Moderator" : item.user.username}</div> 
                    <div className="list-body-item list-body-btns">
                            <Link to={`/admin/students/${item.id}`} className="list-body-btn watch" >
                            <AiOutlineEye/>
                            </Link>
                            <Link to={`/admin/students/history/${item.id}`} className="list-body-btn history"> <AiOutlineHistory/> </Link>
                            <div onClick={()=>deleteOpen(item.id)} className="list-body-btn delete"> <AiOutlineDelete/> </div>

                            


                    </div>
                </div>
            )
        })
            
        }
        <div className={openDelete ? "delete-modal active" : 'delete-modal'}>
                <div className="delete-modal-content">
                    Talaba: {deleteId ? studentData.find(x => x.id == deleteId).name : ''}
                <div className="buttons">
                <div onClick={()=>setOpenDelete(false)} className="cancel">
                    Bekor qilish
                </div>
                <div onClick={deleteStudent} className="delete">
                  <AiOutlineDelete/>  O'chirish
                </div>
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
             <div onClick={nextPage} className={currentEnd >= students.length ? "pagination-btn disable" : "pagination-btn"}>
                <BsFillArrowRightSquareFill/>
             </div>
        </div>
        </div>
    </div>
  )
}

export default StudentList