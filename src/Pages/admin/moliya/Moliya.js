import React , {useState, useEffect} from 'react'
import MoliyaNav from '../../../Components/Admin/moliya/MoliyaNav'
import '../../../styles/admin/moliya/moliya.scss'
import {FaMoneyBill,FaMoneyCheck,FaMoneyCheckAlt} from 'react-icons/fa'
import {AiOutlinePrinter,AiOutlinePlus,AiOutlineDelete} from 'react-icons/ai'
import {MdEdit} from 'react-icons/md'
import {FiDownload} from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { changeRefresh } from '../../../Redux/slice/refreshSlice'
import axios from 'axios'
import { Main_Url } from '../../../axios'

const Moliya = () => {

  const refreshKey = useSelector(state=> state.refreshKey.refreshKey)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  const [loading, setLoading] = useState(true)
  const [payment, setPayment]=useState([])

  useEffect(()=>{
    axios.get(`${Main_Url}payment/`)
    .then((result) => {
      setPayment(result.data)
      setLoading(false)
    }).catch((err) => {
      console.log(err);
    });

  },[refreshKey])

  const kirim = 500000

  return (
    <div className='home'>
        <MoliyaNav active={'kirim'}/>
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
            <div className="kirim-nav-left-item">
              <div className="top">
                <p>Naqt</p> <FaMoneyBill/>
              </div>
              <div className="money">
                + {kirim.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm
              </div>
            </div>
            <div className="kirim-nav-left-item">
              <div className="top">
              <p>Karta</p> <FaMoneyCheck/>
              </div>
              <div className="money">
                + {kirim.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm
              </div>
            </div>
            <div className="kirim-nav-left-item">
              <div className="top">
              <p>O'tkazma</p> <FaMoneyCheckAlt/>
              </div>
              <div className="money">
                + {kirim.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm
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
            <AiOutlinePlus/>  Kirim qo'shish
            </div>
          </div>
        </div>
        <div className="kirim-filter">
          <form className="kirim-filter-form">
            <label htmlFor="name" className="kirim-filter-form-item">
              <input type="text" name='name' placeholder='Talaba FIO' />
            </label>
            <label htmlFor="manager" className="kirim-filter-form-item">
              <input type="text" name='manager' placeholder='Manager nomi' />
            </label>
            <label htmlFor="payment" className="kirim-filter-form-item">
              <select name="payment" id="payment">
                <option value="">Naxt</option>
                <option value="">Karta</option>
                <option value="">Tranzaksiya</option>
              </select>
            </label>
            <label htmlFor="date" className="kirim-filter-form-item">
              <input type="date" name='date' />
            </label>
            <div className="kirim-filter-form-btn">
              Filter
            </div>
          </form>
        </div>
        <div className="kirim-list">
          <div className="kirim-list-head">
            <div className="kirim-list-head-item-count">T/R</div>
            <div className="kirim-list-head-item">Talaba</div>
            <div className="kirim-list-head-item">Manager</div>
            <div className="kirim-list-head-item">To'lov turi</div>
            <div className="kirim-list-head-item">Qiymati</div>
            <div className="kirim-list-head-item">To'lov vaqti</div>
            <div className="kirim-list-head-item">Izoh</div>
            <div className="kirim-list-head-item-setting">Sozlamalar</div>
          </div>
          <div className="kirim-list-body">
            {
              payment.map((item,index)=>{
                return (
                  <div key={index} className="kirim-list-body-items">
                      <div className="kirim-list-body-item-count">{index + 1}</div>
                      <div className="kirim-list-body-item">{item.student ? item.student.name : 'null'}</div>
                      <div className="kirim-list-body-item">{item.user.username}</div>
                      <div className="kirim-list-body-item">{item.type}</div>
                      <div className="kirim-list-body-item">{item.cost.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm</div>
                      <div className="kirim-list-body-item">{item.sana}</div>
                      <div className="kirim-list-body-item izoh">izoh</div>
                      <div className="kirim-list-body-item-setting">
                      <div className="setting-edit"><MdEdit/></div>
                                <div className="setting-delete"><AiOutlineDelete/></div>
                      </div>
                  </div>
                )
              })
            }
          </div>
        </div>
          </>
        }
       
    </div>
  )
}

export default Moliya