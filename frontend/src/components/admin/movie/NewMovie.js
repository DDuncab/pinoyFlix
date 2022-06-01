import React, { Fragment, useState, useEffect } from 'react';

import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { newMovie, clearErrors } from '../../../actions/movieActions';
import { NEW_MOVIE_RESET } from '../../../constants/movieConstants';

import { getAdminActors } from '../../../actions/actorActions';
import { getAdminProducers } from '../../../actions/producerActions';

const NewMovie = ({ history }) => {
    const [mtitle, setmtitle] = useState('');
    const [genre, setgenre] = useState('');
    const [plot, setplot] = useState('');

    const [actor_here, setActor] = useState('');
    const [prod, setprod] = useState('');

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, success } = useSelector((state) => state.newMovie);
    const { actors, loading } = useSelector((state) => state.actors);
    const { producers } = useSelector((state) => state.producers);

    useEffect(() => {
        dispatch(getAdminActors());
        dispatch(getAdminProducers());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            history.push('/admin/movies');
            alert.success('movie created successfully');
            dispatch({ type: NEW_MOVIE_RESET });
        }
    }, [dispatch, alert, error, success, history]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('mtitle', mtitle);
        formData.set('plot', plot);
        formData.set('genre', genre);
        formData.set('actors', actor_here);
        formData.set('producers', prod);

        images.forEach((image) => {
            formData.append('images', image);
        });

        dispatch(newMovie(formData));
    };

    const onChange = (e) => {
        const files = Array.from(e.target.files);

        setImagesPreview([]);
        setImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((oldArray) => [
                        ...oldArray,
                        reader.result,
                    ]);
                    setImages((oldArray) => [...oldArray, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <MetaData title={'New movie'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form
                                className="shadow-lg"
                                onSubmit={submitHandler}
                                encType="multipart/form-data"
                            >
                                <h1 className="mb-4">New movie</h1>

                                <div className="form-group">
                                    <label htmlFor="mtitle_field">
                                        Movie Title
                                    </label>
                                    <input
                                        type="text"
                                        id="mtitle_field"
                                        className="form-control"
                                        value={mtitle}
                                        onChange={(e) =>
                                            setmtitle(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="plot_field">Plot</label>
                                    <textarea
                                        className="form-control"
                                        id="plot_field"
                                        rows="8"
                                        value={plot}
                                        onChange={(e) =>
                                            setplot(e.target.value)
                                        }
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="genre_field">Genre</label>
                                    <select
                                        id="genre_field"
                                        className="form-control"
                                        value={genre}
                                        onChange={(e) =>
                                            setgenre(e.target.value)
                                        }
                                    >
                                        <option value="Action">Action</option>
                                        <option value="Romance">Romance</option>
                                        <option value="Sci-Fi">Sci-Fi</option>
                                        <option value="Survival">
                                            Survival
                                        </option>
                                        <option value="Fantasy">Fantasy</option>
                                        <option value="Historical">
                                            Historical
                                        </option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="acto_fieldr">Actors</label>
                                    <select
                                        id="actor_field"
                                        className="form-control"
                                        value={actor_here}
                                        onChange={(e) =>
                                            setActor(e.target.value)
                                        }
                                    >
                                        <option
                                            key="default1"
                                            value="- select - actor - "
                                        ></option>
                                        {actors &&
                                            actors.map((actor) => (
                                                <option
                                                    key={actor._id}
                                                    value={actor._id}
                                                >
                                                    {actor.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="producer_field">
                                        Producers
                                    </label>
                                    <select
                                        id="producer_field"
                                        className="form-control"
                                        value={prod}
                                        onChange={(e) =>
                                            setprod(e.target.value)
                                        }
                                    >
                                        <option
                                            key="default"
                                            value="- select - producer - "
                                        ></option>
                                        {producers &&
                                            producers.map((producer) => (
                                                <option
                                                    key={producer._id}
                                                    value={producer._id}
                                                >
                                                    {producer.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Images</label>

                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            name="movie_images"
                                            className="custom-file-input"
                                            id="customFile"
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label
                                            className="custom-file-label"
                                            htmlFor="customFile"
                                        >
                                            Choose Images
                                        </label>
                                    </div>

                                    {imagesPreview.map((img) => (
                                        <img
                                            src={img}
                                            key={img}
                                            alt="Images Preview"
                                            className="mt-3 mr-2"
                                            width="55"
                                            height="52"
                                        />
                                    ))}
                                </div>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    CREATE
                                </button>
                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default NewMovie;
