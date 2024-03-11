import React, { useState } from 'react';
import '../../Style/WebsiteHomePageStyle/StyleOwnerLogin.css'
import img from "../../ImagesAndLogo/_7c3d9119-90a8-48d0-99cc-9b1d57e27157.jpeg";
import { useOwnerAuth } from "../OwnerAuth";
import { useNavigate } from 'react-router-dom';

function OwnerLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate=useNavigate();
  const { login } = useOwnerAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   if(formData.email=="mohd@gmail.com" && formData.password=="admin"){
login();
navigate("/ownerHome"); 
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
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default OwnerLogin;
