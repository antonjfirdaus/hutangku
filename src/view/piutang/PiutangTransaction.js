import React, { useState } from 'react';
import transactionService from '../../service/transaction.service';
import { useNavigate, useParams} from 'react-router-dom';
import Header from '../components/Header';

const PiutangTransaction = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        bucket_id: id,
        txn_date: Date.now(),
        txn_amount: '',
        description: ''
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
            await transactionService.create(formData);
            alert('Bucket transaction created successfully');
            // Redirect to bucket list page after successful submission
            navigate('/piutang/detail/'+id);
        } catch (error) {
            console.error('Error creating bucket transaction:', error);
            alert('Failed to create bucket transaction');
        }
    };

    return (
        <>
            <Header />
            <div className="container pt-5">
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <label className="form-label">Amount</label>
                        <input className="form-control" type="number" id="txn_amount" name="txn_amount" value={formData.txn_amount} onChange={handleInputChange} />
                    </div>

                    <div className="">
                        <label className="form-label">Description</label>
                        <textarea className="form-control" rows="3" id="description" name="description" onChange={handleInputChange} defaultValue={formData.description}></textarea>
                    </div>

                    <button type="submit" className="btn btn-info w-100 mt-3">Submit</button>
                </form>
            </div>
        </>
    );
}

export default PiutangTransaction;
