import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/Home';
import Home2 from './components/Home2';
import Home3 from './components/Home3';

import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userActions';
import store from './store';

// Movie files
import MovieDetails from './components/home/MovieDetails';
import Dashboard from './components/admin/Dashboard';

import MoviesList from './components/admin/movie/MoviesList';
import NewMovie from './components/admin/movie/NewMovie';
import UpdateMovie from './components/admin/movie/UpdateMovie';
import MovieReviewList from './components/admin/movie/MovieReviewList';

// actor files
import ActorsList from './components/admin/actor/ActorsList';
import NewActor from './components/admin/actor/NewActor';
import UpdateActor from './components/admin/actor/UpdateActor';
import ActorDetails from './components/home/ActorDetails';
import ActorReviewList from './components/admin/actor/ActorReviewList';

// producer files
import ProducersList from './components/admin/producer/ProducersList';
import NewProducer from './components/admin/producer/NewProducer';
import UpdateProducer from './components/admin/producer/UpdateProducer';

// Auth or User imports
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <Router>
            <div className="App">
                <Header />
                <div className="container-fluid">
                    <Redirect exact from="/" to="/movies" />
                    <Route path="/movies" component={Home} exact />
                    <Route path="/actors" component={Home2} exact />
                    <Route path="/producers" component={Home3} exact />
                    <Route path="/movies/search/:keyword" component={Home} />
                    <Route path="/actors/search/:keyword" component={Home2} />
                    <Route path="/movie/:id" component={MovieDetails} exact />
                    <Route path="/actor/:id" component={ActorDetails} exact />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route
                        path="/password/forgot"
                        component={ForgotPassword}
                        exact
                    />
                    <Route
                        path="/password/reset/:token"
                        component={NewPassword}
                        exact
                    />
                    <ProtectedRoute path="/me" component={Profile} exact />
                    <ProtectedRoute
                        path="/me/update"
                        component={UpdateProfile}
                        exact
                    />
                    <ProtectedRoute
                        path="/password/update"
                        component={UpdatePassword}
                        exact
                    />

                    <ProtectedRoute
                        path="/dashboard"
                        isAdmin={true}
                        component={Dashboard}
                        exact
                    />

                    <ProtectedRoute
                        path="/admin/actors"
                        isAdmin={true}
                        component={ActorsList}
                        exact
                    />
                    <ProtectedRoute
                        path="/admin/new/actor"
                        isAdmin={true}
                        component={NewActor}
                        exact
                    />
                    <ProtectedRoute
                        path="/admin/update/actor/:id"
                        isAdmin={true}
                        component={UpdateActor}
                        exact
                    />
                    <ProtectedRoute
                        path="/admin/reviews/actor/:id"
                        isAdmin={true}
                        component={ActorReviewList}
                        exact
                    />

                    <ProtectedRoute
                        path="/admin/producers"
                        isAdmin={true}
                        component={ProducersList}
                        exact
                    />
                    <ProtectedRoute
                        path="/admin/new/producer"
                        isAdmin={true}
                        component={NewProducer}
                        exact
                    />
                    <ProtectedRoute
                        path="/admin/update/producer/:id"
                        isAdmin={true}
                        component={UpdateProducer}
                        exact
                    />

                    <ProtectedRoute
                        path="/admin/movies"
                        isAdmin={true}
                        component={MoviesList}
                        exact
                    />
                    <ProtectedRoute
                        path="/admin/new/movie"
                        isAdmin={true}
                        component={NewMovie}
                        exact
                    />
                    <ProtectedRoute
                        path="/admin/update/movie/:id"
                        isAdmin={true}
                        component={UpdateMovie}
                        exact
                    />
                    <ProtectedRoute
                        path="/admin/reviews/movie/:id"
                        isAdmin={true}
                        component={MovieReviewList}
                        exact
                    />
                </div>
            </div>
        </Router>
    );
}
export default App;
