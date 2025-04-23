import React from 'react'
import './aHeader.css'
import logo from '../../assets/images/microtasker-logo.png'
import { useAuthContext } from '../../contexts/AuthContext';
import { RiUser6Line } from "react-icons/ri";
import { FiBell, FiPower } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

export default function AdminHeader() {

    const { user, handleLogout } = useAuthContext()
    const navigate = useNavigate()

    return (
        <div className='a-header flex justify-between items-center px-[50px] py-[15px]'>
            <div className='uh-left'>
                <img src={logo} alt="logo" className='w-[180px] cursor-pointer' onClick={() => navigate("/")} />
            </div>
            <div className='uh-right'>
                <ul className='flex items-center gap-5'>
                    <li className='text-[18px] text-[#666]'><span><FiBell /></span></li>
                    <li>
                        <span className='flex gap-2 items-center text-[18px] text-[#666] cursor-default'><RiUser6Line /> Welcome! {user.username}</span>
                    </li>
                    <li>
                        <span><FiPower className='text-red-500 text-[18px] cursor-pointer' onClick={() => handleLogout()} /></span>
                    </li>
                </ul>
            </div>
        </div>
    )
}