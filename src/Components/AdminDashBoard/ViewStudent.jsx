import React, { useEffect, useState } from 'react';
import '../../Style/AdminPagesStyle/StyleStudentView.css';
import axios from 'axios';
import refreshicon from '../../ImagesAndLogo/refresh.png';
import gif from "../../ImagesAndLogo/loading-loading-forever.gif";


function ViewStudent({adminEmail,adminId}) {
  const [stdData, setdata] = useState([]);
  const [searchPRN, setSearchPRN] = useState('');
  const [foundStudents, setFoundStudents] = useState([]);
  const [load,setLoad]=useState(false);
  useEffect(() => {
    // Fetch student data when the component mounts
    handleStudentData();
  }, [foundStudents]); 

  const token=localStorage.getItem('jwtToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};
  const handleStudentData = async () => {
    setLoad(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/getAllStudent/${adminId}`,config);
      setdata(response.data);
      setLoad(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteAll = async () => {
    const al = window.confirm('Do you want to delete all students?');
    if (al) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/deleteAll/${adminId}`,config);
        setdata([]);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("delete all discarded");
    }
  };

  const handleSearch = () => {
    setFoundStudents(stdData.filter((std) => std.studentPrn === searchPRN));
 
  };

  const resetSearch = () => {
    setSearchPRN('');
    handleStudentData();
  };

  const handleDeleteStudent = async (prn) => {
    const confirmDelete = window.confirm(`Do you want to delete the student with PRN: ${prn}?`);

    if (confirmDelete) {
      try {
        
        await axios.delete(`http://localhost:8080/api/deleteStudent/${prn}`,config);
setFoundStudents([]);
        setdata((prevData) => prevData.filter((std) => std.studentPrn !== prn));
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  return (
    <>
      <div className='view-students'>
      
      {load && (<div className='loading'>
    <div className='innerOfLoading'>
               Please wait, we are loading students data...... {<img src={gif} className='gif' alt="refresh" />}
         </div>
</div> )}

      <div className='searchBox'>
        <button  type="button" class="btn btn-primary"  onClick={handleStudentData}>
          Refresh {<img src={refreshicon} className='imgref' alt="refresh" />}
        </button>
          <input
            type="text"
            placeholder="Search by PRN"
            value={searchPRN}
            onChange={(e) => setSearchPRN(e.target.value)}
          />
          <button onClick={handleSearch} type="button" class="btn btn-primary"style={{ margin: "10px" }}  >Search</button>
          <button onClick={resetSearch} type="button" class="btn btn-primary" style={{ margin: "10px" }}>Reset</button>
        </div>
        <br></br>
      
        {foundStudents.length > 0 && (
          <table  class="table table-striped custom-table StudentViewTable">
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
        <table  class="table table-striped custom-table StudentViewTable">
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
