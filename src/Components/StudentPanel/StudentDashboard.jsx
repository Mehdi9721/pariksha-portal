import React, { useEffect, useState } from 'react';
import '../../Style/StudentPanelStyle/StudentDashboardStyle.css';
import img from '../../ImagesAndLogo/_7c3d9119-90a8-48d0-99cc-9b1d57e27157.jpeg';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import gif from "../../ImagesAndLogo/loading-loading-forever.gif";
import { useStudentAuth } from "../StudentAuth";
import BASE_URL from '../ApiConfig';
const StudentDashboard = () => {
  const { examId, adminId } = useParams();
  const navigate = useNavigate();
  const { studentLogin } = useStudentAuth();
  const [load, setLoad] = useState(false);
  const [studentPrn, setPrn] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const result = await axios.get(`${BASE_URL}/getStudentResultDataByStudentPrn/${studentPrn}/${adminId}/${examId}`);
      if (result.data.studentPrn === studentPrn && result.data.examId === examId) {
        setError('This Exam is already completed by you !!!');
      }
    } catch (error) {
      try{
      const response = await axios.get(`${BASE_URL}/getStudentByPrn/${studentPrn}/${adminId}`, {
          params: {
            examId,
            studentPrn,
          },
        });
        const studentData = response.data;
        if (studentData.studentPrn === studentPrn && password === studentPrn) {
          studentLogin();
          navigate(`/studentinstructions/${examId}/${adminId}`, { state: { studentName: studentData.studentName, studentPrn } });
        } else {
          setError('Please check PRN or Password');
        }
      }catch(e){
        console.log(e);
      }
     
    } finally {
      setLoad(false);
    }
  };
  return (
    <div className='BodybackgroudImage'>
      <div className='header-stdn-login'>
        <img src={img} alt='logo' className='logoHeader rotating-logo' />
        <div className='BrandName'>Pariksha Portal</div>
      </div>
      <div className='StudentDashboard'>
        {load && (<div className='loadin'>Please wait...... {<img src={gif} className='gif' alt="refresh" />} </div> )}
        <h4><b>Student Login:</b></h4>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor='prn'>PRN/Roll Number:</label>
            <input
              type='number'
              id='prn'
              value={studentPrn}
              required
              onChange={(e) => setPrn(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <input
              type='password' 
              id='password'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>   
          <button type='submit'>Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default StudentDashboard;
