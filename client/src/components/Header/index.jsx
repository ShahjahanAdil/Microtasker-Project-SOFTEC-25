import React, { useState } from 'react'
import './header.css'
import logo from '../../assets/images/microtasker-logo.png'
import { Link } from 'react-router-dom'
import { GoHome, GoInfo } from "react-icons/go";
import { CgDollar, CgLogIn } from "react-icons/cg";
import { GrUserAdmin } from "react-icons/gr";
import { AiOutlineDashboard, AiOutlineUserAdd } from "react-icons/ai";
import { IoIosMenu } from "react-icons/io";
import { FaHeadphones, FaX } from "react-icons/fa6";
import { useAuthContext } from '../../contexts/AuthContext';

export default function Header() {

    const { isAuthenticated, user } = useAuthContext()
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className='header-main p-5 relative'>
            <div className="header flex justify-between items-center px-[50px] py-[10px] rounded-4xl">
                <div className="h-left">
                    <img src={logo} alt="logo" />
                </div>
                <div className="h-right">
                    <ul className='flex items-center gap-5'>
                        <li><Link to='/home' className='link flex gap-1 items-center transition-all duration-200 ease-linear hover:!text-[#5271ff]'><GoHome />Home</Link></li>
                        <li><Link to='/policies' className='link flex gap-1 items-center transition-all duration-200 ease-linear hover:!text-[#5271ff]'><GoInfo /> Policies</Link></li>
                        <li><Link to='/payouts' className='link flex gap-1 items-center transition-all duration-200 ease-linear hover:!text-[#5271ff]'><CgDollar /> Payouts</Link></li>
                        <li><Link to='/contact' className='link flex gap-1 items-center transition-all duration-200 ease-linear hover:!text-[#5271ff]'><FaHeadphones /> Contact</Link></li>
                        {
                            isAuthenticated && user.roles.find(role => role.toLowerCase().includes("admin")) &&
                            <li><Link to="/admin/dashboard" className='link flex gap-1 items-center transition-all duration-200 ease-linear hover:!text-[#5271ff]'><GrUserAdmin /> Admin</Link></li>
                        }
                        {
                            !isAuthenticated ?
                                <>
                                    <li><Link to='/auth/signup' className='link flex gap-1 items-center signup-btn'>Signup <AiOutlineUserAdd /></Link></li>
                                    <li><Link to='/auth/login' className='link flex gap-1 items-center login-btn'>Login <CgLogIn /></Link></li>
                                </> :
                                <li><Link to="/user/dashboard" className='link flex items-center gap-1 signup-btn'><AiOutlineDashboard /> Dashboard</Link></li>
                        }
                        <li><IoIosMenu className='h-icon text-[#333] text-[30px]' onClick={() => setSidebarOpen(true)} /></li>
                    </ul>
                </div>
            </div>

            <div className={`sidebar-header ${sidebarOpen ? 'sidebar-open' : 'sidebar-close'}`}>
                <div className='flex justify-end'><FaX className='text-[18px] text-[#333]' onClick={() => setSidebarOpen(false)} /></div>
                <ul className='flex flex-col gap-5 mt-10' onClick={() => setSidebarOpen(false)}>
                    <li><Link to='/home' className='flex gap-1 items-center font-bold'><GoHome />Home</Link></li>
                    <li><Link to='/policies' className='flex gap-1 items-center font-bold'><GoInfo /> Policies</Link></li>
                    <li><Link to='/payouts' className='flex gap-1 items-center font-bold'><CgDollar /> Payouts</Link></li>
                    <li><Link to='/contact' className='flex gap-1 items-center font-bold'><FaHeadphones /> Contact</Link></li>
                    {
                        isAuthenticated && user.roles.find(role => role.toLowerCase().includes("admin")) &&
                        <li><Link to="/admin/dashboard" className='flex gap-1 items-center font-bold'><GrUserAdmin /> Admin</Link></li>
                    }
                    {
                        !isAuthenticated ?
                            <>
                                <li><Link to='/auth/signup' className='flex gap-1 items-center w-fit signup-btn'>Signup <AiOutlineUserAdd /></Link></li>
                                <li><Link to='/auth/login' className='flex gap-1 items-center w-fit login-btn'>Login <CgLogIn /></Link></li>
                            </> :
                            <li><Link to="/user/dashboard" className='flex items-center gap-1 w-fit signup-btn'><AiOutlineDashboard /> Dashboard</Link></li>
                    }
                </ul>
            </div>
        </div>
    )
}