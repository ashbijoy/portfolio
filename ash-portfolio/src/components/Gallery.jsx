import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Lightbox from './Lightbox.jsx';

const SPEED = 28; // px per second

function seriesInfo(items) {
  const counts = {};
  items.forEach((it) => { if (it.series) counts[it.series] = (counts[it.series] || 0) + 1; });
  const seen = {};
  return items.map((it) => {
    if (!it.series || counts[it.series] < 2) return { ...it, sub: null };
    seen[it.series] = (seen[it.series] || 0) + 1;
    return { ...it, sub: `series · ${seen[it.series]} of ${counts[it.series]}` };
  });
}

// One endless row. Moves on its own; drag or swipe to scrub; hover pauses.
function Row({ items, reverse, onOpen }) {
  const viewport = useRef(null);
  const track = useRef(null);
  const state = useRef({ x: 0, half: 0, paused: false, drag: null, moved: false });

  useEffect(() => {
    const s = state.current;
    const measure = () => { s.half = track.current ? track.current.scrollWidth / 2 : 0; };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track.current);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf; let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(64, now - last) / 1000; last = now;
      if (!s.paused && !s.drag && !reduce && s.half) s.x += (reverse ? SPEED : -SPEED) * dt;
      if (s.half) { s.x %= s.half; if (s.x > 0) s.x -= s.half; }
      if (track.current) track.current.style.transform = `translate3d(${s.x}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [reverse]);

  const down = (e) => {
    const s = state.current;
    s.drag = { startX: e.clientX, startPos: s.x, id: e.pointerId };
    s.moved = false;
  };
  const move = (e) => {
    const s = state.current;
    if (!s.drag) return;
    const dx = e.clientX - s.drag.startX;
    if (Math.abs(dx) > 6 && !s.moved) {
      s.moved = true;
      viewport.current.setPointerCapture(s.drag.id);
    }
    if (s.moved) s.x = s.drag.startPos + dx;
  };
  const up = () => { state.current.drag = null; };

  const doubled = [...items, ...items];
  return (
    <div
      ref={viewport}
      className="marquee"
      onMouseEnter={() => { state.current.paused = true; }}
      onMouseLeave={() => { state.current.paused = false; state.current.drag = null; }}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
    >
      <div ref={track} className="track">
        {doubled.map((it, k) => {
          const dup = k >= items.length;
          return (
            <button
              key={k}
              className="tile"
              onClick={(e) => { if (state.current.moved) { e.preventDefault(); return; } onOpen(it); }}
              onFocus={() => { state.current.paused = true; }}
              onBlur={() => { state.current.paused = false; }}
              aria-label={`Open ${it.title}`}
              aria-hidden={dup || undefined}
              tabIndex={dup ? -1 : 0}
            >
              <img src={it.srcSmall} alt={dup ? '' : `${it.title}, design by ash`} width={480} height={Math.round(it.h / 2)} loading="lazy" decoding="async" draggable="false" />
              <span className="cap">{it.title}{it.sub && <em> · {it.sub}</em>}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// One endless, draggable row of designs with its own full-screen viewer.
// `reverse` slides the other way. Short lists are repeated so the loop never shows a gap.
export default function Gallery({ items, reverse = false }) {
  const all = useMemo(() => seriesInfo(items), [items]);
  const row = useMemo(() => {
    let r = [...all];
    while (r.length && r.length < 14) r = r.concat(all);
    return r;
  }, [all]);

  const [view, setView] = useState(null); // index into `all`
  const close = useCallback(() => setView(null), []);
  const step = useCallback((d) => setView((i) => (i + d + all.length) % all.length), [all.length]);

  return (
    <>
      <div className="marquee-stack">
        <Row items={row} reverse={reverse} onOpen={(it) => setView(all.findIndex((a) => a.id === it.id))} />
      </div>

      {view !== null && (
        <Lightbox
          item={{ ...all[view], alt: `${all[view].title}, design by ash` }}
          index={view}
          total={all.length}
          onClose={close}
          onStep={step}
        />
      )}
    </>
  );
}
