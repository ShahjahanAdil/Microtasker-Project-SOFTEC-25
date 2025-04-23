import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineDashboard } from 'react-icons/ai';
import { useAuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import TableLoader from '../../../components/TableLoader';

export default function Payments() {

    const { user } = useAuthContext()
    const [withdraws, setWithdraws] = useState([])
    const [acceptID, setAcceptID] = useState("")
    const [rejectID, setRejectID] = useState("")
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const [acceptLoading, setAcceptLoading] = useState(false)
    const [rejectLoading, setRejectLoading] = useState(false)

    useEffect(() => {
        if (user.userID) {
            fetchWithdraws(page)
        }
    }, [user, page])

    const fetchWithdraws = useCallback((page) => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/admin/payments?page=${page}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setWithdraws(data?.totalUserWithdraws)
                    setTotalPages(Math.ceil(data?.totalWithdraws / 15))
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const handleAcceptWithdraw = (withdrawID, userID, withdrawAmount) => {
        setAcceptLoading(true)
        setAcceptID(withdrawID)

        axios.patch(`${import.meta.env.VITE_HOST}/admin/payments/accept?withdrawID=${withdrawID}&userID=${userID}&withdrawAmount=${withdrawAmount}`)
            .then(res => {
                const { status, data } = res
                if (status === 202) {
                    const updatedWithdraws = withdraws.map(withdraw =>
                        withdraw.withdrawID === withdrawID ? { ...withdraw, withdrawStatus: "completed" } : withdraw
                    )
                    setWithdraws(updatedWithdraws)
                }
                window.toastify(data.message, "success")
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                window.toastify(err.response.data.message, "error")
            })
            .finally(() => {
                setAcceptLoading(false)
                setAcceptID("")
            })
    }

    const handleRejectWithdraw = (withdrawID, userID, withdrawAmount) => {
        setRejectLoading(true)
        setRejectID(withdrawID)
        axios.patch(`${import.meta.env.VITE_HOST}/admin/payments/reject?withdrawID=${withdrawID}&userID=${userID}&withdrawAmount=${withdrawAmount}`)
            .then(res => {
                const { status, data } = res
                if (status === 202) {
                    const updatedWithdraws = withdraws.map(withdraw =>
                        withdraw.withdrawID === withdrawID ? { ...withdraw, withdrawStatus: "cancelled" } : withdraw
                    )
                    setWithdraws(updatedWithdraws)
                }
                window.toastify(data.message, "success")
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                window.toastify(err.response.data.message, "error")
            })
            .finally(() => {
                setRejectLoading(false)
                setRejectID("")
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
                            <span className='text-[22px]'><AiOutlineDashboard /></span> Dashboard
                            <span className='text-[18px] font-normal text-[#666]'>/ Payments</span>
                        </p>
                    </h6>
                </div>

                <div className="table-div flex flex-col mt-12 border border-gray-200 rounded-[15px]">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden rounded-[15px]">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className='bg-[#5271ff]'>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">TID</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">Requested From</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">Requested On</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">Status</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">Withdrawal Method</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">Withdrawal Account</th>
                                            <th scope="col" className="px-6 py-3 text-end text-[13px] font-bold text-[#fff] uppercase">Amount</th>
                                            <th scope="col" className="px-6 py-3 text-end text-[13px] font-bold text-[#fff] uppercase">Actions</th>
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
                                                            const { withdrawID, userID, userEmail, createdAt, withdrawStatus, withdrawAmount, withdrawalAccount, withdrawalAccountNumber } = withdraw
                                                            const date = createdAt?.slice(0, 10)
                                                            const time = createdAt?.slice(11, 16)
                                                            const datetime = date + " " + time
                                                            return (
                                                                <tr key={withdrawID} className="odd:bg-white even:bg-[#f3f6ff] hover:bg-[#f3f6ff]">
                                                                    <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>{withdrawID}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>{userEmail}</span></td>
                                                                    <td className="px-6 py-4 whitespace-normal text-[14px]  text-[#666]"><span>{datetime}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>{withdrawStatus}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>{withdrawalAccount}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>{withdrawalAccountNumber}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>${withdrawAmount}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666] flex gap-2">
                                                                        <button className='bg-[#ef4444] text-white font-bold !text-[15px] px-3 py-1 rounded-[5px] cursor-pointer shadow-md transition-all !duration-150 hover:!bg-[#ef4444c0]' disabled={rejectLoading} onClick={() => handleRejectWithdraw(withdrawID, userID, withdrawAmount)}>
                                                                            {
                                                                                rejectID === withdrawID && rejectLoading ? "Rejecting..." : "Reject"
                                                                            }
                                                                        </button>
                                                                        <button className='bg-[#33d846] text-white font-bold !text-[15px] px-3 py-1 rounded-[5px] cursor-pointer shadow-md transition-all !duration-150 hover:!bg-[#33d846c1]' disabled={acceptLoading} onClick={() => handleAcceptWithdraw(withdrawID, userID, withdrawAmount)}>
                                                                            {
                                                                                acceptID === withdrawID && acceptLoading ? "Accepting..." : "Accept"
                                                                            }
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        :
                                                        <tr>
                                                            <td colSpan="9" className='px-3 py-5 text-center'>
                                                                <p>No withdraw request has been created yet!</p>
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
            </div>
        </div>
    )
}