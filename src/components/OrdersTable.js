import React, { useEffect, useState } from "react";
import useSorter from "../hooks/useSorter";
import Status from "./Status";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";
import { getOrders, getUserOrders } from "../apiCalls/order.apiCall";
import { useToken } from "../hooks/useToken";

const OrdersTable = ({userId}) => {
    const navigate = useNavigate()
    const token = useToken()
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [sorter, setSorter] = useSorter({
        orderDate: 'desc',
        user: '',
        status: '',
        amount: ''
    }, 'orderDate')

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            let fields = Object.keys(sorter)
            let chosenField = ''
            let sort = ''
            for(let field of fields){
                if(sorter[field] !== ''){
                    chosenField = field
                    sort = sorter[field]
                    break;
                }
            }

            const [data, err] = userId? await getUserOrders(token, userId, chosenField, sort) : await getOrders(token, chosenField, sort)
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
    }, [sorter])

    return (
        <div className="mt-6 p-6 shadow-xl bg-white rounded-lg">
            <table className="w-full">
                <thead>
                    <tr className="">
                        <th className="text-left p-2 text-lg">ID</th>
                    
                        {[
                            {field: 'User', value: 'user'},
                            {field: 'Order Date', value: 'orderDate'},
                            {field: 'Status', value: 'status'},
                            {field: 'Amount', value: 'amount'},
                        ].map(({field, value}, i) => {
                            if(sorter[value] !== 'desc'){
                                return <th className="text-left p-2 text-lg" key={i}>
                                    {field}
                                    <svg 
                                    onClick={() => setSorter(value)}
                                    className={`ml-2 w-6 h-6 inline ${sorter[value]? 'stroke-primary-400': 'stroke-gray-400'} cursor-pointer`} 
                                    fill="none" stroke="" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg>
                                </th>
                            }

                            else if(sorter[value] === 'desc'){
                                return <th className="text-left p-2 text-lg" key={i}>
                                    {field}
                                    <svg 
                                    onClick={() => setSorter(value)} 
                                    className={`ml-2 w-6 h-6 inline stroke-primary-400 cursor-pointer`} 
                                    fill="none" stroke="" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path></svg>
                                </th>
                            }
                        })}

                    </tr>
                </thead>
                {orders && <tbody>
                    {
                        orders.map(({_id, user, createdAt, status, total}, i) => (
                        <tr 
                            className="rounded-full group hover:bg-primary-100 cursor-pointer" 
                            key={i}
                            onClick={() => navigate(`/orders/${_id}`)}
                        >
                            <td className="p-2 flex items-center">
                                <div className="font-semibold">{_id}</div>
                            </td>
                            <td className="p-2 font-semibold group-hover:text-slate-700">{user.firstName} {user.lastName}</td>
                            <td className="p-2 group-hover:font-semibold group-hover:text-slate-700">{moment(createdAt).calendar()}</td>
                            <td className=""><Status className="group-hover:font-semibold" status={status}/></td>
                            <td className="p-2 group-hover:font-semibold group-hover:text-slate-700">${total}.00</td>
                        </tr>))
                    }
                </tbody>}
            </table>
            
            {isLoading && <div className="flex w-full justify-center items-center">Fetching data...</div>}
            {orders.length === 0 && !isLoading && <div className="flex w-full justify-center items-center">No orders yet.</div>}
        </div>
    )
}

export default OrdersTable