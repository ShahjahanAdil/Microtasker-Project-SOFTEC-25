import React from 'react'
import './yourtasksloader.css'

export default function YourTaskDetsLoader() {
    return (
        <>
            <div className='public-task-box w-full px-5 py-3 mt-10 border border-gray-100 rounded-[15px]'>
                <div className='flex flex-1 flex-col gap-8 pr-[50px]'>
                    <div className='load-anim w-[75%] p-5 bg-neutral-200 rounded-[5px]'></div>
                    <div className='flex flex-1 flex-col gap-2'>
                        <div className='load-anim w-full p-3 bg-neutral-200 rounded-[5px]'></div>
                        <div className='load-anim w-full p-3 bg-neutral-200 rounded-[5px]'></div>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-3 w-52 shadow-md p-3 border border-gray-100 rounded-[15px]'>
                    <div className='load-anim w-full p-3 bg-neutral-200 rounded-[5px]'></div>
                    <div className='load-anim w-full p-3 bg-neutral-200 rounded-[5px]'></div>
                    <div className='load-anim w-full p-3 bg-neutral-200 rounded-[5px]'></div>
                    <div className='load-anim w-full p-3 bg-neutral-200 rounded-[5px]'></div>
                </div>
            </div>
        </>
    )
}