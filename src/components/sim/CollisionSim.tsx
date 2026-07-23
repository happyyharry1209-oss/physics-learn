'use client';

import { useEffect, useRef, useState } from 'react';

export default function CollisionSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [m1, setM1] = useState(2);
  const [v1, setV1] = useState(3);
  const [m2, setM2] = useState(1);
  const [v2, setV2] = useState(0);
  const [elastic, setElastic] = useState(true);
  const [running, setRunning] = useState(false);
  const runningRef = useRef(false);
  const simRef = useRef({
    x1: 150, x2: 350, v1: 3, v2: 0, m1: 2, m2: 1,
    collided: false, postCollision: false, t: 0, done: false,
    v1f: 0, v2f: 0
  });
  const animRef = useRef(0);

  useEffect(() => { runningRef.current = running; }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0) return;
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      const sim = simRef.current;

      // Track
      ctx.fillStyle = '#444';
      ctx.fillRect(40, H/2 + 20, W - 80, 6);

      // Update
      if (runningRef.current && !sim.done) {
        const dt = 2;
        if (!sim.collided) {
          sim.x1 += sim.v1 * dt;
          sim.x2 += sim.v2 * dt;
          if (sim.x1 + 30 >= sim.x2 - 30) {
            sim.collided = true;
            sim.postCollision = true;
            const e = elastic ? 1 : 0;
            const m1 = sim.m1, m2 = sim.m2;
            const v1i = sim.v1, v2i = sim.v2;
            if (elastic) {
              sim.v1f = ((m1 - m2) / (m1 + m2)) * v1i + (2 * m2 / (m1 + m2)) * v2i;
              sim.v2f = (2 * m1 / (m1 + m2)) * v1i + ((m2 - m1) / (m1 + m2)) * v2i;
            } else {
              const vf = (m1 * v1i + m2 * v2i) / (m1 + m2);
              sim.v1f = sim.v2f = vf;
            }
          }
        } else {
          sim.x1 += sim.v1f * dt;
          sim.x2 += sim.v2f * dt;
          if (sim.x1 > W + 50 || sim.x2 < -50) sim.done = true;
        }
      }

      // Draw ball 1
      const r1 = Math.max(18, 14 + sim.m1 * 3);
      const grad1 = ctx.createRadialGradient(sim.x1 - 5, H/2 - 5, 2, sim.x1, H/2, r1);
      grad1.addColorStop(0, '#60a5fa');
      grad1.addColorStop(1, '#2563eb');
      ctx.fillStyle = grad1;
      ctx.shadowColor = 'rgba(37,99,235,0.4)';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(sim.x1, H/2, r1, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('m₁', sim.x1, H/2);

      // Draw ball 2
      const r2 = Math.max(15, 10 + sim.m2 * 3);
      const grad2 = ctx.createRadialGradient(sim.x2 - 5, H/2 - 5, 2, sim.x2, H/2, r2);
      grad2.addColorStop(0, '#fca5a5');
      grad2.addColorStop(1, '#dc2626');
      ctx.fillStyle = grad2;
      ctx.shadowColor = 'rgba(220,38,38,0.4)';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(sim.x2, H/2, r2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#fff';
      ctx.fillText('m₂', sim.x2, H/2);

      // Velocity labels
      ctx.fillStyle = '#aaa';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      const cv1 = sim.collided ? sim.v1f : sim.v1;
      const cv2 = sim.collided ? sim.v2f : sim.v2;
      ctx.fillText('v₁=' + cv1.toFixed(1) + ' m/s', sim.x1, H/2 - r1 - 6);
      ctx.fillText('v₂=' + cv2.toFixed(1) + ' m/s', sim.x2, H/2 - r2 - 6);

      // Info panel
      ctx.fillStyle = 'rgba(0,0,0,0.75)';
      ctx.fillRect(10, 8, 240, 110);
      ctx.fillStyle = '#fff';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      let iy = 12;
      const pi = sim.m1 * sim.v1 + sim.m2 * sim.v2;
      const pf = sim.collided ? sim.m1 * sim.v1f + sim.m2 * sim.v2f : pi;
      const ki = 0.5 * sim.m1 * sim.v1 * sim.v1 + 0.5 * sim.m2 * sim.v2 * sim.v2;
      const kf = sim.collided ? 0.5 * sim.m1 * sim.v1f * sim.v1f + 0.5 * sim.m2 * sim.v2f * sim.v2f : ki;
      ctx.fillText('m₁=' + sim.m1.toFixed(0) + ' kg  v₁=' + sim.v1.toFixed(1) + ' m/s', 16, iy); iy += 16;
      ctx.fillText('m₂=' + sim.m2.toFixed(0) + ' kg  v₂=' + sim.v2.toFixed(1) + ' m/s', 16, iy); iy += 16;
      ctx.fillText('碰撞前 P=' + pi.toFixed(2) + ' kg·m/s  K=' + ki.toFixed(1) + ' J', 16, iy); iy += 16;
      ctx.fillText('碰撞後 P=' + pf.toFixed(2) + ' kg·m/s  K=' + kf.toFixed(1) + ' J', 16, iy); iy += 16;
      const pLabel = Math.abs(pi - pf) < 0.01 ? '✓ P守恆' : '⚠ P變化';
      const kLabel = Math.abs(ki - kf) < 0.01 && elastic ? '✓ K守恆' : elastic ? '' : '✗ K損失 ' + (ki - kf).toFixed(1) + ' J';
      ctx.fillText(pLabel + '  |  ' + kLabel, 16, iy);

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  function resetSim() {
    setRunning(false);
    runningRef.current = false;
    simRef.current = {
      x1: 150, x2: 350, v1: v1, v2: v2, m1: m1, m2: m2,
      collided: false, postCollision: false, t: 0, done: false,
      v1f: 0, v2f: 0
    };
  }

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">💥 一維碰撞模擬器</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 300 }} className="rounded-lg bg-zinc-900 dark:bg-zinc-950" />
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-5">
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          m₁ 質量：
          <input type="range" min="0.5" max="5" step="0.5" value={m1}
            onChange={e => { setM1(parseFloat(e.target.value)); }} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{m1.toFixed(1)} kg</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          v₁ 初速：
          <input type="range" min="-5" max="5" step="0.5" value={v1}
            onChange={e => { setV1(parseFloat(e.target.value)); }} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{v1.toFixed(1)} m/s</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          m₂ 質量：
          <input type="range" min="0.5" max="5" step="0.5" value={m2}
            onChange={e => { setM2(parseFloat(e.target.value)); }} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{m2.toFixed(1)} kg</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          v₂ 初速：
          <input type="range" min="-5" max="5" step="0.5" value={v2}
            onChange={e => { setV2(parseFloat(e.target.value)); }} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{v2.toFixed(1)} m/s</span>
        </label>
        <div className="flex flex-col gap-1 items-end">
          <div className="flex gap-1">
            <button onClick={() => setElastic(true)}
              className={'px-2 py-1 text-xs rounded ' + (elastic ? 'bg-blue-500 text-white' : 'bg-zinc-200 text-zinc-600')}>
              彈性
            </button>
            <button onClick={() => setElastic(false)}
              className={'px-2 py-1 text-xs rounded ' + (!elastic ? 'bg-orange-500 text-white' : 'bg-zinc-200 text-zinc-600')}>
              非彈性
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
    </div>
  );
}
