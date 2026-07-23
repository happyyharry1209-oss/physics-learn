'use client';

import { useEffect, useRef, useState } from 'react';

export default function RCCircuitSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [V0, setV0] = useState(12);
  const [R, setR] = useState(10);
  const [C, setC] = useState(100);
  const [mode, setMode] = useState<'charge'|'discharge'>('charge');
  const [running, setRunning] = useState(false);
  const runningRef = useRef(false);
  const simRef = useRef({ t: 0, q: 0, history: [] as {t:number;vc:number;i:number}[] });
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
      const Rs = R * 1000;
      const Cs = C * 1e-6;
      const tau = Rs * Cs;
      const Q0 = V0 * Cs;
      const dt = 0.0002;

      if (runningRef.current) {
        sim.t += dt;
        if (mode === 'charge') {
          sim.q = Q0 * (1 - Math.exp(-sim.t / tau));
        } else {
          sim.q = Q0 * Math.exp(-sim.t / tau);
        }
        sim.history.push({ t: sim.t, vc: sim.q / Cs, i: (mode === 'charge' ? (V0 - sim.q/Cs)/Rs : -sim.q/(Cs*Rs)) });
        if (sim.history.length > 300) sim.history.shift();
      }

      const vc = sim.q / Cs;
      const i = (mode === 'charge' ? (V0 - vc) / Rs : -vc / Rs);

      // Draw circuit schematic (left half)
      const cx = W * 0.22, cy = H * 0.4;

      // Battery
      c2.strokeStyle = '#aaa';
      c2.lineWidth = 2;
      c2.beginPath();
      c2.moveTo(cx - 20, cy - 20); c2.lineTo(cx + 20, cy - 20);
      c2.moveTo(cx - 15, cy - 30); c2.lineTo(cx + 15, cy - 30);
      c2.stroke();
      c2.fillStyle = '#aaa';
      c2.font = '13px sans-serif';
      c2.textAlign = 'center';
      c2.fillText(V0.toFixed(0) + ' V', cx, cy - 40);

      // Resistor
      c2.strokeStyle = '#f59e0b';
      c2.lineWidth = 2;
      c2.beginPath();
      c2.moveTo(cx, cy - 10);
      c2.lineTo(cx - 8, cy - 10); c2.lineTo(cx - 4, cy - 22); c2.lineTo(cx + 4, cy + 2);
      c2.lineTo(cx + 8, cy - 10); c2.lineTo(cx, cy - 10);
      c2.stroke();
      c2.fillStyle = '#f59e0b';
      c2.fillText('R=' + R.toFixed(0) + 'k', cx, cy + 16);

      // Capacitor
      c2.strokeStyle = '#3b82f6';
      c2.lineWidth = 2.5;
      const capFrac = vc / V0;
      c2.beginPath();
      c2.moveTo(cx + 40, cy - 12); c2.lineTo(cx + 40, cy + 12);
      c2.moveTo(cx + 55, cy - 12); c2.lineTo(cx + 55, cy + 12);
      c2.stroke();

      // Fill capacitor based on charge
      if (capFrac > 0) {
        c2.fillStyle = `rgba(59,130,246,${capFrac * 0.6})`;
        const fillH = 22 * capFrac;
        c2.fillRect(cx + 41, cy + 12 - fillH, 13, fillH);
      }
      c2.fillStyle = '#3b82f6';
      c2.font = '12px sans-serif';
      c2.textAlign = 'center';
      c2.fillText('C=' + C.toFixed(0) + 'μF', cx + 48, cy + 28);

      // Mode indicator
      c2.fillStyle = mode === 'charge' ? '#10b981' : '#ef4444';
      c2.font = 'bold 11px sans-serif';
      c2.fillText(mode === 'charge' ? '🔵 充電' : '🔴 放電', cx, cy + 50);

      // Graph (right half)
      const gx = W * 0.42, gy = H * 0.05, gw = W * 0.55, gh = H * 0.42;
      const gx2 = W * 0.42, gy2 = H * 0.52, gw2 = W * 0.55, gh2 = H * 0.40;

      // VC(t) graph
      c2.strokeStyle = '#333';
      c2.lineWidth = 1;
      c2.strokeRect(gx, gy, gw, gh);
      c2.fillStyle = '#888';
      c2.font = '12px sans-serif';
      c2.textAlign = 'center';
      c2.fillText('V_C(t)', gx + gw / 2, gy - 4);

      // y-axis labels
      c2.fillStyle = '#666';
      c2.textAlign = 'right';
      c2.textBaseline = 'middle';
      c2.fillText(V0.toFixed(0) + 'V', gx - 4, gy + 2);
      c2.fillText('0', gx - 4, gy + gh);

      // tau marker
      const tauX = gx + Math.min(gw, (tau) / Math.max(sim.t + dt, tau) * gw);
      c2.setLineDash([3, 3]);
      c2.strokeStyle = '#f59e0b';
      c2.lineWidth = 1;
      c2.beginPath();
      c2.moveTo(tauX, gy); c2.lineTo(tauX, gy + gh);
      c2.stroke();
      c2.setLineDash([]);
      c2.fillStyle = '#f59e0b';
      c2.font = '11px sans-serif';
      c2.textAlign = 'center';
      c2.fillText('τ=' + (tau * 1000).toFixed(1) + 'ms', tauX, gy + gh + 10);

      // 63.2% marker for charge
      const targetY = gy + gh - gh * (mode === 'charge' ? 0.632 : 0.368);
      c2.fillStyle = '#888';
      c2.font = '11px sans-serif';
      c2.textAlign = 'left';
      c2.fillText(mode === 'charge' ? '63.2%' : '36.8%', gx + 2, targetY - 2);

      // VC curve
      if (sim.history.length > 1) {
        c2.strokeStyle = '#3b82f6';
        c2.lineWidth = 2;
        c2.beginPath();
        const maxT = Math.max(sim.history[sim.history.length - 1].t, 0.001);
        for (let i = 0; i < sim.history.length; i++) {
          const hx = gx + (sim.history[i].t / maxT) * gw;
          const hy = gy + gh - (sim.history[i].vc / V0) * gh;
          if (i === 0) c2.moveTo(hx, hy); else c2.lineTo(hx, hy);
        }
        c2.stroke();
      }

      // I(t) graph
      c2.strokeStyle = '#333';
      c2.lineWidth = 1;
      c2.strokeRect(gx2, gy2, gw2, gh2);
      c2.fillStyle = '#888';
      c2.font = '12px sans-serif';
      c2.textAlign = 'center';
      c2.fillText('I(t)', gx2 + gw2 / 2, gy2 - 4);

      const Imax = V0 / Rs;
      c2.fillStyle = '#666';
      c2.textAlign = 'right';
      c2.textBaseline = 'middle';
      c2.fillText((Imax * 1000).toFixed(1) + 'mA', gx2 - 4, gy2 + 2);
      c2.fillText('0', gx2 - 4, gy2 + gh2);

      if (sim.history.length > 1) {
        c2.strokeStyle = '#ef4444';
        c2.lineWidth = 2;
        c2.beginPath();
        const maxT2 = Math.max(sim.history[sim.history.length - 1].t, 0.001);
        for (let i = 0; i < sim.history.length; i++) {
          const hx = gx2 + (sim.history[i].t / maxT2) * gw2;
          const curI = sim.history[i].i;
          const hy = gy2 + gh2 / 2 - (curI / Imax) * (gh2 / 2);
          if (i === 0) c2.moveTo(hx, hy); else c2.lineTo(hx, hy);
        }
        c2.stroke();
      }

      // Horizontal line at I=0
      c2.strokeStyle = '#555';
      c2.lineWidth = 0.5;
      c2.beginPath();
      c2.moveTo(gx2, gy2 + gh2 / 2);
      c2.lineTo(gx2 + gw2, gy2 + gh2 / 2);
      c2.stroke();

      // Info
      c2.fillStyle = 'rgba(0,0,0,0.7)';
      c2.fillRect(W - 150, H - 40, 145, 34);
      c2.fillStyle = '#fff';
      c2.font = '13px sans-serif';
      c2.textAlign = 'left';
      c2.textBaseline = 'top';
      c2.fillText('τ = RC = ' + (tau * 1000).toFixed(1) + ' ms', W - 144, H - 36);
      c2.fillText('V_C = ' + (vc).toFixed(2) + ' V  |  I = ' + (i * 1000).toFixed(2) + ' mA', W - 144, H - 20);

      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [V0, R, C, mode]);

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">⚡ RC 電路充放電模擬器</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 360 }} className="rounded-lg bg-zinc-900 dark:bg-zinc-950" />
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-5">
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          V₀ 電壓：
          <input type="range" min="3" max="24" step="1" value={V0}
            onChange={e => { setV0(parseInt(e.target.value)); resetSim(); }} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{V0} V</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          R 電阻：
          <input type="range" min="1" max="100" step="1" value={R}
            onChange={e => { setR(parseInt(e.target.value)); resetSim(); }} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{R} kΩ</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          C 電容：
          <input type="range" min="10" max="1000" step="10" value={C}
            onChange={e => { setC(parseInt(e.target.value)); resetSim(); }} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{C} μF</span>
        </label>
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <button onClick={() => setMode('charge')}
              className={'px-2 py-1 text-xs rounded ' + (mode === 'charge' ? 'bg-emerald-500 text-white' : 'bg-zinc-200 text-zinc-600')}>
              充電
            </button>
            <button onClick={() => setMode('discharge')}
              className={'px-2 py-1 text-xs rounded ' + (mode === 'discharge' ? 'bg-red-500 text-white' : 'bg-zinc-200 text-zinc-600')}>
              放電
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
      <p className="mt-2 text-xs text-zinc-400">τ = RC = {(R * 1000 * C * 1e-6 * 1000).toFixed(1)} ms ｜ 充電 ODE: R·dq/dt + q/C = V₀</p>
    </div>
  );

  function resetSim() {
    setRunning(false); runningRef.current = false;
    simRef.current = { t: 0, q: 0, history: [] };
  }
}
