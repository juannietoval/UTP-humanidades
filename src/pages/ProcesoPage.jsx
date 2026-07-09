import React from 'react';
import { syllabusData } from '../data/syllabus';

export default function ProcesoPage() {
  return (
    <section className="section section-light" id="proceso" style={{ minHeight: '80vh' }}>
      <div className="container">
        <h2 style={{ marginBottom: 'calc(var(--base-unit) * 6)', borderBottom: '2px solid var(--primary)', paddingBottom: '16px' }}>Proceso</h2>

        <div className="grid" style={{ marginBottom: 'calc(var(--base-unit) * 8)' }}>
          <div className="card" style={{ gridColumn: 'span 4' }}>
            <div style={{ border: '1px solid var(--primary)', padding: 'calc(var(--base-unit)*4)', aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--tertiary)', marginBottom: 'calc(var(--base-unit) * 2)' }}>
              <h1 style={{ margin: 0 }}>2026-1</h1>
            </div>
            <span className="label">Semestre</span>
            <h3 className="card-title">2026-1</h3>
            <p className="card-text"></p>
          </div>

          <div className="card" style={{ gridColumn: 'span 4' }}>
            <div style={{ border: '1px solid var(--primary)', padding: 'calc(var(--base-unit)*4)', aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--tertiary)', marginBottom: 'calc(var(--base-unit) * 2)' }}>
              <h1 style={{ margin: 0 }}>2026-2</h1>
            </div>
            <span className="label">Semestre</span>
            <h3 className="card-title">2026-2</h3>
            <p className="card-text"></p>
          </div>
        </div>
      </div>
    </section>
  );
}
