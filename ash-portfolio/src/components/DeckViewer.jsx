import React, { useCallback, useEffect, useState } from 'react';
import Lightbox from './Lightbox.jsx';

const AUTO_MS = 5000;

// Interactive brand-deck viewer: auto-advancing slides with a clickable list,
// arrows, keyboard control and a full-screen view. Hover pauses autoplay.
export default function DeckViewer({ slides }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [full, setFull] = useState(false);
  const n = slides.length;

  const go = useCallback((d) => setI((x) => (x + d + n) % n), [n]);
  const close = useCallback(() => setFull(false), []);

  useEffect(() => {
    if (paused || full) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => go(1), AUTO_MS);
    return () => clearTimeout(t);
  }, [i, paused, full, go]);

  return (
    <div
      className={`deckv${paused ? ' is-paused' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); }}
    >
      <div className="deckv-stage">
        {slides.map((s, k) => (
          <img key={s.src} src={s.src} alt={s.alt} className={k === i ? 'on' : ''} aria-hidden={k !== i} loading="lazy" />
        ))}
        <button className="deckv-arrow prev" onClick={() => go(-1)} aria-label="Previous slide">←</button>
        <button className="deckv-arrow next" onClick={() => go(1)} aria-label="Next slide">→</button>
        <button className="deckv-expand" onClick={() => setFull(true)}>full screen ↗</button>
      </div>

      <div className="deckv-tabs" role="tablist" aria-label="Brand deck slides">
        {slides.map((s, k) => (
          <button key={s.src} role="tab" aria-selected={k === i} className={`deckv-tab${k === i ? ' on' : ''}`} onClick={() => setI(k)}>
            <img src={s.src} alt="" loading="lazy" />
            <span className="deckv-text">
              <span className="deckv-label"><span className="red-dark">{String(k + 1).padStart(2, '0')}</span> {s.label}</span>
              <span className="deckv-bar">{k === i && <span key={i} style={{ animationDuration: `${AUTO_MS}ms` }} />}</span>
            </span>
          </button>
        ))}
      </div>

      {full && (
        <Lightbox item={{ src: slides[i].src, title: slides[i].label, alt: slides[i].alt }} index={i} total={n} onClose={close} onStep={go} wide />
      )}
    </div>
  );
}
