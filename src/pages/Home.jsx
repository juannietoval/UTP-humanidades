import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <header className="mural-hero" id="inicio">
      <div className="container">
        <div className="hero-content">
          <h1>Humanidades, Memoria y Política</h1>
          <p>Un acercamiento reflexivo, sensible y situado a las múltiples dimensiones de lo humano —histórica, económica, política, social y cultural— como base para proyectar la existencia y el mundo por venir.</p>
          <Link to="/programa" className="btn-primary" style={{ marginTop: '16px' }}>Explorar Contenidos</Link>
        </div>
      </div>
    </header>
  );
}
