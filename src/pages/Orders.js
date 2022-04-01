import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProducts } from "../apiCalls/product.apiCall"
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
                        products && products.map(({_id, title, stock, price}, i) => <tr key={i}>
                            <td className="p-2 flex items-center">
                                <div className="font-semibold">AL0012343ORDER</div>
                            </td>
                            <td className="p-2">Lyzer Bautista</td>
                            <td className="p-2">12/12/2022</td>
                            <td className="">
                                <div 
                                    className="mr-4 inline-block px-4 py-1 bg-emerald-600 text-white rounded-lg cursor-pointer hover:bg-emerald-800 duration-150"
                                    onClick={() => navigate(`/products/edit/${_id}`)}
                                >
                                        Edit
                                </div>
                                <svg class="w-6 h-6 inline-block stroke-red-900 hover:stroke-red-600 duration-100 cursor-pointer" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </td>
                            <td className="p-2">${price}.00</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Orders