import React, { useEffect, useState } from 'react'
import './main.css'
import { AiOutlineDashboard } from 'react-icons/ai';
import { FaStar, FaTrophy } from 'react-icons/fa';
import { useAuthContext } from '../../../contexts/AuthContext';
import Loader from '../../../components/Loader';
import axios from 'axios';

export default function Main() {

    const { isAuthenticated, user } = useAuthContext()
    const [topUsers, setTopUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (isAuthenticated && user.userID) {
            fetchTopUsers()
        }
    }, [isAuthenticated, user])

    const fetchTopUsers = () => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/admin/fetch-top-users`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setTopUsers(data?.users || [])
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
            })
            .finally(() => {
                setLoading(false)
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
                            <span className='text-[18px] font-normal text-[#666]'>/ Admin Panel</span>
                        </p>
                    </h6>
                </div>

                <div className='flex gap-2 items-center mt-8 mb-5 border-b-3 border-gray-200'>
                    <FaTrophy className='!text-[30px] text-[#5271ff]' />
                    <h1 className='txt-gradient leading-none !text-[30px] inline-block pb-2 font-bold'>Top Performers</h1>
                </div>
                <div className='flex gap-5 w-full h-[350px] mt-10'>
                    <div className='top-box-1 box-shadow px-[30px] py-[20px] rounded-[15px] relative flex-1'>
                        <p className='w-[60%] !text-[#fff] !text-[5rem] font-bold leading-none'>{topUsers[0]?.username}</p>
                        <p className='grad absolute left-[30px] bottom-[20px] !text-[#fff] bg-[#666] px-3 py-1 rounded-[8px] flex gap-1 items-center'><FaStar /> Points: {topUsers[0]?.points.toFixed(2)}</p>
                        <p className='absolute right-[30px] bottom-[20px] leading-none !text-[9rem] !text-[#fff] font-bold'>1</p>
                    </div>
                    <div className='flex flex-col flex-1 gap-5'>
                        <div className='top-box-2 box-shadow px-[30px] py-[20px] rounded-[15px] relative flex-1 h-full'>
                            <p className='w-[80%] !text-[#fff] !text-[3rem] font-bold leading-none'>{topUsers[1]?.username}</p>
                            <p className='grad absolute left-[30px] bottom-[20px] !text-[#fff] text-[16px] bg-[#666] px-3 py-1 rounded-[8px] flex gap-1 items-center'><FaStar /> Points: {topUsers[1]?.points.toFixed(2)}</p>
                            <p className='absolute right-[30px] bottom-[20px] leading-none !text-[4.5rem] !text-[#fff] font-bold'>2</p>
                        </div>
                        <div className='top-box-3 box-shadow px-[30px] py-[20px] rounded-[15px] relative flex-1 h-full'>
                            <p className='w-[80%] !text-[#fff] !text-[3rem] font-bold leading-none'>{topUsers[2]?.username}</p>
                            <p className='grad absolute left-[30px] bottom-[20px] !text-[#fff] text-[16px] bg-[#666] px-3 py-1 rounded-[8px] flex gap-1 items-center'><FaStar /> Points: {topUsers[2]?.points.toFixed(2)}</p>
                            <p className='absolute right-[30px] bottom-[20px] leading-none !text-[4.5rem] !text-[#fff] font-bold'>3</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}