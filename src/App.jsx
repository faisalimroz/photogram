import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/Router';
import { onAuthStateChanged } from 'firebase/auth';
import auth from './firebase/firebase.config';
import { useDispatch } from 'react-redux';
import { getUser, setUser, toggoleLoading } from './features/AuthSlice/AuthSlice';
import axios from 'axios';
import DisableDeveloperTools from './Security/Security';
const App = () => {
 const dispatch=useDispatch()
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if (user) {
        console.log(user)
        dispatch(getUser(user.email))
        // axios.post('https://social-server-blond.vercel.app/api/v1/jwt',{email:user.email})
        // .then(data=>{
        //   console.log(data.data.token)
        //   localStorage.setItem('user',data.data.token)
        // })
      }else{
        dispatch(toggoleLoading())
      //  localStorage.removeItem('user')
      }
    })
  },[])
  return (
 <div>
 <DisableDeveloperTools></DisableDeveloperTools>
     <RouterProvider router={router} />
 </div>
  );
};

export default App;
