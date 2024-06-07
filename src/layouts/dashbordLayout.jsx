import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

const DashbordLayout = () => {
    const {user:{email,name,image,role}}=useSelector(state=>state.auth)
    return (
        <div>
            <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
  <label htmlFor="my-drawer-2" className="btn btn-outline  drawer-button lg:hidden"><FontAwesomeIcon icon={faBars}/></label>
  <Outlet></Outlet>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-64 min-h-full  text-content text-white" style={{background:'radial-gradient(circle, rgba(66,43,247,1) 0%, rgba(67,144,235,1) 100%)'}}>
    <div className='mb-1 flex flex-col items-center'>
<div className="avatar">
  <div className=" w-20 rounded-full ring ring-info ring-offset-base-100 ring-offset-2">
    <img src={image} />
  </div>
</div>
  <div className='flex items-center gap-2 p-3'>
  <h2 className='text-xl'>{name} </h2>
  {role ==='admin' && <span className='border rounded-lg p-1'>{role}</span>}
  </div>
</div>
     
{
    role ==='admin'&& <>
    <li><Link to='/dashbord/adminHome'>Admin Home</Link></li>
    <li><Link to='/dashbord/postmanage'>Post Manage</Link></li>
    <li><Link>Feed Back</Link></li>
    <li><Link to='/dashbord/manageuser'>User Manage</Link></li>
    </>
}

<hr className='border'/>
<li><Link to='/'>Home</Link></li>
    </ul>
  
  </div>
</div>
        </div>
    );
};

export default DashbordLayout;