import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Footer from './layout/Footer';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination';

import { getActors } from '../actions/actorActions';
import MetaData from './layout/MetaData';
import Loader from './layout/Loader';
import Actor from './home/Actor';

const Home2 = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rating, setRating] = useState(0);

    const alert = useAlert();
    const dispatch = useDispatch();

    const {
        loading,
        actors,
        error,
        actorsCount,
        resPerPage,
        filteredActorsCount,
    } = useSelector((state) => state.actors);

    const keyword = match.params.keyword;

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }

        dispatch(getActors(keyword, currentPage, rating));
    }, [dispatch, alert, error, keyword, currentPage, rating]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

    let count = actorsCount;
    if (keyword) {
        count = filteredActorsCount;
    }
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={'Home'} />
                    <section id="actors" className="container-fluid">
                        <div className="row">
                            <Fragment>
                                <div className="col-6 col-sm-2 mt-5 mb-5">
                                    <div className="px-5">
                                        <div className="px-5">
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
                                        {actors &&
                                            actors.map((actor) => (
                                                <Actor
                                                    key={actor._id}
                                                    actor={actor}
                                                    col={3}
                                                />
                                            ))}
                                    </div>
                                </div>
                            </Fragment>
                        </div>
                    </section>

                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={actorsCount}
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

export default Home2;
