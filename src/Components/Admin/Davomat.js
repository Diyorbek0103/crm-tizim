import React , {useState} from 'react'
import '../../styles/admin/davomat.scss'
import {BsCheck} from 'react-icons/bs'
import {IoIosClose} from 'react-icons/io'
import {AiOutlineFilter} from 'react-icons/ai'

const Davomat = () => {

  

  return (
    <div className='davomat'>

      
        <div className="student-filter">
           <form className="student-filter-form">
            <label htmlFor="name">
                <input type="text" name='name' placeholder='FIO, Tel raqam...' />
            </label>
            <label htmlFor="kurs">
                <select name="kurs"  id="kurs">
                    <option className='default' value="">Kurs bo'yicha</option>
                    <option value="qarzdor">Matematika</option>
                    <option value="tolangan">English</option>
                </select>
            </label>
            <label htmlFor="sinf">
                <select name="sinf"  id="sinf">
                    <option className='default' value="">Sinf bo'yicha</option>
                    <option value="qarzdor">2022</option>
                    <option value="tolangan">2023</option>
                </select>
            </label>
            <div className="filter-btn">
             <AiOutlineFilter/>   Filter
            </div>
           </form>
        </div>

     <div className="davomat-list">
      <div className="davomat-list-head">
        <div className="davomat-list-head-item">T/R</div>
        <div className="davomat-list-head-item"> FIO</div>
        <div className="davomat-list-head-item">Sana</div>
        <div className="davomat-list-head-item">Kurs</div>
        <div className="davomat-list-head-item">Sinf</div>
        <div className="davomat-list-head-item">Holati</div>
       
      </div>
      <div className="davomat-list-body">
        <div className="davomat-list-body-items">
          <div className="davomat-list-body-item">1</div>
          <div className="davomat-list-body-item">Haitov Salohiddin</div>
          <div className="davomat-list-body-item">15-01-2023</div>
          <div className="davomat-list-body-item">Matematika</div>
          <div className="davomat-list-body-item"> 2022   </div>
          <div className="davomat-list-body-item "> <div className="holat">sababli</div>
          </div>
          
        </div>
      </div>
     </div>
    </div>
  )
}

export default Davomat