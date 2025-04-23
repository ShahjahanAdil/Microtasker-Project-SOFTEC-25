import React, { useEffect, useState } from 'react'
import './publicTasks.css'
import { Link } from 'react-router-dom'
import { AiOutlineDashboard } from 'react-icons/ai'
import { FaArrowRight } from 'react-icons/fa'
import { LuClock, LuTrophy, LuUserRound } from 'react-icons/lu'
import axios from 'axios'
import PublicTasksLoader from '../../../components/PublicTasksLoader'

export default function PublicTasks() {

    const [allPublicTasks, setAllPublicTasks] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/user/public-tasks?page=${page}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setAllPublicTasks(data?.publicTasks)
                    setTotalPages(Math.ceil(data?.totalPublicTasks / 15))
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [page])

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
                            <span className='text-[18px] font-normal text-[#666]'>/ Public Tasks</span>
                        </p>
                    </h6>
                </div>

                <div className='flex flex-col gap-5 mt-5 mb-10'>
                    {
                        loading ?
                            <PublicTasksLoader />
                            :
                            allPublicTasks.length > 0 ?
                                allPublicTasks.map(task => {
                                    const { taskID, taskTitle, taskDescription, taskPoints, taskPrice, adminName, createdAt } = task
                                    const date = createdAt.slice(0, 10)
                                    const time = createdAt.slice(11, 16)
                                    const datetime = date + " " + time
                                    return (
                                        <div key={taskID} className='public-task-box w-full min-h-[120px] bg-white px-5 py-3 border border-gray-100 rounded-[15px]'>
                                            <div className='pr-[50px]'>
                                                <Link to={`/user/public-tasks/${taskID}`} className='title font-bold underline transition-all duration-200 ease-out'>{taskTitle}</Link>
                                                <p className='description ellipsis mt-1'>{taskDescription}</p>
                                                <div className='flex gap-4 py-2'>
                                                    <p className='border-r-2 border-gray-200 pr-4 flex items-center gap-2'><LuUserRound className='text-[#5271ff]' /> Author: <span className='text-[#666]'>{adminName}</span></p>
                                                    <p className='border-r-2 border-gray-200 pr-4 flex items-center gap-2'><LuClock className='text-[#dcdc00]' /> Created at: <span className='text-[#666]'>{datetime}</span></p>
                                                    <p className='flex items-center gap-2'><LuTrophy className='text-[#49d633]' /> Points: <span className='text-[#666]'>{taskPoints}</span></p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col items-center justify-between py-2 border-l-2 border-gray-200 pl-5'>
                                                <p className='price font-bold'>Price: <span className='text-[#666] font-normal'>${taskPrice}</span></p>
                                                <Link to={`/user/public-tasks/${taskID}`} className='see-dets font-bold text-[14px] bg-[#5271ff] whitespace-nowrap px-[15px] py-[8px] rounded-[8px] flex items-center gap-2 transition-all duration-200 ease-out hover:bg-[#1c1c1c]' style={{ color: '#fff' }}>
                                                    See Details <FaArrowRight />
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }) :
                                <div className='flex items-center justify-center'>
                                    <p className='bg-yellow-100 border-2 border-yellow-200 px-3 py-2 rounded-[5px]'>There are no public tasks avaiable!</p>
                                </div>
                    }
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