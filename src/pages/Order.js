import React, { useEffect, useState } from "react";
import { getOrder } from "../apiCalls/order.apiCall";
import { useToken } from "../hooks/useToken";

const Order = ({id}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [order, setOrder] = useState()
    const token = useToken()

    useEffect(async () => {
        let [order, err] = await getOrder(token, id)
        console.log(order);
        setOrder(order)
    }, [])


    return (
        <div className="p-6 shadow-xl bg-white rounded-lg">
            <div className="text-2xl font-bold">Order: {id}</div>

            
        </div>
    )
}

export default Order