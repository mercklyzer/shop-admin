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
import User from "./User"
import Users from "./Users"



const Main = () => {
    let location = useLocation()
    const {userId, productId, orderId} = useParams()
    const route = location.pathname

    return (
    <div className="flex">
        
        <Sidebar className=" min-w-[2rem]"/>
        <Content className={`flex-1 overflow-x-scroll`}>
            {route === '/' && <Dashboard className="min-w-[60rem]"/>}
            {route === '/users' && <Users className="min-w-[48rem]" />}
            {route === `/users/${userId}` && <User className="min-w-[48rem]" id={userId}/>}
            {route === '/products' && <Products className="min-w-[60rem]" />}
            {route === '/products/add' && <AddProduct />}
            {route === `/products/${productId}` && <Product className="min-w-[50rem]" id={productId} />}
            {route === `/products/edit/${productId}` && <EditProduct id={productId} />}
            {route === `/orders` && <Orders className="min-w-[50rem]"/>}
            {route === `/orders/${orderId}` && <Order className="min-w-[50rem]" id={orderId}/>}
        </Content>
        
    </div>
    )
}

export default Main