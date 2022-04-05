import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useSorter from '../hooks/useSorter'
import { getOrders } from "../apiCalls/order.apiCall"
import Status from "../components/Status"
import { useToken } from "../hooks/useToken"
import moment from 'moment-timezone'

const Orders = (props) => {
    const navigate = useNavigate()
    const token = useToken()
    const [orders, setOrders] = useState([])
    const [sorter, setSorter] = useSorter({
        orderDate: 'desc',
        user: '',
        status: '',
        amount: ''
    }, 'orderDate')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

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

            const [data, err] = await getOrders(token, chosenField, sort)
            if(data){
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
        <div className={props.className}>  
            <div className="p-6 shadow-xl bg-white rounded-lg">
                <div className="text-2xl font-bold">Orders</div>
            </div>
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
                                <td className="p-2 group-hover:font-semibold group-hover:text-slate-700">{moment(createdAt).calendar()}</td>
                                <td className=""><Status className="group-hover:font-semibold" status={status}/></td>
                                <td className="p-2 group-hover:font-semibold group-hover:text-slate-700">${total}.00</td>
                            </tr>))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Orders