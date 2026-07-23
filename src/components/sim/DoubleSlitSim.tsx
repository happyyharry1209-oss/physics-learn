'use client';

import { useEffect, useRef, useState } from 'react';

function wavelengthToHex(wl: number): string {
  if (wl < 420) return '#8b00ff';
  if (wl < 460) return '#4b00ff';
  if (wl < 490) return '#00bfff';
  if (wl < 530) return '#00ff7f';
  if (wl < 570) return '#7fff00';
  if (wl < 600) return '#ffbf00';
  if (wl < 650) return '#ff7f00';
  return '#ff0000';
}

function hexToRgb(hex: string) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : { r: 0, g: 255, b: 0 };
}

export default function DoubleSlitSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wl, setWl] = useState(550);
  const [d, setD] = useState(0.5);
  const [L, setL] = useState(2);
  const wlR = useRef(550);
  const dR = useRef(0.5);
  const LR = useRef(2);
  const animRef = useRef(0);

  useEffect(() => { wlR.current = wl; }, [wl]);
  useEffect(() => { dR.current = d; }, [d]);
  useEffect(() => { LR.current = L; }, [L]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = 800;
    canvas.height = 720;

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, 800, 720);
      const wl = wlR.current, d = dR.current, L = LR.current;
      const color = wavelengthToHex(wl);
      const rgb = hexToRgb(color);
      const lambda = wl * 1e-9, d_m = d * 1e-6, L_m = L;

      // Fringe pattern
      const nf = 300, fh = 240, cx = 400;
      for (let i = 0; i < nf; i++) {
        const theta = Math.atan2((i / nf - 0.5) * 0.01, 1);
        const phase = (Math.PI * d_m * Math.sin(theta)) / lambda;
        const I = Math.pow(Math.cos(phase), 2);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${Math.max(0.02, I)})`;
        ctx.fillRect(cx - 200, (i / nf) * fh, 400, fh / nf + 1);
      }
      ctx.fillStyle = '#888';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('干涉條紋', cx, fh + 14);

      // Intensity graph
      const gx = 160, gy = 300, gw = 480, gh = 200;
      ctx.strokeStyle = '#444';
      ctx.lineWidth = 1;
      ctx.strokeRect(gx, gy, gw, gh);
      ctx.fillStyle = '#888';
      ctx.fillText('I(y) 光強分佈', cx, gy - 8);

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const t = (i / 200) * 2 - 1;
        const thetaG = Math.atan2(t * d_m * 0.1, L_m);
        const phaseG = (Math.PI * d_m * Math.sin(thetaG)) / lambda;
        const I = Math.pow(Math.cos(phaseG), 2);
        const xx = gx + (i / 200) * gw;
        const yy = gy + gh - 8 - I * (gh - 16);
        if (i === 0) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy);
      }
      ctx.stroke();

      const deltaY = lambda * L_m / d_m;
      ctx.fillStyle = 'rgba(0,0,0,0.8)';
      ctx.fillRect(8, 4, 250, 62);
      ctx.fillStyle = '#fff';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(`λ = ${wl} nm  d = ${d.toFixed(2)} μm  L = ${L.toFixed(1)} m`, 14, 8);
      ctx.fillText(`Δy = λL/d = ${(deltaY * 1000).toFixed(3)} mm`, 14, 26);
      ctx.fillText('建設性：d sinθ = nλ  破壞性：d sinθ = (n+½)λ', 14, 44);

      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const deltaY = ((wl * 1e-9) * L) / (d * 1e-6) * 1000;

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">🔬 雙狹縫干涉模擬器</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 380 }} className="rounded-lg bg-zinc-950" />
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          λ 波長：
          <input type="range" min="400" max="700" step="5" value={wl}
            onChange={e => setWl(parseInt(e.target.value))} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{wl} nm</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          d 狹縫間距：
          <input type="range" min="0.1" max="1.5" step="0.05" value={d}
            onChange={e => setD(parseFloat(e.target.value))} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{d.toFixed(2)} μm</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          L 螢幕距離：
          <input type="range" min="0.5" max="4" step="0.1" value={L}
            onChange={e => setL(parseFloat(e.target.value))} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{L.toFixed(1)} m</span>
        </label>
      </div>
      <p className="mt-2 text-xs text-zinc-400">
        Δy = λL/d = {deltaY.toFixed(3)} mm ｜ 條紋間距公式：Δy = λL/d
      </p>
    </div>
  );
}
