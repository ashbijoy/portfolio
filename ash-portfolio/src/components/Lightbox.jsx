import React, { useEffect } from 'react';

// Full-screen viewer shared by the work grid, carousel and deck.
// ← / → browse, Esc closes, click the backdrop to close.
export default function Lightbox({ item, index, total, onClose, onStep, wide = false }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onStep]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <img className={wide ? 'lb-wide' : ''} src={item.src} alt={item.alt || item.title} onClick={(e) => e.stopPropagation()} />
      <div className="lb-bar" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onStep(-1)} aria-label="Previous">←</button>
        <span className="lb-title">
          {item.title}
          {item.sub && <span className="muted"> · {item.sub}</span>}
          <span className="muted lb-count">{index + 1} / {total}</span>
        </span>
        <button onClick={() => onStep(1)} aria-label="Next">→</button>
        <button onClick={onClose} aria-label="Close">✕</button>
      </div>
    </div>
  );
}
