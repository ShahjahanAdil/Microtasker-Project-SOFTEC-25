import React, { useEffect, useState } from 'react'
import './yourTasks.css'
import { AiOutlineDashboard, AiOutlineInfoCircle } from 'react-icons/ai'
import { LuClock, LuInfo, LuTrash, LuTrophy } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../contexts/AuthContext'
import axios from 'axios'
import YourTasksLoader from '../../../components/YourTasksLoader'

export default function YourTasks() {

    const { user } = useAuthContext()
    const navigate = useNavigate()

    const [yourTasks, setYourTasks] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [openModel, setOpenModel] = useState(false)
    const [delTaskID, setDelTaskID] = useState("")
    const [loading, setLoading] = useState(true)
    const [delLoading, setDelLoading] = useState(false)

    useEffect(() => {
        if (user.email) {
            fetchTasks()
        }
    }, [user, page])

    const fetchTasks = () => {
        setLoading(true)
        const url = `${import.meta.env.VITE_HOST}/user/your-tasks?userID=${user?.userID}&page=${page}`

        axios.get(url)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setYourTasks(data?.yourTasks)
                    setTotalPages(Math.ceil(data?.totalTasks / 10))
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleDelete = (taskID) => {
        setOpenModel(true)
        setDelTaskID(taskID)
    }

    const handleDeleteTask = () => {
        setDelLoading(true)
        axios.delete(`${import.meta.env.VITE_HOST}/user/your-tasks/delete?userID=${user?.userID}&taskID=${delTaskID}`)
            .then(res => {
                const { status, data } = res
                if (status === 203) {
                    window.toastify(data.message, "success")
                    const updatedYourTasks = yourTasks.filter(task => task.taskID !== delTaskID)
                    setYourTasks(updatedYourTasks)
                    setDelTaskID("")
                    setOpenModel(false)
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                window.toastify(err.response.data.message, "error")
            })
            .finally(() => {
                setDelLoading(false)
            })
    }

    const renderPageNumbers = () => {
        const pages = []
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`px-3 py-1 rounded-[5px] cursor-pointer hover:!bg-[#666] hover:!text-white ${page === i ? 'bg-[#5271ff] text-white' : 'bg-[#e8e8e8] !text-[#666]'}`}
                    onClick={() => setPage(i)}
                >
                    {i}
                </button>
            )
        }
        return pages
    }

    return (
        <div className='dashboard-container'>
            <div className="inner-container">

                {/* banner */}
                <div className='p-3 rounded-[5px]'>
                    <h6 className='font-bold text-[20px] text-[#333] flex items-center gap-2'>
                        <p className='flex items-center gap-2'>
                            <span className='text-[22px] flex items-center gap-2'><AiOutlineDashboard />Dashboard</span>
                            <span className='text-[18px] font-normal text-[#666]'>/ Your Tasks</span>
                        </p>
                    </h6>
                </div>

                <div className="my-task-boxes mt-5 mb-10">
                    {
                        loading ?
                            <YourTasksLoader />
                            :
                            yourTasks.length > 0 ?
                                (
                                    yourTasks.map(task => {
                                        const { taskID, taskStatus, taskTitle, createdAt, taskPoints, taskPrice } = task
                                        const date = createdAt.slice(0, 10)
                                        const time = createdAt.slice(11, 16)
                                        const datetime = date + " " + time
                                        return (
                                            <div key={taskID} className="my-task-box border border-gray-100">
                                                <div className='flex flex-col h-full justify-between p-[15px]'>
                                                    <div className='flex justify-between px-2 pb-2 border-b-3 border-neutral-100'>
                                                        <p className='text-[13px] font-bold flex items-center gap-2'><LuInfo /> Status: <span className='text-[#666] font-normal capitalize'>{taskStatus}</span></p>
                                                        <p className='text-[15px] !text-[#ef4444]' onClick={() => handleDelete(taskID)}><LuTrash className='cursor-pointer' /></p>
                                                    </div>
                                                    <div className='flex-1 pb-4'>
                                                        <Link to={`/user/your-tasks/${taskID}`} className='block word wrap font-bold px-2 !text-[#5271ff] text-[20px] mt-2 transition-all duration-200 ease-out hover:!text-[#666] hover:underline'>{taskTitle}</Link>
                                                    </div>
                                                    <div className='flex flex-col gap-1 px-2 bg-[#5280ff1e] p-2 rounded-[5px]'>
                                                        <p className='text-[13px] font-bold flex items-center gap-2'><LuClock /> Joined at: <span className='text-[#666] font-normal'>{datetime}</span></p>
                                                        <div className='flex justify-between'>
                                                            <p className='text-[13px] font-bold flex items-center gap-2'><LuTrophy /> Points: <span className='text-[#666] font-normal'>{taskPoints}</span></p>
                                                            <p className='text-[15px] font-bold'>Price: <span className='text-[#666] font-normal'>${taskPrice}</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                )
                                :
                                <div className='flex justify-center items-center w-full'>
                                    <p className='px-3 py-1 bg-red-200 border border-red-400 text-red-600 rounded-[5px]'>You have no task yet!</p>
                                </div>
                    }

                    <div className={`fixed w-full h-full top-0 left-0 flex justify-center items-center bg-[#1919192d] z-50
                                    transition-opacity duration-300 ease-in-out ${openModel ? "opacity-100 visible" : "opacity-0 invisible"}`}>

                        <div className={`bg-white p-[15px] rounded-[15px] shadow-lg transform transition-all duration-300 ease-in-out 
                                    ${openModel ? "scale-100" : "scale-95"}`}>

                            <p className='flex items-center gap-1 mb-3'>
                                <AiOutlineInfoCircle /> Are you sure you want to delete this task?
                            </p>
                            <div className='flex justify-end gap-2'>
                                <button
                                    className='bg-[#333] text-white px-3 cursor-pointer rounded-[8px] hover:!bg-[#666]'
                                    onClick={() => setOpenModel(false)}
                                >Cancel</button>
                                <button
                                    className='bg-red-500 text-white px-3 cursor-pointer rounded-[8px] hover:!bg-[#f97575]'
                                    onClick={handleDeleteTask}
                                >
                                    {!delLoading ? "Yes" : "Deleting..."}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    !loading &&
                    (
                        totalPages > 1 &&
                        <div className='flex flex-wrap my-5 items-center justify-center gap-1'>
                            {renderPageNumbers()}
                        </div>
                    )
                }

                {/* {
                    openModel && (
                        <div className="fixed w-full h-full top-0 left-0 flex justify-center items-center bg-[#1919192d] transition-opacity duration-300 ease-in-out z-50">
                            <div className={`bg-white p-[15px] rounded-[15px] shadow-lg transform transition-all duration-300 ease-in-out
                ${openModel ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                                <p className='flex items-center gap-1 mb-3'>
                                    <AiOutlineInfoCircle /> Are you sure you want to delete this task?
                                </p>
                                <div className='flex justify-end gap-2'>
                                    <button className='bg-[#333] text-white px-3 cursor-pointer rounded-[8px] hover:!bg-[#666]' onClick={() => setOpenModel(false)}>Cancel</button>
                                    <button className='bg-red-500 text-white px-3 cursor-pointer rounded-[8px] hover:!bg-[#f97575]' onClick={handleDeleteTask}>
                                        {!delLoading ? "Yes" : "Deleting..."}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                } */}
            </div>
        </div>
    )
}