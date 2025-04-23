import React from 'react'
import './home.css'
import img1 from '../../../assets/images/img1.png'

export default function Home() {
    return (
        <>
            <div className="hero-section w-full h-[100vh] flex gap-5 justify-between items-center px-[75px]">
                <div className="hero-left">
                    <h1 className='leading-none mb-5 font-bold'>Turn Your Free Time Into Real <span className='main-heading'>Earnings</span></h1>
                    <p>Join MicroTasker and get paid for completing quick, skill-based tasks online. Whether you're a student,
                        freelancer, or just looking to earn on the side —we've got tasks for you!</p>
                </div>
                <div className="hero-right">
                    <img src={img1} alt="hero-section-img" className='' />
                </div>
            </div>
        </>
    )
}