import axios from 'axios'
import {GET_CATEGORIES} from '../actions/types'

export const getCategories = () => dispatch => {
    axios.get (
        '/api/categories', 
        {headers: {"Authorization": `Bearer ${localStorage.token}`}}
    ).then (res=> {
        return dispatch ({
            type: GET_CATEGORIES,
            payload: res.data
        })
    })
}
