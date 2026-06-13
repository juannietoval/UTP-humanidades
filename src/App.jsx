import React from 'react';
import { syllabusData } from './data/syllabus';
import logoUrl from './assets/assets/logo_utp/2.UTP_negro (2).svg';
import './index.css';

function Navbar() {
  return (
    <nav className="nav-bar">
      <div className="nav-links">
        <a href="#inicio" className="nav-link" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logoUrl} alt="UTP Logo" className="nav-logo-img" />
        </a>
        <a href="#programa" className="nav-link">Programa</a>
        <a href="#proceso" className="nav-link">Proceso</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="mural-hero" id="inicio">
      <div className="container">
        <div className="hero-content">
          <h1>Humanidades, Memoria y Política</h1>
          <p>Un acercamiento reflexivo, sensible y situado a las múltiples dimensiones de lo humano —histórica, económica, política, social y cultural— como base para proyectar la existencia y el mundo por venir.</p>
          <a href="#programa" className="btn-primary" style={{ marginTop: '16px' }}>Explorar Contenidos</a>
        </div>
      </div>
    </header>
  );
}

function Programa({ data }) {
  return (
    <section className="section" id="programa">
      <div className="container">
        <h2 style={{ marginBottom: 'calc(var(--base-unit) * 6)', borderBottom: '2px solid var(--primary)', paddingBottom: '16px' }}>Programa Académico</h2>
        
        <div className="grid" style={{ marginBottom: 'calc(var(--base-unit) * 8)' }}>
          <div style={{ gridColumn: 'span 4' }}>
            <h3>Objetivos</h3>
            <p className="label">Propósitos de formación</p>
          </div>
          <div style={{ gridColumn: 'span 8' }}>
            <ul className="archival-list">
              {data.objetivos.map((obj, i) => (
                <li key={i}>
                  <span className="date">{obj.tipo}</span>
                  <span>{obj.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid" style={{ marginBottom: 'calc(var(--base-unit) * 8)' }}>
          <div style={{ gridColumn: 'span 4' }}>
            <h3>Resultados de Aprendizaje</h3>
            <p className="label">Indicadores de desempeño</p>
          </div>
          <div style={{ gridColumn: 'span 8' }}>
            <ul className="archival-list">
              {data.resultados.map((res, i) => (
                <li key={i}>
                  <span className="date">{res.tipo}</span>
                  <span>{res.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3>Contenidos: Núcleos Problemáticos</h3>
        <div className="grid" style={{ marginTop: 'calc(var(--base-unit) * 4)' }}>
          {data.nucleos.map((n, i) => (
            <div className="card" style={{ gridColumn: 'span 4' }} key={i}>
              {n.img ? (
                <div className="portrait-frame">
                  <img src={n.img} alt={`Retrato histórico ${n.id}`} />
                </div>
              ) : (
                <div style={{ border: '1px solid var(--primary)', padding: 'calc(var(--base-unit)*4)', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--tertiary)', marginBottom: 'calc(var(--base-unit) * 2)' }}>
                  <h1 style={{ margin: 0 }}>{n.id}</h1>
                </div>
              )}
              <span className="label">Núcleo {n.id}</span>
              <h3 className="card-title">{n.title}</h3>
              <p className="card-text">{n.desc}</p>
              <div style={{ marginTop: '16px', fontSize: '14px', borderTop: '1px solid var(--primary)', paddingTop: '8px' }}>
                <strong>Lectura clave:</strong> {n.lectura}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Proceso({ data }) {
  return (
    <section className="section section-light" id="proceso">
      <div className="container">
        <h2 style={{ marginBottom: 'calc(var(--base-unit) * 6)', borderBottom: '2px solid var(--primary)', paddingBottom: '16px' }}>Proceso de Formación</h2>

        <div className="grid" style={{ marginBottom: 'calc(var(--base-unit) * 8)' }}>
          <div style={{ gridColumn: 'span 4' }}>
            <h3>Metodología</h3>
            <p className="label">Estrategias de aprendizaje</p>
          </div>
          <div style={{ gridColumn: 'span 8' }}>
            <ul className="archival-list">
              {data.metodologia.map((met, i) => (
                <li key={i}>
                  <span className="date">{met.tipo}</span>
                  <span>{met.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid">
          <div style={{ gridColumn: 'span 4' }}>
            <h3>Evaluación</h3>
            <p className="label">Formativa y Acumulativa</p>
          </div>
          <div style={{ gridColumn: 'span 8' }}>
            <div className="grid">
              {data.evaluacion.map((ev, i) => (
                <div className="card" style={{ gridColumn: 'span 4', backgroundColor: 'var(--neutral)' }} key={i}>
                  <h1 style={{ marginBottom: '8px' }}>{ev.percent}</h1>
                  <span className="label">{ev.label}</span>
                  <p style={{ fontSize: '14px', marginTop: '16px' }}>{ev.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="section section-light" style={{ paddingBottom: 'calc(var(--margin-edge) * 0.5)' }}>
      <div className="container">
        <div className="grid">
          <div style={{ gridColumn: 'span 12' }}>
            <p className="label">Universidad Tecnológica de Pereira | Departamento de Humanidades</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', marginTop: 'var(--base-unit)' }}>Docente: Miguel Ángel Puentes Castro | miguel85@utp.edu.co</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Programa data={syllabusData.programa} />
      <Proceso data={syllabusData.proceso} />
      <Footer />
    </>
  );
}

export default App;
