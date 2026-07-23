'use client';

import { useEffect, useRef, useState } from 'react';

const A0 = 20; // Bohr radius in pixels
const E1 = -13.6;
const HC = 1240; // h*c in eV·nm

function transitionWavelength(ni: number, nf: number): number {
  const dE = E1 * (1 / (nf * nf) - 1 / (ni * ni));
  return dE > 0 ? HC / dE : 0;
}

function energyToColor(wl: number): string {
  if (wl > 700) return '#ff0000';
  if (wl > 620) return '#ff4400';
  if (wl > 550) return '#ffaa00';
  if (wl > 490) return '#00ff88';
  if (wl > 440) return '#00bbff';
  if (wl > 380) return '#4444ff';
  return '#8800ff';
}

export default function BohrSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ni, setNi] = useState(3);
  const [nf, setNf] = useState(2);
  const [animating, setAnimating] = useState(false);
  const [activeN, setActiveN] = useState(3);
  const animRef = useRef(0);
  const progressRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = 800;
    canvas.height = 600;

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, 800, 600);

      const cx = 200, cy = 280;
      const maxN = 5;
      const colors = ['#ff0000', '#ff8800', '#00cc00', '#0088ff', '#8800ff'];

      // Draw orbits
      for (let n = 1; n <= maxN; n++) {
        const r = A0 * n * n;
        ctx.strokeStyle = n === activeN ? colors[n - 1] : '#555';
        ctx.lineWidth = n === activeN ? 2 : 1;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#888';
        ctx.font = '13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`n=${n}`, cx + r + 16, cy);
      }

      // Nucleus
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = 'rgba(239,68,68,0.5)';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('+', cx, cy);

      // Electron position
      const activeR = A0 * activeN * activeN;
      const angle = performance.now() / 800;
      const ex = cx + activeR * Math.cos(angle);
      const ey = cy + activeR * Math.sin(angle);

      ctx.fillStyle = '#3b82f6';
      ctx.shadowColor = 'rgba(59,130,246,0.6)';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(ex, ey, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Animation
      if (animating) {
        progressRef.current += 0.015;
        if (progressRef.current >= 1) {
          progressRef.current = 1;
          setAnimating(false);
        }
      }

      // Energy level diagram (right side)
      const edx = 420, edy = 60, edw = 160, edh = 360;
      const levelH = edh / maxN;

      ctx.strokeStyle = '#444';
      ctx.lineWidth = 1;
      ctx.strokeRect(edx, edy, edw, edh);

      ctx.fillStyle = '#aaa';
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText('能階圖', edx + edw / 2, edy - 4);

      for (let n = 1; n <= maxN; n++) {
        const yPos = edy + edh - (E1 / (n * n)) / (-E1) * edh;
        const isActive = n === activeN;
        ctx.strokeStyle = isActive ? colors[n - 1] : '#666';
        ctx.lineWidth = isActive ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(edx, yPos);
        ctx.lineTo(edx + edw, yPos);
        ctx.stroke();

        ctx.fillStyle = isActive ? colors[n - 1] : '#999';
        ctx.font = isActive ? 'bold 13px sans-serif' : '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(`n=${n}  ${(E1 / (n * n)).toFixed(1)} eV`, edx + 6, yPos - (n === maxN ? 6 : 0));
      }

      // Transition arrow
      if (ni !== nf && activeN === ni) {
        const yI = edy + edh - (E1 / (ni * ni)) / (-E1) * edh;
        const yF = edy + edh - (E1 / (nf * nf)) / (-E1) * edh;
        const isEmit = nf < ni;
        const dir = isEmit ? -1 : 1;

        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(edx + edw + 8, yI);
        ctx.lineTo(edx + edw + 8, yF);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(edx + edw + 8 + 4 * dir, yF - 6 * dir);
        ctx.lineTo(edx + edw + 8, yF);
        ctx.lineTo(edx + edw + 8 - 4 * dir, yF - 6 * dir);
        ctx.fill();
      }

      // Photon emission info
      if (ni !== nf) {
        const wl = transitionWavelength(ni, nf);
        const dE = Math.abs(E1 * (1 / (nf * nf) - 1 / (ni * ni)));
        const photonColor = energyToColor(wl);

        // Draw photon wave
        if (nf < ni) {
          ctx.strokeStyle = photonColor;
          ctx.lineWidth = 2;
          ctx.beginPath();
          const wx = edx + edw + 20, wy = edy + edh / 2;
          for (let i = 0; i <= 40; i++) {
            const xx = wx + i * 2.5;
            const yy = wy + 20 * Math.sin(i * 0.5 + performance.now() / 300);
            if (i === 0) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy);
          }
          ctx.stroke();
        }

        ctx.fillStyle = '#fff';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(`ΔE = ${dE.toFixed(2)} eV`, edx + edw + 14, edy + edh / 2 + 30);
        ctx.fillText(`λ = ${wl.toFixed(1)} nm`, edx + edw + 14, edy + edh / 2 + 46);
        ctx.fillStyle = photonColor;
        ctx.fillText(wl > 700 ? '🔴 紅光' :
                     wl > 620 ? '🟠 橙光' :
                     wl > 550 ? '🟡 黃光' :
                     wl > 490 ? '🟢 綠光' :
                     wl > 440 ? '🔵 藍光' :
                     wl > 380 ? '🟣 紫光' : '⚡ 紫外線', edx + edw + 14, edy + edh / 2 + 62);
      }

      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [ni, nf, activeN, animating]);

  function performTransition() {
    if (ni === nf) return;
    setAnimating(true);
    progressRef.current = 0;
    setActiveN(nf);
  }

  function resetSim() {
    setAnimating(false);
    progressRef.current = 0;
    setActiveN(ni);
  }

  const wl = ni !== nf ? transitionWavelength(ni, nf) : 0;
  const dE = ni !== nf ? Math.abs(E1 * (1 / (nf * nf) - 1 / (ni * ni))) : 0;

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">⚛ 波耳氫原子模型模擬器</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 320 }} className="rounded-lg bg-zinc-950" />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          初始能階 n<sub>i</sub>：
          <select value={ni} onChange={e => { setNi(parseInt(e.target.value)); setActiveN(parseInt(e.target.value)); }}
            className="ml-1 rounded border border-zinc-300 bg-white px-2 py-1 text-xs dark:border-zinc-600 dark:bg-zinc-700 dark:text-white">
            {[1,2,3,4,5].map(n => <option key={n} value={n} disabled={n===nf}>n={n}</option>)}
          </select>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          目標能階 n<sub>f</sub>：
          <select value={nf} onChange={e => setNf(parseInt(e.target.value))}
            className="ml-1 rounded border border-zinc-300 bg-white px-2 py-1 text-xs dark:border-zinc-600 dark:bg-zinc-700 dark:text-white">
            {[1,2,3,4,5].map(n => <option key={n} value={n} disabled={n===ni}>n={n}</option>)}
          </select>
        </label>
        <button onClick={performTransition} disabled={animating || ni === nf}
          className="rounded-lg bg-blue-500 px-4 py-1.5 text-xs font-medium text-white hover:bg-blue-600 disabled:opacity-40">
          躍遷！
        </button>
        <button onClick={resetSim}
          className="rounded-lg border border-zinc-300 px-4 py-1.5 text-xs text-zinc-600 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300">
          ↺ 重置
        </button>
        {ni !== nf && (
          <span className="text-xs text-zinc-400">
            ΔE = {dE.toFixed(2)} eV ｜ λ = {wl.toFixed(1)} nm
            {nf < ni && ` ｜ ${nf === 1 ? '來曼系' : nf === 2 ? '巴耳末系' : '帕申系'}`}
          </span>
        )}
      </div>
      <p className="mt-2 text-xs text-zinc-400">
        E<sub>n</sub> = -13.6/n² eV ｜ r<sub>n</sub> = n²·a₀ ｜ 光子能量 ΔE = hc/λ
      </p>
    </div>
  );
}
