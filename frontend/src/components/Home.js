import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../actions/movieActions';

import Footer from './layout/Footer';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination';
import DatePicker from 'react-datepicker';
import MetaData from './layout/MetaData';
import Loader from './layout/Loader';
import Movie from './home/Movie';
import ISODate from 'isodate';
// Home
const Home = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState(0);
    const [startDate, setStartDate] = useState(
        ISODate(new Date('2022/01/01').toISOString())
    );

    const [endDate, setEndDate] = useState(
        ISODate(new Date('2023/01/01').toISOString())
    );
    console.log(endDate.toISOString());
    const genres = [
        'Action',
        'Romance',
        'Sci-Fi',
        'Survival',
        'Fantasy',
        'Historical',
    ];

    const alert = useAlert();
    const dispatch = useDispatch();

    const {
        loading,
        movies,
        error,
        moviesCount,
        resPerPage,
        filteredMoviesCount,
    } = useSelector((state) => state.movies);

    const keyword = match.params.keyword;

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }

        dispatch(
            getMovies(
                keyword,
                currentPage,
                genre,
                rating,
                startDate.toISOString(),
                endDate.toISOString()
            )
        );
    }, [
        dispatch,
        alert,
        error,
        keyword,
        currentPage,
        genre,
        rating,
        startDate,
        endDate,
    ]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

    let count = moviesCount;
    if (keyword) {
        count = filteredMoviesCount;
    }

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={'Home'} />
                    <section id="movies" className="container-fluid">
                        <div className="row">
                            <Fragment>
                                <div className="col-6 col-md-3 mt-5 mb-5">
                                    <div className="px-5">
                                        StartDate:
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) =>
                                                setStartDate(
                                                    ISODate(
                                                        new Date(
                                                            date
                                                        ).toISOString()
                                                    )
                                                )
                                            }
                                            selectsStart
                                            startDate={new Date(startDate)}
                                            endDate={new Date(endDate)}
                                        />
                                        EndDate:
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) =>
                                                setEndDate(
                                                    ISODate(
                                                        new Date(
                                                            date
                                                        ).toISOString()
                                                    )
                                                )
                                            }
                                            selectsEnd
                                            startDate={startDate}
                                            endDate={new Date(endDate)}
                                            minDate={new Date(startDate)}
                                        />
                                    </div>

                                    <div className="px-5">
                                        <div className="mt-5">
                                            <h4 className="mb-3">Categories</h4>

                                            <ul className="pl-0">
                                                {genres.map((genre) => (
                                                    <li
                                                        style={{
                                                            cursor: 'pointer',
                                                            listStyleType:
                                                                'none',
                                                        }}
                                                        key={genre}
                                                        onClick={() =>
                                                            setGenre(genre)
                                                        }
                                                    >
                                                        {genre}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <hr className="my-3" />

                                        <div className="mt-5">
                                            <h4 className="mb-3">Ratings</h4>

                                            <ul className="pl-0">
                                                {[5, 4, 3, 2, 1, 0].map(
                                                    (star) => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType:
                                                                    'none',
                                                            }}
                                                            key={star}
                                                            onClick={() =>
                                                                setRating(star)
                                                            }
                                                        >
                                                            <div className="rating-outer">
                                                                <div
                                                                    className="rating-inner"
                                                                    style={{
                                                                        width: `${
                                                                            star *
                                                                            20
                                                                        }%`,
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-6 col-md-9">
                                    <div className="row">
                                        {movies &&
                                            movies.map((movie) => (
                                                <Movie
                                                    key={movie._id}
                                                    movie={movie}
                                                    col={3}
                                                />
                                            ))}
                                    </div>
                                </div>
                            </Fragment>
                            {/* {movies &&
                                movies.map((movie) => (
                                    <Movie
                                        key={movie._id}
                                        movie={movie}
                                        col={3}
                                    />
                                ))} */}
                        </div>
                    </section>
                    {resPerPage < count && (
                        <div className="d-flex justify-content-center">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={moviesCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}
                </Fragment>
            )}
            <Footer />
        </Fragment>
    );
};

export default Home;
