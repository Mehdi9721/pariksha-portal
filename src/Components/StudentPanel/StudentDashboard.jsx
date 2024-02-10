import React, { useState } from 'react';
import '../../Style/StudentPanelStyle/StudentDashboardStyle.css'
import img from "../../ImagesAndLogo/_7c3d9119-90a8-48d0-99cc-9b1d57e27157.jpeg"
import { useNavigate  } from 'react-router-dom';
const StudentDashboard = () => {
  const [prn, setPrn] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate ();
  const handleLogin = () => {
    // Validation
    if (prn === '' || password === '') {
      setError('Both PRN and password are required');
      return;
    }

    if (prn.length!== 12) {
      setError('PRN must be equal to 12 Digits');
      return;
    }

    // Perform login logic here
    if (prn === '123456789123' || password === '123456789123') {
      navigate('/stndexam');
    }


    // If successful, you can clear the form and error
    setPrn('');
    setPassword('');
    setError('');
  };

  return (
    <div >
      <div className='header-stdn-login'>
    <img src={img} alt='logo' className='logoHeader'/>
<div className='BrandName'>Pariksha Portal</div>
</div>
      <div className='StudentDashboard'>
      <h2>Student Dashboard</h2>
      <form >
        <div>
          <label htmlFor="prn">PRN:</label>
          <input
            type="number"
            id="prn"
            value={prn}
            onChange={(e) => setPrn(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="number"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="button" onClick={handleLogin}>
          Login
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
    </div>
  );
};

export default StudentDashboard;