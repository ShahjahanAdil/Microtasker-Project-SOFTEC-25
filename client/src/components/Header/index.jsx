import React from 'react'
import './header.css'
import logo from '../../assets/images/microtasker-logo.png'
import { Link } from 'react-router-dom'
import { GoHome, GoInfo } from "react-icons/go";
import { CgLogIn } from "react-icons/cg";
import { GrUserAdmin } from "react-icons/gr";
import { AiOutlineDashboard, AiOutlineUserAdd } from "react-icons/ai";
import { useAuthContext } from '../../contexts/AuthContext';

export default function Header() {

    const { isAuthenticated, user } = useAuthContext()

    return (
        <div className='p-5'>
            <div className="header flex justify-between items-center px-[50px] py-[10px] rounded-4xl">
                <div className="h-left">
                    <img src={logo} alt="logo" className='w-[200px]' />
                </div>
                <div className="h-right">
                    <ul className='flex items-center gap-5'>
                        <li><Link to='/home' className='link flex gap-1 items-center'><GoHome />Home</Link></li>
                        <li><Link to='/policies' className='link flex gap-1 items-center'><GoInfo /> Policies</Link></li>
                        {
                            isAuthenticated && user.roles.find(role => role.toLowerCase().includes("admin")) &&
                            <li><Link to="/admin/dashboard" className='link flex gap-1 items-center'><GrUserAdmin /> Admin</Link></li>
                        }
                        {
                            !isAuthenticated ?
                                <>
                                    <li><Link to='/auth/signup' className='link flex gap-1 items-center signup-btn'>Signup <AiOutlineUserAdd /></Link></li>
                                    <li><Link to='/auth/login' className='link flex gap-1 items-center login-btn'>Login <CgLogIn /></Link></li>
                                </> :
                                <li><Link to="/user/dashboard" className='link flex items-center gap-1 signup-btn'><AiOutlineDashboard /> Dashboard</Link></li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}