import React, { useEffect, useState } from 'react'
import './main.css'
import { AiOutlineDashboard, AiOutlineNotification } from 'react-icons/ai'
import { GrTask, GrTasks } from 'react-icons/gr';
import { FiArrowUp, FiCheck } from 'react-icons/fi';
import { LuClock10 } from 'react-icons/lu';
import { FaX } from 'react-icons/fa6';
import { SlBadge } from "react-icons/sl";
import { IoPieChartOutline } from "react-icons/io5";
import { BsRecordCircle, BsTrophy } from "react-icons/bs";
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
    const [level, setLevel] = useState(0)
    const [successScore, setSuccessScore] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (isAuthenticated && user) {
            handleFetchData()

            const points = user?.points

            if (points === 0) {
                setLevel(0)
            } else if (points >= 50 && points <= 99) {
                setLevel(1)
            } else if (points >= 100 && points <= 149) {
                setLevel(2)
            } else if (points >= 150 && points <= 199) {
                setLevel(3)
            } else if (points >= 200 && points <= 249) {
                setLevel(4)
            } else {
                setLevel(5)
            }
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

    useEffect(() => {
        if (user?.userID) {
            const total = completedTasksCount + failedTasksCount

            if (total === 0) {
                setSuccessScore(0)
            } else {
                const score = (completedTasksCount / total) * 100
                setSuccessScore(score.toFixed(2))
            }
        }
    }, [user, completedTasksCount, failedTasksCount])

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
                    <div className="dashboard-box border border-gray-200">
                        <h6 className='text-[18px] flex gap-1 items-center'><GrTask /> Your Tasks</h6>
                        <div className='flex justify-between items-center'>
                            <p>{userTasksCount}</p>
                            <p className='flex gap-1 items-center] !text-[12px]'><FiArrowUp /> {todayDate + "/" + month}</p>
                        </div>
                    </div>
                    <div className="dashboard-box border border-gray-200">
                        <h6 className='text-[18px] flex gap-1 items-center'><FiCheck /> Completed Tasks</h6>
                        <div className='flex justify-between items-center'>
                            <p>{completedTasksCount}</p>
                            <p className='flex gap-1 items-center] !text-[12px]'><FiArrowUp /> {todayDate + "/" + month}</p>
                        </div>
                    </div>
                    <div className="dashboard-box border border-gray-200">
                        <h6 className='text-[18px] flex gap-1 items-center'><LuClock10 /> Pending Tasks</h6>
                        <div className='flex justify-between items-center'>
                            <p>{pendingTasksCount}</p>
                            <p className='flex gap-1 items-center] !text-[12px]'><FiArrowUp /> {todayDate + "/" + month}</p>
                        </div>
                    </div>
                    <div className="dashboard-box border border-gray-200">
                        <h6 className='text-[18px] flex gap-1 items-center'><FaX /> Failed Tasks</h6>
                        <div className='flex justify-between items-center'>
                            <p>{failedTasksCount}</p>
                            <p className='flex gap-1 items-center] !text-[12px]'><FiArrowUp /> {todayDate + "/" + month}</p>
                        </div>
                    </div>
                    <div className="dashboard-box border border-gray-200">
                        <h6 className='text-[18px] flex gap-1 items-center'><GrTasks /> Avaiable Tasks</h6>
                        <div className='flex justify-between items-center'>
                            <p>{publicTasksCount}</p>
                            <p className='flex gap-1 items-center] !text-[12px]'><FiArrowUp /> {todayDate + "/" + month}</p>
                        </div>
                    </div>
                </div>

                <div className='mt-12 mb-16'>
                    <h3 className='!text-[20px] font-bold flex gap-2 items-center'><BsRecordCircle /> Peformance</h3>
                    <p className='bg-yellow-100 px-2 py-1 border border-yellow-300 !text-yellow-500 rounded-[5px] w-fit mt-4 flex gap-2 items-center'><AiOutlineNotification /> Do more tasks to earn points and increase your level</p>
                    <div className='performance mt-5'>
                        <div className='box box-1 border border-gray-200 rounded-[15px] relative'>
                            <SlBadge className='text-[50px] text-[#333]' />
                            <p className='!text-[22px] font-bold mt-4'>Level</p>
                            <p className='!text-[24px] font-bold'>{level}</p>
                            <p className='flex gap-1 items-center] font-bold !text-[12px] absolute bottom-8 right-8'><FiArrowUp /> {todayDate + "/" + month}</p>
                        </div>
                        <div className='box box-2 border border-gray-200 rounded-[15px] relative'>
                            <BsTrophy className='text-[50px] text-[#333]' />
                            <p className='!text-[22px] font-bold mt-4'>Points</p>
                            <p className='!text-[24px] font-bold'>{user?.points}</p>
                            <p className='flex gap-1 items-center] font-bold !text-[12px] absolute bottom-8 right-8'><FiArrowUp /> {todayDate + "/" + month}</p>
                        </div>
                        <div className='box box-3 border border-gray-200 rounded-[15px] relative'>
                            <IoPieChartOutline className='text-[50px] text-[#333]' />
                            <p className='!text-[22px] font-bold mt-4'>Success Score</p>
                            <p className='!text-[24px] font-bold'>{successScore}%</p>
                            <p className='flex gap-1 items-center] font-bold !text-[12px] absolute bottom-8 right-8'><FiArrowUp /> {todayDate + "/" + month}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}