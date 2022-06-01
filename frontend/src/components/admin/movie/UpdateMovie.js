import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../../layout/MetaData'
import Sidebar from '../Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateMovie, getMovieDetails, clearErrors } from '../../../actions/movieActions'
import { UPDATE_MOVIE_RESET } from '../../../constants/movieConstants'

const UpdateMovie = ({ match, history }) => {

    const [mtitle, setmtitle] = useState('');
    const [genre, setgenre] = useState('');
    const [plot, setplot] = useState('');

    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, movie } = useSelector(state => state.movieDetails)
    const {  error: updateError, isUpdated } = useSelector(state => state.movie);

    const movieId = match.params.id;

    useEffect(() => {

        if (movie && movie._id !== movieId) {
            dispatch(getMovieDetails(movieId));
        } else {
            setmtitle(movie.mtitle);
            setgenre(movie.genre);
            setplot(movie.plot);
            setOldImages(movie.images)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors())
        }


        if (isUpdated) {

            history.push('/admin/movies');
            alert.success('movie updated successfully');
            dispatch({ type: UPDATE_MOVIE_RESET })

        }

    }, [dispatch, alert, error, isUpdated, history, updateError, movie, movieId])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('mtitle', mtitle);
        formData.set('plot', plot);
        formData.set('genre', genre);  
        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(updateMovie(movie._id, formData))
    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])
        setOldImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }


    return (
        <Fragment>
            <MetaData title={'Update movie'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Update movie</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">mtitle</label>
                                    <input
                                        type="text"
                                        id="mtitle_field"
                                        className="form-control"
                                        value={mtitle}
                                        onChange={(e) => setmtitle(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Plot</label>
                                    <textarea className="form-control" id="plot_field" rows="8" value={plot} onChange={(e) => setplot(e.target.value)}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name_field">genre</label>
                                    <select
                                        id="mtitle_field"
                                        className="form-control"
                                        value={genre}
                                        onChange={(e) => setgenre(e.target.value)}
                                    >
                                    <option value="">select - genre - </option>
                                    <option value="Action">Action</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Sci-Fi">Sci-Fi</option>
                                    <option value="Survival">Survival</option>
                                    <option value="Fantasy">Fantasy</option>
                                    <option value="Historical">Historical</option>
                                    </select>
                                </div>
                               
                                <div className='form-group'>
                                    <label>Images</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='movie_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                 </label>
                                    </div>

                                    {oldImages && oldImages.map(img => (
                                        <img key={img} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                >
                                    UPDATE
                            </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateMovie
