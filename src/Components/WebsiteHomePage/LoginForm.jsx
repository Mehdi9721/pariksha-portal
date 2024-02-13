import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function LoginForm() {
  const [UserName, setUserName] = useState('');
  const [UserPass, setUserPass] = useState('');
  const [seepass, setSeePass] = useState(false);
  const [visibleErrorInfo, setVisibleErrorInfo] = useState(false);
  const [visibleLogInfo, setVisibleLogInfo] = useState(false);
  const navigate = useNavigate();
const handleSubmit = (e) => {
    e.preventDefault();

    // Check credentials (replace this with your actual authentication logic)
    if (UserName === 'ulkajoshi' && UserPass === 'admin') {
     navigate("/adminhomepage");
    } else {
      // Failed login logic
      setVisibleErrorInfo(true);
    }
  };

  const handleId = (e) => {
    setUserName(e.target.value);
    setVisibleErrorInfo(false); // Hide error message when user is typing
  };

  const handlePass = (e) => {
    setUserPass(e.target.value);
    setVisibleErrorInfo(false); // Hide error message when user is typing
  };

  const togglePassVisibility = () => {
    setSeePass(!seepass);
  };

  const divStyle = {
    color: 'red',
    marginTop: '5px',
  };

  return (
    <div>
      <div className='FormBody'>
        <form onSubmit={handleSubmit}>
          <label>
            UserName:
            <input
              type='text'
              value={UserName}
              onChange={handleId}
              required
            />
          </label>
          <label>
            Password:
            <input
              type={seepass ? 'text' : 'password'}
              value={UserPass}
              onChange={handlePass}
              required
            />
            <span onClick={togglePassVisibility}> 👁️ </span>
          </label>
          {visibleErrorInfo && (
            <label style={divStyle}>
              Incorrect Username or Password. Please try again.
            </label>
          )}
          {visibleLogInfo && (
            <label style={divStyle}>
              If having problems with login, please contact admin.
            </label>
          )}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;







// import React from 'react'

// function LoginForm() {
//   return (
//     <div>
// <div className='FormBody'>
// <form onSubmit={handleSubmit}>
//     <label>UserName:</label>
//     <input type='text' value={UserName} onChange={handleId}></input>
//     <label>Password:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span onClick={x}> 👁️  </span> </label>
//     <input type={seepass?'text':'password'}  value={UserPass}  onChange={handlePass}></input>
//     {visibleErrorInfo &&(<label style={divStyle}>
//     Please Check Id and Password!!!</label>)}
//    {visibleLogInfo &&(<label style={divStyle}>If having problem with Login then kindly contact admin!!!</label>)}
//     <button>Login</button>   
// </form>
// </div>
// </div>
//   )
// }

// export default LoginForm