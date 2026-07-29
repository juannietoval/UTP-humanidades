import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProgramaPage from './pages/ProgramaPage';
import ProcesoPage from './pages/ProcesoPage';
import LaboratorioPage from './pages/LaboratorioPage';
import ActividadesPage from './pages/ActividadesPage';
import AdminPage from './pages/AdminPage';
import ScrollToTop from './components/ScrollToTop';
import { ContentProvider, useContent } from './context/ContentContext';
import './index.css';

function Footer() {
  const { content } = useContent();
  const footerText = content?.home?.footerText || "Universidad Tecnológica de Pereira";

  return (
    <footer style={{ background: '#111', color: '#eee', padding: '64px 20px 24px 20px', marginTop: 'auto' }}>
      <div className="container grid" style={{ marginBottom: '48px', gap: '32px' }}>
        <div style={{ gridColumn: 'span 6' }}>
          <h3 style={{ color: '#fff', borderBottom: 'none', padding: 0, margin: '0 0 16px 0', fontSize: '1.5rem' }}>Humanidades, Memoria y Política</h3>
          <p style={{ color: '#aaa', lineHeight: '1.6', maxWidth: '80%' }}>
            Un acercamiento reflexivo, sensible y situado a las múltiples dimensiones de lo humano para proyectar la existencia y el mundo por venir.
          </p>
        </div>
        <div style={{ gridColumn: 'span 3' }}>
          <h4 style={{ color: '#fff', marginBottom: '16px' }}>Enlaces Rápidos</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><a href="/#/programa" style={{ color: '#aaa', textDecoration: 'none' }}>Programa Académico</a></li>
            <li><a href="/#/proceso" style={{ color: '#aaa', textDecoration: 'none' }}>Proceso</a></li>
            <li><a href="/#/laboratorio" style={{ color: '#aaa', textDecoration: 'none' }}>Laboratorio</a></li>
            <li><a href="/#/actividades" style={{ color: '#aaa', textDecoration: 'none' }}>Actividades</a></li>
          </ul>
        </div>
        <div style={{ gridColumn: 'span 3' }}>
          <h4 style={{ color: '#fff', marginBottom: '16px' }}>Contacto</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li style={{ color: '#aaa' }}>Universidad Tecnológica de Pereira</li>
            <li style={{ color: '#aaa' }}>Pereira, Colombia</li>
            <li><a href="mailto:contacto@utp.edu.co" style={{ color: '#aaa', textDecoration: 'none' }}>contacto@utp.edu.co</a></li>
          </ul>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #333', paddingTop: '24px', textAlign: 'center', color: '#888', fontSize: '0.9rem' }}>
        <p style={{ margin: 0 }}>{footerText}</p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <ContentProvider>
      <HashRouter>
        <ScrollToTop />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programa" element={<ProgramaPage />} />
            <Route path="/proceso" element={<ProcesoPage />} />
            <Route path="/laboratorio" element={<LaboratorioPage />} />
            <Route path="/actividades" element={<ActividadesPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </HashRouter>
  </ContentProvider>
  );
}

export default App;
