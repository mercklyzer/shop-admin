import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { getProduct } from "../apiCalls/product.apiCall";
import { useToken } from "../hooks/useToken";
import AddProduct from "./AddProduct";

const EditProduct = ({id}) => {
    console.log(id);
    const [product, setProduct] = useState()
    const token = useToken()


    useEffect(async () => {
        const [fetchedProduct, err] = await getProduct(token, id)
        console.log(fetchedProduct);
        setProduct(fetchedProduct)
    }, [])


    return product? 
        <AddProduct 
            _id={product._id}
            displayImg={product.displayImg}
            previewImg={product.previewImg}
            otherImgs={product.otherImgs}
            title={product.title}
            desc={product.desc}
            stock={product.stock}
            price={product.price}
            cost={product.cost}
            category={product.category}
        />:
        <></>

}

export default EditProduct