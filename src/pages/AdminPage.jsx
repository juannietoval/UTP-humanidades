import React, { useState } from 'react';
import { Octokit } from "octokit";
import Home from './Home';
import LaboratorioPage from './LaboratorioPage';
import ActividadesPage from './ActividadesPage';

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [repo, setRepo] = useState('juannietoval/UTP-humanidades');
  const [content, setContent] = useState(null);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('editor');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const octokit = new Octokit({ auth: token });
      const [owner, repoName] = repo.split('/');
      
      // Load Content
      const response = await octokit.rest.repos.getContent({
        owner,
        repo: repoName,
        path: 'src/data/content.json',
      });
      
      // Load Assets
      try {
        const assetsResponse = await octokit.rest.repos.getContent({
          owner,
          repo: repoName,
          path: 'src/assets/assets',
        });
        if (Array.isArray(assetsResponse.data)) {
          setAssets(assetsResponse.data.filter(f => f.type === 'file').map(f => f.name));
        }
      } catch(e) {
        console.warn("Could not load assets directory", e);
      }

      const contentDecoded = decodeURIComponent(escape(atob(response.data.content)));
      setContent({
        data: JSON.parse(contentDecoded),
        sha: response.data.sha,
        owner,
        repoName
      });
    } catch (err) {
      setMessage('Error de autenticación o repositorio no encontrado.');
      console.error(err);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!content) return;
    setLoading(true);
    setMessage('');
    try {
      const octokit = new Octokit({ auth: token });
      const contentEncoded = btoa(unescape(encodeURIComponent(JSON.stringify(content.data, null, 2))));
      
      await octokit.rest.repos.createOrUpdateFileContents({
        owner: content.owner,
        repo: content.repoName,
        path: 'src/data/content.json',
        message: 'Update content via CMS',
        content: contentEncoded,
        sha: content.sha
      });
      
      setMessage('¡Cambios guardados con éxito! GitHub Pages tardará un par de minutos en actualizar.');
    } catch (err) {
      setMessage('Error al guardar. Verifica que tu token tiene permisos.');
      console.error(err);
    }
    setLoading(false);
  };

  const handleChange = (path, value) => {
    const keys = path.split('.');
    setContent(prev => {
      const newData = JSON.parse(JSON.stringify(prev.data));
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return { ...prev, data: newData };
    });
  };

  return (
    <section className="section section-light" style={{ minHeight: '80vh', padding: '40px 20px' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', background: 'var(--neutral)', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '24px' }}>Panel de Edición (CMS)</h2>
        
        {!content ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'var(--font-body)' }}>Ingresa un Personal Access Token (PAT) de GitHub con permisos de escritura (repo) para conectarte al repositorio.</p>
            <input 
              type="text" 
              placeholder="Ej. juannietoval/UTP-humanidades" 
              value={repo} 
              onChange={e => setRepo(e.target.value)}
              style={{ padding: '16px', border: '1px solid var(--secondary)', fontFamily: 'var(--font-mono)', fontSize: '1rem' }}
            />
            <input 
              type="password" 
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx" 
              value={token} 
              onChange={e => setToken(e.target.value)}
              style={{ padding: '16px', border: '1px solid var(--secondary)', fontFamily: 'var(--font-mono)', fontSize: '1rem' }}
            />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Conectando...' : 'Conectar y Cargar Contenido'}
            </button>
            {message && <p style={{ color: 'red', fontFamily: 'var(--font-body)' }}>{message}</p>}
          </form>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="label" style={{ marginRight: '16px' }}>Conectado a: {content.owner}/{content.repoName}</span>
                <button onClick={() => setContent(null)} style={{ background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontFamily: 'var(--font-body)', color: 'red' }}>Desconectar</button>
              </div>
              <button onClick={handleSave} className="btn-primary" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar y Publicar en GitHub'}
              </button>
            </div>
            
            {message && <div style={{ background: '#d4edda', color: '#155724', padding: '16px', marginBottom: '24px', fontFamily: 'var(--font-body)', border: '1px solid #c3e6cb' }}>{message}</div>}

            {/* Editor / Preview Tabs */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', borderBottom: '1px solid var(--primary)', paddingBottom: '16px' }}>
              <button 
                onClick={() => setActiveTab('editor')}
                style={{ 
                  background: activeTab === 'editor' ? 'var(--primary)' : 'transparent',
                  color: activeTab === 'editor' ? 'var(--neutral)' : 'var(--primary)',
                  border: '2px solid var(--primary)',
                  padding: '8px 24px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  transition: 'all 0.2s'
                }}
              >
                Editor
              </button>
              <button 
                onClick={() => setActiveTab('preview')}
                style={{ 
                  background: activeTab === 'preview' ? 'var(--primary)' : 'transparent',
                  color: activeTab === 'preview' ? 'var(--neutral)' : 'var(--primary)',
                  border: '2px solid var(--primary)',
                  padding: '8px 24px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  transition: 'all 0.2s'
                }}
              >
                Previsualización
              </button>
            </div>

            {activeTab === 'editor' && (
              <div className="grid">
                {/* Left Column: Form */}
                <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  
                  {/* Home */}
                  <div style={{ border: '1px solid var(--secondary)', padding: '24px' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)' }}>Página de Inicio</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                      <label className="label">Título principal</label>
                      <input type="text" value={content.data.home.title} onChange={e => handleChange('home.title', e.target.value)} style={{ padding: '12px', fontFamily: 'var(--font-body)', fontSize: '1rem', border: '1px solid var(--secondary)' }} />
                      <label className="label">Descripción</label>
                      <textarea value={content.data.home.description} onChange={e => handleChange('home.description', e.target.value)} rows={4} style={{ padding: '12px', fontFamily: 'var(--font-body)', fontSize: '1rem', border: '1px solid var(--secondary)' }} />
                      <label className="label">Texto pie de página</label>
                      <input type="text" value={content.data.home.footerText} onChange={e => handleChange('home.footerText', e.target.value)} style={{ padding: '12px', fontFamily: 'var(--font-body)', fontSize: '1rem', border: '1px solid var(--secondary)' }} />
                    </div>
                  </div>

                  {/* Laboratorio */}
                  <div style={{ border: '1px solid var(--secondary)', padding: '24px' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)' }}>Laboratorio Digital</h3>
                    {content.data.laboratorio.map((lab, index) => (
                      <div key={index} style={{ borderTop: index !== 0 ? '1px dashed var(--secondary)' : 'none', paddingTop: index !== 0 ? '24px' : '0', marginTop: index !== 0 ? '24px' : '16px' }}>
                        <h4 style={{ marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>Tarjeta {index + 1}</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <label className="label">Título</label>
                          <input type="text" value={lab.title} onChange={e => handleChange(`laboratorio.${index}.title`, e.target.value)} style={{ padding: '12px', fontFamily: 'var(--font-body)', fontSize: '1rem', border: '1px solid var(--secondary)' }} />
                          <label className="label">Descripción</label>
                          <textarea value={lab.desc} onChange={e => handleChange(`laboratorio.${index}.desc`, e.target.value)} rows={2} style={{ padding: '12px', fontFamily: 'var(--font-body)', fontSize: '1rem', border: '1px solid var(--secondary)' }} />
                          <label className="label">Imagen (Archivo local o enlace http://...)</label>
                          <input type="text" value={lab.img} onChange={e => handleChange(`laboratorio.${index}.img`, e.target.value)} style={{ padding: '12px', fontFamily: 'var(--font-body)', fontSize: '1rem', border: '1px solid var(--secondary)' }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actividades - Proximos */}
                  <div style={{ border: '1px solid var(--secondary)', padding: '24px' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)' }}>Actividades: Próximos</h3>
                    {content.data.actividades.proximos.map((ev, index) => (
                      <div key={index} style={{ borderTop: index !== 0 ? '1px dashed var(--secondary)' : 'none', paddingTop: index !== 0 ? '24px' : '0', marginTop: index !== 0 ? '24px' : '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', gap: '16px' }}>
                          <div style={{ flex: 1 }}><label className="label">Día</label><input type="text" value={ev.dia} onChange={e => handleChange(`actividades.proximos.${index}.dia`, e.target.value)} style={{ padding: '12px', width: '100%', fontFamily: 'var(--font-body)' }} /></div>
                          <div style={{ flex: 1 }}><label className="label">Mes</label><input type="text" value={ev.mes} onChange={e => handleChange(`actividades.proximos.${index}.mes`, e.target.value)} style={{ padding: '12px', width: '100%', fontFamily: 'var(--font-body)' }} /></div>
                        </div>
                        <label className="label">Título</label>
                        <input type="text" value={ev.titulo} onChange={e => handleChange(`actividades.proximos.${index}.titulo`, e.target.value)} style={{ padding: '12px', fontFamily: 'var(--font-body)' }} />
                        <label className="label">Descripción</label>
                        <input type="text" value={ev.desc} onChange={e => handleChange(`actividades.proximos.${index}.desc`, e.target.value)} style={{ padding: '12px', fontFamily: 'var(--font-body)' }} />
                      </div>
                    ))}
                  </div>

                </div>

                {/* Right Column: Assets Viewer */}
                <div style={{ gridColumn: 'span 4' }}>
                  <div style={{ border: '1px solid var(--primary)', background: 'var(--tertiary)', padding: '24px', position: 'sticky', top: '24px' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)' }}>Imágenes Disponibles (Assets)</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', marginBottom: '16px' }}>Copia estos nombres exactos si quieres usar imágenes locales en el repositorio.</p>
                    {assets.length === 0 ? (
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>Cargando o no se encontraron imágenes...</p>
                    ) : (
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '600px', overflowY: 'auto' }}>
                        {assets.map((filename, i) => (
                          <li key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', padding: '8px 0', borderBottom: '1px solid #ccc', wordBreak: 'break-all' }}>
                            {filename}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preview' && (
              <div style={{ border: '2px solid var(--secondary)', background: 'var(--neutral)', padding: '24px', overflowY: 'auto', maxHeight: '1000px' }}>
                <div style={{ padding: '16px', background: 'var(--tertiary)', marginBottom: '32px', textAlign: 'center' }}>
                  <span className="label">Modo Previsualización (Cambios sin guardar)</span>
                </div>
                
                <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>--- Inicio ---</h1>
                <Home draftContent={content.data} />
                
                <h1 style={{ textAlign: 'center', margin: '40px 0' }}>--- Laboratorio ---</h1>
                <LaboratorioPage draftContent={content.data} />
                
                <h1 style={{ textAlign: 'center', margin: '40px 0' }}>--- Actividades ---</h1>
                <ActividadesPage draftContent={content.data} />
              </div>
            )}

          </div>
        )}
      </div>
    </section>
  );
}
