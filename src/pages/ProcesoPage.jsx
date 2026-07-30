import React from 'react';
import { syllabusData } from '../data/syllabus';

export default function ProcesoPage() {
  const data = syllabusData.programa;
  return (
    <section className="section section-light" id="proceso" style={{ minHeight: '80vh' }}>
      <div className="container">
        <h2 style={{ marginBottom: 'calc(var(--base-unit) * 6)', borderBottom: '2px solid var(--primary)', paddingBottom: '16px' }}>Procesos</h2>

        <h3 style={{ marginBottom: 'calc(var(--base-unit) * 4)' }}>Contenidos: Unidades</h3>
        <div className="grid" style={{ marginBottom: 'calc(var(--base-unit) * 8)' }}>
          {data.nucleos.map((n, i) => (
            <div className="card" style={{ gridColumn: 'span 4' }} key={i}>
              {n.img ? (
                <div className="portrait-frame">
                  <img src={n.img} alt={`Retrato histórico ${n.id}`} loading="lazy" />
                </div>
              ) : (
                <div style={{ border: '1px solid var(--primary)', padding: 'calc(var(--base-unit)*4)', aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--tertiary)', marginBottom: 'calc(var(--base-unit) * 2)' }}>
                  <h1 style={{ margin: 0 }}>{n.id}</h1>
                </div>
              )}
              <span className="label">Unidad {n.id}</span>
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
