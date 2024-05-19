import React, { useEffect, useState } from 'react';
import "../../Style/AdminPagesStyle/StyleViewReult.css"
import axios from 'axios';
import refreshicon from '../../ImagesAndLogo/refresh.png';
import gif from "../../ImagesAndLogo/loading-loading-forever.gif";
import BASE_URL from '../ApiConfig'

function ViewResult({adminEmail,adminId}) {
  const [resultData, setResultData] = useState([]);
  const [searchPRN, setSearchPRN] = useState('');
  const [searchExamId, setSearchExamId] = useState('');
  const [foundResults, setFoundResults] = useState([]);
  const [load,setLoad]=useState(false);

  useEffect(() => {
    handleResultData();
  }, [foundResults]); 

  const token=localStorage.getItem('jwtToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};

  const handleResultData = async () => {
    setLoad(true);
    try {
      const response = await axios.get(`${BASE_URL}/getAllStudentResultData/${adminId}`,config);  
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
        await axios.delete(`${BASE_URL}/deleteAllStudentResultData/${adminId}`,config);
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
  

  const handleSearch = (e) => {
    e.preventDefault();
    setFoundResults(resultData.filter((result) => result.studentPrn === searchPRN && result.examId===searchExamId));
  };



  
  const handleDeleteResult = async (prn,examId) => {
    const confirmDelete = window.confirm(`Do you want to delete the result with PRN: ${prn}?`);

    if (confirmDelete) {
      setLoad(true);
      try {
        await axios.delete(`${BASE_URL}/deleteStudentResultDataByStudentPrn/${prn}/${examId}`,config);
        setFoundResults([]);
      setLoad(false);
      } catch (error) {
      setLoad(false);
        console.error('Error deleting result:', error);
      
      }
    }
    
  };

  const inlineStyles = {
    marginLeft:"20px"
      };

  return (
    <>
    <div className='xx'>
      <div className='viewResult'>

      {load && (<div className='loading'>
    <div className='innerOfLoading'>
               Please wait, we are loading results...... {<img src={gif} className='gif' alt="refresh" />}
         </div>
</div> )}


        <div className='ResultViewTitle'> <h4><b>Results of Students </b>  </h4></div>
        <div className='searchBox'>
        <button type="button" class="btn btn-primary" onClick={handleResultData}>
          Refresh {<img src={refreshicon} className='imgref' alt="refresh" />}
        </button>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="PRN"
            value={searchPRN}
            onChange={(e) => setSearchPRN(e.target.value)}
            required
          />
            <input
            type="text"
            placeholder="Exam Id"
            value={searchExamId}
            onChange={(e) => setSearchExamId(e.target.value)}
            required
          />
          <button   class="btn btn-primary"  style={{ margin: "10px" }}  >Search</button>
          </form>

        </div>
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
                <td><button  type="button" class="btn btn-danger"    onClick={() => handleDeleteResult(foundResults[0].studentPrn,foundResults[0].examId)}>Delete</button></td>
              </tr>
            </tbody>
          </table>)}
        <br />

        <div>
        <div style={inlineStyles}>Total Number Of Results: {resultData.length}
          <button   type="button" class="btn btn-danger"   style={{ margin: "10px" }}
             onClick={handleDeleteAll}>Delete All</button>
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
                <td><button    type="button" class="btn btn-danger"   onClick={() => handleDeleteResult(result.studentPrn,result.examId)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

      </div>
      </div>
    </>
  );
}

export default ViewResult;
