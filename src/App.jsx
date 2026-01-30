import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <About />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-logo">
            <span className="logo-waas">Waas</span>
            <span className="logo-sub">Photography & Events</span>
          </div>
          <div className="copyright">
            &copy; {new Date().getFullYear()} Waas Photography & Events. All rights reserved.| Developed by BuildNex
          </div>
          <div className="social-footer">
            <a href="https://instagram.com/waas_photography_" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
