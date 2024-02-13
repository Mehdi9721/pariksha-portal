import React, { useState } from 'react'
import '../../Style/AdminPagesStyle/StyleAdminHome.css'
import AddStudent from './AddStudent'
import CreateExam from './CreateExam'
import ViewExam from './ViewExam'
import ViewResult from './ViewResult'
import ViewStudent from './ViewStudent'
function AdminHome() {
    const [NewExam,setNewExam]=useState(false);
    const [AddStu,setAddStu]=useState(false);
    const [ViewExambtn,setViewExam]=useState(false);
    const [ViewResultbtn,setViewResult]=useState(false);
    const [ViewStudentbtn,setViewStudentbtn]=useState(false);
    const handleNewExam=()=>{
     setNewExam(true);
     setAddStu(false);
     setViewExam(false);
     setViewResult(false);
     setViewStudentbtn(false);
    }
    const handleAddStu=()=>{
     setNewExam(false);
     setAddStu(true);
     setViewExam(false);
     setViewResult(false);   
     setViewStudentbtn(false);
    }
    const handleViewExam=()=>{
     setNewExam(false);
     setAddStu(false);
     setViewExam(true);
     setViewResult(false);   
     setViewStudentbtn(false);
    }
    const handleViewResult=()=>{
     setNewExam(false);
     setAddStu(false);
     setViewExam(false);
     setViewResult(true);   
     setViewStudentbtn(false);
    }
    const handleViewStudent=()=>{
      setNewExam(false);
      setAddStu(false);
      setViewExam(false);
      setViewResult(false);   
      setViewStudentbtn(true);
    }
 
  return (
    <>
    <div className='Container'>
<div className='Header'>
    Welcome Admin
</div>
<div className='centralBody'>
<table className='tableAdminPanel'>
    <tr><td><button onClick={handleNewExam}> Create New Exam</button></td></tr>
    <tr><td><button onClick={handleViewExam}> View Exams</button></td></tr>
    <tr><td><button onClick={handleAddStu}>Add Students</button></td></tr>
    <tr><td><button onClick={handleViewStudent}>  View Students</button></td></tr>
    <tr><td><button onClick={handleViewResult}>  View Results</button></td></tr>
</table>
</div>
<div className='container2'>
{AddStu&& <AddStudent></AddStudent> }
{NewExam&& <CreateExam></CreateExam>}
{ViewExambtn&& <ViewExam></ViewExam>}
{ViewResultbtn&& <ViewResult></ViewResult>}
{ViewStudentbtn&& <ViewStudent></ViewStudent>}
</div>
</div>

    </>
  )
}

export default AdminHome