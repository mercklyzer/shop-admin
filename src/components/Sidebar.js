import React from "react"
import { useNavigate } from 'react-router-dom'

const Sidebar = (props) => {
    const navigate = useNavigate()

    return (
        <div className={`${props.className} bg-gray-200`}>
            <div className="sticky top-0 left-0">
                <div className="bg-slate-700 py-4 px-8 h-16 shadow-2xl">
                    <div className="font-semibold text-2xl text-white">Admin</div>
                </div>
                <div className="mt-4">
                    <div className="text-slate-700 text-sm font-bold px-8 my-4">NAVIGATION</div>
                    <ul className="">
                        <li className="cursor-pointer py-1 px-8 hover:bg-slate-700 hover:text-white group" onClick={() => navigate('/')}>
                            <span className="group-hover:px-4 duration-75 font-semibold">Dashboard</span>
                        </li>
                        <li className="cursor-pointer py-1 px-8 hover:bg-slate-700 hover:text-white group">
                            <span className="group-hover:px-4 duration-75 font-semibold">Analytics</span>
                        </li>
                        <li className="cursor-pointer py-1 px-8 hover:bg-slate-700 hover:text-white group">
                            <span className="group-hover:px-4 duration-75 font-semibold">Customers</span>
                        </li>
                        <li className="cursor-pointer py-1 px-8 hover:bg-slate-700 hover:text-white group" onClick={() => navigate('/products')}>
                            <span className="group-hover:px-4 duration-75 font-semibold">Products</span>
                        </li>
                        <li className="cursor-pointer py-1 px-8 hover:bg-slate-700 hover:text-white group">
                            <span className="group-hover:px-4 duration-75 font-semibold">Orders</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar