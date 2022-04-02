import React from "react";
import { useNavigate } from "react-router-dom";

const OrderProduct = ({id, title, quantity, total, displayImg}) => {
    const navigate = useNavigate()


    return (
        <div className="pt-4 flex flex-col sm:flex-row ">
            <img
                className="w-full h-auto max-w-[200px] object-contain px-4 m-auto sm:m-0 cursor-pointer" 
                src={displayImg}
                onClick={() => navigate(`/products/${id}`)}
            />
            <div className="w-full flex flex-col justify-between items-center md:flex-row">
                <div className="w-1/3 font-bold text-xl text-zinc-700 text-center">{title}</div>
                <div className="w-1/3 font-semibold text-lg text-zinc-700 text-center">{quantity} pc{quantity > 1? 's' : ''}</div>
                <div className="w-1/3 font-semibold text-lg text-zinc-700 text-center">${total}</div>
            </div>
        </div>
    )
}

export default OrderProduct