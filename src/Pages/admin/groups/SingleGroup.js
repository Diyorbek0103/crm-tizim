import React , {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {AiOutlinePlus,AiOutlineDelete} from 'react-icons/ai'
import {MdEdit} from 'react-icons/md'
import axios from 'axios'
import { Main_Url } from '../../../axios'
import { useSelector, useDispatch } from 'react-redux'
import {IoMdCloseCircle} from 'react-icons/io'
import { changeRefresh } from '../../../Redux/slice/refreshSlice'
import Select from 'react-select';
import makeAnimated from 'react-select/animated'; 
import { ToastContainer, toast } from 'react-toastify';

const animatedComponents = makeAnimated();

const SingleGroup = () => {
    const {id} = useParams()

    const [singleGroup, setSingleGroup] = useState([])
    const [loading, setLoading] = useState(true)
    const [addPop, setAddPop] = useState(false)
    const [selectOption, setSelectOption] = useState([])

    const refreshKey = useSelector(state=> state.refreshKey.refreshKey)
    const students = useSelector(state=> state.students.students)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

   

    const handleButtonClick = () => {
        // Map over the array and set new id and name values
        const updatedArray = students.map((element) => ({
          ...selectOption,
          value: element.id,
          label: element.name
        }));
    
        // Set the updated array to state
        setSelectOption(updatedArray);
      };
 

      console.log(singleGroup);
    
    
    useEffect(()=>{ 
        handleButtonClick()
       axios.get(`${Main_Url}groups/${id}/`)
       .then(data=>{
        setSingleGroup(data.data) 
        setLoading(false)
      
       })
       .catch(err=>{
        console.log(err)
       })
    },[refreshKey])

    // set value for default selection
    const [selectedValue, setSelectedValue] = useState([]);
    
    // handle onChange event of the dropdown
    const handleChange = (e) => {
        const updatedArray = e.map((element) => ({
            ...selectedValue,
            id: element.value, 
          }));

        setSelectedValue(updatedArray);
    }

    const handleSubmit =()=>{
        setLoading(true)
        let config = {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',   
              'Authorization': `Bearer ${user.access}`
        }}

        axios.put(`${Main_Url}groups/${id}/`,{
          "students": selectedValue
        }, config)
        .then(data=>{
            dispatch(changeRefresh())
            console.log(data);
            setLoading(false)
            setAddPop(false)
            toast.success('Talabalar muvaffaqiyatli qo`shildi') 
        })
        .catch(err=>{
            console.log(err);
            toast.error('Talabala qo`shishda xatolik') 
        })

    }
    

    

     
     
    const openPop =()=>{
        setAddPop(!addPop)
    } 

    const {course , day , education, finish,finish_lesson,start,start_lesson, name,room,status,teacher,student} = singleGroup
  
    return (
    <div className='home'>
         <ToastContainer/>
        {
            loading ? 
            <div className="box-loading">
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                <div className="loading-text">
                    Ma'lumotlar yuklanmoqda...
                </div>
            </div> 
            : 
            <>
           
            <div className={addPop ? "add-student-group " :"add-student-group close"}>
                <div onClick={()=> setAddPop(false)} className="overlay"></div>
                <div className="add-student-group-content">
                    <IoMdCloseCircle onClick={openPop} />
                    <div className="title">
                        Guruh uchun Talabalarni tanlang
                    </div>

                    <Select 
                        onChange={handleChange} 
                        isMulti
                        isClearable
                        options={selectOption}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                    />

                    <div onClick={handleSubmit} className="submit-btn">
                        Talabalarni qo'shish
                    </div>

                </div>
            </div>

            <div className="single-group-head">
                <div className="head-box">
                <div className="name-top">Guruh</div> 
                <div className="name">{name}</div>   
                </div>  
                <div className="head-box head-box-2">
                    <div className="status">
                        {
                            status == 'active' ? <div className="active">{status}</div> : <div className="inActive">{status}</div>
                        }
                    </div>
                    <div onClick={openPop} className="add-student">
                   <AiOutlinePlus/> Talaba biriktirish
                    </div>
                </div>  
            </div>    
            <div className="single-group-body">
            <div className="single-group-body-left">
              <div className="single-table-head">
               <div className="single-table-head-count">T/R</div>
               <div className="single-table-head-item">Talaba FIO</div>
               <div className="single-table-head-item">Tel raqam</div>
               <div className="single-table-head-item">To'lov holati</div>
               <div className="single-table-head-item">Boshlanish sanasi</div>
               <div className="single-table-head-setting">Sozlamalar</div>
              </div>    
              <div className="single-table-body">
            {
            singleGroup.student.length > 0 ? singleGroup.student.map((item, index)=>{
                return(
                    <div key={index} className="single-table-body-items"> 
                        <div className="single-table-body-count">{index + 1}</div>
                        <div className="single-table-body-item">{item.name}</div>
                        <div className="single-table-body-item">{item.phone ? ` +${item.phone.replace('+','').slice(0,3)} ${"("}${item.phone.replace('+','').slice(3,5)}${")"} ${item.phone.replace('+','').slice(5,8)}-${item.phone.replace('+','').slice(8,10)}-${item.phone.replace('+','').slice(10,12)}` : 'No Number'}</div>
                        <div className="single-table-body-item">{item.added.substring(0,10)}</div>
                        <div className="single-table-body-item">{item.added.substring(0,10)}</div>
                        <div className="single-table-body-setting"> 
                            <div className="setting-delete"><AiOutlineDelete/></div>
                        </div>
                        </div>  
                )
            }) : 'No data'
            }  
              </div>    
            </div>    
                <div  className="single-group-body-right">
                <div className="single-group-body-right-item">
                     <div className="title">O'qituvchi:</div>
                     <div className="text">{teacher ? teacher.username : ''}</div>
                </div>   
                <div className="single-group-body-right-item">
                     <div className="title">Dars vaqti:</div>
                     <div className="text">{day.map(days => <span>{days}</span>)} kunlar</div>
                </div>  
                <div className="single-group-body-right-item">
                     <div className="title">Dars boshlanishi:</div>
                     <div className="text">{start_lesson}</div>
                </div> 
                <div className="single-group-body-right-item">
                     <div className="title">Dars tugashi:</div>
                     <div className="text">{finish_lesson}</div>
                </div> 
                <div className="single-group-body-right-item">
                     <div className="title">Kurs nomi:</div>
                     <div className="text">{course ? course.name : ''}</div>
                </div> 
                <div className="single-group-body-right-item">
                     <div className="title">Kurs narxi:</div>
                     <div className="text">{course ? course.cost.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : ''} so'm</div>
                </div> 
                
                <div className="single-group-body-right-item">
                     <div className="title">Dars turi:</div>
                     <div className="text">{education}</div>
                </div> 
                <div className="single-group-body-right-item">
                     <div className="title">Xona:</div>
                     <div className="text">{room ? room.name : 'No data'}</div>
                </div> 
                <div className="single-group-body-right-item">
                     <div className="title">Boshlangan sana:</div>
                     <div className="text">{start}</div>
                </div> 
                <div className="single-group-body-right-item">
                     <div className="title">Tugash sana:</div>
                     <div className="text">{finish}</div>
                </div> 
              </div>  
               
            </div> 
            </>

        }
         
    </div>
  )
}

export default SingleGroup
 