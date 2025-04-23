import React from 'react'
import './main.css'
import { AiOutlineDashboard } from 'react-icons/ai'
import { GrTask, GrTasks } from 'react-icons/gr';
import { FiArrowUp, FiCheck } from 'react-icons/fi';
import { LuClock10 } from 'react-icons/lu';
import { FaX } from 'react-icons/fa6';

export default function Main() {

    const date = new Date()
    const todayDate = date.getDate()
    const month = date.getMonth()

    return (
        <div className='dashboard-container'>
            <div className="inner-container">

                {/* banner */}
                <div className='p-3 rounded-[5px]'>
                    <h6 className='font-bold text-[20px] text-[#333] flex items-center gap-2'>
                        <p className='flex items-center gap-2'>
                            <span className='text-[22px] flex items-center gap-2'><AiOutlineDashboard />Dashboard</span>
                            <span className='text-[18px] font-normal text-[#666]'>/ Home</span>
                        </p>
                    </h6>
                </div>

                <div className="dashboard-boxes">
                    <div className="dashboard-box">
                        <h6 className='text-[18px] flex gap-1 items-center'><GrTask /> Your Tasks</h6>
                        <div className='flex justify-between items-center'>
                            <p>0</p>
                            <p className='flex gap-1 items-center]' style={{ fontSize: '12px' }}><FiArrowUp /> {todayDate + "/" + month}</p>
                        </div>
                    </div>
                    <div className="dashboard-box">
                        <h6 className='text-[18px] flex gap-1 items-center'><FiCheck /> Completed Tasks</h6>
                        <div className='flex justify-between items-center'>
                            <p>0</p>
                            <p className='flex gap-1 items-center]' style={{ fontSize: '12px' }}><FiArrowUp /> {todayDate + "/" + month}</p>
                        </div>
                    </div>
                    <div className="dashboard-box">
                        <h6 className='text-[18px] flex gap-1 items-center'><LuClock10 /> Pending Tasks</h6>
                        <div className='flex justify-between items-center'>
                            <p>0</p>
                            <p className='flex gap-1 items-center]' style={{ fontSize: '12px' }}><FiArrowUp /> {todayDate + "/" + month}</p>
                        </div>
                    </div>
                    <div className="dashboard-box">
                        <h6 className='text-[18px] flex gap-1 items-center'><FaX /> Failed Tasks</h6>
                        <div className='flex justify-between items-center'>
                            <p>0</p>
                            <p className='flex gap-1 items-center]' style={{ fontSize: '12px' }}><FiArrowUp /> {todayDate + "/" + month}</p>
                        </div>
                    </div>
                    <div className="dashboard-box">
                        <h6 className='text-[18px] flex gap-1 items-center'><GrTasks /> Avaiable Tasks</h6>
                        <div className='flex justify-between items-center'>
                            <p>0</p>
                            <p className='flex gap-1 items-center]' style={{ fontSize: '12px' }}><FiArrowUp /> {todayDate + "/" + month}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}