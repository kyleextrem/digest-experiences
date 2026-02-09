
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Dinners from './pages/Dinners';
import Events from './pages/Events';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Thanks from './pages/Thanks';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dinners" element={<Dinners />} />
          <Route path="/events" element={<Events />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/thanks" element={<Thanks />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
