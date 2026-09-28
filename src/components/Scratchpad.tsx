"use client";

import { useRef, useState } from "react";

const PEN_COLORS = [
  { name: "black", value: "#1e293b" },
  { name: "red", value: "#e11d48" },
  { name: "blue", value: "#2563eb" },
  { name: "green", value: "#16a34a" },
  { name: "purple", value: "#9333ea" }
];

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 420;

/** A freehand drawing canvas kids can pop open at any point during a
 * question to work things out on paper-like scratch space. Client-side
 * only — nothing here is saved or submitted as part of the answer. */
export default function Scratchpad() {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(PEN_COLORS[0]!.value);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const historyRef = useRef<ImageData[]>([]);
  const [canUndo, setCanUndo] = useState(false);

  function getContext() {
    return canvasRef.current?.getContext("2d") ?? null;
  }

  function pointFromEvent(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  }

  function pushHistory() {
    const ctx = getContext();
    if (!ctx || !canvasRef.current) return;
    historyRef.current.push(ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
    if (historyRef.current.length > 20) historyRef.current.shift();
    setCanUndo(true);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    const ctx = getContext();
    if (!ctx) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    pushHistory();
    drawingRef.current = true;
    lastPointRef.current = pointFromEvent(e);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;
    const ctx = getContext();
    if (!ctx || !lastPointRef.current) return;
    const point = pointFromEvent(e);
    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    lastPointRef.current = point;
  }

  function handlePointerUp() {
    drawingRef.current = false;
    lastPointRef.current = null;
  }

  function handleUndo() {
    const ctx = getContext();
    const snapshot = historyRef.current.pop();
    if (!ctx || !snapshot) return;
    ctx.putImageData(snapshot, 0, 0);
    setCanUndo(historyRef.current.length > 0);
  }

  function handleClear() {
    const ctx = getContext();
    if (!ctx || !canvasRef.current) return;
    pushHistory();
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="touch-target rounded-xl2 border-2 border-brand-300 bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
      >
        ✏️ Scratchpad
      </button>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Scratchpad" className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-0 sm:items-center sm:p-6">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-xl2 bg-white p-4 shadow-lg sm:rounded-xl2 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-brand-800">Scratchpad</h2>
              <button type="button" onClick={() => setOpen(false)} className="touch-target rounded-lg border px-3 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-50" aria-label="Close">
                ✕
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2" role="radiogroup" aria-label="Pen colour">
                {PEN_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    role="radio"
                    aria-checked={color === c.value}
                    aria-label={c.name}
                    onClick={() => setColor(c.value)}
                    className={`h-9 w-9 rounded-full border-2 ${color === c.value ? "border-brand-700" : "border-transparent"}`}
                    style={{ backgroundColor: c.value }}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={!canUndo}
                  className="touch-target rounded-lg border-2 border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                >
                  ↩️ Undo
                </button>
                <button type="button" onClick={handleClear} className="touch-target rounded-lg border-2 border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  🧹 Clear
                </button>
              </div>
            </div>

            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="mt-3 w-full touch-none rounded-xl2 border-2 border-slate-300 bg-white"
              style={{ aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}` }}
            />
            <p className="mt-2 text-center text-xs text-slate-400">Draw here to work things out — this is just for you, it isn&rsquo;t submitted as your answer.</p>
          </div>
        </div>
      )}
    </>
  );
}
