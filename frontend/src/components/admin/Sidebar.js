import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../actions/userActions';

const Sidebar = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.auth);
    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Logged out successfully.');
    };
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard">
                            <i className="fa fa-clipboard"></i> Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/movies">
                            <i className="fa fa-film"></i> Movies
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/actors">
                            <i className="fa fa-users"></i> Actors
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/producers">
                            <i className="fa fa-user-o"></i> Producers
                        </Link>
                    </li>
                </ul>
                {/* <ul>
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
                                    src={user.avatar && user.avatar.url}
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
                                <Link className="dropdown-item" to="/dashboard">
                                    Dashboard
                                </Link>
                            )}
                            <Link className="dropdown-item" to="/me">
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
                </ul> */}
                {/* <li>
                    <a
                        href="#productSubmenu"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="dropdown-toggle"
                    >
                        <i className="fa fa-product-hunt"></i> Products
                    </a>
                    <ul className="collapse list-unstyled" id="productSubmenu">
                        <li>
                            <Link className="dropdown-item" to="/me">
                                Profile
                            </Link>
                        </li>

                        <li>
                            <Link
                                className="dropdown-item text-danger"
                                to="/"
                                onClick={logoutHandler}
                            >
                                Logout
                            </Link>
                        </li>
                    </ul>
                </li> */}
            </nav>
        </div>
    );
};

export default Sidebar;
