import axios from 'axios'

const baseUrl = "http://localhost:5000"

export const addProduct = async (token, product) => {
    try{
        console.log(product);
        const res = await axios.post(
            `${baseUrl}/products`,
            product,
            {
                headers: {
                    Authorization: token
                }
            }
        )

        console.log(res.data);
    }
    catch(err){
        console.log(err.response);
    }
}

export const editProduct = async (token, id, product) => {
    console.log(id);
    try{
        console.log(product);
        const res = await axios.put(
            `${baseUrl}/products/${id}`,
            product,
            {
                headers: {
                    Authorization: token
                }
            }
        )

        console.log(res.data);
    }
    catch(err){
        console.log(err.response);
    }
}

export const getProducts = async (token) => {
    try{
        const res = await axios.get(
            `${baseUrl}/products`,
            {
                headers: {
                    Authorization: token
                }
            }
        )

        return [res.data, null]
    }
    catch(err){
        console.log(err.response);
        return [null, err.response.data]
    }
}

export const getProduct = async (token, id) => {
    try{
        const res = await axios.get(
            `${baseUrl}/products/find/${id}`,
            {
                headers: {
                    Authorization: token
                }
            }
        )

        return [res.data, null]
    }
    catch(err){
        console.log(err.response);
        return [null, err.response.data]
    }
}


