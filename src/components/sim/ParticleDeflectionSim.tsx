'use client';

import { useEffect, useRef, useState } from 'react';

const ME = 9.11e-31;
const QE = 1.6e-19;

export default function ParticleDeflectionSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [voltage, setVoltage] = useState(500);
  const [gap, setGap] = useState(5);
  const [v0, setV0] = useState(2e7);
  const [charge, setCharge] = useState(1);
  const [running, setRunning] = useState(false);
  const runningRef = useRef(false);
  const simRef = useRef({ x: 0, y: 0, vy: 0, t: 0, trail: [] as {x:number;y:number}[], exited: false });
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
    const c2 = canvas.getContext('2d');
    if (!c2) return;
    const W = canvas.width, H = canvas.height;

    function loop() {
      if (!c2) return;
      c2.clearRect(0, 0, W, H);
      const sim = simRef.current;
      const V = voltage, d = gap / 1000, v0_m = v0, q = charge * QE, m = ME;
      const E = V / d;
      const a = q * E / m;

      const plateL = 280, plateT = H / 2 - 60, plateB = H / 2 + 60;
      const plateStartX = 150, plateEndX = plateStartX + plateL;

      // Draw top plate (+)
      c2.fillStyle = '#ef4444';
      c2.fillRect(plateStartX, plateT - 8, plateL, 8);
      c2.fillStyle = '#fff';
      c2.font = '13px sans-serif';
      c2.textAlign = 'center';
      c2.textBaseline = 'bottom';
      c2.fillText('+ + + + +（上板）', plateStartX + plateL / 2, plateT - 10);

      // Draw bottom plate (-)
      c2.fillStyle = '#3b82f6';
      c2.fillRect(plateStartX, plateB, plateL, 8);
      c2.fillStyle = '#fff';
      c2.textBaseline = 'top';
      c2.fillText('− − − − −（下板）', plateStartX + plateL / 2, plateB + 10);

      // E field arrows
      c2.strokeStyle = 'rgba(59,130,246,0.3)';
      c2.lineWidth = 1;
      for (let x = plateStartX + 20; x < plateEndX - 20; x += 30) {
        c2.beginPath();
        c2.moveTo(x, plateT + 4);
        c2.lineTo(x, plateB - 4);
        c2.stroke();
        c2.fillStyle = 'rgba(59,130,246,0.3)';
        c2.beginPath();
        c2.moveTo(x - 3, plateT + 14);
        c2.lineTo(x, plateT + 8);
        c2.lineTo(x + 3, plateT + 14);
        c2.fill();
      }

      // Entrance marker
      c2.fillStyle = '#888';
      c2.font = '13px sans-serif';
      c2.textAlign = 'center';
      c2.fillText('入口', plateStartX, H / 2 + 80);

      // Physics update
      if (runningRef.current && !sim.exited) {
        const dt = 1e-10;
        sim.t += dt;
        if (sim.x < plateL) {
          sim.x += v0_m * dt;
          sim.vy += a * dt * (v0_m > 0 ? 1 : 1);
          sim.y += sim.vy * dt;
          if (sim.y >= (plateB - plateT) / 2 || sim.y <= -(plateB - plateT) / 2) {
            sim.exited = true;
          }
        } else {
          sim.exited = true;
        }
        sim.trail.push({ x: sim.x, y: sim.y });
        if (sim.trail.length > 200) sim.trail.shift();
      }

      // Scale
      const scaleX = (plateEndX - plateStartX) / Math.max(plateL, 1);
      const scaleY = 8; // px per mm deflection

      // Draw trail
      if (sim.trail.length > 1) {
        c2.strokeStyle = '#f59e0b';
        c2.lineWidth = 2;
        c2.beginPath();
        for (let i = 0; i < sim.trail.length; i++) {
          const px = plateStartX + sim.trail[i].x * scaleX;
          const py = H / 2 + sim.trail[i].y * scaleY;
          if (i === 0) c2.moveTo(px, py); else c2.lineTo(px, py);
        }
        c2.stroke();
      }

      // Draw particle
      const px = plateStartX + sim.x * scaleX;
      const py = H / 2 + sim.y * scaleY;
      if (!sim.exited || sim.trail.length > 0) {
        c2.fillStyle = charge > 0 ? '#ef4444' : '#3b82f6';
        c2.shadowColor = charge > 0 ? 'rgba(239,68,68,0.5)' : 'rgba(59,130,246,0.5)';
        c2.shadowBlur = 10;
        c2.beginPath();
        c2.arc(px, py, 11, 0, Math.PI * 2);
        c2.fill();
        c2.shadowBlur = 0;
        c2.fillStyle = '#fff';
        c2.font = 'bold 12px sans-serif';
        c2.textAlign = 'center';
        c2.textBaseline = 'middle';
        c2.fillText(charge > 0 ? '+' : '−', px, py);
      }

      // Info panel
      c2.fillStyle = 'rgba(0,0,0,0.8)';
      c2.fillRect(8, 6, 210, 90);
      c2.fillStyle = '#fff';
      c2.font = '13px sans-serif';
      c2.textAlign = 'left';
      c2.textBaseline = 'top';
      let iy = 10;
      c2.fillText('V = ' + V.toFixed(0) + ' V,  d = ' + gap.toFixed(1) + ' mm', 14, iy); iy += 14;
      c2.fillText('E = V/d = ' + (V / (gap / 1000)).toExponential(2) + ' V/m', 14, iy); iy += 14;
      c2.fillText('a = ' + (a).toExponential(2) + ' m/s²', 14, iy); iy += 14;
      c2.fillText('y = ' + (sim.y * 1000).toFixed(2) + ' mm', 14, iy); iy += 14;
      c2.fillText('t = ' + (sim.t * 1e9).toFixed(2) + ' ns', 14, iy);

      // Exit label
      c2.fillStyle = '#888';
      c2.font = '13px sans-serif';
      c2.textAlign = 'center';
      c2.fillText('出口', plateEndX, H / 2 + 80);

      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [voltage, gap, v0, charge]);

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">⚡ 帶電粒子偏轉模擬器</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 300 }} className="rounded-lg bg-zinc-900 dark:bg-zinc-950" />
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-5">
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          V 電壓：
          <input type="range" min="100" max="2000" step="50" value={voltage}
            onChange={e => { setVoltage(parseInt(e.target.value)); resetSim(); }} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{voltage} V</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          d 板距：
          <input type="range" min="2" max="20" step="0.5" value={gap}
            onChange={e => { setGap(parseFloat(e.target.value)); resetSim(); }} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{gap.toFixed(1)} mm</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          v₀ 初速：
          <input type="range" min="0.5e7" max="5e7" step="0.1e7" value={v0}
            onChange={e => { setV0(parseFloat(e.target.value)); resetSim(); }} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{(v0 / 1e7).toFixed(1)}e7 m/s</span>
        </label>
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <button onClick={() => setCharge(1)}
              className={'px-2 py-1 text-xs rounded ' + (charge > 0 ? 'bg-red-500 text-white' : 'bg-zinc-200 text-zinc-600')}>
              + 正電
            </button>
            <button onClick={() => setCharge(-1)}
              className={'px-2 py-1 text-xs rounded ' + (charge < 0 ? 'bg-blue-500 text-white' : 'bg-zinc-200 text-zinc-600')}>
              − 負電
            </button>
          </div>
          <div className="flex gap-1">
            <button onClick={() => setRunning(!running)}
              className="rounded bg-blue-500 px-3 py-1 text-xs font-medium text-white hover:bg-blue-600">
              {running ? '⏸' : '▶'}
            </button>
            <button onClick={resetSim}
              className="rounded border border-zinc-300 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300">
              ↺
            </button>
          </div>
        </div>
      </div>
      <p className="mt-2 text-xs text-zinc-400">
        a = qE/m = qV/(md)，電場 E = V/d 方向向下，正電荷向下偏轉（負電荷向上偏轉）
      </p>
    </div>
  );

  function resetSim() {
    setRunning(false); runningRef.current = false;
    simRef.current = { x: 0, y: 0, vy: 0, t: 0, trail: [], exited: false };
  }
}
