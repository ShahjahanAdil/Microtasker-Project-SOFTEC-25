import React, { useState } from 'react'
import './signup.css'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlinePrivacyTip } from "react-icons/md";
import logo from '../../../assets/images/microtasker-logo.png'
import Loader from '../../../components/Loader';
import axios from 'axios'

const initialState = { username: "", email: "", password: "" }
const generateRandomID = () => Math.random().toString(36).slice(3)

export default function Signup() {

    const [state, setState] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSignup = async (e) => {
        e.preventDefault()

        const { username, email, password } = state
        if (!username || !email || !password) { return window.toastify("Please fill all fields", "warning") }

        if (username.trim().length < 3) { return window.toastify("Username must be atleast 3 characters long", "error") }
        if (!window.isEmail(email)) { return window.toastify("Please enter a valid email address", "error") }
        if (password.trim().length < 6) { return window.toastify("Password must be atleast 6 characters long", "error") }

        const newUserData = {
            userID: generateRandomID(),
            username,
            email,
            password,
            roles: ["user"],
            withdrawalAccount: "",
            accountNumber: "",
            points: 0
        }

        setLoading(true)
        await axios.post(`${import.meta.env.VITE_HOST}/auth/signup`, newUserData)
            .then(res => {
                const { status, data } = res
                if (status === 201) {
                    window.toastify(data.message, "success")
                    navigate('/auth/login')
                }
            })
            .catch(err => {
                const { status, data } = err.response
                console.error('Frontend POST error', err.message)
                if (status === 403) {
                    return window.toastify(data.message, "info")
                }
                window.toastify("Something went wrong while creating user", "error")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className="auth-container w-full h-screen p-5 flex flex-col justify-center items-center bg-[#f8f8f8]">
            <div className="auth-box w-full max-w-[450px] min-h-[300px] rounded-[5px] p-8 bg-white">
                <form onSubmit={handleSignup}>
                    <div className='flex items-center justify-center mb-5'>
                        <img src={logo} alt="logo" className='w-[200px]' />
                    </div>

                    <h2 className='!text-[26px] font-bold'>Register Account</h2>
                    <p className='mb-5'>Create user to continue</p>

                    <div>
                        <label htmlFor="username" className='font-bold mb-2 inline-block'>Username:</label>
                        <input type="text" name="username" id="username" placeholder='john_paul' className='w-full p-[10px] rounded-[5px] border-2 border-[#e8e8e8] mb-4'
                            value={state.username} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="email" className='font-bold mb-2 inline-block'>Email:</label>
                        <input type="text" name="email" id="email" placeholder='johnpaul@gmail.com' className='w-full p-[10px] rounded-[5px] border-2 border-[#e8e8e8] mb-4'
                            value={state.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password" className='font-bold mb-2 inline-block'>Password:</label>
                        <input type="password" name="password" id="password" placeholder='Enter password' className='w-full p-[10px] rounded-[5px] border-2 border-[#e8e8e8] mb-4'
                            value={state.password} onChange={handleChange} />
                    </div>

                    <button className='bg-[#5271FF] cursor-pointer w-full p-[10px] rounded-[5px] mt-5' onClick={handleSignup}>SIGNUP</button>
                    <p className='mt-3 flex items-center gap-1' style={{ fontSize: '18px' }}><MdOutlinePrivacyTip className='text-green-600' /> Your information is secure</p>

                    <p className='mt-5 !text-[18px]'>Already have an account? <Link to='/auth/login' className='!text-[#5271ff] font-bold hover:underline'>Login now</Link></p>
                </form>
            </div>
        </div>
    )
}