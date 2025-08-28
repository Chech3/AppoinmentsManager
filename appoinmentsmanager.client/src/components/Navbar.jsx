import React from 'react';
import './Navbar.css'; // Importa el archivo CSS
import { Routes, Route, Link } from 'react-router-dom';
import AppM from './AppM';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">Logo</a>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Mi Crud</Link></li>
        <li><Link to="/crudCurso">Crud Curso</Link></li>
      </ul>

      
    </nav>
  );
};

export default Navbar;