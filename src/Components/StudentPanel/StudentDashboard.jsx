import React, { useEffect, useState } from 'react';
import '../../Style/StudentPanelStyle/StudentDashboardStyle.css'
import img from "../../ImagesAndLogo/_7c3d9119-90a8-48d0-99cc-9b1d57e27157.jpeg"
import { useNavigate, useParams  } from 'react-router-dom';
import axios from 'axios';
const StudentDashboard = () => {
  const [studentPrn, setPrn] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { examId } = useParams();
  const navigate = useNavigate ();

  //fetching exam id from url
  useEffect(() => {
    console.log('Exam ID:', examId);
  }, [examId]);

  //handling login
  const handleLogin = async(e) => {
    e.preventDefault();
    try{
      //api for getting student details from prn
   const response= await axios.get(`http://localhost:8080/api/getStudentByPrn/${studentPrn}`)
   const studentName=response.data.studentName;
   console.log(studentName);

   if(response.data.studentPrn===studentPrn){
    //if prn matches redirecting to instruction page
    navigate(`/studentinstructions/${examId}`,{ state: { studentName, studentPrn } });
   }else{
    setError("Please check PRN: ");
    console.log(Error);
   }
  }catch(e){
    setError("Please check PRN: ");
    console.log(Error);
console.log(e);
  }
  };

  return (
    <div className='BodybackgroudImage'>
      <div className='header-stdn-login'>
      <img src={img} alt='logo' className='logoHeader rotating-logo' />
<div className='BrandName'>Pariksha Portal</div>
</div>
      <div className='StudentDashboard'>
      <h3><b>Student Dashboard</b></h3>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="prn">Enter PRN:</label>
          <input
            type="number"
            id="prn"
            value={studentPrn}
            required
            onChange={(e) => setPrn(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Enter Password:</label>
          <input
            type="number"
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>
          Login
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
    </div>
  );
};

export default StudentDashboard;