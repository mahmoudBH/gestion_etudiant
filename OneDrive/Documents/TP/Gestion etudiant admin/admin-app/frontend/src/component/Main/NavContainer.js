import React from 'react';
import './NavContainer.css';

const NavContainer = () => {
  return (
    <nav className="nav">
      <div className="nav-upper-options">
        <div className="nav-option option1">
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182148/Untitled-design-(29).png"
            className="nav-img"
            alt="dashboard"
          />
          <h3> Dashboard</h3>
        </div>
        <div className="nav-option option2">
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
            className="nav-img"
            alt="articles"
          />
          <h3> Articles</h3>
        </div>
        {/* Ajoutez d'autres options ici */}
      </div>
    </nav>
  );
};

export default NavContainer;
