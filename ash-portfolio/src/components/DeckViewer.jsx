import React, { useCallback, useEffect, useState } from 'react';

const AUTO_MS = 5000;

// Interactive brand-deck viewer: auto-advancing slides with clickable tabs,
// arrows, keyboard control and a full-screen view. Hover pauses autoplay.
export default function DeckViewer({ slides }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [full, setFull] = useState(false);
  const n = slides.length;

  const go = useCallback((d) => setI((x) => (x + d + n) % n), [n]);

  useEffect(() => {
    if (paused || full) return;
    const t = setTimeout(() => go(1), AUTO_MS);
    return () => clearTimeout(t);
  }, [i, paused, full, go]);

  useEffect(() => {
    if (!full) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setFull(false);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [full, go]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  return (
    <div
      className={`deckv${paused ? ' is-paused' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
    >
      <div className="deckv-stage">
        {slides.map((s, k) => (
          <img key={s.src} src={s.src} alt={s.alt} className={k === i ? 'on' : ''} aria-hidden={k !== i} loading="lazy" />
        ))}
        <button className="deckv-arrow prev" onClick={() => go(-1)} aria-label="Previous slide">←</button>
        <button className="deckv-arrow next" onClick={() => go(1)} aria-label="Next slide">→</button>
        <button className="deckv-expand" onClick={() => setFull(true)}>full screen ↗</button>
        <span className="deckv-count">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
      </div>

      <div className="deckv-tabs" role="tablist" aria-label="Brand deck slides">
        {slides.map((s, k) => (
          <button
            key={s.src}
            role="tab"
            aria-selected={k === i}
            className={`deckv-tab${k === i ? ' on' : ''}`}
            onClick={() => setI(k)}
          >
            <img src={s.src} alt="" loading="lazy" />
            <span className="deckv-label"><span className="red">{String(k + 1).padStart(2, '0')}</span> {s.label}</span>
            <span className="deckv-bar">{k === i && <span key={i} style={{ animationDuration: `${AUTO_MS}ms` }} />}</span>
          </button>
        ))}
      </div>

      {full && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={slides[i].label} onClick={() => setFull(false)}>
          <img className="lb-wide" src={slides[i].src} alt={slides[i].alt} onClick={(e) => e.stopPropagation()} />
          <div className="lb-bar" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => go(-1)} aria-label="Previous slide">←</button>
            <span>{slides[i].label} <span className="muted">{i + 1} / {n}</span></span>
            <button onClick={() => go(1)} aria-label="Next slide">→</button>
            <button onClick={() => setFull(false)} aria-label="Close">✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
