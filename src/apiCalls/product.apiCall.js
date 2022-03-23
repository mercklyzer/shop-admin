import axios from 'axios'

const baseUrl = "http://localhost:5000"

export const addProduct = async (product) => {
    try{
        const res = await axios.post(
            `${baseUrl}/products/`,
            product,
            {
                headers: {
                    Authorization: 's'
                }
            }
        )
    }
    catch(err){

    }
}


