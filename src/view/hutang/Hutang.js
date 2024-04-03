import React, { useEffect, useState } from 'react';
import bucketService from '../../service/bucket.service';
import Header from '../components/Header';

const Hutang = () => {

    const [buckets, setBuckets] = useState([]);
    useEffect(() => {
        document.body.classList.add('bg-head');

        const fetchList = async () => {
            try {
                const buckets = await bucketService.getByType('hutang');
                setBuckets(buckets);
            } catch (error) {
                console.error('Error fetching buckets:', error);
            }
        };

        fetchList();
    }, []);

    return (
        <>
            <div className="position-fixed fixed-bottom fixed-right pe-4 pb-4">
                <a href="/hutang/create" className="btn btn-primary rounded-pill p-3 float-end"><i className='bx bx-plus'></i></a>
            </div>

            <Header />

            <div className="container body">
                <div className="row animate__animated animate__fadeIn">

                    {buckets.map(bucket => (
                        <div key={bucket.id} className="col-12 mb-3">
                            <a href={'/hutang/detail/'+bucket.id}>
                                <div className="card d-flex flex-column">
                                    <div className="card-body px-3 py-2">
                                        <div className="row">
                                            <div className="col-12 px-2 mb-2">
                                                <b>{bucket.bucket_name}</b>
                                            </div>
                                            <div className="col-4 px-2">
                                                <div className="dv-one rounded">
                                                    <p className="dv-title">Total</p>
                                                    <small>Rp{bucket.amount_total.replace('-','')}</small>
                                                </div>
                                            </div>
                                            <div className="col-4 px-2">
                                                <div className="dv-two rounded">
                                                    <p className="dv-title">Dibayar</p>
                                                    <small>Rp{bucket.amount_bayar.replace('-','')}</small>
                                                </div>
                                            </div>
                                            <div className="col-4 px-2">
                                                <div className="dv-three rounded">
                                                    <p className="dv-title">Sisa</p>
                                                    <small>Rp{bucket.amount_sisa.replace('-','')}</small>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}

export default Hutang;
