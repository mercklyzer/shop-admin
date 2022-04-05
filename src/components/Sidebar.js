import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'

const Sidebar = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch({type: 'USER_LOGOUT'})
        navigate('/login')
    }

    return (
        <div className={`${props.className} bg-primary-200 h-screen px-4 lg:px-4 xl:px-8 py-4 flex flex-col justify-between`}>
            <div className="text-lg font-bold text-center">ADMIN</div>
            <ul className="py-4 flex flex-col justify-start flex-1">
                <li className=" cursor-pointer p-4 mt-6 hover:bg-primary-400 hover:text-white group flex justify-center custom-1:justify-start bg-white rounded-lg" onClick={() => navigate('/')}>
                    <svg className="w-6 h-6 custom-1:mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    <span className="group-hover:ml-4 duration-75 font-semibold hidden custom-1:block">Dashboard</span>
                </li>
                <li className="cursor-pointer p-4 mt-6 hover:bg-primary-400 hover:text-white group flex justify-center custom-1:justify-start bg-white rounded-lg" onClick={() => navigate('/users')}>
                    <svg className="w-6 h-6 custom-1:mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    <span className="group-hover:ml-4 duration-75 font-semibold hidden custom-1:block">Users</span>
                </li>
                <li className="cursor-pointer p-4 mt-6 hover:bg-primary-400 hover:text-white group flex justify-center custom-1:justify-start bg-white rounded-lg" onClick={() => navigate('/products')}>
                    <svg className="w-6 h-6 custom-1:mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    <span className="group-hover:ml-4 duration-75 font-semibold hidden custom-1:block">Products</span>
                </li>
                <li className="cursor-pointer p-4 mt-6 hover:bg-primary-400 hover:text-white group flex justify-center custom-1:justify-start bg-white rounded-lg" onClick={() => navigate('/orders')}>
                    <svg className="w-6 h-6 custom-1:mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path></svg>
                    <span className="group-hover:ml-4 duration-75 font-semibold hidden custom-1:block">Orders</span>
                </li>
            </ul>
            <div className="cursor-pointer p-4 mt-6 hover:bg-primary-400 hover:text-white group flex justify-center custom-1:justify-start bg-white rounded-lg" onClick={onLogout}>
                <svg className="w-6 h-6 custom-1:mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                <span className="group-hover:ml-4 duration-75 font-semibold hidden custom-1:block">Logout</span>
            </div>
        </div>
    )
}

export default Sidebar