import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Style/AdminPagesStyle/StyleCreateExam.css';
import gif from "../../ImagesAndLogo/loading-loading-forever.gif";
const CreateExamForm = ({ adminEmail ,adminId}) => {
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examTime, setExamTime] = useState('');
  const [examSchedule, setExamSchedule] = useState(''); // Store as string
  const [examDuration, setExamDuration] = useState('');
  const [examId, setExamId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [load,setLoad]=useState(false);
 

  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const token=localStorage.getItem('jwtToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};
  ////////////
  const handleCreateExam = async (e) => {
    setLoad(true);
    e.preventDefault();
    try {
      const examId = Math.random().toString(36).substring(2, 10);
      setExamId(examId);
      const formattedDateTime = `${examDate} ${examTime}`;
      const examScheduleString = new Date(formattedDateTime).toISOString();
      const selectedDate = new Date(examDate);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
  
      if (selectedDate < currentDate) {
        alert("Please Select the Date of either Today's Date or After !!");
        return;
      }
      const response = await axios.post('http://localhost:8080/api/createExam', {
        examId,
        examName,
        examSchedule: examScheduleString,
        examDuration,
        adminEmail
      },config);
  
     //sending data for file 
      const formData = new FormData();
      formData.append('file', file);
      formData.append('examId',examId);
      formData.append('adminEmail',adminEmail);
      if(file!==null){
        try{
         axios.post('http://localhost:8080/api/uploadQuestionPaper', formData,config);
         setLoad(false);
        }catch(e){
      console.log(e);
        }
      }
     //``````````````````
      setSuccessMessage(`Data of ${examName} added successfully!`);
      setErrorMessage('');
  
      const examLink = `http://localhost:3000/studentLogin/${examId}`;
    } catch (e) {
      console.log(e);
      setSuccessMessage('');
      setErrorMessage('Error adding Exam, Please try again.');
    }

  };


  return (
    <div className='create-exam-container'>
    
    
      <form className='FormCreateExam' onSubmit={handleCreateExam}>
      {successMessage && <div className="successMessage">{successMessage}</div>}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      {load && (<div className='loading'>
      <div className='innerOfLoading'>
      Please wait, we are uploading file...... {<img src={gif} className='gif' alt="refresh" />}
         </div>     
         </div> )}
        <label>Exam Name:</label>
        <input type="text" value={examName} onChange={(e) => setExamName(e.target.value)} required />

        {/* <label>Exam Date:</label>
        <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} required /> */}
        
        <label>Exam Schedule:</label>
        <div className="examTimeInput">
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            required
          />
          <input
            type="time"
            value={examTime}
            onChange={(e) => setExamTime(e.target.value)}
            required
          />
        </div>

        <label>Exam Duration (minutes):</label>
        <input type="number" value={examDuration} onChange={(e) => setExamDuration(e.target.value)} required />
        <label>Questions:</label>
        <input type="file" onChange={handleFileChange}  className='file' required></input>
        <br></br>

        <div>
          <button className="btn2 btn-primary" >Create Exam</button>
        </div>
      </form>

  

      
    </div>
  );
};

export default CreateExamForm;
