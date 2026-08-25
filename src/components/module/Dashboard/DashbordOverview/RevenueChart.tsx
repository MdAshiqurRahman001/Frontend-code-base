"use client";

import { useState } from "react";
import { TrendingUp, ArrowUpRight } from "lucide-react";

export interface RevenuePoint {
  month: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenuePoint[];
}

export const RevenueChart = ({ data = [] }: RevenueChartProps) => {
  const [timeframe, setTimeframe] = useState<"12M" | "30D" | "7D">("12M");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // SVG dimensions
  const width = 500;
  const height = 200;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxVal = 80000;

  // Compute coordinates
  const points = data.map((item, idx) => {
    const x = paddingLeft + (idx / Math.max(data.length - 1, 1)) * chartWidth;
    const y = height - paddingBottom - (item.revenue / maxVal) * chartHeight;
    return { x, y, ...item };
  });

  // Generate smooth cubic bezier curve
  const getBezierPath = () => {
    if (points.length === 0) return "";
    let path = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      path += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${p1.x},${p1.y}`;
    }
    return path;
  };

  const linePath = getBezierPath();
  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1].x},${height - paddingBottom} L ${points[0].x},${height - paddingBottom} Z`
      : "";

  const gridTicks = [0, 20000, 40000, 60000, 80000];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100/90 shadow-2xs flex flex-col h-full w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              Revenue Analytics
            </h3>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
              <TrendingUp className="w-3 h-3" /> +24.8%
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Total processed revenue across all contracts
          </p>
        </div>

        {/* Timeframe switch buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-100 rounded-xl w-fit">
          {(["7D", "30D", "12M"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                timeframe === t
                  ? "bg-white text-indigo-600 shadow-2xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {t === "7D" ? "7 Days" : t === "30D" ? "30 Days" : "12 Months"}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative flex-1 w-full min-h-[220px]">
        <svg
          className="w-full h-full overflow-visible"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="indigoAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity={0.0} />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#4F46E5" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Grid lines */}
          {gridTicks.map((tick) => {
            const y = height - paddingBottom - (tick / maxVal) * chartHeight;
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#F1F5F9"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[10px] fill-slate-400 font-semibold font-mono"
                >
                  {tick === 0 ? "$0" : `$${tick / 1000}k`}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaPath} fill="url(#indigoAreaGradient)" />

          {/* Curved Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#4F46E5"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />

          {/* Nodes */}
          {points.map((pt, idx) => (
            <g key={idx}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={12}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredIdx === idx ? 6 : 4}
                fill="#FFFFFF"
                stroke="#4F46E5"
                strokeWidth={hoveredIdx === idx ? 3 : 2}
                className="pointer-events-none transition-all duration-200"
              />
            </g>
          ))}

          {/* X Axis Labels */}
          {points.map((pt, idx) => (
            <text
              key={idx}
              x={pt.x}
              y={height - 8}
              textAnchor="middle"
              className="text-[10px] fill-slate-400 font-bold"
            >
              {pt.month}
            </text>
          ))}
        </svg>

        {/* Floating Tooltip */}
        {hoveredIdx !== null && (
          <div
            className="absolute bg-slate-900/95 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-xl pointer-events-none transition-all duration-200 border border-slate-700/50 backdrop-blur-md"
            style={{
              left: `${(points[hoveredIdx].x / width) * 100}%`,
              top: `${(points[hoveredIdx].y / height) * 100}%`,
              transform: "translate(-50%, -100%) translateY(-12px)",
            }}
          >
            <div className="text-[10px] text-slate-400 leading-none mb-1">
              {points[hoveredIdx].month} Revenue
            </div>
            <div className="font-extrabold text-white text-sm">
              ${points[hoveredIdx].revenue.toLocaleString()}.00
            </div>
          </div>
        )}
      </div>

      {/* Mini Footer Stat */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-medium">Average Monthly Growth</span>
        <span className="font-bold text-slate-800 flex items-center gap-1">
          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
          +$14,250.00 / mo
        </span>
      </div>
    </div>
  );
};

export default RevenueChart;
