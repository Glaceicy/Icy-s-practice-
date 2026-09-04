"use client";

interface VisualAidProps {
  kind: string;
  data: Record<string, unknown>;
}

function NumberLine({ min, max, highlight, start }: { min: number; max: number; highlight?: number; start?: number }) {
  const width = 320;
  const pad = 16;
  const scale = (n: number) => pad + ((n - min) / (max - min)) * (width - pad * 2);
  const step = max - min > 40 ? 10 : max - min > 20 ? 5 : 1;
  const marks: number[] = [];
  for (let n = min; n <= max; n += step) marks.push(n);

  return (
    <svg viewBox={`0 0 ${width} 60`} role="img" aria-label={`Number line from ${min} to ${max}${highlight !== undefined ? `, arrow pointing to ${highlight}` : ""}`} className="w-full max-w-md">
      <line x1={pad} y1={30} x2={width - pad} y2={30} stroke="currentColor" strokeWidth={2} />
      {marks.map((m) => (
        <g key={m}>
          <line x1={scale(m)} y1={24} x2={scale(m)} y2={36} stroke="currentColor" strokeWidth={1.5} />
          <text x={scale(m)} y={50} fontSize={9} textAnchor="middle" fill="currentColor">
            {m}
          </text>
        </g>
      ))}
      {start !== undefined && <circle cx={scale(start)} cy={30} r={5} fill="#0a7de6" />}
      {highlight !== undefined && (
        <polygon points={`${scale(highlight)},10 ${scale(highlight) - 6},20 ${scale(highlight) + 6},20`} fill="#e6506b" />
      )}
    </svg>
  );
}

function TenFrame({ filled }: { filled: number }) {
  const frames = Math.max(1, Math.ceil(filled / 10));
  return (
    <div className="flex flex-wrap gap-3">
      {Array.from({ length: frames }).map((_, f) => (
        <div key={f} className="grid grid-cols-5 gap-1 rounded border-2 border-slate-400 p-1" role="img" aria-label={`Ten frame ${f + 1}`}>
          {Array.from({ length: 10 }).map((_, i) => {
            const idx = f * 10 + i;
            const isFilled = idx < filled;
            return <div key={i} className={`h-6 w-6 rounded-sm border ${isFilled ? "bg-brand-500" : "bg-white"}`} />;
          })}
        </div>
      ))}
    </div>
  );
}

function Counters({ count, groups }: { count: number; groups?: number }) {
  const groupSize = groups && groups > 0 ? Math.ceil(count / groups) : count;
  const items = Array.from({ length: count });
  const chunks: number[][] = [];
  for (let i = 0; i < items.length; i += groupSize) chunks.push(items.slice(i, i + groupSize).map((_, j) => i + j));
  return (
    <div className="flex flex-wrap gap-3" role="img" aria-label={`${count} counters`}>
      {chunks.map((chunk, ci) => (
        <div key={ci} className="flex flex-wrap gap-1 rounded border border-dashed border-slate-300 p-2">
          {chunk.map((i) => (
            <span key={i} className="text-xl" aria-hidden="true">
              🔵
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function ArrayGrid({ rows, cols }: { rows: number; cols: number }) {
  return (
    <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }} role="img" aria-label={`Array of ${rows} rows by ${cols} columns`}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span key={i} className="h-5 w-5 rounded-sm bg-brand-500" />
      ))}
    </div>
  );
}

function Clock({ hour, minute }: { hour: number; minute: number }) {
  const hourAngle = ((hour % 12) + minute / 60) * 30;
  const minuteAngle = minute * 6;
  return (
    <svg viewBox="0 0 100 100" role="img" aria-label={`Clock showing ${hour === 0 ? 12 : hour}:${String(minute).padStart(2, "0")}`} className="h-32 w-32">
      <circle cx={50} cy={50} r={46} fill="white" stroke="currentColor" strokeWidth={2} />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return <circle key={i} cx={50 + Math.sin(a) * 38} cy={50 - Math.cos(a) * 38} r={1.5} fill="currentColor" />;
      })}
      <line x1={50} y1={50} x2={50 + Math.sin((hourAngle * Math.PI) / 180) * 22} y2={50 - Math.cos((hourAngle * Math.PI) / 180) * 22} stroke="currentColor" strokeWidth={4} strokeLinecap="round" />
      <line x1={50} y1={50} x2={50 + Math.sin((minuteAngle * Math.PI) / 180) * 34} y2={50 - Math.cos((minuteAngle * Math.PI) / 180) * 34} stroke="#e6506b" strokeWidth={3} strokeLinecap="round" />
      <circle cx={50} cy={50} r={2.5} fill="currentColor" />
    </svg>
  );
}

