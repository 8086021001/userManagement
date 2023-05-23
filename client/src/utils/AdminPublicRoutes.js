import React from 'react'
import {useSelector} from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';


const AdminPublicRoutes = () => {

    const authState = useSelector((state) => {

        return state.adminauth.AdminauthState;
    })
    return(! authState ? <Outlet/>: <Navigate to={'/adminIn/dashboard'}/>)

}

export default AdminPublicRoutes
