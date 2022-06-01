import axios from 'axios';
import { 
        ALL_PRODUCERS_REQUEST,
        ALL_PRODUCERS_SUCCESS,
        ALL_PRODUCERS_FAIL,

        ADMIN_PRODUCERS_REQUEST,
        ADMIN_PRODUCERS_SUCCESS,
        ADMIN_PRODUCERS_FAIL,

        NEW_PRODUCER_REQUEST,
        NEW_PRODUCER_SUCCESS,
        NEW_PRODUCER_FAIL,

        DELETE_PRODUCER_REQUEST,
        DELETE_PRODUCER_SUCCESS,
        DELETE_PRODUCER_FAIL,

        UPDATE_PRODUCER_REQUEST,
        UPDATE_PRODUCER_SUCCESS,
        UPDATE_PRODUCER_FAIL,

        PRODUCER_DETAILS_REQUEST,
        PRODUCER_DETAILS_SUCCESS,
        PRODUCER_DETAILS_FAIL,

        CLEAR_ERRORS 
       } from '../constants/producerConstants'

export const getProducers = (keyword='',currentPage=1) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCERS_REQUEST })

        let link = `/api/producers?keyword=${keyword}&page=${currentPage}`

        const { data } = await axios.get(link)
        console.log(data)
        dispatch({
            type: ALL_PRODUCERS_SUCCESS,
            payload: data
        })

    } catch(error) {

        dispatch({
            type: ALL_PRODUCERS_FAIL,
            payload: error
        })
    }
}

export const getProducerDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCER_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/producer/${id}`)

        dispatch({
            type: PRODUCER_DETAILS_SUCCESS,
            payload: data.producer
        })

    } catch (error) {
        dispatch({
            type: PRODUCER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newProducer = (PRODUCERData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PRODUCER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/new/producer`, PRODUCERData, config)

        dispatch({
            type: NEW_PRODUCER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PRODUCER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete PRODUCER (Admin)
export const deleteProducer = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PRODUCER_REQUEST })

        const { data } = await axios.delete(`/api/producer/ud/${id}`)

        dispatch({
            type: DELETE_PRODUCER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update PRODUCER (ADMIN)
export const updateProducer = (id, producerData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PRODUCER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/producer/ud/${id}`, producerData, config)

        dispatch({
            type: UPDATE_PRODUCER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getAdminProducers = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_PRODUCERS_REQUEST })

        const { data } = await axios.get(`/api/aproducers`)

        dispatch({
            type: ADMIN_PRODUCERS_SUCCESS,
            payload: data.producers
        })

    } catch (error) {

        dispatch({
            type: ADMIN_PRODUCERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}
