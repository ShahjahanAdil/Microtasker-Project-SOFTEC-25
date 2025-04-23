import React from 'react'
import './loader.css'

export default function Loader() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="loader scale-[120%]"></div>
        </div>
    )
}