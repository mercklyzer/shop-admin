import axios from 'axios'
import { loginFailure, loginStart, loginSuccess } from '../redux/userRedux'

const baseUrl = "http://localhost:5000"

export const login = async (dispatch, navigate, user) => {
    dispatch(loginStart())

    try{
        const res = await axios.post(
            `${baseUrl}/users/loginAdmin`,
            user
        )

        dispatch(loginSuccess(res.data))
        navigate('/')
    }
    catch(err){
        dispatch(loginFailure({error: err.response?.data?.error}))
    }
}


export const getUsers = async (token) => {
    try{
        const res = await axios.get(
            `${baseUrl}/users`,
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