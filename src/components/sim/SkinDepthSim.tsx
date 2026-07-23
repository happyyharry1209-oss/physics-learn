'use client';

import { useEffect, useRef, useState } from 'react';

const MU0 = 4 * Math.PI * 1e-7;

export default function SkinDepthSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [freq, setFreq] = useState(1);
  const [sigma, setSigma] = useState(5.8);
  const [material, setMaterial] = useState('5.8');
  const animRef = useRef(0);

  useEffect(() => { setSigma(parseFloat(material)); }, [material]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = 800;
    canvas.height = 400;
    const c2 = canvas.getContext('2d');
    if (!c2) return;

    function loop() {
      if (!c2) return;
      c2.clearRect(0, 0, 800, 400);
      const f = freq * 1000;
      const s = sigma * 1e7;
      const omega = 2 * Math.PI * f;
      const delta = Math.sqrt(2 / (omega * MU0 * s)) || 0.001;
      const dMM = delta * 1000;

      const pad = { l: 60, r: 30, t: 30, b: 40 };
      const gw = 800 - pad.l - pad.r, gh = 400 - pad.t - pad.b;
      const maxZ = Math.max(delta * 6, 0.001);

      // Axes
      c2.strokeStyle = '#475569';
      c2.lineWidth = 1;
      c2.beginPath();
      c2.moveTo(pad.l, pad.t); c2.lineTo(pad.l, pad.t + gh); c2.lineTo(pad.l + gw, pad.t + gh);
      c2.stroke();

      c2.fillStyle = '#94a3b8';
      c2.font = '12px sans-serif';
      c2.textAlign = 'center';
      c2.textBaseline = 'top';
      c2.fillText('z (depth into conductor)', pad.l + gw / 2, pad.t + gh + 8);
      c2.textAlign = 'right';
      c2.textBaseline = 'middle';
      c2.fillText('J/J₀', pad.l - 8, pad.t + gh / 2);
      c2.textAlign = 'left';
      c2.textBaseline = 'top';
      c2.fillText('1.0', pad.l + 2, pad.t + 2);

      // J(z) = J₀ * exp(-z/δ)
      c2.strokeStyle = '#3b82f6';
      c2.lineWidth = 3;
      c2.beginPath();
      for (let i = 0; i <= 200; i++) {
        const z = (i / 200) * maxZ;
        const ratio = Math.exp(-z / delta);
        const xx = pad.l + (z / maxZ) * gw;
        const yy = pad.t + gh - ratio * gh;
        if (i === 0) c2.moveTo(xx, yy); else c2.lineTo(xx, yy);
      }
      c2.stroke();

      // 1/e line
      const eInvY = pad.t + gh - (1 / Math.E) * gh;
      c2.setLineDash([4, 4]);
      c2.strokeStyle = '#ef4444';
      c2.lineWidth = 1;
      c2.beginPath();
      c2.moveTo(pad.l, eInvY); c2.lineTo(pad.l + gw, eInvY);
      c2.stroke();
      c2.setLineDash([]);
      c2.fillStyle = '#ef4444';
      c2.font = '13px sans-serif';
      c2.textAlign = 'left';
      c2.textBaseline = 'bottom';
      c2.fillText('J₀/e ≈ 36.8%', pad.l + 4, eInvY);

      // δ marker
      const dX = pad.l + Math.min(1, delta / maxZ) * gw;
      c2.strokeStyle = '#f59e0b';
      c2.lineWidth = 2;
      c2.setLineDash([3, 3]);
      c2.beginPath();
      c2.moveTo(dX, pad.t); c2.lineTo(dX, pad.t + gh);
      c2.stroke();
      c2.setLineDash([]);
      c2.fillStyle = '#f59e0b';
      c2.font = 'bold 11px sans-serif';
      c2.textAlign = 'center';
      c2.textBaseline = 'bottom';
      c2.fillText('δ = ' + (dMM >= 0.01 ? dMM.toFixed(3) + ' mm' : (dMM * 1000).toFixed(1) + ' μm'), dX, pad.t - 4);

      // Info panel
      c2.fillStyle = 'rgba(0,0,0,0.75)';
      c2.fillRect(pad.l + gw - 220, pad.t + 4, 215, 80);
      c2.fillStyle = '#fff';
      c2.font = '12px sans-serif';
      c2.textAlign = 'left';
      c2.textBaseline = 'top';
      c2.fillText('f = ' + freq.toFixed(freq >= 10 ? 1 : freq >= 1 ? 2 : 3) + ' kHz', pad.l + gw - 214, pad.t + 8);
      c2.fillText('σ = ' + sigma.toFixed(1) + ' × 10⁷ S/m', pad.l + gw - 214, pad.t + 26);
      c2.fillText('δ = ' + (dMM >= 0.01 ? dMM.toFixed(3) + ' mm' : (dMM * 1000).toFixed(1) + ' μm'), pad.l + gw - 214, pad.t + 44);
      c2.fillText('J(z) = J₀·exp(-z/δ)', pad.l + gw - 214, pad.t + 62);

      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [freq, sigma]);

  const f = freq * 1000;
  const s = sigma * 1e7;
  const omega = 2 * Math.PI * f;
  const delta = Math.sqrt(2 / (omega * MU0 * s)) || 0.001;
  const dMM = delta * 1000;

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">🔬 趨膚效應 (Skin Depth) 模擬器</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 300 }} className="rounded-lg bg-zinc-950" />
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          頻率 f：
          <input type="range" min="0.05" max="100" step="0.05" value={freq}
            onChange={e => setFreq(parseFloat(e.target.value))} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{freq.toFixed(2)} kHz</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          σ 材料：
          <select value={material} onChange={e => setMaterial(e.target.value)}
            className="ml-1 rounded border border-zinc-300 bg-white px-2 py-1 text-xs dark:border-zinc-600 dark:bg-zinc-700 dark:text-white">
            <option value="5.8">銅 (σ=5.8×10⁷)</option>
            <option value="4.0">鋁 (σ=4.0×10⁷)</option>
            <option value="1.0">鐵 (σ=1.0×10⁷)</option>
            <option value="0.01">海水 (σ=10⁵)</option>
          </select>
        </label>
        <div className="flex items-end text-xs text-zinc-400">
          δ = {dMM >= 0.01 ? dMM.toFixed(3) + ' mm' : (dMM * 1000).toFixed(1) + ' μm'}
          <span className="ml-2 text-zinc-600">｜δ = √(2/ωμσ)</span>
        </div>
      </div>
    </div>
  );
}
