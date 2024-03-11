import React, { useState } from 'react';
import '../../Style/AdminPagesStyle/StyleAdminHome.css';
import AddStudent from './AddStudent';
import CreateExam from './CreateExam';
import ViewExam from './ViewExam';
import ViewResult from './ViewResult';
import ViewStudent from './ViewStudent';
import ActiveExams from './ActiveExams';
import backgroundImage from '../../ImagesAndLogo/classroom-2093744_1280.jpg';
import ViewQuestions from './ViewQuestions';
import { useAuth } from '../AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

function AdminHome() {
    const navi=useNavigate();
    const location = useLocation();
    const { state } = location;
    const { adminEmail,adminId,adminName} = state || {};

    const [activeButton, setActiveButton] = useState(null);
    const [showBackgroundImage, setShowBackgroundImage] = useState(true);
    const { isLoggedIn,logout } = useAuth();
    if (!isLoggedIn) {
        return null;
      }
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        setShowBackgroundImage(false);
    };
const handleHome=()=>{
    setActiveButton(null);
        setShowBackgroundImage(true);
}
const handleLogOut=()=>{
    const x=window.confirm("Do yo want to logout?");
    if(x){
        logout();
        navi("/");
    }

}
    return (
        <>
            <div className='Container' 
            >
                     <div>
                         {showBackgroundImage && (
                            <img src={backgroundImage} alt="Background" className="background-image" />
                        )}
                    </div>
               
                <div className='centralBody'>
                    
        <button  style={{ margin: '5px' }}   className={activeButton === 'Home' ? 'active' : ''} onClick={() => { handleHome(); }}>Home</button>
        <button  style={{ margin: '5px' }}   className={activeButton === 'NewExam' ? 'active' : ''} onClick={() => { handleButtonClick('NewExam'); }}> Create Exam</button>
        <button style={{ margin: '5px' }} className={activeButton === 'ViewExam' ? 'active' : ''} onClick={() => { handleButtonClick('ViewExam'); }}> View Exams</button>
        <button  style={{ margin: '5px' }} className={activeButton === 'ActiveExams' ? 'active' : ''} onClick={() => { handleButtonClick('ActiveExams'); }}> Active Exams</button>
        <button  style={{ margin: '5px' }} className={activeButton === 'ViewQuestions' ? 'active' : ''} onClick={() => { handleButtonClick('ViewQuestions'); }}>View Questions</button>
        <button   style={{ margin: '5px' }} className={activeButton === 'AddStu' ? 'active' : ''} onClick={() => { handleButtonClick('AddStu'); }}>Add Students</button>
        <button  style={{ margin: '5px' }} className={activeButton === 'ViewStudent' ? 'active' : ''} onClick={() => { handleButtonClick('ViewStudent'); }}>  View Students</button>
        <button  style={{ margin: '5px' }} className={activeButton === 'ViewResult' ? 'active' : ''} onClick={() => { handleButtonClick('ViewResult'); }}>  View Results</button>
        <button  style={{ margin: '5px' }}   className={activeButton === 'LogOut' ? 'active' : ''} onClick={() => { handleLogOut(); }}> LogOut</button>
                   
                </div>
                 <div className='container2'>
                 
                 {activeButton == null && (
  <div className="box-container">
   <div className='instruction'>
   <div className='Header'>
                    Welcome to Pariksha Portal !! <span className='adminName'> {adminName} </span>
                                    </div>
<br></br>
<h5> Instructions for using this website:</h5>
<ol>
    <li>Question Paper Excel Sheet:
        <ul>
            <li>
            Use the provided template for the 'Question Paper' Excel sheet.
            </li>
            <li>
            Ensure that the questions are formatted as per the template to maintain consistency.
            </li>
        </ul>
    </li>
    <li>Students List Excel Sheet:
        <ul>
            <li>
            Utilize the specified template for the 'Students List' Excel sheet.
            </li>
            <li>
            Fill in student details adhering to the template guidelines.
            </li>
        </ul>
    </li>
    <li>Exam Link:
        <ul>
            <li>
            Once the exam is created, find the exam link in the 'View Exams' section.
            </li>
        </ul>
    </li>
    <li>Active Exams:
        <ul>
            <li>
            Check the 'Active Exams' section to see the PRN and names of students currently taking the exam.
            </li>
        </ul>
    </li>
    <li>Adding Students:
        <ul>
            <li>
            In the 'Add Student' section, input the necessary student details.
            </li>
        </ul>
    </li>
    <li>
    Viewing Students:
    <ul>
        <li>
        Use the 'View Student' section to see the list of students.
        </li>
    </ul>
    </li>
    <li>
    Exam Completion:
    <ul>
        <li>
        After students finish the exam, the results will be available in the 'View Result' section.        </li>
    </ul>
    </li>

    <li>
    Contact Information:
    <ul>
        <li>
        For any issues or queries, feel free to contact us at <span className='email'>mohammadmehdi9721@gmail.com</span>. 
        
        </li>

    </ul>
    </li>
</ol>

    </div>
 
  </div>
)}

                    {activeButton === 'AddStu' && <AddStudent adminEmail={adminEmail} adminId={adminId} />}
                    {activeButton === 'NewExam' && <CreateExam adminEmail={adminEmail} adminId={adminId}/>}
                    {activeButton === 'ViewExam' && <ViewExam  adminEmail={adminEmail} adminId={adminId}/>}
                    {activeButton === 'ActiveExams' && <ActiveExams adminEmail={adminEmail} adminId={adminId}/>}
                    {activeButton === 'ViewQuestions' && <ViewQuestions adminEmail={adminEmail} adminId={adminId}/>}
                    {activeButton === 'ViewResult' && <ViewResult adminEmail={adminEmail} adminId={adminId}/>}
                    {activeButton === 'ViewStudent' && <ViewStudent adminEmail={adminEmail} adminId={adminId}/>}
                  
                </div>
            </div>
        </>
    );
}

export default AdminHome;