import React, { useState } from 'react';
import bucketService from '../../service/bucket.service';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const HutangCreate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        bucket_type: 'hutang',
        bucket_name: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await bucketService.create(formData);
            alert('Bucket created successfully');
            // Redirect to bucket list page after successful submission
            navigate('/hutang');
        } catch (error) {
            console.error('Error creating bucket:', error);
            alert('Failed to create bucket');
        }
    };

    return (
        <>
            <Header />
            <div className="container pt-5">
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <label className="form-label">Name</label>
                        <input className="form-control" type="text" id="bucket_name" name="bucket_name" value={formData.bucket_name} onChange={handleInputChange} />
                    </div>

                    <button type="submit" className="btn btn-info w-100 mt-3">Submit</button>
                </form>
            </div>
        </>
    );
}

export default HutangCreate;
