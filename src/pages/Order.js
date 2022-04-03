import React, { useEffect, useState } from "react";
import { changeStatus, getOrder } from "../apiCalls/order.apiCall";
import Status from "../components/Status";
import { useToken } from "../hooks/useToken";
import moment from 'moment-timezone'
import OrderProduct from "../components/OrderProduct";

const Order = ({id}) => {
    // const [isLoading, setIsLoading] = useState(false)
    const [order, setOrder] = useState(null)
    const [showStatusOptions, setShowStatusOption] = useState(false)
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

    const onChangeStatus = async (newStatus) => {
        console.log("on change status");
        let [res, err] = await changeStatus(token, newStatus, id)
        if(res){
            setOrder(order => ({...order, status:newStatus}))
        }
        if(err){
            console.log(err);
        }
    } 


    return (
   
        order && <>
        <div className="p-6 shadow-xl bg-white rounded-lg flex justify-between items-center">
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