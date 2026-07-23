'use client';

import { useEffect, useRef, useState } from 'react';

const aV = 15.5, aS = 16.8, aC = 0.72, aA = 23;

function semiEmpiricalBinding(A: number, Z: number): number {
  if (A <= 0) return 0;
  const delta = (A % 2 === 0 && Z % 2 === 0) ? 12 / Math.sqrt(A) :
                (A % 2 === 0 && Z % 2 === 1) ? -12 / Math.sqrt(A) : 0;
  const volume = aV * A;
  const surface = -aS * Math.pow(A, 2/3);
  const coulomb = -aC * Z * (Z - 1) / Math.pow(A, 1/3);
  const symmetry = -aA * (A - 2*Z) * (A - 2*Z) / A;
  return (volume + surface + coulomb + symmetry + delta) / A;
}

export default function BindingEnergySim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [Z, setZ] = useState(26);
  const [A, setA] = useState(56);
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = 800;
    canvas.height = 460;
    const c2 = canvas.getContext('2d');
    if (!c2) return;

    function loop() {
      if (!c2) return;
      c2.clearRect(0, 0, 800, 460);
      const pad = { l: 60, r: 30, t: 30, b: 40 };
      const gw = 800 - pad.l - pad.r, gh = 460 - pad.t - pad.b;

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
      c2.fillText('質量數 A', pad.l + gw / 2, pad.t + gh + 8);
      c2.textAlign = 'right';
      c2.textBaseline = 'middle';
      c2.fillText('E_b/A (MeV)', pad.l - 6, pad.t + gh / 2);

      // Draw binding energy curve for stable isotopes
      c2.strokeStyle = '#3b82f6';
      c2.lineWidth = 2.5;
      c2.beginPath();
      const maxBE = 9;
      for (let A2 = 1; A2 <= 250; A2++) {
        const Z2 = Math.round(A2 / (2 + 0.0075 * Math.pow(A2, 2/3))); // approx stable Z
        const be = semiEmpiricalBinding(A2, Z2);
        if (be <= 0) continue;
        const xx = pad.l + (A2 / 250) * gw;
        const yy = pad.t + gh - (be / maxBE) * gh;
        if (A2 === 1) c2.moveTo(xx, yy); else c2.lineTo(xx, yy);
      }
      c2.stroke();

      // Mark Fe-56 peak
      const feA = 56, feZ = 26;
      const feBE = semiEmpiricalBinding(feA, feZ);
      const feX = pad.l + (feA / 250) * gw;
      const feY = pad.t + gh - (feBE / maxBE) * gh;
      c2.fillStyle = '#f59e0b';
      c2.shadowColor = 'rgba(245,158,11,0.4)';
      c2.shadowBlur = 8;
      c2.beginPath();
      c2.arc(feX, feY, 9, 0, Math.PI * 2);
      c2.fill();
      c2.shadowBlur = 0;
      c2.fillStyle = '#f59e0b';
      c2.font = '11px sans-serif';
      c2.textAlign = 'center';
      c2.textBaseline = 'bottom';
      c2.fillText('⁵⁶Fe (8.8 MeV)', feX, feY - 8);

      // Mark fission & fusion regions
      c2.fillStyle = 'rgba(239,68,68,0.12)';
      c2.fillRect(pad.l + (190/250)*gw, pad.t, pad.l + gw - (pad.l + (190/250)*gw), gh);
      c2.fillStyle = 'rgba(59,130,246,0.12)';
      c2.fillRect(pad.l, pad.t, pad.l + (60/250)*gw - pad.l, gh);
      c2.fillStyle = '#ef4444';
      c2.font = '13px sans-serif';
      c2.textAlign = 'center';
      c2.textBaseline = 'top';
      c2.fillText('← 融合 (Fusion)', pad.l + (50/250)*gw, pad.t + gh - 16);
      c2.fillStyle = '#ef4444';
      c2.fillText('分裂 (Fission) →', pad.l + (220/250)*gw, pad.t + gh - 16);

      // Current position
      if (A >= 1 && A <= 250) {
        const currentBE = semiEmpiricalBinding(A, Z);
        const cx = pad.l + (A / 250) * gw;
        const cy = pad.t + gh - (currentBE / maxBE) * gh;
        c2.fillStyle = '#ef4444';
        c2.shadowBlur = 10;
        c2.shadowColor = 'rgba(239,68,68,0.5)';
        c2.beginPath();
        c2.arc(cx, cy, 8, 0, Math.PI * 2);
        c2.fill();
        c2.shadowBlur = 0;
        c2.fillStyle = '#fff';
        c2.font = '11px sans-serif';
        c2.textAlign = 'left';
        c2.textBaseline = 'bottom';
        c2.fillText('A=' + A + ' Z=' + Z + '  E_b/A=' + currentBE.toFixed(2) + ' MeV', cx + 8, cy + 2);
      }

      // Y-axis labels
      c2.fillStyle = '#64748b';
      c2.font = '13px sans-serif';
      c2.textAlign = 'right';
      c2.textBaseline = 'middle';
      for (let i = 0; i <= 4; i++) {
        const val = (i / 4) * maxBE;
        const yy = pad.t + gh - (val / maxBE) * gh;
        c2.fillText(val.toFixed(1), pad.l - 6, yy);
      }

      // Info
      c2.fillStyle = 'rgba(0,0,0,0.75)';
      c2.fillRect(pad.l + gw - 200, pad.t + 4, 194, 70);
      c2.fillStyle = '#fff';
      c2.font = '11px sans-serif';
      c2.textAlign = 'left';
      c2.textBaseline = 'top';
      c2.fillText('液滴模型 Binding Energy (SEMF)', pad.l + gw - 194, pad.t + 8);
      c2.fillText('⁵⁶Fe 為最穩定原子核 (8.8 MeV)', pad.l + gw - 194, pad.t + 26);
      c2.fillText('重核分裂、輕核融合皆可釋能', pad.l + gw - 194, pad.t + 44);

      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [Z, A]);

  const currentBE = A >= 1 ? semiEmpiricalBinding(A, Z) : 0;

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">📊 原子核結合能曲線模擬器 (Bethe-Weizsäcker)</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 260 }} className="rounded-lg bg-zinc-950" />
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          質量數 A：
          <input type="range" min="1" max="250" step="1" value={A}
            onChange={e => setA(parseInt(e.target.value))} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{A}</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          原子序 Z：
          <input type="range" min="1" max="100" step="1" value={Z}
            onChange={e => setZ(parseInt(e.target.value))} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{Z}</span>
        </label>
      </div>
      <p className="mt-2 text-xs text-zinc-400">
        E<sub>b</sub>/A = {currentBE.toFixed(2)} MeV ｜ ⁵⁶Fe 頂峰 ≈ 8.8 MeV ｜ A {'<'} 56 融合釋能 ｜ A {'>'} 56 分裂釋能
      </p>
    </div>
  );
}
