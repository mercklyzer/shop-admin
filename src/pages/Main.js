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

const Main = () => {
    let location = useLocation()
    const {productId, orderId} = useParams()
    const route = location.pathname

    return (
    <>
        <Sidebar className="col-span-2"/>
        <Content className="col-span-10">
            {route === '/' && <Dashboard />}
            {route === '/products' && <Products />}
            {route === '/products/add' && <AddProduct />}
            {route === `/products/${productId}` && <Product id={productId} />}
            {route === `/products/edit/${productId}` && <EditProduct id={productId} />}
            {route === `/orders` && <Orders />}
            {route === `/orders/${orderId}` && <Order id={orderId}/>}
            
        </Content>
    </>
    )
}

export default Main