import React, { useCallback, useEffect, useRef, useState } from 'react';

// Index of work: hovering a row shows a preview that follows the cursor;
// clicking opens the case study. Case studies are linkable (#case/<id>).
export default function WorkIndex({ projects }) {
  const [hover, setHover] = useState(null);
  const [openId, setOpenId] = useState(null);
  const preview = useRef(null);
  const listRef = useRef(null);

  // Open from URL hash, e.g. ashwinbijoy.vercel.app/#case/sunriserun
  useEffect(() => {
    const read = () => {
      const m = window.location.hash.match(/^#case\/(.+)$/);
      setOpenId(m && projects.some((p) => p.id === m[1]) ? m[1] : null);
    };
    read();
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, [projects]);

  const openCase = (id) => { window.location.hash = `case/${id}`; };
  const closeCase = useCallback(() => {
    history.replaceState(null, '', '#index');
    setOpenId(null);
  }, []);

  const onMove = (e) => {
    if (!preview.current || !listRef.current) return;
    const r = listRef.current.getBoundingClientRect();
    preview.current.style.transform = `translate3d(${e.clientX - r.left}px, ${e.clientY - r.top}px, 0) translate(-50%, -50%)`;
  };

  const current = projects.find((p) => p.id === openId);
  const hovered = projects.find((p) => p.id === hover);

  return (
    <>
      <div className="index-wrap" ref={listRef} onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        <ol className="index">
          {projects.map((p, i) => (
            <li key={p.id}>
              <button className="row" onClick={() => openCase(p.id)} onMouseEnter={() => setHover(p.id)} onFocus={() => setHover(null)}>
                <span className="muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="row-name">{p.name}</span>
                <span className="muted">{p.category}</span>
                <span className="muted right">{p.years}</span>
                <span className="row-arrow" aria-hidden="true">↗</span>
              </button>
            </li>
          ))}
        </ol>
        <div ref={preview} className={`preview${hovered ? ' on' : ''}`} aria-hidden="true">
          {hovered && (hovered.cover
            ? <img src={hovered.cover} alt="" />
            : <div className="preview-card"><span className="preview-role">{hovered.role}</span><span className="preview-name">{hovered.name}</span><span className="preview-years">{hovered.years}</span></div>)}
        </div>
      </div>

      {current && <CaseStudy p={current} onClose={closeCase} />}
    </>
  );
}

function CaseStudy({ p, onClose }) {
  const closeBtn = useRef(null);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeBtn.current && closeBtn.current.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div className="case-backdrop" onClick={onClose}>
      <article className="case" role="dialog" aria-modal="true" aria-label={p.org} onClick={(e) => e.stopPropagation()}>
        <div className="case-top">
          <span className="eyebrow red-ink">case study</span>
          <button ref={closeBtn} className="case-close" onClick={onClose} aria-label="Close case study">✕</button>
        </div>
        <h2 className="case-title">{p.name}</h2>
        <dl className="case-meta">
          <div><dt>role</dt><dd>{p.role}</dd></div>
          <div><dt>when</dt><dd>{p.years}</dd></div>
          <div><dt>focus</dt><dd>{p.category}</dd></div>
        </dl>
        {p.cover && <img className="case-cover" src={p.cover} alt={`${p.org} cover`} />}
        <p className="case-summary">{p.summary}</p>

        {p.results.length > 0 && (
          <div className="case-results">
            {p.results.map((r) => (
              <div key={r.label}><span className="stat-value">{r.value}</span><span className="stat-label">{r.label}</span></div>
            ))}
          </div>
        )}

        <h3 className="eyebrow case-h">what I did</h3>
        <ul className="case-list">{p.did.map((d) => <li key={d}>{d}</li>)}</ul>

        {p.href && <a className="btn" href={p.href} onClick={onClose}>see the brand deck ↓</a>}
      </article>
    </div>
  );
}
