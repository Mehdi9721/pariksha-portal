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
    if (prn === '123456789123' || password === '123456789123') {
      navigate('/stndexam');
    }
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
          <label htmlFor="prn">Enter PRN:</label>
          <input
            type="number"
            id="prn"
            value={prn}
            required
            onChange={(e) => setPrn(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Enter Password:</label>
          <input
            type="number"
            id="password"
            value={password}
            required
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