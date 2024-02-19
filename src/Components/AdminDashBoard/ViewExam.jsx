import React, { useEffect, useState } from 'react';
import '../../Style/AdminPagesStyle/StyleStudentView.css';
import axios from 'axios';
import refreshicon from '../../ImagesAndLogo/refresh.png';


function ViewExam() {
  const [examData, setExamData] = useState([]);

  useEffect(() => {
    handleEaxmData(); // Fetch data when the component mounts
  }, []);

  const handleEaxmData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/getAllExams');
      setExamData(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const al = window.confirm('Are you sure you want to delete all Exam Data ?');
      if (al) {
        await axios.delete('http://localhost:8080/api/deleteAllExams');
        console.log('All exams deleted successfully from the database!');
        handleEaxmData(); // Refresh exam data after successful deletion
      } else {
        console.log("Delete all discarded");
      }
    } catch (error) {
      console.error('Error deleting exams:', error);
    }
  };

  const handleDeleteById = async (examId) => {
    try {
      const al = window.confirm(`Are you sure you want to delete the ${examId} Exam Record ?`);
      if (al) {
        await axios.delete(`http://localhost:8080/api/deleteExam/${examId}`);
        console.log(`Exam with ID ${examId} deleted successfully.`);
        handleEaxmData(); // Refresh exam data after successful deletion
      } else {
        console.log("Delete discarded");
      }
    } catch (error) {
      console.error(`Error deleting exam with ID ${examId}:`, error);
    }
  };


return (
  <>
    <div className='viewBody'>
      <div className='AddStuTitle'>View Exam Data:</div>
      <br />
      <button className='refresh-btn' onClick={handleEaxmData}>
        Refresh {<img src={refreshicon} className='imgref' alt="refresh" />}
      </button>
     
      <br />
      <div>Total Number Of Exams : {examData.length}</div>
      <table border={"1px solid black"} className='StudentViewTable'>
        <thead>
          <tr>
            <th>Exam Name:</th>
            <th>Exam Date:</th>
            <th>Exam Duration:</th>
            <th>Exam ID:</th>
            <th>Exam Link:</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {examData.map((E) => (
            <tr key={E.examId}>
              <td>{E.examName}</td>
              <td>{E.examDate}</td>
              <td>{E.examDuration}</td>
              <td>{E.examId}</td>
              <td> http://localhost:3000/studentLogin/{E.examId}</td>
              <td>
        <button onClick={() => handleDeleteById(E.examId)}>
          Delete
        </button>
      </td>
      
            </tr>
          ))}
        </tbody>
      </table>
      <div className='DeleteAll'><button onClick={handleDeleteAll}>Delete All</button></div>
    </div>
  </>
);
}

export default ViewExam