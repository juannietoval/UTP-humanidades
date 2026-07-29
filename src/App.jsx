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
import { ContentProvider } from './context/ContentContext';
import './index.css';

function Footer() {
  return (
    <footer className="section section-light" style={{ paddingBottom: 'calc(var(--margin-edge) * 0.5)' }}>
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
