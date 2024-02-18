import React, { useEffect, useState } from 'react';
import '../../Style/AdminPagesStyle/StyleStudentView.css';
import axios from 'axios';
import refreshicon from '../../ImagesAndLogo/refresh.png';

function ActiveExams() {
    const [examData, setExamData] = useState([]);
    const [searchExamName, setSearchExamName] = useState('');
    const [foundExams, setFoundExams] = useState({});

    useEffect(() => {

        handleExamData();
    }, []);

    const handleExamData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/getAllActiveExamData');
            setExamData(response.data);
            console.log(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    const handleSearch = () => {
        setFoundExams(examData.filter((exam) => exam.examName === searchExamName));
        console.log(foundExams[0]);
    };

    const resetSearch = () => {
        setSearchExamName('');
        handleExamData();
    };

    const handleDeleteAllExam = async () => {
        const confirmDelete = window.confirm(`Do you want to delete the  ALL Active exams   Data`);

        if (confirmDelete) {
            try {
                // Make an API call to delete the exam
                await axios.delete(`http://localhost:8080/api/deleteAllActiveExamData`);



            } catch (error) {
                console.error('Error deleting exam:', error);

            }
        }
    };

    return (
        <>
            <div className='activeExamsBody'>
                <div className='ActiveExamsTitle'><h1><b><i> Active Exams Data </i>  </b>  </h1></div>
                <br />
                <button className='refresh-btn' onClick={handleExamData}>
                    Refresh {<img src={refreshicon} className='imgref' alt="refresh" />}
                </button>
                <br></br>
             
                {foundExams.length > 0 && (
                    <table border={"1px solid black"} className='ActiveExamsTable'>
                        <thead>
                            <tr>
                                <th>Exam Name:</th>
                                <th>Exam Date:</th>
                                <th>Student Name:</th>
                                <th>Student PRN:</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{foundExams[0].examName}</td>
                                <td>{foundExams[0].examDate}</td>
                                <td>{foundExams[0].studentName}</td>
                                <td>{foundExams[0].studentPrn}</td>
                                <td><button>Delete</button></td>
                            </tr>
                        </tbody>
                    </table>)}
                <br />
                <div>Total Number Of Active Exams: {examData.length}
                    <div className='DeleteAll'><button onClick={handleDeleteAllExam}>Delete All</button></div>
                </div>
                <table border={"1px solid black"} className='ActiveExamsTable'>
                    <thead>
                        <tr>
                            <th>Exam Name:</th>
                            <th>Exam Date:</th>
                            <th>Student Name:</th>
                            <th>Student PRN:</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {examData?.map((exam) => (
                            <tr key={exam.examName}>
                                <td>{exam.examName}</td>
                                <td>{exam.examDate}</td>
                                <td>{exam.studentName}</td>
                                <td>{exam.studentPrn}</td>
                                <td> <button> Monitor Student </button>  </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ActiveExams;
