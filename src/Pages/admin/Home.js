import React from 'react'
import '../../styles/admin/home.scss'
import {FiUsers,FiUserCheck,FiUserX,FiUserMinus, FiUserPlus} from 'react-icons/fi'
import {HiOutlineUserGroup} from 'react-icons/hi'
import {BsClipboardPlus,BsDoorOpen,BsClipboardCheck} from 'react-icons/bs'
import {GrUserManager} from 'react-icons/gr'
import {AiOutlineHistory} from 'react-icons/ai'
import {SiGoogleclassroom} from 'react-icons/si'
import { Link } from 'react-router-dom'
import Calendar from '../../Components/Admin/calendar/Calendar'

const Home = () => {

   const homeData = [
    {
      id: 1,
      title: "Barcha talabalar",
      icon: <FiUsers/>,
      count: 235,
      link: "/admin/students"
    },
    {
      id: 2,
      title: "Yangi talabalar",
      icon: <FiUserPlus/>,
      count: 150,
      link: "/admin/students/yangi"
    },
    {
      id: 3,
      title: "Faol talabalar",
      icon: <FiUserCheck/>,
      count: 150,
      link: "/admin/students/aktiv"
    },
    {
      id: 4,
      title: "Qarzdor talabalar",
      icon: <FiUserMinus/>,
      count: 70,
      link: "/admin/students/qarzdor"
    },
    {
      id: 5,
      title: "Arxiv talabalar",
      icon: <FiUserX/>,
      count: 15,
      link: "/admin/students/arxiv"
    },
    {
      id: 6,
      title: "Guruhlar",
      icon: <HiOutlineUserGroup/>,
      count: 25,
      link: "/admin/students"
    },
    {
      id: 7,
      title: "Kurslar",
      icon: <BsClipboardPlus/>,
      count: 16,
      link: "/admin/students"
    },
    {
      id: 8,
      title: "Sinflar",
      icon: <BsDoorOpen/>,
      count: 6,
      link: "/admin/students"
    },
    {
      id: 9,
      title: "To'lovlar tarixi",
      icon: <AiOutlineHistory/>,
      count: 10,
      link: "/admin/students"
    },
    {
      id: 10,
      title: "Barcha hodimlar",
      icon: <GrUserManager/>,
      count: 43,
      link: "/admin/students"
    },
    {
      id: 11,
      title: "Natijalar",
      icon: <BsClipboardCheck/>,
      count: 23,
      link: "/admin/students"
    },
    {
      id: 12,
      title: "Xonalar",
      icon: <SiGoogleclassroom/>,
      count: 11,
      link: "/admin/students"
    }, 
   ]



  return (
    <div className='home'>
      <div className="home-content">
        {
          homeData.map(item => {
              return(
                <Link to={item.link} key={item.id} className="home-content-item">
                  <div className="item-left">
                    <div className="item-left-title">
                    {item.title}
                    </div>
                    <div className="item-left-count">
                    {item.count}
                    </div>
                  </div>
                  <div className="item-right">
                    {item.icon}
                  </div>
                </Link>
              )
          })
        }
      </div>
      <Calendar/>
    </div>
  )
}

export default Home