import React, { useEffect, useRef } from 'react';

// Custom cursor: "jack of all trades · court jester ·" spinning around a
// playing-card joker. Over links and designs the ring grows and reads
// "click · click ·" in red. Desktop only; off on touch screens and for people
// who prefer reduced motion (they keep the normal cursor).
const RED = '#D9381E', INK = '#111', PAPER = '#F6F5F1';

// Joker face, playing-card style: three-pronged jester hat with bells, ruff collar, big grin.
function drawJoker(ctx, x, y, s, t) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.sin(t * 3) * 0.12);
  ctx.scale(s, s);
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // ruff collar: alternating red / ink points under the chin
  for (let i = 0; i < 9; i++) {
    const a0 = Math.PI * 0.12 + (i / 9) * Math.PI * 0.76, a1 = a0 + Math.PI * 0.76 / 9, am = (a0 + a1) / 2;
    ctx.fillStyle = i % 2 ? INK : RED;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a0) * 5.5, Math.sin(a0) * 5.5);
    ctx.lineTo(Math.cos(am) * 10.5, Math.sin(am) * 10.5);
    ctx.lineTo(Math.cos(a1) * 5.5, Math.sin(a1) * 5.5);
    ctx.closePath(); ctx.fill();
  }
  // hat: three floppy prongs with bells that jingle
  const prongs = [
    { base: [-5.2, -2.5], tip: [-10.5, -10.5], c: RED },
    { base: [0, -5.6], tip: [0, -14], c: INK },
    { base: [5.2, -2.5], tip: [10.5, -10.5], c: RED },
  ];
  prongs.forEach((p, i) => {
    const sway = Math.sin(t * 6 + i * 1.7) * 1.4;
    const tx = p.tip[0] + sway, ty = p.tip[1] + Math.cos(t * 6 + i) * 0.6;
    ctx.fillStyle = p.c; ctx.strokeStyle = PAPER; ctx.lineWidth = 0.9;
    ctx.beginPath();
    ctx.moveTo(p.base[0] - 3, p.base[1] + 1);
    ctx.quadraticCurveTo((p.base[0] + tx) / 2 - 2.5, (p.base[1] + ty) / 2 - 2, tx, ty);
    ctx.quadraticCurveTo((p.base[0] + tx) / 2 + 2.5, (p.base[1] + ty) / 2 + 1, p.base[0] + 3, p.base[1] + 1);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = PAPER; ctx.strokeStyle = INK; ctx.lineWidth = 0.9;
    ctx.beginPath(); ctx.arc(tx, ty, 1.7, 0, 7); ctx.fill(); ctx.stroke();
  });
  // hat band
  ctx.fillStyle = INK;
  ctx.beginPath(); ctx.ellipse(0, -3.6, 6.4, 1.8, 0, 0, Math.PI * 2); ctx.fill();
  // face
  ctx.fillStyle = PAPER; ctx.strokeStyle = INK; ctx.lineWidth = 1.1;
  ctx.beginPath(); ctx.arc(0, 1, 5.6, 0, 7); ctx.fill(); ctx.stroke();
  // diamond eyes, like the card
  ctx.fillStyle = INK;
  [-2.1, 2.1].forEach((ex) => {
    ctx.beginPath(); ctx.moveTo(ex, -1.2); ctx.lineTo(ex + 0.9, 0); ctx.lineTo(ex, 1.2); ctx.lineTo(ex - 0.9, 0); ctx.closePath(); ctx.fill();
  });
  // red nose + cheeks
  ctx.fillStyle = RED;
  ctx.beginPath(); ctx.arc(0, 1.6, 0.9, 0, 7); ctx.fill();
  ctx.globalAlpha = 0.55;
  ctx.beginPath(); ctx.arc(-3.6, 2.6, 0.9, 0, 7); ctx.arc(3.6, 2.6, 0.9, 0, 7); ctx.fill();
  ctx.globalAlpha = 1;
  // grin
  ctx.strokeStyle = INK; ctx.lineWidth = 0.9;
  ctx.beginPath(); ctx.arc(0, 2.4, 2.9, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();
  ctx.restore();
}

// B2: TEXT RING with the joker in the middle
function drawTextRingJoker(ctx, x, y, t, hot) {
  const R = hot ? 34 : 28;
  const text = hot ? 'click · click · click · click · ' : 'jack of all trades · court jester · ';
  ctx.save();
  ctx.font = `700 ${hot ? 8.5 : 8}px "Open Sauce Sans", Helvetica, Arial, sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const total = [...text].reduce((s, c) => s + ctx.measureText(c).width, 0);
  const scale = (Math.PI * 2 * R) / total;
  let ang = t * (hot ? 1.6 : 0.9);
  for (const c of text) {
    const w = ctx.measureText(c).width * scale, th = ang + (w / R) / 2;
    ctx.save(); ctx.translate(x + Math.cos(th) * R, y + Math.sin(th) * R); ctx.rotate(th + Math.PI / 2);
    ctx.lineWidth = 3; ctx.strokeStyle = PAPER; ctx.strokeText(c, 0, 0);
    ctx.fillStyle = hot ? RED : INK; ctx.fillText(c, 0, 0);
    ctx.restore(); ang += w / R;
  }
  ctx.restore();
  drawJoker(ctx, x, y + 1, hot ? 1.25 : 1.05, t);
}

export default function JesterCursor() {
  const canvas = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    const cv = canvas.current;
    const ctx = cv.getContext('2d');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      cv.width = window.innerWidth * dpr; cv.height = window.innerHeight * dpr;
      cv.style.width = `${window.innerWidth}px`; cv.style.height = `${window.innerHeight}px`;
    };
    resize();
    window.addEventListener('resize', resize);
    document.documentElement.classList.add('has-custom-cursor');

    const p = { x: -200, y: -200, seen: false, hot: false };
    const ring = { x: -200, y: -200 };
    let raf, start = performance.now();

    const onMove = (e) => {
      p.x = e.clientX; p.y = e.clientY;
      if (!p.seen) { ring.x = p.x; ring.y = p.y; p.seen = true; }
      p.hot = !!(e.target.closest && e.target.closest('a, button, [role="tab"], .tile, .row'));
    };
    const onLeave = () => { p.seen = false; };
    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);

    const draw = (now) => {
      ring.x += (p.x - ring.x) * 0.35; ring.y += (p.y - ring.y) * 0.35;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (p.seen) drawTextRingJoker(ctx, ring.x, ring.y, (now - start) / 1000, p.hot);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return <canvas ref={canvas} className="custom-cursor" aria-hidden="true" />;
}
