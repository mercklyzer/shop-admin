import React from "react"
import { useLocation, useParams } from "react-router-dom"
import Content from "../components/Content"
import Sidebar from "../components/Sidebar"
import AddProduct from "./AddProduct"
import Dashboard from "./Dashboard"
import EditProduct from "./EditProduct"
import Order from "./Order"
import Orders from "./Orders"
import Product from "./Product"
import Products from "./Products"
import Users from "./Users"



const Main = () => {
    let location = useLocation()
    const {productId, orderId} = useParams()
    const route = location.pathname

    return (
    <div className="flex justify-stretch w-screen">
        
        <Sidebar className="w-[20%] max-w-[16rem] min-w-[6rem] h-screen"/>
        <Content className={`flex-1 m-0`}>
            {route === '/' && <Dashboard />}
            {route === '/users' && <Users className="min-w-[48rem]" />}
            {route === '/products' && <Products className="min-w-[60rem]" />}
            {route === '/products/add' && <AddProduct />}
            {route === `/products/${productId}` && <Product id={productId} />}
            {route === `/products/edit/${productId}` && <EditProduct id={productId} />}
            {route === `/orders` && <Orders className="min-w-[50rem]"/>}
            {route === `/orders/${orderId}` && <Order id={orderId}/>}
        </Content>
        
    </div>
    )
}

export default Main