function Coins({ pence }: { pence: number[] }) {
  return (
    <div className="flex flex-wrap gap-2" role="img" aria-label={`Coins: ${pence.join("p, ")}p`}>
      {pence.map((p, i) => (
        <span key={i} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-sunny-600 bg-sunny-400 text-xs font-bold text-white">
          {p}p
        </span>
      ))}
    </div>
  );
}

const SHAPE_PATHS: Record<string, string> = {
  circle: "M50,10 a40,40 0 1,0 0.1,0",
  triangle: "M50,10 L90,85 L10,85 Z",
  square: "M15,15 h70 v70 h-70 Z",
  rectangle: "M10,25 h80 v50 h-80 Z",
  pentagon: "M50,8 L92,40 L75,90 L25,90 L8,40 Z",
  hexagon: "M25,10 L75,10 L95,50 L75,90 L25,90 L5,50 Z"
};

function Shape({ shapeName, colour }: { shapeName: string; colour?: string }) {
  const path = SHAPE_PATHS[shapeName];
  return (
    <svg viewBox="0 0 100 100" role="img" aria-label={`${colour ?? ""} ${shapeName}`} className="h-24 w-24">
      {path ? <path d={path} fill={colour ?? "#1a9bff"} stroke="currentColor" strokeWidth={2} /> : <text x={50} y={55} textAnchor="middle">{shapeName}</text>}
    </svg>
  );
}

function FractionDiagram({ numerator, denominator, shape }: { numerator: number; denominator: number; shape: string }) {
  if (shape === "circle") {
    const slices = Array.from({ length: denominator });
    const anglePer = 360 / denominator;
    return (
      <svg viewBox="0 0 100 100" role="img" aria-label={`${numerator} out of ${denominator} shaded`} className="h-28 w-28">
        {slices.map((_, i) => {
          const start = i * anglePer - 90;
          const end = start + anglePer;
          const x1 = 50 + 45 * Math.cos((start * Math.PI) / 180);
          const y1 = 50 + 45 * Math.sin((start * Math.PI) / 180);
          const x2 = 50 + 45 * Math.cos((end * Math.PI) / 180);
          const y2 = 50 + 45 * Math.sin((end * Math.PI) / 180);
          const large = anglePer > 180 ? 1 : 0;
          return (
            <path key={i} d={`M50,50 L${x1},${y1} A45,45 0 ${large} 1 ${x2},${y2} Z`} fill={i < numerator ? "#1a9bff" : "white"} stroke="currentColor" strokeWidth={1} />
          );
        })}
      </svg>
    );
  }
  return (
    <div className="flex h-10 w-64 overflow-hidden rounded border border-slate-400" role="img" aria-label={`${numerator} out of ${denominator} shaded`}>
      {Array.from({ length: denominator }).map((_, i) => (
        <div key={i} className={`flex-1 border-r last:border-r-0 ${i < numerator ? "bg-brand-500" : "bg-white"}`} />
      ))}
    </div>
  );
}

function CoordinateGrid({ points, quadrants }: { points: Array<[number, number]>; quadrants: number }) {
  const size = 200;
  const range = quadrants === 4 ? [-10, 10] : [0, 10];
  const scale = (n: number) => ((n - range[0]!) / (range[1]! - range[0]!)) * size;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Coordinate grid" className="h-48 w-48 bg-white">
      <line x1={0} y1={scale(0) === undefined ? size : size - scale(0)} x2={size} y2={size - scale(0)} stroke="#94a3b8" />
      <line x1={scale(0)} y1={0} x2={scale(0)} y2={size} stroke="#94a3b8" />
      {points.map(([x, y], i) => (
        <circle key={i} cx={scale(x)} cy={size - scale(y)} r={4} fill="#e6506b" />
      ))}
    </svg>
  );
}

