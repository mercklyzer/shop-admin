import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Content from "../components/Content"
import Sidebar from "../components/Sidebar"
import AddProduct from "./AddProduct"
import Dashboard from "./Dashboard"
import Products from "./Products"

const Main = () => {
    let location = useLocation()
    const route = location.pathname

    return (
    <>
        <Sidebar className="col-span-2"/>
        <Content className="col-span-10">
            {route === '/' && <Dashboard />}
            {route === '/products' && <Products />}
            {route === '/products/add' && <AddProduct />}
        </Content>
    </>
    )
}

export default Main