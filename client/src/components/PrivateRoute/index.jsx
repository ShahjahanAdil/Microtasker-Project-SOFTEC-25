import React from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { Link, Navigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";


export default function PrivateRoute({ Component, allowedRoles }) {

    const { user, isAuthenticated } = useAuthContext()

    if (!isAuthenticated) return <Navigate to='/auth/login' />

    if (user?.roles?.find(role => allowedRoles.includes(role))) return <Component />

    return (
        <div className='h-screen flex flex-col justify-center items-center gap-4'>
            <h1 className='text-center mt-5 w-[50%]'>You don't have permission to access this page.</h1>
            <div className='text-center mt-5'>
                <Link
                    to='/'
                    className='link px-5 py-2 flex gap-3 items-center rounded-[8px] bg-[#5271ff] decoration-0'
                    style={{ color: '#fff' }}
                >
                    <FaArrowLeftLong /> Go To Home
                </Link>
            </div>
        </div>
    )
}