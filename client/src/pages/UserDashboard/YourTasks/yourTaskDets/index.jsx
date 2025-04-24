import React, { useEffect, useState } from 'react'
import './yourTaskDets.css'
import { AiFillInfoCircle, AiOutlineDashboard, AiOutlineNotification } from 'react-icons/ai'
import axios from 'axios'
import { useAuthContext } from '../../../../contexts/AuthContext'
import { useParams } from 'react-router-dom'
import YourTaskDetsLoader from '../../../../components/YourTaskDetsLoader'
import { RxLink1 } from "react-icons/rx";

const initialState = { domainLink: "", githubLink: "", extraLink: "" }

export default function YourTaskDets() {

    const { user } = useAuthContext()
    const { taskID } = useParams()
    const [task, setTask] = useState({})
    const [state, setState] = useState(initialState)
    const [loading, setLoading] = useState(true)
    const [submissionLoading, setSubmissionLoading] = useState(false)

    useEffect(() => {
        if (taskID) {
            setLoading(true)
            axios.get(`${import.meta.env.VITE_HOST}/user/submit-task/${taskID}`)
                .then(res => {
                    const { status, data } = res
                    if (status === 200) {
                        setTask(data?.taskDetails)
                    }
                })
                .catch(err => {
                    console.error('Frontend POST error', err.message)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [taskID])

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmitTask = async () => {
        const { domainLink, githubLink, extraLink } = state
        if (!domainLink || !githubLink || !extraLink) { return window.toastify("Please fill all fields", "warning") }

        const taskToSubmit = {
            ...task,
            domainLink,
            githubLink,
            extraLink
        }

        const notification = {
            recipient: task?.adminID,
            content: user.email + " submitted task to you",
            status: "unread"
        }

        setSubmissionLoading(true)
        await axios.post(`${import.meta.env.VITE_HOST}/user/submit-task`, { taskToSubmit, notification })
            .then(res => {
                const { status, data } = res
                if (status === 201) {
                    window.toastify(data.message, "success")
                    setState(initialState)
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                if (err.response.status === 401) {
                    return window.toastify(err.response.data.message, "error")
                }
                window.toastify("Something went wrong while submitting task. Please try again!", "error")
            })
            .finally(() => {
                setSubmissionLoading(false)
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

                <div className='flex justify-center items-center'>
                    <p className='bg-blue-100 border border-blue-300 px-2 py-1 rounded-[5px] flex gap-2 items-center'><AiOutlineNotification /> Task can be submitted only once!</p>
                </div>

                {
                    loading ?
                        <YourTaskDetsLoader />
                        :
                        <div className='px-10'>
                            <div className='flex gap-20 mt-10'>
                                <div className='flex-1'>
                                    <h1 className='!text-[30px] !text-[#333] font-bold mb-8 border-b-2 border-gray-200 pb-2'>{task?.taskTitle}</h1>
                                    <h3 className='!text-[20px] !text-[#333] font-bold mb-2'>Description:</h3>
                                    <p className='!text-[18px] !text-[#666]'>{task?.taskDescription}</p>
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

                            <div className='shad bg-white my-16 px-[30px] py-[20px] rounded-[15px]'>
                                <h5 className='text-[22px] font-bold !text-[#5271ff] border-b-2 border-gray-200 pb-1 flex gap-2 items-center'><RxLink1 /> Task Submission Form</h5>
                                <p className='mt-5 mb-8 !text-[16px] bg-yellow-100 border border-yellow-300 inline-block px-2 rounded-[5px]'>The task will be submitted to the admin. Admin will accept or reject your task!</p>
                                <div className='flex gap-5'>
                                    <div className='flex-1'>
                                        <label htmlFor="domainLink" className='mb-2 font-bold text-[#666]'>Domain Link:</label>
                                        <input type="text" name="domainLink" id="domainLink" value={state.domainLink} placeholder='Enter website live link (e.g., www.my-website.firebase.app)' className='w-full p-[10px] text-[#666] rounded-[5px] border-1 mt-2 border-gray-200 focus:border-1 focus:border-[#5271ff] bg-neutral-100 mb-4'
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <label htmlFor="githubLink" className='mb-2 font-bold text-[#666]'>GitHub Repo Link:</label>
                                        <input type="text" name="githubLink" id="githubLink" value={state.githubLink} placeholder='Enter github repo link' className='w-full p-[10px] text-[#666] rounded-[5px] border-1 mt-2 border-gray-200 focus:border-1 focus:border-[#5271ff] bg-neutral-100 mb-4'
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="extraLink" className='mb-2 font-bold text-[#666]'>Extra Link:</label>
                                    <input type="text" name="extraLink" id="extraLink" value={state.extraLink} placeholder='Enter extra content link about your project (e.g., google drive)' className='w-full p-[10px] text-[#666] rounded-[5px] border-1 mt-2 border-gray-200 focus:border-1 focus:border-[#5271ff] bg-neutral-100 mb-4'
                                        onChange={handleChange}
                                    />
                                </div>
                                <button className='px-5 py-1 mt-5 mb-2 bg-[#5271ff] cursor-pointer text-[#fff] rounded-[8px] transition-all !duration-200' disabled={submissionLoading} onClick={handleSubmitTask}>
                                    {
                                        !submissionLoading ?
                                            "Submit Task" :
                                            "Submitting..."
                                    }
                                </button>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}