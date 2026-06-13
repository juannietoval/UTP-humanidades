import React from 'react';
import { syllabusData } from '../data/syllabus';

export default function ProcesoPage() {
  const data = syllabusData.proceso;
  return (
    <section className="section section-light" id="proceso" style={{ minHeight: '80vh' }}>
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
