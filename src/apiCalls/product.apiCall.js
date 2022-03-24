import axios from 'axios'

const baseUrl = "http://localhost:5000"

export const addProduct = async (token, navigate, product) => {
    try{
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


