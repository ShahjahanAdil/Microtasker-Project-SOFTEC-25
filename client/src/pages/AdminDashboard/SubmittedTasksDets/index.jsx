import React, { useEffect, useState } from 'react'
import { AiFillInfoCircle, AiOutlineDashboard } from 'react-icons/ai'
import { FaUserCheck } from 'react-icons/fa6'
import { FiCloud } from 'react-icons/fi'
import { GrGithub } from 'react-icons/gr'
import { LuLink } from 'react-icons/lu'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../../../contexts/AuthContext'
import axios from 'axios'
import SubmittedTaskLoader from '../../../components/SubmittedTaskLoader'

export default function SubmittedTasksDets() {

    const { taskID } = useParams()
    const { user } = useAuthContext()
    const [task, setTask] = useState({})
    const [loading, setLoading] = useState(true)
    const [acceptLoading, setAcceptLoading] = useState(false)
    const [rejectLoading, setRejectLoading] = useState(false)

    useEffect(() => {
        if (user.userID) {
            fetchTask()
        }
    }, [user])

    const fetchTask = () => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/admin/submitted-tasks/${taskID}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setTask(data.submittedTask || {})
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const { createdAt } = task
    const date = createdAt?.slice(0, 10)
    const time = createdAt?.slice(11, 16)
    const datetime = date + " " + time

    const handleAcceptTask = () => {
        const updatedTask = { ...task, taskStatus: "completed" }

        setAcceptLoading(true)
        axios.patch(`${import.meta.env.VITE_HOST}/admin/submitted-tasks/accept?taskID=${taskID}&userID=${updatedTask.userID}`, updatedTask)
            .then(res => {
                const { status, data } = res
                if (status === 202) {
                    setTask(updatedTask)
                    window.toastify(data.message, "success")
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                if (err.response.status === 401) {
                    window.toastify(err.response.data.message, "error")
                }
                else if (err.response.status === 500) {
                    window.toastify(err.response.data.message, "error")
                }
                else {
                    window.toastify("Something went wrong. Please try again!", "error")
                }
            })
            .finally(() => {
                setAcceptLoading(false)
            })
    }

    const handleRejectTask = () => {
        const updatedTask = { ...task, taskStatus: "rejected" }

        setRejectLoading(true)
        axios.patch(`${import.meta.env.VITE_HOST}/admin/submitted-tasks/reject?taskID=${taskID}`)
            .then(res => {
                const { status, data } = res
                if (status === 202) {
                    setTask(updatedTask)
                    window.toastify(data.message, "success")
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                if (err.response.status === 401) {
                    window.toastify(err.response.data.message, "error")
                }
                else {
                    window.toastify("Something went wrong. Please try again!", "error")
                }
            })
            .finally(() => {
                setRejectLoading(false)
            })
    }

    return (
        <div className='dashboard-container'>
            <div className="inner-container">

                {/* banner */}
                <div className='p-3 rounded-[5px]'>
                    <h6 className='font-bold text-[20px] text-[#333] flex items-center gap-2'>
                        <p className='flex items-center gap-2'>
                            <span className='text-[22px]'><AiOutlineDashboard /></span> Dashboard
                            <span className='text-[18px] font-normal text-[#666]'>/ Submitted Task Detail</span>
                        </p>
                    </h6>
                </div>

                <div className='mt-8 px-10 flex gap-20'>
                    {
                        loading ?
                            <SubmittedTaskLoader />
                            :
                            <>
                                <div className='flex-1'>
                                    <h1 className='!text-[30px] !text-[#333] font-bold mb-8 border-b-2 border-gray-200 pb-2'>{task.taskTitle}</h1>
                                    <h3 className='!text-[20px] !text-[#333] font-bold mb-2'>Description:</h3>
                                    <p className='!text-[18px] !text-[#666]'>{task.taskDescription}</p>
                                </div>
                                <div className='w-[400px] min-h-[300px] bg-white p-[20px] border border-gray-200 shadow-md rounded-[15px]'>
                                    <h2 className='!text-[20px] !text-[#5271ff] border-b-2 border-gray-200 mb-5 pb-1 flex items-center gap-2'><FaUserCheck /> User provided data:</h2>
                                    <p className='mt-3 font-bold !text-[#666] flex items-center gap-2'><FiCloud /> Website Link:</p>
                                    <a href={task.domainLink} target='_blank' className='!text-[#5271ff] indent-6 inline-block hover:underline'>
                                        {
                                            task.domainLink ? task.domainLink : "No link submitted"
                                        }
                                    </a>
                                    <p className='mt-3 font-bold !text-[#666] flex items-center gap-2'><GrGithub /> GitHub Repo Link:</p>
                                    <a href={task.githubLink} target='_blank' className='!text-[#5271ff] indent-6 inline-block hover:underline'>
                                        {
                                            task.githubLink ? task.githubLink : "No link submitted"
                                        }
                                    </a>
                                    <p className='mt-3 font-bold !text-[#666] flex items-center gap-2'><LuLink /> Extra Link:</p>
                                    <a href={task.extraLink} target='_blank' className='!text-[#5271ff] indent-6 inline-block hover:underline'>
                                        {
                                            task.extraLink ? task.extraLink : "No link submitted"
                                        }
                                    </a>

                                    <div className='bg-[#5272ff55] w-full py-3 px-5 mt-8 shadow-md  rounded-[15px]'>
                                        <p className='flex items-center gap-1 font-bold !text-[#5271ff] !text-[16px] mb-2 pb-1 border-b-2 border-gray-400'><AiFillInfoCircle /> Info</p>
                                        <p className='font-bold !text-[#666] !text-[15px]'>Submitted by: <span className='font-normal'>{task.userEmail}</span></p>
                                        <p className='font-bold !text-[#666] !text-[15px]'>Submitted on: <span className='font-normal'>{datetime}</span></p>
                                        <p className='font-bold !text-[#666] !text-[15px]'>Points: <span className='font-normal'>{task.taskPoints}</span></p>
                                        <p className='font-bold !text-[#666] !text-[15px]'>Price: <span className='font-normal'>${task.taskPrice}</span></p>
                                    </div>
                                    <div className='flex gap-2 mt-8'>
                                        <button className='flex-1 text-[#fff] bg-[#5271ff] px-3 py-2 rounded-[10px] cursor-pointer shadow-md transition-all !duration-200 hover:!bg-[#5272ffbc]' onClick={handleAcceptTask}>
                                            {
                                                !acceptLoading ?
                                                    "Accept" :
                                                    "Accepting..."
                                            }
                                        </button>
                                        <button className='flex-1 text-[#fff] bg-[#ef4444] px-3 py-2 rounded-[10px] cursor-pointer shadow-md transition-all !duration-200 hover:!bg-[#ef4444b8]' onClick={handleRejectTask}>
                                            {
                                                !rejectLoading ?
                                                    "Reject" :
                                                    "Rejecting..."
                                            }
                                        </button>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}