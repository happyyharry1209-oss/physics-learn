'use client';

import { useEffect, useRef, useState } from 'react';

export default function InclinedPlaneSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [theta, setTheta] = useState(20);
  const [mass, setMass] = useState(2);
  const [muS, setMuS] = useState(0.4);
  const [muK, setMuK] = useState(0.25);
  const [running, setRunning] = useState(false);
  const runningRef = useRef(false);
  const simRef = useRef({ x: 0, v: 0, sliding: false, startTime: 0 });
  const animRef = useRef(0);

  useEffect(() => { runningRef.current = running; }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0) return;
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    const W = canvas.width, H = canvas.height;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      const pad = 40;
      const originX = pad + 40;
      const originY = H - pad - 20;
      const len = 300;

      const thetaRad = theta * Math.PI / 180;
      const g = 9.8;
      const m = mass;
      const sim = simRef.current;

      // Draw inclined plane
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 2;
      const endX = originX + len * Math.cos(thetaRad);
      const endY = originY - len * Math.sin(thetaRad);
      ctx.beginPath();
      ctx.moveTo(originX - 20, originY);
      ctx.lineTo(endX, endY);
      ctx.lineTo(endX + 40, endY);
      ctx.stroke();

      // Angle arc
      ctx.strokeStyle = '#888';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(originX, originY, 30, -thetaRad, 0);
      ctx.stroke();
      ctx.fillStyle = '#aaa';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('θ=' + theta + '°', originX + 42, originY - 10);

      // Block position on plane
      const blockSize = 36;
      const slideDist = sim.sliding ? Math.min(sim.x, len - 60) : 0;
      const bx = originX + (60 + slideDist) * Math.cos(thetaRad);
      const by = originY - (60 + slideDist) * Math.sin(thetaRad);

      // Draw block
      const grad = ctx.createLinearGradient(bx - blockSize / 2, by - blockSize / 2, bx + blockSize / 2, by + blockSize / 2);
      grad.addColorStop(0, '#f59e0b');
      grad.addColorStop(1, '#d97706');
      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(0,0,0,0.2)';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      // Rotated block on inclined plane
      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(-thetaRad);
      ctx.fillRect(-blockSize / 2, -blockSize / 2, blockSize, blockSize * 0.6);
      ctx.restore();
      ctx.shadowBlur = 0;

      // Update physics
      if (runningRef.current) {
        const critTan = Math.tan(thetaRad);
        const fMax = muS * m * g * Math.cos(thetaRad);
        const downForce = m * g * Math.sin(thetaRad);

        if (!sim.sliding) {
          if (downForce > fMax) {
            sim.sliding = true;
            sim.startTime = performance.now();
          }
        }

        if (sim.sliding && slideDist < len - 60) {
          const dt = 0.02;
          const a = g * (Math.sin(thetaRad) - muK * Math.cos(thetaRad));
          sim.v += a * dt;
          sim.x += sim.v * dt;
        }
      }

      // Force vectors (FBD)
      const scale = 1.8;
      const fx = bx, fy = by - blockSize / 2 - 20;

      // mg (gravity, straight down)
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      const mgLen = m * g * scale;
      ctx.lineTo(fx, fy + mgLen);
      ctx.stroke();
      ctx.fillStyle = '#ef4444';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('mg', fx + 20, fy + mgLen / 2);

      // N (normal, perpendicular to plane)
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      const nLen = m * g * Math.cos(thetaRad) * scale;
      const nX = fx - nLen * Math.sin(thetaRad);
      const nY = fy - nLen * Math.cos(thetaRad);
      ctx.lineTo(nX, nY);
      ctx.stroke();
      ctx.fillStyle = '#10b981';
      ctx.fillText('N', nX - 18, nY);

      // mg sinθ (downhill component)
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      const dLen = m * g * Math.sin(thetaRad) * scale;
      const dX = fx + dLen * Math.cos(thetaRad);
      const dY = fy + dLen * Math.sin(thetaRad);
      ctx.moveTo(fx, fy + mgLen);
      ctx.lineTo(fx + mgLen * Math.tan(thetaRad) * 0.5, fy + mgLen);
      ctx.stroke();
      ctx.setLineDash([]);

      // Friction (along plane, opposite to motion)
      if (sim.sliding) {
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        const fLen = muK * m * g * Math.cos(thetaRad) * scale;
        const fX = fx - fLen * Math.cos(thetaRad);
        const fY = fy - fLen * Math.sin(thetaRad);
        ctx.lineTo(fX, fY);
        ctx.stroke();
        ctx.fillStyle = '#8b5cf6';
        ctx.fillText('f_k', fX - 18, fY);
      } else {
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        const fLen = m * g * Math.sin(thetaRad) * scale;
        const fX = fx - fLen * Math.cos(thetaRad);
        const fY = fy - fLen * Math.sin(thetaRad);
        ctx.lineTo(fX, fY);
        ctx.stroke();
        ctx.fillStyle = '#8b5cf6';
        ctx.fillText('f_s', fX - 18, fY);
      }

      // Info panel
      ctx.fillStyle = 'rgba(0,0,0,0.75)';
      ctx.fillRect(W - 220, 8, 212, 110);
      ctx.fillStyle = '#fff';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      let iy = 12;
      const crit = Math.atan(muS) * 180 / Math.PI;
      ctx.fillText('μ_s = ' + muS.toFixed(2) + '  μ_k = ' + muK.toFixed(2), W - 214, iy); iy += 16;
      ctx.fillText('臨界角 θ_c = arctan(μ_s) = ' + crit.toFixed(1) + '°', W - 214, iy); iy += 16;
      if (sim.sliding) {
        const a = g * (Math.sin(thetaRad) - muK * Math.cos(thetaRad));
        ctx.fillText('⚠ 滑動中！a = ' + a.toFixed(2) + ' m/s²', W - 214, iy); iy += 16;
        ctx.fillText('v = ' + sim.v.toFixed(2) + ' m/s', W - 214, iy); iy += 16;
      } else {
        const downForce = m * g * Math.sin(thetaRad);
        const fMax = muS * m * g * Math.cos(thetaRad);
        if (downForce <= fMax) {
          ctx.fillText('✓ 靜態平衡 (f_s = mg sinθ)', W - 214, iy); iy += 16;
          ctx.fillText('下滑力 ' + downForce.toFixed(1) + ' N ≤ ' + fMax.toFixed(1) + ' N', W - 214, iy);
        } else {
          ctx.fillText('⚠ 即將滑動！下滑力 > 最大靜摩擦', W - 214, iy); iy += 16;
          ctx.fillText(downForce.toFixed(1) + ' > ' + fMax.toFixed(1) + ' N', W - 214, iy);
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [theta, mass, muS, muK]);

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">🧱 斜面下滑與摩擦力模擬器</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 320 }} className="rounded-lg bg-zinc-900 dark:bg-zinc-950" />
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-5">
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          θ 傾角：
          <input type="range" min="0" max="60" step="1" value={theta}
            onChange={e => { setTheta(parseInt(e.target.value)); resetSim(); }} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{theta}°</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          m 質量：
          <input type="range" min="0.5" max="10" step="0.5" value={mass}
            onChange={e => setMass(parseFloat(e.target.value))} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{mass.toFixed(1)} kg</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          μ<sub>s</sub>：
          <input type="range" min="0" max="1" step="0.05" value={muS}
            onChange={e => setMuS(parseFloat(e.target.value))} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{muS.toFixed(2)}</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          μ<sub>k</sub>：
          <input type="range" min="0" max="1" step="0.05" value={muK}
            onChange={e => setMuK(parseFloat(e.target.value))} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{muK.toFixed(2)}</span>
        </label>
        <div className="flex items-end gap-1">
          <button onClick={() => setRunning(!running)}
            className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600">
            {running ? '⏸' : '▶'}
          </button>
          <button onClick={resetSim}
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs text-zinc-600 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300">
            ↺
          </button>
        </div>
      </div>
      <p className="mt-2 text-xs text-zinc-400">
        當 tanθ ≤ μ<sub>s</sub> 時物體靜止，tanθ {'>'} μ<sub>s</sub> 時下滑。
        臨界角 θ<sub>c</sub> = arctan({muS.toFixed(2)}) ≈ {(Math.atan(muS) * 180 / Math.PI).toFixed(1)}°
      </p>
    </div>
  );

  function resetSim() {
    setRunning(false);
    runningRef.current = false;
    simRef.current = { x: 0, v: 0, sliding: false, startTime: 0 };
  }
}
