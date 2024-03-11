import React, { useEffect, useState } from 'react';
import "../../Style/AdminPagesStyle/StyleViewReult.css"
import axios from 'axios';
import refreshicon from '../../ImagesAndLogo/refresh.png';
import gif from "../../ImagesAndLogo/loading-loading-forever.gif";


function ViewResult({adminEmail,adminId}) {
  const [resultData, setResultData] = useState([]);
  const [searchPRN, setSearchPRN] = useState('');
  const [foundResults, setFoundResults] = useState([]);
  const [load,setLoad]=useState(false);

  const token=localStorage.getItem('jwtToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};

  const handleResultData = async () => {
    setLoad(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/getAllStudentResultData/${adminId}`,config);  
      setResultData(response.data);
      setLoad(false);
    } catch (e) {
      console.log(e);
      setLoad(false);
    }
  };


  const handleDeleteAll = async () => {
    const al = window.confirm('Do you want to delete all students?');
    if (al) {
      setLoad(true);
      try {
        await axios.delete(`http://localhost:8080/api/deleteAllStudentResultData/${adminId}`,config);
        setResultData([]);
        setLoad(false);
      } catch (e) {
        setLoad(false);
        console.log(e);
      }
    } else {
      console.log("delete all discarded");
    }
  };
  

  const handleSearch = () => {
    setFoundResults(resultData.filter((result) => result.studentPrn === searchPRN));
  };

  const resetSearch = () => {
    setSearchPRN('');
    handleResultData();
  };

  useEffect(() => {
    handleResultData();
  }, []); 
  
  const handleDeleteResult = async (prn) => {
    const confirmDelete = window.confirm(`Do you want to delete the result with PRN: ${prn}?`);

    if (confirmDelete) {
      setLoad(true);
      try {
        await axios.delete(`http://localhost:8080/api/deleteStudentResultDataByStudentPrn/${prn}`,config);
        setFoundResults([]);
      setLoad(false);
      } catch (error) {
      setLoad(false);
        console.error('Error deleting result:', error);
      
      }
    }
    
  };

  return (
    <>
      <div className='viewResult'>

      {load && (<div className='loading'>
    <div className='innerOfLoading'>
               Please wait, we are loading results...... {<img src={gif} className='gif' alt="refresh" />}
         </div>
</div> )}


        <div className='ResultViewTitle'> <h4><b> View Result of Students </b>  </h4></div>
        <div className='searchBox'>
        <button type="button" class="btn btn-primary" onClick={handleResultData}>
          Refresh {<img src={refreshicon} className='imgref' alt="refresh" />}
        </button>
          <input
            type="text"
            placeholder="Search by PRN"
            value={searchPRN}
            onChange={(e) => setSearchPRN(e.target.value)}
          />
          <button onClick={handleSearch}   type="button" class="btn btn-primary"  style={{ margin: "10px" }}  >Search</button>
          <button onClick={resetSearch}   type="button" class="btn btn-primary"  style={{ margin: "10px" }}   >Reset</button>
        </div>
        <br></br>
        {foundResults.length > 0 && (
          <table  class="table-viewresult table table-striped custom-table">
            <thead>
              <tr>
                <th>Student PRN</th>
                <th>Student Name</th>
                <th>Student MARKS</th>
                <th>Exam Name</th>
                <th>Exam Id</th>
                <th>Exam Date</th>
                <th>Result Download Link</th>
                <th>Student Marks</th>
                <th>Delete Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
               
                <td>{foundResults[0].studentPrn}</td>
                <td>{foundResults[0].studentName}</td>
                <td>{foundResults[0].studentMarks}</td>
                <td>{foundResults[0].examName}</td>
                <td>{foundResults[0].examId}</td>
                <td>{foundResults[0].examDate}</td>
                <td>{foundResults[0].studentResultDownloadLink}</td>
                <td>{foundResults[0].studentMarks}</td>
                <td><button  type="button" class="btn btn-danger"    onClick={() => handleDeleteResult(foundResults[0].studentPrn)}>Delete</button></td>
              </tr>
            </tbody>
          </table>)}
        <br />
        <div>Total Number Of Results: {resultData.length}
          <div><button   type="button" class="btn btn-danger"   style={{ margin: "10px" }}   onClick={handleDeleteAll}>Delete All</button></div>
        </div>
        <table class="table-viewresult table table-striped custom-table">
          <thead>
            <tr>
            
              <th>Student PRN</th>
              <th>Student Name</th>
              <th>Student Marks</th>
              <th>Exam Name</th>
              <th>Exam Id</th>
              <th>Exam Date</th>
              <th>Result Download Link</th>
              <th>Delete Result</th>
            </tr>
          </thead>
          <tbody>
            {resultData?.map((result) => (
              <tr key={result.studentPrn}>
                
                <td>{result.studentPrn}</td>
                <td>{result.studentName}</td>
                <td>{result.studentMarks}</td>
                <td>{result.examName}</td>
                <td>{result.examId}</td>
                <td>{result.examDate}</td>
                <td>{result.studentResultDownloadLink}</td>
                <td><button    type="button" class="btn btn-danger"   onClick={() => handleDeleteResult(result.studentPrn)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewResult;
