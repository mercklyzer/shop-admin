import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import Content from "../components/Content"
import Sidebar from "../components/Sidebar"
import AddProduct from "./AddProduct"
import Dashboard from "./Dashboard"
import EditProduct from "./EditProduct"
import Products from "./Products"

const Main = () => {
    let location = useLocation()
    const {productId} = useParams()
    const route = location.pathname

    return (
    <>
        <Sidebar className="col-span-2"/>
        <Content className="col-span-10">
            {route === '/' && <Dashboard />}
            {route === '/products' && <Products />}
            {route === '/products/add' && <AddProduct />}
            {route === `/products/edit/${productId}` && <EditProduct id={productId} />}
        </Content>
    </>
    )
}

export default Main