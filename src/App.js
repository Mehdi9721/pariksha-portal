import './App.css';
import { BrowserRouter as Router, Route, Routes, Form } from 'react-router-dom';
import Home from './Components/WebsiteHomePage/WebsiteHome';
import AdminHome from './Components/AdminDashBoard/AdminHome';
import StudentDashbord from './Components/StudentPanel/StudentDashboard';
import ExamPanel from './Components/StudentPanel/ExamPanel';
import CameraComponent from './Components/CameraComponent';
import ExamSuccess from './Components/StudentPanel/ExamSuccess';
import LoginForm from './Components/WebsiteHomePage/LoginForm';
import InstructionPage from './Components/StudentPanel/InstructionPage';
import HelpComponent from './Components/WebsiteHomePage/HelpComponent';
import { AuthProvider } from './Components/AuthContext';
import { StudentAuthProvider } from './Components/StudentAuth';
import {OwnerAuthProvider} from "./Components/OwnerAuth";
import SignupForm from './Components/WebsiteHomePage/SignupForm';
import OwnerLogin from './Components/WebsiteHomePage/OwnerLogin';
import OwnerHome from './Components/Owner/OwnerHome';
function App() {
  return (
    <AuthProvider>
        <StudentAuthProvider>
        <OwnerAuthProvider>
    <Router>
       <Routes>

      <Route path="/" element={<Home></Home>} />
      <Route path="/adminhomepage" element={<AdminHome/>} />
      <Route path="/HelpComponent" element={<HelpComponent></HelpComponent>}></Route>
      <Route path="/studentLogin/:examId/:adminId" element={<StudentDashbord></StudentDashbord>} />
      <Route path="/stndexam/:examId/:adminId" element={<ExamPanel></ExamPanel>}></Route>
      <Route path="/ctest" element={<CameraComponent></CameraComponent>}></Route>
      <Route path="/examsuccess" element={<ExamSuccess></ExamSuccess>}></Route>
      <Route path="/studentinstructions/:examId/:adminId" element={<InstructionPage></InstructionPage>}></Route>
      <Route path="/adminSignup" element={<SignupForm></SignupForm>}></Route>
      <Route path="/owner" element={<OwnerLogin/>}></Route>
      <Route path='/ownerHome' element={<OwnerHome></OwnerHome>}></Route>
      </Routes>
  </Router>
  </OwnerAuthProvider>
  </StudentAuthProvider>
  </AuthProvider>
  );
}

export default App;
