import React, { useState } from 'react';
import '../../Style/AdminPagesStyle/StyleAddStudent.css';
import axios from 'axios';
import gif from "../../ImagesAndLogo/loading-loading-forever.gif";

function AddStudent({adminEmail,adminId}) {
  const [studentName, setStudentName] = useState('');
  const [studentPrn, setStudentPRN] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = useState(null);
  const [load,setLoad]=useState(false);
  
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
      studentPrn,
      adminId
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
    formData.append('adminId', adminId);
    if(file!==null){
      setLoad(true);
      try{

        axios.post('http://localhost:8080/api/upload', formData,config);

        setSuccessMessage(`Data of Students added successfully!`);
        setErrorMessage('');
        setLoad(false);
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
    <div className='addStudent-container'>

{load && (<div className='loading'>
  <div className='innerOfLoading'>
               Please wait, we are uploading file...... {<img src={gif} className='gif' alt="refresh" />}
         </div>
   </div> )}

      <div className='form-studentAdd'>
    

      <form className='tableAddStudent' onSubmit={handleForm}>
      
      {successMessage && <div className="successMessage">{successMessage}</div>}
    

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
</div>  
      <div className='studentsUpload'>
        <br></br>
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
        <h2>OR</h2>
      <h3>Select File to fill details Automatically!!</h3>
      <div className='FileAreaOfAddStudent'>
        <input type='file'  onChange={handleFileChange }/>
        <button onClick={handleUpload }   type="button" class="btn btn-primary active">Add Students List File</button>
      </div>
      <div className='instruction-addStudent'>
       <h4>Template for excel list:</h4>
        <p>
          
        </p>
      </div>
      </div>
   
    </div>
  );
}

export default AddStudent;
