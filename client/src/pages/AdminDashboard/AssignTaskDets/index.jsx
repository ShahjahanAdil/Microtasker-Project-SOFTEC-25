import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AiOutlineDashboard } from 'react-icons/ai';
import { FiInfo } from 'react-icons/fi';
import { useAuthContext } from '../../../contexts/AuthContext';
import Loader from '../../../components/Loader';
import axios from 'axios';

const initialState = { taskTitle: "", taskDescription: "", taskPrice: "", taskPoints: "" }
const generateRandomID = () => Math.random().toString(36).slice(5)

export default function AssignTaskDets() {

    const { userID } = useParams()
    const { user } = useAuthContext()
    const [state, setState] = useState(initialState)
    const [fetchedUser, setFetchedUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [assignLoading, setAssignLoading] = useState(false)

    useEffect(() => {
        if (user.userID) {
            fetchUser()
        }
    }, [user])

    const fetchUser = async () => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/admin/assign-task/${userID}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setFetchedUser(data?.user || {})
                }
            })
            .catch(err => {
                const { status, data } = err.response
                if (status === 404) {
                    return window.toastify(data.message || "User not found", "error")
                } else {
                    console.error("Error fetching user:", err.message)
                    return window.toastify("An unexpected error occurred. Please try again.", "error")
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleAssignTask = async () => {
        const { taskTitle, taskDescription, taskPrice, taskPoints } = state
        if (!taskTitle || !taskDescription || !taskPrice || !taskPoints) {
            return window.toastify("Please fill all fields!", "info")
        }

        const privateTask = {
            userID: fetchedUser?.userID,
            userEmail: fetchedUser?.email,
            adminID: user?.userID,
            adminName: user?.username,
            adminEmail: user?.email,
            taskID: generateRandomID(),
            taskTitle,
            taskDescription,
            taskPrice,
            taskPoints,
            taskStatus: "pending",
            taskMode: "private"
        }

        const notification = {
            recipient: fetchedUser?.userID,
            content: "You got a new task from admin",
            status: "unread"
        }

        setAssignLoading(true)
        await axios.post(`${import.meta.env.VITE_HOST}/admin/assign-task`, { privateTask, notification })
            .then(res => {
                const { status, data } = res
                if (status === 201) {
                    window.toastify(data.message, "success")
                    setState(initialState)
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                window.toastify("Something went wrong while assigning task to use. Please try again!", "error")
            })
            .finally(() => {
                setAssignLoading(false)
            })
    }

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
                            <span className='text-[22px]'><AiOutlineDashboard /></span> Dashboard
                            <span className='text-[18px] font-normal text-[#666]'>/ Assign Task</span>
                        </p>
                    </h6>
                </div>

                <div className='flex flex-col justify-center items-center my-10'>
                    <div className='w-full max-w-[650px] min-h-[350px] bg-white rounded-[15px] p-[30px] shadow-lg'>
                        <h5 className='font-bold text-[20px] !text-[#5271ff]'>Assign Private Task</h5>
                        <p className='mt-2 mb-8 font-bold !text-[#666] !text-[16px] flex items-center gap-1'><FiInfo /> The task will be assigned to the selected user</p>
                        <p className='mb-8 text-[16px] text-center bg-yellow-100 p-[10px] rounded-[8px] border-2 border-yellow-200'><span className='font-bold text-[#666]'>Assigning to:</span> {userID}</p>
                        <div>
                            <label className='font-bold text-[#666]' htmlFor="taskTitle">Title:</label>
                            <input type="text" name="taskTitle" id="taskTitle" value={state.taskTitle} placeholder='Enter title' className='w-full p-[10px] text-[#666] border-2 border-[#e8e8e8] rounded-[5px] mt-2 mb-4' onChange={handleChange} />
                        </div>
                        <div>
                            <label className='font-bold text-[#666]' htmlFor="taskDescription">Description:</label>
                            <textarea name="taskDescription" id="taskDescription" value={state.taskDescription} placeholder='Enter description (max 1500 alphabets)' maxLength={1500} rows={10} className='w-full p-[10px] text-[#666] border-2 border-[#e8e8e8] rounded-[5px] mt-2 mb-4 resize-none' onChange={handleChange}></textarea>
                        </div>
                        <div className='flex gap-5'>
                            <div className='flex-1'>
                                <label className='font-bold text-[#666]' htmlFor="taskPoints">Points:</label>
                                <input type="text" name="taskPoints" id="taskPoints" value={state.taskPoints} placeholder='Enter points' className='w-full p-[10px] text-[#666] border-2 border-[#e8e8e8] rounded-[5px] mt-2 mb-4' onChange={handleChange} />
                            </div>
                            <div className='flex-1'>
                                <label className='font-bold text-[#666]' htmlFor="taskPrice">Price:</label>
                                <input type="text" name="taskPrice" id="taskPrice" value={state.taskPrice} placeholder='Enter price' className='w-full p-[10px] text-[#666] border-2 border-[#e8e8e8] rounded-[5px] mt-2 mb-4' onChange={handleChange} />
                            </div>
                        </div>
                        <button className='w-full mt-8 p-3 bg-[#6c5ce7] text-white rounded-[8px] cursor-pointer shadow-md transition-all !duration-150 hover:!bg-[#666]' disabled={assignLoading} onClick={handleAssignTask} >
                            {
                                !assignLoading ?
                                    "Assign"
                                    :
                                    "Assigning Task..."
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}