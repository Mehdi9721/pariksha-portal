import React, { useEffect, useState } from 'react';
import '../../Style/AdminPagesStyle/StyleStudentView.css';
import axios from 'axios';
import refreshicon from '../../ImagesAndLogo/refresh.png';


function ViewStudent() {
  const [stdData, setdata] = useState([]);
  const [searchPRN, setSearchPRN] = useState('');
  const [foundStudents,setFoundStudents]=useState({});
const handleStudentData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/getAllStudent');
      setdata(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteAll = async ()=> {
    const al = window.confirm('Do you want to delete all students?');
    if (al) {
    try {
        const response = await axios.delete('http://localhost:8080/api/deleteAll');
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("delete all discarded");
    }
  };

  const handleSearch = () => {
  setFoundStudents( stdData.filter((std) =>std.studentPrn===searchPRN));
  console.log(foundStudents[0]);
  };

  const resetSearch = () => {
    setSearchPRN('');
    handleStudentData();
  };



  return (
    <>
      <div className='viewBody'>
        <div className='AddStuTitle'>View Student:</div>
        <br />
        <button className='refresh-btn' onClick={handleStudentData}>
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
          <button onClick={handleSearch}>Search</button>
          <button onClick={resetSearch}>Reset</button>
        </div>
        <br></br>
       {foundStudents.length>0 && (
       <table border={"1px solid black"} className='StudentViewTable'>
        <thead>
            <tr>
              <th>Student Name:</th>
              <th>Student PRN:</th>
             
              <th>Delete Student:</th>
            </tr>
          </thead>
          <tbody>
          
              <tr>
                <td>{foundStudents[0].studentName}</td>
                <td>{foundStudents[0].studentPrn}</td>

                <td><button>Delete</button></td>
              </tr>
      
          </tbody>

        </table>) } 
        <br />
        <div>Total Number Of Students: {stdData.length}
        
        <div className='DeleteAll'><button onClick={handleDeleteAll}>Delete All</button></div>

        </div>
        <table border={"1px solid black"} className='StudentViewTable'>
          <thead>
            <tr>
              <th>Student Name:</th>
              <th>Student PRN:</th>
             
              <th>Delete Student:</th>
            </tr>
          </thead>
          <tbody>
            {stdData?.map((std) => (
              <tr>
                <td>{std.studentName}</td>
                <td>{std.studentPrn}</td>
               
                <td><button>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
       
      </div>
    </>
  );
}

export default ViewStudent;
