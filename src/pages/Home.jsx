import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <header className="mural-hero" id="inicio">
        <div className="container">
          <div className="hero-content">
            <h1>Humanidades, Memoria y Política</h1>
            <p>Un acercamiento reflexivo, sensible y situado a las múltiples dimensiones de lo humano —histórica, económica, política, social y cultural— como base para proyectar la existencia y el mundo por venir.</p>
            <Link to="/programa" className="btn-primary" style={{ marginTop: '16px' }}>Explorar Contenidos</Link>
          </div>
        </div>
      </header>

      <section className="section section-light">
        <div className="container">
          <div className="grid">
            <div style={{ gridColumn: 'span 4' }}>
              <h2 style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '8px' }}>Justificación</h2>
              <p className="label">Contexto del curso</p>
            </div>
            <div style={{ gridColumn: 'span 8', fontSize: '1.125rem' }}>
              <p>Las competencias académicas implican la formación de profesionales no solo en un quehacer específico, sino también en el desarrollo de capacidades comprensivas y analíticas sobre sí mismos y sobre su entorno.</p>
              
              <p>La reflexión sobre el sujeto contemporáneo, entendido como agente histórico y transformador de la realidad social, supone reconocer las múltiples dinámicas que han configurado el presente, un tiempo marcado por profundos desafíos a escala global, nacional y local. La crisis del capitalismo, la exacerbación de los conflictos internacionales, el cambio climático, la polarización política, el consumismo y la revolución tecnológica propia de la era digital, así como la creciente movilización social en torno a la paz, la memoria y el cuidado de la vida en todas sus formas, convierten este momento histórico en un reto mayúsculo para todos los campos del conocimiento y, en consecuencia, para los procesos educativos.</p>

              <p>En este marco, la asignatura se concibe como un escenario de reflexión, diálogo y creación individual y colectiva en torno a lo humano en el mundo contemporáneo, con un énfasis particular en su dimensión política, en la formación de sujetos políticos y en los procesos de construcción de memoria que desarrollan los sujetos y las comunidades para otorgar sentido al pasado, en función de la construcción de un presente y un futuro en los que se dignifique la vida humana.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
