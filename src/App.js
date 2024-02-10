import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Login';
import AdminHome from './Components/AdminHome';
import StudentDashbord from './Components/StudentPanel/StudentDashboard';
import ExamPanel from './Components/StudentPanel/ExamPanel';
import CameraComponent from './Components/CameraComponent';
import ExamSuccess from './Components/StudentPanel/ExamSuccess';
function App() {
  return (
    <Router>
       <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/adminhomepage" element={<AdminHome/>} />
      <Route path="/studentLogin" element={<StudentDashbord></StudentDashbord>} />
      <Route path="/stndexam" element={<ExamPanel></ExamPanel>}></Route>
      <Route path="/ctest" element={<CameraComponent></CameraComponent>}></Route>
      <Route path="/examsuccess" element={<ExamSuccess></ExamSuccess>}></Route>
      </Routes>
  </Router>
  );
}

export default App;
