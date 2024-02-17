import React, { useEffect, useState } from 'react';
import '../../Style/AdminPagesStyle/StyleStudentView.css';
import axios from 'axios';
import refreshicon from '../../ImagesAndLogo/refresh.png';


function ViewExam() {

const [examData , setexamData] = useState([]);
// const [searchExambyuniqueID , setexamuniqueID] = useState('');
useEffect(() => {
  handleEaxmData();
}, []);


const handleEaxmData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/getAllExams');
    setexamData(response.data);
    console.log(response.data);
  } catch (e) {
    console.log(e);
  }
};



const handleDeleteAll = async () => {
  try {
    const al = window.confirm('Are you sure you want to delete all Exam Data ?');
    if (al) {
      window.confirm("Are you Sure want to Delete All Exam Records ?");
      await axios.delete('http://localhost:8080/api/deleteAllExams');
    // After successful deletion, you may want to refresh the exam data
    //handleEaxmData();
    
    console.log('All exams deleted successfully from DataBase !');
      
    } else {
      console.log("delete all discarded");
    }

  } catch (error) {
    console.error('Error deleting exams:', error);
  }
};


const handleDeleteById = async (examId ) => {
  try {
    const al = window.confirm(`Are you Sure want to Delete ${examId} Exam Record ?`);
    if (al) {
      await axios.delete(`http://localhost:8080/api/deleteExam/${examId}`);
    // After successful deletion, you may want to refresh the exam data
    handleEaxmData();
    window.confirm(`Are you Sure want to Delete ${examId} Exam Record ?`)
    console.log(`Exam name  with ID ${examId} deleted successfully.`);
    } else {
      console.log("delete all discarded");
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