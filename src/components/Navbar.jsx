import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logoUrl from '../assets/assets/logo_utp/2.UTP_negro (2).svg';

export default function Navbar() {
  return (
    <nav className="nav-bar">
      <div className="nav-links">
        <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logoUrl} alt="UTP Logo" className="nav-logo-img" />
        </Link>
        <NavLink to="/programa" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Programa</NavLink>
        <NavLink to="/proceso" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Proceso</NavLink>
      </div>
    </nav>
  );
}
