import React, { useEffect, useState } from 'react';
import { site, about, stats, pillars, projects, ryuco, tools } from './data/content.js';
import featured from './data/featured.json';
import Gallery from './components/Gallery.jsx';
import DeckViewer from './components/DeckViewer.jsx';
import WorkIndex from './components/WorkIndex.jsx';

const Dot = ({ className = '' }) => <span className={`dot ${className}`} aria-hidden="true" />;

const NAV = [
  { href: '#work', label: 'designs' },
  { href: '#index', label: 'work' },
  { href: '#ryuco', label: 'ryū co.' },
  { href: '#cv', label: 'experience' },
  { href: '#about', label: 'about' },
];

function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

function CopyEmail({ email }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(email); setDone(true); setTimeout(() => setDone(false), 1800); } catch (e) { window.location.href = `mailto:${email}`; }
  };
  return <button className="btn-outline" onClick={copy}>{done ? 'copied ✓' : 'copy email'}</button>;
}

const sectionIds = NAV.map((n) => n.href.slice(1));

export default function App() {
  const [menu, setMenu] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    const onKey = (e) => { if (e.key === 'Escape') setMenu(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menu]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <nav className="nav" aria-label="Main">
        <div className="wrap nav-inner">
          <a href="#top" className="brand" aria-label={`${site.name}, home`}>{site.name}<Dot /></a>
          <div className="nav-links">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className={active === n.href.slice(1) ? 'is-active' : ''}>{n.label}</a>
            ))}
          </div>
          <a className="nav-cta" href="#contact">get in touch</a>
          <button className="menu-btn" aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(!menu)}>
            {menu ? 'close' : 'menu'}
          </button>
        </div>
        {menu && (
          <div id="mobile-menu" className="mobile-menu">
            {NAV.map((n) => <a key={n.href} href={n.href} onClick={() => setMenu(false)}>{n.label}</a>)}
            <a href="#contact" onClick={() => setMenu(false)} className="red">get in touch</a>
          </div>
        )}
      </nav>

      <main id="main">
        <header id="top" className="wrap hero">
          <div className="hero-top">
            <h1 className="wordmark" aria-label={`${site.name}.`}>
              {site.name.split('').map((c, i) => <span key={i} className="wm-letter" style={{ animationDelay: `${i * 90}ms` }} aria-hidden="true">{c}</span>)}
              <Dot className="wm-dot" />
            </h1>
            {site.photo
              ? <img className="hero-photo" src={site.photo} alt={`${site.fullName}`} />
              : <p className="bio">{site.bio[0]}<br /><span className="red">{site.bio[1]}</span></p>}
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="tagline">{site.tagline[0]} <span className="red">{site.tagline[1]}</span></p>
              {site.photo && <p className="bio bio-inline">{site.bio[0]} <span className="red">{site.bio[1]}</span></p>}
              <p className="roles"><span className="status-dot" aria-hidden="true" />{site.roles}</p>
              <div className="ctas">
                <a className="btn" href="#index">view work ↓</a>
                <a className="btn-outline" href="#contact">get in touch</a>
                {site.resume && <a className="btn-outline" href={site.resume} download>résumé ↓</a>}
              </div>
            </div>
            <dl className="facts">
              {site.facts.map((f) => (
                <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
              ))}
            </dl>
          </div>
        </header>

        <section id="work" className="section-tight">
          <div className="wrap">
            <div className="section-head ruled">
              <h2 className="eyebrow">selected work</h2>
              <span className="muted">posters, type &amp; brand creatives</span>
            </div>
          </div>
          <Gallery items={featured} />
        </section>

        <section id="do" className="wrap section">
          <div className="section-head">
            <h2 className="eyebrow">what I do</h2>
            <span className="muted">design × product × tech</span>
          </div>
          <div className="pillars">
            {pillars.map((p) => (
              <div className="pillar" key={p.n}>
                <div className="num">{p.n}</div>
                <h3>{p.title}</h3>
                <ul>{p.items.map((i) => <li key={i}>{i}</li>)}</ul>
                <p className="proof"><span className="proof-label">proof</span>{p.proof}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="index" className="wrap section">
          <div className="section-head">
            <h2 className="eyebrow">index of work</h2>
            <span className="muted">click a row for the case study</span>
          </div>
          <WorkIndex projects={projects} />
        </section>

        <section id="ryuco" className="dark">
          <div className="wrap section">
            <div className="ry-grid">
              <div>
                <h2 className="ry-title"><span className="red">ryū</span> co.</h2>
                <div className="ry-sub">{ryuco.subtitle} · {ryuco.years}</div>
                {ryuco.paragraphs.map((t) => <p key={t.slice(0, 20)} className="ry-p">{t}</p>)}
              </div>
              <div className="ry-side">
                <h3 className="eyebrow red-dark">my role</h3>
                <ul className="ry-role">{ryuco.myRole.map((r) => <li key={r}>{r}</li>)}</ul>
                <h3 className="eyebrow red-dark ry-services-h">services</h3>
                <ul className="ry-services">{ryuco.services.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            </div>

            <div className="section-head ry-deck-head">
              <h3 className="eyebrow red-dark">from the brand deck</h3>
              <span className="muted">click a slide · ← → to browse</span>
            </div>
            <DeckViewer slides={[{ src: ryuco.cover.src, label: 'cover', alt: ryuco.cover.alt }, ...ryuco.deck]} />
          </div>
        </section>

        <section id="cv" className="wrap section cv">
          <aside className="cv-side">
            <h2 className="eyebrow">experience</h2>
            <p className="cv-summary">Agencies, schools, events, a game studio and my own business, always mixing design with strategy.</p>
            <div className="stats">
              {stats.map((s) => (
                <div key={s.label}><span className="stat-value">{s.value}</span><span className="stat-label">{s.label}</span></div>
              ))}
            </div>
            {site.resume && <a className="btn-outline" href={site.resume} download>download résumé ↓</a>}
          </aside>
          <div>
            <ul className="jobs">
              {projects.map((j) => (
                <li key={j.id}>
                  <div>
                    <div className="job-title">{j.role} <span className="muted">· {j.org}</span></div>
                    <p>{j.did[0]}</p>
                    <a className="job-link" href={`#case/${j.id}`}>read case study ↗</a>
                  </div>
                  <span className="muted right">{j.years}</span>
                </li>
              ))}
            </ul>
            <div className="toolkit">
              <div className="muted">toolkit</div>
              <ul>{tools.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </div>
        </section>

        <section id="about" className="dark">
          <div className="wrap section about">
            <div>
              <h2 className="eyebrow red-dark">about</h2>
              {about.paragraphs.map((t) => <p key={t.slice(0, 20)} className="about-p">{t}</p>)}
            </div>
            <figure className="quote">
              <Dot className="dot-lg" />
              <blockquote>{about.quote.text[0]}<br /><span className="red">{about.quote.text[1]}</span></blockquote>
              <figcaption>{about.quote.by}</figcaption>
            </figure>
          </div>
        </section>
      </main>

      <footer id="contact" className="wrap footer">
        <div className="muted">let's build something</div>
        <a className="mail" href={`mailto:${site.email}`}>{site.email} ↗</a>
        <div className="ctas">
          <CopyEmail email={site.email} />
          {site.resume && <a className="btn-outline" href={site.resume} download>résumé ↓</a>}
        </div>
        <div className="footer-row">
          <span className="socials">
            {site.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label} ↗</a>)}
          </span>
          <span>© {new Date().getFullYear()} {site.name}<Dot /></span>
        </div>
      </footer>
    </>
  );
}
