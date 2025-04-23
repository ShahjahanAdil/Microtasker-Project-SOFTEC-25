import React, { useEffect, useState } from 'react'
import './main.css'
import { AiOutlineDashboard } from 'react-icons/ai'
import { GrTask, GrTasks } from 'react-icons/gr';
import { FiArrowUp, FiCheck } from 'react-icons/fi';
import { LuClock10 } from 'react-icons/lu';
import { FaX } from 'react-icons/fa6';
import { useAuthContext } from '../../../contexts/AuthContext';
import Loader from '../../../components/Loader';
import axios from 'axios';

export default function Main() {

    const { isAuthenticated, user } = useAuthContext()
    const [userTasksCount, setUserTasksCount] = useState(0)
    const [completedTasksCount, setCompletedTasksCount] = useState(0)
    const [pendingTasksCount, setPendingTasksCount] = useState(0)
    const [failedTasksCount, setFailedTasksCount] = useState(0)
    const [publicTasksCount, setPublicTasksCount] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (isAuthenticated && user) {
            handleFetchData()
        }
    }, [isAuthenticated, user])

    const handleFetchData = () => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/user/dashboard?userID=${user?.userID}`)
            .then(res => {
                const { status, data } = res
                const { userTCount, completedTCount, pendingTCount, failedTCount, publicTCount } = data
                if (status === 200) {
                    setUserTasksCount(userTCount)
                    setCompletedTasksCount(completedTCount)
                    setPendingTasksCount(pendingTCount)
                    setFailedTasksCount(failedTCount)
                    setPublicTasksCount(publicTCount)
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const date = new Date()
    const todayDate = date.getDate()
    const month = date.getMonth()

    if (loading) {
        return <Loader />
    }

    return (
        <div className='dashboard-container'>
            <div className="inner-container">

                {/* banner */}
                <div className='p-3 rounded-[5px]'>
                    <h6 className='font-bold text-[20px] text-[#333] flex items-center gap-2'>
                        <p className='flex items-center gap-2'>
                            <span className='text-[22px] flex items-center gap-2'><AiOutlineDashboard />Dashboard</span>
                            <span className='text-[18px] font-normal text-[#666]'>/ Home</span>
                        </p>
                    </h6>
                </div>

                <div className="dashboard-boxes">
                    <div className="dashboard-box">
                        <h6 className='text-[18px] flex gap-1 items-center'><GrTask /> Your Tasks</h6>
                        <div className='flex justify-between items-center'>
                            <p>{userTasksCount}</p>
                            <p className='flex gap-1 items-center] !text-[12px]'><FiArrowUp /> {todayDate + "/" + month}</p>
                        </div>
                    </div>
                    <div className="dashboard-box">
                        <h6 className='text-[18px] flex gap-1 items-center'><FiCheck /> Completed Tasks</h6>
                        <div className='flex justify-between items-center'>
                            <p>{completedTasksCount}</p>
                            <p className='flex gap-1 items-center] !text-[12px]'><FiArrowUp /> {todayDate + "/" + month}</p>
                        </div>
                    </div>
                    <div className="dashboard-box">
                        <h6 className='text-[18px] flex gap-1 items-center'><LuClock10 /> Pending Tasks</h6>
                        <div className='flex justify-between items-center'>
                            <p>{pendingTasksCount}</p>
                            <p className='flex gap-1 items-center] !text-[12px]'><FiArrowUp /> {todayDate + "/" + month}</p>
                        </div>
                    </div>
                    <div className="dashboard-box">
                        <h6 className='text-[18px] flex gap-1 items-center'><FaX /> Failed Tasks</h6>
                        <div className='flex justify-between items-center'>
                            <p>{failedTasksCount}</p>
                            <p className='flex gap-1 items-center] !text-[12px]'><FiArrowUp /> {todayDate + "/" + month}</p>
                        </div>
                    </div>
                    <div className="dashboard-box">
                        <h6 className='text-[18px] flex gap-1 items-center'><GrTasks /> Avaiable Tasks</h6>
                        <div className='flex justify-between items-center'>
                            <p>{publicTasksCount}</p>
                            <p className='flex gap-1 items-center] !text-[12px]'><FiArrowUp /> {todayDate + "/" + month}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}