import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProducts } from "../apiCalls/product.apiCall"
import Status from "../components/Status"
import { useToken } from "../hooks/useToken"

const Orders = (props) => {
    const navigate = useNavigate()
    const token = useToken()
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(async () => {
        setIsLoading(true)
        const [data, err] = await getProducts(token)
        if(data){
            console.log(data);
            setProducts(data)
        }
        if(err){
            setError(err)
        }
        setIsLoading(false)
        
    }, [])


    return (
        <div className="p-6 shadow-xl bg-white rounded-lg">
            <div className="text-2xl font-bold">Orders</div>

            <table className="w-full mt-16">
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
                        products && products.map(({_id, title, stock, price}, i) => <tr className="rounded-full group hover:bg-primary-100 cursor-pointer" key={i}>
                            <td className="p-2 flex items-center">
                                <div className="font-semibold">AL0012343ORDER</div>
                            </td>
                            <td className="p-2 group-hover:font-semibold group-hover:text-slate-700">Lyzer Bautista</td>
                            <td className="p-2 group-hover:font-semibold group-hover:text-slate-700">12/12/2022</td>
                            <td className=""><Status status='Completed'/></td>
                            <td className="p-2 group-hover:font-semibold group-hover:text-slate-700">${price}.00</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Orders