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
    }
    catch(err){
        dispatch(loginFailure({error: err.response?.data?.error}))
    }
}


