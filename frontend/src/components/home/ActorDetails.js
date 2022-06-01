import React, { Fragment, useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import Loader from '../layout/Loader';
import ActorsReviewList from './ActorsReviewList';
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
    getActorDetails,
    clearErrors,
    newActorReview,
} from '../../actions/actorActions';
import { NEW_ACTOR_REVIEW_RESET } from '../../constants/actorConstants';

const ActorDetails = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const { loading, error, actor } = useSelector(
        (state) => state.actorDetails
    );
    const { user } = useSelector((state) => state.auth);
    const { error: reviewError, success } = useSelector(
        (state) => state.newactorR
    );

    const submit_btncolor = { backgroundColor: 'rgb(20, 2, 124)' };

    useEffect(() => {
        dispatch(getActorDetails(match.params.id));
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
            dispatch({ type: NEW_ACTOR_REVIEW_RESET });
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
        formData.set('actorID', match.params.id);
        console.log(formData);
        dispatch(newActorReview(formData));
    };
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={actor.mtitle} />
                    <div className="row d-flex justify-content-around">
                        <div
                            className="col-12 col-lg-5 img-fluid"
                            id="actor_image"
                        >
                            <Carousel pause="hover">
                                {actor.images &&
                                    actor.images.map((image) => (
                                        <Carousel.Item key={image.public_id}>
                                            <img
                                                className="d-block w-100"
                                                src={image.url}
                                                alt={actor.mtitle}
                                            />
                                        </Carousel.Item>
                                    ))}
                            </Carousel>
                        </div>
                        <div className="col-12 col-lg-5 mt-5">
                            <h2>{actor.name}</h2>
                            <p id="actor_id">actor # {actor._id}</p>
                            <hr />
                            <div className="rating-outer">
                                <div
                                    className="rating-inner"
                                    style={{
                                        width: `${(actor.ratings / 5) * 100}%`,
                                    }}
                                ></div>
                            </div>
                            <span id="no_of_reviews">
                                ({actor.numOfReviews} Reviews)
                            </span>
                            <hr />

                            <h4 className="mt-2">Biography:</h4>
                            <p>{actor.bio}</p>
                            <hr />

                            <p id="actor_seller mb-3">
                                Movies:
                                {actor.movies &&
                                    actor.movies.map((movie) => (
                                        <p>{movie.mtitle}</p>
                                    ))}
                            </p>

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
                                                    <p>Leave A Comment</p>
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

                    {actor.reviews && actor.reviews.length > 0 && (
                        <ActorsReviewList reviews={actor.reviews} />
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};
export default ActorDetails;
