// StudentDashboard.js
import React, { useEffect, useState } from 'react';
import '../../Style/StudentPanelStyle/StudentDashboardStyle.css';
import img from '../../ImagesAndLogo/_7c3d9119-90a8-48d0-99cc-9b1d57e27157.jpeg';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import gif from "../../ImagesAndLogo/loading-loading-forever.gif";


import { useStudentAuth } from "../StudentAuth"
const StudentDashboard = () => {
  const [studentPrn, setPrn] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { examId } = useParams();
  const { adminId } = useParams();
  const navigate = useNavigate();
  const { studentLogin } = useStudentAuth();
  const [load,setLoad]=useState(false);

  useEffect(() => {
  
  }, [examId]);

  const token=localStorage.getItem('jwtToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};

  const [status, setStatus] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoad(true);
      console.log("above x");
console.log(studentPrn);
console.log(examId);

      const x = await axios.get(`http://localhost:8080/api/getStudentResultDataByStudentPrn/${studentPrn}/${adminId}`);
      console.log("belo x");
      console.log(x.data);
console.log(x);
      if (x.data.studentPrn == studentPrn && x.data.examId==examId) {
        setLoad(false);
        setError('This Exam is already completed by you !!!');
      } else {
        studentLogin(); 
        setStatus(true);
      }

    } catch (e) {
       setStatus(true);
       setLoad(false);
      console.log("An error occurred during login:", e);
    }
  };

  useEffect(() => {
    if (status) {
      setLoad(false);
      const fetchData = async () => {
        try {
          // API for getting student details from prn
          setLoad(true);
          const response = await axios.get(`http://localhost:8080/api/getStudentByPrn/${studentPrn}/${adminId}`, {
            params: {
              examId,
              studentPrn,
            },
          });

          const studentName = response.data.studentName;

          if ( (response.data.studentPrn === studentPrn )  ) {               
            setLoad(false);
            studentLogin(); 
            setTimeout(() => {
              navigate(`/studentinstructions/${examId}/${adminId}`, { state: { studentName, studentPrn } });
            }, 500);
          
          } else {
            setLoad(false);
            setError('Please check PRN: ');
          }
        } catch (e) {
          setLoad(false);
          setError('Please check PRN: ');
          console.error("check");
        }
      };

      fetchData();
    }
  }, [status,examId]);

  return (
    <div className='BodybackgroudImage'>
      <div className='header-stdn-login'>
        <img src={img} alt='logo' className='logoHeader rotating-logo' />
        <div className='BrandName'>Pariksha Portal</div>
      </div>
      <div className='StudentDashboard'>

      {load && (<div className='loading'>Please wait...... {<img src={gif} className='gif' alt="refresh" />} </div> )}

        <h3>
          <b>Student Dashboard</b>
        </h3>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor='prn'>Enter PRN:</label>
            <input
              type='number'
              id='prn'
              value={studentPrn}
              required
              onChange={(e) => setPrn(e.target.value)}
            />
          </div>

          {/* <div>
            <label htmlFor='password'>Enter Password:</label>
            <input
              type='password' 
              id='password'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div> */}
          
          <button type='submit'>Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default StudentDashboard;
