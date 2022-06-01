import axios from 'axios';
import { 
        ALL_ACTORS_REQUEST,
        ALL_ACTORS_SUCCESS,
        ALL_ACTORS_FAIL,
        ADMIN_ACTORS_REQUEST,
        ADMIN_ACTORS_SUCCESS,
        ADMIN_ACTORS_FAIL,
        NEW_ACTOR_REQUEST,
        NEW_ACTOR_SUCCESS,
        NEW_ACTOR_FAIL,
        DELETE_ACTOR_REQUEST,
        DELETE_ACTOR_SUCCESS,
        DELETE_ACTOR_FAIL,
        UPDATE_ACTOR_REQUEST,
        UPDATE_ACTOR_SUCCESS,
        UPDATE_ACTOR_FAIL,
        ACTOR_DETAILS_REQUEST,
        ACTOR_DETAILS_SUCCESS,
        ACTOR_DETAILS_FAIL,
        NEW_ACTOR_REVIEW_REQUEST,
        NEW_ACTOR_REVIEW_SUCCESS,
        NEW_ACTOR_REVIEW_FAIL,
        GET_ACTOR_REVIEWS_REQUEST,
        GET_ACTOR_REVIEWS_SUCCESS,
        GET_ACTOR_REVIEWS_FAIL,
        DELETE_ACTOR_REVIEW_REQUEST,
        DELETE_ACTOR_REVIEW_SUCCESS,
        DELETE_ACTOR_REVIEW_FAIL,
        CLEAR_ERRORS 
       } from '../constants/actorConstants'

export const getActors = (keyword='',currentPage=1,rating) => async (dispatch) => {
    try {
        dispatch({ type: ALL_ACTORS_REQUEST })

        let link = `/api/actors?keyword=${keyword}&page=${currentPage}&ratings[gte]=${rating}`

        const { data } = await axios.get(link)
        console.log(link)
        dispatch({
            type: ALL_ACTORS_SUCCESS,
            payload: data
        })

    } catch(error) {

        dispatch({
            type: ALL_ACTORS_FAIL,
            payload: error
        })
    }
}

export const getActorDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ACTOR_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/actor/${id}`)

        dispatch({
            type: ACTOR_DETAILS_SUCCESS,
            payload: data.actor
        })

    } catch (error) {
        dispatch({
            type: ACTOR_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newActor = (actorData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_ACTOR_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/new/actor`, actorData, config)

        dispatch({
            type: NEW_ACTOR_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_ACTOR_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete actor (Admin)
export const deleteActor = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ACTOR_REQUEST })

        const { data } = await axios.delete(`/api/actor/ud/${id}`)

        dispatch({
            type: DELETE_ACTOR_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ACTOR_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update actor (ADMIN)
export const updateActor = (id, actorData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_ACTOR_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/actor/ud/${id}`, actorData, config)

        dispatch({
            type: UPDATE_ACTOR_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ACTOR_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newActorReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_ACTOR_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/areview`, reviewData, config)

        dispatch({
            type: NEW_ACTOR_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_ACTOR_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getAdminActors = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_ACTORS_REQUEST })

        const { data } = await axios.get(`/api/aactors`)

        dispatch({
            type: ADMIN_ACTORS_SUCCESS,
            payload: data.actors
        })

    } catch (error) {

        dispatch({
            type: ADMIN_ACTORS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get actor reviews
export const getActorReviews = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_ACTOR_REVIEWS_REQUEST })

        const { data } = await axios.get(`/api/areviews?id=${id}`)

        dispatch({
            type: GET_ACTOR_REVIEWS_SUCCESS,
            payload: data.reviews
        })

    } catch (error) {

        dispatch({
            type: GET_ACTOR_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete actor review
export const deleteActorReview = (id, actorId) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ACTOR_REVIEW_REQUEST })

        const { data } = await axios.delete(`/api/reviews?id=${id}&actorId=${actorId}`)

        dispatch({
            type: DELETE_ACTOR_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        console.log(error.response);

        dispatch({
            type: DELETE_ACTOR_REVIEW_FAIL,
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
