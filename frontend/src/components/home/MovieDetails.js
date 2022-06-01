import React, { Fragment, useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import Loader from '../layout/Loader';
import MoviesReviewList from './MoviesReviewList';
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
    getMovieDetails,
    clearErrors,
    newMovieReview,
} from '../../actions/movieActions';
import { NEW_MOVIE_REVIEW_RESET } from '../../constants/movieConstants';
const MovieDetails = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const { loading, error, movie } = useSelector(
        (state) => state.movieDetails
    );
    const { user } = useSelector((state) => state.auth);
    const { error: reviewError, success } = useSelector(
        (state) => state.newMovieR
    );

    const submit_btncolor = { backgroundColor: 'rgb(20, 2, 124)' };

    useEffect(() => {
        dispatch(getMovieDetails(match.params.id));
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success('Reivew posted successfully');
            dispatch({ type: NEW_MOVIE_REVIEW_RESET });
        }
    }, [dispatch, alert, error, match.params.id, success, reviewError]);

    function setUserRatings() {
        const stars = document.querySelectorAll('.star');

        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            });
        });

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange');

                        setRating(this.starValue);
                    } else {
                        star.classList.remove('orange');
                    }
                }

                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow');
                    }
                }

                if (e.type === 'mouseout') {
                    star.classList.remove('yellow');
                }
            });
        }
    }

    const reviewHandler = () => {
        const formData = new FormData();

        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('movieID', match.params.id);
        console.log(formData);
        dispatch(newMovieReview(formData));
    };
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={movie.mtitle} />
                    <div className="row d-flex justify-content-around">
                        <div
                            className="col-12 col-lg-5 img-fluid"
                            id="movie_image"
                        >
                            <Carousel pause="hover">
                                {movie.images &&
                                    movie.images.map((image) => (
                                        <Carousel.Item key={image.public_id}>
                                            <img
                                                className="d-block w-75"
                                                src={image.url}
                                                alt={movie.mtitle}
                                            />
                                        </Carousel.Item>
                                    ))}
                            </Carousel>
                        </div>
                        <div className="col-12 col-lg-5 mt-5">
                            <h2>{movie.mtitle}</h2>
                            <p id="movie_id">movie # {movie._id}</p>
                            <hr />
                            <div className="rating-outer">
                                <div
                                    className="rating-inner"
                                    style={{
                                        width: `${(movie.ratings / 5) * 100}%`,
                                    }}
                                ></div>
                            </div>
                            <span id="no_of_reviews">
                                ({movie.numOfReviews} Reviews)
                            </span>
                            <hr />
                            <div className="stockCounter d-inline">
                                <p id="movie_price">{movie.genre}</p>
                            </div>
                            <h4 className="mt-2">Plot:</h4>
                            <p>{movie.plot}</p>
                            <hr />
                            Actors:
                            {movie.actorslist &&
                                movie.actorslist.map((actor) => (
                                    <p>{actor.name}</p>
                                ))}
                            <hr />
                            <p id="movie_seller mb-3">
                                Producers:
                                {movie.producerslist &&
                                    movie.producerslist.map((producer) => (
                                        <p>{producer.name}</p>
                                    ))}
                            </p>
                            <hr />
                            {user ? (
                                <button
                                    id="review_btn"
                                    type="button"
                                    className="btn btn-primary mt-4"
                                    data-toggle="modal"
                                    data-target="#ratingModal"
                                    onClick={setUserRatings}
                                >
                                    Submit Your Review
                                </button>
                            ) : (
                                <div
                                    className="alert alert-danger mt-5"
                                    type="alert"
                                >
                                    Login to post your review.
                                </div>
                            )}
                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">
                                    <div
                                        className="modal fade"
                                        id="ratingModal"
                                        tabIndex="-1"
                                        role="dialog"
                                        aria-labelledby="ratingModalLabel"
                                        aria-hidden="true"
                                    >
                                        <div
                                            className="modal-dialog"
                                            role="document"
                                        >
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5
                                                        className="modal-title"
                                                        id="ratingModalLabel"
                                                    >
                                                        Submit Review
                                                    </h5>
                                                    <button
                                                        type="button"
                                                        className="close"
                                                        data-dismiss="modal"
                                                        aria-label="Close"
                                                    >
                                                        <span aria-hidden="true">
                                                            &times;
                                                        </span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <ul className="stars">
                                                        <li className="star">
                                                            <i className="fa fa-star"></i>
                                                        </li>
                                                        <li className="star">
                                                            <i className="fa fa-star"></i>
                                                        </li>
                                                        <li className="star">
                                                            <i className="fa fa-star"></i>
                                                        </li>
                                                        <li className="star">
                                                            <i className="fa fa-star"></i>
                                                        </li>
                                                        <li className="star">
                                                            <i className="fa fa-star"></i>
                                                        </li>
                                                    </ul>
                                                    <p>Leave a Comment</p>
                                                    <textarea
                                                        name="review"
                                                        id="review"
                                                        className="form-control mt-3"
                                                        value={comment}
                                                        onChange={(e) =>
                                                            setComment(
                                                                e.target.value
                                                            )
                                                        }
                                                    ></textarea>

                                                    <button
                                                        className="btn my-3 float-right review-btn px-4 text-white"
                                                        style={submit_btncolor}
                                                        onClick={reviewHandler}
                                                        data-dismiss="modal"
                                                        aria-label="Close"
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {movie.reviews && movie.reviews.length > 0 && (
                        <MoviesReviewList reviews={movie.reviews} />
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};
export default MovieDetails;
