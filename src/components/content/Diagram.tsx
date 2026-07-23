'use client';

import { useId } from 'react';

interface DiagramProps {
  title?: string;
  caption?: string;
  type: 'force' | 'circuit' | 'wave' | 'lens' | 'graph' | 'field';
  className?: string;
}

function ForceDiagram() {
  return (
    <svg viewBox="0 0 300 200" className="w-full max-w-sm">
      {/* Box */}
      <rect x="100" y="100" width="80" height="60" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Gravity */}
      <line x1="140" y1="160" x2="140" y2="195" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)" />
      <text x="148" y="185" fontSize="12" fill="#ef4444">F<sub>g</sub></text>
      {/* Normal */}
      <line x1="140" y1="100" x2="140" y2="65" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlue)" />
      <text x="148" y="75" fontSize="12" fill="#3b82f6">N</text>
      {/* Friction */}
      <line x1="180" y1="130" x2="215" y2="130" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowYellow)" />
      <text x="200" y="125" fontSize="12" fill="#f59e0b">f</text>
      {/* Applied Force */}
      <line x1="100" y1="130" x2="65" y2="130" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen)" />
      <text x="55" y="125" fontSize="12" fill="#10b981">F</text>
      {/* Markers */}
      <defs>
        <marker id="arrowRed" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#ef4444" />
        </marker>
        <marker id="arrowBlue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#3b82f6" />
        </marker>
        <marker id="arrowYellow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#f59e0b" />
        </marker>
        <marker id="arrowGreen" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#10b981" />
        </marker>
      </defs>
    </svg>
  );
}

function FieldDiagram() {
  return (
    <svg viewBox="0 0 300 200" className="w-full max-w-sm">
      {/* Magnet N */}
      <rect x="20" y="60" width="50" height="80" rx="4" fill="#ef4444" />
      <text x="45" y="105" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">N</text>
      {/* Magnet S */}
      <rect x="230" y="60" width="50" height="80" rx="4" fill="#3b82f6" />
      <text x="255" y="105" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">S</text>
      {/* Field lines */}
      {[0, 1, 2, 3, 4].map((i) => {
        const yOff = -30 + i * 15;
        return (
          <path
            key={i}
            d={`M70,${80 + yOff} Q150,${50 + yOff} 230,${80 + yOff}`}
            fill="none"
            stroke="#a1a1aa"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            markerEnd="url(#arrowField)"
          />
        );
      })}
      {/* Compass needle */}
      <line x1="150" y1="80" x2="170" y2="75" stroke="#f59e0b" strokeWidth="2" />
      <defs>
        <marker id="arrowField" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
          <path d="M0,0 L6,2 L0,4" fill="#a1a1aa" />
        </marker>
      </defs>
    </svg>
  );
}

function LensDiagram() {
  return (
    <svg viewBox="0 0 350 200" className="w-full max-w-sm">
      {/* Lens */}
      <ellipse cx="175" cy="100" rx="8" ry="60" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="175" y1="40" x2="175" y2="160" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
      {/* Focal points */}
      <circle cx="125" cy="100" r="3" fill="#ef4444" />
      <text x="118" y="90" fontSize="10" fill="#ef4444">F</text>
      <circle cx="225" cy="100" r="3" fill="#ef4444" />
      <text x="218" y="90" fontSize="10" fill="#ef4444">F&apos;</text>
      {/* Object */}
      <line x1="60" y1="100" x2="60" y2="50" stroke="#3b82f6" strokeWidth="2.5" />
      <text x="50" y="45" fontSize="10" fill="#3b82f6">物體</text>
      {/* Rays */}
      <line x1="60" y1="50" x2="175" y2="50" stroke="#f59e0b" strokeWidth="1.5" />
      <line x1="175" y1="50" x2="260" y2="135" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="60" y1="50" x2="175" y2="120" stroke="#10b981" strokeWidth="1.5" />
      <line x1="175" y1="120" x2="260" y2="120" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* Image */}
      <line x1="260" y1="135" x2="260" y2="120" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 2" />
      <text x="250" y="145" fontSize="10" fill="#a855f7">像</text>
    </svg>
  );
}

