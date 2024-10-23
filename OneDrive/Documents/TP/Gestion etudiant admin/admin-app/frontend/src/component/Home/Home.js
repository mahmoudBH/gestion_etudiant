import React, { useState } from 'react';
import Header from '../Main/Header'; // Assurez-vous que le chemin est correct
import NavContainer from '../Main/NavContainer'; // Assurez-vous que le chemin est correct
import './Home.css'; // Assurez-vous que le fichier CSS est présent

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false); // État pour suivre l'ouverture du menu

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Inverser l'état du menu
  };

  return (
    <div className="Home">
      <Header toggleMenu={toggleMenu} />
      <div className={`navcontainer ${menuOpen ? 'open' : ''}`}>
        <NavContainer />
      </div>
    </div>
  );
};

export default Home;
