import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {AiOutlinePrinter,AiOutlineFilter} from 'react-icons/ai'
import {Main_Url} from '../../axios'

import Invoce from '../../Components/Admin/Invoce'

const StudentHistory = () => {
   const {id} = useParams()
   const [student,setStudent] = useState({})
   const [loading, setLoading] = useState(true)
   const [addPop, setAddPop] = useState(false)
   const num = 500000

   useEffect(()=>{
     axios.get(`${Main_Url}students/${id}`)
     .then(data=>{
      setStudent(data.data)
      setLoading(false)
     })
   },[id])

   useEffect(() => {
    const close = (e) => {
      if(e.keyCode === 27){
        setAddPop(false)
      }
    }
    window.addEventListener('keydown', close)
  return () => window.removeEventListener('keydown', close)
},[])

   const addClose =()=>{
    setAddPop(!addPop)
  }

  const AllPrint = ()=>{
    window.print()
  }

 

  return (
    <> 
    {
      loading ? 
      <div className="box-loading">
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <div className="loading-text">
            Ma'lumotlar yuklanmoqda...
        </div>
    </div> :
    <div className='home'>
    <div className="single">
    <div className="single-head">
      <div className="single-head-left">
      <div className="subtitle">
        To'lovlar tarixi
      </div>
      <div className="title">
      {student.name}
      </div>
      </div>
      <div className="single-head-right">
        <div className="balance">
        Balans: 0
        </div>
        <a href={`tel:${student.phone}`} className="phone">
            {student.phone}
        </a>
        <div onClick={AllPrint} className="all-print">
        <AiOutlinePrinter/>  Chop etish
        </div>
        
      </div>

      </div>
    </div>
    <div className="margin-30"></div>
    <div className="student-filter">
           <form className="student-filter-form">
            <label htmlFor="name">
                <input type="text" name='name' placeholder='ID...' />
            </label>
            <label htmlFor="holat">
                <select name="holat"  id="holat">
                    <option className='default' value="">Kurslar</option>
                    <option value="qarzdor">Matematika</option>
                    <option value="tolangan">English</option>
                </select>
            </label>
            <label htmlFor="turi">
                <select name="turi"  id="turi">
                    <option className='default' value="">To'lov turi</option>
                    <option value="qarzdor">Naxt</option>
                    <option value="tolangan">Karta</option>
                </select>
            </label>
            <label htmlFor="address">
                <input type="date" />
            </label>
            <div className="filter-btn">
             <AiOutlineFilter/>   Filter
            </div>
           </form>
        </div>
    <div className="history-list">
      <div className="list-head">
            <div className="last">
                T/R
            </div>
            <div className="list-head-item ">
                ID
            </div>
            <div className="list-head-item">
                To'lov sanasi
            </div>
            <div className="list-head-item">
                To'lov turi
            </div>
            <div className="list-head-item">
                Kurs
            </div>
            <div className="list-head-item">
            To'lov summasi
            </div>
            <div className="list-head-item">
                Izoh
            </div> 
            <div className=" last">
                PDF
            </div>
      </div>
      <div className="list-body">
         <div className=" last">
                1
         </div>
        <div className="list-body-item">
          123456
        </div>
        <div className="list-body-item">
          12-31-2022
        </div>
        <div className="list-body-item">
          Naxt
        </div>
        <div className="list-body-item">
          Matematika
        </div>
        <div className="list-body-item">
          {num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm
        </div>
        <div className="list-body-item">
          Yanvar oyi uchun
        </div>
        <div className="last">
          <AiOutlinePrinter onClick={addClose}/>
        </div>
      </div>
          <div className={addPop ? "add-pop active": "add-pop"}>
              <Invoce setAddPop={setAddPop}/>
          </div>
    </div>
    </div>
    }
    </>
  )
}

export default StudentHistory