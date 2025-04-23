import React, { useEffect, useState } from 'react'
import './profile.css'
import { AiOutlineDashboard } from 'react-icons/ai'
import { PiUser } from 'react-icons/pi'
import { FiEdit } from 'react-icons/fi'
import { useAuthContext } from '../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/Loader'
import axios from 'axios'

export default function Profile() {

    const { user, dispatch, handleLogout } = useAuthContext()
    const [profileUser, setProfileUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user.email) {
            return
        }
        setProfileUser({
            ...user, withdrawalAccount: user.withdrawalAccount || "jazzcash"
        });
        setLoading(false)
    }, [user])

    const handleChange = e => setProfileUser(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleUpdateAccount = (userID) => {
        setLoading(true)
        axios.patch(`${import.meta.env.VITE_HOST}/user/profile/update-account?userID=${userID}`, profileUser)
            .then(res => {
                const { status } = res
                if (status === 202) {
                    dispatch({ type: "SET_PROFILE", payload: { user: profileUser } })
                    window.toastify("Account updated successfully!", "success")
                }
            })
            .catch(err => {
                console.error("User updation error: ", err.message)
                window.toastify("Failed to update account. Please try again!", "error")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleDeleteAccount = (userID) => {
        setLoading(true)
        axios.delete(`${import.meta.env.VITE_HOST}/user/profile/delete-account?userID=${userID}`)
            .then(res => {
                const { status } = res
                if (status === 203) {
                    window.toastify("Account deleted successfully!", "success")
                    handleLogout()
                    navigate("/")
                }
            })
            .catch(err => {
                console.error("User deletion error: ", err.message)
                window.toastify("Failed to delete account. Please try again!", "error")
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
                            <span className='text-[22px] flex items-center gap-2'><AiOutlineDashboard />Dashboard</span>
                            <span className='text-[18px] font-normal text-[#666]'>/ Profile</span>
                        </p>
                    </h6>
                </div>

                <div className='flex justify-center items-center mt-8 mb-10'>
                    <div className="profile-container w-full max-w-[850px] min-h-[450px] flex bg-white rounded-[15px]">
                        <div className="profile-left bg-[#5271ff] flex flex-col items-center justify-center px-[70px] rounded-[15px]">
                            <div className='bg-[#fff] p-8 rounded-full'>
                                <span className='text-[80px] text-[#666]'><PiUser /></span>
                            </div>
                            <p className='!text-white font-bold !text-[20px] mt-5 mb-2'>{user?.username}</p>
                            <p className='!text-white font-bold !text-[20px] flex items-center gap-1'><PiUser /> Member</p>
                        </div>
                        <div className="profile-right px-[30px] py-[20px] flex flex-col flex-1 justify-between">
                            <div>
                                <h2 className='font-bold !text-[20px] !text-[#5271ff] border-b-2 border-gray-200 pb-2 flex items-center gap-2 mb-5'>Edit Profile <FiEdit /></h2>
                                <div className='profile-input'>
                                    <label htmlFor="username" className='font-bold !text-[#333] mb-2'>Username:</label>
                                    <input type="text" name="username" id="username" value={profileUser?.username} className='w-full p-[10px] text-[#666] border-2 border-gray-200 rounded-[8px] bg-white mt-2 mb-4' onChange={handleChange} />
                                </div>
                                <div className='profile-input'>
                                    <label htmlFor="email" className='font-bold !text-[#333] mb-2'>Email:</label>
                                    <input type="text" name="email" id="email" value={profileUser?.email} className='w-full p-[10px] text-[#666] border-2 border-gray-200 rounded-[8px] bg-white mt-2 mb-4' onChange={handleChange} />
                                </div>
                                <div className='profile-input'>
                                    <label htmlFor="withdrawalAccount" className='font-bold !text-[#333] mb-2'>Withdrawal Account:</label>
                                    <select name="withdrawalAccount" id="withdrawalAccount" value={profileUser?.withdrawalAccount} className='w-full p-[10px] font-normal text-[#666] border-2 border-gray-200 rounded-[8px] bg-white mt-2 mb-4' onChange={handleChange}>
                                        <option value="jazzcash" className='text-[#888]'>JazzCash</option>
                                        <option value="easypaisa" className='text-[#888]'>EasyPaisa</option>
                                        <option value="banktransfer" className='text-[#888]'>Bank Transfer</option>
                                    </select>
                                </div>
                                <div className='profile-input'>
                                    <label htmlFor="accountNumber" className='font-bold !text-[#333] mb-2'>Account Number:</label>
                                    <input type="text" name="accountNumber" id="accountNumber" value={profileUser?.accountNumber} className='w-full p-[10px] text-[#666] border-2 border-gray-200 rounded-[8px] bg-white mt-2 mb-4' onChange={handleChange} />
                                </div>
                            </div>
                            <div className='flex flex-col gap-3 mt-8'>
                                <button className='update-btn bg-[#5271ff] cursor-pointer w-full p-[10px] rounded-[8px] text-white hover:!bg-[#5272ff96]' onClick={() => handleUpdateAccount(profileUser.userID)}>Update Account</button>
                                <button className='delete-btn bg-[#ef4444] cursor-pointer w-full p-[10px] rounded-[8px] text-white hover:!bg-[#ef4444b6]' onClick={() => handleDeleteAccount(profileUser.userID)}>Delete Account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}