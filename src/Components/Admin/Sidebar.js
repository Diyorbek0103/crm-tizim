import React,{useEffect, useState} from 'react'
import {FaUser} from 'react-icons/fa'
import {HiBars3} from 'react-icons/hi2'
import '../../styles/admin/sidebar.scss'
import {BiChevronDown,BiSun , BiMoon, BiChevronUp } from 'react-icons/bi'
import { useSelector, useDispatch } from 'react-redux'
import { darkToggle } from '../../Redux/slice/darkSlice'
//i18
import {useTranslation} from "react-i18next";
import i18next from "i18next"; 
import {FaLanguage, FaTimes , FaChartLine} from 'react-icons/fa'
import {GrClose} from 'react-icons/gr'
import { Link } from 'react-router-dom'
import {RxDashboard} from 'react-icons/rx'
import {FiUsers} from 'react-icons/fi'
import {RiExchangeDollarFill, RiLineChartFill} from 'react-icons/ri'
import {SlGraduation} from 'react-icons/sl'
import {SiGoogleclassroom} from 'react-icons/si'
import {HiOutlineDocumentDuplicate , HiOutlineUserGroup} from 'react-icons/hi'
import {MdOutlineMeetingRoom} from 'react-icons/md'
import {AiOutlineSetting} from 'react-icons/ai'
import {BsClipboardCheck} from 'react-icons/bs'
import {CiLogout} from 'react-icons/ci'
import logo from '../../images/top-logo.png'

const language = [
    {
      code: 'uz',
      name: 'O`zbekcha', 
      country_code: 'uz',
      flag: <FaLanguage/>
    },
    {
      code: 'ru',
      name: 'Русский',
      country_code: 'ru',
      flag: <FaLanguage />
    },
    {
      code: 'en',
      name: 'English',
      country_code: 'gb',
      flag: <FaLanguage />
    }

]

