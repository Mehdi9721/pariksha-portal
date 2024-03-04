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

  const token=localStorage.getItem('jwtToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/saveStudent", {
       studentName,
      studentPrn
      },config);
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

console.log(token +"token");
        axios.post('http://localhost:8080/api/upload', formData,config);

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

      {successMessage && <div className="successMessage">{successMessage}</div>}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      <form className='tableAddStudent' onSubmit={handleForm}>
        <label>Enter Student Name:</label>
       
        <input
          type='text'
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required />
        <label>Enter Student PRN:</label>
      
        <input
          type='number'
          value={studentPrn}
          onChange={(e) => setStudentPRN(e.target.value)}
          required />
        <button    class="btn btn-primary active" >Add Student</button>
      </form>
      <br></br>
      <br></br>
      <h3>Select File to fill details Automatically!!</h3>
      <div className='FileAreaOfAddStudent'>
        <input type='file'  onChange={handleFileChange }/>
        <button onClick={handleUpload }   type="button" class="btn btn-primary active">Add Students List File</button>
      </div>
    </div>
  );
}

export default AddStudent;
