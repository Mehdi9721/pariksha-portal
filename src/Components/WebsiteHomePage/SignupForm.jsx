import React, { useState } from 'react';
import '../../Style/WebsiteHomePageStyle/StyleSignup.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignupForm = () => {
  const [adminName, setName] = useState('');
  const [adminUserName, setUsername] = useState('');
  const [adminEmail, setEmail] = useState('');
  const [adminPassword, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
const navigate =useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      adminName,
      adminUserName,
      adminEmail,
      adminPassword,
    };
  
    try {
      const response = await axios.post('http://localhost:8080/api/adminSignup', formData);
      console.log('Server response:', response.data);
      setName('');
      setUsername('');
      setEmail('');
      setPassword('');
      navigate("/adminhomepage");
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form className='signupForm' onSubmit={handleSubmit} >
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={adminName}
        placeholder='Name'
        onChange={(e) => setName(e.target.value)}
        required
      />

      <br />
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={adminUserName}
        placeholder='Username'
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <br />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={adminEmail}
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <br />
      <label htmlFor="password">Password:</label>
      <div style={{ display: 'flex' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={adminPassword}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span
          style={{ cursor: 'pointer', marginLeft: '5px' }}
          onClick={togglePasswordVisibility}
        >
          {showPassword ? '🙈' : '👁️'}
        </span>
      </div>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;