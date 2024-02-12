import React, { useState } from 'react';
import '../../Style/StyleAddStudent.css';

function AddStudent() {
  const [studentName, setStudentName] = useState('');
  const [studentPRN, setStudentPRN] = useState('');
  const [confirmPRN, setConfirmPRN] = useState('');
  const [CheckconfirmPRN, setCheckConfirmPRN] = useState(false);
  const handleForm = (e) => {
    e.preventDefault();

    // Add your logic to handle form submission
    if(studentPRN!==confirmPRN){
      setCheckConfirmPRN(true);
        }else{
          setCheckConfirmPRN(false);
    console.log('Form submitted:', {
      studentName,
      studentPRN,
      confirmPRN,
    });
  }
  };

  return (
    <div>
      <div className='AddStuTitle'>Add Student:</div>
      <form className='tableAddStudent' onSubmit={handleForm}>
        <label>Enter Student Name:</label>
        <br />
        <input
          type='text'
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        required/>
        <label>Enter Student PRN:</label>
        <br />
        <input
          type='number'
          value={studentPRN}
          onChange={(e) => setStudentPRN(e.target.value)}
          required/>
        <label>Confirm Student PRN:</label>
        <br />
        { CheckconfirmPRN && <label className='warningPrn'>Recheck PRN</label>}
        <input
          type='number'
          value={confirmPRN}
          onChange={(e) => setConfirmPRN(e.target.value)}
          required/>
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
