import React , {useState} from 'react'
import {BiChevronDown , BiImport , BiExport} from 'react-icons/bi'
import {AiOutlinePlus,AiOutlineFilter} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import {MdOutlineClose} from 'react-icons/md'
import ExportStudent from './ExportStudent'
import ImportStudent from './ImportStudent'
import '../../styles/admin/exam.scss'

const StudentExams = () => {

  const [dropdown, setDropdown] =  useState(false)
  const [dropdownContent, setDropdownContent] = useState("Imtihonlar natijalari")
  const [addPop, setAddPop] = useState(false)
  const [importPop, setImportPop] = useState(false)
  const [exportPop, setExportPop] = useState(false)
  

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
       <div className="add-exams">
        Add Exams
       </div>
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
        <AiOutlinePlus/>  Natija qo'shish
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

    <div className="exam-lists">
        <div className="student-filter">
            <form className="student-filter-form">
              <label htmlFor="code">
                  <input type="text" name='code' placeholder='Kod...' />
              </label>
              <label htmlFor="name">
                  <select name="name"  id="name">
                      <option className='default' value="">Talaba</option>
                      <option value="qarzdor">Haitov Salohiddin</option>
                      <option value="tolangan">Behzod Asliddinov</option>
                  </select>
              </label>
              <label htmlFor="fan">
                  <select name="fan"  id="fan">
                      <option className='default' value="">Fan nomi</option>
                      <option value="qarzdor">Matematika</option>
                      <option value="tolangan">English</option>
                  </select>
              </label>
              <label htmlFor="date">
                <input type="date" />
              </label>
              <div className="filter-btn">
              <AiOutlineFilter/>   Filter
              </div>
            </form>
        </div>

    <div className="exam-list">
      <div className="exam-list-head">
        <div className="exam-list-head-item">Test kodi</div>
        <div className="exam-list-head-item"> FIO</div>
        <div className="exam-list-head-item">Telefon raqam</div>
        <div className="exam-list-head-item">Fan nomi</div>
        <div className="exam-list-head-item">Test sanasi</div>
        <div className="exam-list-head-item">Savollar soni</div>
        <div className="exam-list-head-item">Tog'ri javoblar</div>
       
      </div>
      <div className="exam-list-body">
        <div className="exam-list-body-items">
          <div className="exam-list-body-item">34621</div>
          <div className="exam-list-body-item">Haitov Salohiddin</div>
          <div className="exam-list-body-item">+998902354439</div>
          <div className="exam-list-body-item">Matematika</div>
          <div className="exam-list-body-item">12-21-2022</div>
          <div className="exam-list-body-item">30</div>
          <div className="exam-list-body-item ">22</div> 
        </div>
      </div>
     </div>
    </div>

    </div>
  )
}

export default StudentExams