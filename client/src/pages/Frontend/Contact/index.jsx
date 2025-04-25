import React, { useState } from 'react'
import './contact.css'
import contactImg from '../../../assets/images/contact-us.png'
import { FiMail } from 'react-icons/fi'

const initialState = { username: "", email: "", message: "" }

export default function Contact() {

    const [state, setState] = useState(initialState)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    return (
        <div className='contact-container'>
            <div className='flex flex-col items-center my-10'>
                <h1 className='txt-gradient inline-block !text-[2rem] sm:!text-[3rem]'>Contact Us</h1>
                <p className='font-bold !text-[#333] !text-[16px]'>Let us know how we can help you!</p>
            </div>

            <div className='contact flex gap-5 justify-evenly items-center w-full min-h-[calc(100vh-112px)] mb-10'>
                <div className="contact-left">
                    <img src={contactImg} alt="contact-us" />
                </div>
                <div className="contact-right">
                    <div>
                        <label htmlFor="username" className='font-bold mb-2 inline-block !text-[#333]'>Username:</label>
                        <input type="text" name="username" id="username" placeholder='Enter your username' className='w-full p-[10px] rounded-[5px] !text-[#666] border-2 border-[#e8e8e8] mb-4' />
                    </div>
                    <div>
                        <label htmlFor="email" className='font-bold mb-2 inline-block !text-[#333]'>Email:</label>
                        <input type="text" name="email" id="email" placeholder='Enter your email' className='w-full p-[10px] rounded-[5px] !text-[#666] border-2 border-[#e8e8e8] mb-4' />
                    </div>
                    <div>
                        <label htmlFor="message" className='font-bold mb-2 inline-block !text-[#333]'>Message:</label>
                        <textarea name="message" id="message" rows="10" placeholder='Type message...' className='w-full p-[10px] rounded-[5px] !text-[#666] border-2 border-[#e8e8e8] mb-4 resize-none'></textarea>
                    </div>
                    <div>
                        <button className='bg-[#5271ff] px-4 py-2 cursor-pointer rounded-full flex gap-2 items-center mt-5'>Send Message <FiMail /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}