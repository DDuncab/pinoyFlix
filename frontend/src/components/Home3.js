import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Footer from './layout/Footer';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination';

import { getProducers } from '../actions/producerActions';
import MetaData from './layout/MetaData';
import Loader from './layout/Loader';
import Producer from './home/Producer';

const Home3 = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const alert = useAlert();
    const dispatch = useDispatch();

    const {
        loading,
        producers,
        error,
        producersCount,
        resPerPage,
        filteredProducersCount,
    } = useSelector((state) => state.producers);

    const keyword = match.params.keyword;

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }

        dispatch(getProducers(keyword, currentPage));
    }, [dispatch, alert, error, keyword, currentPage]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

    let count = producersCount;
    if (keyword) {
        count = filteredProducersCount;
    }
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={'Home'} />
                    <section id="producers" className="container-fluid">
                        <div className="row">
                            {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            {producers &&
                                                producers.map((producer) => (
                                                    <Producer
                                                        key={producer._id}
                                                        producer={producer}
                                                        col={3}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                producers &&
                                producers.map((producer) => (
                                    <Producer
                                        key={producer._id}
                                        producer={producer}
                                        col={3}
                                    />
                                ))
                            )}
                        </div>
                    </section>

                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={producersCount}
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

export default Home3;
