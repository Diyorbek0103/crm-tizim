import React , {useState , useEffect} from 'react'
import {AiOutlineFilter , AiOutlineDelete, AiOutlineHistory} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {BiChevronDown , BiImport , BiExport} from 'react-icons/bi'
import {MdOutlineClose} from 'react-icons/md'
import ExportStudent from './ExportStudent'
import ImportStudent from './ImportStudent'
import { Main_Url } from '../../axios'

const StudentArxiv = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [studentData, setStudentData] = useState([])

  const [dropdown, setDropdown] =  useState(false)
  const [dropdownContent, setDropdownContent] = useState('Arxiv talabalar') 
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
       Arxiv talabalar
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
            <label htmlFor="holat">
                <select name="holat"  id="holat">
                    <option className='default' value="">To'lov holati</option>
                    <option value="qarzdor">Qarzdor</option>
                    <option value="tolangan">To'langan</option>
                </select>
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
                    Manzili
                </div>
                <div className="list-head-item">
                    Sozlamalar
                </div>
            </div>
            <div className="list-body">
                { 
                    studentData.map((item,index) => {
                    return (
                        <div key={item.id} className="list-body-items">
                            <div className="list-body-check">
                                <input type="checkbox" />
                            </div>
                            <div className="list-body-item-count">{index + 1}</div>
                            <div className="list-body-item">
                                <Link to={`/admin/students/${item.id}`}>{item.name}</Link>
                            </div>
                            <div className="list-body-item">+{item.phone.replace('+','').slice(0,3)} {"("}{item.phone.replace('+','').slice(3,5)}{")"} {item.phone.replace('+','').slice(5,8)}-{item.phone.replace('+','').slice(8,10)}-{item.phone.replace('+','').slice(10,12)} </div>
                            <div className="list-body-item "> <div className="qarzdor">Qarzdor</div> </div>
                            <div className="list-body-item">{item.added.substring(0,10)}</div>
                            <div className="list-body-item">{item.address}</div>
                            <div className="list-body-item list-body-btns">

                                    <Link to={`/admin/students/history/${item.id}`} className="list-body-btn history"> <AiOutlineHistory/> </Link>
                                    {/* <div className="list-body-btn edit"> <AiOutlineEdit/> </div> */}
                                    <div className="list-body-btn delete"> <AiOutlineDelete/> </div>
                            </div>
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

export default StudentArxiv