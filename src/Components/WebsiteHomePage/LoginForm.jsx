import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
const navigate=useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put('http://localhost:8080/api/adminLogin', {
        adminEmail,
        adminPassword,
      });

      if (response.data === 0) {
        setLoginMessage('Wrong admin or password');
      } else {
        setLoginMessage('Login successful');
        const adminName = response.data.adminName;
        navigate("/adminhomepage");
        // Handle further actions upon successful login
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginMessage('An error occurred during login');
    }
  };

  return (
  
    <form className='loginForm' onSubmit={handleSubmit}>
     {/* Email input */}
  <div className="form-outline mb-4">
    <label htmlFor="username" className="form-label">Email address:</label>
    <input
      type="text"
      id="username"
      className="form-control"
      placeholder='EmailID'
      required
      onChange={(e) => setAdminEmail(e.target.value)}
    />
  </div>

       {/* Password input */}
  <div className="form-outline mb-4">
    <label htmlFor="password" className="form-label">Password:</label>
    <div style={{ display: 'flex' }}>
      <input
        type={showPassword ? 'text' : 'password' }
        id="password"
        className="form-control"
        placeholder='Password'
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <span
        style={{ cursor: 'pointer', marginLeft: '5px' }}
        onClick={togglePasswordVisibility}
      >
         {showPassword ? '🔓' : '🔒'}
      </span>
      <br></br>
     
    </div>
  </div>
      {/* 2 column grid layout for inline styling */}
  <div className="row mb-4">
    <div className="col d-flex justify-content-center">
    
    </div>

    <div >
      {/* Simple link */}
     
      <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
    </div>
  </div>

  {/* Submit button */}
  
      {loginMessage && <p>{loginMessage}</p>}
    </form>
    
  );
};

export default LoginForm;
