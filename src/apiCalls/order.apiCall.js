import axios from 'axios'

const baseUrl = "http://localhost:5000"

export const getOrders = async (token) => {
    try{
        const res = await axios.get(
            `${baseUrl}/orders`,
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

export const getOrder = async (token, productId) => {
    try{
        const res = await axios.get(
            `${baseUrl}/orders/${productId}`,
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
