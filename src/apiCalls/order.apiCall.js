import axios from 'axios'

const baseUrl = "http://localhost:5000"

export const getOrders = async (token, field, sort) => {
    try{
        const res = await axios.get(
            `${baseUrl}/orders?field=${field}&sort=${sort}`,
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

export const getUserOrders = async (token, userId, field, sort) => {
    try{
        const res = await axios.get(
            `${baseUrl}/orders/find/${userId}?field=${field}&sort=${sort}`,
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

export const getLatestTransactions = async (token) => {
    try{
        const res = await axios.get(
            `${baseUrl}/orders?new=true`,
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

// can only change "pending" to "completed"
export const changeStatus = async (token, newStatus, orderId) => {
    try{
        const res = await axios.put(
            `${baseUrl}/orders/${orderId}`,
            {
                status: newStatus
            },
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
