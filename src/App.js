import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Login';
import AdminHome from './Components/AdminHome';
function App() {
  return (
    <Router>
       <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/adminhomepage" element={<AdminHome/>} />
      </Routes>
  </Router>
  );
}

export default App;
