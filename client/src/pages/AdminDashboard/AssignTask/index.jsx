import React, { useEffect, useState } from 'react'
import { AiOutlineDashboard } from 'react-icons/ai';
import { LuSearch } from 'react-icons/lu';
import { useAuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import TableLoader from '../../../components/TableLoader';
import { Link } from 'react-router-dom';

export default function AssignTask() {

    const { user } = useAuthContext()
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [searchEmail, setSearchEmail] = useState("")
    const [searchedUser, setSearchedUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user?.userID) {
            fetchUsers(page)
        }
    }, [user, page])

    const fetchUsers = (page) => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/admin/fetch-users?page=${page}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setUsers(data?.users || [])
                    setTotalPages(Math.ceil(data?.totalUsers / 20))
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleSearchUser = e => {
        e.preventDefault()

        setLoading(true)
        setSearchedUser({})
        axios.get(`${import.meta.env.VITE_HOST}/admin/fetch-users/${searchEmail}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setSearchedUser(data?.user || {})
                }
            })
            .catch(err => {
                const { status, data } = err.response
                if (status === 404) {
                    return window.toastify(data.message, "error")
                } else {
                    console.error("Error fetching user:", err.message)
                    return window.toastify("An unexpected error occurred. Please try again.", "error")
                }
            })
            .finally(() => {
                setLoading(false)
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
                            <span className='text-[18px] font-normal text-[#666]'>/ Assign Task</span>
                        </p>
                    </h6>
                </div>

                <div className='flex justify-end items-center relative gap-5 mt-10'>
                    <div className='absolute right-3 h-[90%] flex items-center px-1'>
                        <LuSearch className='text-[#666]' />
                    </div>
                    <form onSubmit={handleSearchUser}>
                        <input type="text" name="searchEmail" id="searchEmail" value={searchEmail} placeholder='Search user by email' className='border border-gray-200 shadow-md px-3 py-2 rounded-[10px] w-[300px] bg-white' onChange={(e) => setSearchEmail(e.target.value.trim())} />
                    </form>
                </div>

                <div className="table-div flex flex-col mt-5 mb-10 border border-gray-200 rounded-[10px]">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden rounded-[10px]">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className='bg-[#5272ffa3]'>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">UID</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">Username</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">Email</th>
                                            <th scope="col" className="px-6 py-3 text-start text-[13px] font-bold text-[#fff] uppercase">Points</th>
                                            <th scope="col" className="px-6 py-3 text-end text-[13px] font-bold text-[#fff] uppercase">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            loading ?
                                                <TableLoader />
                                                :
                                                (
                                                    users.length > 0 ?
                                                        (

                                                            !searchedUser.userID ?
                                                                users.map(user => {
                                                                    const { userID, username, email, points } = user
                                                                    return (
                                                                        <tr key={userID} className="odd:bg-white even:bg-[#f3f6ff] hover:bg-[#f3f6ff]">
                                                                            <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>{userID}</span></td>
                                                                            <td className="px-6 py-4 whitespace-normal text-[14px]  text-[#666]"><span className='text-ellipsis line-clamp-2'>{username}</span></td>
                                                                            <td className="px-6 py-4 whitespace-nowrap text-start text-[14px] text-[#666]"><span>{email}</span></td>
                                                                            <td className="px-6 py-4 whitespace-nowrap text-start text-[14px] text-[#666]"><span>{points.toFixed(2)}</span></td>
                                                                            <td className="px-6 py-4 whitespace-nowrap text-end text-[14px] text-[#666]">
                                                                                <Link to={`/admin/assign-task/${userID}`} className='bg-[#5272ffa3] !text-white font-bold px-3 py-2 w-fit rounded-[5px] !shadow-md transition-all !duration-150 hover:bg-[#666]'>Assign Task</Link>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                                :
                                                                <tr key={searchedUser.userID} className="odd:bg-white even:bg-[#f3f6ff] hover:bg-[#f3f6ff]">
                                                                    <td className="px-6 py-4 whitespace-nowrap text-[14px]  text-[#666]"><span>{searchedUser.userID}</span></td>
                                                                    <td className="px-6 py-4 whitespace-normal text-[14px  text-[#666]"><span className='text-ellipsis line-clamp-2'>{searchedUser.username}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-start text-[14px] text-[#666]"><span>{searchedUser.email}</span></td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-end text-[14px] text-[#666]">
                                                                        <Link to={`/admin/assign-task/${searchedUser.userID}`} className='bg-[#5272ffa3] !text-white font-bold px-3 py-2 w-fit rounded-[5px] !shadow-md transition-all !duration-150 hover:bg-[#666]'>Assign Task</Link>
                                                                    </td>
                                                                </tr>
                                                        )
                                                        :
                                                        <tr>
                                                            <td colSpan="9" className='px-3 py-5 text-center'>
                                                                <p>No users avaiable!</p>
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