function WaveDiagram() {
  return (
    <svg viewBox="0 0 350 120" className="w-full max-w-sm">
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M0,${40 + i * 35} Q25,${15 + i * 35} 50,${40 + i * 35} Q75,${65 + i * 35} 100,${40 + i * 35} Q125,${15 + i * 35} 150,${40 + i * 35} Q175,${65 + i * 35} 200,${40 + i * 35} Q225,${15 + i * 35} 250,${40 + i * 35} Q275,${65 + i * 35} 300,${40 + i * 35} Q325,${15 + i * 35} 350,${40 + i * 35}`}
          fill="none"
          stroke={['#3b82f6', '#10b981', '#f59e0b'][i]}
          strokeWidth="1.5"
          opacity={0.6}
        />
      ))}
      <line x1="50" y1="108" x2="100" y2="108" stroke="#a1a1aa" strokeWidth="1" />
      <text x="60" y="118" fontSize="10" fill="#a1a1aa">λ (波長)</text>
    </svg>
  );
}

function GraphDiagram() {
  return (
    <svg viewBox="0 0 300 200" className="w-full max-w-sm">
      {/* Axes */}
      <line x1="40" y1="180" x2="280" y2="180" stroke="currentColor" strokeWidth="1.5" />
      <line x1="40" y1="180" x2="40" y2="20" stroke="currentColor" strokeWidth="1.5" />
      {/* Parabola */}
      <path
        d="M40,180 Q90,180 120,140 Q150,100 170,70 Q190,40 210,30 Q240,20 270,40"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
      />
      <text x="110" y="195" fontSize="10" fill="#a1a1aa">時間 t</text>
      <text x="10" y="100" fontSize="10" fill="#a1a1aa" transform="rotate(-90, 10, 100)">位移 x</text>
    </svg>
  );
}

export default function Diagram({ title, caption, type, className = '' }: DiagramProps) {
  const id = useId();

  const diagrams: Record<string, { component: React.ReactNode; label: string }> = {
    force: { component: <ForceDiagram />, label: '力分析圖' },
    field: { component: <FieldDiagram />, label: '磁場示意圖' },
    lens: { component: <LensDiagram />, label: '透鏡成像圖' },
    wave: { component: <WaveDiagram />, label: '波形示意圖' },
    graph: { component: <GraphDiagram />, label: '函數圖形' },
    circuit: { component: <CircuitDiagram />, label: '電路圖' },
  };

  const diagram = diagrams[type] || diagrams.graph;

  return (
    <figure className={`my-6 flex flex-col items-center ${className}`}>
      {title && (
        <figcaption className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {title}
        </figcaption>
      )}
      <div className="flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        {diagram.component}
      </div>
      {caption && (
        <p className="mt-2 text-xs text-zinc-500">{caption}</p>
      )}
    </figure>
  );
}

function CircuitDiagram() {
  return (
    <svg viewBox="0 0 300 200" className="w-full max-w-sm">
      {/* Simple circuit */}
      <rect x="20" y="20" width="260" height="160" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Battery */}
      <line x1="150" y1="20" x2="150" y2="55" stroke="currentColor" strokeWidth="2" />
      <line x1="135" y1="55" x2="165" y2="55" stroke="currentColor" strokeWidth="3" />
      <line x1="135" y1="62" x2="165" y2="62" stroke="currentColor" strokeWidth="1.5" />
      <text x="170" y="45" fontSize="10" fill="currentColor">電池</text>
      {/* Resistor */}
      <rect x="130" y="140" width="40" height="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="128" y="138" width="44" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="180" y="148" fontSize="10" fill="currentColor">電阻 R</text>
      {/* Light bulb */}
      <circle cx="50" cy="100" r="10" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
      <line x1="44" y1="94" x2="56" y2="106" stroke="#f59e0b" strokeWidth="1" />
      <line x1="56" y1="94" x2="44" y2="106" stroke="#f59e0b" strokeWidth="1" />
      <text x="25" y="100" fontSize="10" fill="#f59e0b">燈泡</text>
      {/* Ammeter */}
      <circle cx="250" cy="100" r="10" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="247" y="104" fontSize="10" fill="#3b82f6">A</text>
      <text x="255" y="85" fontSize="10" fill="#3b82f6">安培計</text>
    </svg>
  );
}
