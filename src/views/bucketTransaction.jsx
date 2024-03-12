import React, { useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import transactionService from '../service/transaction.service';

const BucketTransaction = ({ props }) => {

  let { bucket_id } = useParams();

  const parentUrl = `/bucket/${props}/detail/${bucket_id}`;

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bucket_id : bucket_id,
    txn_date : Date.now(),
    txn_amount: 0,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      await transactionService.create(formData);
      alert('Bucket created successfully');
      // Redirect to bucket list page after successful submission
      navigate(parentUrl);
    } catch (error) {
      console.error('Error creating bucket:', error);
      alert('Failed to create bucket');
    }
  };

  return (
    <>
      <div className='row mt-5 pt-3'>
        <div className='col-12'>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nominal</label>
              <div className="input-group">
                <input type="number" className="form-control" placeholder="Amount" id='txn_amount' name="txn_amount" value={formData.txn_amount} onChange={handleChange} />
                <span className="input-group-text">.00</span>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Desciption</label>
              <textarea className="form-control" placeholder='description...' id='description' name='description' value={formData.description} onChange={handleChange}/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>

      </div>
    </>
  )
}

export default BucketTransaction
