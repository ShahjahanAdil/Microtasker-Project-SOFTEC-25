import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import Frontend from './Frontend'
import Auth from './Auth'
import { useAuthContext } from '../contexts/AuthContext'
import PrivateRoute from '../components/PrivateRoute'
import UserDashboard from './UserDashboard'
import AdminDashboard from './AdminDashboard'

export default function Index() {

    const { isAuthenticated } = useAuthContext()

    return (
        <>
            <Routes>
                <Route path='/*' element={<Frontend />} />
                <Route path='/auth/*' element={!isAuthenticated ? <Auth /> : <Navigate to='/' />} />
                <Route path='/user/*' element={<PrivateRoute Component={UserDashboard} allowedRoles={['admin', 'user']} />} />
                <Route path='/admin/*' element={<PrivateRoute Component={AdminDashboard} allowedRoles={['admin']} />} />
            </Routes>
        </>
    )
}