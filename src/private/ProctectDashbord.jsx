import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loading from '../Components/loading/Loading';


const ProctectDashbord = ({children}) => {
    const {user:{email,role},isLoading}=useSelector(state=>state.auth)
    
   if (isLoading) {
    return(
        <Loading></Loading>
    )
   }
   if (!isLoading&&!email&&role!=='admin') {
    return(
      <Navigate to='/login' replace={true}></Navigate>
    )
   }
   else if (!isLoading&&email&&role!=='admin') {
    return(
      <Navigate to='*' replace={true}></Navigate>
    )
   }
  return children
}

export default ProctectDashbord;