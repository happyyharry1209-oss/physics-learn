'use client';

import { useEffect, useRef, useState } from 'react';

const G = 9.8;

// Track profile: array of {x, y} points defining the coaster path
function makeTrack() {
  const pts: {x: number; y: number}[] = [];
  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    const x = t * 700;
    const y = 280
      - 180 * Math.sin(t * Math.PI * 0.8)
      - 60 * Math.sin(t * Math.PI * 2.2)
      + 30 * Math.sin(t * Math.PI * 4.5);
    pts.push({ x: x + 50, y: Math.max(y, 30) });
  }
  return pts;
}

function findClosestIdx(pts: {x: number; y: number}[], px: number): number {
  let best = 0, bestDist = Infinity;
  for (let i = 0; i < pts.length; i++) {
    const d = Math.abs(pts[i].x - px);
    if (d < bestDist) { bestDist = d; best = i; }
  }
  return best;
}

export default function RollerCoasterSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [h0, setH0] = useState(2.5);
  const [mass, setMass] = useState(50);
  const [mu, setMu] = useState(0);
  const [running, setRunning] = useState(false);
  const runningRef = useRef(false);
  const simRef = useRef({ t: 0, pos: 0, v: 0, idx: 0, energyLoss: 0, done: false });
  const animRef = useRef(0);

  useEffect(() => { runningRef.current = running; }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0) return;
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;

    const track = makeTrack();
    const totalLength = track[track.length - 1].x - track[0].x;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      const sim = simRef.current;
      const g = G;
      const m = mass;
      const fric = mu;

      // Draw track
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let i = 0; i < track.length; i++) {
        if (i === 0) ctx.moveTo(track[i].x, track[i].y);
        else ctx.lineTo(track[i].x, track[i].y);
      }
      ctx.stroke();

      // Track start/end markers
      ctx.fillStyle = '#888';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('起點', track[0].x, track[0].y - 14);
      ctx.fillText('終點', track[track.length - 1].x, track[track.length - 1].y - 14);

      // Height reference
      ctx.fillStyle = '#666';
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'left';

      // Update physics
      if (runningRef.current && !sim.done) {
        const dt = 0.008;
        const idx = Math.round(sim.pos * (track.length - 1));
        const idxClamped = Math.max(1, Math.min(track.length - 2, idx));
        const dy = track[idxClamped].y - track[idxClamped + 1].y;
        const dx = track[idxClamped + 1].x - track[idxClamped].x;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const slope = dy / Math.max(dist, 0.001);
        const angle = Math.asin(Math.max(-1, Math.min(1, slope)));

        // Gravitational force along track
        const Fg = m * g * Math.sin(angle);
        const Ff = fric * m * g * Math.cos(angle);
        const a = (Fg - Ff) / m;

        if (a < 0 && sim.v <= 0.01) {
          sim.v = 0;
        } else {
          sim.v += a * dt;
          if (sim.v < 0) sim.v = 0;
        }

        sim.pos += (sim.v / totalLength) * dt * 30;
        if (sim.pos >= 1) { sim.pos = 1; sim.done = true; }
      }

      // Calculate energies
      const carIdx = Math.round(sim.pos * (track.length - 1));
      const ci = Math.max(0, Math.min(track.length - 1, carIdx));
      const carY = track[ci].y;
      const carX = track[ci].x;

      const h0Px = 50;
      const y0 = track[findClosestIdx(track, track[0].x + 5)].y;
      const carHeight = Math.max(0, (y0 - carY) / 700 * h0);
      const U = m * g * carHeight;
      const K = 0.5 * m * sim.v * sim.v;
      const E0 = m * g * h0;
      const Elost = fric > 0 ? E0 * sim.pos * 0.3 : 0;
      const Etot = U + K;

      // Draw car
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = 'rgba(239,68,68,0.4)';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(carX, carY - 8, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Info overlay
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(10, 10, 200, 70);
      ctx.fillStyle = '#fff';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText('h₀ = ' + h0.toFixed(1) + ' m  m = ' + m.toFixed(0) + ' kg  μ = ' + fric.toFixed(2), 16, 14);
      ctx.fillText('U = ' + U.toFixed(0) + ' J  K = ' + K.toFixed(0) + ' J', 16, 30);
      ctx.fillText('E_total = ' + (Etot + Elost).toFixed(0) + ' J' + (fric > 0 ? ' (耗散 ' + Elost.toFixed(0) + ' J)' : ''), 16, 46);

      // Energy bar chart
      const barW = 30, barGap = 20, barMaxH = 120;
      const barX = W - 150;
      const barY = H - 40;

      // U bar (blue)
      const uH = Math.min(barMaxH, (U / Math.max(E0, 1)) * barMaxH);
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(barX, barY - uH, barW, uH);
      ctx.fillStyle = '#3b82f6';
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('U', barX + barW/2, barY + 12);

      // K bar (red)
      const kH = Math.min(barMaxH, (K / Math.max(E0, 1)) * barMaxH);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(barX + barW + barGap, barY - kH, barW, kH);
      ctx.fillStyle = '#ef4444';
      ctx.fillText('K', barX + barW + barGap + barW/2, barY + 12);

      // E_total bar (green)
      const eH = Math.min(barMaxH, ((Etot + Elost) / Math.max(E0, 1)) * barMaxH);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(barX + 2*(barW + barGap), barY - eH, barW, eH);
      ctx.fillStyle = '#10b981';
      ctx.fillText('E', barX + 2*(barW + barGap) + barW/2, barY + 12);

      // Axis
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(barX - 4, barY); ctx.lineTo(barX + 3*(barW + barGap) + 4, barY);
      ctx.stroke();

      // Legend
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(W - 145, 88, 10, 10);
      ctx.fillStyle = '#aaa';
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText('U (' + U.toFixed(0) + ' J)', W - 130, 88);

      ctx.fillStyle = '#ef4444';
      ctx.fillRect(W - 145, 102, 10, 10);
      ctx.fillText('K (' + K.toFixed(0) + ' J)', W - 130, 102);

      ctx.fillStyle = '#10b981';
      ctx.fillRect(W - 145, 116, 10, 10);
      ctx.fillText('E (' + (Etot + Elost).toFixed(0) + ' J)', W - 130, 116);

      if (fric > 0) {
        ctx.fillStyle = '#888';
        ctx.fillRect(W - 145, 130, 10, 10);
        ctx.fillText('耗散 (' + Elost.toFixed(0) + ' J)', W - 130, 130);
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [h0, mass, mu]);

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">🎢 力學能守恆模擬器</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 340 }} className="rounded-lg bg-zinc-900 dark:bg-zinc-950" />
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-5">
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          初始高度 h₀：
          <input type="range" min="0.5" max="5" step="0.1" value={h0}
            onChange={e => { setH0(parseFloat(e.target.value)); resetSim(); }} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{h0.toFixed(1)} m</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          質量 m：
          <input type="range" min="10" max="100" step="5" value={mass}
            onChange={e => setMass(parseFloat(e.target.value))} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{mass.toFixed(0)} kg</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          摩擦 μ：
          <input type="range" min="0" max="0.5" step="0.01" value={mu}
            onChange={e => setMu(parseFloat(e.target.value))} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{mu.toFixed(2)}</span>
        </label>
        <div className="flex items-end gap-1">
          <button onClick={() => setRunning(!running)}
            className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600">
            {running ? '⏸' : '▶'}
          </button>
          <button onClick={resetSim}
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs text-zinc-600 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300">
            ↺
          </button>
        </div>
      </div>
      <p className="mt-2 text-xs text-zinc-400">
        μ=0：力學能守恆，U↘ K↗ 總和固定 ｜ μ{'>'}0：摩擦耗能，熱能逐漸累積
      </p>
    </div>
  );

  function resetSim() {
    setRunning(false);
    runningRef.current = false;
    simRef.current = { t: 0, pos: 0, v: 0, idx: 0, energyLoss: 0, done: false };
  }
}
