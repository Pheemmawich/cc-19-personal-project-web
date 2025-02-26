import React, { useEffect, useState } from 'react'
import useAuthStore from '../stores/auth-store';
import { actiongetMe } from '../api/auth';

function ProtectRoutes({layout, allows}) {
  const token = useAuthStore((state) => state.token)
  console.log(token);

  const [ok, setOk] = useState(null)
  useEffect(() => {
    //code
    checkPermission()
  },[])

  const checkPermission = async () => {
    // console.log('Check permission');
    try {
      const res = await actiongetMe(token)
      const role = res.data.user.role
      console.log(role);
      setOk(allows.includes(role))
    } catch (error) {
      console.log(error);
      setOk(false)
    }
  }
  
  if(ok===null){
    return <h1>Loading...</h1>
  }
  if(!ok){
    return <h1>Unauthorized</h1>
  }
  
  return layout 
}

export default ProtectRoutes