function BarChart({ series }: { series: Array<{ label: string; value: number }> }) {
  const max = Math.max(...series.map((s) => s.value), 1);
  return (
    <div className="flex items-end gap-3" role="img" aria-label="Bar chart">
      {series.map((s) => (
        <div key={s.label} className="flex flex-col items-center gap-1">
          <div className="w-8 rounded-t bg-brand-500" style={{ height: `${(s.value / max) * 100}px` }} />
          <span className="text-xs">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function BarModel({ parts, total }: { parts: number[]; total: number }) {
  return (
    <div className="w-full max-w-sm">
      <div className="flex h-10 w-full overflow-hidden rounded border border-slate-400">
        {parts.map((p, i) => (
          <div key={i} className={`flex items-center justify-center border-r text-xs font-semibold text-white last:border-r-0 ${i % 2 === 0 ? "bg-brand-500" : "bg-leaf-500"}`} style={{ width: `${(p / total) * 100}%` }}>
            {p}
          </div>
        ))}
      </div>
      <p className="mt-1 text-center text-xs text-slate-500">Total: {total}</p>
    </div>
  );
}

export default function VisualAidRenderer({ kind, data }: VisualAidProps) {
  switch (kind) {
    case "number-line":
      return <NumberLine min={data.min as number} max={data.max as number} highlight={data.highlight as number | undefined} start={data.start as number | undefined} />;
    case "ten-frame":
      return <TenFrame filled={data.filled as number} />;
    case "counters":
      return <Counters count={data.count as number} groups={data.groups as number | undefined} />;
    case "array":
      return <ArrayGrid rows={data.rows as number} cols={data.cols as number} />;
    case "clock":
      return <Clock hour={data.hour as number} minute={data.minute as number} />;
    case "coins":
      return <Coins pence={data.pence as number[]} />;
    case "shape":
      return <Shape shapeName={data.shapeName as string} colour={data.colour as string | undefined} />;
    case "fraction-diagram":
      return <FractionDiagram numerator={data.numerator as number} denominator={data.denominator as number} shape={(data.shape as string) ?? "bar"} />;
    case "coordinate-grid":
      return <CoordinateGrid points={(data.points as Array<[number, number]>) ?? []} quadrants={(data.quadrants as number) ?? 1} />;
    case "graph":
      return <BarChart series={(data.series as Array<{ label: string; value: number }>) ?? []} />;
    case "bar-model":
      return <BarModel parts={(data.parts as number[]) ?? []} total={(data.total as number) ?? 1} />;
    case "algebra-tile":
      return (
        <div className="flex gap-2" role="img" aria-label="Algebra tiles">
          {Array.from({ length: (data.xCount as number) ?? 0 }).map((_, i) => (
            <span key={`x${i}`} className="flex h-10 w-6 items-center justify-center rounded bg-brand-500 text-xs text-white">x</span>
          ))}
          {Array.from({ length: (data.unitCount as number) ?? 0 }).map((_, i) => (
            <span key={`u${i}`} className="flex h-6 w-6 items-center justify-center rounded bg-leaf-500 text-xs text-white">1</span>
          ))}
        </div>
      );
    case "probability-diagram": {
      const outcomes = (data.outcomes as Array<{ label: string; weight: number }>) ?? [];
      const total = outcomes.reduce((s, o) => s + o.weight, 0) || 1;
      return (
        <div className="flex h-8 w-64 overflow-hidden rounded-full border" role="img" aria-label="Probability diagram">
          {outcomes.map((o, i) => (
            <div key={i} className={`flex items-center justify-center text-[10px] text-white ${i % 2 === 0 ? "bg-brand-500" : "bg-berry-500"}`} style={{ width: `${(o.weight / total) * 100}%` }}>
              {o.label}
            </div>
          ))}
        </div>
      );
    }
    default:
      return null;
  }
}
