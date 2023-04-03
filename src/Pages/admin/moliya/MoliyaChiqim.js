import React , {useState, useEffect} from 'react'
import MoliyaNav from '../../../Components/Admin/moliya/MoliyaNav'
import '../../../styles/admin/moliya/moliya.scss'
import {FaUser,FaUserCog,FaMoneyCheckAlt} from 'react-icons/fa'
import {AiOutlinePrinter,AiOutlinePlus,AiOutlineDelete} from 'react-icons/ai'
import {IoLogoUsd} from 'react-icons/io'
import {MdEdit} from 'react-icons/md'
import {FiDownload} from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { changeRefresh } from '../../../Redux/slice/refreshSlice'
import axios from 'axios'
import { Main_Url } from '../../../axios'

const MoliyaChiqim = () => {
 
    const [loading, setLoading] = useState(false)


    const kirim = 300000
  return (
    <div className='home'>
    <MoliyaNav active={'chiqim'}/>
    {
          loading ? 
          <div className="box-loading">
              <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
              <div className="loading-text">
                  Ma'lumotlar yuklanmoqda...
              </div>
          </div> 
          : <>
           <div className="kirim-nav">
          <div className="kirim-nav-left">
            <div className="kirim-nav-left-item chiqim-color">
              <div className="top">
                <p>Talaba qaytarish</p> <FaUser/>
              </div>
              <div className="money">
                - {kirim.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm
              </div>
            </div>
            <div className="kirim-nav-left-item chiqim-color">
              <div className="top">
              <p>Hodimlarga oylik</p> <FaUserCog/>
              </div>
              <div className="money">
                - {kirim.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm
              </div>
            </div>
            <div className="kirim-nav-left-item chiqim-color">
              <div className="top">
              <p>Boshqa</p> <IoLogoUsd/>
              </div>
              <div className="money">
                - {kirim.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm
              </div>
            </div>
          </div>
          <div className="kirim-nav-right">
            <div className="kirim-nav-right-item">
            <AiOutlinePrinter/>   Chop etish
            </div>
            <div className="kirim-nav-right-item">
              <FiDownload/>   Yuklab olish
            </div>
            <div className="kirim-nav-right-item">
            <AiOutlinePlus/>  Chiqim qo'shish
            </div>
          </div>
        </div>
         
          </>
        }
</div>
  )
}

export default MoliyaChiqim