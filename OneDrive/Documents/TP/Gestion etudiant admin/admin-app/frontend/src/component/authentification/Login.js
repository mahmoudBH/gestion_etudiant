import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Reuse the same CSS as the signup page

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        email,
        password,
      });
  
      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token); // Store the JWT token if needed
  
      setMessage(response.data.message);
      // Redirect to home page after successful login
      window.location.href = '/home'; // Or use navigate('/home') if you use react-router
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.error);
      } else {
        setMessage('Erreur lors de la connexion.');
      }
    }
  };
  

  return (
    <div className="container"> {/* Same container to center the form */}
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Login</p>
        <p className="message">Welcome back! Please enter your credentials.</p>

        <label>
          <input 
            required 
            type="email" 
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Email</span>
        </label>

        <label>
          <input 
            required 
            type="password" 
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Password</span>
        </label>

        <button type="submit" className="submit">Login</button>
        {message && <p className="message">{message}</p>}
        <p className="signin">Don't have an account? <a href="/signup">Signup</a></p>
      </form>
    </div>
  );
};

export default Login;
