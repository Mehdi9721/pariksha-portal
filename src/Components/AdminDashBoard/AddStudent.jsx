import React, { useState } from 'react';
import '../../Style/AdminPagesStyle/StyleAddStudent.css';
import axios from 'axios';
function AddStudent() {
  const [studentName, setStudentName] = useState('');
  const [studentPrn, setStudentPRN] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/saveStudent", {
       studentName,
      studentPrn
      });
      console.log(response.data);
      setSuccessMessage(`Data of ${studentName} added successfully!`);
      setErrorMessage('');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3500);
    } catch (e) {
      console.log(e);
      setSuccessMessage('');
      setErrorMessage('Error adding student. Please try again.');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3500);
    }
  };


  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);
    if(file!==null){
      try{
        axios.post('http://localhost:8080/api/upload', formData);
        setSuccessMessage(`Data of Students added successfully!`);
        setErrorMessage('');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3500);
      }catch(e){
        setSuccessMessage('');
        setErrorMessage('Error adding student. Please try again.');
        setTimeout(() => {
          setErrorMessage('');
        }, 3500);
      }
    
    }else{
      setSuccessMessage('');
        setErrorMessage('Please Select File.');
        setTimeout(() => {
          setErrorMessage('');
        }, 3500);
    }
   
 
  }

  return (
    <div>
      <div className='AddStuTitle'>Student Entry to the DataBase :</div>
      {successMessage && <div className="successMessage">{successMessage}</div>}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      <form className='tableAddStudent' onSubmit={handleForm}>
        <label>Enter Student Name:</label>
        <br />
        <input
          type='text'
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required />
        <label>Enter Student PRN:</label>
        <br />
        <input
          type='number'
          value={studentPrn}
          onChange={(e) => setStudentPRN(e.target.value)}
          required />
        <button   type="button" class="btn btn-primary active" >Add Student</button>
      </form>

      <br></br>
      <h6>Or Select File to fill details Automatically!!</h6>
      <div className='FileAreaOfAddStudent'>
        <input type='file'  onChange={handleFileChange }/>
        <button onClick={handleUpload }   type="button" class="btn btn-primary active">Add Students List File</button>
      </div>
    </div>
  );
}

export default AddStudent;
