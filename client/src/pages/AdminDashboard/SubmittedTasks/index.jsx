import React, { useEffect, useState } from 'react'
import { AiOutlineDashboard } from 'react-icons/ai';
import { useAuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import TableLoader from '../../../components/TableLoader';
import { Link } from 'react-router-dom';

export default function SubmittedTasks() {

    const { user } = useAuthContext()
    const [tasks, setTasks] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user.userID) {
            fetchSubmittedTasks(page)
        }
    }, [user, page])

    const fetchSubmittedTasks = (page) => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/admin/submitted-tasks?page=${page}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setTasks(data.submittedTasks || [])
                    setTotalPages(Math.ceil(data?.totalSubmittedTasks / 15))
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
            })
            .finally(() => {
                setLoading(false)
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
                            <span className='text-[18px] font-normal text-[#666]'>/ Submitted Tasks</span>
                        </p>
                    </h6>
                </div>

                <div className="table-div flex flex-col mt-10 border border-gray-200 rounded-[10px]">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden rounded-[10px]">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className='bg-[#5272ffa3]'>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">ID</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">Submitted By</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">Title</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">Description</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase whitespace-nowrap">Submitted At</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase whitespace-nowrap">Status</th>
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
                                                    tasks.length > 0 ?
                                                        tasks.map((task, i) => {
                                                            const { createdAt } = task
                                                            const date = createdAt?.slice(0, 10)
                                                            const time = createdAt?.slice(11, 16)
                                                            const datetime = date + " " + time
                                                            return (
                                                                <tr key={task.taskID} className="odd:bg-white even:bg-[#f3f6ff] hover:bg-[#f3f6ff]">
                                                                    <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>{i + 1}</span></td>
                                                                    <td className="px-6 py-4 whitespace-normal text-[14px]  text-[#666]"><span>{task.userEmail}</span></td>
                                                                    <td className="px-6 py-4 whitespace-normal text-[14px]  text-[#666]"><span className='text-ellipsis line-clamp-2'>{task.taskTitle}</span></td>
                                                                    <td className="px-6 py-4 whitespace-normal text-[14px]  text-[#666]"><span className='text-ellipsis line-clamp-2'>{task.taskDescription}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>{datetime}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>{task.taskStatus}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-end text-[14px] text-[#666]"><span>{task.taskPoints}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-end text-[14px] text-[#666]"><span>${task.taskPrice}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-end text-[14px] text-[#666]">
                                                                        <Link to={`/admin/submitted-tasks/${task.taskID}`} className='bg-[#5272ffa3] !text-white font-bold px-3 py-2 rounded-[5px] shadow-md transition-all duration-200 hover:bg-[#666]'>Review</Link>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        :
                                                        <tr>
                                                            <td colSpan="9" className='px-3 py-5 text-center'>
                                                                <p>No task has been submitted yet!</p>
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