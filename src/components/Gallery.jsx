import React, { useEffect, useMemo, useState } from 'react';
import './Gallery.css';

/** Matches folders under `src/assets/gallery/<folder>/` */
const GALLERY_CATEGORY_IDS = ['wedding', 'solo', 'videos', 'feedback'];

const CATEGORY_TABS = [
    { id: 'wedding', label: 'Wedding' },
    { id: 'solo', label: 'Portraits' },
    // { id: 'videos', label: 'Videos' }, // Re-enable when video assets are ready
    // { id: 'feedback', label: 'Feedback' }, // Re-enable when feedback assets are ready
];
const PREVIEW_COUNT = 4;
const CATEGORY_MESSAGE_TILES = {
    wedding: [
        'Every frame keeps the emotion of your day alive.',
        'Candid moments, cinematic memories, timeless storytelling.',
    ],
    solo: [
        'Portraits that reflect confidence, grace, and personality.',
        'Light, detail, and expression crafted into one frame.',
    ],
    feedback: [
        'Trust is earned through memories delivered beautifully.',
    ],
};

function galleryBasename(filePath) {
    const p = filePath.replace(/\\/g, '/');
    return p.slice(p.lastIndexOf('/') + 1);
}

/**
 * Album-style covers (e.g. Event1.jpeg) duplicate hero tiles — hide them in the grid.
 */
function isLikelyAlbumCover(filePath) {
    return /^Event\d+\.(jpe?g|png)$/i.test(galleryBasename(filePath));
}

/**
 * Resolve tab category from the first folder under `gallery/`.
 * Legacy `Event*` folders are grouped under Wedding so existing installs keep working.
 */
