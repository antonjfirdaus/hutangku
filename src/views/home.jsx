import React, { useState, useEffect } from 'react';
import bucketService from '../service/bucket.service';

import ccWarning from '../assets/images/cc-warning.png'
import ccPrimary from '../assets/images/cc-primary.png'

const Home = () => {

  const [hutang, setHutang] = useState([]);
  const [piutang, setPiutang] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await bucketService.getSummary();
        setHutang(summary.filter(item => {return item.bucket_type === 'hutang';}).reduce((acc, item) => {
          return acc + parseFloat(item.bucket_amount);
        }, 0).toFixed(2));
        
        setPiutang(summary.filter(item => {return item.bucket_type === 'piutang';}).reduce((acc, item) => {
          return acc + parseFloat(item.bucket_amount);
        }, 0).toFixed(2));
      } catch (error) {
        console.error('Error fetching buckets:', error);
      }
    };
  
    fetchSummary(); // Call fetchBuckets directly inside useEffect
  
  }, [hutang, piutang]); // Remove fetchBuckets from the dependency array


  return (
    <>
      <div className="row pt-5 mt-5">
        <div className="col-lg-6 col-md-12 col-12 mb-4">
          <a href="/bucket/hutang">
            <div className="card">
              <div className="card-body">
                <div className="avatar flex-shrink-1 float-end">
                  <img src={ccWarning} alt='' className="rounded" />
                </div>
                <span className="fw-medium d-block text-danger">Hutang</span>
                <small className="text-secondary fw-medium">Uang yang dipinjam</small>
                <h5 className="card-title my-2">Rp. {hutang}</h5>
              </div>
            </div>
          </a>
        </div>
        <div className="col-lg-6 col-md-12 col-12 mb-4">
          <a href="bucket/piutang">
            <div className="card">
              <div className="card-body">
                <div className="avatar flex-shrink-0 float-end">
                  <img src={ccPrimary} alt='' className="rounded" />
                </div>
                <span className="fw-medium d-block text-info">Piutang</span>
                <small className="text-secondary fw-medium">Uang yang dipinjamkan</small>
                <h5 className="card-title my-2">Rp. {piutang}</h5>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  )
}

export default Home
