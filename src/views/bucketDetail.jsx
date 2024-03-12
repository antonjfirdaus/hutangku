import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import bucketService from '../service/bucket.service';
import transactionService from '../service/transaction.service';

const BucketDetail = ({ props }) => {

  let { bucket_id } = useParams();

  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


  const [bucket, setBucket] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [totalTransaction, setTotalTransaction] = useState([]);
  const [payedTransaction, setPayedTransaction] = useState([]);
  const [sisaTransaction, setSisaTransaction] = useState([]);

  const createLink = `/bucket/${props}/add/${bucket_id}`;

  useEffect(() => {

    const fetchBucket = async () => {
      try {
        const fetchedBucket = await bucketService.getById(bucket_id);
        console.log(fetchedBucket);
        setBucket(fetchedBucket);
      } catch (error) {
        console.error('Error fetching buckets:', error);
      }
    };
  
    const fetchTransactions = async () => {
      try {
        const fetchedTransactions = await transactionService.getByBucketId(bucket_id);
        setTransaction(fetchedTransactions);

        setTotalTransaction(fetchedTransactions.filter(item => {
          return item.txn_amount < 0;
        }).reduce((acc, item) => {
          return acc + parseFloat(item.txn_amount);
        }, 0).toFixed(2)*-1);

        setPayedTransaction(fetchedTransactions.filter(item => {
          return item.txn_amount > 0;
        }).reduce((acc, item) => {
          return acc + parseFloat(item.txn_amount);
        }, 0).toFixed(2));

        setSisaTransaction(fetchedTransactions.reduce((acc, item) => {
          return acc + parseFloat(item.txn_amount);
        }, 0).toFixed(2)*-1);


      } catch (error) {
        console.error('Error fetching buckets:', error);
      }
    };

    fetchTransactions(); // Call fetchBuckets directly inside useEffect
    fetchBucket();

  }, [bucket_id]); // Remove fetchBuckets from the dependency array


  return (
    <>
      <div className="row mt-3 pt-2">
        <div className='col-12 mb-0'>
        <a href={createLink} className="btn btn-sm btn-outline-primary">Create transaction</a>
        </div>
        <div className='col-12'>
          <div className="card-body pt-3">
            <h5 className="card-title text-secondary">{bucket.bucket_name}</h5>
            
            <div className="bucket-meta bg-light py-1">
              <small className="text-primary d-block">Rp. {totalTransaction}</small>
              <small className="mb-0 text-info">Rp. {payedTransaction}</small>
              <small className="mb-0 text-danger">Rp. {sisaTransaction}</small>
            </div>
          </div>
        </div>
        <div className='col-12 px-0 pt-3'>
            <ul className="mx-0 px-0 dv-70">

              {transaction.map(txn => (
                <li key={txn.id} className="row mx-0 p-0">
                    <div className="col-10 py-0">
                      <small className="text-muted">{new Date(txn.txn_date).toLocaleDateString("en-US", options)}</small>
                      <small className="text-muted d-block">{txn.description}</small>
                    </div>
                    <div className='col-2 py-0 text-end'>
                      <a className="btn btn-xs text-danger h1 mb-0 pb-0" href="/"><i className='bx bx-x'></i></a>
                    </div>
                    <div className="col-12 py-0 mb-2">
                      {
                        txn.txn_amount < 0 ? <small className='text-danger'>{txn.txn_amount}</small> : <small className='text-info'>+{txn.txn_amount}</small>
                      }
                    </div>
                </li>
              ))}
            </ul>

        </div>

      </div>
    </>
  )
}

export default BucketDetail
