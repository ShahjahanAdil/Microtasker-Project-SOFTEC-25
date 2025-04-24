import React, { useEffect, useState } from 'react'
import { AiOutlineDashboard } from 'react-icons/ai'
import { FiTrash2 } from 'react-icons/fi'
import { useAuthContext } from '../../../contexts/AuthContext'
import axios from 'axios'
import TableLoader from '../../../components/TableLoader'

export default function Notifications() {

    const { user } = useAuthContext()
    const [notifications, setNotifications] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const [clearLoading, setClearLoading] = useState(false)

    useEffect(() => {
        if (user.userID) {
            fetchNotifications(page)
        }
    }, [user, page])

    const fetchNotifications = (page) => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/user/notifications?userID=${user?.userID}&page=${page}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setNotifications(data?.userNotifications || [])
                    setTotalPages(Math.ceil(data?.totalNotifications / 15))
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleClearNotifications = () => {
        setClearLoading(true)
        axios.delete(`${import.meta.env.VITE_HOST}/user/notifications/clear-all?userID=${user?.userID}`)
            .then(res => {
                const { status, data } = res
                if (status === 203) {
                    setNotifications([])
                    window.toastify(data.message, "success")
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                window.toastify("Something went wrong. Please try again!", "error")
            })
            .finally(() => {
                setClearLoading(false)
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
                            <span className='text-[18px] font-normal text-[#666]'>/ Notifications</span>
                        </p>
                    </h6>
                </div>

                {
                    notifications.length > 0 &&
                    <div className='flex justify-end mt-10'>
                        <button className='!text-[#ef4444] flex gap-2 items-center cursor-pointer hover:!bg-transparent hover:!text-red-400' disabled={clearLoading} onClick={handleClearNotifications}>
                            {
                                !clearLoading ?
                                    <>
                                        Clear All <FiTrash2 />
                                    </>
                                    :
                                    "Clearing..."
                            }
                        </button>
                    </div>
                }

                <div className="table-div flex flex-col mt-5 border border-gray-200 rounded-[15px]">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden rounded-[15px]">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className='bg-[#5272ffa3]'>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">#</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">Notification</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase whitespace-nowrap">Received at</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            loading ?
                                                <TableLoader />
                                                :
                                                (
                                                    notifications.length > 0 ?
                                                        notifications.map((notification, i) => {
                                                            const { content, createdAt } = notification
                                                            const date = createdAt?.slice(0, 10)
                                                            const time = createdAt?.slice(11, 16)
                                                            const datetime = date + " " + time
                                                            return (
                                                                <tr key={i} className="odd:bg-white even:bg-[#f3f6ff] hover:bg-[#f3f6ff]">
                                                                    <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>{i + 1}</span></td>
                                                                    <td className="px-6 py-4 whitespace-normal text-[14px] font-bold  text-[#666]"><span>{content}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>{datetime}</span></td>
                                                                </tr>
                                                            )
                                                        })
                                                        :
                                                        <tr>
                                                            <td colSpan="9" className='px-3 py-5 text-center'>
                                                                <p>No notifcations received yet!</p>
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