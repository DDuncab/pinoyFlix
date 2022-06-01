import React from 'react';
import { Link } from 'react-router-dom';

const Producer = ({ producer, col }) => {
    return (
        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`} align="center">
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={producer.images[0].url}
                    alt="mm"
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/producer/${producer._id}`}>
                            {producer.name}
                        </Link>
                    </h5>
                    <div className="card-body">
                        Produced Movies:
                        {producer.movies &&
                            producer.movies.map((movie) => (
                                <p>{movie.mtitle}</p>
                            ))}
                    </div>

                    {/* <Link
                        to={`/producer/${producer._id}`}
                        id="view_btn"
                        className="btn btn-block"
                    >
                        View Details
                    </Link> */}
                </div>
            </div>
        </div>
    );
};

export default Producer;
