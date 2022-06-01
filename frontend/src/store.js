import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import { ActorsReducer, newActorReducer, ActorReducer, ActorDetailsReducer, newActorReviewReducer, getActorReviewsReducer, delActorReviewReducer } from './reducers/actorReducers'

import { ProducersReducer, ProducerReducer, newProducerReducer, ProducerDetailsReducer } from './reducers/producerReducers'

import { MoviesReducer, newMovieReducer, MovieReducer, MovieDetailsReducer, newMovieReviewReducer, getMovieReviewsReducer, delMovieReviewReducer} from './reducers/movieReducers'

import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducers'

const reducer = combineReducers({
    // movie crud and reviews
	movies: MoviesReducer,
    movieDetails: MovieDetailsReducer,
    movie: MovieReducer,
    newMovie: newMovieReducer,
    newMovieR: newMovieReviewReducer,
    getMovieReviews: getMovieReviewsReducer,
    delMovieReview: delMovieReviewReducer,
    // user auth
	auth: authReducer,
    user: userReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    forgotPassword: forgotPasswordReducer,
    // actor crud and reviews
    actors: ActorsReducer,
    actorDetails: ActorDetailsReducer,
    actor: ActorReducer,
    newactorR:newActorReducer,
    newActorReview: newActorReviewReducer,
    getActorReviews: getActorReviewsReducer,
    delActorReview: delActorReviewReducer,

    // producer crud
    producers: ProducersReducer,
    producer: ProducerReducer,
    newproducer:newProducerReducer,
    producerDetails: ProducerDetailsReducer,


})

let initialState = {}
const middlware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))
export default store;
