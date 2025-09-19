import React  from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import {useAuth} from './AuthContext';

export default function RequireAuth(){

    const {user} = useAuth()
    const location = useLocation()

    if(!user) return <Navigate to='/login' state={{from: location}} replace/>
    return <Outlet></Outlet>
}