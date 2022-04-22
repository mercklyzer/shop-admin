import axios from 'axios'
import { loginFailure, loginStart, loginSuccess } from '../redux/userRedux'

const baseUrl = process.env.REACT_APP_BASE_URL

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

export const getUsers = async (token, field, sort) => {
    try{
        const res = await axios.get(
            `${baseUrl}/users?field=${field}&sort=${sort}`,
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

export const getUser = async (token, userId) => {
    try{
        const res = await axios.get(
            `${baseUrl}/users/find/${userId}`,
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

export const changeRole = async (token, newRole, userId) => {
    try{
        const res = await axios.put(
            `${baseUrl}/users/${userId}`,
            {
                isAdmin: newRole === 'Admin' ? true : false
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


export const getNewUsers = async (token) => {
    try{
        const res = await axios.get(
            `${baseUrl}/users?new`,
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

export const getUserStats = async (token) => {
    try{
        const res = await axios.get(
            `${baseUrl}/users/stats`,
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

export const getNewMonthlyUsersCount = async (token) => {
    try{
        const res = await axios.get(
            `${baseUrl}/users/new/count`,
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