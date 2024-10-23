import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './component/authentification/Signup';  // Path to Signup component
import Login from './component/authentification/Login';    // Path to Login component
import Home from './component/Home/Home';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />        {/* Default route to Login */}
          <Route path="/signup" element={<Signup />} />  {/* Signup page */}
          <Route path="/home" element={<Home />} />      {/* Home page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
