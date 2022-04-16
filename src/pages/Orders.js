import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useSorter from '../hooks/useSorter'
import { getOrders } from "../apiCalls/order.apiCall"
import Status from "../components/Status"
import { useToken } from "../hooks/useToken"
import moment from 'moment-timezone'
import OrdersTable from "../components/OrdersTable"

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
            <OrdersTable />
        </div>
    )
}

export default Orders