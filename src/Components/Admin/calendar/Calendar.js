import React , {useState,useEffect} from 'react'
import '../../../styles/admin/calendar.scss'
import {BsArrowLeftCircle,BsArrowRightCircle,BsFillFileEarmarkFill} from 'react-icons/bs'
import {AiFillEye} from 'react-icons/ai'
import { getMonthYear , DAYS, MOCKAPPS, getSortedDays, datesAreOnSameDay, prevMonth, nextMonth } from './utils'
import {IoMdCloseCircle} from 'react-icons/io'

const Calendar = () => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [singleDay, setSingleDay] = useState(null)
    const [closeSingle, setCloseSingle] = useState(false)
    const [events, setEvents] = useState(MOCKAPPS); 


    const changeClose =()=>{
        setCloseSingle(!closeSingle)
    }
    const getSingleDay =(day)=>{
        setSingleDay(day)
        changeClose()
    }

    useEffect(() => {
        const close = (e) => {
          if(e.keyCode === 27){
            setCloseSingle(false)
          }
        }
        window.addEventListener('keydown', close)
      return () => window.removeEventListener('keydown', close)
    },[])

     

  return (
    <div className='calendar'>
        <div className={closeSingle ? "calendar-single active" : "calendar-single"}>
            <div className="calendar-single-content">
                <div onClick={changeClose} className="close"><IoMdCloseCircle/></div>
                <div className="title">
                  {singleDay} , {getMonthYear(currentDate)}
                   
                </div>
                <div className="content-table">
                            <div className="content-table-head">
                            <div className="content-table-head-item-count">T/R </div>
                            <div className="content-table-head-item">Guruh</div>
                            <div className="content-table-head-item">So'ngi to'lov</div>
                            <div className="content-table-head-item">Keyingi to'lov </div>
                            <div className="content-table-head-item">To'lov holati</div>
                            <div className="content-table-head-item">Kelgan sanasi</div>
                            </div>
                            <div className="content-table-body">
                                <div className="content-table-body-items">
                                    <div className="content-table-body-item-count">1</div>
                                    <div className="content-table-body-item">Matematika 15</div>
                                    <div className="content-table-body-item">12 Jan, 2023</div>
                                    <div className="content-table-body-item">12 Fev, 2023</div>
                                    <div className="content-table-body-item"> 
                                      <div className="tolangan">To'langan</div>
                                    </div>
                                    <div className="content-table-body-item">10 Jan, 2023</div>
                                </div>
                            </div>
                        </div>
            </div>
        </div>
        <div className="calendar-title">
            Darslar jadvali
        </div>
        <div className="calendar-content">
            <div className="calendar-content-head">
               <BsArrowLeftCircle 
                 onClick={() => prevMonth(currentDate, setCurrentDate)}
               />
               <div className="current-date">
                 {getMonthYear(currentDate)}
               </div>
               <BsArrowRightCircle
                  onClick={() => nextMonth(currentDate, setCurrentDate)}
               />
            </div>
            <div className="calendar-content-table">
                <div className="calendar-content-table-head">
                    {DAYS.map(day=>(
                        <p>{day}</p>
                    ))}
                </div>
                <div className="calendar-content-table-body">
                    {getSortedDays(currentDate).map((day)=>(
                         <div
                           id={`${currentDate.getFullYear()}/${currentDate.getMonth()}/${day}`} 
                           className="calendar-content-table-body-item"
                          >
                            <div
                                className={`days ${
                                    datesAreOnSameDay(
                                    new Date(),
                                    new Date(
                                        currentDate.getFullYear(),
                                        currentDate.getMonth(),
                                        day
                                    )
                                    )
                                    ? "active"
                                    : ""
                                }`}
                                >
                              <p>{day}</p>
                               <div onClick={()=> getSingleDay(day)} className="view-all">
                                <AiFillEye/>
                               </div>
                            </div>
                             <div className="calendar-item-groups">
                                {
                                    events.map((ev, index) => datesAreOnSameDay(ev.date , new Date(currentDate.getFullYear(),
                                    currentDate.getMonth(),
                                    day)) && <p><BsFillFileEarmarkFill/> {ev.title}</p> 
                                )}
                            </div> 
                         </div>
                    ))}
                </div>
            </div>
        </div>

    </div>
  )
}

export default Calendar