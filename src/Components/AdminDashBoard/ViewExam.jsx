import React, { useEffect, useState } from 'react';
import '../../Style/AdminPagesStyle/StyleStudentView.css';
import axios from 'axios';
import refreshicon from '../../ImagesAndLogo/refresh.png';

function ViewExam() {
  const [examData, setExamData] = useState([]);

  useEffect(() => {
    handleExamData(); // Fetch data when the component mounts
  }, []);
  const token=localStorage.getItem('jwtToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};

  const handleExamData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/getAllExams',config);
      setExamData(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete all Exam Data?');
      if (confirmDelete) {
        await axios.delete('http://localhost:8080/api/deleteAllExams',config);
        console.log('All exams deleted successfully from the database!');
        handleExamData(); // Refresh exam data after successful deletion
      } else {
        console.log("Delete all discarded");
      }
    } catch (error) {
      console.error('Error deleting exams:', error);
    }
  };

  const handleDeleteById = async (examId) => {
    try {
      const confirmDelete = window.confirm(`Are you sure you want to delete the ${examId} Exam Record?`);
      if (confirmDelete) {
        await axios.delete(`http://localhost:8080/api/deleteExam/${examId}`,config);
        console.log(`Exam with ID ${examId} deleted successfully.`);
        handleExamData(); // Refresh exam data after successful deletion
      } else {
        console.log("Delete discarded");
      }
    } catch (error) {
      console.error(`Error deleting exam with ID ${examId}:`, error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const formattedDate = new Date(timestamp).toLocaleString();
    return formattedDate;
  };

  return (
    <>
      <div>
        <div className='AddStuTitle'>View Exam Data:</div>
        <br />
        <button type="button" class="btn btn-outline-secondary" style={{ margin: "10px" }} onClick={handleExamData}>
          Refresh {<img src={refreshicon} className='imgref' alt="refresh" />}
        </button>

        <br />
        <div>  <h5> <b>  Total Number Of Exams: {examData.length}  </b> </h5>  </div>
        <div  className='tableDiv' >
          <table class="custom-table">
            <thead>
              <tr>
                <th>Exam Name</th>
                <th>Exam Schedule</th>
                <th>Exam Duration(mins)</th>
                <th>Exam ID</th>
                <th>Exam Link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {examData.map((exam) => (
                <tr key={exam.examId}>
                  <td>{exam.examName}</td>
                  <td>{formatTimestamp(exam.examSchedule)}</td>
                  <td>{exam.examDuration}</td>
                  <td>{exam.examId}</td>
                  <td> http://localhost:3000/studentLogin/{exam.examId}</td>
                  <td>
                    <button type="button" class="btn btn-danger" onClick={() => handleDeleteById(exam.examId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


        </div>

        <div><button type="button" class="btn btn-danger" onClick={handleDeleteAll}>Delete All</button></div>
      </div>
    </>
  );
}

export default ViewExam;
