import React ,{useEffect , useState} from 'react'
import '../../../styles/admin/result/result.scss'
import { BiImport , BiExport} from 'react-icons/bi'
import {AiOutlinePlus,AiOutlineDelete} from 'react-icons/ai'
import {MdEdit} from 'react-icons/md'
import axios from 'axios'
import { Main_Url } from '../../../axios'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { changeRefresh } from '../../../Redux/slice/refreshSlice'

const Result = () => {

  const refreshKey = useSelector(state=> state.refreshKey.refreshKey)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const [courses, setCourses] =  useState([])

  useEffect(()=>{
    axios.get(`${Main_Url}test/`)
     .then(data=>{
         setCourses(data.data);
         setLoading(false)
         console.log(data)
     })
     .catch(err=>{
         console.log(err);
     })

 },[refreshKey])

  return (
    <div className='home'>
      <div className="result-nav">
        <div className="result-nav-title">
          Test Natijalari
        </div>
        <div className="result-nav-btns">
          <div className="result-nav-btn"> <AiOutlinePlus/> Natijani qo'shish</div>
          <div className="result-nav-btn"> <BiImport/> Import</div>
          <div className="result-nav-btn"> <BiExport/> Export</div>
        </div>
      </div>
      <form className="result-filter">
        <label htmlFor="code">
          <input type="text" placeholder='Test kodi' />
        </label>
        <label htmlFor="name">
          <input type="text" placeholder='Talaba, Guruh, Telefon' />
        </label>
        <label htmlFor="teacher">
          <input type="text" placeholder='O`qituvchi' />
        </label>
        <div className="filter-btn">
          Filter
        </div>
      </form>

      {
        loading ? 
        <div className="box-loading">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <div className="loading-text">
                Ma'lumotlar yuklanmoqda...
            </div>
        </div> 
        :
      <div className="result-list">
        <div className="result-list-head">
          <div className="result-list-head-item-count">T/R</div>
          <div className="result-list-head-item">Test kodi</div>
          <div className="result-list-head-item">Guruh nomi</div>
          <div className="result-list-head-item">Talaba</div>
          <div className="result-list-head-item">Tel</div>
          <div className="result-list-head-item">O'qituvchi</div>
          <div className="result-list-head-item">Test Soni</div>
          <div className="result-list-head-item">Togri javoblar</div>
          <div className="result-list-head-item-setting">Sozlamalar</div>
        </div>
        <div className="result-list-body">
          <div className="result-list-body-items">
          <div className="result-list-body-item-count">1</div>
          <div className="result-list-body-item">10089</div>
          <div className="result-list-body-item">Matematika 16</div>
          <div className="result-list-body-item">Haitov Salohiddin</div>
          <div className="result-list-body-item">+998902354439</div>
          <div className="result-list-body-item">Behzod Asliddinov</div>
          <div className="result-list-body-item">30</div>
          <div className="result-list-body-item">28</div>
          <div className="result-list-body-item-setting">
                <div className="setting-edit"><MdEdit/></div>
                <div className="setting-delete"><AiOutlineDelete/></div>
          </div>
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default Result