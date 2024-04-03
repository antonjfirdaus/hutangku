import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from  './components/Header'

const Login = () => {

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log('Form submitted with data:', formData);
    if (formData.username === 'admin' && formData.password === 'admin') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } else {
      alert('Invalid username or password');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <>
      <Header/>
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="form-outline mb-4">
          <label className="form-label">Username</label>
          <input className="form-control" type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">Password</label>
          <input className="form-control" id="password" name="password" value={formData.password} onChange={handleInputChange} />
        </div>

        <button type='submit' className="btn btn-primary w-100 mb-4">Login</button>
      </form>
    </div>
    </>
  );
}

export default Login;
