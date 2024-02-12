import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Style/StyleCreateExam.css'
const CreateExamForm = () => {
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examDuration, setExamDuration] = useState('');
  const [questions, setQuestions] = useState('');
  const [uniqueID, setUniqueID] = useState('');
  const navigate = useNavigate();

  const handleCreateExam = async () => {
    try {
      const generatedID = Math.random().toString(36).substring(2, 10);
      setUniqueID(generatedID);

      const timestamp = new Date(examDate).getTime();

      const response = await axios.post('/api/exams', {
        id: generatedID,
        name: examName,
        date: timestamp,
        duration: examDuration,
        questions: questions,
      });

      const examLink = `/exam/${generatedID}`;
      console.log('Exam Link:', examLink);

      navigate(examLink);
    } catch (error) {
      console.error('Error creating exam:', error);
    }
  };

  return (
    <div>
      <div className='AddStuTitle'>Create New Exam:</div>
      <form className='FormCreateExam'>
        <label>Exam Name:</label>
        <input type="text" value={examName} onChange={(e) => setExamName(e.target.value)} />

        <label>Exam Date:</label>
        <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />

        <label>Exam Duration (minutes):</label>
        <input type="number" value={examDuration} onChange={(e) => setExamDuration(e.target.value)} />

        <label>Questions:</label>
        <textarea value={questions} onChange={(e) => setQuestions(e.target.value)} />

        <button type="button" onClick={handleCreateExam}>Create Exam</button>
      </form>

      <p>Generated Exam ID: {uniqueID}</p>
    </div>
  );
};

export default CreateExamForm;
