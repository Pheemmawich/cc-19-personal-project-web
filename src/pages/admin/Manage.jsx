import React, { useEffect, useState } from 'react'
import { actionDeleteUser, actionListUsers, actionUpdateRole } from '../../api/user';
import useAuthStore from '../../stores/auth-store';
import { Trash, Trash2 } from 'lucide-react';
import { createAlert } from '../../utils/createAlert';
import Swal from 'sweetalert2';

function Manage() {
  const [users, setUsers] = useState([])
  const token = useAuthStore((state) => state.token)
  console.log(token);

  useEffect(() => {
    hdlFetchUsers(token)
  },[])

  const hdlFetchUsers = async (token) => {
    try {
      const res = await actionListUsers(token)
      const listUser = res.data.result
      setUsers(listUser);
    } catch (error) {
      console.log(error);
    }
  }

  const hdlUpdateRole = async (token, id, role) => {
    console.log(token, id, role);
    try {
      const res = await actionUpdateRole(token, {id, role})
      console.log(res);
      createAlert('success', 'update role success')
    } catch (error) {
      console.log(error);
    }
  }

  const hdlDeleteUser = async (token, id) => {
    console.log(token, id);
    try {
      Swal.fire({
        icon:"info",
        text:"Are you sure?",
        // showDenyButton:true,
        showCancelButton:true
      }).then( async(data) => {
        console.log(data.isConfirmed);
        if(data.isConfirmed){
          const res = await actionDeleteUser(token, id)
          createAlert("success", "Delete Success!!")
          hdlFetchUsers(token)
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div >
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Phone number</th>
              <th>Role</th>
            </tr>
          </thead>
          
          <tbody>
        {users.map((el) => {
          const {firstname, lastname, id, email, phoneNumber, role} = el
          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{firstname}</td>
              <td>{lastname}</td>
              <td>{email}</td>
              <td>{phoneNumber}</td>
              <td>
                <select
                onChange={(e)=>hdlUpdateRole(token, id, e.target.value)} 
                defaultValue={role}>
                  <option>USER</option>
                  <option>ADMIN</option>
                </select>
              </td>
              <td>
                <Trash2 
                color='red'
                onClick={() => hdlDeleteUser(token, id)} 
                />
              </td>
            </tr> 
          )
        })}
        </tbody>
      </table>
    </div>  
  )
}

export default Manage