import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const User = ({user}) => {
    const {user:{email}}=useSelector(state=>state.auth)
    return (
        <div className=' shadow-lg px-2'>
       <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src={user.image} alt="Neil image"/>
                    </div>
                    <div className="flex-1 min-w-0">
                     {
                       email === user.email ? <Link to={`/profile`}>  <p className="text-sm font-medium text-gray-900 truncate ">
                       {user.name}
                      </p></Link>:<><Link to={`/profile/${user._id}`}>  <p className="text-sm font-medium text-gray-900 truncate ">
                         {user.name}
                        </p></Link></>
                     }
                    </div>
                </div>
            </li>
            </ul>
        </div>
    );
};

export default User;