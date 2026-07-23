'use client';

import { useEffect, useRef, useState } from 'react';

export default function DopplerSimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [vs, setVs] = useState(60);
  const [freq, setFreq] = useState(440);
  const [running, setRunning] = useState(false);
  const runningRef = useRef(false);
  const timeRef = useRef(0);
  const wavefrontsRef = useRef<{cx: number; cy: number; emitTime: number; r: number}[]>([]);
  const sourceXRef = useRef(200);
  const animRef = useRef(0);

  useEffect(() => { runningRef.current = running; }, [running]);
  const speedOfSound = 340;

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Draw scale bar
    ctx.fillStyle = '#555';
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('觀察者 ←', 40, H / 2 - 6);
    ctx.fillText('→ 觀察者', W - 8, H / 2 - 6);

    // Update source position
    const dt = 0.02;
    if (runningRef.current) {
      timeRef.current += dt;
      if (vs > 0) {
        sourceXRef.current += (vs / 340) * 1.5;
        if (sourceXRef.current > W + 80) sourceXRef.current = -80;
      }
    }

    // Emit new wavefront at each period
    const period = 1 / freq;
    const totalTime = timeRef.current;
    if (totalTime > 0) {
      const numWaves = Math.floor(totalTime / period);
      const wf = wavefrontsRef.current;
      while (wf.length < numWaves && wf.length < 50) {
        wf.push({
          cx: sourceXRef.current,
          cy: H / 2,
          emitTime: wf.length * period,
          r: 0
        });
      }
    }

    // Update wavefront radii
    const wf = wavefrontsRef.current;
    for (let i = wf.length - 1; i >= 0; i--) {
      const age = totalTime - wf[i].emitTime;
      wf[i].r = age * (speedOfSound / 30); // scale for canvas
      if (wf[i].r > W * 1.5) {
        wf.splice(i, 1);
      }
    }

    // Draw wavefronts
    const sourceY = H / 2;
    for (const wave of wf) {
      const age = totalTime - wave.emitTime;
      const alpha = Math.max(0.1, 0.6 - age * 0.3);
      ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(wave.cx, sourceY, wave.r, 0, Math.PI * 2);
      ctx.stroke();

      // Mirror on other side
      ctx.beginPath();
      ctx.arc(W - wave.cx, sourceY, wave.r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw source
    const sx = sourceXRef.current;
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = 'rgba(239,68,68,0.5)';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(sx, sourceY, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('S', sx, sourceY);

    // Mirror source
    ctx.fillStyle = '#ef4444';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(W - sx, sourceY, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#fff';
    ctx.fillText('S\'', W - sx, sourceY);

    // Info text
    ctx.fillStyle = '#888';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    const apparentFreq = freq * speedOfSound / (speedOfSound - vs);
    ctx.fillText(`v_s = ${vs} m/s  |  f = ${freq} Hz  |  f' ≈ ${Math.round(apparentFreq)} Hz (前方)`, 10, H - 6);

    // Sonic boom visualization
    if (vs >= speedOfSound) {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      const theta = Math.asin(speedOfSound / Math.max(vs, 1));
      // Mach cone
      ctx.beginPath();
      ctx.moveTo(sx, sourceY);
      ctx.lineTo(sx - 300, sourceY - 300 * Math.tan(theta));
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(sx, sourceY);
      ctx.lineTo(sx - 300, sourceY + 300 * Math.tan(theta));
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('💥 震波 (Sonic Boom)', sx - 150, sourceY - 40);
    }

    animRef.current = requestAnimationFrame(draw);
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
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">🔊 都卜勒效應動態模擬器</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 290 }} className="rounded-lg bg-zinc-50 dark:bg-zinc-800" />
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <label className="text-sm text-zinc-600 dark:text-zinc-300">
          聲源速度 v<sub>s</sub>：
          <input type="range" min="0" max="500" step="5" value={vs}
            onChange={e => setVs(parseInt(e.target.value))} className="ml-2 w-24" />
          <span className="ml-1 font-semibold text-blue-500">{vs} m/s</span>
        </label>
        <label className="text-sm text-zinc-600 dark:text-zinc-300">
          頻率 f：
          <input type="range" min="100" max="1000" step="10" value={freq}
            onChange={e => setFreq(parseInt(e.target.value))} className="ml-2 w-24" />
          <span className="ml-1 font-semibold text-blue-500">{freq} Hz</span>
        </label>
        <button onClick={() => { setRunning(!running); }}
          className="rounded-lg bg-blue-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-600">
          {running ? '⏸ 暫停' : '▶ 播放'}
        </button>
        <button onClick={() => {
          setRunning(false); timeRef.current = 0;
          wavefrontsRef.current = []; sourceXRef.current = 200;
        }} className="rounded-lg border border-zinc-300 px-4 py-1.5 text-sm text-zinc-600 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300">
          ↺ 重置
        </button>
      </div>
      <p className="mt-2 text-xs text-zinc-400">
        聲速 340 m/s ｜ 前方波長壓縮 ∼ {(340 / freq - vs / freq).toFixed(2)} m ｜
        後方波長拉伸 ∼ {(340 / freq + vs / freq).toFixed(2)} m
        {vs >= 340 && <span className="ml-2 font-bold text-red-500">｜ ⚡ 超音速！震波形成</span>}
      </p>
    </div>
  );
}
