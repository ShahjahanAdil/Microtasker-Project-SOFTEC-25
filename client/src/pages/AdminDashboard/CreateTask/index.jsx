import React, { useState } from 'react'
import { AiOutlineDashboard } from 'react-icons/ai';
import { FiInfo } from 'react-icons/fi'
import { useAuthContext } from '../../../contexts/AuthContext';
import axios from 'axios'

const initialState = { taskTitle: "", taskDescription: "", taskPrice: 0, taskPoints: 0 }
const generateRandomID = () => Math.random().toString(36).slice(5)

export default function CreateTask() {

    const { user } = useAuthContext()
    const [state, setState] = useState(initialState)
    const [loading, setLoading] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleCreateTask = async () => {
        const { taskTitle, taskDescription, taskPrice, taskPoints } = state
        if (!taskTitle || !taskDescription || !taskPrice || !taskPoints) {
            return window.toastify("Please fill all fields", "warning")
        }

        const newTask = {
            adminID: user?.userID,
            adminName: user?.username,
            adminEmail: user?.email,
            taskID: generateRandomID(),
            taskTitle,
            taskDescription,
            taskPrice,
            taskPoints,
            taskStatus: "pending",
            taskMode: "public"
        }

        setLoading(true)
        await axios.post(`${import.meta.env.VITE_HOST}/admin/create-task`, newTask)
            .then(res => {
                const { status, data } = res
                if (status === 201) {
                    window.toastify(data.message, "success")
                    setState(initialState)
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                window.toastify("Something went wrong while creating task. Please try again!", "error")
            })
            .finally(() => {
                setLoading(false)
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
                            <span className='text-[18px] font-normal text-[#666]'>/ Create Task</span>
                        </p>
                    </h6>
                </div>

                <div className='flex flex-col justify-center items-center mt-10 mb-10'>
                    <div className='w-full max-w-[650px] min-h-[350px] bg-white rounded-[15px] p-[30px] shadow-lg'>
                        <h5 className='font-bold text-[20px] !text-[#5271ff]'>Create Public Task</h5>
                        <p className='mt-2 mb-8 font-bold !text-[#666] !text-[16px] flex items-center gap-1'><FiInfo /> The created task will be available for public</p>
                        <div>
                            <label className='font-bold text-[#666]' htmlFor="taskTitle">Title:</label>
                            <input type="text" name="taskTitle" id="taskTitle" value={state.taskTitle} placeholder='Enter title' className='w-full p-[10px] text-[#666] border-2 border-[#e8e8e8] rounded-[5px] mt-2 mb-4' onChange={handleChange} />
                        </div>
                        <div>
                            <label className='font-bold text-[#666]' htmlFor="taskDescription">Description:</label>
                            <textarea name="taskDescription" id="taskDescription" value={state.taskDescription} placeholder='Enter description (max 1500 characters)' rows={10} maxLength={1500} className='w-full p-[10px] text-[#666] border-2 border-[#e8e8e8] rounded-[5px] mt-2 mb-4 resize-none' onChange={handleChange}></textarea>
                        </div>
                        <div className='flex gap-5'>
                            <div className='flex-1'>
                                <label className='font-bold text-[#666]' htmlFor="taskPoints">Points:</label>
                                <input type="number" name="taskPoints" id="taskPoints" value={state.taskPoints} placeholder='Enter points' className='w-full p-[10px] border-2 border-[#e8e8e8] rounded-[5px] mt-2 mb-4 text-[#666]' onChange={handleChange} />
                            </div>
                            <div className='flex-1'>
                                <label className='font-bold text-[#666]' htmlFor="taskPrice">Price:</label>
                                <input type="number" name="taskPrice" id="taskPrice" value={state.taskPrice} placeholder='Enter price' className='w-full p-[10px] border-2 border-[#e8e8e8] rounded-[5px] mt-2 mb-4 text-[#666]' onChange={handleChange} />
                            </div>
                        </div>
                        <button className='w-full mt-8 p-2 bg-[#5271ff] text-white rounded-[8px] shadow-md cursor-pointer transition-all duration-200 ease-out hover:bg-[#1b1b1b]' disabled={loading} onClick={handleCreateTask}>
                            {
                                !loading ?
                                    "Create"
                                    :
                                    "Creating Task..."
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}