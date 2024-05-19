import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Style/AdminPagesStyle/StyleCreateExam.css';
import gif from "../../ImagesAndLogo/loading-loading-forever.gif";
import BASE_URL from '../ApiConfig'
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
      const response = await axios.post(`${BASE_URL}/createExam`, {
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
         axios.post(`${BASE_URL}/uploadQuestionPaper`, formData,config);
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

      
          <button className="btn2 btn-primary" >Create Exam</button>
     
        
      </form>
      <br></br>
<div className='questionTemplate'>
<h3>Template for Questions excel sheet :</h3>
<ul>
  <li>File formate -[ abc.xlsx ]</li>
  <li>sheet must contain only single page.</li>
{/* <li>Skip the row 1 and start from the row 2.</li> */}
<li>Below table exactly represents how rows and columns must gets filled in sheet.</li>
</ul>

<table className='table table-striped custom-table  '>
  <thead>
  <tr>
    <th>Question</th>
    <th>option A</th>
    <th>option B</th>
    <th>option C</th>
    <th>option D</th>
    <th>correct answer</th>
</tr>
  </thead>
  <tbody>
    <tr>
<td>How are you?</td>
<td>Fine</td>
<td>Fit</td>
<td>Sad</td>
<td>Angry</td>
<td>Angry</td>
    </tr>
  </tbody>
</table>
Also the excel sheet is available on github repo. (click on view raw to download the sheet) <a href='https://github.com/Mehdi9721/pariksha-portal/blob/master/Template%20for%20questions.xlsx' target='blank'>Link of sheet</a>
</div>
  

      
    </div>
  );
};

export default CreateExamForm;
