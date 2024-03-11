import React from 'react'
import SignupForm from '../WebsiteHomePage/SignupForm'
import "../../Style/Owner/StyleOwnerHome.css"
import { useOwnerAuth } from '../OwnerAuth';
function OwnerHome() {
  const { isLoggedIn,logout } = useOwnerAuth();
  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
     <div className='Owner-Home'>
<SignupForm></SignupForm>     

<div className='table-container'>
 <h3> Admins Record:</h3>
<table className='table table-striped custom-table'>
  <tr>
    <th>Admin</th>
    <th>Email</th>
    <th>Id</th>
    <th>Edit</th>
    <th>Delete</th>  
    </tr>
    <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    </tr>
</table>
</div>
     </div>

    </>
  )
}

export default OwnerHome