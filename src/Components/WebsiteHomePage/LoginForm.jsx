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
      <label htmlFor="username">Email:</label>
      <input
        type="text"
        id="username"
        value={adminEmail}
        placeholder='Username'
        required
        onChange={(e) => setAdminEmail(e.target.value)}
      />

      <br />
      <label htmlFor="password">Password:</label>
      <div style={{ display: 'flex' }}>
        <input
          type={showPassword ? 'text' : 'password' }
          id="password"
          value={adminPassword}
          placeholder='Password'
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          style={{ cursor: 'pointer', marginLeft: '5px' }}
          onClick={togglePasswordVisibility}
        >
          {showPassword ? '🙈' : '👁️'}
        </span>
      </div>
      <br />
      <button type="submit">Submit</button>

      {loginMessage && <p>{loginMessage}</p>}
    </form>
  );
};

export default LoginForm;
