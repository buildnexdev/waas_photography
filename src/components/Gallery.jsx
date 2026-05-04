import React from 'react';
import './Gallery.css';

// Dynamically importing all images from the gallery folder
const imageModules = import.meta.glob('../assets/gallery/*.{jpeg,jpg,png}', { eager: true });
const galleryImages = Object.values(imageModules).map((mod, index) => ({
    id: index + 1,
    src: mod.default,
    title: `Captured Moment ${index + 1}`,
    category: 'Portfolio',
}));

const Gallery = () => {
    const images = galleryImages;

    return (
        <section id="portfolio" className="gallery-section">
            <div className="container">
                <h2 className="section-title">Our Portfolio</h2>
                <div className="gallery-grid">
                    {images.map((item) => (
                        <div key={item.id} className="gallery-item">
                            <img src={item.src} alt={item.title} />
                            <div className="overlay">
                                <div className="overlay-content">
                                    <p className="category">{item.category}</p>
                                    <h3>{item.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
