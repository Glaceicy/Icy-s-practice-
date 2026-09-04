import type { VisualAid } from "./types";

export const visuals = {
  tenFrame(filled: number): VisualAid {
    return { kind: "ten-frame", data: { filled } };
  },
  numberLine(min: number, max: number, highlight: number, start?: number): VisualAid {
    return { kind: "number-line", data: { min, max, highlight, start } };
  },
  barModel(parts: number[], total: number, unknownIndex?: number): VisualAid {
    return { kind: "bar-model", data: { parts, total, unknownIndex } };
  },
  array(rows: number, cols: number): VisualAid {
    return { kind: "array", data: { rows, cols } };
  },
  counters(count: number, groups?: number): VisualAid {
    return { kind: "counters", data: { count, groups } };
  },
  clock(hour: number, minute: number): VisualAid {
    return { kind: "clock", data: { hour, minute } };
  },
  coins(pence: number[]): VisualAid {
    return { kind: "coins", data: { pence } };
  },
  shape(shapeName: string, extra?: Record<string, unknown>): VisualAid {
    return { kind: "shape", data: { shapeName, ...extra } };
  },
  fractionDiagram(numerator: number, denominator: number, shape: "circle" | "bar" = "bar"): VisualAid {
    return { kind: "fraction-diagram", data: { numerator, denominator, shape } };
  },
  coordinateGrid(points: Array<[number, number]>, quadrants: 1 | 4 = 1): VisualAid {
    return { kind: "coordinate-grid", data: { points, quadrants } };
  },
  graph(type: "bar" | "line" | "pie", series: Array<{ label: string; value: number }>): VisualAid {
    return { kind: "graph", data: { type, series } };
  },
  algebraTile(xCount: number, unitCount: number): VisualAid {
    return { kind: "algebra-tile", data: { xCount, unitCount } };
  },
  probabilityDiagram(outcomes: Array<{ label: string; weight: number }>): VisualAid {
    return { kind: "probability-diagram", data: { outcomes } };
  }
};
