import React, { useEffect, useState } from 'react'
import './aHeader.css'
import logo from '../../assets/images/microtasker-logo.png'
import { useAuthContext } from '../../contexts/AuthContext';
import { RiUser6Line } from "react-icons/ri";
import { FiBell, FiPower } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminHeader() {

    const { user, handleLogout } = useAuthContext()
    const [notifications, setNotifications] = useState([])
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false)
    const [bellOpen, setBellOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (user.userID) {
            fetchNotifications()
        }
    }, [user])

    const fetchNotifications = () => {
        axios.get(`${import.meta.env.VITE_HOST}/user/notifications/header-notifications?userID=${user.userID}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setNotifications(data?.userLimitedNotifications)
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
            })
    }

    useEffect(() => {
        const hasUnread = notifications?.some(notification => notification.status === "unread")
        setHasUnreadNotifications(hasUnread)
    }, [notifications])

    const handleUnread = () => {
        setBellOpen(!bellOpen)

        if (hasUnreadNotifications) {
            const updatedNotifications = notifications.map(notification => {
                if (notification.status === "unread") {
                    return { ...notification, status: "read" }
                }
                return notification
            })

            axios.patch(`${import.meta.env.VITE_HOST}/user/notifications/mark-as-read`, { userID: user.userID })
                .then(res => {
                    const { status } = res
                    if (status === 202) {
                        setNotifications(updatedNotifications)
                    }
                })
                .catch(err => {
                    console.error('Frontend POST error', err.message)
                })
        }
    }

    return (
        <div className='a-header flex justify-between items-center px-[50px] py-[15px]'>
            <div className='uh-left'>
                <img src={logo} alt="logo" className='w-[180px] cursor-pointer' onClick={() => navigate("/")} />
            </div>
            <div className='uh-right'>
                <ul className='flex items-center gap-5'>
                    <li>
                        <span className='text-[18px] text-[#666] mt-1 relative inline-block cursor-pointer'><FiBell onClick={handleUnread} />
                            {
                                hasUnreadNotifications &&
                                <div className='absolute top-[-6px] right-[-2px] bg-red-500 w-[12px] h-[12px] rounded-full border-2 border-white' onClick={handleUnread}></div>
                            }
                            <div className={`bell-box absolute top-[200%] right-0 bg-white min-w-[320px] min-h-[50px] cursor-default rounded-[5px] shadow-lg px-3 py-5 z-[100] ${bellOpen ? 'bell-open' : 'bell-close'}`}>
                                <h3 className='flex items-center gap-2 font-bold !text-[18px] !text-[#5271ff] mb-3'>Notfications:</h3>
                                <div className='flex flex-col gap-3'>
                                    {
                                        notifications.length > 0 ?
                                            notifications?.map((notification, i) => {
                                                const { content, createdAt } = notification
                                                const date = createdAt?.slice(0, 10)
                                                const time = createdAt?.slice(11, 16)
                                                const datetime = date + " " + time
                                                return (
                                                    <div key={i} className='bg-[#f3f6ff] p-2 rounded-[5px] shadow-sm'>
                                                        <p className='whitespace-normal text-[16px] mb-1'>{content}</p>
                                                        <p className='font-semibold !text-[12px] !text-[#888] text-end'>{datetime}</p>
                                                    </div>
                                                )
                                            })
                                            :
                                            <p className='text-center text-[#888]'>Empty!</p>
                                    }
                                </div>
                                <Link to="/admin/notifications" className='mt-5 !text-[16px] !text-[#5271ff] flex items-center justify-center gap-2 hover:underline'>See all <FaArrowRight /></Link>
                            </div>
                        </span>
                    </li>
                    <li>
                        <span className='flex gap-2 items-center text-[18px] text-[#666] cursor-default'><RiUser6Line /> Welcome! {user.username}</span>
                    </li>
                    <li>
                        <span><FiPower className='text-red-500 text-[18px] cursor-pointer' onClick={() => handleLogout()} /></span>
                    </li>
                </ul>
            </div>
        </div>
    )
}