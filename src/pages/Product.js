import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProduct } from "../apiCalls/product.apiCall"
import { useToken } from "../hooks/useToken"

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import CountUp from 'react-countup';


const Product = ({id}) => {
    const navigate = useNavigate()
    const token = useToken()
    const [product, setProduct] = useState(null)
    const [slideImages, setSlideImages] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(async () => {
        setIsLoading(true)
        const [data, err] = await getProduct(token, id)
        if(data){
            console.log(data);
            setProduct(data)

            let images = [data.displayImg, data.previewImg]
            if(data.otherImgs){
                images.push(data.otherImgs)
            }
            setSlideImages(images)
        }
        if(err){
            setError(err)
        }
        setIsLoading(false)
        
    }, [])


    return (
        product && <div className="p-6 shadow-xl bg-white rounded-lg">

            <div className="grid grid-cols-2 gap-12">
                <div className="">
                    <Swiper
                        pagination={{
                        type: "fraction",
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                    >
                        {
                            slideImages.map((img, i) => <SwiperSlide key={i}><img className="h-auto w-full object-cover" src={img} /></SwiperSlide>)
                        }
                    </Swiper>

                    
                    <div className="mt-4 text-lg text-zinc-500 font-regular">{product.desc}</div>
                </div>
                <div className="">
                    <div className="font-semibold text-2xl mt-8 md:mt-0 md:text-4xl text-zinc-800">{product.title}</div>
                    <div className="text-primary-400 font-semibold text-2xl md:mt-6"><CountUp end={product.sold} duration={2}/> sold</div>

                    <table className="mt-12">
                        <tbody>
                            <tr>
                                <td className="font-bold text-lg">Price:</td>
                                <td className=" pl-4 text-lg">${product.price}.00</td>
                            </tr>
                            <tr>
                                <td className="font-bold text-lg">Cost:</td>
                                <td className=" pl-4 text-lg">${product.cost}.00</td>
                            </tr>
                            <tr>
                                <td className="font-bold text-lg">Stock:</td>
                                <td className=" pl-4 text-lg">{product.stock}</td>
                            </tr>
                            <tr>
                                <td className="font-bold text-lg">Category:</td>
                                <td className="capitalize pl-4 text-lg">{product.category}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div>
                        <div 
                            onClick={() => navigate(`/products/edit/${id}`)}
                            className="mt-16 mr-4 inline-block px-4 py-1 bg-emerald-600 text-white rounded-lg cursor-pointer hover:bg-emerald-800 duration-150">
                            Edit
                        </div>
                    </div>

                </div>
            </div>

                       
        </div>
    )
}

export default Product