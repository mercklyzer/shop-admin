import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProducts } from "../apiCalls/product.apiCall"
import { useToken } from "../hooks/useToken"

const Products = (props) => {
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
            <div className="text-2xl font-bold">Products</div>

            <div className="flex justify-center items-cecnter">
                <div 
                    className="px-4 py-2 bg-cyan-700 text-white rounded-lg cursor-pointer mt-6 mb-12 hover:bg-cyan-900 duration-100"
                    onClick={() => navigate('/products/add')}
                >
                    Add New Product
                </div>
            </div>

            <table className="w-full">
                <thead>
                    <tr className="">
                        <th className="text-left p-2 text-lg">Product</th>
                        <th className="text-left p-2 text-lg">Category</th>
                        <th className="text-left p-2 text-lg">Stock</th>
                        <th className="text-left p-2 text-lg">Price</th>
                        <th className="text-left p-2 text-lg">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products && products.map(({_id, title, category, stock, price}, i) => <tr key={i}>
                            <td className="p-2 flex items-center">
                                <div className="w-10 h-10 bg-red-900 rounded-full"></div>
                                <div className="ml-4 font-semibold">{title}</div>
                            </td>
                            <td className="p-2 capitalize">{category}</td>
                            <td className="p-2">{stock}</td>
                            <td className="p-2">${price}.00</td>
                            <td className="">
                                <div 
                                    className="mr-4 inline-block px-4 py-1 bg-emerald-600 text-white rounded-lg cursor-pointer hover:bg-emerald-800 duration-150"
                                    onClick={() => navigate(`/products/edit/${_id}`)}
                                >
                                        Edit
                                </div>
                                <svg class="w-6 h-6 inline-block stroke-red-900 hover:stroke-red-600 duration-100 cursor-pointer" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Products