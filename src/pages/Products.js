import moment from "moment-timezone"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProducts } from "../apiCalls/product.apiCall"
import useSorter from "../hooks/useSorter"
import { useToken } from "../hooks/useToken"
import {RotatingLines} from 'react-loader-spinner'

const Products = (props) => {
    const navigate = useNavigate()
    const token = useToken()
    const [products, setProducts] = useState([])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [sorter, setSorter] = useSorter({
        product: 'asc',
        category: '',
        stock: '',
        price: '',
        lastModified: ''
    }, 'product')

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
    
            const [data, err] = await getProducts(token, chosenField, sort)
            console.log(data);
            if(data){
                setProducts(data)
            }
            if(err){
                console.log(err);
                setIsError(true)
            }
            setIsLoading(false)
        }

        fetchData()        
    }, [sorter])


    return (
        <div className={`p-6 shadow-xl bg-white rounded-lg ${props.className}`}>
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
                        {
                            [
                                {field: 'Product', value: 'product'},
                                {field: 'Category', value: 'category'},
                                {field: 'Stock', value: 'stock'},
                                {field: 'Price', value: 'price'},
                                {field: 'Last Modified', value: 'lastModified'}
                            ].map(({field, value}, i) => {
                                if(sorter[value] !== 'desc'){
                                    return <th className="text-left p-2 text-lg" key={i}>
                                        {field}
                                        <svg 
                                        onClick={() => setSorter(value)}
                                        className={`ml-2 w-6 h-6 inline ${sorter[value]? 'stroke-primary-400': 'stroke-gray-400'} cursor-pointer`} 
                                        fill="none" stroke="" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg>
                                    </th>
                                }

                                else if(sorter[value] === 'desc'){
                                    return <th className="text-left p-2 text-lg" key={i}>
                                        {field}
                                        <svg 
                                        onClick={() => setSorter(value)} 
                                        className={`ml-2 w-6 h-6 inline stroke-primary-400 cursor-pointer`} 
                                        fill="none" stroke="" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path></svg>
                                    </th>
                                }
                            })
                        }
                        <th className="text-left p-2 text-lg">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products && products.map(({_id, title, displayImg, category, stock, price, updatedAt}, i) => <tr key={i}>
                            <td 
                                className="p-2 flex items-center cursor-pointer group"
                                onClick={() => navigate(`/products/${_id}`)}
                            >
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <img src={displayImg} className="h-full w-full object-cover"/>
                                </div>
                                <div className="ml-4 font-semibold group-hover:underline">{title}</div>
                            </td>
                            <td className="p-2 capitalize">{category}</td>
                            <td className="p-2">{stock}</td>
                            <td className="p-2">${price}.00</td>
                            <td className="p-2">{moment(updatedAt).calendar()}</td>
                            <td className="">
                                <div 
                                    className="mr-4 inline-block px-4 py-1 bg-emerald-600 text-white rounded-lg cursor-pointer hover:bg-emerald-800 duration-150"
                                    onClick={() => navigate(`/products/edit/${_id}`)}
                                >
                                        Edit
                                </div>
                                <svg className="w-6 h-6 inline-block stroke-red-900 hover:stroke-red-600 duration-100 cursor-pointer" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            {isLoading && <div className="w-full flex items-center justify-center"><RotatingLines width="25"/></div>}
            {isError && <div className="w-full flex items-center justify-center">Error fetching data.</div>}
            {products.length === 0 && !isLoading && <div className="flex w-full justify-center items-center">No orders yet.</div>}
        </div>
    )
}

export default Products