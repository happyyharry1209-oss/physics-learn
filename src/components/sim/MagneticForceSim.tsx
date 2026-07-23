'use client';

import { useEffect, useRef, useState } from 'react';

export default function MagneticForceSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [B, setB] = useState(0.5);
  const [I, setI] = useState(3);
  const [theta, setTheta] = useState(90);
  const [animPhase, setAnimPhase] = useState(0);
  const animRef = useRef(0);
  const phaseRef = useRef(0);
  const runningRef = useRef(false);
  const [running, setRunning] = useState(false);

  useEffect(() => { runningRef.current = running; }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Draw U-shaped magnet
    const cx = W / 2, cy = H / 2;
    const magnetW = 60, magnetH = 120, gap = 100;

    // N pole (left)
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(cx - gap / 2 - magnetW, cy - magnetH / 2, magnetW, magnetH);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('N', cx - gap / 2 - magnetW / 2, cy);

    // S pole (right)
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(cx + gap / 2, cy - magnetH / 2, magnetW, magnetH);
    ctx.fillStyle = '#fff';
    ctx.fillText('S', cx + gap / 2 + magnetW / 2, cy);

    // Magnetic field arrows (B field from N to S)
    const thetaRad = (theta * Math.PI) / 180;
    const F = B * I * 1 * Math.sin(thetaRad); // scale for display

    // B field lines
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 3]);
    for (let i = -3; i <= 3; i++) {
      const yy = cy + i * 12;
      ctx.beginPath();
      ctx.moveTo(cx - gap / 2, yy);
      ctx.lineTo(cx + gap / 2, yy);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // B label
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('B', cx + gap / 2 + 30, cy - 40);

    // Wire position (animated)
    let wireX = cx;
    if (runningRef.current) {
      phaseRef.current += 0.02;
      setAnimPhase(phaseRef.current);
    }
    const amp = F * 18;
    const dispX = amp * Math.sin(phaseRef.current * 3);

    // Wire
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(wireX + dispX, cy - 80);
    ctx.lineTo(wireX + dispX, cy + 80);
    ctx.stroke();

    // Wire circle
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(wireX + dispX, cy, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('I', wireX + dispX, cy);

    // Force arrow
    if (F > 0.01) {
      const arrowLen = Math.min(F * 60, 100);

      // Force vector (upward for θ=90°)
      const fAngle = -Math.PI / 2;
      const fEndX = wireX + dispX + arrowLen * Math.cos(fAngle);
      const fEndY = cy + arrowLen * Math.sin(fAngle);

      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(wireX + dispX, cy);
      ctx.lineTo(fEndX, fEndY);
      ctx.stroke();

      // Arrowhead
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(fEndX, fEndY);
      ctx.lineTo(fEndX - 8, fEndY + 14);
      ctx.lineTo(fEndX + 8, fEndY + 14);
      ctx.fill();

      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText('F = ' + F.toFixed(2) + ' N', fEndX + 10, fEndY + 4);
    }

    // Current arrow on wire
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(wireX + dispX - 4, cy - 70);
    ctx.lineTo(wireX + dispX, cy - 80);
    ctx.lineTo(wireX + dispX + 4, cy - 70);
    ctx.stroke();

    // I label
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('I = ' + I.toFixed(1) + ' A', wireX + dispX, cy - 92);

    // Info panel
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(10, 10, 200, 90);
    ctx.fillStyle = '#fff';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    let iy = 14;
    ctx.fillText('B = ' + B.toFixed(2) + ' T', 16, iy); iy += 18;
    ctx.fillText('I = ' + I.toFixed(1) + ' A,  θ = ' + theta + '°', 16, iy); iy += 18;
    ctx.fillText('F = BIL sinθ = ' + F.toFixed(3) + ' N', 16, iy); iy += 18;
    ctx.fillText('方向：' + (theta === 0 ? '無受力' : '向上'), 16, iy);

    animRef.current = requestAnimationFrame(draw.bind(null));
  }, [B, I, theta, animPhase]);

  // Dummy draw function for the rAF loop
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Trigger re-render via state
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.clientWidth * 2;
    canvas.height = canvas.clientHeight * 2;
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">🧲 安培力動態模擬器</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 300 }} className="rounded-lg bg-zinc-900 dark:bg-zinc-950" />
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="text-sm text-zinc-600 dark:text-zinc-300">
          B 磁場強度：
          <input type="range" min="0" max="1.5" step="0.05" value={B}
            onChange={e => setB(parseFloat(e.target.value))} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{B.toFixed(2)} T</span>
        </label>
        <label className="text-sm text-zinc-600 dark:text-zinc-300">
          I 電流大小：
          <input type="range" min="0" max="5" step="0.1" value={I}
            onChange={e => setI(parseFloat(e.target.value))} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{I.toFixed(1)} A</span>
        </label>
        <label className="text-sm text-zinc-600 dark:text-zinc-300">
          θ 夾角：
          <input type="range" min="0" max="90" step="5" value={theta}
            onChange={e => setTheta(parseInt(e.target.value))} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{theta}°</span>
        </label>
        <div className="flex items-end gap-2">
          <button onClick={() => { setRunning(!running); }}
            className="rounded-lg bg-blue-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-600">
            {running ? '⏸' : '▶'}
          </button>
          <button onClick={() => { setRunning(false); phaseRef.current = 0; setAnimPhase(0); }}
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300">
            ↺
          </button>
        </div>
      </div>
      <p className="mt-2 text-xs text-zinc-400">
        {theta === 0 ? 'θ = 0°，F = 0，導線不受力' :
         theta === 90 ? 'θ = 90°，F = BIL（最大），導線向上運動' :
        `θ = ${theta}°，F = BIL sin${theta}° = ${(B * I * 1 * Math.sin(theta * Math.PI / 180)).toFixed(3)} N`}
      </p>
    </div>
  );
}
