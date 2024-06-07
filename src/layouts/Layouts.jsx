import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faHome,faUpLong,faSave, faSearch ,faBars, faBug, faArrowLeft,faDashboard} from '@fortawesome/free-solid-svg-icons'
import Loading from '../Components/loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import { logout } from '../features/AuthSlice/AuthSlice';
const Layouts = () => {
  const {user:{email,role,image,name}}=useSelector(state=>state.auth)
    const [loading, setLoading] = useState(true);
   const dispatch=useDispatch()
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);  // is your prefer
    }, []);

    if (loading) {
        return (
            <Loading></Loading>
        )
    }
const handelLogOut=()=>{
  signOut(auth).then(()=>{
    dispatch(logout())
  }).catch(error=>{
    console.log(error)
  })
}
    return (
        <div>
           <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content  ">
    <label htmlFor="my-drawer-2" className="btn btn-outline  drawer-button lg:hidden"><FontAwesomeIcon icon={faBars}/></label>
   <Outlet></Outlet>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu p-4 w-[205px] h-[100vh] bg-amber-300 text-content text-black">
    <h1 className=' text-3xl mb-6'>𝔭𝔥𝔬𝔱𝔬𝔤𝔯𝔞𝔪</h1> 
<div className='mb-1'>
<div className="avatar">
  <div className=" w-20 rounded-full ring ring-info ring-offset-base-100 ring-offset-2">
    <img src={image} />
  </div>
</div>
  <div className='flex items-center gap-2'>
  <h2 className='text-xl'>{name} </h2>
  {role ==='admin' && <span className='border rounded-lg p-1'>{role}</span>}
  </div>
</div>
      {/* Sidebar content here */}
      <li><Link to='/'><FontAwesomeIcon icon={faHome}/>Home</Link></li>
      <li><Link to='/search'><FontAwesomeIcon icon={faSearch}/>Search</Link></li>
      <li><Link to='/createpost'><FontAwesomeIcon icon={faUpLong}/>Create Post</Link></li>
      <li><Link to='/profile'><div className="avatar">
  <div className="w-[20px] rounded-full ring ring-info ring-offset-base-100 ring-offset-2">
    <img alt='profile' src={image} />
  </div>
</div>  Your Profile</Link></li>
     {
     role==='admin' && <li><Link to='/dashbord/adminHome'><FontAwesomeIcon icon={faDashboard}/>Dashbord</Link></li>
     }
      <div className="divider divider-white">OR</div>
      <div className="dropdown">
  <div tabIndex={0} role="button" className="btn bg-amber-300  hover:bg-amber-300  text-black"><FontAwesomeIcon icon={faBars}/> More</div>
  <div tabIndex={0} className="dropdown-content z-[1] menu p-0  mt-2 text-white rounded-box w-[140px]">
{
 email?<><button onClick={handelLogOut} className='btn bg-amber-300  hover:bg-amber-300 text-black'><FontAwesomeIcon icon={faArrowLeft}/> LogOut</button></>: <Link to='/login'><button className='btn bg-amber-300  hover:bg-amber-300  text-white'><p className='flex items-center gap-3'><FontAwesomeIcon icon={faArrowLeft}/> <span>Login</span></p></button></Link>
}
<Link to='/report'><button className='btn bg-amber-300  hover:bg-amber-300  text-black mt-2 '><p className='flex items-center gap-2'><FontAwesomeIcon icon={faBug}/> <span>Report a Problem</span></p></button></Link>
  </div>
</div>
    </ul>
  
  </div>
</div>
        </div>
    );
};

export default Layouts;