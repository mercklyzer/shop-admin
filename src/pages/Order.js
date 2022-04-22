import React, { useEffect, useState } from "react";
import { changeStatus, getOrder } from "../apiCalls/order.apiCall";
import Status from "../components/Status";
import { useToken } from "../hooks/useToken";
import moment from 'moment-timezone'
import OrderProduct from "../components/OrderProduct";
import { useNavigate } from "react-router-dom";
import {RotatingLines} from 'react-loader-spinner'

const Order = ({id, className}) => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [order, setOrder] = useState(null)
    const [showStatusOptions, setShowStatusOption] = useState(false)
    const token = useToken()

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            let [order, err] = await getOrder(token, id)
            console.log(order);
            console.log(err);
            setOrder(order)
            setIsLoading(false)
        }

        fetchData()
    }, [token, id])

    const onChangeStatus = async (newStatus) => {
        let [res, err] = await changeStatus(token, newStatus, id)
        if(res){
            setOrder(order => ({...order, status:newStatus}))
        }
        if(err){
            console.log(err);
        }
    } 

    return (
        <>
        {isLoading && <div className="w-full h-full flex items-center justify-center"><RotatingLines width="25"/></div>}
        {order && <div className={className}>
        <div className={`p-6 shadow-xl bg-white rounded-lg flex justify-between items-center`}>
            <div>
                <div className="text-2xl font-bold">Order ID: {id}</div>
                <div>{moment(order.createdAt).subtract(10, 'days').calendar()}</div>
            </div>
            <div className="text-lg font-semibold relative">
                Status: <Status className="cursor-pointer select-none" status={order.status} onClick={() => setShowStatusOption((val) => !val)}/>
                    <div className={`top-full right-0  flex-col absolute ${showStatusOptions && order.status === 'Pending'? 'flex': 'hidden'}`}>
                        <Status className="mt-2 block cursor-pointer" onClick={() => onChangeStatus('Completed')} status={'Completed'}/>
                    </div>
            </div>
        </div>

        <div className="p-6 shadow-xl bg-white rounded-lg mt-6">
            <table className="table-fixed ">
                <tbody>
                    <tr>
                        <td className="pr-4 text-xl font-bold">Customer:</td>
                        <td className="text-lg font-semibold cursor-pointer hover:underline" onClick={() => navigate(`/users/${order.user._id}`)}>{order.user.firstName} {order.user.lastName} ({order.user.username})</td>
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
        </div>}
        </>
    )
}

export default Order