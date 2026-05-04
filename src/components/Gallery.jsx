import React, { useEffect, useRef, useState } from 'react';
import './Gallery.css';

function categoryFromPath(filePath) {
    const m = filePath.replace(/\\/g, '/').match(/gallery\/([^/]+)\//);
    if (!m) return 'Portfolio';
    const folder = m[1];
    const eventNum = folder.match(/^Event(\d+)$/i);
    if (eventNum) return `Event ${eventNum[1]}`;
    return folder.replace(/-/g, ' ');
}

function galleryBasename(filePath) {
    const p = filePath.replace(/\\/g, '/');
    return p.slice(p.lastIndexOf('/') + 1);
}

/**
 * Album-style covers (e.g. Event1.jpeg, Event3.jpg) often show the same shots
 * as separate files in the folder, so they read as duplicates on the site.
 */
function isLikelyAlbumCover(filePath) {
    return /^Event\d+\.(jpe?g|png)$/i.test(galleryBasename(filePath));
}

const imageModules = import.meta.glob('../assets/gallery/**/*.{jpeg,jpg,png}', { eager: true });
const galleryImages = Object.entries(imageModules)
    .filter(([path]) => !isLikelyAlbumCover(path))
    .map(([path, mod], index) => ({
        id: index + 1,
        src: mod.default,
        title: `Moment ${index + 1}`,
        category: categoryFromPath(path),
    }));

/** Visual rhythm for collage tiles (12-column grid); cycles for variety */
const TILE_VARIANT = [
    'gallery-tile--a',
    'gallery-tile--b',
    'gallery-tile--c',
    'gallery-tile--d',
    'gallery-tile--e',
    'gallery-tile--f',
    'gallery-tile--g',
    'gallery-tile--h',
];

const Gallery = () => {
    const images = galleryImages;
    const sectionRef = useRef(null);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        const root = sectionRef.current;
        if (!root) return undefined;

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setRevealed(true);
            },
            { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
        );
        io.observe(root);
        return () => io.disconnect();
    }, []);

    return (
        <section
            id="portfolio"
            ref={sectionRef}
            className={`gallery-section${revealed ? ' gallery-section--revealed' : ''}`}
        >
            <div className="container">
                <h2 className="gallery-section__title section-title">Our Portfolio</h2>
                <p className="gallery-intro">
                    A living collage of recent work — tiles animate in as you scroll.
                </p>
                <div className="gallery-collage" aria-busy={!revealed}>
                    {images.map((item, index) => (
                        <article
                            key={item.id}
                            className={`gallery-tile ${TILE_VARIANT[index % TILE_VARIANT.length]}`}
                            style={{
                                '--delay': `${index * 0.055}s`,
                                '--tilt': `${(index % 2 === 0 ? -1 : 1) * 0.65}deg`,
                            }}
                        >
                            <div className="gallery-tile__surface">
                                <img src={item.src} alt={item.title} loading="lazy" decoding="async" />
                                <div className="gallery-tile__overlay">
                                    <p className="gallery-tile__category">{item.category}</p>
                                    <h3 className="gallery-tile__heading">{item.title}</h3>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
