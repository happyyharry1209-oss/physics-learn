'use client';

import { useEffect, useRef, useState } from 'react';

export default function BandStructureSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [V0, setV0] = useState(0.3);
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = 800;
    canvas.height = 500;
    const c2 = canvas.getContext('2d');
    if (!c2) return;

    function loop() {
      if (!c2) return;
      c2.clearRect(0, 0, 800, 500);
      const pad = { l: 60, r: 30, t: 30, b: 40 };
      const gw = 800 - pad.l - pad.r, gh = 500 - pad.t - pad.b;
      const strength = V0;

      // Axes
      c2.strokeStyle = '#475569';
      c2.lineWidth = 1.5;
      c2.beginPath();
      c2.moveTo(pad.l, pad.t); c2.lineTo(pad.l, pad.t + gh); c2.lineTo(pad.l + gw, pad.t + gh);
      c2.stroke();

      c2.fillStyle = '#94a3b8';
      c2.font = '12px sans-serif';
      c2.textAlign = 'center';
      c2.textBaseline = 'top';
      c2.fillText('k (波數)', pad.l + gw / 2, pad.t + gh + 8);
      c2.textAlign = 'right';
      c2.textBaseline = 'middle';
      c2.fillText('E (能量)', pad.l - 6, pad.t + gh / 2);

      // k-axis labels
      c2.fillStyle = '#64748b';
      c2.font = '13px sans-serif';
      c2.textAlign = 'center';
      c2.textBaseline = 'top';
      const zones = [-2, -1, 0, 1, 2];
      zoneLabels: for (const n of zones) {
        const kx = pad.l + ((n + 2) / 4) * gw;
        c2.fillText(n === 0 ? '0' : n === 1 ? 'π/a' : n === -1 ? '-π/a' : n === 2 ? '2π/a' : '-2π/a', kx, pad.t + gh + 6);
        // Zone boundary lines
        if (n !== 0 && n !== 2) {
          c2.setLineDash([2, 4]);
          c2.strokeStyle = 'rgba(100,100,100,0.3)';
          c2.lineWidth = 1;
          c2.beginPath();
          c2.moveTo(kx, pad.t); c2.lineTo(kx, pad.t + gh);
          c2.stroke();
          c2.setLineDash([]);
        }
      }

      // Free electron parabola (dashed)
      c2.setLineDash([4, 4]);
      c2.strokeStyle = 'rgba(148,163,184,0.3)';
      c2.lineWidth = 1.5;
      c2.beginPath();
      for (let i = 0; i <= 400; i++) {
        const k = (i / 400) * 4 - 2; // -2 to 2
        const E = k * k * 0.15;
        const kx = pad.l + ((k + 2) / 4) * gw;
        const ey = pad.t + gh - Math.min(E, gh - 4) - 4;
        if (i === 0) c2.moveTo(kx, ey); else c2.lineTo(kx, ey);
      }
      c2.stroke();
      c2.setLineDash([]);

      // Energy bands with gaps at zone boundaries
      // We draw reduced zone scheme
      const bands = [
        { zone: [-1, 0], shift: 0, offset: 0 },
        { zone: [-1, 0], shift: 1, offset: -1 },
        { zone: [0, 1], shift: 0, offset: 0 },
        { zone: [0, 1], shift: -1, offset: 1 },
        { zone: [-2, -1], shift: 1, offset: 1 },
        { zone: [-2, -1], shift: 2, offset: -2 },
        { zone: [1, 2], shift: -1, offset: -1 },
        { zone: [1, 2], shift: -2, offset: 2 },
      ];

      // First band
      c2.strokeStyle = '#3b82f6';
      c2.lineWidth = 3;
      c2.beginPath();
      for (let i = 0; i <= 100; i++) {
        const k = (i / 100) * 2 - 1; // -1 to 1 (first BZ)
        const E0 = k * k;
        const gap = strength * 0.3;
        const E = E0 - E0 * strength * 0.3 + gap * 0.3;
        const kx = pad.l + ((k + 1) / 2) * (gw * 0.5);
        const ey = pad.t + gh - Math.min(E * 0.15 + 0.02, gh - 4) - 4;
        if (i === 0) c2.moveTo(kx, ey); else c2.lineTo(kx, ey);
      }
      c2.stroke();

      // Second band (above gap)
      c2.strokeStyle = '#f59e0b';
      c2.lineWidth = 3;
      c2.beginPath();
      for (let i = 0; i <= 100; i++) {
        const k = (i / 100) * 2 - 1;
        const E0 = k * k;
        const gap = strength * 0.4;
        const E = E0 + gap + E0 * strength * 0.3;
        const kx = pad.l + ((k + 1) / 2) * (gw * 0.5);
        const ey = pad.t + gh - Math.min(E * 0.15 + 0.05, gh - 4) - 4;
        if (i === 0) c2.moveTo(kx, ey); else c2.lineTo(kx, ey);
      }
      c2.stroke();

      // Gap labels at zone boundaries
      const gapSize = strength * 0.5;
      const gapY = pad.t + gh - (0.5 * 0.15 + 0.04) * gh / 1.5 - 4;
      const gapY2 = gapY - gapSize * 30;

      for (const boundary of [0.25, 0.75]) { // k = ±π/a positions in the reduced graph
        const bx = pad.l + boundary * (gw * 0.5);
        c2.strokeStyle = '#ef4444';
        c2.lineWidth = 2;
        c2.beginPath();
        c2.moveTo(bx, gapY);
        c2.lineTo(bx, gapY2);
        c2.stroke();
        // Gap arrows
        c2.fillStyle = '#ef4444';
        c2.font = '12px sans-serif';
        c2.textAlign = 'center';
        c2.textBaseline = 'top';
        c2.fillText('E_g', bx, gapY2 + 2);
      }

      // Extended zone regions (replicated)
      c2.strokeStyle = 'rgba(59,130,246,0.2)';
      c2.lineWidth = 1.5;
      for (let shift = -2; shift <= 2; shift += 2) {
        if (shift === 0) continue;
        c2.beginPath();
        for (let i = 0; i <= 100; i++) {
          const k = (i / 100) * 2 - 1;
          const E0 = (k + shift) * (k + shift) * 0.12;
          const kx = pad.l + (0.25 + (k + 1) / 4) * gw + shift * (gw * 0.125);
          const ey = pad.t + gh - Math.min(E0, gh - 4) - 4;
          if (i === 0) c2.moveTo(kx, ey); else c2.lineTo(kx, ey);
        }
        c2.stroke();
      }

      // Legend
      c2.fillStyle = 'rgba(0,0,0,0.75)';
      c2.fillRect(pad.l + gw - 160, pad.t + 4, 154, 70);
      c2.fillStyle = '#3b82f6';
      c2.fillRect(pad.l + gw - 154, pad.t + 8, 12, 12);
      c2.fillStyle = '#94a3b8';
      c2.font = '13px sans-serif';
      c2.textAlign = 'left';
      c2.textBaseline = 'top';
      c2.fillText('第一能帶（價帶）', pad.l + gw - 138, pad.t + 8);
      c2.fillStyle = '#f59e0b';
      c2.fillRect(pad.l + gw - 154, pad.t + 24, 12, 12);
      c2.fillStyle = '#94a3b8';
      c2.fillText('第二能帶（導帶）', pad.l + gw - 138, pad.t + 24);
      c2.fillStyle = '#ef4444';
      c2.fillText('能隙 E_g = ' + (V0 * 0.5).toFixed(2) + ' (a.u.)', pad.l + gw - 154, pad.t + 42);

      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [V0]);

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">🔬 能帶結構模擬器 (近自由電子模型)</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 280 }} className="rounded-lg bg-zinc-950" />
      <div className="mt-4">
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          週期勢能強度 V₀：
          <input type="range" min="0" max="1" step="0.02" value={V0}
            onChange={e => setV0(parseFloat(e.target.value))} className="ml-2 w-48" />
          <span className="ml-2 font-semibold text-blue-500">{V0.toFixed(2)}</span>
        </label>
      </div>
      <p className="mt-2 text-xs text-zinc-400">
        V₀=0 時為自由電子拋物線 ｜ V₀&gt;0 時布里淵區邊界 k=±π/a 處開啟能隙 E_g ｜ 能隙隨 V₀ 增大而增大
      </p>
    </div>
  );
}
