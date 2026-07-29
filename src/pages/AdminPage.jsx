import React, { useState, useEffect } from 'react';
import { Octokit } from "octokit";
import { ContentProvider } from '../context/ContentContext';
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
  const [activePreview, setActivePreview] = useState('Home');

  const inputStyle = { 
    padding: '12px', 
    border: '1px solid var(--secondary)', 
    fontFamily: 'inherit',
    fontSize: '1rem',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '4px',
    display: 'block'
  };

  const fetchAssets = async (octokit, owner, repoName) => {
    try {
      const response = await octokit.rest.repos.getContent({
        owner,
        repo: repoName,
        path: 'src/assets/assets',
      });
      if (Array.isArray(response.data)) {
        setAssets(response.data.filter(f => f.type === 'file').map(f => f.name));
      }
    } catch (err) {
      console.error("No se pudieron cargar los assets", err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const octokit = new Octokit({ auth: token });
      const [owner, repoName] = repo.split('/');
      
      const response = await octokit.rest.repos.getContent({
        owner,
        repo: repoName,
        path: 'src/data/content.json',
      });
      
      const contentDecoded = atob(response.data.content);
      setContent({
        data: JSON.parse(contentDecoded),
        sha: response.data.sha,
        owner,
        repoName
      });

      await fetchAssets(octokit, owner, repoName);
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

  const renderPreview = () => {
    switch (activePreview) {
      case 'Home': return <Home />;
      case 'Laboratorio': return <LaboratorioPage />;
      case 'Actividades': return <ActividadesPage />;
      default: return <Home />;
    }
  };

  return (
    <section className="section section-light" style={{ minHeight: '100vh', padding: '40px 20px', background: '#f5f5f5' }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {!content ? (
          <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--neutral)', padding: '32px', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>Panel de Edición (CMS)</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{ textAlign: 'center' }}>Ingresa un Personal Access Token (PAT) de GitHub con permisos de escritura (repo) para conectarte al repositorio.</p>
              <div>
                <label style={labelStyle}>Repositorio</label>
                <input 
                  type="text" 
                  placeholder="Ej. juannietoval/UTP-humanidades" 
                  value={repo} 
                  onChange={e => setRepo(e.target.value)}
                  style={{ ...inputStyle, fontFamily: 'monospace' }}
                />
              </div>
              <div>
                <label style={labelStyle}>Token de GitHub</label>
                <input 
                  type="password" 
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx" 
                  value={token} 
                  onChange={e => setToken(e.target.value)}
                  style={{ ...inputStyle, fontFamily: 'monospace' }}
                />
              </div>
              <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '16px', fontSize: '1.1rem' }}>
                {loading ? 'Conectando...' : 'Conectar y Cargar Contenido'}
              </button>
              {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}
            </form>
          </div>
        ) : (
          <div className="grid" style={{ gap: '32px', alignItems: 'start' }}>
            
            {/* LEFT COLUMN: EDITOR */}
            <div style={{ gridColumn: 'span 5', background: 'var(--neutral)', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', maxHeight: '85vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #ddd', paddingBottom: '16px' }}>
                <h3 style={{ margin: 0 }}>Editor de Contenido</h3>
                <button onClick={() => setContent(null)} style={{ background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', color: 'var(--secondary)' }}>Desconectar</button>
              </div>
              
              {message && <div style={{ background: '#d4edda', color: '#155724', padding: '12px', marginBottom: '16px', borderRadius: '4px' }}>{message}</div>}

              {assets.length > 0 && (
                <div style={{ marginBottom: '32px', padding: '16px', background: '#eef2f5', borderRadius: '8px' }}>
                  <h4 style={{ marginTop: 0 }}>Imágenes Disponibles en assets</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {assets.map(a => <span key={a} style={{ background: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', border: '1px solid #ddd' }}>{a}</span>)}
                  </div>
                  <p style={{ fontSize: '0.85rem', marginTop: '8px', color: '#666' }}>Puedes copiar el nombre de estas imágenes o usar enlaces externos (http://...)</p>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                
                {/* HOME EDITOR */}
                <div>
                  <h3 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '8px', marginBottom: '16px' }}>Página de Inicio</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={labelStyle}>Título principal</label>
                      <input type="text" value={content.data.home.title} onChange={e => handleChange('home.title', e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Descripción</label>
                      <textarea value={content.data.home.description} onChange={e => handleChange('home.description', e.target.value)} rows={5} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Texto pie de página</label>
                      <input type="text" value={content.data.home.footerText} onChange={e => handleChange('home.footerText', e.target.value)} style={inputStyle} />
                    </div>
                  </div>
                </div>

                {/* LABORATORIO EDITOR */}
                <div>
                  <h3 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '8px', marginBottom: '16px' }}>Laboratorio Digital</h3>
                  {content.data.laboratorio.map((lab, index) => (
                    <div key={index} style={{ background: '#fafafa', padding: '16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #eee' }}>
                      <h4 style={{ margin: '0 0 16px 0' }}>Tarjeta {index + 1}</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                          <label style={labelStyle}>Título</label>
                          <input type="text" value={lab.title} onChange={e => handleChange(`laboratorio.${index}.title`, e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Descripción</label>
                          <input type="text" value={lab.desc} onChange={e => handleChange(`laboratorio.${index}.desc`, e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Imagen (nombre local o enlace HTTP)</label>
                          <input type="text" value={lab.img} onChange={e => handleChange(`laboratorio.${index}.img`, e.target.value)} style={inputStyle} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              <div style={{ position: 'sticky', bottom: 0, background: 'var(--neutral)', padding: '20px 0', borderTop: '1px solid #ddd', marginTop: '32px' }}>
                <button onClick={handleSave} className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }} disabled={loading}>
                  {loading ? 'Guardando...' : 'Guardar y Publicar en GitHub'}
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: PREVIEW */}
            <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', background: 'var(--neutral)', padding: '16px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <h4 style={{ margin: 0, alignSelf: 'center', marginRight: 'auto' }}>Previsualización en Vivo:</h4>
                <button className={`btn-primary ${activePreview === 'Home' ? '' : 'outline'}`} onClick={() => setActivePreview('Home')} style={{ padding: '8px 16px' }}>Inicio</button>
                <button className={`btn-primary ${activePreview === 'Laboratorio' ? '' : 'outline'}`} onClick={() => setActivePreview('Laboratorio')} style={{ padding: '8px 16px' }}>Laboratorio</button>
                <button className={`btn-primary ${activePreview === 'Actividades' ? '' : 'outline'}`} onClick={() => setActivePreview('Actividades')} style={{ padding: '8px 16px' }}>Actividades</button>
              </div>
              
              <div style={{ background: 'var(--neutral)', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden', height: '75vh', position: 'relative' }}>
                {/* Wrapping the preview in ContentProvider with the live content state */}
                <div style={{ transform: 'scale(0.8)', transformOrigin: 'top left', width: '125%', height: '125%', overflowY: 'auto', background: '#fff' }}>
                  <ContentProvider value={content.data}>
                    {renderPreview()}
                  </ContentProvider>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
