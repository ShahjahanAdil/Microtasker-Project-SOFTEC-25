import React, { useEffect, useState } from 'react'
import './payments.css'
import { AiOutlineDashboard } from 'react-icons/ai'
import { FaHistory, FaWallet } from 'react-icons/fa'
import { LuInfo } from 'react-icons/lu'
import { PiClockFill, PiCurrencyDollarFill } from 'react-icons/pi'
import { useAuthContext } from '../../../contexts/AuthContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import TableLoader from '../../../components/TableLoader'

const generateRandomID = () => Math.random().toString(16).slice(9)

export default function Payments() {

    const { user } = useAuthContext()
    const [userAccount, setUserAccount] = useState({})
    const [withdraws, setWithdraws] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const [withdrawLoading, setWithdrawLoading] = useState(false)

    useEffect(() => {
        if (user.userID) {
            fetchUserAccount()
        }
    }, [user])

    useEffect(() => {
        if (user.userID) {
            fetchWithdraws(page)
        }
    }, [user, page])

    const fetchUserAccount = () => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/user/payments?userID=${user?.userID}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setUserAccount(data?.userAccountDets)
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const fetchWithdraws = (page) => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/user/payments/withdraws?userID=${user?.userID}&page${page}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setWithdraws(data?.userWithdraws)
                    setTotalPages(Math.ceil(data?.totalWithdraws / 10))
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleWithdraw = () => {
        if (!user?.withdrawalAccount || !user?.accountNumber) {
            return window.toastify("Please select a withdrawal method first!", "info")
        }

        const withdrawAmount = userAccount.availableBalance
        if (withdrawAmount <= 0) {
            return window.toastify("Insufficient available balance!", "warning")
        }

        const newWithdraw = {
            withdrawID: generateRandomID(),
            userID: user.userID,
            userEmail: user.email,
            withdrawStatus: "pending",
            withdrawAmount,
            withdrawalAccount: user.withdrawalAccount,
            withdrawalAccountNumber: user.accountNumber
        }

        setWithdrawLoading(true)
        axios.post(`${import.meta.env.VITE_HOST}/user/payments`, newWithdraw)
            .then(res => {
                const { status, data } = res
                if (status === 201) {
                    setUserAccount(prev => ({
                        ...prev,
                        availableBalance: 0,
                        pendingAmount: withdrawAmount + prev?.pendingAmount || 0
                    }))
                    setWithdraws(prev => ([
                        ...prev,
                        newWithdraw
                    ]))
                    window.toastify(data.message, "success")
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                window.toastify(err.response.data.message, "error")
            })
            .finally(() => {
                setWithdrawLoading(false)
            })
    }

    const renderPageNumbers = () => {
        const pages = []
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`px-3 py-1 rounded-[5px] cursor-pointer hover:!bg-[#666] hover:!text-white ${page === i ? 'bg-[#5271ff] text-white' : 'bg-[#e8e8e8] !text-[#666]'}`}
                    onClick={() => setPage(i)}
                >
                    {i}
                </button>
            )
        }
        return pages
    }

    return (
        <div className='dashboard-container'>
            <div className="inner-container">

                {/* banner */}
                <div className='p-3 rounded-[5px]'>
                    <h6 className='font-bold text-[20px] text-[#333] flex items-center gap-2'>
                        <p className='flex items-center gap-2'>
                            <span className='text-[22px] flex items-center gap-2'><AiOutlineDashboard />Dashboard</span>
                            <span className='text-[18px] font-normal text-[#666]'>/ Payments</span>
                        </p>
                    </h6>
                </div>

                <div className='amount-divs mt-8'>
                    <div className='amount-div flex flex-col items-center justify-center gap-2  rounded-[15px]'>
                        <p className='flex items-center gap-2 font-bold !text-[16px]'><FaWallet className='text-[#5271ff]' /> Avaiable Balance</p>
                        {
                            loading ?
                                <div className='p-2 bg-neutral-200 w-20 rounded-[5px] animate-pulse'></div>
                                :
                                <p className='font-bold !text-[#666] !text-[16px]'>${userAccount?.availableBalance.toFixed(2)}</p>
                        }
                    </div>
                    <div className='amount-div flex flex-col items-center justify-center gap-2  rounded-[15px]'>
                        <p className='flex items-center gap-2 font-bold !text-[16px]'><PiClockFill className='text-[#f7c348]' /> Pending Withdraw</p>
                        {
                            loading ?
                                <div className='p-2 bg-neutral-200 w-20 rounded-[5px] animate-pulse'></div>
                                :
                                <p className='font-bold !text-[#666] !text-[16px]'>${userAccount?.pendingAmount.toFixed(2)}</p>
                        }
                    </div>
                    <div className='amount-div flex flex-col items-center justify-center gap-2  rounded-[15px]'>
                        <p className='flex items-center gap-2 font-bold !text-[16px]'><PiCurrencyDollarFill className='text-[#32e149]' /> Total Withdrawal</p>
                        {
                            loading ?
                                <div className='p-2 bg-neutral-200 w-20 rounded-[5px] animate-pulse'></div>
                                :
                                <p className='font-bold !text-[#666] !text-[16px]'>${userAccount?.totalWithdrawal.toFixed(2)}</p>
                        }
                    </div>
                </div>

                <div className='mt-10'>
                    {
                        user.withdrawalAccount && user.accountNumber ?
                            <>
                                <p className='mb-2 flex gap-2 items-center !text-[18px] font-bold'><LuInfo className='text-[#0093e9]' /> Your withdrawal account information:</p>
                                <p className='!text-[16px] font-bold indent-7'>Withdrawal Account: <span className=' text-[#333] font-normal capitalize'>{user?.withdrawalAccount}</span></p>
                                <p className='!text-[16px] font-bold indent-7'>Account Number: <span className='text-[16px] text-[#333] font-normal'>{user?.accountNumber}</span></p>
                            </> :
                            <>
                                <p className='flex gap-2 items-center bg-red-100 px-2 py-1 w-fit border border-red-200 rounded-[8px]'><LuInfo className='text-[#ef4444]' /> You didn't set your withdrawal account yet. Choose <Link to="/user/profile" className='!text-[#5271ff] hover:underline'>withdrawal method</Link> before requesting a withdraw.</p>
                            </>
                    }
                </div>

                <div className='border-b border-gray-300 mt-8 pb-8'>
                    <button className='bg-[#17e053e0] text-[#fff] w-full p-3 rounded-[8px] shadow-md cursor-pointer transition-all !duration-200 hover:!bg-[#17e0439e] hover:shadow-lg' disabled={withdrawLoading} onClick={handleWithdraw}>
                        {
                            !withdrawLoading ?
                                "Withdraw" :
                                "Withdrawing..."
                        }
                    </button>
                </div>

                <h5 className='mt-12 mb-5 !text-[18px] font-bold flex gap-2 items-center'><FaHistory className='text-[#32e149]' /> Withdraw History</h5>

                <div className="table-div flex flex-col border border-gray-200 rounded-[15px]">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden rounded-[15px]">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className='bg-[#5271ff]'>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">TID</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">Date</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">Status</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">Amount</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase whitespace-nowrap">Withdrawal Method</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase whitespace-nowrap">Withdrawal Account</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            loading ?
                                                <TableLoader />
                                                :
                                                (
                                                    withdraws.length > 0 ?
                                                        withdraws.map(withdraw => {
                                                            const { withdrawID, createdAt, withdrawStatus, withdrawAmount, withdrawalAccount, withdrawalAccountNumber } = withdraw
                                                            const date = createdAt?.slice(0, 10)
                                                            const time = createdAt?.slice(11, 16)
                                                            const datetime = date + " " + time
                                                            return (
                                                                <tr key={withdrawID} className="odd:bg-white even:bg-[#f3f6ff] hover:bg-[#f3f6ff]">
                                                                    <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>{withdrawID}</span></td>
                                                                    <td className="px-6 py-4 whitespace-normal text-[14px]  text-[#666]"><span>{datetime}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>{withdrawStatus}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>${withdrawAmount}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>{withdrawalAccount}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>{withdrawalAccountNumber}</span></td>
                                                                </tr>
                                                            )
                                                        })
                                                        :
                                                        <tr>
                                                            <td colSpan="9" className='px-3 py-5 text-center'>
                                                                <p>No withdraw request created yet!</p>
                                                            </td>
                                                        </tr>
                                                )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    !loading &&
                    (
                        totalPages > 1 &&
                        <div className='flex flex-wrap my-5 items-center justify-center gap-1'>
                            {renderPageNumbers()}
                        </div>
                    )
                }

                <div className='mt-8 mb-10'>
                    <p className='mb-2 flex gap-2 items-center font-bold !text-[18px]'><LuInfo className='text-[#0093e9]' /> Status Info:</p>
                    <ul>
                        <li className='flex gap-2 items-center'>
                            <p className='!text-[16px] font-bold'>Pending:</p>
                            <p className='!text-[16px] text-[#666] font-normal'>Your request is being reviewed by the admin</p>
                        </li>
                        <li className='flex gap-2 items-center'>
                            <p className='!text-[16px] font-bold'>Completed:</p>
                            <p className='!text-[16px] text-[#666] font-normal'>Your withdrawal has been sent to your account</p>
                        </li>
                        <li className='flex gap-2 items-center'>
                            <p className='!text-[16px] font-bold'>Cancelled:</p>
                            <p className='!text-[16px] text-[#666] font-normal'>Your request has been cancelled by the admin</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}