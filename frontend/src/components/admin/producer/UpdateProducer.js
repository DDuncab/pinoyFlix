import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../../layout/MetaData'
import Sidebar from '../Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateProducer, getProducerDetails, clearErrors } from '../../../actions/producerActions'
import { UPDATE_PRODUCER_RESET } from '../../../constants/producerConstants'

const Updateproducer = ({ match, history }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])
    const [contact_num, setcontact_num] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, producer } = useSelector(state => state.producerDetails)
    const {  error: updateError, isUpdated } = useSelector(state => state.producer);

    const producerId = match.params.id;

    useEffect(() => {

        if (producer && producer._id !== producerId) {
            dispatch(getProducerDetails(producerId));
        } else {
            setName(producer.name);
            setEmail(producer.email);
            setOldImages(producer.images);
            setcontact_num(producer.contact_num)
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

            history.push('/admin/producers');
            alert.success('producer updated successfully');
            dispatch({ type: UPDATE_PRODUCER_RESET })

        }

    }, [dispatch, alert, error, isUpdated, history, updateError, producer, producerId])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);   
        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(updateProducer(producer._id, formData))
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
            <MetaData title={'Update producer'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Update producer</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact_field">Name</label>
                                    <input
                                        type="text"
                                        id="contact_field"
                                        className="form-control"
                                        value={contact_num}
                                        onChange={(e) => setcontact_num(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">email</label>
                                    <textarea className="form-control" id="description_field" rows="8" value={email} onChange={(e) => setEmail(e.target.value)}></textarea>
                                </div>

                                <div className='form-group'>
                                    <label>Images</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='producer_images'
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

export default Updateproducer
