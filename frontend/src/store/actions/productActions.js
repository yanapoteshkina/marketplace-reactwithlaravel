import axios from 'axios'
import {GET_PRODUCTS, GET_PRODUCT} from '../actions/types'

export const addProducts = (productData, history) => dispatch => {
    axios.post (
        '/api/products', productData,
        {headers: {"Authorization": `Bearer ${localStorage.token}`}}
    ).then (res=> {
        getProducts()
        console.log(res.data)
        history.push("/")
    })
}


export const getProducts = () => dispatch => {
    axios.get (
        '/api/products'
    ).then (res=> {
        return dispatch ({
            type: GET_PRODUCTS,
            payload: res.data
        })
    })
}


export const deleteProduct = (id) => dispatch => {
    axios.delete (
        '/api/products/' + id,
        {headers: {"Authorization": `Bearer ${localStorage.token}`}}
    ).then (res=> {
       dispatch(getProducts())
    })
}

export const getProductById = (id) => dispatch => {
    axios.get (
        '/api/products/' + id,
        {headers: {"Authorization": `Bearer ${localStorage.token}`}}
    ).then (res=> {
        return dispatch ({
            type: GET_PRODUCT,
            payload: res.data
        })
    })
}