import React , {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Main_Url } from "../../../axios";
import axios from "axios";
import '../../../styles/admin/classroom/classroom.scss'

const SingleClassroom = () =>{
 
    const {id} = useParams()

    const [students, setStudents] = useState([])

    useEffect(()=>{
        axios.get(`${Main_Url}classroom/${id}`)
        .then(data=>{
            setStudents(data.data) 
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

  return(
    <div className="home">
        <div className="single-class">
            <div className="single-class-head">
                <div className="head-name">
                    <div className="index">Sinfxona</div>
                   <div className="name"> {students.name}</div>
                </div>
                <div className="head-btns">
                    Student Biriktirish
                </div>
            </div>
            <div className="single-class-body">
                <div className="single-class-body-left">
                    <div className="class-table-head">
                        <div className="class-table-head-mini">T/R</div>
                        <div className="class-table-head-item">FIO</div>
                        <div className="class-table-head-item">Telefon raqam</div>
                    </div>
                    <div className="class-table-body">
                        {/* {students.student.map((item,index)=>{
                            return(
                                <div key={index} className="class-table-body-items">
                                    <div className="class-table-body-mini">
                                        {index+1}
                                    </div>
                                    <div className="class-table-body-item">
                                        {item.name}
                                    </div>
                                    <div className="class-table-body-item">
                                        {item.phone}
                                    </div>
                                </div>
                            )
                        })} */}
                    </div>
                </div>
                <div className="single-class-body-right">
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleClassroom



const uss = {
  "id": 9,
  "student": [
    {
      "id": 9,
      "davomat": [],
      "last_payment": "01/12/2023, 20:06:57",
      "name": "Behzod",
      "phone": "+998991160434",
      "parent": null,
      "birth": null,
      "added": "2023-01-13T22:24:16.419561+05:00",
      "father_name": null,
      "mother_name": null,
      "language": null,
      "address": null,
      "email": null,
      "user": {
        "id": 2,
        "password": "pbkdf2_sha256$390000$gk1Z3iAKaikPkA8GWyQDIh$nFiR5gHZSeQm9uFq4CeaJQ7C7PQ5EskcfKXz58V+Mw4=",
        "last_login": null,
        "is_superuser": false,
        "username": "manager01",
        "first_name": "",
        "last_name": "",
        "email": "",
        "is_staff": false,
        "is_active": true,
        "date_joined": "2023-01-11T16:11:50.055337+05:00",
        "role": "MANAGER",
        "groups": [],
        "user_permissions": []
      }
    },
    {
      "id": 10,
      "davomat": [],
      "last_payment": null,
      "name": "Aziz",
      "phone": "+998910080886",
      "parent": null,
      "birth": null,
      "added": "2023-01-13T22:24:33.304255+05:00",
      "father_name": null,
      "mother_name": null,
      "language": null,
      "address": null,
      "email": null,
      "user": {
        "id": 2,
        "password": "pbkdf2_sha256$390000$gk1Z3iAKaikPkA8GWyQDIh$nFiR5gHZSeQm9uFq4CeaJQ7C7PQ5EskcfKXz58V+Mw4=",
        "last_login": null,
        "is_superuser": false,
        "username": "manager01",
        "first_name": "",
        "last_name": "",
        "email": "",
        "is_staff": false,
        "is_active": true,
        "date_joined": "2023-01-11T16:11:50.055337+05:00",
        "role": "MANAGER",
        "groups": [],
        "user_permissions": []
      }
    }
  ],
  "course": [
    {
      "id": 2,
      "name": "Matematika",
      "cost": "100000",
      "students_count": 5,
      "groups_count": 3
    }
  ],
  "room": [
    {
      "id": 1,
      "name": "Matematika xonasi",
      "student_count": 25,
      "groups_count": 3
    }
  ],
  "name": "Iqtisodchilar",
  "education": null,
  "day": null,
  "status": null,
  "start": null,
  "finish": null,
  "user": {
    "id": 2,
    "password": "pbkdf2_sha256$390000$gk1Z3iAKaikPkA8GWyQDIh$nFiR5gHZSeQm9uFq4CeaJQ7C7PQ5EskcfKXz58V+Mw4=",
    "last_login": null,
    "is_superuser": false,
    "username": "manager01",
    "first_name": "",
    "last_name": "",
    "email": "",
    "is_staff": false,
    "is_active": true,
    "date_joined": "2023-01-11T16:11:50.055337+05:00",
    "role": "MANAGER",
    "groups": [],
    "user_permissions": []
  }
}