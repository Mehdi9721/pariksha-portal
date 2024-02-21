import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import "../../Style/StudentPanelStyle/StyleInstructionPage.css";
const InstructionPage = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { studentName, studentPrn } = state || {};
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    //getting id from param
    const { examId } = useParams();
     useEffect(()=>{
        console.log('Exam ID:', examId);
     },[examId])

    //handling submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isChecked) {
            navigate(`/stndexam/${examId}`,{ state: { studentName, studentPrn } }); 
        } else {
            alert('Please check the checkbox and provide required information.');
        }
    };
    return (
        <div className="instructions-container">
            <div className="exam-instructions-container">
                <h1 className="h1">Exam Instructions</h1>
                <div className="instructions">
                    <ul>
                        <li>Please read all instructions carefully before starting the exam.</li>
                        <li>Ensure you have a stable internet connection throughout the exam duration.</li>
                        <li>Do not refresh the page during the exam.</li>
                        <li>Answer all questions within the specified time.</li>          
                        <li>Use a compatible browser (Chrome, Firefox, Safari, etc.) to access the exam portal.</li>
                        <li>Make sure your device's camera and microphone are enabled if required for proctoring.</li>                    
                    </ul>
                    <p className='p'>If you encounter any technical issues during the exam, please reach out to our technical support team immediately.</p>
                </div>
                <div className="text-center mt-3">
                <form onSubmit={handleSubmit} className='instructionForm'>
                    <label>
                        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                        I have read all the instructions and I accept all terms and conditions.
                    </label>
                    <br></br>
                    <button type="submit" className="btn-success">Start Exam</button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default InstructionPage;