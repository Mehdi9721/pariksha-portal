import React, { useState } from 'react'
import "../Style/LoginStyle.css";
import { useNavigate  } from 'react-router-dom';
import img from "../ImagesAndLogo/_7c3d9119-90a8-48d0-99cc-9b1d57e27157.jpeg"
function Home() {
    const [seepass,setseepass]=useState(false);
    const [UserID,setUserID] =useState("");
    const [UserPass,setUserPass] =useState("");
    const [SubCount,setSubCount] =useState(0);
    const [visibleLogInfo,setvisi]=useState(false);
    const [visibleErrorInfo,setvisibleErrorInfo]=useState(false);
    const navigate = useNavigate ();
const  handleId=(e)=>{
    setUserID(e.target.value);
}
const handlePass=(e)=>{
    setUserPass(e.target.value);
}
const handleSubmit=(e)=>{    
e.preventDefault();
setSubCount((p)=>p+1);
if(SubCount>0){
  setvisi(true);
}
// on successfull logi
//replace this userid and password with original values
if(UserID==="1234" && UserPass==="admin"){
    //on successfull login it will redirect to adminHome Page
    navigate('/adminhomepage');
}else{
    
    setvisibleErrorInfo(true);
}
}
const x=()=>{
    if(seepass){
        setseepass(false);
    }else{
        setseepass(true);
    }
   
}
const divStyle = {
   fontSize:"13px",
   color:"red"
  };
  return (
  <>
  {/* complete body of home */}
  <div className='body'>
  {/* only header */}
<div className='header'>
    <img src={img} alt='logo' className='logoHeader'/>
<div className='BrandName'>Pariksha Portal</div>
</div>
 {/* only form Body */}
<div className='FormBody'>
<form onSubmit={handleSubmit}>
    <label>ID:</label>
    <input type='text' value={UserID} onChange={handleId}></input>
    <label>Password:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span onClick={x}> 👁️  </span> </label>
    <input type={seepass?'text':'password'}  value={UserPass}  onChange={handlePass}></input>
    {visibleErrorInfo &&(<label style={divStyle}>
    Please Check Id and Password!!!</label>)}
   {visibleLogInfo &&(<label style={divStyle}>If having problem with Login then kindly contact admin!!!</label>)}
    <button>Login</button>   
</form>
</div>
 {/* only footer */}
<div className='footer'>
<p className='footerFont'>!!!! Click For Help And Suggestion  
<a href="#">Help</a>  
Contact abcd@gmail.com  Mob- +91-1234567890 </p>
</div>

</div>
  </>
  )
}

export default Home