import React, { useState } from 'react';
import '../../Style/WebsiteHomePageStyle/StyleOwnerLogin.css'
import img from "../../ImagesAndLogo/_7c3d9119-90a8-48d0-99cc-9b1d57e27157.jpeg";
import { useOwnerAuth } from "../OwnerAuth";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../ApiConfig';

function OwnerLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loginMessage, setLoginMessage] = useState('');
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useOwnerAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${BASE_URL}/adminLogin`, {
        adminEmail:formData.email,
        adminPassword:formData.password,
      });

      if (response.data === 0) {
       
        setLoginMessage('Wrong admin or password');
      } else {
        if(response.data.adminName!=="Syed Mohammad Mehdi" && response.data.adminUserName!=="mehdi9721"){
          setLoginMessage('Wrong admin');
        }else{
          const jwtToken = response.data.token;
          localStorage.setItem('jwtToken', jwtToken);
          login(); 
          navigate("/ownerHome"); 
        }
      
      }

    }catch(e){
      setLoginMessage('An error occurred during login');
      console.log(e);
    }
  };

  return (
    <div>
         <div className='adminheader'>
          <img src={img} alt='logo' className='logoHeader rotating-logo' />
          <div className='BrandName'>Pariksha Portal</div>
        </div>
      <br></br>
      <form className='ownerForm' onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
              type={showPassword ? 'text' : 'password' }
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required

            
          />
           <span
        style={{ cursor: 'pointer', marginLeft: '5px'}}
        onClick={togglePasswordVisibility}
      >
         {showPassword ? '🔓' : '🔒'}
      </span> 
        </label>
        <br />
        {loginMessage && <p>{loginMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default OwnerLogin;
