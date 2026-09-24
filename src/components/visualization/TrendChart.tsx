import React, { useState, useMemo } from 'react';
import { Download, Calendar, Activity } from 'lucide-react';

interface MetricSeries {
  id: string;
  name: string;
  unit: string;
  color: string;
  data: number[];
}

interface TrendChartProps {
  timestamps: string[];
  series: MetricSeries[];
  title?: string;
  subtitle?: string;
}

export const TrendChart: React.FC<TrendChartProps> = ({
  timestamps,
  series,
  title = "Grafik Tren 24-Jam Multi-Parameter",
  subtitle = "Analisis fluktuasi beban dinamis, regangan mikro, dan suhu struktur"
}) => {
  const [selectedRange, setSelectedRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [activeSeriesIds, setActiveSeriesIds] = useState<string[]>(() => series.map(s => s.id));
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const toggleSeries = (id: string) => {
    setActiveSeriesIds(prev => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // keep at least one
        return prev.filter(s => s !== id);
      }
      return [...prev, id];
    });
  };

  const chartHeight = 220;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  // Compute bounding box
  const visibleSeries = series.filter(s => activeSeriesIds.includes(s.id));

  // Compute normalized values or scales for primary visible series
  const primarySeries = visibleSeries[0] || series[0];
  const minVal = useMemo(() => {
    if (!primarySeries) return 0;
    return Math.floor(Math.min(...primarySeries.data) * 0.9);
  }, [primarySeries]);

  const maxVal = useMemo(() => {
    if (!primarySeries) return 100;
    return Math.ceil(Math.max(...primarySeries.data) * 1.1);
  }, [primarySeries]);

  const downloadCSV = () => {
    const headers = ['Timestamp', ...series.map(s => `${s.name} (${s.unit})`)].join(',');
    const rows = timestamps.map((t, idx) => {
      return [t, ...series.map(s => s.data[idx] ?? '')].join(',');
    });
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `strulytic_shm_telemetry_${selectedRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 shadow-xs">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#0F4A8C]" />
            <h4 className="text-sm font-semibold text-[#0F172A]">{title}</h4>
          </div>
          <p className="text-xs text-[#475569] mt-0.5">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Range Selector */}
          <div className="inline-flex items-center p-0.5 bg-[#F1F5F9] rounded-md text-xs font-medium">
            {(['24h', '7d', '30d'] as const).map(range => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  selectedRange === range
                    ? 'bg-white text-[#0F4A8C] shadow-xs font-semibold'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {range === '24h' ? '24 Jam' : range === '7d' ? '7 Hari' : '30 Hari'}
              </button>
            ))}
          </div>

          {/* Download CSV */}
          <button
            onClick={downloadCSV}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#0F4A8C] bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-md transition-colors"
            title="Ekspor data telemetri ke CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* Series Toggles (Legend) */}
      <div className="flex flex-wrap items-center gap-3 mt-3 pt-1">
        {series.map(s => {
          const isActive = activeSeriesIds.includes(s.id);
          return (
            <button
              key={s.id}
              onClick={() => toggleSeries(s.id)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition-colors border ${
                isActive
                  ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] font-medium'
                  : 'bg-transparent border-transparent text-[#94A3B8] line-through'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: s.color }}
              />
              <span>{s.name} ({s.unit})</span>
            </button>
          );
        })}
      </div>

      {/* Chart SVG */}
      <div className="relative mt-4 w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 800 ${chartHeight}`}
          className="w-full h-52 overflow-visible"
          onMouseLeave={() => setHoverIndex(null)}
        >
          {/* Horizontal Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = paddingTop + ratio * (chartHeight - paddingTop - paddingBottom);
            const val = Math.round(maxVal - ratio * (maxVal - minVal));
            return (
              <g key={idx}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={800 - paddingRight}
                  y2={y}
                  stroke="#F1F5F9"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="#94A3B8"
                  className="font-mono"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Vertical Time Labels */}
          {timestamps.map((t, idx) => {
            if (idx % 4 !== 0 && idx !== timestamps.length - 1) return null;
            const x = paddingLeft + (idx / (timestamps.length - 1)) * (800 - paddingLeft - paddingRight);
            return (
              <g key={idx}>
                <line
                  x1={x}
                  y1={paddingTop}
                  x2={x}
                  y2={chartHeight - paddingBottom}
                  stroke="#F8FAFC"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={chartHeight - 10}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#64748B"
                  className="font-mono"
                >
                  {t}
                </text>
              </g>
            );
          })}

          {/* Series Lines */}
          {visibleSeries.map(s => {
            const sMin = Math.min(...s.data);
            const sMax = Math.max(...s.data);
            const sRange = sMax - sMin === 0 ? 1 : sMax - sMin;

            const points = s.data.map((val, idx) => {
              const x = paddingLeft + (idx / (s.data.length - 1)) * (800 - paddingLeft - paddingRight);
              const y = chartHeight - paddingBottom - ((val - sMin) / sRange) * (chartHeight - paddingTop - paddingBottom);
              return { x, y, val };
            });

            const pathD = `M ${points.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L ')}`;

            return (
              <g key={s.id}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={s.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {hoverIndex !== null && points[hoverIndex] && (
                  <circle
                    cx={points[hoverIndex].x}
                    cy={points[hoverIndex].y}
                    r="4"
                    fill="#FFFFFF"
                    stroke={s.color}
                    strokeWidth="2"
                  />
                )}
              </g>
            );
          })}

          {/* Hover interactive vertical line and detector columns */}
          {timestamps.map((_, idx) => {
            const x = paddingLeft + (idx / (timestamps.length - 1)) * (800 - paddingLeft - paddingRight);
            return (
              <rect
                key={idx}
                x={x - 15}
                y={paddingTop}
                width={30}
                height={chartHeight - paddingTop - paddingBottom}
                fill="transparent"
                className="cursor-crosshair"
                onMouseEnter={() => setHoverIndex(idx)}
              />
            );
          })}

          {hoverIndex !== null && (
            <line
              x1={paddingLeft + (hoverIndex / (timestamps.length - 1)) * (800 - paddingLeft - paddingRight)}
              y1={paddingTop}
              x2={paddingLeft + (hoverIndex / (timestamps.length - 1)) * (800 - paddingLeft - paddingRight)}
              y2={chartHeight - paddingBottom}
              stroke="#0F4A8C"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
          )}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoverIndex !== null && (
          <div
            className="absolute top-2 right-4 bg-white/95 backdrop-blur-xs border border-[#CBD5E1] rounded-lg p-2.5 shadow-md text-xs z-10 pointer-events-none min-w-44"
          >
            <div className="font-semibold text-[#0F172A] border-b border-[#E2E8F0] pb-1 mb-1.5 flex items-center justify-between">
              <span>Waktu: {timestamps[hoverIndex]}</span>
              <span className="text-[10px] text-[#00A896] font-mono">Real-time KAI</span>
            </div>
            <div className="space-y-1">
              {visibleSeries.map(s => (
                <div key={s.id} className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-1.5 text-[#475569]">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="truncate max-w-28">{s.name}:</span>
                  </span>
                  <span className="font-mono font-semibold text-[#0F172A] tabular-nums">
                    {s.data[hoverIndex]} {s.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#64748B] mt-2 pt-2 border-t border-[#F1F5F9]">
        <span>Penyelarasan Waktu: UTC+7 (WIB)</span>
        <span className="text-right">Frekuensi Sampling Dinamis: 100Hz Terkompresi</span>
      </div>
    </div>
  );
};
