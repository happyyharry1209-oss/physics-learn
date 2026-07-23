'use client';

import { useEffect, useRef, useState } from 'react';

export default function QuantumWellSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nState, setNState] = useState(1);
  const [mode, setMode] = useState<'both'|'psi'|'prob'>('both');
  const phaseRef = useRef(0);
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = 800;
    canvas.height = 440;

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, 800, 440);
      phaseRef.current += 0.04;
      const W = 800, H = 440;
      const pad = { l: 50, r: 30, t: 20, b: 30 };
      const gw = W - pad.l - pad.r, gh = H - pad.t - pad.b;

      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.strokeRect(pad.l, pad.t, gw, gh);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText('x', pad.l + gw / 2, pad.t + gh + 6);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText('ψ', pad.l - 6, pad.t + gh / 3);
      ctx.fillText('|ψ|²', pad.l - 10, pad.t + 2 * gh / 3);
      ctx.fillStyle = '#64748b';
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('x=0', pad.l, pad.t + gh + 16);
      ctx.fillText('x=a', pad.l + gw, pad.t + gh + 16);

      function getPsi(x: number, t: number): number {
        if (nState === 1) return Math.sin(Math.PI * x) * Math.cos(t);
        if (nState === 2) return Math.sin(2 * Math.PI * x) * Math.cos(2 * t);
        if (nState === 3) return Math.sin(3 * Math.PI * x) * Math.cos(3 * t);
        if (nState === 4) return Math.sin(4 * Math.PI * x) * Math.cos(4 * t);
        if (nState === 5) return Math.sin(5 * Math.PI * x) * Math.cos(5 * t);
        if (nState === 6) return (Math.sin(Math.PI * x) * Math.cos(t) + Math.sin(2 * Math.PI * x) * Math.cos(2 * t)) / Math.sqrt(2);
        if (nState === 7) return (Math.sin(Math.PI * x) * Math.cos(t) + Math.sin(3 * Math.PI * x) * Math.cos(3 * t)) / Math.sqrt(2);
        return Math.sin(Math.PI * x) * Math.cos(t);
      }

      const phase = phaseRef.current;
      const showPsi = mode === 'both' || mode === 'psi';
      const showProb = mode === 'both' || mode === 'prob';

      if (showPsi) {
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let i = 0; i <= 200; i++) {
          const x = i / 200;
          const val = getPsi(x, phase);
          const xx = pad.l + x * gw;
          const yy = pad.t + gh / 3 - (val / 1.5) * (gh / 3) + gh / 6;
          if (i === 0) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy);
        }
        ctx.stroke();
      }

      if (showProb) {
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let i = 0; i <= 200; i++) {
          const x = i / 200;
          const val = getPsi(x, phase);
          const prob = val * val * 1.8;
          const xx = pad.l + x * gw;
          const yy = pad.t + gh - Math.min(prob * (gh / 3), gh - 4) - 4;
          if (i === 0) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy);
        }
        ctx.stroke();
      }

      if (showPsi) {
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(pad.l + 8, pad.t + 8, 12, 12);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '13px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText('ψ(x,t)', pad.l + 24, pad.t + 8);
      }
      if (showProb) {
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(pad.l + (showPsi ? 68 : 8), pad.t + 8, 12, 12);
        ctx.fillText('|ψ(x,t)|²', pad.l + (showPsi ? 84 : 24), pad.t + 8);
      }

      const label = nState <= 5 ? `n=${nState}` : nState === 6 ? 'n=1 + n=2' : 'n=1 + n=3';
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(pad.l + gw - 130, pad.t + gh - 24, 122, 20);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label + '  |  Eₙ∝n²', pad.l + gw - 69, pad.t + gh - 14);

      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [nState, mode]);

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">🔬 無限深位能井模擬器</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 290 }} className="rounded-lg bg-zinc-950" />
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          能階 / 疊加態：
          <select value={nState} onChange={e => setNState(parseInt(e.target.value))}
            className="ml-2 rounded border border-zinc-300 bg-white px-2 py-1 text-xs dark:border-zinc-600 dark:bg-zinc-700 dark:text-white">
            <option value={1}>n=1（基態）</option>
            <option value={2}>n=2</option>
            <option value={3}>n=3</option>
            <option value={4}>n=4</option>
            <option value={5}>n=5</option>
            <option value={6}>n=1 + n=2（疊加態）</option>
            <option value={7}>n=1 + n=3（疊加態）</option>
          </select>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          顯示模式：
          <select value={mode} onChange={e => setMode(e.target.value as any)}
            className="ml-2 rounded border border-zinc-300 bg-white px-2 py-1 text-xs dark:border-zinc-600 dark:bg-zinc-700 dark:text-white">
            <option value="both">波函數 + 機率密度</option>
            <option value="psi">僅波函數 ψ</option>
            <option value="prob">僅機率密度 |ψ|²</option>
          </select>
        </label>
      </div>
      <p className="mt-2 text-xs text-zinc-400">
        ψ<sub>n</sub>(x) = √(2/a)·sin(nπx/a) ｜ E<sub>n</sub> = n²π²ℏ²/(2ma²) ｜ 疊加態顯示量子干涉效應
      </p>
    </div>
  );
}
