import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import Sidebar from '../Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducers, deleteProducer, clearErrors } from '../../../actions/producerActions'
import { DELETE_PRODUCER_RESET } from '../../../constants/producerConstants'

const ProducersList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch(); 
    const { loading, error, producers } = useSelector(state => state.producers);
    const { error: deleteError, isDeleted } = useSelector(state => state.producer)

    useEffect(() => {
        dispatch(getAdminProducers());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('producer deleted successfully');
            history.push('/admin/producers');
            dispatch({ type: DELETE_PRODUCER_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setproducers = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Contact',
                    field: 'contact',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        producers.forEach(producer => {
            data.rows.push({
                id: producer._id,
                name: producer.name,
                email: producer.email,
                contact: '+63'+producer.contact_num,
                actions: <Fragment>
                    <Link to={`/admin/update/producer/${producer._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteproducerHandler(producer._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteproducerHandler = (id) => {
        dispatch(deleteProducer(id))
    }

    return (
        <Fragment>
            <MetaData title={'All producers'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10 ">
                    <Fragment>
                        <h3 className="my-3">All producers</h3>
                        <button><Link to="/admin/new/producer"><i className="fa fa-plus"></i> producers</Link></button>
                        {loading ? <Loader /> : (

                            <MDBDataTable
                                data={setproducers()}
                                className="px-3"
                                container-sm="true"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ProducersList
