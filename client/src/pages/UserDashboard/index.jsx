import React, { useState } from 'react'
import './uDash.css'
import { Link, Route, Routes } from 'react-router-dom'
import Main from './Main'
import UserHeader from '../../components/UserHeader'
import { FaArrowRight, FaUser, FaX } from 'react-icons/fa6';
import { FiCheck } from 'react-icons/fi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { GrNotification, GrTask, GrTasks } from 'react-icons/gr';
import { LuClock10, LuDollarSign } from 'react-icons/lu';
import PublicTasks from './PublicTasks'
import YourTasks from './YourTasks'
import CompletedTasks from './CompletedTasks'
import PendingTasks from './PendingTasks'
import FailedTasks from './FailedTasks'
import Notifications from './Notifications'
import Profile from './Profile'
import Payments from './Payments'
import PublicTaskDetail from './PublicTaskDetail'
import YourTaskDets from './YourTasks/yourTaskDets'

export default function UserDashboard() {

    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <UserHeader />

            <div className='flex'>
                <div className='icons-sidebar w-[80px] border-r-2 border-gray-100'>
                    <ul className='flex flex-col items-center gap-6 mt-10'>
                        <li><Link to='/user/dashboard' className='side-icons text-[18px]'><AiOutlineDashboard /></Link></li>
                        <li><Link to='/user/public-tasks' className='side-icons text-[18px]'><GrTasks /></Link></li>
                        <li><Link to='/user/your-tasks' className='side-icons text-[18px]'><GrTask /></Link></li>
                        <li><Link to='/user/completed-tasks' className='side-icons text-[18px]'><FiCheck /></Link></li>
                        <li><Link to='/user/pending-tasks' className='side-icons text-[18px]'><LuClock10 /></Link></li>
                        <li><Link to='/user/failed-tasks' className='side-icons text-[18px]'><FaX /></Link></li>
                        <li><Link to='/user/notifications' className='side-icons text-[18px]'><GrNotification /></Link></li>
                        <li><Link to='/user/profile' className='side-icons text-[18px]'><FaUser /></Link></li>
                        <li><Link to='/user/payments' className='side-icons text-[18px]'><LuDollarSign /></Link></li>
                    </ul>

                    <div className={`sidebar h-[100%] border-r-2 border-gray-100 ${sidebarOpen && 'sidebar-open'}`}>
                        <ul className='flex flex-col pl-10 gap-6 mt-10'>
                            <li><p className='sidebar-text leading-none'><Link className='sidebar-link' to='/user/dashboard'>Dashboard</Link></p></li>
                            <li><p className='sidebar-text leading-none'><Link className='sidebar-link' to='/user/public-tasks'>Public Tasks</Link></p></li>
                            <li><p className='sidebar-text leading-none'><Link className='sidebar-link' to='/user/your-tasks'>Your Tasks</Link></p></li>
                            <li><p className='sidebar-text leading-none'><Link className='sidebar-link' to='/user/completed-tasks'>Completed Tasks</Link></p></li>
                            <li><p className='sidebar-text leading-none'><Link className='sidebar-link' to='/user/pending-tasks'>Pending Tasks</Link></p></li>
                            <li><p className='sidebar-text leading-none'><Link className='sidebar-link' to='/user/failed-tasks'>Failed Tasks</Link></p></li>
                            <li><p className='sidebar-text leading-none'><Link className='sidebar-link' to='/user/notifications'>Notifications</Link></p></li>
                            <li><p className='sidebar-text leading-none'><Link className='sidebar-link' to='/user/profile'>Profile</Link></p></li>
                            <li><p className='sidebar-text leading-none'><Link className='sidebar-link' to='/user/payments'>Payments</Link></p></li>
                        </ul>
                    </div>

                    <span className={`absolute bottom-[30px] right-[-22px] text-[18px] bg-[#5271FF] text-[#fff] cursor-pointer p-3 rounded-full z-8 transition-all 0.2s ease-in ${sidebarOpen ? 'rotate-180' : 'rotate-0'}`}
                        onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <FaArrowRight />
                    </span>
                </div>

                <div className="ml-[80px] mt-[77.54px] w-full">
                    <Routes>
                        <Route index element={<Main />} />
                        <Route path='dashboard' element={<Main />} />
                        <Route path='public-tasks' element={<PublicTasks />} />
                        <Route path='public-tasks/:taskID' element={<PublicTaskDetail />} />
                        <Route path='your-tasks' element={<YourTasks />} />
                        <Route path='your-tasks/:taskID' element={<YourTaskDets />} />
                        <Route path='completed-tasks' element={<CompletedTasks />} />
                        <Route path='pending-tasks' element={<PendingTasks />} />
                        <Route path='failed-tasks' element={<FailedTasks />} />
                        <Route path='notifications' element={<Notifications />} />
                        <Route path='profile' element={<Profile />} />
                        <Route path='payments' element={<Payments />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}