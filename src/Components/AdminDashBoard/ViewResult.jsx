import React, { useEffect, useState } from 'react';
import '../../Style/AdminPagesStyle/StyleStudentView.css';
import axios from 'axios';
import refreshicon from '../../ImagesAndLogo/refresh.png';

function ViewResult() {
  const [resultData, setResultData] = useState([]);
  const [searchPRN, setSearchPRN] = useState('');
  const [foundResults, setFoundResults] = useState({});

  useEffect(() => {
    // Fetch result data when the component mounts
    handleResultData();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const handleResultData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/getAllStudentResultData');  
      setResultData(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteAll = async () => {
    const al = window.confirm('Do you want to delete all students?');
    if (al) {
      try {
        await axios.delete('http://localhost:8080/api/deleteAllStudentResultData');
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("delete all discarded");
    }
  };
  

  const handleSearch = () => {
    setFoundResults(resultData.filter((result) => result.studentPrn === searchPRN));
    console.log(foundResults[0]);
  };

  const resetSearch = () => {
    setSearchPRN('');
    handleResultData();
  };

  const handleDeleteResult = async (prn) => {
    const confirmDelete = window.confirm(`Do you want to delete the result with PRN: ${prn}?`);

    if (confirmDelete) {
      try {
        // Make an API call to delete the result
        await axios.delete(`http://localhost:8080/api/deleteStudentResultDataByStudentPrn/${prn}`);  

        // Update the state to reflect the changes
        setResultData((prevData) => prevData.filter((result) => result.studentPrn !== prn));
      } catch (error) {
        console.error('Error deleting result:', error);
        // Display an error message to the user
      }
    }
  };

  return (
    <>
      <div className='viewBody'>
        <div className='ResultViewTitle'> <h4><b> View Result of Students </b>  </h4></div>
        <br />
        <button type="button" class="btn btn-outline-secondary" onClick={handleResultData}>
          Refresh {<img src={refreshicon} className='imgref' alt="refresh" />}
        </button>
        <br></br>
        <div className='searchBox'>
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
          <table border={"5px solid black"} class="table table-striped">
            <thead>
              <tr>
                
                <th>Student PRN</th>
                <th>Student Name</th>
                <th>Exam Name</th>
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
                <td>{foundResults[0].examName}</td>
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
        <table class="table table-striped custom-table">
          <thead>
            <tr>
            
              <th>Student PRN</th>
              <th>Student Name</th>
              <th>Exam Name</th>
              <th>Exam Date</th>
              <th>Result Download Link</th>
              <th>Student Marks</th>
              <th>Delete Result</th>
            </tr>
          </thead>
          <tbody>
            {resultData?.map((result) => (
              <tr key={result.studentPrn}>
                
                <td>{result.studentPrn}</td>
                <td>{result.studentName}</td>
                <td>{result.examName}</td>
                <td>{result.examDate}</td>
                <td>{result.studentResultDownloadLink}</td>
                <td>{result.studentMarks}</td>
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
