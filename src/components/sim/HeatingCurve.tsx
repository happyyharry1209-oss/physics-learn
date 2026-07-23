'use client';

import { useEffect, useRef, useState } from 'react';

const C_ICE = 2090, C_WATER = 4186, C_STEAM = 2010;
const L_F = 3.34e5, L_V = 2.26e6;
const T_MELT = 0, T_BOIL = 100;

export default function HeatingCurve() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mass, setMass] = useState(50);
  const [power, setPower] = useState(50);
  const [running, setRunning] = useState(false);
  const runningRef = useRef(false);
  const stateRef = useRef({ t: 0, temp: -10, phase: 0, heat: 0, completed: false });
  const historyRef = useRef<{t: number; temp: number; phase: number}[]>([]);
  const animRef = useRef(0);

  useEffect(() => { runningRef.current = running; }, [running]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!canvas || !ctx) return;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const st = stateRef.current;
    const dt = 0.02;
    const m = mass / 1000; // convert g to kg

    if (runningRef.current && !st.completed) {
      st.t += dt;
      const dQ = power * dt;
      st.heat += dQ;

      switch (st.phase) {
        case 0: // ice heating
          st.temp += dQ / (m * C_ICE);
          if (st.temp >= T_MELT) { st.temp = T_MELT; st.phase = 1; }
          break;
        case 1: // melting
          if (dQ < m * L_F - (st.heat % (m * L_F) || m * L_F)) {
            // accumulating latent heat
          }
          st.heat += dQ * 0; // already counted
          const meltProgress = (st.heat % (m * L_F)) / (m * L_F) || 0;
          if (meltProgress <= 0 && st.heat > m * L_F * 0.01) {
            // actually track separately
          }
          break;
      }

      // Better phase tracking
      const totalHeat = st.heat;
      let remaining = totalHeat;
      const phases: {name: string; temp: number; heatNeeded: number}[] = [
        { name: 'ice', temp: -10, heatNeeded: m * C_ICE * 10 },
        { name: 'melt', temp: 0, heatNeeded: m * L_F },
        { name: 'water', temp: 100, heatNeeded: m * C_WATER * 100 },
        { name: 'boil', temp: 100, heatNeeded: m * L_V },
        { name: 'steam', temp: 200, heatNeeded: m * C_STEAM * 100 },
      ];

      let currentTemp = -10, phaseIdx = 0;
      for (let i = 0; i < phases.length; i++) {
        if (remaining <= phases[i].heatNeeded || i === phases.length - 1) {
          if (i === 0 || i === 2 || i === 4) {
            // heating phase
            currentTemp = phases[i].temp + remaining / (phases[i].heatNeeded > 0 ? phases[i].heatNeeded : 1) * (i === 4 ? 100 : (i === 0 ? 10 : 100));
            if (i === 0) currentTemp = -10 + remaining / (m * C_ICE * 10) * 10;
            else if (i === 2) currentTemp = 0 + remaining / (m * C_WATER * 100) * 100;
            else if (i === 4) currentTemp = 100 + remaining / (m * C_STEAM * 100) * 100;
          } else {
            currentTemp = phases[i].temp;
          }
          phaseIdx = i;
          break;
        } else {
          remaining -= phases[i].heatNeeded;
        }
      }

      st.temp = Math.min(currentTemp, 210);
      if (st.temp >= 200) st.completed = true;

      historyRef.current.push({ t: st.t, temp: st.temp, phase: phaseIdx });
      if (historyRef.current.length > 500) historyRef.current.shift();
    }

    // Draw heating curve
    const pad = { l: 50, r: 20, t: 20, b: 40 };
    const gw = W - pad.l - pad.r, gh = H - pad.t - pad.b;
    const hist = historyRef.current;

    // Grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 5; i++) {
      const yy = pad.t + (gh / 5) * i;
      ctx.beginPath(); ctx.moveTo(pad.l, yy); ctx.lineTo(pad.l + gw, yy); ctx.stroke();
      ctx.fillStyle = '#666';
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText((200 - i * 50) + '°C', pad.l - 4, yy + 3);
    }
    // x axis label
    ctx.fillStyle = '#888';
    ctx.textAlign = 'center';
    ctx.fillText('時間 t (s)', pad.l + gw / 2, H - 6);

    // Phase background colors
    const phaseColors = ['#3b82f6', '#60a5fa', '#f59e0b', '#ef4444', '#8b5cf6'];
    const phaseLabels = ['固態冰', '熔化', '液態水', '沸騰', '水蒸氣'];

    // Draw curve
    if (hist.length > 1) {
      const maxT = Math.max(hist[hist.length - 1].t, 1);
      for (let i = 1; i < hist.length; i++) {
        const xx1 = pad.l + (hist[i - 1].t / maxT) * gw;
        const yy1 = pad.t + gh - (hist[i - 1].temp / 210) * gh;
        const xx2 = pad.l + (hist[i].t / maxT) * gw;
        const yy2 = pad.t + gh - (hist[i].temp / 210) * gh;
        ctx.strokeStyle = phaseColors[hist[i].phase] || '#fff';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(xx1, yy1); ctx.lineTo(xx2, yy2); ctx.stroke();
      }
    }

    // Current temp marker
    if (hist.length > 0) {
      const maxT = Math.max(hist[hist.length - 1].t, 1);
      const cx = pad.l + (hist[hist.length - 1].t / maxT) * gw;
      const cy = pad.t + gh - (st.temp / 210) * gh;
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`${st.temp.toFixed(1)}°C`, cx + 10, cy + 4);
    }

    // Legend
    let lx = pad.l, ly = 4;
    for (let i = 0; i < phaseLabels.length; i++) {
      ctx.fillStyle = phaseColors[i];
      ctx.fillRect(lx, ly, 12, 10);
      ctx.fillStyle = '#aaa';
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(phaseLabels[i], lx + 16, ly + 9);
      lx += 66;
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
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">🧊 相變加熱曲線模擬器</h3>
      <canvas ref={canvasRef} style={{ width: '100%', height: 300 }} className="rounded-lg bg-zinc-900 dark:bg-zinc-950" />
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="text-sm text-zinc-600 dark:text-zinc-300">
          冰塊質量 m：
          <input type="range" min="10" max="200" step="5" value={mass}
            onChange={e => setMass(parseInt(e.target.value))} className="ml-2 w-full" />
          <span className="font-semibold text-blue-500">{mass} g</span>
        </label>
        <label className="text-sm text-zinc-600 dark:text-zinc-300">
          加熱功率 P：
          <input type="range" min="10" max="200" step="5" value={power}
            onChange={e => setPower(parseInt(e.target.value))} className="ml-2 w-full" />
          <span className="font-semibold text-blue-500">{power} W</span>
        </label>
        <div className="flex items-end gap-2">
          <button onClick={() => { setRunning(!running); }}
            className="rounded-lg bg-blue-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-600">
            {running ? '⏸ 暫停' : '▶ 播放'}
          </button>
          <button onClick={() => {
            setRunning(false); runningRef.current = false;
            stateRef.current = { t: 0, temp: -10, phase: 0, heat: 0, completed: false };
            historyRef.current = [];
          }} className="rounded-lg border border-zinc-300 px-4 py-1.5 text-sm text-zinc-600 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300">
            ↺ 重置
          </button>
        </div>
      </div>
      <p className="mt-2 text-xs text-zinc-400">加熱 -10°C 冰塊 → 200°C 水蒸氣，完整顯示五段加熱與相變過程</p>
    </div>
  );
}
