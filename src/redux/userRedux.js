import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        token: null,
        isFetchingLogin: false,
        errorLogin: false,
        errorMessageLogin: '',
    },
    reducers: {
        loginStart: (state) => {
            state.isFetchingLogin = true
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload.user
            state.token = action.payload.token
            state.isFetchingLogin = false
        },
        loginFailure: (state, action) => {
            state.isFetchingLogin = false
            state.errorLogin = true
            state.errorMessageLogin = action.payload.error
        },     

    }
})

export const {loginStart, loginSuccess, loginFailure} = userSlice.actions
export default userSlice.reducer