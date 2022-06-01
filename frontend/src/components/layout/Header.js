import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../actions/userActions';

import Search from './Search';

import '../../App.css';
import 'react-datepicker/dist/react-datepicker.css';

const Header = () => {
    const mystyle = {
        width: 'auto',
        height: '30px',
    };
    const alert = useAlert();
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.auth);
    // const { cartItems } = useSelector(state => state.cart)
    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Logged out successfully.');
    };

    return (
        <Fragment>
            <Navbar bg="light" variant="dark" expand="sm">
                <Navbar.Brand href="#home">
                    <img
                        src="/images/banner.png"
                        alt="banner"
                        style={mystyle}
                        className="d-inline-block align-top"
                    />{' '}
                </Navbar.Brand>
                <Link to="/movies" className="btn ml-4" id="login_btn">
                    Movies
                </Link>
                <Link to="/actors" className="btn ml-4" id="login_btn">
                    Actors
                </Link>
                <Link to="/producers" className="btn ml-4" id="login_btn">
                    Producers
                </Link>

                <Navbar.Collapse className="justify-content-end">
                    <div className="col-24 col-md-2 mt-2 mt-md-0">
                        <div className="input-group">
                            <div className="col-24 col-md-20 mt-2 mt-md-0 ">
                                <Route
                                    render={({ history }) => (
                                        <Search history={history} />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <Navbar.Text>
                        {/* <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                            {user ? (
                                <span> </span>
                            ) : (
                                !loading && (
                                    <Link
                                        to="/login"
                                        className="btn ml-4"
                                        id="login_btn"
                                    >
                                        Login
                                    </Link>
                                )
                            )}
                        </div> */}

                        <div className="col-12 col-md-2 mt-4 mt-md-0 text-center ">
                            {user ? (
                                <div className="ml-4 dropdown d-inline">
                                    <Link
                                        to="#!"
                                        className="btn dropdown-toggle text-white mr-4"
                                        type="button"
                                        id="dropDownMenuButton"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <figure className="avatar avatar-nav">
                                            <img
                                                src={
                                                    user.avatar &&
                                                    user.avatar.url
                                                }
                                                alt={user && user.name}
                                                className="rounded-circle"
                                            />
                                        </figure>
                                        <span>{user && user.name}</span>
                                    </Link>
                                    <div
                                        className="dropdown-menu"
                                        aria-labelledby="dropDownMenuButton"
                                    >
                                        {user && user.role === 'admin' && (
                                            <Link
                                                className="dropdown-item text-black"
                                                to="/dashboard"
                                            >
                                                Dashboard
                                            </Link>
                                        )}
                                        {/* <Link className="dropdown-item" to="/orders/me">Orders</Link> */}
                                        <Link
                                            className="dropdown-item text-black"
                                            to="/me"
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            className="dropdown-item text-danger"
                                            to="/"
                                            onClick={logoutHandler}
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                !loading && (
                                    <Link
                                        to="/login"
                                        className="btn ml-4"
                                        id="login_btn"
                                    >
                                        Login
                                    </Link>
                                )
                            )}
                        </div>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        </Fragment>
    );
};
export default Header;
