import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import MetaData from '../../layout/MetaData';
import Loader from '../../layout/Loader';
import Sidebar from '../Sidebar';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAdminActors,
    deleteActor,
    clearErrors,
} from '../../../actions/actorActions';
import { DELETE_ACTOR_RESET } from '../../../constants/actorConstants';

const ActorsList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, actors } = useSelector((state) => state.actors);
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.actor
    );

    useEffect(() => {
        dispatch(getAdminActors());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success('actor deleted successfully');
            history.push('/admin/actors');
            dispatch({ type: DELETE_ACTOR_RESET });
        }
    }, [dispatch, alert, error, deleteError, isDeleted, history]);

    const setActors = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Actor Name',
                    field: 'name',
                    sort: 'asc',
                },
                {
                    label: 'Info',
                    field: 'bio',
                    sort: 'asc',
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc',
                },
                {
                    label: 'Reviews',
                    field: 'reviews',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: [],
        };

        actors.forEach((actor) => {
            data.rows.push({
                id: actor._id,
                name: actor.name,
                bio: actor.bio,
                rating: (
                    <Fragment>
                        <div className="rating-outer">
                            <div
                                className="rating-inner"
                                style={{
                                    width: `${(actor.ratings / 5) * 100}%`,
                                }}
                            ></div>
                            ({actor.numOfReviews} Reviews)
                        </div>
                    </Fragment>
                ),
                reviews: (
                    <Fragment>
                        <Link
                            to={`/admin/reviews/actor/${actor._id}`}
                            className="btn btn-primary py-1 px-2"
                        >
                            <i className="fa fa-comments"></i>
                        </Link>
                    </Fragment>
                ),
                actions: (
                    <Fragment>
                        <Link
                            to={`/admin/update/actor/${actor._id}`}
                            className="btn btn-primary py-1 px-2"
                        >
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button
                            className="btn btn-danger py-1 px-2 ml-2"
                            onClick={() => deleteActorHandler(actor._id)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                ),
            });
        });

        return data;
    };

    const deleteActorHandler = (id) => {
        dispatch(deleteActor(id));
    };

    return (
        <Fragment>
            <MetaData title={'All Actors'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h3 className="my-3">All Actors</h3>
                        <button id="view_btn">
                            <Link to="/admin/new/actor">
                                <i className="fa fa-plus"></i> Actors
                            </Link>
                        </button>
                        {loading ? (
                            <Loader />
                        ) : (
                            <MDBDataTable
                                data={setActors()}
                                className="px-3"
                                container-sm="true"
                                bordered
                                striped
                                hover
                            />
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default ActorsList;
