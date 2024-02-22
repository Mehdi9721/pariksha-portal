import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from "../WebsiteHomePage/LoginForm";
import Signup from "../WebsiteHomePage/SignupForm"; 
import "../../Style/WebsiteHomePageStyle/LoginStyle.css";
import img from "../../ImagesAndLogo/_7c3d9119-90a8-48d0-99cc-9b1d57e27157.jpeg";
import '../../Style/WebsiteHomePageStyle/StyleWebsiteHome.css'

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLogin(!showLogin);
    setShowSignup(false); 
  };

  const handleSignupClick = () => {
    setShowSignup(!showSignup);
    setShowLogin(false); 
  };

  const handleHelpClick = () => {
   navigate("/HelpComponent")
  };
  
  const examId = 12;

  return (
    <>
      <div className='body'>
        <div className='adminheader'>
          <img src={img} alt='logo' className='logoHeader rotating-logo' />
          <div className='BrandName'>Pariksha Portal</div>
        </div>

        <div className='navbar-websiteHome animated-buttons'>
          <button className={`btn-websitehome ${showLogin ? 'hidden' : ''}`} onClick={handleLoginClick}>
            {showLogin ? 'Hide' : 'Admin Login'}
          </button>
          {/* <button className={`btn-websitehome ${showSignup ? 'hidden' : ''}`} onClick={handleSignupClick}>
            {showSignup ? 'Hide' : 'Admin Signup'}
          </button> */}
          {/* <button className='btn-websitehome' onClick={() => { navigate(`/studentLogin/${examId}`) }}>Student Login</button> */}
          <button className='btn-websitehome' onClick={handleHelpClick}>Help</button>
        </div>
        <div>
          {showLogin && <Login />}
          {showSignup && <Signup />}
        </div>
        <div className='footer'>
          <p className='footerFont'>
            !!!! Click For Help And Suggestion  
            <a href="/HelpComponent">Help</a>  
            
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
