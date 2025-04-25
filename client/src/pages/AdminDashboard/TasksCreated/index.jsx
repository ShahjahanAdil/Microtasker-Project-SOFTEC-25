import React, { useEffect, useState } from 'react'
import { AiOutlineDashboard, AiOutlineInfoCircle } from 'react-icons/ai';
import { FaArrowRight } from 'react-icons/fa';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { useAuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import TableLoader from '../../../components/TableLoader';
import { Link } from 'react-router-dom';

export default function TasksCreated() {

    const { user } = useAuthContext()
    const [allPublicTasks, setAllPublicTasks] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [openModel, setOpenModel] = useState(false)
    const [openUpdateModel, setOpenUpdateModel] = useState(false)
    const [delTaskID, setDelTaskID] = useState("")
    const [updatingTask, setUpdatingTask] = useState({})
    const [loading, setLoading] = useState(true)
    const [delLoading, setDelLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)

    useEffect(() => {
        if (user?.email) {
            setLoading(true)
            axios.get(`${import.meta.env.VITE_HOST}/admin/tasks-created?page=${page}`)
                .then(res => {
                    const { status, data } = res
                    if (status === 200) {
                        setAllPublicTasks(data?.publicTasks)
                        setTotalPages(Math.ceil(data?.totalPublicTasks / 20))
                    }
                })
                .catch(err => {
                    console.error('Frontend POST error', err.message)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [user, page])

    const handleDelete = (taskID) => {
        setOpenModel(true)
        setDelTaskID(taskID)
    }

    const handleDeleteTask = () => {
        setUpdateLoading(true)
        axios.delete(`${import.meta.env.VITE_HOST}/admin/tasks-created/delete?taskID=${delTaskID}`)
            .then(res => {
                const { status, data } = res
                if (status === 203) {
                    window.toastify(data.message, "success")
                    const updatedPublicTasks = allPublicTasks.filter(task => task.taskID !== delTaskID)
                    setAllPublicTasks(updatedPublicTasks)
                    setDelTaskID("")
                    setOpenModel(false)
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                window.toastify(err.response.data.message, "error")
            })
            .finally(() => {
                setUpdateLoading(false)
            })
    }

    const handleUpdatingTaskChange = e => setUpdatingTask(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleUpdate = (task) => {
        setOpenUpdateModel(true)
        setUpdatingTask(task)
    }

    const handleUpdateTask = () => {
        setUpdateLoading(true)
        axios.patch(`${import.meta.env.VITE_HOST}/admin/tasks-created/update`, updatingTask)
            .then(res => {
                const { status, data } = res
                if (status === 202) {
                    window.toastify(data.message, "success")
                    const updatedPublicTasks = allPublicTasks.map(task => task.taskID === updatingTask.taskID ? updatingTask : task)
                    setAllPublicTasks(updatedPublicTasks)
                    setUpdatingTask({})
                    setOpenUpdateModel(false)
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                window.toastify(err.response.data.message, "error")
            })
            .finally(() => {
                setUpdateLoading(false)
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
                            <span className='text-[22px]'><AiOutlineDashboard /></span> Dashboard
                            <span className='text-[18px] font-normal text-[#666]'>/ Tasks Created</span>
                        </p>
                    </h6>
                </div>

                <div className="table-div flex flex-col mt-10 mb-15 border border-gray-200 rounded-[10px]">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden rounded-[10px]">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className='bg-[#5272ffa3]'>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">ID</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">Title</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">Description</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">Mode</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase whitespace-nowrap">Created At</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase whitespace-nowrap">Created By</th>
                                            <th scope="col" className="px-6 py-3 text-end text-[13px] font-bold text-[#fff] uppercase">Points</th>
                                            <th scope="col" className="px-6 py-3 text-end text-[13px] font-bold text-[#fff] uppercase">Price</th>
                                            <th scope="col" className="px-6 py-3 text-end text-[13px] font-bold text-[#fff] uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            loading ?
                                                <TableLoader />
                                                :
                                                (
                                                    allPublicTasks.length > 0 ?
                                                        allPublicTasks.map(task => {
                                                            const { taskID, taskTitle, taskDescription, taskMode, createdAt, adminEmail, taskPoints, taskPrice } = task
                                                            const date = createdAt.slice(0, 10)
                                                            const time = createdAt.slice(11, 16)
                                                            const datetime = date + " " + time
                                                            return (
                                                                <tr key={taskID} className="odd:bg-white even:bg-[#f3f6ff] hover:bg-[#f3f6ff]">
                                                                    <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>{taskID}</span></td>
                                                                    <td className="px-6 py-4 whitespace-normal text-[14px]  text-[#666]"><span className='text-ellipsis line-clamp-2'>{taskTitle}</span></td>
                                                                    <td className="px-6 py-4 whitespace-normal text-[14px]  text-[#666]"><span className='text-ellipsis line-clamp-2'>{taskDescription}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>{taskMode}</span></td>
                                                                    <td className="px-6 py-4 whitespace-normal text-[14px]  text-[#666]"><span>{datetime}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>{adminEmail}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-end text-[14px] text-[#666]"><span>{taskPoints}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-end text-[14px] text-[#666]"><span>${taskPrice}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-end text-[14px] text-[#666]">
                                                                        <div className='flex justify-end gap-3'>
                                                                            <FiEdit3 className='text-[#006de9] cursor-pointer hover:text-[#006de9c6]' onClick={() => handleUpdate(task)} />
                                                                            <FiTrash className='text-[#ef4444] cursor-pointer hover:!text-[#ef4444b5]' onClick={() => handleDelete(taskID)} />
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        :
                                                        <tr>
                                                            <td colSpan="9" className='px-3 py-5 text-center'>
                                                                <p>No public tasks created yet!</p>
                                                                <Link to="/admin/create-task" className='font-bold text-[#009de9] underline flex items-center justify-center gap-1'>Create task now <FaArrowRight /></Link>
                                                            </td>
                                                        </tr>
                                                )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

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

                <div className={`fixed w-full h-full top-0 left-0 flex justify-center items-center bg-[#1919192d] z-50
                                                    transition-opacity duration-300 ease-in-out ${openUpdateModel ? "opacity-100 visible" : "opacity-0 invisible"}`}>

                    <div className={`bg-white p-[20px] w-[500px] rounded-[15px] shadow-lg transform transition-all duration-300 ease-in-out 
                                                    ${openUpdateModel ? "scale-100" : "scale-95"}`}>

                        <p className='flex items-center gap-1 mb-3 font-bold !text-[#5271ff]'>
                            <AiOutlineInfoCircle /> Are you sure you want to update this task?
                        </p>

                        <div className='w-full mt-5'>
                            <div className='w-full'>
                                <label className='block text-[#333] font-bold'>Title:</label>
                                <input type="taskTitle" name="taskTitle" id="taskTitle" value={updatingTask?.taskTitle} className='mt-2 mb-3 px-3 py-1 bg-white shadow-sm border border-gray-200 text-[#666] rounded-[8px] w-full hover:border-[#5271ff] focus:ring-2 focus:ring-[#5271ff]/30 transition-all duration-200 outline-none'
                                    onChange={handleUpdatingTaskChange} />
                            </div>
                            <div className='w-full'>
                                <label className='block text-[#333] font-bold'>Description:</label>
                                <textarea name="taskDescription" id="taskDescription" rows="5" value={updatingTask?.taskDescription} className='mt-2 mb-3 px-3 py-1 bg-white shadow-sm border border-gray-200 text-[#666] rounded-[8px] w-full resize-none hover:border-[#5271ff] focus:ring-2 focus:ring-[#5271ff]/30 transition-all duration-200 outline-none'
                                    onChange={handleUpdatingTaskChange} ></textarea>
                            </div>
                            <div className='flex gap-5 mb-5 w-full'>
                                <div className='w-full'>
                                    <label className='block text-[#333] font-bold'>Points:</label>
                                    <input type="taskPoints" name="taskPoints" id="taskPoints" value={updatingTask?.taskPoints} className='mt-2 mb-3 px-3 py-1 bg-white shadow-sm border border-gray-200 text-[#666] rounded-[8px] w-full hover:border-[#5271ff] focus:ring-2 focus:ring-[#5271ff]/30 transition-all duration-200 outline-none'
                                        onChange={handleUpdatingTaskChange} />
                                </div>
                                <div className='w-full'>
                                    <label className='block text-[#333] font-bold'>Price:</label>
                                    <input type="taskPrice" name="taskPrice" id="taskPrice" value={updatingTask?.taskPrice} className='mt-2 mb-3 px-3 py-1 bg-white shadow-sm border border-gray-200 text-[#666] rounded-[8px] w-full hover:border-[#5271ff] focus:ring-2 focus:ring-[#5271ff]/30 transition-all duration-200 outline-none'
                                        onChange={handleUpdatingTaskChange} />
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-end gap-2'>
                            <button
                                className='bg-[#333] text-white px-3 cursor-pointer rounded-[8px] hover:!bg-[#666]'
                                onClick={() => setOpenUpdateModel(false)}
                            >Cancel</button>
                            <button
                                className='bg-[#5271ff] text-white px-3 cursor-pointer rounded-[8px] hover:!bg-[#5272ffb9]'
                                onClick={handleUpdateTask}
                            >
                                {!updateLoading ? "Update" : "Updating..."}
                            </button>
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
            </div>
        </div>
    )
}