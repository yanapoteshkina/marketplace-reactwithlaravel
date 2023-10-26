import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import jwt_decode from "jwt-decode"

export const registerUser = (userData, history) => dispatch => {
    axios.post (
        '/api/register', userData
    ).then (res=> {
        history.push('/login')
        console.log(res.data)
    })
}

export const loginUser = (userData, history) => dispatch => {
    axios.post (
        '/api/login', userData
    ).then (res=> {
        const {access_token} = res.data
        localStorage.setItem("token", access_token)
        localStorage.setItem("isAuth", true)
        localStorage.setItem("username", res.data.user.name)
        localStorage.setItem("email", res.data.user.email)
        setAuthToken(access_token)
        history.push('/')
    })
}