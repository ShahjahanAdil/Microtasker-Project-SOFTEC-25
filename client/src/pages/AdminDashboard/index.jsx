import React, { useState } from 'react'
import './aDash.css'
import { Link, Route, Routes } from 'react-router-dom'
import Main from './Main'
import AdminHeader from '../../components/AdminHeader'
import { AiOutlineDashboard } from 'react-icons/ai'
import { GrNotification } from 'react-icons/gr'
import { FiPlusCircle } from 'react-icons/fi'
import { LuDollarSign, } from 'react-icons/lu'
import { PiPaperPlaneTilt, PiStack, PiStackDuotone, PiStackOverflowLogo } from 'react-icons/pi'
import { FaArrowRight } from 'react-icons/fa6'
import CreateTask from './CreateTask'
import TasksCreated from './TasksCreated'
import AssignTask from './AssignTask'
import TasksAssigned from './TasksAssigned'
import SubmittedTasks from './SubmittedTasks'
import Notifications from './Notifications'
import Payments from './Payments'
import AssignTaskDets from './AssignTaskDets'
import SubmittedTasksDets from './SubmittedTasksDets'

export default function AdminDashboard() {

    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <AdminHeader />

            <div className='flex'>
                <div className='icons-sidebar w-[80px] border-r-2 border-gray-100'>
                    <ul className='flex flex-col items-center gap-6 mt-10'>
                        <li><Link to='/admin/dashboard' className='side-icons text-[18px]'><AiOutlineDashboard /></Link></li>
                        <li><Link to='/admin/create-task' className='side-icons text-[18px]'><FiPlusCircle /></Link></li>
                        <li><Link to='/admin/tasks-created' className='side-icons text-[18px]'><PiStackDuotone /></Link></li>
                        <li><Link to='/admin/assign-task' className='side-icons text-[18px]'><PiPaperPlaneTilt /></Link></li>
                        <li><Link to='/admin/tasks-assigned' className='side-icons text-[18px]'><PiStack /></Link></li>
                        <li><Link to='/admin/submitted-tasks' className='side-icons text-[18px]'><PiStackOverflowLogo /></Link></li>
                        <li><Link to='/admin/notifications' className='side-icons text-[18px]'><GrNotification /></Link></li>
                        <li><Link to='/admin/payments' className='side-icons text-[18px]'><LuDollarSign /></Link></li>
                    </ul>

                    <div className={`sidebar h-[100%] border-r-2 border-gray-100 ${sidebarOpen && 'sidebar-open'}`}>
                        <ul className='flex flex-col pl-10 gap-6 mt-10'>
                            <li><p className='sidebar-text leading-none'><Link className='sidebar-link' to='/admin/dashboard'>Admin Panel</Link></p></li>
                            <li><p className='sidebar-text leading-none'><Link className='sidebar-link' to='/admin/create-task'>Create Task</Link></p></li>
                            <li><p className='sidebar-text leading-none'><Link className='sidebar-link' to='/admin/tasks-created'>Tasks Created</Link></p></li>
                            <li><p className='sidebar-text leading-none'><Link className='sidebar-link' to='/admin/assign-task'>Assign Task</Link></p></li>
                            <li><p className='sidebar-text leading-none'><Link className='sidebar-link' to='/admin/tasks-assigned'>Tasks Assigned</Link></p></li>
                            <li><p className='sidebar-text leading-none'><Link className='sidebar-link' to='/admin/submitted-tasks'>Submitted Tasks</Link></p></li>
                            <li><p className='sidebar-text leading-none'><Link className='sidebar-link' to='/admin/notifications'>Notifications</Link></p></li>
                            <li><p className='sidebar-text leading-none'><Link className='sidebar-link' to='/admin/payments'>Withdraw Requests</Link></p></li>
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
                        <Route path='create-task' element={<CreateTask />} />
                        <Route path='tasks-created' element={<TasksCreated />} />
                        <Route path='assign-task' element={<AssignTask />} />
                        <Route path='assign-task/:userID' element={<AssignTaskDets />} />
                        <Route path='tasks-assigned' element={<TasksAssigned />} />
                        <Route path='submitted-tasks' element={<SubmittedTasks />} />
                        <Route path='submitted-tasks/:taskID' element={<SubmittedTasksDets />} />
                        <Route path='notifications' element={<Notifications />} />
                        <Route path='payments' element={<Payments />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}