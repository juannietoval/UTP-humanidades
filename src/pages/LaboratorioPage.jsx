import React from 'react';
import contentData from '../data/content.json';

export default function LaboratorioPage() {
  const { laboratorio } = contentData;
  // Dinámicamente cargamos las imágenes desde assets/assets/
  const cards = laboratorio.map(c => ({
    ...c,
    img: new URL(`../assets/assets/${c.img}`, import.meta.url).href
  }));

  return (
    <section className="section" id="laboratorio" style={{ minHeight: '80vh' }}>
      <div className="container">
        <h2 style={{ marginBottom: 'calc(var(--base-unit) * 6)', borderBottom: '2px solid var(--primary)', paddingBottom: '16px' }}>Laboratorio Digital</h2>

        <div className="grid" style={{ marginBottom: 'calc(var(--base-unit) * 8)' }}>
          {cards.map((c, i) => (
            <div className="card" style={{ gridColumn: 'span 4' }} key={i}>
              {c.img ? (
                <div className="portrait-frame">
                  <img src={c.img} alt={c.title} loading="lazy" />
                </div>
              ) : (
                <div style={{ border: '1px solid var(--primary)', padding: 'calc(var(--base-unit)*4)', aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--tertiary)', marginBottom: 'calc(var(--base-unit) * 2)' }}>
                </div>
              )}
              <h3 className="card-title">{c.title}</h3>
              <p className="card-text">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
