'use client';

import { useEffect, useRef, useState } from 'react';

export default function LensRayTracer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [f, setF] = useState(120);
  const [u, setU] = useState(200);
  const [h, setH] = useState(60);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;

    ctx.clearRect(0, 0, W, H);
    const cx = W * 0.45; // lens at 45% from left

    // Optical axis
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 4]);
    ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();
    ctx.setLineDash([]);

    // Lens
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, 20); ctx.lineTo(cx, H - 20);
    ctx.stroke();
    // Lens arrows (convex indicator)
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, 30); ctx.lineTo(cx - 20, 25); ctx.lineTo(cx, 20);
    ctx.moveTo(cx, H - 30); ctx.lineTo(cx - 20, H - 25); ctx.lineTo(cx, H - 20);
    ctx.stroke();

    // Focal points
    const fPx = f;
    const F1 = cx - fPx;
    const F2 = cx + fPx;
    const F1x2 = cx - 2 * fPx;
    const F2x2 = cx + 2 * fPx;

    // Draw F and 2F
    ctx.fillStyle = '#ef4444';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    [F1, F2].forEach((fx, i) => {
      ctx.fillRect(fx - 2, H / 2 - 2, 4, 4);
      ctx.fillStyle = '#ef4444';
      ctx.fillText(i === 0 ? 'F₁' : 'F₂', fx, H / 2 + 6);
    });
    [F1x2, F2x2].forEach((fx, i) => {
      ctx.fillRect(fx - 2, H / 2 - 2, 4, 4);
      ctx.fillStyle = '#888';
      ctx.fillText(i === 0 ? '2F₁' : '2F₂', fx, H / 2 + 6);
    });

    // Object position
    const objX = cx - u;
    const objTop = H / 2 - h;
    const objBot = H / 2;

    // Calculate image
    let v = 0, m = 0, imgX = 0, imgH = 0;
    if (Math.abs(u - f) > 1) {
      v = (u * f) / (u - f);
      m = -v / u;
      imgX = cx + v;
      imgH = m * h;
    }

    // Clipping for drawing
    const imgTop = H / 2 - imgH;

    // Object (blue)
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(objX - 3, objTop, 6, objBot - objTop);
    ctx.fillStyle = '#3b82f6';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('物體', objX, objTop - 4);

    // Arrow on object
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(objX, objTop); ctx.lineTo(objX - 6, objTop + 8); ctx.lineTo(objX + 6, objTop + 8);
    ctx.fill();

    // --- Ray tracing ---
    const rayStyle = (idx: number, color: string, dash: number[]) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.setLineDash(dash);
      ctx.beginPath();
      return ctx;
    };

    // Ray 1: Parallel to axis → through F2
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(objX, objTop);
    ctx.lineTo(cx, objTop);
    // After lens: through F2
    const r1Slope = (H / 2 - objTop) / (F2 - cx);
    const r1EndX = Math.min(W, cx + Math.max(2 * fPx, fPx * 1.5));
    const r1EndY = objTop + r1Slope * (r1EndX - cx);
    ctx.lineTo(r1EndX, r1EndY);
    ctx.stroke();

    // Ray 2: Through lens center → straight
    ctx.strokeStyle = '#10b981';
    ctx.beginPath();
    ctx.moveTo(objX, objTop);
    ctx.lineTo(cx, H / 2);
    const r2Slope = (H / 2 - objTop) / (cx - objX);
    const r2EndX = Math.min(W, cx + fPx * 1.8);
    const r2EndY = H / 2 - r2Slope * (r2EndX - cx);
    ctx.lineTo(r2EndX, r2EndY);
    ctx.stroke();

    // Ray 3: Through F1 → parallel after lens
    ctx.strokeStyle = '#8b5cf6';
    ctx.beginPath();
    ctx.moveTo(objX, objTop);
    ctx.lineTo(F1, objTop);
    // After lens: parallel
    const r3EndX = Math.min(W, cx + fPx * 1.8);
    ctx.lineTo(r3EndX, objTop);
    ctx.stroke();

    // Draw image
    if (v > 0 && imgH !== 0) {
      // Real image
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(imgX - 3, Math.min(objTop, imgTop), 6, Math.abs(imgH));
      ctx.fillStyle = '#ef4444';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = imgH > 0 ? 'bottom' : 'top';
      ctx.fillText('實像', imgX, (imgH > 0 ? imgTop : H / 2) + (imgH > 0 ? -4 : 4));
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(imgX, imgTop);
      ctx.lineTo(imgX - 6, imgTop + 8 * (imgH > 0 ? -1 : 1));
      ctx.lineTo(imgX + 6, imgTop + 8 * (imgH > 0 ? -1 : 1));
      ctx.fill();
    } else if (v < 0 && imgH !== 0 && Math.abs(u - f) > 1) {
      // Virtual image (dashed)
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(imgX - 3, Math.min(H/2, H/2 - imgH), 6, Math.abs(imgH));
      ctx.setLineDash([]);
      ctx.fillStyle = '#ef4444';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = imgH > 0 ? 'bottom' : 'top';
      ctx.fillText('虛像', imgX, (imgH > 0 ? H/2 - imgH : H/2) + (imgH > 0 ? -4 : 4));
    }

    // Info panel
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(10, 10, 220, 100);
    ctx.fillStyle = '#fff';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    let infoY = 16;
    ctx.fillText(`f = ${f} px | u = ${u} px | h = ${h} px`, 16, infoY); infoY += 18;
    if (Math.abs(u - f) > 0.1) {
      ctx.fillText(`v = ${v.toFixed(1)} px | m = ${m.toFixed(2)}`, 16, infoY); infoY += 18;
      ctx.fillText(`像高 h' = ${(m * h).toFixed(1)} px`, 16, infoY); infoY += 18;
      ctx.fillText(`成像：${v > 0 ? '實像' : '虛像'} ${m > 0 ? '正立' : '倒立'} ${Math.abs(m) > 1 ? '放大' : '縮小'}`,
        16, infoY);
    } else {
      ctx.fillText('u = f，不成像（平行光射出）', 16, infoY);
    }

  }, [f, u, h]);

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">🔬 凸透鏡光路追跡模擬器</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 340 }}
        className="rounded-lg bg-zinc-900 dark:bg-zinc-950"
        width={800} height={680} />
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="text-sm text-zinc-600 dark:text-zinc-300">
          焦距 f：
          <input type="range" min="40" max="200" step="5" value={f}
            onChange={e => setF(parseInt(e.target.value))} className="ml-2 w-full" />
          <span className="font-semibold text-blue-500">{f} px</span>
        </label>
        <label className="text-sm text-zinc-600 dark:text-zinc-300">
          物距 u：
          <input type="range" min="10" max="400" step="5" value={u}
            onChange={e => setU(parseInt(e.target.value))} className="ml-2 w-full" />
          <span className="font-semibold text-blue-500">{u} px</span>
        </label>
        <label className="text-sm text-zinc-600 dark:text-zinc-300">
          物高 h：
          <input type="range" min="10" max="150" step="5" value={h}
            onChange={e => setH(parseInt(e.target.value))} className="ml-2 w-full" />
          <span className="font-semibold text-blue-500">{h} px</span>
        </label>
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-500">
        <span className="flex items-center gap-1"><span className="h-2 w-4 rounded bg-amber-400" /> 平行軸光線</span>
        <span className="flex items-center gap-1"><span className="h-2 w-4 rounded bg-emerald-400" /> 通過中心光線</span>
        <span className="flex items-center gap-1"><span className="h-2 w-4 rounded bg-violet-400" /> 通過焦點光線</span>
      </div>
    </div>
  );
}
