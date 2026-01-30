import React from 'react';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container about-container">
                <div className="about-image">
                    <div className="image-stack">
                        <div className="image-back"></div>
                        <div className="image-front">
                            <div className="experience-badge">
                                <span className="years">Premium</span>
                                <span className="text">Quality</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about-content">
                    <h4 className="subtitle">About Us</h4>
                    <h2 className="title">Waas Photography & Events</h2>
                    <p>
                        We are a team of passionate photographers and event specialists dedicated to capturing the most beautiful moments of your life. With a keen eye for detail and a commitment to excellence, we provide professional coverage for weddings, corporate events, and commercial projects.
                    </p>
                    <div className="features-list">
                        <div className="feature">
                            <span className="icon">📸</span>
                            <div>
                                <h4>Expert DOP</h4>
                                <p>Visual storytelling led by industry professionals.</p>
                            </div>
                        </div>
                        <div className="feature">
                            <span className="icon">✨</span>
                            <div>
                                <h4>Event Excellence</h4>
                                <p>Complete event coverage from planning to delivery.</p>
                            </div>
                        </div>
                    </div>
                    <a href="#portfolio" className="btn-primary">Our Process</a>
                </div>
            </div>
        </section>
    );
};

export default About;
