import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from "../WebsiteHomePage/LoginForm"; // Assuming you have a Login component
import Signup from "../WebsiteHomePage/Signup"; // Assuming you have a Signup component
import "../../Style/WebsiteHomePageStyle/LoginStyle.css";
import img from "../../ImagesAndLogo/_7c3d9119-90a8-48d0-99cc-9b1d57e27157.jpeg";

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();
   const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleSignupClick = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const handleHelpClick = () => {
    // Handle help click, you can add your logic here
  };

  return (
    <>
      <div className='body'>
        <div className='adminheader'>
          <img src={img} alt='logo' className='logoHeader'/>
          <div className='BrandName'>Pariksha Portal</div>
        </div>

        <div className='navbar'>
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={handleSignupClick}>Signup</button>
          <button onClick={handleHelpClick}>Help</button>
        </div>
        <div>
        {showLogin && <Login/>}
      {showSignup && <Signup/>}
        </div>
       
        <div className='footer'>
          <p className='footerFont'>
            !!!! Click For Help And Suggestion  
            <a href="#">Help</a>  
            Contact abcd@gmail.com  Mob- +91-1234567890
          </p>
        </div>
      </div>
     
    </>
  );
}

export default Home;
