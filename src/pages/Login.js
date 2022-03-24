import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../apiCalls/user.apiCall"
import useForm from "../hooks/useForm"

const Login = props => {
    const [loginForm, setLoginForm, clearLoginForm] = useForm({
        username: "",
        password: ""
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isFetchingLogin, errorLogin, errorMessageLogin} = useSelector(state => state.user)

    const handleSubmit = (e) => {
        e.preventDefault()
        login(dispatch, navigate, loginForm)
        clearLoginForm()
    }


    return (
        <div className="w-screen h-screen bg-primary-100 flex items-center justify-center">
            <div className="flex shadow-2xl mx-4 md:mx-12 w-full max-w-[80em] ">
                <div className="flex flex-col items-center justify-center flex-1 bg-white py-12 px-4">
                    <div className="flex md:hidden items-center -mb-2">
                        <span className="text-primary-400 font-bold text-xl mr-2">LYZ</span>
                        <span className="text-black font-bold text-sm">Ideas</span>
                    </div>
                    <div className="font-bold text-2xl">ADMIN</div>
                    {errorLogin && <div className="text-red-600">{errorMessageLogin}</div>}
                    <form className="w-full max-w-[20rem]">                    
                        <label className="flex flex-col w-full mt-4 md:mt-8 mx-2">
                            <div className="text-sm font-bold text-zinc-500 mb-2">Username</div>
                            <input
                                name="username"
                                value={loginForm.username}
                                onChange={(e) => setLoginForm(e)}
                                className="bg-primary-100 px-4 py-2 rounded-lg outline-primary-200 w-full"
                                type="text" />
                        </label>
                        <label className="flex flex-col w-full mt-4">
                            <div className="text-sm font-bold text-zinc-500 mb-2">Password</div>
                            <input 
                                name="password"
                                value={loginForm.password}
                                onChange={(e) => setLoginForm(e)}
                                className="bg-primary-100 px-4 py-2 rounded-lg outline-primary-200 w-full"
                                type="password" />
                        </label>
                        <div className="flex justify-center w-full">
                            <button 
                                className="bg-black text-white px-8 py-2 rounded-lg mt-20 hover:bg-zinc-700 duration-100"
                                onClick={handleSubmit}
                                type="submit">
                                Login
                            </button>
                        </div>
                    </form> 
                </div>

                <div className="hidden md:flex flex-col items-center justify-center flex-1 py-12 bg-primary-100 w-full px-8">
                    <div className="flex items-center justify-self-start w-full mb-12">
                        <span className="text-primary-400 font-bold text-6xl mr-4">LYZ</span>
                        <span className="text-black font-bold text-5xl">Ideas</span>
                    </div>
                    <div className="text-left w-full font-bold text-2xl mb-4">Welcome!</div>
                    <div className="text-left w-full text-lg">This is an admin page for the e-commere website LYZ Ideas.</div>
                    <div className="flex justfiy-start w-full mt-4">
                        <div className="px-2 py-1 rounded-lg bg-primary-200 text-primary-400 font-semibold mr-4">Easy to Use</div>
                        <div className="px-2 py-1 rounded-lg bg-primary-200 text-primary-400 font-semibold">Secured</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login