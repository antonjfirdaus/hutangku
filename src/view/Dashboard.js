import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bucketService from '../service/bucket.service';
import Header from './components/Header';

const Dashboard = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        hutang: '0',
        piutang: '0'
    });

    useEffect(() => {
        document.body.classList.add('bg-head');

        const fetchSummary = async () => {
            try {
                const summary = await bucketService.getSummary();
                if (summary == null) {
                    setFormData({
                        hutang: '0',
                        piutang: '0'
                    })
                } else {
                    setFormData(summary);
                }
            } catch (error) {
                console.error('Error fetching buckets:', error);
            }
        };

        fetchSummary(); // Call fetchBuckets directly inside useEffect
    }, []);

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.setItem('isAuthenticated', 'false');
        navigate('/');
    };
    return (
        <>
            <div className="position-fixed fixed-bottom fixed-right pe-4 pb-4">
                <button className="btn btn-primary rounded-pill p-3 float-end" onClick={handleLogout}><i className='bx bx-log-out-circle'></i></button>
            </div>

            <Header />
            <div className="container body">
                <div className="row animate__animated animate__fadeIn">
                    <div className="col-12 mb-3">
                        <a href="/hutang">
                            <div className="card flex-grow-1">
                                <div className="card-body rounded p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-bar-to-left" width="60" height="60" viewBox="0 0 24 24" strokeWidth="1" stroke="#566a7f" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ 'marginLeft': '-8%', 'width': '30%' }}>
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M10 12l10 0" />
                                        <path d="M10 12l4 4" />
                                        <path d="M10 12l4 -4" />
                                        <path d="M4 4l0 16" />
                                    </svg>
                                    <h6 className="card-title mb-0">Hutang</h6>
                                    <p className="mb-0 small">Rp<span>{formData.hutang ?? '0'}</span></p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-12">
                        <a href="/piutang">
                            <div className="card flex-grow-1">
                                <div className="card-body rounded p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-bar-right" width="60" height="60" viewBox="0 0 24 24" strokeWidth="1" stroke="#566a7f" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ 'marginLeft': '-8%', 'width': '30%' }}>
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M20 12l-10 0" />
                                        <path d="M20 12l-4 4" />
                                        <path d="M20 12l-4 -4" />
                                        <path d="M4 4l0 16" />
                                    </svg>
                                    <h6 className="card-title mb-0">Piutang</h6>
                                    <p className="mb-0 small">Rp<span>{formData.piutang ?? '0'}</span></p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
