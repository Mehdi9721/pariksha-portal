import React, { useState } from 'react';
import '../../Style/AdminPagesStyle/StyleAdminHome.css';
import AddStudent from './AddStudent';
import CreateExam from './CreateExam';
import ViewExam from './ViewExam';
import ViewResult from './ViewResult';
import ViewStudent from './ViewStudent';
import ActiveExams from './ActiveExams';

function AdminHome() {
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    return (
        <>
            <div className='Container'>
                <div className='Header'>
                    Welcome Admin !!
                </div>
                <div className='centralBody'>
                    <table className='tableAdminPanel'>
                        <tr><td><button className={activeButton === 'NewExam' ? 'active' : ''} onClick={() => { handleButtonClick('NewExam'); }}> Create New Exam</button></td></tr>
                        <tr><td><button className={activeButton === 'ViewExam' ? 'active' : ''} onClick={() => { handleButtonClick('ViewExam'); }}> View Exams</button></td></tr>
                        <tr><td><button className={activeButton === 'AddStu' ? 'active' : ''} onClick={() => { handleButtonClick('AddStu'); }}>Add Students</button></td></tr>
                        <tr><td><button className={activeButton === 'ViewStudent' ? 'active' : ''} onClick={() => { handleButtonClick('ViewStudent'); }}>  View Students</button></td></tr>
                        <tr><td><button className={activeButton === 'ViewResult' ? 'active' : ''} onClick={() => { handleButtonClick('ViewResult'); }}>  View Results</button></td></tr>
                        <tr><td><button className={activeButton === 'ActiveExams' ? 'active' : ''} onClick={() => { handleButtonClick('ActiveExams'); }}> Active Exams</button></td></tr>
                    </table>
                </div>
                <div className='container2'>
                    {activeButton === 'AddStu' && <AddStudent />}
                    {activeButton === 'NewExam' && <CreateExam />}
                    {activeButton === 'ViewExam' && <ViewExam />}
                    {activeButton === 'ViewResult' && <ViewResult />}
                    {activeButton === 'ViewStudent' && <ViewStudent />}
                    {activeButton === 'ActiveExams' && <ActiveExams />}
                </div>
            </div>
        </>
    );
}

export default AdminHome;
