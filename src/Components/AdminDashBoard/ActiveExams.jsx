import React, { useEffect, useState } from 'react';
import '../../Style/AdminPagesStyle/StyleStudentView.css';
import axios from 'axios';
import refreshicon from '../../ImagesAndLogo/refresh.png';
import "../../Style/AdminPagesStyle/StyleActiveExam.css"
import gif from "../../ImagesAndLogo/loading-loading-forever.gif";
import BASE_URL from '../ApiConfig'
function ActiveExams({ adminEmail, adminId }) {
    const [examData, setExamData] = useState([]);
    const [exams, setExams] = useState([]);
    const [count, setCount] = useState(0);
    const [load, setLoad] = useState(true);

    const token = localStorage.getItem('jwtToken');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(() => {
        handleExamData();
    }, [count]);
    const handleExamData = async () => {
        try {
            setLoad(true);
            const allExams = await axios.get(`${BASE_URL}/getAllExams/${adminEmail}`, config);
            setExams(allExams.data);
            
            const response = await axios.get(`${BASE_URL}/getAllActiveExamData/${adminId}`, config);
            setExamData(response.data);
            setLoad(false);
        } catch (e) {
            console.log(e);
            setLoad(false);
        }
    };

    const handleRefresh = () => {
        setCount((prev) => prev + 1);
    }

    const formatTimestamp = (timestamp) => {
        const formattedDate = new Date(timestamp).toLocaleString();
        return formattedDate;
    };

    const checksStatus = (examSchedule, examDuration) => {
        const currentTime = new Date();
        const examScheduleTime = new Date(examSchedule);
        const timeDifferenceInSeconds = Math.floor((currentTime - examScheduleTime) / 1000);
        const examEndTime = new Date(examScheduleTime.getTime() + examDuration * 60000); // Converting duration to milliseconds

        if (currentTime < examScheduleTime) {
            return <div className="status-upcoming">UPCOMING</div>;
        } else if (currentTime < examEndTime) {
            return (<div className='status-active-contain'> 
                <span className="status-active"> ACTIVE</span>
                {/* <button className='btn btn-primary'> Active Students</button> */}
             </div>);
        } else {
            return <div className="status-completed">COMPLETED</div>;
        }
    }

    return (
        <>
            <div className='xx'>
                <div className='activeExamsBody'>

                    <br />
                    <button type="button" className="btn btn-primary" onClick={handleRefresh}>
                        Refresh <img src={refreshicon} className='imgref' alt="refresh" />
                    </button>
                    <br /><br />
                    <table className="table table-bordered custom-table  table-activeExam">
                        <thead>
                            <tr>
                                <th>Exam Name:</th>
                                <th>Exam Status:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exams?.map((exam) => (
                                <tr key={exam.examName}>
                                    <td>{exam.examName}</td>
                                    <td>
                                        {checksStatus(exam.examSchedule, exam.examDuration)} 
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {load && (
                        <div className='loading'>
                            <div className='innerOfLoading'>
                                Please wait, we are loading active students... <img src={gif} className='gif' alt="refresh" />
                            </div>
                        </div>
                    )}

                    <div className='activeStudents'>Number of Active Students:{examData.length}</div>
                    <table className="table table-bordered custom-table  table-activeExam">
                        <thead>
                            <tr>
                                <th>Exam Name:</th>
                                <th>Exam Date:</th>
                                <th>Student Name:</th>
                                <th>Student PRN:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {examData?.map((exam) => (
                                <tr key={exam.examName}>
                                    <td>{exam.examName}</td>
                                    <td>{exam.examDate}</td>
                                    <td>{exam.studentName}</td>
                                    <td>{exam.studentPrn}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ActiveExams;
