import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext";
import gif from "../../ImagesAndLogo/loading-loading-forever.gif";


const LoginForm = () => {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [load,setLoad]=useState(false);

  const navigate=useNavigate();
const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
setLoad(true);
    try {
      const response = await axios.put('http://localhost:8080/api/adminLogin', {
        adminEmail,
        adminPassword,
      });
setLoad(false);

      if (response.data == 0) {
        console.log("wrong");
        setLoginMessage('Wrong admin or password');
      } else {
        setLoginMessage('Login successful');
        const jwtToken = response.data.token;
        const adminId= response.data.adminId;
        const adminName=response.data.adminName;
        localStorage.setItem('jwtToken', jwtToken);
        login();
      console.log(jwtToken + "token ");
        navigate("/adminhomepage",{ state: {adminEmail,adminId,adminName} });
      }
    } catch (error) {
      setLoad(false);
      console.error('Error during login:', error);
      setLoginMessage('An error occurred during login');
    }
  };

  return (
  
    <form className='loginForm' onSubmit={handleSubmit}>
              {load && (<div className='loading'>
                <div className='innerOfLoading'>
      Please wait...... {<img src={gif} className='gif' alt="refresh" />}
         </div>        
                     </div> )}

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
        style={{ cursor: 'pointer', marginLeft: '5px'}}
        onClick={togglePasswordVisibility}
      >
         {showPassword ? '🔓' : '🔒'}
      </span>
      <br></br>
     
    </div>
  </div>
   
  <div className="row mb-4">
    <div >
    {loginMessage && <p>{loginMessage}</p>}   
      <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
    </div>
  </div>

  
  
 
    </form>
    
  );
};

export default LoginForm;
