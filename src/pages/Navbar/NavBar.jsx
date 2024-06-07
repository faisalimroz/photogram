import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/icon/logo.png';
const NavBar = () => {
    const nav=<>
    <li><Link>Home</Link></li>
    <li><Link>Moderator List</Link></li>
    <li><Link>Contact Us</Link></li>
    </>
    return (
        <div>
            <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {
            nav
        }
      </ul>
    </div>
  <Link>
  <div className=' cursor-pointer flex items-center'>
   <img className='h-[50px]' src={logo} alt="" /> 
    <p className=" text-xl">Let's <span className='text-green-400'> Programming</span></p>
   </div>
  </Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    {
            nav
        }
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn bg-blue-500 hover:bg-blue-500 text-white">Login</a>
  </div>
</div>
        </div>
    );
};

export default NavBar;