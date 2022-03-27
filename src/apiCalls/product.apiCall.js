import axios from 'axios'

const baseUrl = "http://localhost:5000"

export const addProduct = async (token, navigate, product) => {
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
        navigate('/products')
    }
    catch(err){
        console.log(err.response);
    }
}

export const getProduct = async (token) => {
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


