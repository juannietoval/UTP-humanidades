import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logoUrl from '../assets/assets/logo_utp/2.UTP_negro (2).svg';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Cerrar el menú automáticamente al cambiar de página
  React.useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logoUrl} alt="UTP Logo" className="nav-logo-img" />
      </Link>

      {/* Botón Hamburguesa (solo visible en móviles) */}
      <button
        className="hamburger-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? (
          /* Ícono X (cerrar) */
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        ) : (
          /* Ícono Hamburguesa (3 líneas) */
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        )}
      </button>

      {/* Enlaces de navegación */}
      <div className={`nav-links${menuOpen ? ' open' : ''}`}>
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} end>Inicio</NavLink>
        <NavLink to="/programa" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Programa</NavLink>
        <NavLink to="/proceso" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Procesos</NavLink>
        <NavLink to="/laboratorio" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Laboratorio Digital</NavLink>
        <NavLink to="/actividades" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Actividades</NavLink>
      </div>
    </nav>
  );
}
