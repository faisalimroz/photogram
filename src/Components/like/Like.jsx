import React from 'react';

const Like = ({like}) => {
 
    return (
        <div>
           {
             like.userDetils.map(user=><>
             
             <div class="max-w-sm mx-auto py-2">
    <div class="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-200">
        <div class="flex items-center">
            <img class="rounded-full h-10 w-10" src={user.image}/>
            <div class="ml-2 flex flex-col">
                <div class="leading-snug text-sm text-gray-900 font-bold">{user.name}</div>
            </div>
        </div>
    </div>
    </div>
             </>)
           } 
        </div>
    );
};

export default Like;