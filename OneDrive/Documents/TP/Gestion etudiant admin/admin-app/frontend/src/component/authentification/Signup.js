import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './styles.css';  // Import du fichier CSS

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/admin/signup', {
        name: `${firstName} ${lastName}`, // Ensure this combines both names
        email,
        password,
      });
  
      // Save the user data in localStorage after signup
      localStorage.setItem('user', JSON.stringify({ name: `${firstName} ${lastName}`, email }));
      
      setMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.error);
      } else {
        setMessage('Erreur lors de la création de l\'admin.');
      }
    }
  };
  
  

  return (
    <div className="container">  {/* Conteneur qui centre le formulaire */}
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Register</p>
        <p className="message">Signup now and get full access to our app.</p>
        <div className="flex">
          <label>
            <input 
              required 
              type="text" 
              className="input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <span>Firstname</span>
          </label>

          <label>
            <input 
              required 
              type="text" 
              className="input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <span>Lastname</span>
          </label>
        </div>

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

        <label>
          <input 
            required 
            type="password" 
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span>Confirm password</span>
        </label>

        <button type="submit" className="submit">Submit</button>
        {message && <p className="message">{message}</p>}
        <p className="Login">
          Already have an account? <Link to="/">Login</Link> {/* Use Link instead of anchor */}
        </p>
      </form>
    </div>
  );
};

export default Signup;
