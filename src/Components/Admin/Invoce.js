import React from 'react'
import {MdOutlineClose} from 'react-icons/md'
import logo from '../../images/check-logo.png'

const Invoce = ({setAddPop}) => {

    const Check =()=>{
       window.print()
    }

     
  return (
    <div className="payment-invoce">
                 <div className="payment-invoce-head">
                   <div className="text">
                    Kvitansiya
                   </div>
                   <div onClick={()=>setAddPop(false)} className="payment-close">
                    <MdOutlineClose/>
                    </div>
                 </div>
                 <div className="payment-invoce-line"></div>
                 <div id='invoceCheck'  className="payment-invoce-body">
                    <div className="payment-logo">
                      <img src={logo} alt="" />
                    </div>
                    <div className="payment-invoce-body-info">
                      <div className="info-item">
                        <div className="info-item-title">Chek raqami:</div>
                        <div className="info-item-text">235627</div>
                      </div>
                      <div className="info-item">
                        <div className="info-item-title">Talaba:</div>
                        <div className="info-item-text">Haitov Salohiddin</div>
                      </div>
                      <div className="info-item">
                        <div className="info-item-title">Turi:</div>
                        <div className="info-item-text">Naqd pul</div>
                      </div>
                      <div className="info-item">
                        <div className="info-item-title">To'lov miqdori:</div>
                        <div className="info-item-text">300 000 so'm</div>
                      </div>
                      <div className="info-item">
                        <div className="info-item-title">To'lov vaqti:</div>
                        <div className="info-item-text">12-12-2022</div>
                      </div>
                    </div>
                    

                 </div>
                 <div  onClick={Check}  className="payment-invoce-btn">
                  Chop etish
                 </div>
              </div>
  )
}

export default Invoce