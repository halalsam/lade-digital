// LiquidRibbon.jsx
// A dark, minimalist liquid-metal ribbon of light — a single self-contained
// React component. No dependencies beyond React (16.8+ for hooks).
//
//   import LiquidRibbon from './LiquidRibbon';
//   <LiquidRibbon />                                  // fills its parent
//   <LiquidRibbon style={{ width: 1280, height: 720 }} />
//
// Props:
//   duration  loop length in seconds        (default 8)
//   fps       render cap for the rAF loop    (default 60)
//   paused    freeze the animation           (default false)
//   className, style   forwarded to the root <div>
//
// The ribbon is a flat 3D band that coils like weighted smoke. Each
// cross-section is shaded per-frame (diffuse + specular + fresnel rim +
// cyan→violet environment sheen), projected with weak perspective, painter-
// sorted, and drawn as inline-SVG polygons. Every time-dependent term is a
// function of phase = 2π·t/duration with an INTEGER phase coefficient, so the
// motion loops perfectly seamlessly.

import React from 'react';

const W = 1920, H = 1080, CX = W / 2, CY = H / 2;
const N = 150;   // spine samples
const F = 1500;  // perspective focal length

// ── vector helpers ──────────────────────────────────────────────────────────
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const norm = (v) => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
};
const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const lerp = (a, b, t) => a + (b - a) * t;

// ── the coiling spine in 3D (world units) ───────────────────────────────────
function spine(s, ph) {
  const coils = 2.3;
  const a = s * coils * 2 * Math.PI + ph;
  const r = 300 * (0.72 + 0.34 * Math.sin(s * 2 * Math.PI * 1.25 - ph));
  const x = CX + r * Math.sin(a) + 62 * Math.sin(s * 2 * Math.PI * 2.6 + ph * 2);
  const z = r * Math.cos(a) + 62 * Math.cos(s * 2 * Math.PI * 2.1 - ph);
  const y = (CY - 470) + s * 940 + 46 * Math.sin(s * 2 * Math.PI * 1.6 + ph);
  return [x, y, z];
}

// ribbon half-width taper — fat in the middle, thinning to nothing at the ends
const envW = (s) => Math.pow(Math.sin(Math.PI * s), 0.55);

// weak-perspective projection to screen space (keeps z for shading/fog)
function project(p) {
  const per = F / (F + p[2]);
  return [CX + (p[0] - CX) * per, CY + (p[1] - CY) * per, p[2]];
}

// studio light + view + half-vectors (constant)
const L = norm([-0.45, -0.6, 0.62]);
const V = [0, 0, 1];
const HV = norm([L[0] + V[0], L[1] + V[1], L[2] + V[2]]);

const CYAN = [96, 224, 255];
const VIOLET = [188, 126, 255];

