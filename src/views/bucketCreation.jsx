import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bucketService from '../service/bucket.service';

const BucketCreation = ({ props }) => {

  const parentUrl = '/bucket/'+props;

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bucket_name: null,
    bucket_type: props
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
      await bucketService.create(formData);
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
      <div className='row'>
        <div className='col-12'>
          <div className="card-body mt-5 pt-3">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="bucketName">Bucket Name:</label>
                <input type="text" id="bucketName" name="bucket_name" className="form-control" value={formData.bucket_name} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="bucketType">Bucket Type:</label>
                <input type="text" id="bucketType" name="bucket_type" className="form-control" value={formData.bucket_type} onChange={handleChange} readOnly />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default BucketCreation
