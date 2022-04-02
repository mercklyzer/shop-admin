import React from "react";

const OrderProduct = ({id, title, quantity, total, displayImg}) => {

    return (
        <div className="pt-4 flex flex-col sm:flex-row">
            <img
                className="w-full h-auto max-w-[290px] object-contain px-4 m-auto sm:m-0 cursor-pointer" 
                src={displayImg}
            />
            <div className="w-full flex flex-col justify-center items-center mt-4 md:flex-row">
                <div className="w-1/3 font-bold text-xl text-zinc-700">{title}</div>
                <div className="w-1/3 font-semibold text-lg text-zinc-700">{quantity} pc{quantity > 1? 's' : ''}</div>
                <div className="w-1/3 font-semibold text-lg text-zinc-700">${total}</div>
            </div>
        </div>
    )
}

export default OrderProduct