function buildRibbon(ph) {
  const edgeP = new Array(N);
  const edgeM = new Array(N);
  const nrm = new Array(N);
  const zc = new Array(N);

  for (let i = 0; i < N; i++) {
    const s = i / (N - 1);
    const p = spine(s, ph);
    const ds = 0.6 / (N - 1);
    const pa = spine(Math.min(1, s + ds), ph);
    const pb = spine(Math.max(0, s - ds), ph);
    const T = norm(sub(pa, pb));

    let n0 = cross(T, [0, 1, 0]);
    if (Math.hypot(n0[0], n0[1], n0[2]) < 1e-4) n0 = [1, 0, 0];
    n0 = norm(n0);
    const b0 = norm(cross(T, n0));

    const tw = s * 3 * 2 * Math.PI + ph + 0.4 * Math.sin(ph);
    const c = Math.cos(tw), sn = Math.sin(tw);
    const Wd = [
      c * n0[0] + sn * b0[0],
      c * n0[1] + sn * b0[1],
      c * n0[2] + sn * b0[2],
    ];
    const Nrm = norm(cross(T, Wd));

    const hw = 82 * envW(s);
    edgeP[i] = project([p[0] + Wd[0] * hw, p[1] + Wd[1] * hw, p[2] + Wd[2] * hw]);
    edgeM[i] = project([p[0] - Wd[0] * hw, p[1] - Wd[1] * hw, p[2] - Wd[2] * hw]);
    nrm[i] = Nrm;
    zc[i] = p[2];
  }

  const segs = [];
  for (let i = 0; i < N - 1; i++) {
    let n = nrm[i];
    if (dot(n, V) < 0) n = [-n[0], -n[1], -n[2]]; // two-sided: face the camera
    const d = Math.max(0, dot(n, L));
    const spec = Math.pow(Math.max(0, dot(n, HV)), 46);
    const fr = Math.pow(1 - clamp01(dot(n, V)), 3);

    const tc = (n[0] + 1) / 2;
    const eR = lerp(CYAN[0], VIOLET[0], tc);
    const eG = lerp(CYAN[1], VIOLET[1], tc);
    const eB = lerp(CYAN[2], VIOLET[2], tc);

    const lum = 0.12 + 0.72 * d;
    const zavg = (zc[i] + zc[i + 1]) / 2;
    const fog = 0.6 + 0.4 * clamp01((378 - zavg) / 756);

    let r = (lum * 232 * 0.7 + eR * lum * 0.3 + spec * 255 * 0.95 + fr * eR * 0.85) * fog;
    let g = (lum * 240 * 0.7 + eG * lum * 0.3 + spec * 255 * 0.95 + fr * eG * 0.85) * fog;
    let b = (lum * 252 * 0.7 + eB * lum * 0.3 + spec * 255 * 0.95 + fr * eB * 0.85) * fog;
    r = Math.round(Math.min(255, r));
    g = Math.round(Math.min(255, g));
    b = Math.round(Math.min(255, b));

    const a1 = edgeP[i], a2 = edgeP[i + 1], a3 = edgeM[i + 1], a4 = edgeM[i];
    segs.push({
      z: zavg,
      s: `<polygon points="${a1[0].toFixed(1)},${a1[1].toFixed(1)} ${a2[0].toFixed(1)},${a2[1].toFixed(1)} ${a3[0].toFixed(1)},${a3[1].toFixed(1)} ${a4[0].toFixed(1)},${a4[1].toFixed(1)}" fill="rgb(${r},${g},${b})" stroke="rgb(${r},${g},${b})" stroke-width="1.1"/>`,
    });
  }

  segs.sort((p, q) => q.z - p.z); // painter: far first, near on top
  return segs.map((x) => x.s).join('');
}

export default function LiquidRibbon({
  duration = 8,
  fps = 60,
  paused = false,
  className,
  style = {},
}) {
  const gRef = React.useRef(null);
  const seedRef = React.useRef(null);
  const raf = React.useRef(0);
  const start = React.useRef(null);
  const last = React.useRef(-1);

  React.useEffect(() => {
    const frame = 1000 / fps;
    const draw = (now) => {
      if (start.current == null) start.current = now;
      if (now - last.current >= frame || last.current < 0) {
        last.current = now;
        const t = ((now - start.current) / 1000) % duration;
        const ph = 2 * Math.PI * (t / duration);
        if (gRef.current) gRef.current.innerHTML = buildRibbon(ph);
        if (seedRef.current) seedRef.current.setAttribute('seed', String(Math.floor(t * 24)));
      }
      raf.current = requestAnimationFrame(draw);
    };
    if (!paused) raf.current = requestAnimationFrame(draw);
    else if (gRef.current && !gRef.current.innerHTML) gRef.current.innerHTML = buildRibbon(0);
    return () => cancelAnimationFrame(raf.current);
  }, [duration, fps, paused]);

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#0a0a0a',
        overflow: 'hidden',
        ...style,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', inset: 0, display: 'block' }}
      >
        <defs>
          <filter id="lr-bloom" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="lr-grain">
            <feTurbulence
              ref={seedRef}
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              seed="0"
              stitchTiles="stitch"
              result="n"
            />
            <feColorMatrix
              in="n"
              type="matrix"
              values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.4 0"
            />
          </filter>
          <radialGradient id="lr-vig" cx="50%" cy="50%" r="72%">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="68%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.9" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width={W} height={H} fill="#0a0a0a" />
        <g ref={gRef} filter="url(#lr-bloom)" />
        <rect x="0" y="0" width={W} height={H} fill="url(#lr-vig)" />
        <rect
          x="0"
          y="0"
          width={W}
          height={H}
          filter="url(#lr-grain)"
          opacity="0.06"
          style={{ mixBlendMode: 'screen' }}
        />
      </svg>
    </div>
  );
}
