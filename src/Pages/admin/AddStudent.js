import React , {useState} from 'react' 
import axios from 'axios'
import { useSelector  } from 'react-redux'
import { Main_Url } from '../../axios' 
import { useDispatch } from 'react-redux'
import { changeRefresh } from '../../Redux/slice/refreshSlice'
import { ToastContainer, toast } from 'react-toastify';
import { PhoneInput } from 'react-international-phone'; 

const AddStudent = ({close}) => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch() 
  const [loadingBtn, setLoadingBtn] = useState(false)


  const [addition, setaddition] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [parent, setParent] = useState('')
  const [birth, setBirth] = useState(null)
  const [father_name, setFather_name] = useState('')
  const [mother_name, setMother_name] = useState('')
  const [language, setLanguage] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  
 console.log(birth);
   

  const submitStudent =()=>{
    setLoadingBtn(true)
    let config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',   
        'Authorization': `Bearer ${user.access}`
    }
    }

    axios.post(`${Main_Url}students/`,{
      name,
      phone: phone.replace(/ /g, ''),
      parent,
      father_name,
      mother_name,
      language,
      birth,
      address,
      email
    } , config)
    .then(data=>{ 
      setLoadingBtn(false)
      close(false)
      dispatch(changeRefresh())
      toast.success('Talaba muvaffaqiyatli qo`shildi!')
    })
    .catch(err=>{
      console.log(err);
      setLoadingBtn(false) 
      dispatch(changeRefresh())
      toast.error('Talaba qo`shishda xatolik')
    })

    setName('');
    setPhone('');
    setParent('');
    setFather_name('');
    setMother_name('');
    setLanguage('');
    setBirth(null);
    setAddress('');
    setEmail('');
    
  }

  const changeAddition = () =>{
    setaddition(!addition)
  }
  return (
    <div className='add-student'>
      <ToastContainer/>
      <div className="add-student-title">
        Talaba ma'lumotlarini kiriting
      </div>
      <form  
          className="add-student-form"
          onKeyDown={(e)=>{if(e.key === 'Enter'){submitStudent()}}}
      >
           <label htmlFor="name" className="student-form-label">
               <p className="label-text">
                Talaba FIO
               </p>
               <input 
                  type="name"
                  name='name'
                  className="label-input"
                  value={name}
                  onChange={(e)=>setName(e.target.value)} 
                   />
           </label> 
           <label htmlFor="phone" className="student-form-label">
               <p className="label-text">
                Telefon raqami
               </p>
               <PhoneInput
                      initialCountry="uz"
                      value={phone}
                      onChange={(phone)=>setPhone(phone)}
                    />
               {/* <input type="number" name='phone' className="label-input" valphoneue={phone}
                  onChange={(e)=>setPhone(e.target.value)} /> */}
           </label>
           <label htmlFor="email" className="student-form-label">
               <p className="label-text">
                Talaba emaili
               </p>
               <input type="email" name='email' className="label-input" value={email}
                  onChange={(e)=>setEmail(e.target.value)} />
           </label>
           <label htmlFor="birthday" className="student-form-label">
               <p className="label-text">
                Tug'ilgan sanasi
               </p>
               <input type={'date'}  name='birthday' className="label-input" value={birth}
                  onChange={(e)=>setBirth(e.target.value)} />
           </label>
           <label htmlFor="address" className="student-form-label">
               <p className="label-text">
                Talaba manzili
               </p>
               <input type="address" name='address' className="label-input" value={address}
                  onChange={(e)=>setAddress(e.target.value)} />
           </label>
           
           
           
           <div className={addition ? "addition-info active" : "addition-info"}>
           <label htmlFor="fathername" className="student-form-label">
               <p className="label-text">
                Otasining FIOsi
               </p>
               <input type="text" name='fathername' className="label-input" value={father_name}
                  onChange={(e)=>setFather_name(e.target.value)}  />
           </label>
           <label htmlFor="mothername" className="student-form-label">
               <p className="label-text">
               Onasining FIOsi
               </p>
               <input type="text" name='mothername' className="label-input" value={mother_name}
                  onChange={(e)=>setMother_name(e.target.value)} />
           </label>
           <label htmlFor="fatherphone" className="student-form-label">
               <p className="label-text">
               Ota-onasining raqami
               </p>
               <input type="number" name='fatherphone' className="label-input" value={parent}
                  onChange={(e)=>setParent(e.target.value)} />
           </label>
            
           </div>
           <div onClick={changeAddition} className={addition ? "addition inactive" : "addition"}>
               {addition ? `- qo'shimcha ma'lumotlarni olib tashlash` : `+ qo'shimcha ma'lumotlarni qo'shish`}
           </div>
           <div className="add-student-form-btns">
           <div onClick={()=>close(false)} className="cancel">
              Bekor qilish  
            </div>
           <div onClick={submitStudent} className="submit-btn">
             {!loadingBtn? 'Ma`lumotlarni saqlash' : <div class="lds-ring"><div></div><div></div><div></div><div></div></div>}  
           </div>
           </div>
      </form>
    </div>
  )
}

export default AddStudent