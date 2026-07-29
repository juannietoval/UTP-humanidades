import React from 'react';
import contentData from '../data/content.json';

export default function ActividadesPage({ draftContent }) {
  const { actividades } = draftContent || contentData;
  const { proximos: eventosProximos, pasados } = actividades;

  // Process image paths for past events
  const eventosPasados = pasados.map(ev => ({
    ...ev,
    imgs: ev.imgs.map(imgPath => imgPath.startsWith('http') ? imgPath : new URL(`../assets/assets/${imgPath}`, import.meta.url).href)
  }));

  return (
    <section className="section" id="actividades" style={{ minHeight: '80vh' }}>
      <div className="container">
        <h2 style={{ marginBottom: 'calc(var(--base-unit) * 6)', borderBottom: '2px solid var(--primary)', paddingBottom: '16px' }}>Actividades y Eventos</h2>

        {/* Vista: Próximos Eventos */}
        <h3 style={{ marginBottom: 'calc(var(--base-unit) * 4)' }}>Próximos Eventos</h3>
        <div className="grid" style={{ marginBottom: 'calc(var(--base-unit) * 8)' }}>
          {eventosProximos.map(ev => (
            <div className="card" style={{ gridColumn: 'span 6', flexDirection: 'row', alignItems: 'center', gap: '24px' }} key={ev.id}>
              {/* Burbuja de fecha (Calendario) */}
              <div style={{ 
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: 'var(--tertiary)', border: '2px solid var(--primary)', 
                width: '80px', height: '80px', flexShrink: 0 
              }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 'bold', lineHeight: 1 }}>{ev.dia}</span>
                <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>{ev.mes}</span>
              </div>
              <div>
                <h3 style={{ margin: 0, marginBottom: '8px', fontSize: '1.25rem' }}>{ev.titulo}</h3>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--secondary)' }}>{ev.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Vista: Eventos Pasados */}
        <h3 style={{ marginBottom: 'calc(var(--base-unit) * 4)', marginTop: 'calc(var(--base-unit) * 8)' }}>Eventos Pasados</h3>
        <div className="grid">
          {eventosPasados.map(ev => (
            <div className="card" style={{ gridColumn: 'span 12' }} key={ev.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', borderBottom: '1px solid var(--primary)', paddingBottom: '12px' }}>
                <h3 style={{ margin: 0 }}>{ev.titulo}</h3>
                <span className="label" style={{ paddingLeft: '16px' }}>{ev.fecha}</span>
              </div>
              <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
                {ev.imgs.map((imgSrc, index) => (
                  <div key={index} style={{ border: '1px solid var(--primary)', flexShrink: 0, width: '320px', height: '220px', backgroundColor: 'var(--tertiary)' }}>
                    <img src={imgSrc} alt={`Memoria ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
