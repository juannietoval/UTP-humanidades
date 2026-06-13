import React from 'react';
import { Link } from 'react-router-dom';
import logoUrl from '../assets/assets/logo_utp/2.UTP_negro (2).svg';

export default function Navbar() {
  return (
    <nav className="nav-bar">
      <div className="nav-links">
        <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logoUrl} alt="UTP Logo" className="nav-logo-img" />
        </Link>
        <Link to="/programa" className="nav-link">Programa</Link>
        <Link to="/proceso" className="nav-link">Proceso</Link>
      </div>
    </nav>
  );
}
