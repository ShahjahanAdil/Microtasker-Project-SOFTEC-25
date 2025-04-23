import React, { useEffect, useState } from 'react'
import './taskDet.css'
import { useParams } from 'react-router-dom'
import { AiFillInfoCircle, AiOutlineDashboard, AiOutlineInsertRowAbove, AiOutlineNotification } from 'react-icons/ai'
import { useAuthContext } from '../../../contexts/AuthContext'
import axios from 'axios'
import PublicTaskDetsLoader from '../../../components/PublicTaskDetsLoader'

export default function PublicTaskDetail() {

    const { taskID } = useParams()
    const { user } = useAuthContext()
    const [task, setTask] = useState({})
    const [loading, setLoading] = useState(true)
    const [acceptLoading, setAcceptLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/user/public-tasks/taskID/${taskID}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setTask(data?.taskDetails)
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                if (err.response.status === 401) {
                    return window.toastify(err.response.data.message, "error")
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const handleAcceptTask = () => {
        const { adminID, adminEmail, adminName, taskID, taskTitle, taskDescription, taskPoints, taskPrice, taskStatus, taskMode } = task

        const acceptedTask = {
            userID: user?.userID,
            userEmail: user?.email,
            adminID,
            adminEmail,
            adminName,
            taskID,
            taskTitle,
            taskDescription,
            taskPoints,
            taskPrice,
            taskStatus,
            taskMode
        }

        setAcceptLoading(true)
        axios.post(`${import.meta.env.VITE_HOST}/user/public-tasks/get-task`, acceptedTask)
            .then(res => {
                const { data } = res
                window.toastify(data.message, "success")
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                window.toastify(err.response.data.message, "info")
            })
            .finally(() => {
                setAcceptLoading(false)
            })
    }

    const date = task?.createdAt?.slice(0, 10)
    const time = task?.createdAt?.slice(11, 16)
    const datetime = date + " " + time

    return (
        <div className='dashboard-container'>
            <div className="inner-container">

                {/* banner */}
                <div className='p-3 rounded-[5px]'>
                    <h6 className='font-bold text-[20px] text-[#333] flex items-center gap-2'>
                        <p className='flex items-center gap-2'>
                            <span className='text-[22px] flex items-center gap-2'><AiOutlineDashboard />Dashboard</span>
                            <span className='text-[18px] font-normal text-[#666]'>/ Task Detail</span>
                        </p>
                    </h6>
                </div>

                <div className='flex items-center justify-center'>
                    <p className='bg-blue-100 border-2 border-blue-200 px-3 py-2 rounded-[5px] flex gap-2 items-center'><AiOutlineNotification /> Read task carefully before accepting it</p>
                </div>

                {
                    loading ?
                        <PublicTaskDetsLoader />
                        :
                        <div className='flex gap-20 mt-10 px-10'>
                            <div className='flex-1'>
                                <h1 className='!text-[30px] !text-[#333] font-bold mb-8 border-b-2 border-gray-200 pb-2'>{task?.taskTitle}</h1>
                                <h3 className='!text-[20px] !text-[#333] font-bold mb-2'>Description:</h3>
                                <p className='!text-[18px] !text-[#666]'>{task?.taskDescription}</p>
                            </div>
                            <div>
                                <div className='flex justify-end'>
                                    <button className='flex items-center gap-2 px-3 py-1 mb-5 cursor-pointer text-white bg-[#5271ff] shadow-md rounded-[5px] transition-all duration-150 hover:bg-[#333]' disabled={acceptLoading} onClick={handleAcceptTask}>
                                        {
                                            !acceptLoading ?
                                                <>
                                                    Get Task <AiOutlineInsertRowAbove />
                                                </>
                                                :
                                                "Getting..."
                                        }
                                    </button>
                                </div>
                                <div className='shad w-[300px] p-5 rounded-[15px] bg-white border border-gray-200'>
                                    <p className='mb-3 pb-2 border-b-2 font-bold border-gray-200 !text-[18px] !text-[#5271ff] flex items-center gap-1'><AiFillInfoCircle className='text-[#5271ff]' /> Details:</p>
                                    <p className='!text-[16px] font-bold !text-[#666]'>Author Name: <span className='font-normal'>{task?.adminName}</span></p>
                                    <p className='!text-[16px] font-bold !text-[#666]'>Author Email: <span className='font-normal'>{task?.adminEmail}</span></p>
                                    <p className='!text-[16px] font-bold !text-[#666]'>Created At: <span className='font-normal'>{datetime}</span></p>
                                    <p className='!text-[16px] font-bold !text-[#666]'>Task Points: <span className='font-normal'>{task?.taskPoints}</span></p>
                                    <p className='!text-[16px] font-bold !text-[#666]'>Task Price: <span className='font-normal'>${task?.taskPrice}</span></p>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}