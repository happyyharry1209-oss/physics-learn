'use client';

import { useEffect, useRef, useState } from 'react';

export default function CarnotDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [TH, setTH] = useState(600);
  const [TL, setTL] = useState(300);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = canvas.clientWidth * 2;
    canvas.height = canvas.clientHeight * 2;
    const W = canvas.width, H = canvas.height;

    ctx.clearRect(0, 0, W, H);
    const pad = 40;
    const gw = W - pad * 2, gh = H - pad * 2;

    // Axes
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(pad, pad); ctx.lineTo(pad, pad + gh); ctx.lineTo(pad + gw, pad + gh);
    ctx.stroke();

    ctx.fillStyle = '#aaa';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('V', pad + gw, pad + gh + 6);
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText('P', pad - 6, pad);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.font = '11px sans-serif';
    ctx.fillText('0', pad + 2, pad + gh + 2);

    // Thermodynamic parameters
    const nR = 1;
    const V1 = 1, V2 = 3, V3 = 5, V4 = 2.2;
    // Temperatures
    const tH = TH, tL = TL;

    // Calculate P at each point: PV = nRT
    const P1 = nR * tH / V1;
    const P2 = nR * tH / V2;
    const P3 = nR * tL / V3;
    const P4 = nR * tL / V4;

    const maxP = Math.max(P1, P2, P3, P4);
    const scaleX = gw / (Math.max(V1, V2, V3, V4) * 1.3);
    const scaleY = gh / (maxP * 1.3);

    function toCanvas(v: number, p: number) {
      return [pad + v * scaleX, pad + gh - p * scaleY];
    }

    // Draw isotherms
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1;
    // TH isotherm
    ctx.beginPath();
    for (let v = 0.3; v <= 6; v += 0.05) {
      const p = nR * tH / v;
      const [x, y] = toCanvas(v, p);
      if (v === 0.3) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = '#f59e0b';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('T_H = ' + TH + ' K', pad + 20, pad + 10);

    // TL isotherm
    ctx.strokeStyle = '#10b981';
    ctx.beginPath();
    for (let v = 0.3; v <= 6; v += 0.05) {
      const p = nR * tL / v;
      const [x, y] = toCanvas(v, p);
      if (v === 0.3) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = '#10b981';
    ctx.fillText('T_L = ' + TL + ' K', pad + 20, pad + 26);

    ctx.setLineDash([]);

    // Carnot cycle: four points
    const p1x = V1 * scaleX + pad, p1y = pad + gh - P1 * scaleY;
    const p2x = V2 * scaleX + pad, p2y = pad + gh - P2 * scaleY;
    const p3x = V3 * scaleX + pad, p3y = pad + gh - P3 * scaleY;
    const p4x = V4 * scaleX + pad, p4y = pad + gh - P4 * scaleY;

    // Draw cycle
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;

    // 1->2 isothermal expansion
    ctx.beginPath();
    for (let v = V1; v <= V2; v += 0.02) {
      const p = nR * tH / v;
      const [x, y] = toCanvas(v, p);
      if (v === V1) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // 2->3 adiabatic expansion
    const gamma = 5/3;
    const C23 = P2 * Math.pow(V2, gamma);
    ctx.strokeStyle = '#8b5cf6';
    ctx.beginPath();
    for (let v = V2; v <= V3; v += 0.02) {
      const p = C23 / Math.pow(v, gamma);
      const [x, y] = toCanvas(v, p);
      if (v === V2) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.setLineDash([6, 4]);
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(p2x, p2y); ctx.lineTo(p2x, p2y - 20); ctx.stroke();
    ctx.fillStyle = '#8b5cf6';
    ctx.font = '13px sans-serif';
    ctx.fillText('絕熱', p2x - 16, p2y - 34);
    ctx.setLineDash([]);

    // 3->4 isothermal compression
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let v = V4; v <= V3; v += 0.02) {
      const p = nR * tL / v;
      const [x, y] = toCanvas(v, p);
      if (v === V4) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // 4->1 adiabatic compression
    const C41 = P4 * Math.pow(V4, gamma);
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let v = V4; v <= V1; v += 0.02) {
      const p = C41 / Math.pow(v, gamma);
      const [x, y] = toCanvas(v, p);
      if (v === V4) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Labels
    const labels = [
      { x: p1x, y: p1y, label: '1', dx: -12, dy: -12 },
      { x: p2x, y: p2y, label: '2', dx: 8, dy: -12 },
      { x: p3x, y: p3y, label: '3', dx: 8, dy: 14 },
      { x: p4x, y: p4y, label: '4', dx: -12, dy: 14 },
    ];
    for (const l of labels) {
      ctx.fillStyle = '#111';
      ctx.beginPath();
      ctx.arc(l.x, l.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(l.label, l.x, l.y);
      ctx.fillStyle = '#222';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText(l.label, l.x + l.dx, l.y + l.dy);
    }

    // Efficiency
    const eta = 1 - TL / TH;
    ctx.fillStyle = '#2563eb';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`η = 1 - T_L/T_H = 1 - ${TL}/${TH} = ${(eta * 100).toFixed(1)}%`, pad + 10, pad + gh - 8);

  }, [TH, TL]);

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">📊 Carnot 循環 P-V 圖</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 320 }} className="rounded-lg bg-zinc-50 dark:bg-zinc-800" />
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <label className="text-sm text-zinc-600 dark:text-zinc-300">
          高溫 T<sub>H</sub>：
          <input type="range" min="400" max="1000" step="10" value={TH}
            onChange={e => setTH(parseInt(e.target.value))} className="ml-2 w-24" />
          <span className="ml-1 font-semibold text-blue-500">{TH} K</span>
        </label>
        <label className="text-sm text-zinc-600 dark:text-zinc-300">
          低溫 T<sub>L</sub>：
          <input type="range" min="200" max="500" step="10" value={TL}
            onChange={e => setTL(parseInt(e.target.value))} className="ml-2 w-24" />
          <span className="ml-1 font-semibold text-blue-500">{TL} K</span>
        </label>
      </div>
      <div className="mt-2 flex flex-wrap gap-3 text-xs text-zinc-500">
        <span className="flex items-center gap-1"><span className="h-2 w-4 rounded bg-blue-500" /> 等溫膨脹 1→2</span>
        <span className="flex items-center gap-1"><span className="h-2 w-4 rounded bg-purple-500" /> 絕熱膨脹 2→3</span>
        <span className="flex items-center gap-1"><span className="h-2 w-4 rounded bg-emerald-500" /> 等溫壓縮 3→4</span>
        <span className="flex items-center gap-1"><span className="h-2 w-4 rounded bg-blue-500" /> 絕熱壓縮 4→1</span>
      </div>
    </div>
  );
}
