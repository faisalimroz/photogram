import React from 'react';
import { useSelector } from 'react-redux';
import Loading from '../Components/loading/Loading';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({children}) => {
    const {user:{email,role},isLoading}=useSelector(state=>state.auth)
    
   if (isLoading) {
    return(
        <Loading></Loading>
    )
   }
   if (!isLoading&&!email) {
    return(
      <Navigate to='/login' replace={true}></Navigate>
    )
   }
  return children
}

export default PrivateRoute;