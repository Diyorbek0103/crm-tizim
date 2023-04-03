import React , {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {AiOutlineHistory , AiOutlineDelete} from 'react-icons/ai'
import axios from 'axios'
import { useSelector  } from 'react-redux'
import { Main_Url } from '../../axios' 
import { useDispatch } from 'react-redux'
import { changeRefresh } from '../../Redux/slice/refreshSlice'
import { ToastContainer, toast } from 'react-toastify';

const SingleStudent = () => {
  const {id} = useParams()
  const [student, setStudent] =  useState({})
  const [newStudent, setNewStudent] = useState({})
  const [currentName, setCurrentName] = useState('')
  const [loading, setLoading] = useState(true)

  const user = useSelector(state => state.user)
  const refreshKey = useSelector(state => state.refreshKey.refreshKey)
  const dispatch = useDispatch() 
   

  useEffect(()=>{
    axios.get(`${Main_Url}students/${id}`)
    .then(data=>{
      setStudent(data.data)
      console.log(data.data);
      setCurrentName(data.data.name)
      setLoading(false)
    })
  },[id])

  const {name,phone, parent, added, email, birth, father_name, mother_name, language, address} = student

  const onChange = e => {
    setStudent({...student, [e.target.name]
    : e.target.value });
    dispatch(changeRefresh())
  };
  useEffect(()=>{
    setNewStudent({
      name:student.name,
      phone: student.phone,
      parent: student.parent,
      email: student.email,
      birth: student.birth,
      father_name: student.father_name,
      mother_name: student.mother_name,
      language: student.language,
      address: student.address
    });
  },[refreshKey])

const updateStudent =()=>{
  setLoading(true)
  let config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',   
      'Authorization': `Bearer ${user.access}`
  }
  }

  axios.put(`${Main_Url}students/${id}/`, newStudent, config)
  .then(data=>{ 
    setLoading(false) 
    dispatch(changeRefresh())
    toast.success('Talaba muvaffaqiyatli qo`shildi!')
  })
  .catch(err=>{
    console.log(err);
    setLoading(false) 
    dispatch(changeRefresh())
    toast.error('Talaba o`zgartirishda xatolik')
  })

   
  
}
  
console.log(student,newStudent);

  return (
    <>
    <ToastContainer/>
    {
      loading ?     
    <div className="box-loading">
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      <div className="loading-text">
          Ma'lumotlar yuklanmoqda...
      </div>
     </div> :
    <div className='home'>
      <div className="single">
        <div className="single-head">
        <div className="single-head-left">
        <div className="subtitle">
        Student
        </div>
        <div className="title">
        {currentName}
        </div>
        </div>
        <div className="single-head-right">
        <div className="balance">
        Balans: 0
        </div>
        <div className="single-btns">
        <Link to={`/admin/students/history/${student.id}`} className="single-btn history">
            <AiOutlineHistory/>
        </Link>
        <div className="single-btn delete">
            <AiOutlineDelete/>
        </div>
        </div>
        </div>

        </div>
        <form className="single-body">
          <label htmlFor="name" className="body-label">
            <div className="body-text">
              FIO
            </div>
            <input type="text" name='name' value={name} onChange={e => onChange(e)}/>
          </label>
          <label htmlFor="phone" className="body-label">
            <div className="body-text">
              Telefon raqam
            </div>
            <input type="text" name='phone' value={phone} onChange={e => onChange(e)}/>
          </label>
          <label htmlFor="email" className="body-label">
            <div className="body-text">
              Elektron pochta
            </div>
            <input type="email" name='email' value={email} onChange={e => onChange(e)}/>
          </label>
          <label htmlFor="address" className="body-label">
            <div className="body-text">
              Manzil
            </div>
            <input type="text" name='address' value={address} onChange={e => onChange(e)}/>
          </label>
          <label htmlFor="birth" className="body-label">
            <div className="body-text">
              Tug'ulgan kuni
            </div>
            <input type="date" name='birth' value={birth} onChange={e => onChange(e)}/>
          </label>
          <label htmlFor="added" className="body-label">
            <div className="body-text">
              Qo'shilgan sanasi
            </div>
            <input type="date" disabled name='added' value={added.toString().substring(0,10)} />
             
          </label>
          <label htmlFor="language" className="body-label">
            <div className="body-text">
              Tili
            </div>
            <input type="text" name='language' value={language} onChange={e => onChange(e)}/>
          </label>
          <label htmlFor="father" className="body-label">
            <div className="body-text">
              Otasining ismi
            </div>
            <input type="text" name='father' value={father_name} onChange={e => onChange(e)}/>
          </label>
          <label htmlFor="mother" className="body-label">
            <div className="body-text">
               Onasining ismi
            </div>
            <input type="text" name='mother' value={mother_name} onChange={e => onChange(e)}/>
          </label>
          <label htmlFor="parent" className="body-label">
            <div className="body-text">
              Ota onasining telefoni
            </div>
            <input type="text" name='parent' value={parent} onChange={e => onChange(e)}/>
          </label>
          <label htmlFor="groups" className="body-label">
            <div className="body-text">
              Guruh
            </div>
            <div className="student-class">
              <div className="student-class-item">
                english-1
              </div>
              <div className="student-class-item">
                matematika-2
              </div>
            </div>
          </label>
          <label htmlFor="classroom" className="body-label">
            <div className="body-text">
              Sinf
            </div>
            <div className="student-class">
            <div className="student-class-item">
                2022
              </div>
            </div>
          </label>
          <label htmlFor="course" className="body-label">
            <div className="body-text">
              Kurslar
            </div>
            <div className="student-class">
              <div className="student-class-item">
                english
              </div>
              <div className="student-class-item">
                matematika
              </div>
            </div>
          </label>
          
          
          <div onClick={updateStudent} className="student-change-btn">
            O'zgarishlarni saqlash
          </div>
          
        </form>
      </div>
    </div>
    }
    </>
  )
}

export default SingleStudent