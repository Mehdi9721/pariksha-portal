import './App.css';
import { BrowserRouter as Router, Route, Routes, Form } from 'react-router-dom';
import Home from './Components/WebsiteHomePage/WebsiteHome';
import AdminHome from './Components/AdminDashBoard/AdminHome';
import StudentDashbord from './Components/StudentPanel/StudentDashboard';
import ExamPanel from './Components/StudentPanel/ExamPanel';
import CameraComponent from './Components/CameraComponent';
import ExamSuccess from './Components/StudentPanel/ExamSuccess';
import LoginForm from './Components/WebsiteHomePage/LoginForm';
function App() {
  return (
    <Router>
       <Routes>
      <Route path="/" element={<Home></Home>} />
      <Route path="/adminhomepage" element={<AdminHome/>} />
      <Route path="/studentLogin/:uniqueID" element={<StudentDashbord></StudentDashbord>} />
      <Route path="/stndexam" element={<ExamPanel></ExamPanel>}></Route>
      <Route path="/ctest" element={<CameraComponent></CameraComponent>}></Route>
      <Route path="/examsuccess" element={<ExamSuccess></ExamSuccess>}></Route>
      </Routes>
  </Router>
  );
}

export default App;
