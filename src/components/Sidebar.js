import React from "react"

const Sidebar = (props) => {
    return (
        <div className={`${props.className} h-[100vh] bg-zinc-200`}>
            <div className="bg-slate-700 py-4 px-8">
                <div className="font-semibold text-2xl text-white">Admin</div>
            </div>
            <div className="mt-4">
                <div className="text-slate-700 text-sm font-bold px-8 py-2">NAVIGATION</div>
                <ul className="">
                    <li className="cursor-pointer py-1 px-8 hover:bg-slate-700 hover:text-white group"><span className="group-hover:px-4 duration-75">Dashboard</span></li>
                    <li className="cursor-pointer py-1 px-8 hover:bg-slate-700 hover:text-white group"><span className="group-hover:px-4 duration-75">Analytics</span></li>
                    <li className="cursor-pointer py-1 px-8 hover:bg-slate-700 hover:text-white group"><span className="group-hover:px-4 duration-75">Customers</span></li>
                    <li className="cursor-pointer py-1 px-8 hover:bg-slate-700 hover:text-white group"><span className="group-hover:px-4 duration-75">Products</span></li>
                    <li className="cursor-pointer py-1 px-8 hover:bg-slate-700 hover:text-white group"><span className="group-hover:px-4 duration-75">Orders</span></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar