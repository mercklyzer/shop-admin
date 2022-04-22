import React from "react"
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