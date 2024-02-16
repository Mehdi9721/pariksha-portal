import React, { useState } from 'react';
import '../../Style/AdminPagesStyle/StyleAddStudent.css';
import axios from 'axios';
function AddStudent() {
  const [student_name, setStudentName] = useState('');
  const [student_prn, setStudentPRN] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/saveStudent", {
        student_name,
        student_prn
      });
      console.log(response.data);
      setSuccessMessage(`Data of ${student_name} added successfully!`);
      setErrorMessage('');
    } catch (e) {
      console.log(e);
      setSuccessMessage('');
      setErrorMessage('Error adding student. Please try again.');
    }
  };

  return (
    <div>
      <div className='AddStuTitle'>Add Student:</div>
      {successMessage && <div className="successMessage">{successMessage}</div>}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      <form className='tableAddStudent' onSubmit={handleForm}>
        <label>Enter Student Name:</label>
        <br />
        <input
          type='text'
          value={student_name}
          onChange={(e) => setStudentName(e.target.value)}
          required />
        <label>Enter Student PRN:</label>
        <br />
        <input
          type='number'
          value={student_prn}
          onChange={(e) => setStudentPRN(e.target.value)}
          required />
        <button>Add !!!</button>
      </form>
      <h4>Or Select File to fill details Automatically!!</h4>
      <div className='FileAreaOfAddStudent'>
        <input type='file' />
        <button>Add !!!!</button>
      </div>
    </div>
  );
}

export default AddStudent;
