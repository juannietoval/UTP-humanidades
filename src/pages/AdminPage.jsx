import React, { useState } from 'react';
import { Octokit } from "octokit";

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [repo, setRepo] = useState('juannietoval/UTP-humanidades');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--neutral)', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '24px' }}>Panel de Edición (CMS)</h2>
        
        {!content ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p>Ingresa un Personal Access Token (PAT) de GitHub con permisos de escritura (repo) para conectarte al repositorio.</p>
            <input 
              type="text" 
              placeholder="Ej. juannietoval/UTP-humanidades" 
              value={repo} 
              onChange={e => setRepo(e.target.value)}
              style={{ padding: '12px', border: '1px solid var(--secondary)', fontFamily: 'var(--font-mono)' }}
            />
            <input 
              type="password" 
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx" 
              value={token} 
              onChange={e => setToken(e.target.value)}
              style={{ padding: '12px', border: '1px solid var(--secondary)', fontFamily: 'var(--font-mono)' }}
            />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Conectando...' : 'Conectar y Cargar Contenido'}
            </button>
            {message && <p style={{ color: 'red' }}>{message}</p>}
          </form>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span className="label">Conectado a: {content.owner}/{content.repoName}</span>
              <button onClick={() => setContent(null)} style={{ background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>Desconectar</button>
            </div>
            
            {message && <div style={{ background: '#d4edda', color: '#155724', padding: '12px', marginBottom: '16px' }}>{message}</div>}

            {/* Editor form based on structure */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              <div style={{ border: '1px solid #ddd', padding: '16px' }}>
                <h3>Página de Inicio</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                  <label>Título principal</label>
                  <input type="text" value={content.data.home.title} onChange={e => handleChange('home.title', e.target.value)} style={{ padding: '8px' }} />
                  <label>Descripción</label>
                  <textarea value={content.data.home.description} onChange={e => handleChange('home.description', e.target.value)} rows={4} style={{ padding: '8px' }} />
                  <label>Texto pie de página</label>
                  <input type="text" value={content.data.home.footerText} onChange={e => handleChange('home.footerText', e.target.value)} style={{ padding: '8px' }} />
                </div>
              </div>

              <div style={{ border: '1px solid #ddd', padding: '16px' }}>
                <h3>Laboratorio Digital</h3>
                {content.data.laboratorio.map((lab, index) => (
                  <div key={index} style={{ borderBottom: '1px dashed #ccc', paddingBottom: '16px', marginBottom: '16px' }}>
                    <h4 style={{ marginBottom: '8px' }}>Tarjeta {index + 1}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <input type="text" value={lab.title} onChange={e => handleChange(`laboratorio.${index}.title`, e.target.value)} style={{ padding: '8px' }} />
                      <input type="text" value={lab.desc} onChange={e => handleChange(`laboratorio.${index}.desc`, e.target.value)} style={{ padding: '8px' }} />
                      <label>Imagen (nombre archivo en assets/assets)</label>
                      <input type="text" value={lab.img} onChange={e => handleChange(`laboratorio.${index}.img`, e.target.value)} style={{ padding: '8px' }} />
                    </div>
                  </div>
                ))}
              </div>

            </div>

            <button onClick={handleSave} className="btn-primary" style={{ marginTop: '32px', width: '100%' }} disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar y Publicar en GitHub'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
