import React from 'react'
import './footer.css'
import { useNavigate } from 'react-router-dom'
import img1 from '../../assets/images/logo.png'
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";

export default function Footer() {

    const navigate = useNavigate()

    return (
        <div className='footer'>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto gap-20 py-30'>
                <div className='mx-4 sm:mx-1 md:mx-1 lg:mx-1'>
                    <img src={img1} alt='Logo' className='logo' />
                    <p className='!text-base pt-5'>Microtasker is a free service providing an easy way to earn money by doing tasks. With our simple platform, you can quickly monetize your content and make money online.</p>
                </div>
                <div className='mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
                    <p className='font-bold !text-black'>Get In Touch</p>
                    <p className='py-6 !text-medium'>Contact@microtasker.com</p>
                    <div className='flex gap-3 items-center'>
                        <FaFacebook className='text-[22px] cursor-pointer transition-all duration-200 hover:text-[#5271ff]' />
                        <IoLogoWhatsapp className='text-[22px] cursor-pointer transition-all duration-200 hover:text-[#5271ff]' />
                        <AiFillInstagram className='text-[22px] cursor-pointer transition-all duration-200 hover:text-[#5271ff]' />
                    </div>
                </div>
                <div className='mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
                    <p className='font-bold !text-black'>Learn More</p>
                    <ul className='list-none  space-y-2 text-gray-700 !text-sm pt-6'>
                        <li className='cursor-pointer transition-all duration-200 hover:!text-[#5271ff]' onClick={() => navigate("/home")}>Home</li>
                        <li className='cursor-pointer transition-all duration-200 hover:!text-[#5271ff]' onClick={() => navigate("/policies")}>Privacy Policy</li>
                        <li className='cursor-pointer transition-all duration-200 hover:!text-[#5271ff]' onClick={() => navigate("/payouts")}>Payment Proofs</li>
                        <li className='cursor-pointer transition-all duration-200 hover:!text-[#5271ff]' onClick={() => navigate("/contact")}>Contact Us</li>
                        <li className='cursor-pointer transition-all duration-200 hover:!text-[#5271ff]' onClick={() => navigate("/policies")}>Payment Policy</li>
                        <li className='cursor-pointer transition-all duration-200 hover:!text-[#5271ff]' onClick={() => navigate("/policies")}>Account Registration Policy</li>
                    </ul>
                </div>
                <div className='mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
                    <p className='font-bold !text-black'>Get Help</p>
                    <ul className='list-none  space-y-2 text-gray-700 !text-sm pt-6'>
                        <li className='cursor-pointer transition-all duration-200 hover:!text-[#5271ff]' onClick={() => navigate("/policies")}>Privacy Policy</li>
                        <li className='cursor-pointer transition-all duration-200 hover:!text-[#5271ff]' onClick={() => navigate("/contact")}>Contact us</li>
                    </ul>
                </div>
            </div>

            <div className='py-4 '>
                <p className='text-center !text-[#333]'>&copy; 2025 Copyrights by <span>MicroTasker</span> All Rights Reserved</p>
            </div>
        </div>
    )
}