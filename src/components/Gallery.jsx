import React from 'react';
import './Gallery.css';

// Importing images (assuming they are in the assets folder)
import img1 from '../assets/images/gallery-1.png';
import img2 from '../assets/images/gallery-2.png';
import img3 from '../assets/images/gallery-3.png';
import img4 from '../assets/images/gallery-4.png';

const Gallery = () => {
    const images = [
        { id: 1, src: img1, title: 'Wedding', category: 'Events' },
        { id: 2, src: img2, title: 'Corporate Event', category: 'Events' },
        { id: 3, src: img3, title: 'Portrait', category: 'People' },
        { id: 4, src: img4, title: 'Product Shot', category: 'Commercial' },
    ];

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
