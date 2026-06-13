import React from 'react';
import { syllabusData } from '../data/syllabus';

export default function ProgramaPage() {
  const data = syllabusData.programa;
  return (
    <section className="section" id="programa" style={{ minHeight: '80vh' }}>
      <div className="container">
        <h2 style={{ marginBottom: 'calc(var(--base-unit) * 6)', borderBottom: '2px solid var(--primary)', paddingBottom: '16px' }}>Programa Académico</h2>

        <h3 style={{ marginBottom: 'calc(var(--base-unit) * 4)' }}>Contenidos: Núcleos Problemáticos</h3>
        <div className="grid" style={{ marginBottom: 'calc(var(--base-unit) * 8)' }}>
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

      </div>
    </section>
  );
}
