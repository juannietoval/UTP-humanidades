import React, { useState, useEffect } from 'react';
import { Octokit } from "octokit";
import { ContentProvider } from '../context/ContentContext';
import Home from './Home';
import LaboratorioPage from './LaboratorioPage';
import ActividadesPage from './ActividadesPage';

// --- Subcomponentes de UI ---

const Toast = ({ message, type, onClose }) => {
  if (!message) return null;
  const bg = type === 'success' ? '#2e7d32' : '#d32f2f';
  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', background: bg, color: '#fff', padding: '16px 24px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span>{message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem', padding: 0 }}>×</button>
    </div>
  );
};

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '16px', overflow: 'hidden' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        style={{ width: '100%', padding: '16px', background: '#f5f5f5', border: 'none', textAlign: 'left', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
      >
        {title}
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
      </button>
      {isOpen && <div style={{ padding: '16px', background: '#fff' }}>{children}</div>}
    </div>
  );
};

const ImageThumbnail = ({ value }) => {
  if (!value) return null;
  const isUrl = value.startsWith('http');
  // Hack: if not url, assume it's in assets folder (Note: vite's new URL meta import doesn't easily work with dynamic arbitrary strings in admin side without actually importing them all, but we can try to guess or just show broken link symbol)
  // For local files in Admin, since they aren't bundled the same way, we might just not show a true preview, but if it's an HTTP url we can!
  // To avoid complex dev-server resolutions for local assets inside this mini-component, we'll only show thumbnails for absolute URLs.
  if (isUrl) {
    return <img src={value} alt="preview" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />;
  }
  return <div style={{ width: '40px', height: '40px', background: '#eee', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#666', border: '1px solid #ddd', textAlign: 'center' }}>Local<br/>Asset</div>;
};

// --- Componente Principal ---

export default function AdminPage() {
  const [token, setToken] = useState(localStorage.getItem('admin_gh_token') || '');
  const [repo, setRepo] = useState(localStorage.getItem('admin_gh_repo') || 'juannietoval/UTP-humanidades');
  
  const [originalContent, setOriginalContent] = useState(null);
  const [content, setContent] = useState(null);
  const [assets, setAssets] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });
  const [activePreview, setActivePreview] = useState('Home');

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };

  const inputStyle = { 
    padding: '12px', border: '1px solid var(--secondary)', fontFamily: 'inherit', fontSize: '1rem', borderRadius: '4px', width: '100%', boxSizing: 'border-box'
  };
  const labelStyle = { fontWeight: 'bold', marginBottom: '4px', display: 'block' };

  const fetchAssets = async (octokit, owner, repoName) => {
    try {
      const response = await octokit.rest.repos.getContent({ owner, repo: repoName, path: 'src/assets/assets' });
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
    try {
      const octokit = new Octokit({ auth: token });
      const [owner, repoName] = repo.split('/');
      
      const response = await octokit.rest.repos.getContent({ owner, repo: repoName, path: 'src/data/content.json' });
      
      const contentDecoded = decodeURIComponent(escape(atob(response.data.content)));
      const parsedData = JSON.parse(contentDecoded);
      const contentState = { data: parsedData, sha: response.data.sha, owner, repoName };
      
      setContent(contentState);
      setOriginalContent(JSON.parse(JSON.stringify(contentState))); // Deep copy
      
      localStorage.setItem('admin_gh_token', token);
      localStorage.setItem('admin_gh_repo', repo);

      await fetchAssets(octokit, owner, repoName);
      showToast('Conexión exitosa. Cargando editor...', 'success');
    } catch (err) {
      showToast('Error de autenticación o repositorio no encontrado.', 'error');
      console.error(err);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!content) return;
    setLoading(true);
    try {
      const octokit = new Octokit({ auth: token });
      const contentEncoded = btoa(unescape(encodeURIComponent(JSON.stringify(content.data, null, 2))));
      
      const response = await octokit.rest.repos.createOrUpdateFileContents({
        owner: content.owner, repo: content.repoName, path: 'src/data/content.json',
        message: 'Update content via CMS', content: contentEncoded, sha: content.sha
      });
      
      // Update SHA after saving so subsequent saves don't fail
      setContent(prev => ({ ...prev, sha: response.data.content.sha }));
      setOriginalContent(JSON.parse(JSON.stringify({ ...content, sha: response.data.content.sha })));
      
      showToast('¡Cambios guardados con éxito!', 'success');
    } catch (err) {
      showToast('Error al guardar. Verifica que tu token tenga permisos repo.', 'error');
      console.error(err);
    }
    setLoading(false);
  };

  const handleDiscard = () => {
    if(window.confirm('¿Estás seguro de descartar todos los cambios no guardados?')) {
      setContent(JSON.parse(JSON.stringify(originalContent)));
      showToast('Cambios descartados', 'success');
    }
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

  const handleAddArrayItem = (path, defaultItem) => {
    const keys = path.split('.');
    setContent(prev => {
      const newData = JSON.parse(JSON.stringify(prev.data));
      let current = newData;
      for (let i = 0; i < keys.length; i++) { current = current[keys[i]]; }
      current.push(defaultItem);
      return { ...prev, data: newData };
    });
  };

  const handleRemoveArrayItem = (path, index) => {
    if(!window.confirm('¿Eliminar este elemento?')) return;
    const keys = path.split('.');
    setContent(prev => {
      const newData = JSON.parse(JSON.stringify(prev.data));
      let current = newData;
      for (let i = 0; i < keys.length; i++) { current = current[keys[i]]; }
      current.splice(index, 1);
      return { ...prev, data: newData };
    });
  };

  const handleAddImgToArray = (eventPath, defaultImg = '') => {
    const keys = eventPath.split('.');
    setContent(prev => {
      const newData = JSON.parse(JSON.stringify(prev.data));
      let current = newData;
      for (let i = 0; i < keys.length; i++) { current = current[keys[i]]; }
      current.imgs.push(defaultImg);
      return { ...prev, data: newData };
    });
  };

  const handleRemoveImgFromArray = (eventPath, imgIndex) => {
    const keys = eventPath.split('.');
    setContent(prev => {
      const newData = JSON.parse(JSON.stringify(prev.data));
      let current = newData;
      for (let i = 0; i < keys.length; i++) { current = current[keys[i]]; }
      current.imgs.splice(imgIndex, 1);
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
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({message:'', type:''})} />
      
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {!content ? (
          <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--neutral)', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>Panel de Edición (CMS)</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{ textAlign: 'center', color: '#555' }}>El sistema guardará tu sesión automáticamente para agilizar tu acceso la próxima vez.</p>
              <div>
                <label style={labelStyle}>Repositorio GitHub</label>
                <input type="text" placeholder="Ej. juannietoval/UTP-humanidades" value={repo} onChange={e => setRepo(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Token Personal (PAT)</label>
                <input type="password" placeholder="ghp_xxxxxxxxxxxxxxxxxxxx" value={token} onChange={e => setToken(e.target.value)} style={inputStyle} />
              </div>
              <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '16px', fontSize: '1.1rem', marginTop: '8px' }}>
                {loading ? 'Conectando...' : 'Conectar y Entrar'}
              </button>
            </form>
          </div>
        ) : (
          <div className="grid" style={{ gap: '32px', alignItems: 'start' }}>
            
            {/* LEFT COLUMN: EDITOR */}
            <div style={{ gridColumn: 'span 5', background: 'var(--neutral)', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', maxHeight: '85vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #ddd', paddingBottom: '16px' }}>
                <h3 style={{ margin: 0 }}>Editor de Contenidos</h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={handleDiscard} style={{ background: 'none', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Deshacer todo</button>
                  <button onClick={() => { localStorage.removeItem('admin_gh_token'); setContent(null); }} style={{ background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', color: '#666' }}>Cerrar Sesión</button>
                </div>
              </div>

              {assets.length > 0 && (
                <Accordion title="🖼️ Galería de Imágenes Locales">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {assets.map(a => <span key={a} style={{ background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', border: '1px solid #ddd' }}>{a}</span>)}
                  </div>
                  <p style={{ fontSize: '0.85rem', marginTop: '12px', color: '#666' }}>Copia estos nombres para usarlos en Laboratorio o Actividades. O bien, pega URLs completas (https://...).</p>
                </Accordion>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* HOME EDITOR */}
                <Accordion title="🏠 Página de Inicio" defaultOpen={true}>
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
                </Accordion>

                {/* LABORATORIO EDITOR */}
                <Accordion title="🔬 Laboratorio Digital">
                  {content.data.laboratorio.map((lab, index) => (
                    <div key={index} style={{ background: '#fafafa', padding: '16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #eee', position: 'relative' }}>
                      <button onClick={() => handleRemoveArrayItem('laboratorio', index)} style={{ position: 'absolute', top: '16px', right: '16px', color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>🗑️</button>
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
                          <label style={labelStyle}>Imagen</label>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <ImageThumbnail value={lab.img} />
                            <input type="text" value={lab.img} onChange={e => handleChange(`laboratorio.${index}.img`, e.target.value)} style={inputStyle} placeholder="Nombre local o HTTP url" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="btn-primary outline" style={{ width: '100%', padding: '12px' }} onClick={() => handleAddArrayItem('laboratorio', {title: "Nuevo Título", desc: "Nueva descripción", img: ""})}>+ Añadir Tarjeta</button>
                </Accordion>

                {/* ACTIVIDADES - PROXIMOS EDITOR */}
                <Accordion title="📅 Próximos Eventos">
                  {content.data.actividades.proximos.map((ev, index) => (
                    <div key={index} style={{ background: '#fafafa', padding: '16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #eee', position: 'relative' }}>
                      <button onClick={() => handleRemoveArrayItem('actividades.proximos', index)} style={{ position: 'absolute', top: '16px', right: '16px', color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>🗑️</button>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Día</label>
                            <input type="text" value={ev.dia} onChange={e => handleChange(`actividades.proximos.${index}.dia`, e.target.value)} style={inputStyle} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Mes</label>
                            <input type="text" value={ev.mes} onChange={e => handleChange(`actividades.proximos.${index}.mes`, e.target.value)} style={inputStyle} />
                          </div>
                        </div>
                        <div>
                          <label style={labelStyle}>Título</label>
                          <input type="text" value={ev.titulo} onChange={e => handleChange(`actividades.proximos.${index}.titulo`, e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Descripción / Lugar</label>
                          <input type="text" value={ev.desc} onChange={e => handleChange(`actividades.proximos.${index}.desc`, e.target.value)} style={inputStyle} />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="btn-primary outline" style={{ width: '100%', padding: '12px' }} onClick={() => handleAddArrayItem('actividades.proximos', {id: Date.now(), dia: "01", mes: "ENE", titulo: "Nuevo Evento", desc: "Lugar y Hora"})}>+ Añadir Evento</button>
                </Accordion>

                {/* ACTIVIDADES - PASADOS EDITOR */}
                <Accordion title="📸 Eventos Pasados (Galería)">
                  {content.data.actividades.pasados.map((ev, index) => (
                    <div key={index} style={{ background: '#fafafa', padding: '16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #eee', position: 'relative' }}>
                      <button onClick={() => handleRemoveArrayItem('actividades.pasados', index)} style={{ position: 'absolute', top: '16px', right: '16px', color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>🗑️</button>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                          <label style={labelStyle}>Fecha Completa</label>
                          <input type="text" value={ev.fecha} onChange={e => handleChange(`actividades.pasados.${index}.fecha`, e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Título de la Exposición</label>
                          <input type="text" value={ev.titulo} onChange={e => handleChange(`actividades.pasados.${index}.titulo`, e.target.value)} style={inputStyle} />
                        </div>
                        
                        <div style={{ background: '#fff', padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }}>
                          <label style={labelStyle}>Imágenes (Galería)</label>
                          {ev.imgs.map((imgStr, i) => (
                            <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                              <ImageThumbnail value={imgStr} />
                              <input type="text" value={imgStr} onChange={e => handleChange(`actividades.pasados.${index}.imgs.${i}`, e.target.value)} style={inputStyle} />
                              <button onClick={() => handleRemoveImgFromArray(`actividades.pasados.${index}`, i)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>✕</button>
                            </div>
                          ))}
                          <button onClick={() => handleAddImgToArray(`actividades.pasados.${index}`, '')} style={{ background: '#eee', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '8px' }}>+ Agregar Foto a esta galería</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="btn-primary outline" style={{ width: '100%', padding: '12px' }} onClick={() => handleAddArrayItem('actividades.pasados', {id: Date.now(), fecha: "DD Mes AAAA", titulo: "Nuevo Título", imgs: []})}>+ Añadir Evento Pasado</button>
                </Accordion>

              </div>

              <div style={{ position: 'sticky', bottom: 0, background: 'var(--neutral)', padding: '20px 0', borderTop: '1px solid #ddd', marginTop: '32px' }}>
                <button onClick={handleSave} className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.1rem', boxShadow: '0 4px 12px rgba(var(--primary-rgb), 0.3)' }} disabled={loading}>
                  {loading ? 'Guardando en GitHub...' : '🚀 Guardar y Publicar'}
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: PREVIEW */}
            <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', height: '85vh' }}>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', background: 'var(--neutral)', padding: '16px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <h4 style={{ margin: 0, alignSelf: 'center', marginRight: 'auto' }}>👁️ Previsualización:</h4>
                <button className={`btn-primary ${activePreview === 'Home' ? '' : 'outline'}`} onClick={() => setActivePreview('Home')} style={{ padding: '8px 16px' }}>Inicio</button>
                <button className={`btn-primary ${activePreview === 'Laboratorio' ? '' : 'outline'}`} onClick={() => setActivePreview('Laboratorio')} style={{ padding: '8px 16px' }}>Laboratorio</button>
                <button className={`btn-primary ${activePreview === 'Actividades' ? '' : 'outline'}`} onClick={() => setActivePreview('Actividades')} style={{ padding: '8px 16px' }}>Actividades</button>
              </div>
              
              <div style={{ background: 'var(--neutral)', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden', flex: 1, position: 'relative' }}>
                {/* Wrapping the preview in ContentProvider with the live content state */}
                <div style={{ transform: 'scale(0.75)', transformOrigin: 'top left', width: '133.33%', height: '133.33%', overflowY: 'auto', background: '#fff' }}>
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
