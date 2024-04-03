import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();
    
    const handleClick = (event) => {
        event.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className="container head">
            <div className="head-title animate__animated animate__fadeIn" onClick={handleClick} style={{'cursor':'pointer'}}>
                <h1 className="card-title">Hutangku! 🎉</h1>
                <p className="m-0 p-0">Catatan peminjaman.</p>
            </div>
        </div>
    );
}

export default Header;
