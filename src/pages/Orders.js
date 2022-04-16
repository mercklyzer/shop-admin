import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useSorter from '../hooks/useSorter'
import { getOrders } from "../apiCalls/order.apiCall"
import Status from "../components/Status"
import { useToken } from "../hooks/useToken"
import moment from 'moment-timezone'
import OrdersTable from "../components/OrdersTable"

const Orders = (props) => {

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