'use client';

import { useEffect, useRef, useState } from 'react';

export default function FaradaySim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [speed, setSpeed] = useState(2);
  const [turns, setTurns] = useState(100);
  const [action, setAction] = useState<'stop'|'push'|'pull'>('stop');
  const magnetPosRef = useRef(260);
  const animRef = useRef(0);

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
      const cx = W / 2, cy = H / 2;
      const coilLeft = cx - 30, coilRight = cx + 30;
      const magnetCenter = magnetPosRef.current;

      // Update magnet position
      const dt = 0.02;
      if (action === 'push') {
        magnetPosRef.current = Math.min(cx + 140, magnetPosRef.current + speed * 30 * dt);
      } else if (action === 'pull') {
        magnetPosRef.current = Math.max(30, magnetPosRef.current - speed * 30 * dt);
      }

      const mPos = magnetPosRef.current;
      const inCoil = mPos > coilLeft && mPos < coilRight;
      const distance = mPos - cx;

      // Magnetic flux (simulated by distance)
      const fluxBase = 1 / (1 + Math.pow(distance / 40, 2));
      const prevFlux = fluxBase; // simplified

      // Draw coil
      c2.strokeStyle = '#f59e0b';
      c2.lineWidth = 3;
      c2.beginPath();
      c2.moveTo(coilLeft - 10, cy - 50);
      c2.lineTo(coilLeft - 10, cy + 50);
      c2.lineTo(coilRight + 10, cy + 50);
      c2.lineTo(coilRight + 10, cy - 50);
      c2.closePath();
      c2.stroke();
      // Coil loops indicator
      c2.fillStyle = '#f59e0b';
      c2.font = '13px sans-serif';
      c2.textAlign = 'center';
      c2.fillText('N=' + turns + ' 匝', cx, cy + 68);

      // Galvanometer
      const gx = coilRight + 80, gy = cy;
      c2.strokeStyle = '#aaa';
      c2.lineWidth = 2;
      c2.beginPath();
      c2.arc(gx, gy, 36, 0, Math.PI * 2);
      c2.stroke();

      // Needle deflection based on motion
      let deflection = 0;
      if (action === 'push') deflection = -Math.min(80, speed * 15);
      else if (action === 'pull') deflection = Math.min(80, speed * 15);
      else deflection = 0;

      c2.strokeStyle = '#ef4444';
      c2.lineWidth = 2;
      c2.beginPath();
      c2.moveTo(gx, gy);
      const needleAngle = -Math.PI / 2 + deflection * Math.PI / 180;
      c2.lineTo(gx + 22 * Math.cos(needleAngle), gy + 22 * Math.sin(needleAngle));
      c2.stroke();

      c2.fillStyle = '#aaa';
      c2.font = '11px sans-serif';
      c2.textAlign = 'center';
      c2.fillText('G', gx, gy + 4);
      c2.fillText('←  感應電流  →', gx, gy + 42);

      // Draw induced current arrows on coil
      if (action === 'push' || action === 'pull') {
        const dir = action === 'push' ? 1 : -1;
        c2.strokeStyle = '#3b82f6';
        c2.lineWidth = 2;
        c2.beginPath();
        c2.arc(cx, cy, 48, -Math.PI / 2 + dir * 0.5, -Math.PI / 2 + dir * 1.5);
        c2.stroke();
        // Arrowhead
        const tipAngle = -Math.PI / 2 + dir * 1.5;
        c2.fillStyle = '#3b82f6';
        c2.beginPath();
        const tipX = cx + 38 * Math.cos(tipAngle);
        const tipY = cy + 38 * Math.sin(tipAngle);
        c2.moveTo(tipX, tipY);
        c2.lineTo(tipX - 8 * Math.cos(tipAngle - dir * 0.5), tipY - 8 * Math.sin(tipAngle - dir * 0.5));
        c2.lineTo(tipX - 8 * Math.cos(tipAngle + dir * 0.5), tipY - 8 * Math.sin(tipAngle + dir * 0.5));
        c2.fill();
      }

      // Draw magnet
      const magH = 50, magW = 24;
      // N pole
      c2.fillStyle = '#ef4444';
      c2.fillRect(mPos, cy - magH / 2, magW / 2, magH);
      // S pole
      c2.fillStyle = '#3b82f6';
      c2.fillRect(mPos + magW / 2, cy - magH / 2, magW / 2, magH);
      c2.fillStyle = '#fff';
      c2.font = 'bold 11px sans-serif';
      c2.textAlign = 'center';
      c2.textBaseline = 'middle';
      c2.fillText('N', mPos + magW / 4, cy);
      c2.fillText('S', mPos + 3 * magW / 4, cy);

      // B field lines (exaggerated)
      for (let i = -2; i <= 2; i++) {
        const yy = cy + i * 10;
        c2.strokeStyle = `rgba(100,100,255,${0.3 - Math.abs(i) * 0.05})`;
        c2.lineWidth = 1;
        c2.setLineDash([4, 4]);
        c2.beginPath();
        c2.moveTo(mPos + magW, yy);
        c2.lineTo(mPos + (distance > 0 ? 1 : -1) * 60, yy);
        c2.stroke();
      }
      c2.setLineDash([]);

      // Flux density visualization on coil
      const flux = 1 / (1 + Math.pow(distance / 30, 2));
      if (flux > 0.05) {
        c2.fillStyle = `rgba(59,130,246,${flux * 0.3})`;
        c2.fillRect(coilLeft + 5, cy - 45, 50, 90);
      }

      // Info panel
      c2.fillStyle = 'rgba(0,0,0,0.75)';
      c2.fillRect(8, 6, 215, 80);
      c2.fillStyle = '#fff';
      c2.font = '13px sans-serif';
      c2.textAlign = 'left';
      c2.textBaseline = 'top';
      let iy = 10;
      c2.fillText('v = ' + speed.toFixed(0) + ' m/s  |  N = ' + turns + ' 匝', 14, iy); iy += 14;
      const emf = speed * turns * 0.01 * (Math.abs(distance) < 60 ? 1 : 0);
      c2.fillText('狀態：' + (action === 'stop' ? '靜止 (ε=0)' : action === 'push' ? '推入線圈' : '拉出線圈'), 14, iy); iy += 14;
      c2.fillText('偏轉角：' + Math.abs(deflection).toFixed(0) + '°', 14, iy); iy += 14;
      c2.fillText('感應電動勢 ε ∝ N·v·(dΦ/dt)', 14, iy);

      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [speed, turns, action]);

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">🧲 法拉第電磁感應模擬器</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 290 }} className="rounded-lg bg-zinc-900 dark:bg-zinc-950" />
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-4">
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          磁棒速度 v：
          <input type="range" min="0.5" max="5" step="0.5" value={speed}
            onChange={e => setSpeed(parseFloat(e.target.value))} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{speed.toFixed(1)} m/s</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          線圈匝數 N：
          <input type="range" min="20" max="500" step="10" value={turns}
            onChange={e => setTurns(parseInt(e.target.value))} className="ml-1 w-full" />
          <span className="font-semibold text-blue-500">{turns}</span>
        </label>
        <div className="flex items-end gap-1">
          <button onClick={() => setAction('push')}
            className={'px-3 py-1.5 text-xs rounded-lg font-medium ' + (action === 'push' ? 'bg-blue-500 text-white' : 'bg-zinc-200 text-zinc-600')}>
            ➡ 推入
          </button>
          <button onClick={() => setAction('pull')}
            className={'px-3 py-1.5 text-xs rounded-lg font-medium ' + (action === 'pull' ? 'bg-blue-500 text-white' : 'bg-zinc-200 text-zinc-600')}>
            ⬅ 拉出
          </button>
          <button onClick={() => setAction('stop')}
            className={'px-3 py-1.5 text-xs rounded-lg font-medium ' + (action === 'stop' ? 'bg-red-500 text-white' : 'bg-zinc-200 text-zinc-600')}>
            ⏹ 停止
          </button>
        </div>
      </div>
      <p className="mt-2 text-xs text-zinc-400">ε = -N·dΦ<sub>B</sub>/dt ｜ 檢流計偏轉正比於 N·v ｜ 冷次定律：感應電流抵抗磁通量變化</p>
    </div>
  );
}
