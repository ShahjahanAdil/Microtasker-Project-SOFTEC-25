import React from 'react'
import { AiOutlineDashboard } from 'react-icons/ai'

export default function Profile() {
    return (
        <div className='dashboard-container'>
            <div className="inner-container">

                {/* banner */}
                <div className='p-3 rounded-[5px]'>
                    <h6 className='font-bold text-[20px] text-[#333] flex items-center gap-2'>
                        <p className='flex items-center gap-2'>
                            <span className='text-[22px] flex items-center gap-2'><AiOutlineDashboard />Dashboard</span>
                            <span className='text-[18px] font-normal text-[#666]'>/ Profile</span>
                        </p>
                    </h6>
                </div>

            </div>
        </div>
    )
}