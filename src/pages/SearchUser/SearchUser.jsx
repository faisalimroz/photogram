import React, { useState } from 'react';
import { useGetUserQuery } from '../../features/AuthSlice/authApi';
import Loading from '../../Components/loading/Loading';
import User from '../../Components/User/User';

const SearchUser = () => {
    const [searchUser, setUser] = useState('');
    const {data,isLoading,isSuccess}=useGetUserQuery(searchUser||'')
    const users=data?.data
  
    return (
        <div>
         
<div className="mb-3">
  <form className="relative mb-4 flex flex-col mt-3 w-[50%]  items-center">
    <input
      type="search"
      className="relative px-3 py-2  block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding  text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
      placeholder="Search"
      aria-label="Search"
      id="Search"
      value={searchUser}
      onChange={(e)=>setUser(e.target.value)}
      aria-describedby="button-addon1" />
  </form>
</div>

<div className=' lg:px-3 grid lg:grid-cols-3 gap-3 items-center'>
    {
        users?.map(user=><><User key={user._id} user={user}></User></>)
    }
</div>
    
        </div>
    );
};

export default SearchUser;