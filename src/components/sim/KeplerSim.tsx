'use client';

import { useEffect, useRef, useState } from 'react';

export default function KeplerSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ecc, setEcc] = useState(0.5);
  const [gm, setGm] = useState(10);
  const [running, setRunning] = useState(false);
  const runningRef = useRef(false);
  const angleRef = useRef(0);
  const areasRef = useRef<{a1:number;a2:number;idx:number}[]>([]);
  const countRef = useRef(0);
  const animRef = useRef(0);

  useEffect(() => { runningRef.current = running; }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 10) return;
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    // Re-get ctx after resize
    const c2 = canvas.getContext('2d');
    if (!c2) return;

    const W = canvas.width, H = canvas.height;
    const cx = W * 0.5, cy = H * 0.5;

    function drawEllipse(ctx2: CanvasRenderingContext2D, cx2: number, cy2: number, a2: number, b2: number) {
      ctx2.beginPath();
      for (let i = 0; i <= 64; i++) {
        const t = (i / 64) * 2 * Math.PI;
        const x = cx2 + a2 * Math.cos(t);
        const y = cy2 + b2 * Math.sin(t);
        if (i === 0) ctx2.moveTo(x, y); else ctx2.lineTo(x, y);
      }
      ctx2.stroke();
    }

    function drawSweepArea(ctx2: CanvasRenderingContext2D, fx: number, fy: number, e: number, a2: number, a1: number, a2_angle: number) {
      const steps = 16;
      ctx2.beginPath();
      ctx2.moveTo(fx, fy);
      for (let i = 0; i <= steps; i++) {
        const t = a1 + (a2_angle - a1) * (i / steps);
        const rr = a2 * (1 - e * e) / (1 + e * Math.cos(t));
        const xx = fx + rr * Math.cos(t);
        const yy = fy + rr * Math.sin(t);
        ctx2.lineTo(xx, yy);
      }
      ctx2.closePath();
      ctx2.fill();
    }

    function loop() {
      if (!c2) return;
      c2.clearRect(0, 0, W, H);
      const simAngle = angleRef.current;
      const e = ecc;
      const a2 = Math.min(W, H) * 0.35;
      const b2 = a2 * Math.sqrt(1 - e * e);
      const focusDist = a2 * e;
      const fx = cx - focusDist;
      const fy = cy;

      // Update physics
      if (runningRef.current) {
        const r = a2 * (1 - e * e) / (1 + e * Math.cos(simAngle));
        const angSpeed = 2.0 / (r * r);
        const dt = 0.016;
        angleRef.current += angSpeed * dt * 30;
        if (angleRef.current > 2 * Math.PI) {
          angleRef.current -= 2 * Math.PI;
          areasRef.current = [];
        }
        countRef.current++;
        if (countRef.current % 10 === 0) {
          const areas = areasRef.current;
          areas.push({ a1: simAngle - 0.05, a2: simAngle + 0.05, idx: areas.length });
          if (areas.length > 15) areas.shift();
        }
      }

      // Orbit (point-based ellipse for compatibility)
      c2.strokeStyle = '#555';
      c2.lineWidth = 2;
      drawEllipse(c2, cx, cy, a2, b2);

      // Sun at focus
      c2.fillStyle = '#f59e0b';
      c2.shadowColor = 'rgba(245,158,11,0.5)';
      c2.shadowBlur = 12;
      c2.beginPath();
      c2.arc(fx, fy, 12, 0, Math.PI * 2);
      c2.fill();
      c2.shadowBlur = 0;
      c2.fillStyle = '#ccc';
      c2.font = '13px sans-serif';
      c2.textAlign = 'center';
      c2.textBaseline = 'top';
      c2.fillText('太陽', fx, fy + 12);

      // Sweep areas
      for (const area of areasRef.current) {
        const alpha = 0.12 + 0.04 * (area.idx % 4);
        c2.fillStyle = `rgba(59,130,246,${alpha})`;
        drawSweepArea(c2, fx, fy, e, a2, area.a1, area.a2);
      }

      // Planet position
      const planetAngle = angleRef.current;
      const r = a2 * (1 - e * e) / (1 + e * Math.cos(planetAngle));
      const px = fx + r * Math.cos(planetAngle);
      const py = fy + r * Math.sin(planetAngle);

      c2.fillStyle = '#3b82f6';
      c2.shadowColor = 'rgba(59,130,246,0.5)';
      c2.shadowBlur = 10;
      c2.beginPath();
      c2.arc(px, py, 13, 0, Math.PI * 2);
      c2.fill();
      c2.shadowBlur = 0;

      // Labels
      c2.fillStyle = '#888';
      c2.font = '13px sans-serif';
      c2.textAlign = 'center';
      c2.textBaseline = 'top';
      const peri = a2 * (1 - e);
      const aph = a2 * (1 + e);
      c2.fillText('近日點', fx - peri, cy + 6);
      c2.fillText('遠日點', fx + aph, cy + 6);

      // Info
      c2.fillStyle = 'rgba(0,0,0,0.7)';
      c2.fillRect(8, 6, 190, 64);
      c2.fillStyle = '#fff';
      c2.font = '11px sans-serif';
      c2.textAlign = 'left';
      c2.textBaseline = 'top';
      c2.fillText('偏心率 e = ' + e.toFixed(2), 14, 10);
      c2.fillText('近日距 = ' + peri.toFixed(0) + ' px', 14, 26);
      c2.fillText('遠日距 = ' + aph.toFixed(0) + ' px', 14, 42);
      c2.fillStyle = '#60a5fa';
      c2.fillRect(W - 130, 10, 10, 10);
      c2.fillStyle = '#aaa';
      c2.font = '12px sans-serif';
      c2.fillText('等時掃掠面積', W - 116, 12);

      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [ecc, gm]);

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">🪐 克卜勒橢圓軌道模擬器</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 380 }} className="rounded-lg bg-zinc-900 dark:bg-zinc-950" />
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-4">
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          偏心率 e：
          <input type="range" min="0" max="0.7" step="0.02" value={ecc}
            onChange={e => setEcc(parseFloat(e.target.value))} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{ecc.toFixed(2)}</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          GM（引力強度）：
          <input type="range" min="5" max="20" step="1" value={gm}
            onChange={e => setGm(parseInt(e.target.value))} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{gm.toFixed(0)}</span>
        </label>
        <div className="flex items-end gap-1">
          <button onClick={() => setRunning(!running)}
            className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600">
            {running ? '⏸ 暫停' : '▶ 播放'}
          </button>
          <button onClick={() => {
            setRunning(false); runningRef.current = false;
            angleRef.current = 0; areasRef.current = []; countRef.current = 0;
          }} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs text-zinc-600 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300">
            ↺ 重置
          </button>
        </div>
      </div>
      <p className="mt-2 text-xs text-zinc-400">
        e=0 為正圓，e{'>'}0 為橢圓。近日點加速、遠日點減速，半透明區域面積相等 = 角動量守恆
      </p>
    </div>
  );
}
