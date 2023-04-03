import PrivateRoute from "./Layout/PrivateRoute";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/admin/Home";
import './index.scss'
import { useSelector } from "react-redux";
import Students from "./Pages/admin/Students";
import StudentAttendance from "./Pages/admin/StudentAttendance";
import StudentActive from "./Pages/admin/StudentActive";
import StudentArxiv from "./Pages/admin/StudentArxiv";
import StudentParents from "./Pages/admin/StudentParents";
import StudentExams from "./Pages/admin/StudentExams";
import SingleStudent from "./Pages/admin/SingleStudent";
import StudentHistory from "./Pages/admin/StudentHistory"; 
import Courses from "./Pages/admin/courses/Courses";
import Rooms from "./Pages/admin/rooms/Rooms";
import Classroom from "./Pages/admin/classroom/Classroom";
import SingleClassroom from "./Pages/admin/classroom/SingleClassroom";
import Groups from "./Pages/admin/groups/Groups";
import SingleGroup from "./Pages/admin/groups/SingleGroup";
import Moliya from "./Pages/admin/moliya/Moliya";
import MoliyaChiqim from "./Pages/admin/moliya/MoliyaChiqim";
import MoliyaTran from "./Pages/admin/moliya/MoliyaTran";
import 'react-international-phone/style.css';
import Statistic from "./Pages/admin/statistic/Statistic";
import StatisticStudent from "./Pages/admin/statistic/StatisticStudent";
import Result from "./Pages/admin/result/Result";
import Staff from "./Pages/admin/staff/Staff";


function App() {

  const dark = useSelector(state => state.dark.darkMode )

  return (
    <div className={dark ? 'dark' : "light"}> 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />

        <Route path="/admin" element={<PrivateRoute/>}>
            <Route path="/admin" element={<Home/>} />
            <Route path="/admin/students" element={<Students/>} />
            <Route path="/admin/students/attendance" element={<StudentAttendance/>} />
            <Route path="/admin/students/aktiv" element={<StudentActive/>} />
            <Route path="/admin/students/arxiv" element={<StudentArxiv/>} />
            <Route path="/admin/students/parents" element={<StudentParents/>} />
            <Route path="/admin/students/exams" element={<StudentExams />} />
            <Route path="/admin/students/:id" element={<SingleStudent />} />
            <Route path="/admin/students/history/:id" element={<StudentHistory />} /> 
            <Route path="/admin/courses" element={<Courses/>} /> 
            <Route path="/admin/rooms" element={<Rooms/>} /> 
            <Route path="/admin/classroom" element={<Classroom/>} /> 
            <Route path="/admin/classroom/:id" element={<SingleClassroom/>} /> 
            <Route path="/admin/groups" element={<Groups/>} /> 
            <Route path="/admin/groups/:id" element={<SingleGroup/>} /> 
            <Route path="/admin/economic" element={<Moliya/>} /> 
            <Route path="/admin/economic/chiqim" element={<MoliyaChiqim/>} /> 
            <Route path="/admin/economic/tranzaksiya" element={<MoliyaTran/>} /> 
            <Route path="/admin/statistic" element={<Statistic/>} /> 
            <Route path="/admin/statistic/student" element={<StatisticStudent/>} /> 
            <Route path="/admin/results" element={<Result/>} /> 
            <Route path="/admin/staffs" element={<Staff/>} /> 


        </Route>

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
