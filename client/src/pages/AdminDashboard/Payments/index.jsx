import React from 'react'
import { AiOutlineDashboard } from 'react-icons/ai';

export default function Payments() {
    return (
        <div className='dashboard-container'>
            <div className="inner-container">

                {/* banner */}
                <div className='p-3 rounded-[5px]'>
                    <h6 className='font-bold text-[20px] text-[#333] flex items-center gap-2'>
                        <p className='flex items-center gap-2'>
                            <span className='text-[22px]'><AiOutlineDashboard /></span> Dashboard
                            <span className='text-[18px] font-normal text-[#666]'>/ Payments</span>
                        </p>
                    </h6>
                </div>

            </div>
        </div>
    )
}