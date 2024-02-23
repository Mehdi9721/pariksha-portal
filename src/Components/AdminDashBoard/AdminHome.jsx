import React, { useState } from 'react';
import '../../Style/AdminPagesStyle/StyleAdminHome.css';
import AddStudent from './AddStudent';
import CreateExam from './CreateExam';
import ViewExam from './ViewExam';
import ViewResult from './ViewResult';
import ViewStudent from './ViewStudent';
import ActiveExams from './ActiveExams';
import backgroundImage from '../../ImagesAndLogo/pngtree-countdown-to-the-college-entrance-examination-image_790187.jpg';
import ViewQuestions from './ViewQuestions';
import { useAuth } from '../AuthContext';

function AdminHome() {
    const [activeButton, setActiveButton] = useState(null);
    const [showBackgroundImage, setShowBackgroundImage] = useState(true);
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn) {
        return null;
      }
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        setShowBackgroundImage(false);
    };

    return (
        <>
            <div className='Container' 
            >
                     <div>
                         {showBackgroundImage && (
                            <img src={backgroundImage} alt="Background" className="background-image" />
                        )}
                    </div>
                <div className='Header'>
                    <h4>Welcome Administrator to Pariksha Portal !!</h4>
                </div>
                <div className='centralBody'>
                    <table className='tableAdminPanel'>
                        <tr><td><button  style={{ margin: '5px' }}   className={activeButton === 'NewExam' ? 'active' : ''} onClick={() => { handleButtonClick('NewExam'); }}> Create New Exam</button></td></tr>
                        <tr><td><button style={{ margin: '5px' }} className={activeButton === 'ViewExam' ? 'active' : ''} onClick={() => { handleButtonClick('ViewExam'); }}> View Exams</button></td></tr>
                        <tr><td><button  style={{ margin: '5px' }} className={activeButton === 'ActiveExams' ? 'active' : ''} onClick={() => { handleButtonClick('ActiveExams'); }}> Active Exams</button></td></tr>
                        <tr><td><button  style={{ margin: '5px' }} className={activeButton === 'ViewQuestions' ? 'active' : ''} onClick={() => { handleButtonClick('ViewQuestions'); }}>View Questions</button></td></tr>
                        <tr><td><button   style={{ margin: '5px' }} className={activeButton === 'AddStu' ? 'active' : ''} onClick={() => { handleButtonClick('AddStu'); }}>Add Students</button></td></tr>
                        <tr><td><button  style={{ margin: '5px' }} className={activeButton === 'ViewStudent' ? 'active' : ''} onClick={() => { handleButtonClick('ViewStudent'); }}>  View Students</button></td></tr>
                        <tr><td><button  style={{ margin: '5px' }} className={activeButton === 'ViewResult' ? 'active' : ''} onClick={() => { handleButtonClick('ViewResult'); }}>  View Results</button></td></tr>
                      
                    </table>


               
                </div>
                <div className='container2'>
                    {activeButton === 'AddStu' && <AddStudent />}
                    {activeButton === 'NewExam' && <CreateExam />}
                    {activeButton === 'ViewExam' && <ViewExam />}
                    {activeButton === 'ActiveExams' && <ActiveExams />}
                    {activeButton === 'ViewQuestions' && <ViewQuestions />}
                    {activeButton === 'ViewResult' && <ViewResult />}
                    {activeButton === 'ViewStudent' && <ViewStudent />}
                  
                </div>
            </div>
        </>
    );
}

export default AdminHome;