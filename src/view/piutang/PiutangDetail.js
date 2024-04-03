import React, { useEffect, useState } from 'react';
import bucketService from '../../service/bucket.service';
import transactionService from '../../service/transaction.service';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const PiutangDetail = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [bucket, setBucket] = useState({ 'bucket_name': '', 'amount_total': '0', 'amount_bayar': '0', 'amount_sisa': '0' });
    const [transaction, setTransaction] = useState([]);

    useEffect(() => {
        const fetchBucket = async () => {
            try {
                const bucket = await bucketService.getById(id);
                setBucket(bucket);
            } catch (error) {
                console.error('Error fetching buckets:', error);
            }
        };

        const fetchTransactions = async () => {
            try {
                const transaction = await transactionService.getByBucketId(id);
                console.log(transaction)
                setTransaction(transaction);
            } catch (error) {
                console.error('Error fetching buckets transactions:', error);
            }
        };

        fetchBucket();
        fetchTransactions();
    }, [id]);

    const handleDelete = (itemId) => {
        try {
            const ress = transactionService.deleteById(itemId);
            alert('Bucket transaction successfully deleted');
            // Redirect to bucket list page after successful submission
            window.location.reload();
        } catch (error) {
            console.error('Error delete buckets transactions:', error);
        }
        
    };

    return (
        <>
            <div className="position-fixed fixed-bottom fixed-right pe-4 pb-4">
                <a href={`/piutang/create/${id}`} className="btn btn-primary rounded-pill p-3 float-end"><i className='bx bx-plus'></i></a>
            </div>

            <Header />

            <div className="container head-secondary">
                <div className="d-flex flex-column">
                    <div className="row">
                        <div className="col-12 mb-2">
                            <b className="ms-1">{bucket.bucket_name}</b>
                        </div>
                        <div className="col-4 px-2">
                            <div className="dv-one rounded">
                                <p className="dv-title">Total</p>
                                <small>Rp{bucket.amount_total}</small>
                            </div>
                        </div>
                        <div className="col-4 px-2">
                            <div className="dv-two rounded">
                                <p className="dv-title">Dibayar</p>
                                <small>Rp{bucket.amount_bayar}</small>
                            </div>
                        </div>
                        <div className="col-4 px-2">
                            <div className="dv-three rounded">
                                <p className="dv-title">Sisa</p>
                                <small>Rp{bucket.amount_sisa}</small>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="container body-secondary">
                <div className="row">

                    {transaction.map(txn => (
                        <div key={txn.id} className="col-12 mb-3">
                            <div className={parseFloat(txn.amount) < 0 ? 'card d-flex flex-column rounded bg-out' : 'card d-flex flex-column rounded bg-in'}>
                                <div className="card-body p-1">
                                    <b className='btn-delete' onClick={() => handleDelete(txn.id)}><i className='bx bx-x'></i></b>
                                    <b className="text-date">{txn.date}</b>
                                    <div className="d-flex">
                                        <div>
                                            {
                                                parseFloat(txn.amount) < 0 ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        className="icon icon-tabler icon-tabler-circle-arrow-up-right"
                                                        width="40" height="40"
                                                        viewBox="0 0 24 24" strokeWidth="1"
                                                        stroke="#ff2825" fill="none"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z"
                                                            fill="none" />
                                                        <path
                                                            d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                                                        <path d="M15 9l-6 6" />
                                                        <path d="M15 15v-6h-6" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        className="icon icon-tabler icon-tabler-circle-arrow-down-left"
                                                        width="40" height="40"
                                                        viewBox="0 0 24 24" strokeWidth="1"
                                                        stroke="#27ad0f" fill="none"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                                                        <path d="M15 9l-6 6" />
                                                        <path d="M15 15h-6v-6" />
                                                    </svg>
                                                )
                                            }
                                        </div>
                                        <div className="ps-2 pt-1">
                                            <b className={parseFloat(txn.amount) < 0 ? 'd-block text-out' : 'd-block text-in'}>Rp.{txn.amount.replace('-', '')}</b>
                                            <small>{txn.description}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}

export default PiutangDetail;
