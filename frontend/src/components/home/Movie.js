import React from 'react';
import { Link } from 'react-router-dom';

const Movie = ({ movie, col }) => {
    return (
        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={movie.images[0].url}
                    alt="mm"
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/movie/${movie._id}`}>{movie.mtitle}</Link>
                    </h5>
                    {/* <h5>{movie.createdAt}</h5> */}
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div
                                className="rating-inner"
                                style={{
                                    width: `${(movie.ratings / 5) * 100}%`,
                                }}
                            ></div>
                        </div>
                        ({movie.numOfReviews} Reviews)
                    </div>
                    <Link
                        to={`/movie/${movie._id}`}
                        id="view_btn"
                        className="btn btn-block"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Movie;
