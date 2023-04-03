import React , {useState, useEffect} from 'react'
import {BiChevronDown , BiImport , BiExport} from 'react-icons/bi'
import {AiOutlinePlus} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import {MdOutlineClose} from 'react-icons/md'
import ExportStudent from './ExportStudent'
import ImportStudent from './ImportStudent'
import Davomat from '../../Components/Admin/Davomat'
import AddDavomat from '../../Components/Admin/AddDavomat'

const StudentAttendance = () => {

  const [dropdown, setDropdown] =  useState(false)
  const [dropdownContent, setDropdownContent] = useState('Talabalar davomati')
  const [addPop, setAddPop] = useState(false)
  const [importPop, setImportPop] = useState(false)
  const [exportPop, setExportPop] = useState(false)
  

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
    <div className={addPop ? "add-pop active": "add-pop"}>
      <div onClick={addClose} className="add-close">
      <MdOutlineClose/>
      </div>
      <AddDavomat/>
    </div>

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
       <div className="student-buttons">
        <div onClick={addClose} className="add-student student-btn">
        <AiOutlinePlus/>  Davomat qo'shish
        </div>
        <div onClick={importClose} className="import-student student-btn">
        <BiImport/>  Import
        </div>
        <div onClick={exportClose} className="export-student student-btn">
        <BiExport/>  Export
        </div>
       </div>
    </div>
    </>
       <Davomat/>
    </div>
  )
}

export default StudentAttendance