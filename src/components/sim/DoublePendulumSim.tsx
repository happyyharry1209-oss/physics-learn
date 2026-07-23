'use client';

import { useEffect, useRef, useState } from 'react';

export default function DoublePendulumSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [L1, setL1] = useState(1.2);
  const [L2, setL2] = useState(1.0);
  const [m1, setM1] = useState(2);
  const [m2, setM2] = useState(1.5);
  const [th1, setTh1] = useState(120);
  const [th2, setTh2] = useState(60);
  const [running, setRunning] = useState(false);
  const [showTrace, setShowTrace] = useState(true);
  const runningRef = useRef(false);
  const stateRef = useRef({ th1: 0, th2: 0, w1: 0, w2: 0 });
  const traceRef = useRef<{x:number;y:number}[]>([]);
  const animRef = useRef(0);
  const colorIdx = useRef(0);

  useEffect(() => { runningRef.current = running; }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = 800;
    canvas.height = 650;
    const c2 = canvas.getContext('2d');
    if (!c2) return;

    // Initialize angles
    stateRef.current = {
      th1: th1 * Math.PI / 180,
      th2: th2 * Math.PI / 180,
      w1: 0, w2: 0
    };
    traceRef.current = [];

    function loop() {
      if (!c2) return;
      c2.clearRect(0, 0, 800, 650);
      const cx = 400, cy = 80;
      const scale = 100;
      const g = 9.8;
      const st = stateRef.current;
      const dt = 0.005;

      // RK4 integration
      if (runningRef.current) {
        colorIdx.current++;
        const L1v = L1, L2v = L2, m1v = m1, m2v = m2;

        function derivatives(s: {th1:number;th2:number;w1:number;w2:number}) {
          const { th1: t1, th2: t2, w1: w1, w2: w2 } = s;
          const delta = t1 - t2;
          const d = m1v + m2v;
          const denom1 = L1v * (2*d - m2v * Math.cos(2*delta));
          const denom2 = L2v * (2*d - m2v * Math.cos(2*delta));

          const a1 = (-g*(2*d - m2v)*Math.sin(t1) - m2v*g*Math.sin(t1-2*t2) - 2*m2v*Math.sin(delta)*(w2*w2*L2v + w1*w1*L1v*Math.cos(delta))) / denom1;
          const a2 = (2*Math.sin(delta)*(w1*w1*L1v*d + g*(m1v+m2v)*Math.cos(t1) + w2*w2*L2v*m2v*Math.cos(delta))) / denom2;

          return { dth1: w1, dth2: w2, dw1: a1, dw2: a2 };
        }

        function step(s: {th1:number;th2:number;w1:number;w2:number}, h: number) {
          const k1 = derivatives(s);
          const s2 = { th1: s.th1 + h/2*k1.dth1, th2: s.th2 + h/2*k1.dth2, w1: s.w1 + h/2*k1.dw1, w2: s.w2 + h/2*k1.dw2 };
          const k2 = derivatives(s2);
          const s3 = { th1: s.th1 + h/2*k2.dth1, th2: s.th2 + h/2*k2.dth2, w1: s.w1 + h/2*k2.dw1, w2: s.w2 + h/2*k2.dw2 };
          const k3 = derivatives(s3);
          const s4 = { th1: s.th1 + h*k3.dth1, th2: s.th2 + h*k3.dth2, w1: s.w1 + h*k3.dw1, w2: s.w2 + h*k3.dw2 };
          const k4 = derivatives(s4);

          return {
            th1: s.th1 + h/6*(k1.dth1 + 2*k2.dth1 + 2*k3.dth1 + k4.dth1),
            th2: s.th2 + h/6*(k1.dth2 + 2*k2.dth2 + 2*k3.dth2 + k4.dth2),
            w1: s.w1 + h/6*(k1.dw1 + 2*k2.dw1 + 2*k3.dw1 + k4.dw1),
            w2: s.w2 + h/6*(k1.dw2 + 2*k2.dw2 + 2*k3.dw2 + k4.dw2)
          };
        }

        const next = step(st, dt);
        st.th1 = next.th1;
        st.th2 = next.th2;
        st.w1 = next.w1;
        st.w2 = next.w2;

        // Calculate endpoint positions
        const x1 = cx + L1v * scale * Math.sin(st.th1);
        const y1 = cy + L1v * scale * Math.cos(st.th1);
        const x2 = x1 + L2v * scale * Math.sin(st.th2);
        const y2 = y1 + L2v * scale * Math.cos(st.th2);

        // Trace only mass 2 trajectory with color gradient
        if (showTrace && colorIdx.current % 2 === 0) {
          traceRef.current.push({ x: x2, y: y2 });
          if (traceRef.current.length > 2000) traceRef.current = traceRef.current.slice(-2000);
        }

        // Draw trace (fading color trail)
        const trace = traceRef.current;
        for (let i = 1; i < trace.length; i++) {
          const hue = (i * 2 + colorIdx.current) % 360;
          c2.strokeStyle = `hsla(${hue}, 100%, 60%, ${i / trace.length * 0.6})`;
          c2.lineWidth = 1.5;
          c2.beginPath();
          c2.moveTo(trace[i-1].x, trace[i-1].y);
          c2.lineTo(trace[i].x, trace[i].y);
          c2.stroke();
        }

        // Draw pendulum 1
        c2.strokeStyle = '#f59e0b';
        c2.lineWidth = 3;
        c2.beginPath();
        c2.moveTo(cx, cy);
        c2.lineTo(x1, y1);
        c2.stroke();

        c2.fillStyle = '#f59e0b';
        c2.shadowColor = 'rgba(245,158,11,0.4)';
        c2.shadowBlur = 10;
        c2.beginPath();
        c2.arc(x1, y1, m1 * 4 + 4, 0, Math.PI * 2);
        c2.fill();
        c2.shadowBlur = 0;

        // Draw pendulum 2
        c2.strokeStyle = '#3b82f6';
        c2.lineWidth = 3;
        c2.beginPath();
        c2.moveTo(x1, y1);
        c2.lineTo(x2, y2);
        c2.stroke();

        c2.fillStyle = '#3b82f6';
        c2.shadowColor = 'rgba(59,130,246,0.4)';
        c2.shadowBlur = 10;
        c2.beginPath();
        c2.arc(x2, y2, m2 * 4 + 4, 0, Math.PI * 2);
        c2.fill();
        c2.shadowBlur = 0;

        // Pivot point
        c2.fillStyle = '#888';
        c2.beginPath();
        c2.arc(cx, cy, 10, 0, Math.PI * 2);
        c2.fill();

        // Legend
        c2.fillStyle = 'rgba(0,0,0,0.75)';
        c2.fillRect(8, 6, 200, 70);
        c2.fillStyle = '#fff';
        c2.font = '13px sans-serif';
        c2.textAlign = 'left';
        c2.textBaseline = 'top';
        c2.fillText(`L₁=${L1.toFixed(1)} L₂=${L2.toFixed(1)}  m₁=${m1.toFixed(1)} m₂=${m2.toFixed(1)}`, 14, 10);
        c2.fillText(`θ₁=${(st.th1*180/Math.PI%360).toFixed(0)}°  θ₂=${(st.th2*180/Math.PI%360).toFixed(0)}°`, 14, 26);
        c2.fillText(`軌跡點數: ${trace.length}  |  混沌系統`, 14, 42);
      }

      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [L1, L2, m1, m2, th1, th2, showTrace]);

  function resetSim() {
    setRunning(false);
    runningRef.current = false;
    stateRef.current = {
      th1: th1 * Math.PI / 180,
      th2: th2 * Math.PI / 180,
      w1: 0, w2: 0
    };
    traceRef.current = [];
  }

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">🔄 混沌雙擺模擬器 (RK4 數值積分)</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 360 }} className="rounded-lg bg-zinc-950" />
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-6">
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          L₁ 擺長：
          <input type="range" min="0.5" max="2" step="0.1" value={L1}
            onChange={e => { setL1(parseFloat(e.target.value)); resetSim(); }} className="ml-1 w-full" />
          <span className="text-blue-500 font-semibold">{L1.toFixed(1)}</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          L₂ 擺長：
          <input type="range" min="0.5" max="2" step="0.1" value={L2}
            onChange={e => { setL2(parseFloat(e.target.value)); resetSim(); }} className="ml-1 w-full" />
          <span className="text-blue-500 font-semibold">{L2.toFixed(1)}</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          m₁ 質量：
          <input type="range" min="0.5" max="5" step="0.5" value={m1}
            onChange={e => { setM1(parseFloat(e.target.value)); resetSim(); }} className="ml-1 w-full" />
          <span className="text-blue-500 font-semibold">{m1.toFixed(1)}</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          m₂ 質量：
          <input type="range" min="0.5" max="5" step="0.5" value={m2}
            onChange={e => { setM2(parseFloat(e.target.value)); resetSim(); }} className="ml-1 w-full" />
          <span className="text-blue-500 font-semibold">{m2.toFixed(1)}</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          θ₁ 初始角：
          <input type="range" min="10" max="170" step="5" value={th1}
            onChange={e => { setTh1(parseInt(e.target.value)); resetSim(); }} className="ml-1 w-full" />
          <span className="text-blue-500 font-semibold">{th1}°</span>
        </label>
        <label className="text-xs text-zinc-600 dark:text-zinc-300">
          θ₂ 初始角：
          <input type="range" min="10" max="170" step="5" value={th2}
            onChange={e => { setTh2(parseInt(e.target.value)); resetSim(); }} className="ml-1 w-full" />
          <span className="text-blue-500 font-semibold">{th2}°</span>
        </label>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <button onClick={() => setRunning(!running)}
          className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600">
          {running ? '⏸ 暫停' : '▶ 播放'}
        </button>
        <button onClick={resetSim}
          className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs text-zinc-600 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300">
          ↺ 重置
        </button>
        <button onClick={() => { traceRef.current = []; }}
          className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs text-zinc-600 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300">
          🧹 清除軌跡
        </button>
        <button onClick={() => { setShowTrace(!showTrace); }}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium ${showTrace ? 'bg-green-500 text-white' : 'border border-zinc-300 text-zinc-600'}`}>
          {showTrace ? '✓ 軌跡顯示中' : '✗ 軌跡隱藏'}
        </button>
      </div>
      <p className="mt-2 text-xs text-zinc-400">RK4 數值積分 ｜ 非線性耦合 ODE ｜ 初始條件微小變化 → 截然不同軌跡（蝴蝶效應）</p>
    </div>
  );
}
