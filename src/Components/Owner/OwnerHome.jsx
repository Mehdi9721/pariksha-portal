import React, { useEffect, useState } from 'react';
import SignupForm from '../WebsiteHomePage/SignupForm';
import "../../Style/Owner/StyleOwnerHome.css";
import { useOwnerAuth } from '../OwnerAuth';
import axios from 'axios';

function OwnerHome() {
  const { isLoggedIn, logout } = useOwnerAuth();
  const [adminData, setAdminData] = useState([]);

  const token=localStorage.getItem('jwtToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};

  useEffect(() => {
    fetchData();
  }, [adminData]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/findAllAdmins",config);
      setAdminData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  if (!isLoggedIn) {
    return null;
  }
const handleAdminDelete=async (adminName,id,adminEmail)=>{
const k= window.confirm(`Do you want to delete admin? It will delete all data related to ${adminName}`);
if(k){
  try{
    await axios.delete(`http://localhost:8080/api/deleteAdmin/${id}`,config);
    await axios.delete(`http://localhost:8080/api/deleteAll/${id}`,config);
    await axios.delete(`http://localhost:8080/api/deleteAllQuestions/${adminEmail}`,config);
    await axios.delete(`http://localhost:8080/api/deleteAllStudentResultData/${id}`,config);
  }catch(e){
    console.log(e);
  }
}
}
  return (
    <>
      <div className='Owner-Home'>
        <h4>This signup form can also edit admins Record by providing the Right email:</h4>
        <SignupForm></SignupForm>

        <div className='table-container'>
          <h3>Admins Record:</h3>
          <table className='table table-striped custom-table table-adminView'>
            <thead>
              <tr>
                <th>Name</th>
                <th>User Name</th>
                <th>Email</th>
                <th>ID</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {adminData.map(admin => (
                <tr key={admin.id}>
                  <td>{admin.adminName}</td>
                  <td>{admin.adminUserName}</td>
                  <td>{admin.adminEmail}</td>
                  <td>{admin.id}</td>
                  <td> <button className='btn btn-danger' onClick={() => handleAdminDelete(admin.adminName,admin.id,admin.adminEmail)}  >Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='AdminActions'>
          Admin Actions:
        </div>
      </div>
    </>
  );
}

export default OwnerHome;
