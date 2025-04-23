import React, { useEffect, useState } from 'react'
import { AiOutlineDashboard } from 'react-icons/ai'
import { useAuthContext } from '../../../contexts/AuthContext'
import axios from 'axios'
import TableLoader from '../../../components/TableLoader'


export default function CompletedTasks() {

    const { user } = useAuthContext()
    const [completedTasks, setCompletedTasks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user.userID) {
            handleFetchData()
        }
    }, [user])

    const handleFetchData = () => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/user/completed-tasks?userID=${user?.userID}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setCompletedTasks(data?.completedTs)
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className='dashboard-container'>
            <div className="inner-container">

                {/* banner */}
                <div className='p-3 rounded-[5px]'>
                    <h6 className='font-bold text-[20px] text-[#333] flex items-center gap-2'>
                        <p className='flex items-center gap-2'>
                            <span className='text-[22px] flex items-center gap-2'><AiOutlineDashboard />Dashboard</span>
                            <span className='text-[18px] font-normal text-[#666]'>/ Completed Tasks</span>
                        </p>
                    </h6>
                </div>

                <div className="table-div flex flex-col mt-10 border border-gray-200 rounded-[10px]">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden rounded-[10px]">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className='bg-[#5272ffa3]'>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">#</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">Title</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase whitespace-nowrap">Completed On</th>
                                            <th scope="col" className="px-6 py-3 text-end text-[13px] font-bold text-[#fff] uppercase">Points</th>
                                            <th scope="col" className="px-6 py-3 text-end text-[13px] font-bold text-[#fff] uppercase">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            loading ?
                                                <TableLoader />
                                                :
                                                (
                                                    completedTasks?.length > 0 ?
                                                        (
                                                            completedTasks.map((task, i) => {
                                                                const { taskID, taskTitle, updatedAt, taskPoints, taskPrice } = task
                                                                const date = updatedAt.slice(0, 10)
                                                                const time = updatedAt.slice(11, 16)
                                                                const datetime = date + " " + time
                                                                return (
                                                                    <tr key={taskID} className="odd:bg-white even:bg-[#f3f6ff] hover:bg-[#f3f6ff]">
                                                                        <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>{i + 1}</span></td>
                                                                        <td className="px-6 py-4 whitespace-normal text-[14px]  text-[#666]"><span>{taskTitle}</span></td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>{datetime}</span></td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-end text-[14px] text-[#666]"><span>{taskPoints}</span></td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-end text-[14px] text-[#666]"><span>${taskPrice}</span></td>
                                                                    </tr>
                                                                )
                                                            })
                                                        )
                                                        :
                                                        <tr>
                                                            <td colSpan="9" className='px-3 py-5 text-center'>
                                                                <p className='text-[#ef4444]'>No tasks completed yet!</p>
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
            </div>
        </div>
    )
}