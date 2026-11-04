import React, { useCallback, useEffect, useMemo, useState } from 'react';

// Infinite sliding carousel (two rows, opposite directions).
// Hover pauses the row and enlarges a design; click opens it full screen.
// In the full-screen view, use ← / → to browse and Esc to close.
export default function Gallery({ items }) {
  const [open, setOpen] = useState(null);

  const rows = useMemo(
    () => [items.filter((_, i) => i % 2 === 0), items.filter((_, i) => i % 2 === 1)],
    [items]
  );

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
      <div className="marquee-stack">
        {rows.map((row, r) => (
          <div className="marquee" key={r}>
            <div className={`track${r ? ' reverse' : ''}`} style={{ '--dur': `${row.length * 6}s` }}>
              {[...row, ...row].map((it, k) => {
                const dup = k >= row.length;
                return (
                  <button
                    key={k}
                    className="tile"
                    onClick={() => setOpen(items.indexOf(it))}
                    aria-label={`Open ${it.title}`}
                    aria-hidden={dup || undefined}
                    tabIndex={dup ? -1 : 0}
                  >
                    <img src={it.src} alt={dup ? '' : `${it.title}, design by ash`} width={it.w} height={it.h} loading="lazy" decoding="async" />
                    <span className="cap">{it.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={items[open].title} onClick={close}>
          <img src={items[open].src} alt={`${items[open].title}, design by ash`} onClick={(e) => e.stopPropagation()} />
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
