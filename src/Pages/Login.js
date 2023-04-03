import React,{useEffect , useState} from 'react'
import '../styles/login.scss'
import logo from '../images/logo.png'
import {BiChevronDown,BiSun , BiMoon, BiChevronUp } from 'react-icons/bi'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { darkToggle } from '../Redux/slice/darkSlice'
import { Navigate } from 'react-router-dom'
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai' 
import { PhoneInput } from 'react-international-phone'; 
//i18
import {useTranslation} from "react-i18next";
import i18next from "i18next"; 
import {FaLanguage} from 'react-icons/fa' 
import axios  from 'axios'
import { Main, Main_Url } from '../axios'

const refreshToken = JSON.parse(localStorage.getItem('jwtToken'))

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

const Login = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('') 
    const [load, setLoad] = useState(false)
    const [isauth, setIsauth] = useState(false)
    const [isActive, setIsActive] =  useState(1)
    const [passwordShow, setPasswordShow] = useState(false)
    const [loadingBtn, setLoadingBtn] = useState(true)
    const [loading, setLoading] = useState(true)


    console.log(username);

    useEffect(() => { 
      axios.post(`${Main}auth/token/refresh/`, {
          refresh: refreshToken
      })
      .then(res => {   
          setIsauth(true)
          console.log(res);
          setLoading(false)
      })
      .catch(err => {  
          console.log(err);
          setLoading(false)
      }) 
    },[])


    const handleSubmit = () => { 
      setLoadingBtn(false)
      axios.post(`${Main}auth/token/`, {
          username: username.replace(/ /g, ''),
          password
      }).then(res => {
          const token = res.data.refresh
          localStorage.setItem('jwtToken', JSON.stringify(token)) 
          toast.success('Siz tizimga muvaffaqiyatli kirdingiz') 
          setLoad(true)
          setLoadingBtn(true)
      }).catch(err => {
          console.log(err)
          toast.error('Login yoki parol xato')
          setLoadingBtn(true)
      }).finally(() => {
          setUsername('')
          setPassword('')
      } )
    }

 


    // const roles = [
    //   {
    //     id: 1,
    //     name: 'Admin',
    //   },
    //   {
    //     id: 2,
    //     name: 'Direktor',
    //   },
    //   {
    //     id: 3,
    //     name: 'O`qituvchi',
    //   }
    // ]

    const dark = useSelector(state => state.dark.darkMode)
    const dispatch = useDispatch()

    const { t } = useTranslation();

    const openToggle = ()=>{
        setIsOpen(!isOpen)
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

    if (isauth) {
      return <Navigate to="/admin" />
      } 
    

    if (load) {
        window.location.reload()
    }
      

  return ( loading ? <div className="main-loading">
      <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
       <div className="loading-text">
         Ma'lumotlar yuklanmoqda...
       </div>
     </div> :  <>
    <ToastContainer/>
    <div className='login'>
        <div className="login-top">
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

            {/* O'zbekcha <BiChevronDown/> */}
        </div>
        <div 
         className="login-mode"
        onClick={()=> dispatch(darkToggle())}
         >
            {dark ? <BiSun/> : <BiMoon/>}
        </div>
        </div>
        <div className="login-overlay"></div>
        <div className="login__brand">
            {/* Smart Ta'lim */}
            <img src={logo} alt="" />
        </div>
        <div className="login__form">
            <div className="login__form-title">
            {t('welcome')}
            </div>
            <form>
                <label className="form-label">
                    <p className="label-title">
                        Telefon raqam
                    </p>
                    <PhoneInput
                      initialCountry="uz"
                      value={username}
                      onChange={(username) => setUsername(username)}
                    />
                    {/* <input 
                          type="tel" 
                          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          placeholder='Telefon raqamingizni kiriting'
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          onKeyDown={(e)=>{if(e.key === 'Enter'){handleSubmit()}}}
                     /> */}
                </label>
                <label className="form-label">
                    <p className="label-title">
                        Parol
                    </p>
                    <div className="password-show">
                    <input 
                          type={passwordShow ? "text" : "password"}
                          placeholder='Parolni kiriting'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onKeyDown={(e)=>{if(e.key === 'Enter'){handleSubmit()}}}
                     />
                     {passwordShow ? <AiFillEyeInvisible onClick={()=> setPasswordShow(!passwordShow)} /> : <AiFillEye onClick={()=> setPasswordShow(!passwordShow)}/>}
                    </div>
                </label>
                {/* <div className="choose-role">
                  {
                    roles.map(item=>{
                      return (
                        <div onClick={()=>setIsActive(item.id)} key={item.id} className={isActive == item.id ? "role active" : "role"}>
                         <div className="circle"></div>  {item.name}
                        </div>
                      )
                    })
                  }
                     
                </div> */}
                <div onClick={handleSubmit}  className="login-btn">
                    {loadingBtn ? 'Tizimga kirish' : <div class="lds-ring"><div></div><div></div><div></div><div></div></div>}
                </div>
            </form>
        </div>

    </div>
    </>
    
  )
}

export default Login