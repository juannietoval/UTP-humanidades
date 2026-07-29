import React from 'react';
import { Link } from 'react-router-dom';
import contentData from '../data/content.json';

export default function Home() {
  const { home } = contentData;
  return (
    <>
      <header className="mural-hero" id="inicio">
        <div className="container">
          <div className="hero-content">
            <h1>{home.title}</h1>
            <p>{home.description}</p>
            <Link to="/programa" className="btn-primary" style={{ marginTop: '16px' }}>Explorar Contenidos</Link>
          </div>
        </div>
      </header>

      <section className="section section-light">
        <div className="container">
          <p style={{ textAlign: 'center', fontSize: '1.25rem', fontWeight: 'bold' }}>
            {home.footerText}
          </p>
        </div>
      </section>
    </>
  );
}
