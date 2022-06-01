import axios from 'axios';
import {
    ALL_MOVIES_REQUEST,
    ALL_MOVIES_SUCCESS,
    ALL_MOVIES_FAIL,
    ADMIN_MOVIES_REQUEST,
    ADMIN_MOVIES_SUCCESS,
    ADMIN_MOVIES_FAIL,
    NEW_MOVIE_REQUEST,
    NEW_MOVIE_SUCCESS,
    NEW_MOVIE_FAIL,
    DELETE_MOVIE_REQUEST,
    DELETE_MOVIE_SUCCESS,
    DELETE_MOVIE_FAIL,
    UPDATE_MOVIE_REQUEST,
    UPDATE_MOVIE_SUCCESS,
    UPDATE_MOVIE_FAIL,
    MOVIE_DETAILS_REQUEST,
    MOVIE_DETAILS_SUCCESS,
    MOVIE_DETAILS_FAIL,
    NEW_MOVIE_REVIEW_REQUEST,
    NEW_MOVIE_REVIEW_SUCCESS,
    NEW_MOVIE_REVIEW_FAIL,
    GET_MOVIE_REVIEWS_REQUEST,
    GET_MOVIE_REVIEWS_SUCCESS,
    GET_MOVIE_REVIEWS_FAIL,
    DELETE_MOVIE_REVIEW_REQUEST,
    DELETE_MOVIE_REVIEW_SUCCESS,
    DELETE_MOVIE_REVIEW_FAIL,
    CLEAR_ERRORS,
} from '../constants/movieConstants';

export const getMovies =
    (keyword = '', currentPage = 1, genre, rating = 0, startDate, endDate) =>
    async (dispatch) => {
        try {
            dispatch({ type: ALL_MOVIES_REQUEST });

            let link = '';

            if (genre) {
                link = `/api/movies?keyword=${keyword}&page=${currentPage}&createdAt[gt]=${startDate}&createdAt[lt]=${endDate}&ratings[gte]=${rating}&genre=${genre}`;
            } else {
                link = `/api/movies?keyword=${keyword}&createdAt[gt]=${startDate}&createdAt[lt]=${endDate}&page=${currentPage}&ratings[gte]=${rating}`;
            }
            console.log(link);
            const { data } = await axios.get(link);

            dispatch({
                type: ALL_MOVIES_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ALL_MOVIES_FAIL,
                payload: error,
            });
        }
    };

export const getMovieDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: MOVIE_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/movie/${id}`);
        console.log(data.movie);
        dispatch({
            type: MOVIE_DETAILS_SUCCESS,
            payload: data.movie,
        });
    } catch (error) {
        dispatch({
            type: MOVIE_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const newMovie = (MOVIEData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_MOVIE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(`/api/movie/new`, MOVIEData, config);

        dispatch({
            type: NEW_MOVIE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_MOVIE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete MOVIE (Admin)
export const deleteMovie = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_MOVIE_REQUEST });

        const { data } = await axios.delete(`/api/movie/ud/${id}`);

        dispatch({
            type: DELETE_MOVIE_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_MOVIE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update MOVIE (ADMIN)
export const updateMovie = (id, MOVIEData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_MOVIE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.put(
            `/api/movie/ud/${id}`,
            MOVIEData,
            config
        );

        dispatch({
            type: UPDATE_MOVIE_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_MOVIE_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const newMovieReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_MOVIE_REVIEW_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.put(`/api/mreview`, reviewData, config);

        dispatch({
            type: NEW_MOVIE_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: NEW_MOVIE_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getAdminMovies = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_MOVIES_REQUEST });

        const { data } = await axios.get(`/api/amovies`);

        dispatch({
            type: ADMIN_MOVIES_SUCCESS,
            payload: data.movies,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_MOVIES_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get MOVIE reviews
export const getMovieReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_MOVIE_REVIEWS_REQUEST });

        const { data } = await axios.get(`/api/mreviews?id=${id}`);

        dispatch({
            type: GET_MOVIE_REVIEWS_SUCCESS,
            payload: data.reviews,
        });
    } catch (error) {
        dispatch({
            type: GET_MOVIE_REVIEWS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete MOVIE review
export const deleteMovieReview = (id, MOVIEId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_MOVIE_REVIEW_REQUEST });

        const { data } = await axios.delete(
            `/api/mreviews?id=${id}&movieId=${MOVIEId}`
        );

        dispatch({
            type: DELETE_MOVIE_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        console.log(error.response);

        dispatch({
            type: DELETE_MOVIE_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
