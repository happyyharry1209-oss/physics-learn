'use client';

import { useEffect, useRef, useState } from 'react';

export default function BuoyancySimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const graphRef = useRef<HTMLCanvasElement>(null);
  const [rhoLiquid, setRhoLiquid] = useState(1.0);
  const [rhoObject, setRhoObject] = useState(0.6);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const animRef = useRef<number>(0);
  const historyRef = useRef<{t: number; y: number}[]>([]);

  const rhoLiquidRef = useRef(rhoLiquid);
  const rhoObjectRef = useRef(rhoObject);
  const runningRef = useRef(false);
  const timeRef = useRef(0);

  useEffect(() => { rhoLiquidRef.current = rhoLiquid; }, [rhoLiquid]);
  useEffect(() => { rhoObjectRef.current = rhoObject; }, [rhoObject]);
  useEffect(() => { runningRef.current = running; }, [running]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    const rL = rhoLiquidRef.current;
    const rO = rhoObjectRef.current;
    const dt = 0.03;

    // Update physics
    if (runningRef.current) {
      timeRef.current += dt;
      const t = timeRef.current;
      setTime(t);

      // Determine submerged ratio
      const ratio = Math.min(1, rO / rL);
      let yTarget: number;
      if (rO >= rL) {
        // sinks to bottom
        yTarget = H - 60;
      } else {
        // floats - submerged portion
        const totalHeight = 80;
        const subHeight = totalHeight * ratio;
        yTarget = H - 40 - subHeight;
      }

      const hist = historyRef.current;
      hist.push({ t, y: yTarget });
      if (hist.length > 200) hist.splice(0, hist.length - 200);
    }

    // --- Draw tank ---
    const tankL = 80, tankR = W - 80, tankTop = 40, tankBot = H - 20;

    // Water
    ctx.fillStyle = '#3b82f6';
    ctx.globalAlpha = 0.25;
    ctx.fillRect(tankL, tankTop, tankR - tankL, tankBot - tankTop);
    ctx.globalAlpha = 1;

    // Tank border
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.strokeRect(tankL, tankTop, tankR - tankL, tankBot - tankTop);

    // Water surface label
    ctx.fillStyle = '#3b82f6';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('ρ_液 = ' + rL.toFixed(1) + ' g/cm³', tankL + 10, tankTop + 6);

    // --- Draw object ---
    const objectSize = 60;
    const objectX = (tankL + tankR) / 2 - objectSize / 2;
    const ratio = Math.min(1, rO / rL);
    const subHeight = objectSize * ratio;
    const floatOffset = rO < rL ? (H - 40 - subHeight) - (tankBot - objectSize) : 0;
    const objectY = rO >= rL ? tankBot - objectSize : H - 40 - subHeight;

    ctx.fillStyle = rO >= rL ? '#ef4444' : '#f59e0b';
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.roundRect(objectX, objectY, objectSize, objectSize, 6);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Submerged line
    if (rO < rL) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      const waterLevel = objectY + subHeight;
      ctx.beginPath();
      ctx.moveTo(objectX, waterLevel);
      ctx.lineTo(objectX + objectSize, waterLevel);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#3b82f6';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('水面', objectX + objectSize / 2, waterLevel + 4);
    }

    // Object label
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ρ=' + rO.toFixed(1), objectX + objectSize / 2, objectY + objectSize / 2);

    // --- Draw graph ---
    const graphCanvas = graphRef.current;
    if (graphCanvas) {
      const gctx = graphCanvas.getContext('2d');
      if (gctx) {
        const GW = graphCanvas.width, GH = graphCanvas.height;
        gctx.clearRect(0, 0, GW, GH);
        gctx.strokeStyle = '#444';
        gctx.lineWidth = 1;
        gctx.beginPath(); gctx.moveTo(40, 0); gctx.lineTo(40, GH); gctx.stroke();
        gctx.beginPath(); gctx.moveTo(40, GH / 2); gctx.lineTo(GW, GH / 2); gctx.stroke();

        const hist = historyRef.current;
        if (hist.length > 1) {
          gctx.strokeStyle = '#3b82f6';
          gctx.lineWidth = 2;
          gctx.beginPath();
          const maxT = Math.max(...hist.map(h => h.t), 1);
          for (let i = 0; i < hist.length; i++) {
            const xx = 40 + ((hist[i].t) / maxT) * (GW - 48);
            const yy = GH / 2;
            if (i === 0) gctx.moveTo(xx, yy); else gctx.lineTo(xx, yy);
          }
          gctx.stroke();
        }

        gctx.fillStyle = '#888';
        gctx.font = '13px sans-serif';
        gctx.textAlign = 'left';
        gctx.fillText('深度 t (s)', GW - 60, GH - 6);
      }
    }

    animRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const graph = graphRef.current;
    if (!canvas || !graph) return;
    canvas.width = canvas.clientWidth * 2;
    canvas.height = canvas.clientHeight * 2;
    graph.width = graph.clientWidth * 2;
    graph.height = graph.clientHeight * 2;

    // roundRect polyfill
    if (!CanvasRenderingContext2D.prototype.roundRect) {
      (CanvasRenderingContext2D.prototype as any).roundRect = function(x: number, y: number, w: number, h: number, r: number) {
        this.moveTo(x + r, y);
        this.arcTo(x + w, y, x + w, y + h, r);
        this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r);
        this.arcTo(x, y, x + w, y, r);
      };
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">🔬 阿基米德浮體模擬器</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 300 }} className="rounded-lg bg-zinc-50 dark:bg-zinc-800" />
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <label className="text-sm text-zinc-600 dark:text-zinc-300">
          液體密度 ρ<sub>液</sub>：
          <input type="range" min="0.5" max="2.0" step="0.1" value={rhoLiquid}
            onChange={e => setRhoLiquid(parseFloat(e.target.value))} className="ml-2 w-24" />
          <span className="ml-1 font-semibold text-blue-500">{rhoLiquid.toFixed(1)}</span>
        </label>
        <label className="text-sm text-zinc-600 dark:text-zinc-300">
          物體密度 ρ<sub>物</sub>：
          <input type="range" min="0.2" max="10" step="0.1" value={rhoObject}
            onChange={e => setRhoObject(parseFloat(e.target.value))} className="ml-2 w-24" />
          <span className="ml-1 font-semibold text-blue-500">{rhoObject.toFixed(1)}</span>
        </label>
        <button onClick={() => { setRunning(!running); runningRef.current = !running; }}
          className="rounded-lg bg-blue-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-600">
          {running ? '⏸ 暫停' : '▶ 播放'}
        </button>
        <button onClick={() => {
          setRunning(false); runningRef.current = false;
          timeRef.current = 0; historyRef.current = [];
          setTime(0);
        }} className="rounded-lg border border-zinc-300 px-4 py-1.5 text-sm text-zinc-600 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300">
          ↺ 重置
        </button>
      </div>
      <canvas ref={graphRef} style={{ width: '100%', height: 80, marginTop: 8 }} className="rounded-lg bg-zinc-50 dark:bg-zinc-800" />
      <p className="mt-2 text-xs text-zinc-400">
        ρ<sub>物</sub> / ρ<sub>液</sub> = {(rhoObject / rhoLiquid).toFixed(2)}，
        {rhoObject >= rhoLiquid ? '物體下沉' : `浸沒比例 ${(rhoObject/rhoLiquid*100).toFixed(0)}%`}
      </p>
    </div>
  );
}
