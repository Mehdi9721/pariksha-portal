import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Style/AdminPagesStyle/StyleCreateExam.css'
const CreateExamForm = () => {
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examDuration, setExamDuration] = useState('');
  //const [questions, setQuestions] = useState('');
  const [examId, setExamId] = useState('');
  // const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateExam = async (e) => {
    e.preventDefault();
    try {
      const examId = Math.random().toString(36).substring(2, 10);
      setExamId(examId);

      // const timestamp = new Date(examDate).getTime();
<<<<<<< HEAD

=======
>>>>>>> e2f2f5c18d80d3032e1af9537d8df6134cb23a0c
      const response = await axios.post('http://localhost:8080/api/createExam', {
        examId,
        examName,
        examDate,
        examDuration
      });
      // console.log(response.data);
      console.log(response.data);
      setSuccessMessage(`Data of ${examName} added successfully!`);
      setErrorMessage('');

      const examLink = `/exam/${examId}`;
      console.log('Exam Link:', examLink);

      //  navigate(examLink);
    } catch (e) {
      console.log(e);
      setSuccessMessage('');
      setErrorMessage('Error adding Exam, Please try again.');
      // console.error('Error creating exam:', error);
    }
  };







  return (
    <div>
      <div className='AddStuTitle'>Create New Exam:</div>
      {successMessage && <div className="successMessage">{successMessage}</div>}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      <form className='FormCreateExam'>
        <label>Exam Name:</label>
        <input type="text" value={examName} onChange={(e) => setExamName(e.target.value)} required/>

        <label>Exam Date:</label>
        <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} required/>

        <label>Exam Duration (minutes):</label>
        <input type="number" value={examDuration} onChange={(e) => setExamDuration(e.target.value)} required />

        <label>Questions:</label>
      <input type="file" required className='file'></input>
      <br></br>
        

        <div>
          <button  className='buttonForPaper' type="button" onClick={handleCreateExam}  >Create Exam</button>
          {/* <button type="button" >Add Questions</button> */}
        </div>




      </form>

      <p>Generated Exam ID: {examId}</p>
    </div>
  );
};

export default CreateExamForm;
