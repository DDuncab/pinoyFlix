import React, { Fragment, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import { Link } from 'react-router-dom'
import MetaData from '../../layout/MetaData'
import Sidebar from '../Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieReviews, deleteMovieReview, clearErrors } from '../../../actions/movieActions'
import { DELETE_MOVIE_REVIEW_RESET } from '../../../constants/movieConstants'

const MovieReviewList = ({ match }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, reviews } = useSelector(state => state.getMovieReviews);
    const { isDeleted, error: deleteError } = useSelector(state => state.delMovieReview)
    
    const movieId = match.params.id;

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (movieId !== '') {
            dispatch(getMovieReviews(movieId))
        }

        if (isDeleted) {
            alert.success('Review deleted successfully');
            dispatch({ type: DELETE_MOVIE_REVIEW_RESET })
        }



    }, [dispatch, alert, error, movieId, isDeleted, deleteError])

    const deleteReviewHandler = (id) => {
        dispatch(deleteMovieReview(id, movieId))
    }
    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,

                actions:
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteReviewHandler(review._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'movie Reviews'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        {reviews && reviews.length > 0 ? (
                            <MDBDataTable
                                data={setReviews()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        ) : (
                                <p className="mt-5 text-center">No Reviews.<Link to="/admin/movies">back</Link></p>
                    
                            )}


                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default MovieReviewList
