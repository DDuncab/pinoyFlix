import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import MetaData from '../../layout/MetaData';
import Loader from '../../layout/Loader';
import Sidebar from '../Sidebar';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAdminMovies,
    deleteMovie,
    clearErrors,
} from '../../../actions/movieActions';
import { DELETE_MOVIE_RESET } from '../../../constants/movieConstants';

const MoviesList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, movies } = useSelector((state) => state.movies);
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.movie
    );

    useEffect(() => {
        dispatch(getAdminMovies());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success('movie deleted successfully');
            history.push('/admin/movies');
            dispatch({ type: DELETE_MOVIE_RESET });
        }
    }, [dispatch, alert, error, deleteError, isDeleted, history]);

    const setmovies = () => {
        const data = {
            columns: [
                {
                    label: 'Movie title',
                    field: 'mtilte',
                    sort: 'asc',
                },
                {
                    label: 'Plot',
                    field: 'plot',
                    sort: 'asc',
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc',
                },
                {
                    label: 'Genre',
                    field: 'genre',
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

        movies.forEach((movie) => {
            data.rows.push({
                mtilte: movie.mtitle,
                plot: movie.plot,
                rating: (
                    <Fragment>
                        <div className="rating-outer">
                            <div
                                className="rating-inner"
                                style={{
                                    width: `${(movie.ratings / 5) * 100}%`,
                                }}
                            ></div>
                            ({movie.numOfReviews} Reviews)
                        </div>
                    </Fragment>
                ),
                genre: movie.genre,
                reviews: (
                    <Fragment>
                        <Link
                            to={`/admin/reviews/movie/${movie._id}`}
                            className="btn btn-primary py-1 px-2"
                        >
                            <i className="fa fa-comments"></i>
                        </Link>
                    </Fragment>
                ),
                actions: (
                    <Fragment>
                        <Link
                            to={`/admin/update/movie/${movie._id}`}
                            className="btn btn-primary py-1 px-2"
                        >
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button
                            className="btn btn-danger py-1 px-2 ml-2"
                            onClick={() => deletemovieHandler(movie._id)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                ),
            });
        });

        return data;
    };

    const deletemovieHandler = (id) => {
        dispatch(deleteMovie(id));
    };

    return (
        <Fragment>
            <MetaData title={'All movies'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h3 className="my-3">All Movies</h3>
                        <button id="view_btn">
                            <Link to="/admin/new/movie">
                                <i className="fa fa-plus"></i> New Movie
                            </Link>
                        </button>
                        {loading ? (
                            <Loader />
                        ) : (
                            <MDBDataTable
                                data={setmovies()}
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

export default MoviesList;
