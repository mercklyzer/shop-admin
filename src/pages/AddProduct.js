import React from "react"

const AddProduct = props => {
    return(
        <div className="p-6 shadow-xl bg-white rounded-lg">
            <div className="text-2xl font-bold">New Product</div>

            <div className="mt-4">
                <div className="text-gray-700 font-semibold mb-2">Image</div>
                <input type="file" />
            </div>

            <div className="mt-4">
                <div className="text-gray-700 font-semibold mb-2">Name</div>
                <input className="border px-2 py-1 rounded-sm w-96" type="text" />
            </div>
            
            <div className="mt-4">
                <div className="text-gray-700 font-semibold mb-2">Categories</div>
                <input className="border px-2 py-1 rounded-sm w-96" type="text" />
            </div>
            
            <div className="mt-4">
                <div className="text-gray-700 font-semibold mb-2">Stock</div>
                <input className="border px-2 py-1 rounded-sm w-96" type="number" defaultValue={1} min={1}/>
            </div>

            <div className="mt-8">
                <button className="px-4 py-1 bg-cyan-700 text-white rounded-md hover:bg-cyan-900 duration-100">
                    Create
                </button>
            </div>
        </div>
    )

}

export default AddProduct