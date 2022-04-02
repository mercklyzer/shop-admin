import React, { useEffect, useState } from "react";
import { getOrder } from "../apiCalls/order.apiCall";
import Status from "../components/Status";
import { useToken } from "../hooks/useToken";
import moment from 'moment-timezone'
import OrderProduct from "../components/OrderProduct";

const Order = ({id}) => {
    // const [isLoading, setIsLoading] = useState(false)
    const [order, setOrder] = useState(null)
    const token = useToken()

    useEffect(() => {
        const fetchData = async () => {
            let [order, err] = await getOrder(token, id)
            console.log(order);
            console.log(err);
            setOrder(order)
        }

        fetchData()
    }, [token, id])


    return (
   
        order && <>
        <div className="p-6 shadow-xl bg-white rounded-lg flex justify-between items-center">
            <div>
                <div className="text-2xl font-bold">Order ID: {id}</div>
                <div>{moment(order.createdAt).subtract(10, 'days').calendar()}</div>
            </div>
            <div className="text-lg font-semibold">Status: <Status status={order.status}/></div>
        </div>

        <div className="p-6 shadow-xl bg-white rounded-lg mt-6">
            <table className="table-fixed ">
                <tbody>
                    <tr>
                        <td className="pr-4 text-xl font-bold">Customer:</td>
                        <td className="text-lg font-semibold">{order.user.username}</td>
                    </tr>
                    <tr>
                        <td className="pr-4 text-xl font-bold">Address:</td>
                        <td className="text-lg">{order.address}</td>
                    </tr>
                    <tr>
                        <td className="pr-4 text-xl font-bold">Total:</td>
                        <td className="text-lg">${order.total}.00</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="p-6 shadow-xl bg-white rounded-lg mt-6">
            {order.products.map(({quantity, total, product}, i) => <OrderProduct 
                id={product._id} 
                title={product.title} 
                quantity={quantity} 
                total={total} 
                displayImg={product.displayImg} 
                key={i}
            />)}
        </div>
        </>
    )
}

export default Order