import React from "react"
import Content from "../components/Content"
import Sidebar from "../components/Sidebar"

const Main = () => {
    


    return (
    <>
        <Sidebar className="col-span-2"/>
        <Content className="col-span-10">
          {/* <Routes>
            <Route path='/' exact element={ <Dashboard />}/>
            <Route path='/products' exact element={ <Products />}/>
            <Route path='/products/add' exact element={ <AddProduct />}/>
          </Routes> */}
        </Content>
    </>
    )
}

export default Main