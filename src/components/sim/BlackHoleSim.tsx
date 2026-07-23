'use client';

import { useEffect, useRef, useState } from 'react';

export default function BlackHoleSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mass, setMass] = useState(5);
  const [impact, setImpact] = useState(60);
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
      const cx = 400, cy = 250;
      const rs = mass * 8; // Schwarzschild radius in pixels
      const b = impact; // impact parameter

      // Draw grid (weak gravity indication)
      c2.strokeStyle = 'rgba(59,130,246,0.06)';
      c2.lineWidth = 0.5;
      for (let r = rs * 2; r < 350; r += 25) {
        c2.beginPath();
        c2.arc(cx, cy, r, 0, Math.PI * 2);
        c2.stroke();
      }

      // Draw event horizon
      const grad = c2.createRadialGradient(cx, cy, 0, cx, cy, rs);
      grad.addColorStop(0, '#000000');
      grad.addColorStop(0.7, '#0a0a0a');
      grad.addColorStop(0.95, '#1a0a2e');
      grad.addColorStop(1, 'rgba(88,28,135,0.3)');
      c2.fillStyle = grad;
      c2.shadowColor = 'rgba(88,28,135,0.5)';
      c2.shadowBlur = 20;
      c2.beginPath();
      c2.arc(cx, cy, rs, 0, Math.PI * 2);
      c2.fill();
      c2.shadowBlur = 0;

      // Event horizon ring
      c2.strokeStyle = 'rgba(168,85,247,0.5)';
      c2.lineWidth = 2;
      c2.beginPath();
      c2.arc(cx, cy, rs, 0, Math.PI * 2);
      c2.stroke();

      // Label
      c2.fillStyle = '#a855f7';
      c2.font = '13px sans-serif';
      c2.textAlign = 'center';
      c2.textBaseline = 'top';
      c2.fillText('事件視界 rₛ', cx, cy + rs + 4);

      // Photon sphere at 1.5 rs
      const photonR = 1.5 * rs;
      c2.setLineDash([3, 3]);
      c2.strokeStyle = 'rgba(249,115,22,0.3)';
      c2.lineWidth = 1;
      c2.beginPath();
      c2.arc(cx, cy, photonR, 0, Math.PI * 2);
      c2.stroke();
      c2.setLineDash([]);
      c2.fillStyle = 'rgba(249,115,22,0.5)';
      c2.font = '12px sans-serif';
      c2.textAlign = 'center';
      c2.textBaseline = 'bottom';
      c2.fillText('光子球 1.5rₛ', cx, cy - photonR - 2);

      // Light deflection
      const startY = -200;
      const endY = 250;
      const steps = 100;

      // Approximate geodesic with deflection
      c2.strokeStyle = '#fbbf24';
      c2.lineWidth = 2.5;
      c2.shadowColor = 'rgba(251,191,36,0.3)';
      c2.shadowBlur = 8;
      c2.beginPath();
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const y = startY + (endY - startY) * t;
        // Deflection angle depends on closest approach
        const closestDist = Math.sqrt(b * b + rs * rs * 0.5);
        const deflectionFactor = rs / Math.max(closestDist, rs * 0.8);
        const xOffset = b + deflectionFactor * 8 * (1 - Math.abs(y) / 250) * (y > 0 ? 1 : -1);
        const x = cx + xOffset;

        // Clamp if inside event horizon
        const distFromCenter = Math.sqrt((x - cx) * (x - cx) + y * y);
        if (distFromCenter < rs * 0.9) break;

        const px = x;
        const py = cy + y;
        if (i === 0) c2.moveTo(px, py); else c2.lineTo(px, py);
      }
      c2.stroke();
      c2.shadowBlur = 0;

      // Photon sphere orbit (trapped light)
      if (Math.abs(b - photonR) < 10) {
        c2.strokeStyle = '#f59e0b';
        c2.lineWidth = 2;
        c2.setLineDash([2, 4]);
        c2.beginPath();
        c2.arc(cx, cy, photonR, 0, Math.PI * 2);
        c2.stroke();
        c2.setLineDash([]);
      }

      // Accretion disk indication
      c2.fillStyle = 'rgba(251,191,36,0.03)';
      c2.beginPath();
      c2.arc(cx, cy, rs * 2.5, 0, Math.PI * 2);
      c2.fill();

      // Info panel
      c2.fillStyle = 'rgba(0,0,0,0.75)';
      c2.fillRect(10, 8, 210, 80);
      c2.fillStyle = '#fff';
      c2.font = '11px sans-serif';
      c2.textAlign = 'left';
      c2.textBaseline = 'top';
      c2.fillText('M = ' + mass.toFixed(0) + ' M☉  rₛ = ' + rs.toFixed(0) + ' px', 16, 12);
      c2.fillText('衝擊參數 b = ' + b.toFixed(0) + ' px', 16, 28);
      const inHorizon = b < rs;
      const nearPhoton = Math.abs(b - photonR) < 10;
      c2.fillText(inHorizon ? '⚠ 落入事件視界！' : nearPhoton ? '○ 光子球軌道' : '✓ 光線偏轉彎曲', 16, 44);
      c2.fillStyle = '#94a3b8';
      c2.font = '13px sans-serif';
      c2.fillText('b < rₛ 光無法逃脫 ｜ b=1.5rₛ 光子球 ｜ b>1.5rₛ 偏轉', 16, 62);

      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [mass, impact]);

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">🕳️ Schwarzschild 黑洞光線偏轉模擬器</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 280 }} className="rounded-lg bg-zinc-950" />
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          黑洞質量 M：
          <input type="range" min="1" max="20" step="0.5" value={mass}
            onChange={e => setMass(parseFloat(e.target.value))} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{mass.toFixed(1)} M☉</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          衝擊參數 b：
          <input type="range" min="5" max="150" step="1" value={impact}
            onChange={e => setImpact(parseInt(e.target.value))} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{impact} px</span>
        </label>
      </div>
      <p className="mt-2 text-xs text-zinc-400">
        rₛ = 2GM/c² ｜ b &lt; rₛ 光落入黑洞 ｜ b = 1.5rₛ 光子球軌道 ｜ b &gt; 1.5rₛ 光線彎曲偏轉
      </p>
    </div>
  );
}