const Sidebar = () => {
    
    const [isOpen, setIsOpen] = useState(false)
    const [sidebar, setSidebar] = useState(false)
    const [isSetting,setIsSetting] = useState(false)
    const [isLog, setIsLog] = useState(false)
    const [activeClass, setActiveClass] = useState(1) 

    const dark = useSelector(state => state.dark.darkMode)
    const dispatch = useDispatch()
   
    const { t } = useTranslation();

    const openToggle = ()=>{
        setIsOpen(!isOpen)
    }

    const openSetting =()=>{
      setIsSetting(!isSetting)
    }

    const openSidebar = ()=>{
        setSidebar(!sidebar)
    }

    const currentLanguage = localStorage.getItem('i18nextLng');
    useEffect(() => { 
      let activeLang = document.querySelectorAll('.nav-language-item');
  
      activeLang.forEach(item => {
          item.classList.remove('active');
      })
      
      activeLang.forEach(item => { 
        if (item.getAttribute('lang-data') === currentLanguage) { 
          item.classList.add('active');
        }
      })
    }, [currentLanguage])

    const changeLanguage = (lang) => {
        i18next.changeLanguage(lang);
        localStorage.setItem('i18nextLng', lang);
        let activeLang = document.querySelectorAll('.nav-language-item');
    
        activeLang.forEach(item => {
            item.classList.remove('active');
        })
        
        activeLang.forEach(item => { 
          if (item.getAttribute('lang-data') === lang) { 
            item.classList.add('active');
          }
        }) 
      }


    
    const SidebarLink = [
      {
        id:1,
        route: "/admin",
        icon: <RxDashboard/>,
        text: 'Asosiy'
      },
      {
        id:2,
        route: "/admin/students",
        icon: <SlGraduation/>,
        text: 'Talabalar'
      },
      {
        id:3,
        route: "/admin/groups",
        icon: <HiOutlineUserGroup/>,
        text: 'Guruhlar'
      },
      {
        id:4,
        route: "/admin/classroom",
        icon: <SiGoogleclassroom/>,
        text: 'Sinflar'
      },
      {
        id:5,
        route: "/admin/courses",
        icon: <HiOutlineDocumentDuplicate/>,
        text: 'Kurslar'
      },
      {
        id:6,
        route: "/admin/rooms",
        icon: <MdOutlineMeetingRoom/>,
        text: 'Xonalar'
      },
      {
        id:7,
        route: "/admin/staffs",
        icon: <FiUsers/>,
        text: 'Hodimlar'
      },
      {
        id:8,
        route: "/admin/economic",
        icon: <RiExchangeDollarFill/>,
        text: 'Moliya'
      },
      {
        id:9,
        route: "/admin/statistic",
        icon: <FaChartLine/>,
        text: 'Statistika'
      } 
      ,
      {
        id:10,
        route: "/admin/results",
        icon: <BsClipboardCheck/>,
        text: 'Natijalar'
      } 
    ]

     const activeLink = (e) => { 
       const item = document.querySelectorAll('.sidebar-link')
       item.forEach(thisItem => thisItem.classList.remove('active'))
        e.currentTarget.className += " active"
     }


     const Logout =()=>{
      setIsLog(true)
      JSON.parse(localStorage.removeItem('jwtToken'))
      
     }

     if(isLog){
      window.location.reload()
     }



  return (
    <div className='sidebar'>
        <div className="topbar">
           <div className="topbar-left">
            <div onClick={openSidebar} className="topbar-bars">
            <HiBars3/>
            </div>
            <Link to={'/admin'} className="topbar-logo">
                <img src={logo} alt="" />
            </Link>
           </div>

          <div className="topbar-right">
           <div 
            className="login-mode"
            onClick={()=> dispatch(darkToggle())}
            >
                {dark ? <BiSun/> : <BiMoon/>}
           </div>
          
          <div className="login-lang">
             <div onClick={openToggle} className="login-lang__dropdown">
                {
                        language.map((item,index) => (
                        <div key={index}>
                        {item.code == currentLanguage ? <div className="current-lang">{item.name} {isOpen ? <BiChevronUp/> : <BiChevronDown/>} </div> : ""}
                        </div>
                        ))
                }
             </div>
             <div onClick={openToggle} className={isOpen ? "login-lang__content active" : "login-lang__content"}>
                    {
                        language.map((lang,index) => (
                        <div  lang-data={lang.code}  className="nav-language-item" key={index} onClick={() => changeLanguage(lang.code)}>
                            {lang.name}
                        </div>
                        ))
                    }
             </div>

          </div>

          <div className="login-user">
            <div onClick={openSetting} className="login-user-logo">
              <FaUser/>
            </div>
            <div onClick={openSetting} className={isSetting ? "login-user-content active":"login-user-content"} >
              <Link className='login-user-link' to="/admin/setting" > <AiOutlineSetting/> Sozlamalar</Link>
              <div onClick={Logout} className="login-user-link"> <CiLogout/> Chiqish</div>
            </div>
          </div>

        </div>
        </div>
        <div className={sidebar ? "mini-sidebar inactive":"mini-sidebar"}>
            <div className="mini-sidebar-links">
                  {
                    SidebarLink.map(item=>{
                      return(
                      <Link 
                          to={item.route} 
                          key={item.id} 
                          className={activeClass == item.id ? 'mini-sidebar-link-box active': 'mini-sidebar-link-box'} 
                          onClick={()=>setActiveClass(item.id)}
                          > 
                      <div  className="mini-sidebar-link">
                        <Link to={item.route}>
                        {item.icon}   
                        </Link> 
                      </div>
                      <div className='mini-sidebar-text'>{item.text}</div>
                      </Link>
                      )
                    })
                  }   
            </div>
        </div>
        <div className={sidebar ? "sidebar-content active" : "sidebar-content"}>
            <div onClick={openSidebar} className="close-btn">
             <GrClose/>
             </div>
             <div  onClick={openSidebar} className="sidebar-links">
                  {
                    SidebarLink.map(item=>{
                      return(
                      <div onClick={(e)=> activeLink(e)}  key={item.id} className="sidebar-link">
                        <Link to={item.route}>
                        {item.icon}  <p>{item.text}</p> 
                        </Link>
                      </div>
                      )
                    })
                  }
                
             </div>
        </div>
        <div  onClick={openSidebar} className={sidebar ? "sidebar-layout active" : "sidebar-layout"}></div>
    </div>
  )
}

export default Sidebar

