import React, { useCallback, useEffect, useState } from 'react';

// Masonry gallery: hover enlarges a design; click opens it full screen.
// Use ← / → to browse and Esc to close.
export default function Gallery({ items }) {
  const [open, setOpen] = useState(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d) => setOpen((i) => (i + d + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, step]);

  return (
    <>
      <div className="masonry">
        {items.map((it, i) => (
          <button key={it.src} className="tile" onClick={() => setOpen(i)} aria-label={`Open ${it.title}`}>
            <img src={it.src} alt={`${it.title} — design by ash`} width={it.w} height={it.h} loading="lazy" decoding="async" />
            <span className="cap">{it.title}</span>
          </button>
        ))}
      </div>

      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={items[open].title} onClick={close}>
          <img src={items[open].src} alt={`${items[open].title} — design by ash`} onClick={(e) => e.stopPropagation()} />
          <div className="lb-bar" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => step(-1)} aria-label="Previous design">←</button>
            <span>{items[open].title} <span className="muted">{open + 1} / {items.length}</span></span>
            <button onClick={() => step(1)} aria-label="Next design">→</button>
            <button onClick={close} aria-label="Close">✕</button>
          </div>
        </div>
      )}
    </>
  );
}
