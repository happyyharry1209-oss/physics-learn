'use client';

import { useEffect, useRef, useState } from 'react';

export default function ProjectileSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [v0, setV0] = useState(30);
  const [theta, setTheta] = useState(55);
  const [g, setG] = useState(9.8);
  const [running, setRunning] = useState(false);
  const runningRef = useRef(false);
  const simRef = useRef({ t: 0, x: 0, y: 0, vx: 0, vy: 0, trail: [] as {x:number;y:number}[], done: false });
  const animRef = useRef(0);

  useEffect(() => { runningRef.current = running; }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.clientWidth * 2;
    canvas.height = canvas.clientHeight * 2;

    const loop = () => {
      const cvs = canvasRef.current;
      if (!cvs) return;
      const ctx = cvs.getContext('2d');
      if (!ctx) return;
      const W = cvs.width, H = cvs.height;

      ctx.clearRect(0, 0, W, H);

      const pad = { l: 60, r: 20, t: 20, b: 40 };
      const gw = W - pad.l - pad.r, gh = H - pad.t - pad.b;
      const scale = 3.5; // pixels per meter

      const thetaRad = theta * Math.PI / 180;
      const sim = simRef.current;

      if (runningRef.current && !sim.done) {
        sim.t += 0.025;
        sim.x = sim.vx * sim.t;
        sim.y = sim.vy * sim.t - 0.5 * g * sim.t * sim.t;
        sim.trail.push({ x: sim.x, y: sim.y });
        if (sim.y < 0) { sim.done = true; sim.y = 0; }
      }

      // Calculate key params
      const totalT = 2 * v0 * Math.sin(thetaRad) / g;
      const maxH = v0 * v0 * Math.sin(thetaRad) * Math.sin(thetaRad) / (2 * g);
      const range = v0 * v0 * Math.sin(2 * thetaRad) / g;

      // Draw ground
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(pad.l, pad.t + gh);
      ctx.lineTo(pad.l + gw, pad.t + gh);
      ctx.stroke();

      // Draw trail
      if (sim.trail.length > 1) {
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        for (let i = 0; i < sim.trail.length; i++) {
          const px = pad.l + sim.trail[i].x * scale;
          const py = pad.t + gh - sim.trail[i].y * scale;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw projectile
      const cx = pad.l + sim.x * scale;
      const cy = pad.t + gh - sim.y * scale;
      if (sim.y >= 0) {
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = 'rgba(239,68,68,0.5)';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(cx, cy, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Velocity vectors
        const vx = sim.vx;
        const vy = sim.vy - g * sim.t;
        const arrowScale = 1.2;

        function drawArrow(fromX: number, fromY: number, toX: number, toY: number, color: string, width: number) {
          if (!ctx) return;
          ctx.strokeStyle = color;
          ctx.lineWidth = width;
          ctx.beginPath();
          ctx.moveTo(fromX, fromY);
          ctx.lineTo(toX, toY);
          ctx.stroke();
          // Arrowhead
          if (!ctx) return;
          const angle = Math.atan2(toY - fromY, toX - fromX);
          const headLen = 10;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.moveTo(toX, toY);
          ctx.lineTo(toX - headLen * Math.cos(angle - 0.35), toY - headLen * Math.sin(angle - 0.35));
          ctx.lineTo(toX - headLen * Math.cos(angle + 0.35), toY - headLen * Math.sin(angle + 0.35));
          ctx.closePath();
          ctx.fill();
        }

        // vx component (green)
        drawArrow(cx, cy, cx + vx * arrowScale, cy, '#10b981', 3);
        // vy component (orange)
        drawArrow(cx, cy, cx, cy - vy * arrowScale, '#f59e0b', 3);
        // total v (red)
        const vEndX = cx + vx * arrowScale;
        const vEndY = cy - vy * arrowScale;
        drawArrow(cx, cy, vEndX, vEndY, '#ef4444', 3.5);

        // Labels
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillText('v_x', cx + vx * arrowScale + 6, cy - 2);
        ctx.fillStyle = '#f59e0b';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillText('v_y', cx + 6, cy - vy * arrowScale + 2);
        ctx.fillStyle = '#ef4444';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillText('v', vEndX + 6, vEndY + 2);

        // Mark highest point
        if (Math.abs(vy) < 0.5 && sim.t > 0.1) {
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 11px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('v_y = 0（最高點）', cx, cy - 24);
        }
      }

      // Display info
      ctx.fillStyle = 'rgba(0,0,0,0.75)';
      ctx.fillRect(pad.l, 6, 240, 100);
      ctx.fillStyle = '#fff';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      let iy = 10;
      ctx.fillText('v₀ = ' + v0.toFixed(0) + ' m/s  θ = ' + theta + '°  g = ' + g.toFixed(1), pad.l + 6, iy); iy += 16;
      ctx.fillText('T = ' + totalT.toFixed(2) + ' s', pad.l + 6, iy); iy += 16;
      ctx.fillText('H = ' + maxH.toFixed(2) + ' m', pad.l + 6, iy); iy += 16;
      ctx.fillText('R = ' + range.toFixed(2) + ' m', pad.l + 6, iy); iy += 16;
      ctx.fillText('當前 t = ' + sim.t.toFixed(2) + ' s,  (x,y) = (' + sim.x.toFixed(1) + ', ' + Math.max(0, sim.y).toFixed(1) + ')', pad.l + 6, iy);

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [v0, theta, g]);

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">🎯 斜向拋體運動模擬器</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 350 }} className="rounded-lg bg-zinc-900 dark:bg-zinc-950" />
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-5">
        <label className="text-sm text-zinc-600 dark:text-zinc-300">
          v₀ 初速：
          <input type="range" min="5" max="60" step="1" value={v0}
            onChange={e => { setV0(parseInt(e.target.value)); resetSim(); }} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{v0} m/s</span>
        </label>
        <label className="text-sm text-zinc-600 dark:text-zinc-300">
          θ 仰角：
          <input type="range" min="5" max="85" step="1" value={theta}
            onChange={e => { setTheta(parseInt(e.target.value)); resetSim(); }} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{theta}°</span>
        </label>
        <label className="text-sm text-zinc-600 dark:text-zinc-300">
          g 重力：
          <input type="range" min="1.6" max="20" step="0.1" value={g}
            onChange={e => { setG(parseFloat(e.target.value)); resetSim(); }} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{g.toFixed(1)}</span>
        </label>
        <div className="flex items-end gap-2">
          <button onClick={() => { setRunning(!running); }}
            className="rounded-lg bg-blue-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-600">
            {running ? '⏸ 暫停' : '▶ 播放'}
          </button>
          <button onClick={resetSim}
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300">
            ↺ 重置
          </button>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-4 text-xs text-zinc-500">
        <span className="flex items-center gap-1"><span className="h-2 w-4 rounded bg-red-500" /> 速度 v</span>
        <span className="flex items-center gap-1"><span className="h-2 w-4 rounded bg-green-500" /> 水平 v_x</span>
        <span className="flex items-center gap-1"><span className="h-2 w-4 rounded bg-amber-500" /> 豎直 v_y</span>
      </div>
    </div>
  );

  function resetSim() {
    setRunning(false);
    runningRef.current = false;
    const thetaRad = theta * Math.PI / 180;
    simRef.current = {
      t: 0, x: 0, y: 0,
      vx: v0 * Math.cos(thetaRad),
      vy: v0 * Math.sin(thetaRad),
      trail: [],
      done: false
    };
  }
}
