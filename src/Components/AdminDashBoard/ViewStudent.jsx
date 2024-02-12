import React from 'react'
import '../../Style/StyleStudentView.css'
function ViewStudent() {
  return (
    <>
     <div>
     <div className='AddStuTitle'>View Student:</div>
     <br></br>
        <div>Total Number Of Students:</div>
      <table border={"1px solid black"} className='StudentViewTable'>
        <th>Student Name:</th>
        <th>Student PRN:</th>
        <th>Update Student:</th>
        <th>Delete Student:</th>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>

      </table>  
<div className='DeleteAll'><button>Delete All</button></div>
     </div>
    </>
  )
}

export default ViewStudent