function categoryFromGalleryPath(filePath) {
    const normalized = filePath.replace(/\\/g, '/');
    const m = normalized.match(/gallery\/([^/]+)\//i);
    if (!m) return 'wedding';
    const folder = m[1];
    if (/^event5$/i.test(folder)) return 'solo';
    if (/^event\d+$/i.test(folder)) return 'wedding';
    const lower = folder.toLowerCase();
    if (GALLERY_CATEGORY_IDS.includes(lower)) return lower;
    return 'wedding';
}

function altFromItem(item) {
    if (item.category === 'solo') {
        return `Portrait by WAAS Photography - ${item.title}`;
    }
    if (item.category === 'wedding') {
        return `Wedding moment by WAAS Photography - ${item.title}`;
    }
    return item.title;
}

/**
 * Human-readable label from filename — strips print sizes like "(17 x 26)" and "3." prefixes.
 */
function titleFromPath(path) {
    let base = galleryBasename(path).replace(/\.[^.]+$/, '');
    base = base.replace(/\(\s*\d+\s*[x×]\s*\d+\s*\)/gi, '');
    base = base.replace(/\s*\d+\s*[x×]\s*\d+\s*/gi, ' ');
    base = base.replace(/^\d+\.\s*/, '');
    base = base.replace(/[_-]+/g, ' ');
    base = base.replace(/\s+/g, ' ').trim();
    base = base.replace(/^[\s.]+|[\s.]+$/g, '').trim();
    return base || 'Moment';
}

const imageModules = import.meta.glob('../assets/gallery/**/*.{jpeg,jpg,png,gif,webp}');
const videoModules = import.meta.glob('../assets/gallery/**/*.{mp4,webm,ogg}');

function buildGalleryItems() {
    const items = [];

    for (const [path, load] of Object.entries(imageModules)) {
        if (isLikelyAlbumCover(path)) continue;
        const category = categoryFromGalleryPath(path);
        items.push({
            key: path,
            kind: 'image',
            load,
            category,
            title: titleFromPath(path),
        });
    }

    for (const [path, load] of Object.entries(videoModules)) {
        items.push({
            key: path,
            kind: 'video',
            load,
            category: categoryFromGalleryPath(path),
            title: titleFromPath(path),
        });
    }

    return items.sort((a, b) => a.key.localeCompare(b.key, undefined, { sensitivity: 'base' }));
}

const allGalleryItems = buildGalleryItems();

const Gallery = () => {
    const [activeCategory, setActiveCategory] = useState('wedding');
    const [expandedByCategory, setExpandedByCategory] = useState({});
    const [loadedMedia, setLoadedMedia] = useState({});

    const categoryItems = useMemo(() => {
        return allGalleryItems.filter((item) => item.category === activeCategory);
    }, [activeCategory]);

    useEffect(() => {
        let cancelled = false;
        const shouldExpand = Boolean(expandedByCategory[activeCategory]);
        const targetItems = shouldExpand ? categoryItems : categoryItems.slice(0, PREVIEW_COUNT);
        const pending = targetItems.filter((item) => !loadedMedia[item.key]);

        if (pending.length === 0) return undefined;

        (async () => {
            const entries = await Promise.all(
                pending.map(async (item) => {
                    const mod = await item.load();
                    return [item.key, mod.default];
                })
            );
            if (cancelled) return;
            setLoadedMedia((prev) => ({ ...prev, ...Object.fromEntries(entries) }));
        })();

        return () => {
            cancelled = true;
        };
    }, [activeCategory, categoryItems, expandedByCategory, loadedMedia]);

    const handleCategoryChange = (id) => {
        setActiveCategory(id);
    };
    const expanded = Boolean(expandedByCategory[activeCategory]);
    const visibleItems = expanded ? categoryItems : categoryItems.slice(0, PREVIEW_COUNT);
    const hasMore = categoryItems.length > PREVIEW_COUNT;
    const collageTiles = useMemo(() => {
        const mediaTiles = visibleItems.map((item, index) => ({
            type: 'media',
            key: item.key,
            item,
            index,
        }));

        const messages = CATEGORY_MESSAGE_TILES[activeCategory] || [];
        if (!messages.length || activeCategory === 'videos') return mediaTiles;

        const output = [];
        let messageIndex = 0;

        mediaTiles.forEach((tile, index) => {
            output.push(tile);
            const shouldInsertMessage = (index + 1) % 2 === 0 && messageIndex < messages.length;
            if (shouldInsertMessage) {
                output.push({
                    type: 'message',
                    key: `message-${activeCategory}-${messageIndex}`,
                    message: messages[messageIndex],
                });
                messageIndex += 1;
            }
        });

        return output;
    }, [activeCategory, visibleItems]);

    const handleViewMore = () => {
        setExpandedByCategory((prev) => ({ ...prev, [activeCategory]: true }));
    };

    return (
        <section id="portfolio" className="gallery-section">
            <div className="container">
                <h2 className="gallery-section__title section-title">Our Portfolio</h2>

                <div
                    className="gallery-filters"
                    role="tablist"
                    aria-label="Portfolio categories"
                >
                    {CATEGORY_TABS.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            aria-selected={activeCategory === tab.id}
                            className={`gallery-filter${activeCategory === tab.id ? ' gallery-filter--active' : ''}`}
                            onClick={() => handleCategoryChange(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {allGalleryItems.length === 0 ? (
                    <div className="gallery-empty" role="status">
                        <p className="gallery-empty__title">Gallery coming soon</p>
                        <p className="gallery-empty__text">
                            We&apos;re preparing new work to share here. Please check back shortly.
                        </p>
                    </div>
                ) : categoryItems.length === 0 ? (
                    <div className="gallery-empty" role="status">
                        <p className="gallery-empty__title">Nothing in this category yet</p>
                        <p className="gallery-empty__text">
                            Try another category to see more, or visit again soon.
                        </p>
                    </div>
                ) : (
                    <div className="gallery-collage" aria-busy="false">
                        {collageTiles.map((tile, index) => (
                            <article
                                key={tile.key}
                                className={`gallery-tile ${tile.type === 'message' ? 'gallery-tile--message' : ''}`}
                                style={{
                                    '--delay': `${Math.min(index, 14) * 0.04}s`,
                                }}
                            >
                                {tile.type === 'message' ? (
                                    <div className="gallery-message-tile">
                                        <span className="gallery-message-tile__label">Waas Moments</span>
                                        <p className="gallery-message-tile__text">{tile.message}</p>
                                    </div>
                                ) : (
                                    <div className="gallery-tile__surface">
                                        {loadedMedia[tile.item.key] ? (
                                            tile.item.kind === 'video' ? (
                                                <video
                                                    className="gallery-tile__media"
                                                    src={loadedMedia[tile.item.key]}
                                                    controls
                                                    muted
                                                    playsInline
                                                    loop
                                                    preload="metadata"
                                                    aria-label={tile.item.title}
                                                />
                                            ) : (
                                                <img
                                                    className="gallery-tile__media"
                                                    src={loadedMedia[tile.item.key]}
                                                    alt={altFromItem(tile.item)}
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                            )
                                        ) : (
                                            <div className="gallery-tile__placeholder" aria-hidden="true" />
                                        )}
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                )}
                {!expanded && hasMore && (
                    <div className="gallery-actions">
                        <button type="button" className="gallery-view-more" onClick={handleViewMore}>
                            View More &rarr;
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Gallery;
