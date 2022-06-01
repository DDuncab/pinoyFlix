import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';

import { useDispatch, useSelector } from 'react-redux';

import { getAdminActors } from '../../actions/actorActions';
import { getAdminMovies } from '../../actions/movieActions';
import { getAdminProducers } from '../../actions/producerActions';

const Dashboard = () => {
    const dispatch = useDispatch();

    const { actors, loading } = useSelector((state) => state.actors);
    const { movies } = useSelector((state) => state.movies);
    const { producers } = useSelector((state) => state.producers);
    useEffect(() => {
        dispatch(getAdminActors());
        dispatch(getAdminMovies());
        dispatch(getAdminProducers());
    }, [dispatch]);

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>

                    {loading ? (
                        <Loader />
                    ) : (
                        <Fragment>
                            <MetaData title={'Admin Dashboard'} />

                            <div className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-dark o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">
                                                Actors
                                                <br />{' '}
                                                <b>{actors && actors.length}</b>
                                            </div>
                                        </div>
                                        <Link
                                            className="card-footer text-white clearfix small z-1"
                                            to="/admin/actors"
                                        >
                                            <span className="float-left">
                                                View Details
                                            </span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-dark o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">
                                                Producers
                                                <br />{' '}
                                                <b>
                                                    {producers &&
                                                        producers.length}
                                                </b>
                                            </div>
                                        </div>
                                        <Link
                                            className="card-footer text-white clearfix small z-1"
                                            to="/admin/producers"
                                        >
                                            <span className="float-left">
                                                View Details
                                            </span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-dark o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">
                                                Movies
                                                <br />{' '}
                                                <b>{movies && movies.length}</b>
                                            </div>
                                        </div>
                                        <Link
                                            className="card-footer text-white clearfix small z-1"
                                            to="/admin/movies"
                                        >
                                            <span className="float-left">
                                                View Details
                                            </span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default Dashboard;
