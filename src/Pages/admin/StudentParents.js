import React , {useState , useEffect} from 'react'
import {AiOutlineFilter , AiOutlineDelete, AiOutlineHistory} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {BiChevronDown , BiImport , BiExport} from 'react-icons/bi'
import {MdOutlineClose} from 'react-icons/md'
import ExportStudent from './ExportStudent'
import ImportStudent from './ImportStudent'
import { Main_Url } from '../../axios'

const StudentParents = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [studentData, setStudentData] = useState([])

  const [dropdown, setDropdown] =  useState(false)
  const [dropdownContent, setDropdownContent] = useState(`Ota onalar ro'yxati`) 
  const [importPop, setImportPop] = useState(false)
  const [exportPop, setExportPop] = useState(false)
   
 
    useEffect(()=>{
        axios.get(`${Main_Url}students/`)
         .then(data=>{
            console.log(data.data);
            setStudentData(data.data)
            setIsLoading(false)
         })
         .catch(err=>{
            console.log(err);
         })
    },[])

   
    const importClose =()=>{
      setImportPop(!importPop)
    }
    const exportClose =()=>{
      setExportPop(!exportPop)
    }
  
  
    const openDropdown = ()=>{
      setDropdown(!dropdown)
    }

  return (
    <div className='home'>
        <> 
    <div className={exportPop ? "add-pop active": "add-pop"}>
      <div onClick={exportClose} className="add-close">
      <MdOutlineClose/>
      </div>
      <ExportStudent/>
    </div>

    <div className={importPop ? "add-pop active": "add-pop"}>
      <div onClick={importClose} className="add-close">
      <MdOutlineClose/>
      </div>
      <ImportStudent/>
    </div>
    <div className='student-nav'>
       <div className="choose-student">
        <div onClick={openDropdown} className="current-choose">
         {dropdownContent} <BiChevronDown/>   
        </div>
        <div onClick={openDropdown} className={dropdown ? "choose-dropdown active" : "choose-dropdown"}>
          <Link to={'/admin/students'} onClick={()=> setDropdownContent(`Talabalar ro'yxati`)} className="choose-dropdown-item">Talabalar ro`yxati</Link>
          <Link to={'/admin/students/attendance'} onClick={()=> setDropdownContent('Talabalar davomati')} className="choose-dropdown-item">Talabalar davomati</Link>
          <Link to={'/admin/students/aktiv'} onClick={()=> setDropdownContent(`Faol talabalar`)}  className="choose-dropdown-item">Faol talabalar</Link>
          <Link to={'/admin/students/arxiv'} onClick={()=> setDropdownContent(`Arxiv talabalar`)}  className="choose-dropdown-item">Arxiv talabalar</Link>
          <Link to={'/admin/students/parents'} onClick={()=> setDropdownContent(`Ota onalar ro'yxati`)}  className="choose-dropdown-item">Ota onalar ro'yxati</Link>
          <Link to={'/admin/students/exams'} onClick={()=> setDropdownContent(`Imtihonlar natijalari`)}  className="choose-dropdown-item">Imtihonlar natijalari</Link>
        </div>
       </div>
       <div className="other-title">
       Ota onalar ro'yxati
       </div>
       <div className="student-buttons">
        <div onClick={importClose} className="import-student student-btn">
        <BiImport/>  Import
        </div>
        <div onClick={exportClose} className="export-student student-btn">
        <BiExport/>  Export
        </div>
       </div>
    </div>
    </>
       
       
       {
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
                <input type="text" name='name' placeholder='FIO, Tel raqam...' />
            </label>
             
            <label htmlFor="address">
                <input type="text" name='address' placeholder='Manzil...' />
            </label>
            <div className="filter-btn">
              <AiOutlineFilter/>   Filter
            </div>
            </form>
        </div>

        
        <div className='student-list'>
            <div className="list-head">
                <div className="list-head-check">
                   T/R
                </div>
                <div className="list-head-item">
                    Otasining ismi
                </div>
                <div className="list-head-item">
                    Onasining ismi
                </div>
                <div className="list-head-item">
                    Otasining tel.
                </div>
                <div className="list-head-item">
                    Talaba ismi
                </div>
                <div className="list-head-item">
                    Talaba tel.
                </div>
                {/* <div className="list-head-item">
                    Yaratilgan sanasi
                </div> */}
                <div className="list-head-item">
                    Manzili
                </div> 
            </div>
            <div className="list-body">
                { 
                    studentData.map((item,index) => {
                    return (
                        <div key={item.id} className="list-body-items">
                            <div className="list-body-check">
                                {index + 1}
                            </div>
                            <div className="list-body-item">
                              {item.father_name}
                            </div>
                            <div className="list-body-item">
                              {item.mother_name}
                            </div>
                            <div className="list-body-item">{item.parent}</div>
                            <div className="list-body-item "> {item.name} </div>
                            <div className="list-body-item">+{item.phone.replace('+','').slice(0,3)} {"("}{item.phone.replace('+','').slice(3,5)}{")"} {item.phone.replace('+','').slice(5,8)}-{item.phone.replace('+','').slice(8,10)}-{item.phone.replace('+','').slice(10,12)} </div>
                            {/* <div className="list-body-item">{item.added.substring(0,10)}</div> */}
                            <div className="list-body-item  "> {item.address} </div>
                        </div>
                    )
                })
                
                }
            </div> 
        </div>
      </div>
      }
    </div>
  )
}

export default StudentParents