'use client';

import { useEffect, useRef, useState } from 'react';

export default function FeynmanSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [process, setProcess] = useState<'moller'|'beta'>('moller');
  const phaseRef = useRef(0);
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
      phaseRef.current += 0.04;
      const t = phaseRef.current;

      // Time axis
      c2.strokeStyle = '#475569';
      c2.lineWidth = 1;
      c2.setLineDash([4, 4]);
      c2.beginPath();
      c2.moveTo(50, 60); c2.lineTo(50, 440);
      c2.stroke();
      c2.setLineDash([]);
      c2.fillStyle = '#64748b';
      c2.font = '11px sans-serif';
      c2.textAlign = 'center';
      c2.textBaseline = 'bottom';
      c2.fillText('時間 t', 50, 55);
      c2.fillText('→', 50, 450);

      if (process === 'moller') {
        drawMollerScattering(c2, t);
      } else {
        drawBetaDecay(c2, t);
      }

      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [process]);

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">📐 費曼圖模擬器</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 280 }} className="rounded-lg bg-zinc-950" />
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => setProcess('moller')}
          className={'px-4 py-1.5 text-xs rounded-lg font-medium ' + (process === 'moller' ? 'bg-blue-500 text-white' : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300')}>
          e⁻e⁻ → e⁻e⁻ (Møller 散射)
        </button>
        <button onClick={() => setProcess('beta')}
          className={'px-4 py-1.5 text-xs rounded-lg font-medium ' + (process === 'beta' ? 'bg-blue-500 text-white' : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300')}>
          n → p + e⁻ + ν̄ₑ (β 衰變)
        </button>
      </div>
      <p className="mt-2 text-xs text-zinc-400">
        實線 = 費米子 ｜ 波浪線 = 虛玻色子 ｜ 頂點守恆：能量、動量、電荷
      </p>
    </div>
  );
}

function drawMollerScattering(c2: CanvasRenderingContext2D, t: number) {
  const cx = 400, cy = 250;
  // Incoming: e⁻(k) and e⁻(p) from bottom left and bottom right
  // Outgoing: e⁻(k') and e⁻(p') to top left and top right

  // Incoming e⁻ (bottom left → center)
  c2.strokeStyle = '#3b82f6';
  c2.lineWidth = 3;
  c2.beginPath();
  c2.moveTo(130, 420);
  c2.lineTo(cx - 40, cy + 30);
  c2.stroke();
  c2.fillStyle = '#3b82f6';
  c2.font = '12px sans-serif';
  c2.textAlign = 'center';
  c2.textBaseline = 'top';
  c2.fillText('e⁻(k)', 100, 430);

  // Incoming e⁻ (bottom right → center)
  c2.beginPath();
  c2.moveTo(670, 420);
  c2.lineTo(cx + 40, cy + 30);
  c2.stroke();
  c2.fillText('e⁻(p)', 700, 430);

  // Outgoing e⁻ (center → top left)
  c2.beginPath();
  c2.moveTo(cx - 40, cy - 30);
  c2.lineTo(130, 80);
  c2.stroke();
  c2.fillText('e⁻(k\')', 100, 70);

  // Outgoing e⁻ (center → top right)
  c2.beginPath();
  c2.moveTo(cx + 40, cy - 30);
  c2.lineTo(670, 80);
  c2.stroke();
  c2.fillText('e⁻(p\')', 700, 70);

  // Virtual photon (wavy line)
  c2.strokeStyle = '#f59e0b';
  c2.lineWidth = 2.5;
  c2.beginPath();
  const wavAmp = 10;
  for (let i = 0; i <= 60; i++) {
    const frac = i / 60;
    const xx = cx - 40 + frac * 80;
    const yy = cy + 30 - frac * 60 + wavAmp * Math.sin(frac * 4 * Math.PI + t * 2);
    if (i === 0) c2.moveTo(xx, yy); else c2.lineTo(xx, yy);
  }
  c2.stroke();

  // Photon label
  c2.fillStyle = '#f59e0b';
  c2.font = '11px sans-serif';
  c2.textAlign = 'left';
  c2.textBaseline = 'bottom';
  c2.fillText('γ (虛光子)', cx + 10, cy - 5);

  // Vertex dots
  c2.fillStyle = '#fff';
  c2.beginPath();
  c2.arc(cx - 40, cy + 30, 7, 0, Math.PI * 2);
  c2.fill();
  c2.beginPath();
  c2.arc(cx + 40, cy + 30, 7, 0, Math.PI * 2);
  c2.fill();

  // Title
  c2.fillStyle = '#94a3b8';
  c2.font = '12px sans-serif';
  c2.textAlign = 'center';
  c2.textBaseline = 'bottom';
  c2.fillText('e⁻(k) + e⁻(p) → e⁻(k\') + e⁻(p\')  (Møller 散射)', cx, 470);
}

function drawBetaDecay(c2: CanvasRenderingContext2D, t: number) {
  // n → p + W⁻ → p + e⁻ + ν̄ₑ
  const cx = 400, cy = 250;

  // Incoming neutron (bottom left)
  c2.strokeStyle = '#3b82f6';
  c2.lineWidth = 3;
  c2.beginPath();
  c2.moveTo(120, 400);
  c2.lineTo(cx - 50, cy + 20);
  c2.stroke();
  c2.fillStyle = '#3b82f6';
  c2.font = '12px sans-serif';
  c2.textAlign = 'center';
  c2.textBaseline = 'top';
  c2.fillText('n (d)', 90, 410);

  // Outgoing proton (top)
  c2.strokeStyle = '#3b82f6';
  c2.lineWidth = 3;
  c2.beginPath();
  c2.moveTo(cx - 50, cy - 20);
  c2.lineTo(200, 100);
  c2.stroke();
  c2.fillStyle = '#3b82f6';
  c2.fillText('p (u)', 180, 90);

  // Outgoing e⁻ (top right)
  c2.strokeStyle = '#3b82f6';
  c2.lineWidth = 3;
  c2.beginPath();
  c2.moveTo(cx + 50, cy - 20);
  c2.lineTo(550, 100);
  c2.stroke();
  c2.fillStyle = '#3b82f6';
  c2.fillText('e⁻', 560, 90);

  // Outgoing ν̄ₑ (right)
  c2.strokeStyle = '#3b82f6';
  c2.lineWidth = 3;
  c2.beginPath();
  c2.moveTo(cx + 50, cy + 20);
  c2.lineTo(650, 350);
  c2.stroke();
  c2.fillStyle = '#3b82f6';
  c2.fillText('ν̄ₑ', 660, 340);

  // W boson (wavy, decays)
  c2.strokeStyle = '#ef4444';
  c2.lineWidth = 2.5;
  c2.beginPath();
  for (let i = 0; i <= 40; i++) {
    const frac = i / 40;
    const xx = cx - 30 + frac * 80;
    const yy = cy + 10 - frac * 40 + 6 * Math.sin(frac * 3 * Math.PI + t * 2);
    if (i === 0) c2.moveTo(xx, yy); else c2.lineTo(xx, yy);
  }
  c2.stroke();

  c2.fillStyle = '#ef4444';
  c2.font = '11px sans-serif';
  c2.textAlign = 'center';
  c2.textBaseline = 'bottom';
  c2.fillText('W⁻ (虛)', cx, cy - 35);

  // Vertex dots
  c2.fillStyle = '#fff';
  c2.beginPath();
  c2.arc(cx - 50, cy + 20, 7, 0, Math.PI * 2);
  c2.fill();
  c2.beginPath();
  c2.arc(cx + 50, cy - 20, 7, 0, Math.PI * 2);
  c2.fill();
  c2.beginPath();
  c2.arc(cx + 50, cy + 20, 7, 0, Math.PI * 2);
  c2.fill();

  // Title
  c2.fillStyle = '#94a3b8';
  c2.font = '12px sans-serif';
  c2.textAlign = 'center';
  c2.textBaseline = 'bottom';
  c2.fillText('n(d) → p(u) + W⁻ → p(u) + e⁻ + ν̄ₑ  (β 衰變)', cx, 470);
}
