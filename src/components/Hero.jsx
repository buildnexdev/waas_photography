import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="hero-overlay"></div>
            <div className="container hero-container">
                <div className="hero-content">
                    <h4 className="hero-subtitle">Professional Photography & Events</h4>
                    <h1 className="hero-title">Capturing Every <span className="highlight">Moment</span> With Perfection</h1>
                    <p className="hero-description">
                        From weddings to corporate events, we tell your story through the lens of creativity and passion.
                    </p>
                    <div className="hero-btns">
                        <a href="#portfolio" className="btn-primary">View Gallery</a>
                        <a href="#contact" className="btn-secondary">Contact Us</a>
                    </div>
                </div>
            </div>
            <div className="scroll-indicator">
                <div className="mouse"></div>
            </div>
        </section>
    );
};

export default Hero;
