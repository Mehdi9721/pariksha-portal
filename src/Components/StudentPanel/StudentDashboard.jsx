// StudentDashboard.js
import React, { useEffect, useState } from 'react';
import '../../Style/StudentPanelStyle/StudentDashboardStyle.css';
import img from '../../ImagesAndLogo/_7c3d9119-90a8-48d0-99cc-9b1d57e27157.jpeg';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useStudentAuth } from "../StudentAuth"
const StudentDashboard = () => {
  const [studentPrn, setPrn] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { examId } = useParams();
  const navigate = useNavigate();
  const { studentLogin } = useStudentAuth();

  useEffect(() => {
    console.log('Exam ID:', examId);
  }, [examId]);


  const [status, setStatus] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const x = await axios.get(`http://localhost:8080/api/getStudentResultDataByStudentPrn/${studentPrn}`);

      if (x.data.studentPrn == studentPrn && x.data.examId==examId) {
        setError('This Exam is already completed by you !!!');
      } else {
        studentLogin(); // Update the student authentication context
        setStatus(true);
      }

    } catch (e) {
       setStatus(true);
      console.log("An error occurred during login:", e);
    }
  };

  useEffect(() => {
    if (status) {
      const fetchData = async () => {
        try {
          // API for getting student details from prn
          const response = await axios.get(`http://localhost:8080/api/getStudentByPrn/${studentPrn}`, {
            params: {
              examId,
              studentPrn,
            },
          });

          const studentName = response.data.studentName;

          if ( (response.data.studentPrn === studentPrn )  ) {               
            console.log(password + " pass");
            console.log(response.data.studentPrn +" prn");   

            studentLogin(); 
            setTimeout(() => {
              navigate(`/studentinstructions/${examId}`, { state: { studentName, studentPrn } });
            }, 500);
          
          } else {
            setError('Please check PRN: ');
          }
        } catch (e) {
          setError('Please check PRN: ');
          console.error("check");
        }
      };

      fetchData();
    }
  }, [status, studentPrn, examId]);

  return (
    <div className='BodybackgroudImage'>
      <div className='header-stdn-login'>
        <img src={img} alt='logo' className='logoHeader rotating-logo' />
        <div className='BrandName'>Pariksha Portal</div>
      </div>
      <div className='StudentDashboard'>
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
