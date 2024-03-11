import React, { useEffect, useState } from 'react';
import '../../Style/AdminPagesStyle/StyleStudentView.css';
import axios from 'axios';
import refreshicon from '../../ImagesAndLogo/refresh.png';
import "../../Style/AdminPagesStyle/StyleActiveExam.css"
import gif from "../../ImagesAndLogo/loading-loading-forever.gif";

function ActiveExams({adminEmail,adminId}) {
    const [examData, setExamData] = useState([]);
    const [searchExamName, setSearchExamName] = useState('');
    const [foundExams, setFoundExams] = useState([]);
    const [load,setLoad]=useState(true);

    const token=localStorage.getItem('jwtToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
    useEffect(() => {
        handleExamData();
    }, [examData,foundExams]);

    const handleExamData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/getAllActiveExamData/${adminId}`,config);
            setExamData(response.data);
            setLoad(false);
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

    //future
    // const handleDeleteAllExam = async () => {
    //     const confirmDelete = window.confirm(`Do you want to delete the  ALL Active exams   Data`);

    //     if (confirmDelete) {
    //         try {
    //             // Make an API call to delete the exam
    //             await axios.delete(`http://localhost:8080/api/deleteAllActiveExamData`,config);
    //         } catch (error) {
    //             console.error('Error deleting exam:', error);
    //         }
    //     }
    // };

    return (
        <>
            <div className='activeExamsBody'>
                <div className='ActiveExamsTitle'><h4><b> Active Students </b>  </h4></div>
                <br />
                <button type="button" class="btn btn-primary" onClick={handleExamData}>
                    Refresh {<img src={refreshicon} className='imgref' alt="refresh" />}
                </button>
                <br></br>
             
                {foundExams.length > 0 && (
                    <table border={"5px solid black"} class="table-activeExam">
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
                {load && (<div className='loading'>
                <div className='innerOfLoading'>
      Please wait, we are loading active students...... {<img src={gif} className='gif' alt="refresh" />}
         </div>        
                     </div> )}
                <h5>Total Number Of Active Students: {examData.length}
                    {/* <div><button type="button" class="btn btn-danger"  style={{ margin: "10px" }} onClick={handleDeleteAllExam}>Delete All</button></div> */}
                </h5>
                <table  class="table table-bordered custom-table  table-activeExam">
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
        </>
    );
}

export default ActiveExams;
