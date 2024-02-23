import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Style/AdminPagesStyle/StyleCreateExam.css';

const CreateExamForm = () => {
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examTime, setExamTime] = useState('');
  const [examSchedule, setExamSchedule] = useState(''); // Store as string
  const [examDuration, setExamDuration] = useState('');
  const [examId, setExamId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  //file change
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  ////////////
  const handleCreateExam = async (e) => {
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
        alert("Please Enter the Date of either Today's Date or Day After Current Date Only !!");
        return;
      }
      const response = await axios.post('http://localhost:8080/api/createExam', {
        examId,
        examName,
        examSchedule: examScheduleString,
        examDuration
      });
  
     //sending data for file 
      const formData = new FormData();
      formData.append('file', file);
      formData.append('examId',examId);
      console.log(file);
      if(file!==null){
        try{
         axios.post('http://localhost:8080/api/uploadQuestionPaper', formData);
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
    <div>
    
      {successMessage && <div className="successMessage">{successMessage}</div>}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      <form className='FormCreateExam' onSubmit={handleCreateExam}>
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
          <button className="btn btn-success" >Create Exam</button>
        </div>
      </form>

      <p>Generated Exam ID: {examId}</p>

      
    </div>
  );
};

export default CreateExamForm;
