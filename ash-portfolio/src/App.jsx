import React from 'react';
import { site, pillars, projects, ryuco, experience, tools, quote } from './data/content.js';
import featured from './data/featured.json';
import Gallery from './components/Gallery.jsx';

const Dot = ({ className = '' }) => <span className={`dot ${className}`} aria-hidden="true" />;

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <nav className="nav">
        <div className="wrap nav-inner">
          <a href="#top" className="brand" aria-label={`${site.name} — home`}>{site.name}<Dot /></a>
          <div className="nav-links">
            <a href="#do">Capabilities</a>
            <a href="#index">Work</a>
            <a href="#ryuco">ryū co.</a>
            <a href="#cv">Experience</a>
            <a href="#contact">Contact</a>
          </div>
          <span className="status">● {site.status}</span>
        </div>
      </nav>

      <main id="main">
        <header id="top" className="wrap hero">
          <h1 className="wordmark">{site.name}<Dot /></h1>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="tagline">{site.tagline[0]} <span className="red">{site.tagline[1]}</span></p>
              <p className="intro">{site.intro}</p>
            </div>
            <dl className="facts">
              {site.facts.map((f) => (
                <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
              ))}
            </dl>
          </div>
        </header>

        <section id="featured" className="wrap section-tight">
          <div className="section-head ruled">
            <h2 className="eyebrow">Featured work</h2>
            <span className="muted">{featured.length} pieces · posters, type &amp; brand creatives</span>
          </div>
          <Gallery items={featured} />
        </section>

        <section id="do" className="wrap section">
          <div className="section-head">
            <h2 className="eyebrow">What I do</h2>
            <span className="muted">Design × product × tech</span>
          </div>
          <div className="pillars">
            {pillars.map((p) => (
              <div className="pillar" key={p.n}>
                <div>
                  <div className="num">{p.n}</div>
                  <h3>{p.title}</h3>
                </div>
                <ul>{p.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        <section id="index" className="wrap section">
          <div className="section-head">
            <h2 className="eyebrow">Index of work</h2>
            <span className="muted">Selected roles &amp; projects</span>
          </div>
          <ol className="index">
            {projects.map((p, i) => (
              <li key={p.name}>
                <a className="row" href={p.href || '#cv'}>
                  <span className="muted">{String(i + 1).padStart(2, '0')}</span>
                  <span className="row-name">{p.name}</span>
                  <span className="muted">{p.category}</span>
                  <span className="muted right">{p.year}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section id="ryuco" className="dark">
          <div className="wrap section">
            <div className="ry-grid">
              <div>
                <div className="eyebrow red">{ryuco.label}</div>
                <h2 className="ry-title"><span className="red">ryū</span> co.</h2>
                <div className="ry-sub">{ryuco.subtitle}</div>
                {ryuco.paragraphs.map((t) => <p key={t.slice(0, 20)} className="ry-p">{t}</p>)}
              </div>
              <img src={ryuco.cover.src} alt={ryuco.cover.alt} className="deck-img" loading="lazy" />
            </div>

            <div className="eyebrow red ry-label">Services</div>
            <div className="services">
              {ryuco.services.map((s, i) => (
                <div key={s.title} className="service">
                  <div className="num red">{String(i + 1).padStart(2, '0')}</div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>

            <div className="eyebrow red ry-label">From the brand deck</div>
            <div className="deck">
              {ryuco.deck.map((d) => <img key={d.src} src={d.src} alt={d.alt} className="deck-img" loading="lazy" />)}
            </div>
          </div>
        </section>

        <section id="cv" className="wrap section cv">
          <div>
            <h2 className="eyebrow">Experience</h2>
            {site.resume && <a className="btn-outline" href={site.resume} download>Download résumé ↓</a>}
          </div>
          <div>
            <ul className="jobs">
              {experience.map((j) => (
                <li key={j.role + j.org}>
                  <div>
                    <div className="job-title">{j.role} <span className="muted">— {j.org}</span></div>
                    <p>{j.text}</p>
                  </div>
                  <span className="muted right">{j.years}</span>
                </li>
              ))}
            </ul>
            <div className="toolkit">
              <div className="muted">Toolkit</div>
              <ul>{tools.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="dark">
          <figure className="wrap quote">
            <Dot className="dot-lg" />
            <blockquote>{quote.lines[0]}<br /><span className="red">{quote.lines[1]}</span></blockquote>
            <figcaption>— {quote.by}</figcaption>
          </figure>
        </section>
      </main>

      <footer id="contact" className="wrap footer">
        <div className="muted">Let's build something</div>
        <a className="mail" href={`mailto:${site.email}`}>{site.email} ↗</a>
        <div className="footer-row">
          <span className="socials">
            {site.socials.map((s, i) => (
              <React.Fragment key={s.label}>{i > 0 && ' · '}<a href={s.href} target="_blank" rel="noreferrer">{s.label}</a></React.Fragment>
            ))}
          </span>
          <span>© {new Date().getFullYear()} {site.name}<Dot /></span>
        </div>
      </footer>
    </>
  );
}
