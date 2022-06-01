import React, { Fragment, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import { Link } from 'react-router-dom'
import MetaData from '../../layout/MetaData'
import Sidebar from '../Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getActorReviews, deleteActorReview, clearErrors } from '../../../actions/actorActions'
import { DELETE_ACTOR_REVIEW_RESET } from '../../../constants/actorConstants'

const ActorReviewList = ({ match }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, reviews } = useSelector(state => state.getActorReviews);
    const { isDeleted, error: deleteError } = useSelector(state => state.delActorReview)
    
    const actorId = match.params.id;

    useEffect(() => {
       
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (actorId !== '') {
            dispatch(getActorReviews(actorId))
        }

        if (isDeleted) {
            alert.success('Review deleted successfully');
            dispatch({ type: DELETE_ACTOR_REVIEW_RESET })
        }



    }, [dispatch, alert, error, actorId, isDeleted, deleteError])

    const deleteReviewHandler = (id) => {
        dispatch(deleteActorReview(id, actorId))
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
            <MetaData title={'actor Reviews'} />
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
                                <p className="mt-5 text-center">No Reviews.<Link to="/admin/actors">back</Link></p>
                    
                            )}


                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ActorReviewList
