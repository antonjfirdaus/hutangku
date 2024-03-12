import React, { useState, useEffect } from 'react';
import bucketService from '../service/bucket.service';

const BucketList = ({ props }) => {
  let createUrl = '/bucket/' + props + '/create';

  const [buckets, setBuckets] = useState([]);
  

  useEffect(() => {
    const fetchBuckets = async () => {
      try {
        const fetchedBuckets = await bucketService.getByType(props);
        console.log(props, fetchedBuckets)
        setBuckets(fetchedBuckets);
      } catch (error) {
        console.error('Error fetching buckets:', error);
      }
    };
  
    fetchBuckets(); // Call fetchBuckets directly inside useEffect
  
  }, [props]); // Remove fetchBuckets from the dependency array
  


  return (
    <>
      <div className="row row mt-3">
        <div className='col-12 mb-3'>
          <a href={createUrl} className="btn btn-sm btn-outline-primary mt-4">Create bucket {props}</a>
        </div>

        {buckets.map(bucket => (
          <div key={bucket.id} className="col-lg-4 col-md-6 col-12 mb-3">
            <div className="card card-bucket">
              <div className="card-header p-3 pb-0">
                <div className="dropdown float-end">
                  <button className="btn pe-0" type="button" id="orederStatistics" data-bs-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i className="bx bx-dots-vertical-rounded"></i>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="orederStatistics">
                    <a className="dropdown-item" href="/">Remove</a>
                  </div>
                </div>
                <a href={`/bucket/hutang/detail/${bucket.id}`} className="">
                  <div className="card-title mb-0">
                    <h6 className="m-0 me-2">{bucket.bucket_name}</h6>
                    <small className="text-muted">Rp. {bucket.amount_total}</small>
                  </div>
                  </a>
              </div>
              <div className="card-body p-3 pt-0">
                <div className="bucket-meta">
                  <div className="mt-sm-auto left">
                    <small className="text-info text-nowrap fw-medium">Dibayar</small>
                    <h6 className="mb-0">Rp. {bucket.amount_bayar}</h6>
                  </div>
                  <div className="mt-sm-auto right">
                    <small className="text-danger text-nowrap fw-medium">Sisa</small>
                    <h6 className="mb-0">Rp. {bucket.amount_sisa}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </>
  )
}

export default BucketList
