import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getOrders } from "../apiCalls/order.apiCall"
import Status from "../components/Status"
import { useToken } from "../hooks/useToken"
import moment from 'moment-timezone'

const Orders = (props) => {
    const navigate = useNavigate()
    const token = useToken()
    const [orders, setOrders] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const [data, err] = await getOrders(token)
            if(data){
                console.log(data);
                setOrders(data)
            }
            if(err){
                setError(err)
            }
            setIsLoading(false)
        }

        fetchData()        
    }, [])


    return (
        <>
        
        <div className="p-6 shadow-xl bg-white rounded-lg">
            <div className="text-2xl font-bold">Orders</div>
        </div>
        <div className="mt-6 p-6 shadow-xl bg-white rounded-lg">
            <table className="w-full">
                <thead>
                    <tr className="">
                        <th className="text-left p-2 text-lg">ID</th>
                        <th className="text-left p-2 text-lg">User</th>
                        <th className="text-left p-2 text-lg">Order Date</th>
                        <th className="text-left p-2 text-lg">Status</th>
                        <th className="text-left p-2 text-lg">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders && orders.map(({_id, createdAt, status, total}, i) => (
                        <tr 
                            className="rounded-full group hover:bg-primary-100 cursor-pointer" 
                            key={i}
                            onClick={() => navigate(`/orders/${_id}`)}
                        >
                            <td className="p-2 flex items-center">
                                <div className="font-semibold">{_id}</div>
                            </td>
                            <td className="p-2 group-hover:font-semibold group-hover:text-slate-700">Lyzer Bautista</td>
                            <td className="p-2 group-hover:font-semibold group-hover:text-slate-700">{moment(createdAt).subtract(10, 'days').calendar()}</td>
                            <td className=""><Status className="group-hover:font-semibold" status={status}/></td>
                            <td className="p-2 group-hover:font-semibold group-hover:text-slate-700">${total}.00</td>
                        </tr>))
                    }
                </tbody>
            </table>
        </div>
        </>
    )
}

export default Orders