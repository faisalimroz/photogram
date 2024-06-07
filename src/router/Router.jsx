import { createBrowserRouter } from "react-router-dom";
import Layouts from "../layouts/Layouts";
import Home from "../pages/Home/Home";
import SingUp from "../pages/Login/SingUp";
import Login from "../pages/Login/Login";
import Report from "../pages/Report/Report";
import PrivateRoute from "../private/PrivateRoute";
import CreatePost from "../pages/post/CreatePost";
import Profile from "../pages/Profile/Profile";
import UpdateUserProfile from "../pages/updateUser/UpdateUserProfile";
import SeeFullPost from "../pages/SeeFullPost/SeeFullPost";
import SeeLikes from "../pages/SeeLikes/SeeLikes";
import ErrorPage from "../Components/404Page/ErrorPage";
import SearchUser from "../pages/SearchUser/SearchUser";
import SeeUser from "../pages/SeeUser/SeeUser";
import DashbordLayout from "../layouts/dashbordLayout";
import ProctectDashbord from "../private/ProctectDashbord";
import AdminHome from "../pages/Dashbord/Admin/AdminHome";
import PostManage from "../pages/Dashbord/Admin/PostManage";
import Action from "../pages/Dashbord/Admin/Action";
import ManageUser from "../pages/Dashbord/Admin/ManageUser";

export const router=createBrowserRouter([
    {
        path: "/",
        element:<PrivateRoute><Layouts></Layouts></PrivateRoute>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/report',
                element:<Report/>
            },
            {
                path:'/profile',
                element:<Profile/>
            },
            {
                path:'/createpost',
                element:<CreatePost/>
            },
            {
                path:'/search',
                element:<SearchUser/>
            },
            {
                path:'/likes/:id',
                element:<SeeLikes/>,
                loader:({params})=>fetch(`https://social-server-blond.vercel.app/api/v1/post/${params.id}`)
            },
            {
                path:'/updateprofile/:id',
                element:<UpdateUserProfile/>,
                loader:({params})=>fetch(`https://social-server-blond.vercel.app/api/v1/users/${params.id}`)
            },
            {
                path:'/profile/:id',
                element:<SeeUser/>,
                loader:({params})=>fetch(`https://social-server-blond.vercel.app/api/v1/users/${params.id}`)
            },
            {
                path:'/seepost/:id',
                element:<SeeFullPost/>,
                loader:({params})=>fetch(`https://social-server-blond.vercel.app/api/v1/post/${params.id}`)
            }, 
        ]
    },{
     path:'dashbord',
     element:<ProctectDashbord><DashbordLayout/></ProctectDashbord>,
     children:[
        {
            path:'adminHome',
            element:<ProctectDashbord><AdminHome/></ProctectDashbord>
        },
        {
            path:'postmanage',
            element:<ProctectDashbord><PostManage/></ProctectDashbord>
        },
        {
            path:'manageuser',
            element:<ProctectDashbord><ManageUser/></ProctectDashbord>
        },
        {
            path:'action/:id',
            element:<ProctectDashbord><Action/></ProctectDashbord>,
            loader:({params})=>fetch(`https://social-server-blond.vercel.app/api/v1/post/${params.id}`)
        },
     ]
    }
    ,{
     path:'singup',
     element:<SingUp/>
    }
    ,{
     path:'login',
     element:<Login/>
    },
    {
        path:'*',
        element:<ErrorPage/>,
        
    },
])