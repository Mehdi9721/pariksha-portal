import React, { useEffect, useState } from 'react';
import '../../Style/AdminPagesStyle/StyleStudentView.css';
import axios from 'axios';
import refreshicon from '../../ImagesAndLogo/refresh.png';

function ViewStudent() {
  const [stdData, setdata] = useState([]);
  const [searchPRN, setSearchPRN] = useState('');
  const [foundStudents, setFoundStudents] = useState({});

  useEffect(() => {
    // Fetch student data when the component mounts
    handleStudentData();
  }, [stdData, searchPRN, foundStudents]); // Empty dependency array ensures this effect runs only once when the component mounts

  const handleStudentData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/getAllStudent');
      setdata(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteAll = async () => {
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
    setFoundStudents(stdData.filter((std) => std.studentPrn === searchPRN));
    console.log(foundStudents[0]);
  };

  const resetSearch = () => {
    setSearchPRN('');
    handleStudentData();
  };

  const handleDeleteStudent = async (prn) => {
    const confirmDelete = window.confirm(`Do you want to delete the student with PRN: ${prn}?`);

    if (confirmDelete) {
      try {
        // Make an API call to delete the student
        await axios.delete(`http://localhost:8080/api/deleteStudent/${prn}`);

        // Update the state to reflect the changes
        setdata((prevData) => prevData.filter((std) => std.studentPrn !== prn));
      } catch (error) {
        console.error('Error deleting student:', error);
        // Display an error message to the user
      }
    }
  };

  return (
    <>
      <div className='viewBody'>
        <div className='AddStuTitle'>View Student:</div>
        <br />
        <button  type="button" class="btn btn-outline-secondary"  onClick={handleStudentData}>
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
          <button onClick={handleSearch} type="button" class="btn btn-outline-primary"style={{ margin: "10px" }}  >Search</button>
          <button onClick={resetSearch} type="button" class="btn btn-outline-primary" style={{ margin: "10px" }}>Reset</button>
        </div>
        <br></br>
        {foundStudents.length > 0 && (
          <table border={"5px solid black"} class="table table-striped StudentViewTable">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student PRN</th>
                <th>Delete Student</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{foundStudents[0].studentName}</td>
                <td>{foundStudents[0].studentPrn}</td>

                <td><button onClick={() => handleDeleteStudent(foundStudents[0].studentPrn)} type="button" class="btn btn-danger"   >Delete</button></td>

              </tr>
            </tbody>
          </table>)}
        <br />
        <div>Total Number Of Students: {stdData.length}
          <div><button onClick={handleDeleteAll} type="button" class="btn btn-danger"  style={{ margin: "10px" }}  >Delete All</button></div>
        </div>
        <table border={"5px solid black"} class="table table-striped">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student PRN</th>
              <th>Delete Student</th>
            </tr>
          </thead>
          <tbody>
            {stdData?.map((std) => (
              <tr key={std.studentPrn}>
                <td>{std.studentName}</td>
                <td>{std.studentPrn}</td>
                <td><button onClick={() => handleDeleteStudent(std.studentPrn)} type="button" class="btn btn-danger"    >Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewStudent;
