import React, { useState } from 'react';

export function ResponsiveContainer({ width = '100%', height = 300, children }) {
  return (
    <div style={{ width: '100%', height: typeof height === 'number' ? `${height}px` : height, position: 'relative' }}>
      {children}
    </div>
  );
}

export function BarChart({ data = [], margin = { top: 20, right: 20, left: 20, bottom: 20 }, layout = 'horizontal', children }) {
  const isHorizontal = layout === 'vertical'; // vertical means bars horizontal
  const width = 580;
  const height = 280;

  // Extract keys and bars
  const bars = [];
  let xAxis = null;
  let yAxis = null;

  React.Children.forEach(children, child => {
    if (!child) return;
    if (child.type === Bar) bars.push(child);
    if (child.type === XAxis) xAxis = child;
    if (child.type === YAxis) yAxis = child;
  });

  const primaryKey = bars[0]?.props?.dataKey || 'value';
  const labelKey = isHorizontal ? yAxis?.props?.dataKey || 'name' : xAxis?.props?.dataKey || 'name';

  const maxVal = Math.max(...data.map(d => parseFloat(d[primaryKey]) || 0), 10);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%' }}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
          const y = height - 40 - pct * (height - 60);
          return (
            <line
              key={idx}
              x1={40}
              y1={y}
              x2={width - 20}
              y2={y}
              stroke="rgba(255,255,255,0.08)"
              strokeDasharray="3 3"
            />
          );
        })}

        {/* Bars */}
        {data.map((item, idx) => {
          const count = data.length;
          const barWidth = Math.max(8, Math.min(45, (width - 80) / count - 12));
          const x = 50 + idx * ((width - 70) / count) + ((width - 70) / count - barWidth) / 2;
          const val = parseFloat(item[primaryKey]) || 0;
          const barHeight = (val / maxVal) * (height - 70);
          const y = height - 40 - barHeight;

          const customCell = bars[0]?.props?.children;
          const fill = (Array.isArray(customCell) ? customCell[idx]?.props?.fill : customCell?.props?.fill) || bars[0]?.props?.fill || '#3b82f6';

          return (
            <g key={idx}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={fill}
                rx={4}
                style={{ transition: 'all 0.3s ease' }}
              />
              <text
                x={x + barWidth / 2}
                y={height - 24}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="10"
              >
                {String(item[labelKey] || '').slice(0, 8)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function LineChart({ data = [], children }) {
  const width = 580;
  const height = 280;

  const lines = [];
  React.Children.forEach(children, child => {
    if (child && child.type === Line) lines.push(child);
  });

  const maxVal = 70;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%' }}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
          const y = height - 40 - pct * (height - 60);
          return (
            <line
              key={idx}
              x1={40}
              y1={y}
              x2={width - 20}
              y2={y}
              stroke="rgba(255,255,255,0.08)"
              strokeDasharray="3 3"
            />
          );
        })}

        {lines.map((line, lIdx) => {
          const key = line.props.dataKey;
          const stroke = line.props.stroke || '#3b82f6';
          const points = data.map((d, idx) => {
            const x = 50 + idx * ((width - 80) / Math.max(1, data.length - 1));
            const y = height - 40 - ((parseFloat(d[key]) || 0) / maxVal) * (height - 60);
            return `${x},${y}`;
          });

          return (
            <g key={lIdx}>
              <polyline
                fill="none"
                stroke={stroke}
                strokeWidth={line.props.strokeWidth || 3}
                points={points.join(' ')}
              />
              {data.map((d, idx) => {
                const x = 50 + idx * ((width - 80) / Math.max(1, data.length - 1));
                const y = height - 40 - ((parseFloat(d[key]) || 0) / maxVal) * (height - 60);
                return (
                  <circle key={idx} cx={x} cy={y} r={4} fill={stroke} stroke="#0b132b" strokeWidth={2} />
                );
              })}
            </g>
          );
        })}

        {/* X Axis Labels */}
        {data.map((d, idx) => {
          const x = 50 + idx * ((width - 80) / Math.max(1, data.length - 1));
          return (
            <text key={idx} x={x} y={height - 20} textAnchor="middle" fill="#94a3b8" fontSize="10">
              {d.year || d.name || idx}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export function AreaChart({ data = [], children }) {
  const width = 580;
  const height = 280;
  const areas = [];
  const lines = [];

  React.Children.forEach(children, child => {
    if (!child) return;
    if (child.type === Area) areas.push(child);
    if (child.type === Line) lines.push(child);
  });

  const maxVal = 70;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%' }}>
        {areas.map((area, aIdx) => {
          const key = area.props.dataKey;
          const stroke = area.props.stroke || '#3b82f6';
          const fill = area.props.fill || `${stroke}30`;

          const pts = data.map((d, idx) => {
            const x = 50 + idx * ((width - 80) / Math.max(1, data.length - 1));
            const y = height - 40 - ((parseFloat(d[key]) || 0) / maxVal) * (height - 60);
            return { x, y };
          });

          const pathD = pts.length
            ? `M ${pts[0].x} ${height - 40} L ` +
              pts.map(p => `${p.x} ${p.y}`).join(' L ') +
              ` L ${pts[pts.length - 1].x} ${height - 40} Z`
            : '';

          return (
            <g key={aIdx}>
              <path d={pathD} fill={stroke} fillOpacity={0.25} />
              <polyline
                fill="none"
                stroke={stroke}
                strokeWidth={3}
                points={pts.map(p => `${p.x},${p.y}`).join(' ')}
              />
            </g>
          );
        })}

        {/* X Axis Labels */}
        {data.map((d, idx) => {
          const x = 50 + idx * ((width - 80) / Math.max(1, data.length - 1));
          return (
            <text key={idx} x={x} y={height - 20} textAnchor="middle" fill="#94a3b8" fontSize="10">
              {d.year || d.name || idx}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export function PieChart({ children }) {
  const width = 300;
  const height = 260;
  const cx = width / 2;
  const cy = height / 2;

  let pie = null;
  React.Children.forEach(children, child => {
    if (child && child.type === Pie) pie = child;
  });

  if (!pie) return null;

  const data = pie.props.data || [];
  const total = data.reduce((acc, curr) => acc + (parseFloat(curr[pie.props.dataKey]) || 0), 0) || 1;
  const outerR = pie.props.outerRadius || 80;
  const innerR = pie.props.innerRadius || 45;

  let startAngle = 0;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width, height }}>
        {data.map((item, idx) => {
          const val = parseFloat(item[pie.props.dataKey]) || 0;
          const sliceAngle = (val / total) * 2 * Math.PI;
          const endAngle = startAngle + sliceAngle;

          const x1 = cx + outerR * Math.cos(startAngle);
          const y1 = cy + outerR * Math.sin(startAngle);
          const x2 = cx + outerR * Math.cos(endAngle);
          const y2 = cy + outerR * Math.sin(endAngle);

          const ix1 = cx + innerR * Math.cos(endAngle);
          const iy1 = cy + innerR * Math.sin(endAngle);
          const ix2 = cx + innerR * Math.cos(startAngle);
          const iy2 = cy + innerR * Math.sin(startAngle);

          const largeArc = sliceAngle > Math.PI ? 1 : 0;
          const pathD = `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix2} ${iy2} Z`;

          const cells = pie.props.children;
          const fill = (Array.isArray(cells) ? cells[idx]?.props?.fill : cells?.props?.fill) || '#3b82f6';

          startAngle = endAngle;

          return (
            <path
              key={idx}
              d={pathD}
              fill={fill}
              stroke="#0b132b"
              strokeWidth={2}
              style={{ transition: 'all 0.2s ease', cursor: 'pointer' }}
            />
          );
        })}
      </svg>
    </div>
  );
}

export function ScatterChart({ data = [], children }) {
  const width = 500;
  const height = 260;

  let scatter = null;
  React.Children.forEach(children, child => {
    if (child && child.type === Scatter) scatter = child;
  });

  const scatterData = scatter?.props?.data || [];

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%' }}>
        {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => (
          <line
            key={idx}
            x1={40}
            y1={height - 40 - pct * (height - 60)}
            x2={width - 20}
            y2={height - 40 - pct * (height - 60)}
            stroke="rgba(255,255,255,0.08)"
            strokeDasharray="3 3"
          />
        ))}
        {scatterData.map((d, idx) => {
          const x = 50 + ((d.turnout - 40) / 20) * (width - 80);
          const y = height - 40 - (d.margin / 35) * (height - 60);

          return (
            <g key={idx}>
              <circle cx={x} cy={y} r={7} fill="#f97316" stroke="#ffffff" strokeWidth={2} />
              <text x={x + 10} y={y - 6} fill="#ffffff" fontSize="11" fontWeight="bold">
                {d.name} ({d.turnout}%, +{d.margin}%)
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export const Bar = () => null;
export const Line = () => null;
export const Area = () => null;
export const Pie = () => null;
export const Cell = () => null;
export const Scatter = () => null;
export const XAxis = () => null;
export const YAxis = () => null;
export const CartesianGrid = () => null;
export const Tooltip = () => null;
export const Legend = () => null;
