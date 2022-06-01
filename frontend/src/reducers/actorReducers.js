import { 
        ALL_ACTORS_REQUEST,
        ALL_ACTORS_SUCCESS,
        ALL_ACTORS_FAIL,
        ADMIN_ACTORS_REQUEST,
        ADMIN_ACTORS_SUCCESS,
        ADMIN_ACTORS_FAIL,
        NEW_ACTOR_REQUEST,
        NEW_ACTOR_SUCCESS,
        NEW_ACTOR_RESET,
        NEW_ACTOR_FAIL,
        DELETE_ACTOR_REQUEST,
        DELETE_ACTOR_SUCCESS,
        DELETE_ACTOR_RESET,
        DELETE_ACTOR_FAIL,
        UPDATE_ACTOR_REQUEST,
        UPDATE_ACTOR_SUCCESS,
        UPDATE_ACTOR_FAIL,
        UPDATE_ACTOR_RESET,
        ACTOR_DETAILS_REQUEST,
        ACTOR_DETAILS_SUCCESS,
        ACTOR_DETAILS_FAIL,
        NEW_ACTOR_REVIEW_REQUEST,
        NEW_ACTOR_REVIEW_SUCCESS,
        NEW_ACTOR_REVIEW_RESET,
        NEW_ACTOR_REVIEW_FAIL,
        GET_ACTOR_REVIEWS_REQUEST,
        GET_ACTOR_REVIEWS_SUCCESS,
        GET_ACTOR_REVIEWS_FAIL,
        DELETE_ACTOR_REVIEW_REQUEST,
        DELETE_ACTOR_REVIEW_SUCCESS,
        DELETE_ACTOR_REVIEW_RESET,
        DELETE_ACTOR_REVIEW_FAIL,
        CLEAR_ERRORS 
       } from '../constants/actorConstants';

export const ActorsReducer = (state = { actors: [] }, action) => {
    switch (action.type) {
        case ALL_ACTORS_REQUEST:
        case ADMIN_ACTORS_REQUEST:
            return {
                loading: true,
                actors: []
            }

        case ALL_ACTORS_SUCCESS:
            return {
                loading: false,
                actors: action.payload.actors,
                actorsCount: action.payload.actorsCount,
                resPerPage: action.payload.resPerPage,
                filteredactorsCount: action.payload.filteredactorsCount
            }

        case ADMIN_ACTORS_SUCCESS:
            return {
                loading: false,
                actors: action.payload
            }

        case ALL_ACTORS_FAIL:
        case ADMIN_ACTORS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newActorReducer = (state = { actor: {} }, action) => {
    switch (action.type) {

        case NEW_ACTOR_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_ACTOR_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                actor: action.payload.actor
            }

        case NEW_ACTOR_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_ACTOR_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const ActorReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_ACTOR_REQUEST:
        case UPDATE_ACTOR_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_ACTOR_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_ACTOR_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_ACTOR_FAIL:
        case UPDATE_ACTOR_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_ACTOR_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_ACTOR_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const ActorDetailsReducer = (state = { actor: {} }, action) => {
    switch (action.type) {

        case ACTOR_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ACTOR_DETAILS_SUCCESS:
            return {
                loading: false,
                actor: action.payload
            }

        case ACTOR_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const newActorReviewReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_ACTOR_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_ACTOR_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_ACTOR_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_ACTOR_REVIEW_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const getActorReviewsReducer = (state = { review: [] }, action) => {
    switch (action.type) {

        case GET_ACTOR_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_ACTOR_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }

        case GET_ACTOR_REVIEWS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const delActorReviewReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_ACTOR_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_ACTOR_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_ACTOR_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_ACTOR_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}