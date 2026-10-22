import React, { createContext, useContext, useState, useEffect } from 'react';
import './mantine.css';

const ColorSchemeContext = createContext({
  colorScheme: 'dark',
  setColorScheme: () => {}
});

export const useMantineColorScheme = () => useContext(ColorSchemeContext);

export const createTheme = (theme) => theme;
export const rem = (px) => `${px / 16}rem`;

export function MantineProvider({ children, defaultColorScheme = 'dark' }) {
  const [colorScheme, setColorScheme] = useState(defaultColorScheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-mantine-color-scheme', colorScheme);
  }, [colorScheme]);

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>
      <div data-mantine-color-scheme={colorScheme} style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </ColorSchemeContext.Provider>
  );
}

export function Container({ size = 'md', children, style, ...props }) {
  const maxWidth = size === 'xl' ? 1400 : size === 'lg' ? 1140 : size === 'sm' ? 720 : 960;
  return (
    <div className="mantine-Container-root" style={{ maxWidth, ...style }} {...props}>
      {children}
    </div>
  );
}

export function Paper({ p = 'md', radius = 'md', withBorder, children, style, className = '', ...props }) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const paddingMap = { xs: '8px', sm: '12px', md: '16px', lg: '24px', xl: '32px' };
  const pad = paddingMap[p] || p;

  return (
    <div
      className={`mantine-Paper-root ${className}`}
      style={{
        padding: pad,
        borderRadius: radius === 'md' ? '8px' : radius === 'sm' ? '4px' : '12px',
        border: withBorder ? `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` : 'none',
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
        color: isDark ? '#f8fafc' : '#0f172a',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function Card(props) {
  return <Paper {...props} />;
}

export function Group({ justify = 'flex-start', align = 'center', gap = 'md', wrap = 'wrap', children, style, ...props }) {
  const gapMap = { xs: '6px', sm: '10px', md: '16px', lg: '24px', xl: '32px' };
  const g = gapMap[gap] || (typeof gap === 'number' ? `${gap}px` : gap);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: justify === 'space-between' ? 'space-between' : justify,
        alignItems: align,
        gap: g,
        flexWrap: wrap,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function Stack({ justify = 'flex-start', align = 'stretch', gap = 'md', children, style, ...props }) {
  const gapMap = { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px' };
  const g = gapMap[gap] || (typeof gap === 'number' ? `${gap}px` : gap);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: justify,
        alignItems: align,
        gap: g,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function Title({ order = 1, children, style, fw, c, mb, ...props }) {
  const sizes = { 1: '2.2rem', 2: '1.75rem', 3: '1.4rem', 4: '1.15rem', 5: '1rem', 6: '0.85rem' };
  const Tag = `h${order}`;

  return (
    <Tag
      style={{
        margin: 0,
        marginBottom: mb ? (typeof mb === 'number' ? `${mb}px` : mb) : 0,
        fontSize: sizes[order] || '1.25rem',
        fontWeight: fw || 700,
        color: c || 'inherit',
        lineHeight: 1.25,
        ...style
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Text({ size = 'md', fw = 400, c, children, style, mt, mb, ...props }) {
  const sizes = { xs: '12px', sm: '13px', md: '14px', lg: '16px', xl: '18px' };
  const colorMap = {
    dimmed: '#94a3b8',
    teal: '#14b8a6',
    red: '#ef4444',
    orange: '#f97316',
    'orange.7': '#ea580c',
    green: '#22c55e',
    'green.7': '#16a34a',
    blue: '#3b82f6',
    white: '#ffffff'
  };

  return (
    <div
      style={{
        fontSize: sizes[size] || size,
        fontWeight: fw,
        color: colorMap[c] || c || 'inherit',
        marginTop: mt ? (typeof mt === 'number' ? `${mt}px` : mt) : undefined,
        marginBottom: mb ? (typeof mb === 'number' ? `${mb}px` : mb) : undefined,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function Badge({ color = 'blue', variant = 'filled', size = 'sm', children, style, leftSection, ...props }) {
  const bgMap = {
    blue: '#2563eb',
    orange: '#ea580c',
    teal: '#0d9488',
    green: '#16a34a',
    red: '#dc2626',
    indigo: '#4f46e5',
    violet: '#7c3aed',
    grape: '#9333ea',
    cyan: '#0891b2',
    gray: '#475569',
    yellow: '#d97706'
  };

  const bg = bgMap[color] || color;

  return (
    <span
      className="mantine-Badge-root"
      style={{
        backgroundColor: variant === 'filled' ? bg : variant === 'light' ? `${bg}25` : 'transparent',
        color: variant === 'filled' ? '#ffffff' : bg,
        border: variant === 'outline' ? `1px solid ${bg}` : 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        ...style
      }}
      {...props}
    >
      {leftSection}
      {children}
    </span>
  );
}

export function Button({ variant = 'filled', color = 'blue', size = 'sm', leftSection, children, onClick, style, ...props }) {
  const bgMap = {
    blue: '#2563eb',
    gray: '#475569',
    indigo: '#4f46e5',
    teal: '#0d9488',
    default: 'transparent'
  };

  const isLight = variant === 'light';
  const isSubtle = variant === 'subtle';
  const isDefault = variant === 'default';

  return (
    <button
      className="mantine-Button-root"
      onClick={onClick}
      style={{
        padding: size === 'xs' ? '4px 10px' : size === 'sm' ? '6px 14px' : '8px 18px',
        fontSize: size === 'xs' ? '12px' : '13px',
        backgroundColor: isLight ? `${bgMap[color] || '#3b82f6'}20` : isSubtle ? 'transparent' : isDefault ? 'rgba(255,255,255,0.06)' : bgMap[color] || color,
        color: isLight || isSubtle ? bgMap[color] || '#3b82f6' : '#ffffff',
        border: isDefault ? '1px solid rgba(255,255,255,0.15)' : 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        ...style
      }}
      {...props}
    >
      {leftSection}
      {children}
    </button>
  );
}

export function ActionIcon({ children, onClick, size = 'md', variant = 'default', style, ...props }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: size === 'lg' ? '36px' : '28px',
        height: size === 'lg' ? '36px' : '28px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        border: '1px solid rgba(255,255,255,0.15)',
        backgroundColor: 'rgba(255,255,255,0.05)',
        cursor: 'pointer',
        color: 'inherit',
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export function ThemeIcon({ children, color = 'blue', size = 'md', radius = 'md', variant = 'light', style, ...props }) {
  const bgMap = {
    blue: '#3b82f6',
    orange: '#f97316',
    green: '#10b981',
    teal: '#14b8a6',
    indigo: '#6366f1',
    grape: '#a855f7',
    cyan: '#06b6d4',
    violet: '#8b5cf6'
  };

  const col = bgMap[color] || color;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size === 'xl' ? '48px' : size === 'lg' ? '38px' : '28px',
        height: size === 'xl' ? '48px' : size === 'lg' ? '38px' : '28px',
        borderRadius: radius === 'xl' ? '50%' : '8px',
        backgroundColor: variant === 'filled' ? col : `${col}20`,
        color: variant === 'filled' ? '#ffffff' : col,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function Grid({ gutter = 'md', children, style, ...props }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: gutter === 'xl' ? '24px' : gutter === 'lg' ? '18px' : '14px',
        width: '100%',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

Grid.Col = function GridCol({ span = 12, children, style, ...props }) {
  const colSpan = typeof span === 'object' ? span.lg || span.md || span.sm || span.base || 12 : span;
  return (
    <div
      style={{
        gridColumn: `span ${colSpan}`,
        minWidth: 0,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export function SimpleGrid({ cols = 1, spacing = 'md', children, style, ...props }) {
  const c = typeof cols === 'object' ? cols.md || cols.sm || cols.base || 1 : cols;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${c}, minmax(0, 1fr))`,
        gap: spacing === 'xs' ? '8px' : '16px',
        width: '100%',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function Tabs({ value, onChange, children, ...props }) {
  return (
    <div {...props}>
      {React.Children.map(children, child => {
        if (!child) return null;
        return React.cloneElement(child, { activeTab: value, onTabChange: onChange });
      })}
    </div>
  );
}

Tabs.List = function TabsList({ children, activeTab, onTabChange, style, ...props }) {
  return (
    <div className="mantine-Tabs-list" style={{ ...style }} {...props}>
      {React.Children.map(children, child => {
        if (!child) return null;
        return React.cloneElement(child, {
          isActive: child.props.value === activeTab,
          onSelect: () => onTabChange(child.props.value)
        });
      })}
    </div>
  );
};

Tabs.Tab = function TabsTab({ children, leftSection, isActive, onSelect, value, ...props }) {
  return (
    <button
      className="mantine-Tabs-tab"
      data-active={isActive ? 'true' : undefined}
      onClick={onSelect}
      type="button"
      {...props}
    >
      {leftSection}
      {children}
    </button>
  );
};

Tabs.Panel = function TabsPanel({ value, activeTab, children, ...props }) {
  if (value !== activeTab) return null;
  return <div style={{ marginTop: '1rem' }} {...props}>{children}</div>;
};

export function Select({ data = [], value, onChange, placeholder, style, ...props }) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        padding: '6px 12px',
        borderRadius: '6px',
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
        color: isDark ? '#f8fafc' : '#0f172a',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
        fontFamily: 'inherit',
        fontSize: '13px',
        ...style
      }}
      {...props}
    >
      {data.map(item => {
        const val = typeof item === 'object' ? item.value : item;
        const label = typeof item === 'object' ? item.label : item;
        return <option key={val} value={val}>{label}</option>;
      })}
    </select>
  );
}

export function TextInput({ value, onChange, placeholder, leftSection, style, ...props }) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', ...style }}>
      {leftSection && <span style={{ position: 'absolute', left: 10, color: '#94a3b8' }}>{leftSection}</span>}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: leftSection ? '7px 12px 7px 34px' : '7px 12px',
          borderRadius: '6px',
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          color: isDark ? '#f8fafc' : '#0f172a',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
          fontFamily: 'inherit',
          fontSize: '13px'
        }}
        {...props}
      />
    </div>
  );
}

export function SegmentedControl({ data = [], value, onChange, size = 'sm', color = 'blue', style }) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <div
      style={{
        display: 'inline-flex',
        padding: '3px',
        borderRadius: '8px',
        backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
        ...style
      }}
    >
      {data.map(item => {
        const val = typeof item === 'object' ? item.value : item;
        const label = typeof item === 'object' ? item.label : item;
        const isSelected = val === value;

        return (
          <button
            key={val}
            type="button"
            onClick={() => onChange(val)}
            style={{
              padding: size === 'sm' ? '4px 12px' : '6px 16px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              backgroundColor: isSelected ? '#2563eb' : 'transparent',
              color: isSelected ? '#ffffff' : isDark ? '#94a3b8' : '#64748b',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export function Slider({ value, onChange, min = 0, max = 100, step = 1, marks = [], color = 'blue', style }) {
  return (
    <div style={{ width: '100%', padding: '8px 0', ...style }}>
      <input
        type="range"
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        min={min}
        max={max}
        step={step}
        style={{ width: '100%', cursor: 'pointer' }}
      />
      {marks.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginTop: 4 }}>
          {marks.map(m => (
            <span key={m.value}>{m.label}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export function Switch({ checked, onChange, label, description, style }) {
  return (
    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', ...style }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ marginTop: '3px', cursor: 'pointer', width: '16px', height: '16px' }}
      />
      <div>
        <div style={{ fontSize: '13px', fontWeight: 600 }}>{label}</div>
        {description && <div style={{ fontSize: '11px', color: '#94a3b8' }}>{description}</div>}
      </div>
    </label>
  );
}

export function Table({ striped, highlightOnHover, withTableBorder, withColumnBorders, children, style, ...props }) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '13px',
        border: withTableBorder ? `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` : 'none',
        ...style
      }}
      {...props}
    >
      {children}
    </table>
  );
}

Table.ScrollContainer = function TableScrollContainer({ minWidth, children }) {
  return (
    <div style={{ overflowX: 'auto', width: '100%' }}>
      <div style={{ minWidth }}>{children}</div>
    </div>
  );
};

Table.Thead = function TableThead({ children }) {
  return <thead style={{ backgroundColor: 'rgba(255,255,255,0.03)', textAlign: 'left' }}>{children}</thead>;
};

Table.Tbody = function TableTbody({ children }) {
  return <tbody>{children}</tbody>;
};

Table.Tr = function TableTr({ children, style, ...props }) {
  return <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', ...style }} {...props}>{children}</tr>;
};

Table.Th = function TableTh({ children, style, ...props }) {
  return (
    <th style={{ padding: '8px 12px', fontWeight: 700, color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', ...style }} {...props}>
      {children}
    </th>
  );
};

Table.Td = function TableTd({ children, fw, c, style, ...props }) {
  return (
    <td style={{ padding: '8px 12px', fontWeight: fw || 400, color: c || 'inherit', ...style }} {...props}>
      {children}
    </td>
  );
};

export function Progress({ value = 0, color = 'blue', size = 'sm', style }) {
  const colMap = { red: '#ef4444', orange: '#f97316', yellow: '#eab308', green: '#22c55e', blue: '#3b82f6' };
  const h = size === 'sm' ? '6px' : '10px';

  return (
    <div style={{ width: '100%', height: h, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden', ...style }}>
      <div style={{ width: `${Math.min(100, Math.max(0, value))}%`, height: '100%', backgroundColor: colMap[color] || color, borderRadius: '999px' }} />
    </div>
  );
}

export function RingProgress({ size = 120, thickness = 12, sections = [], label, style }) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = sections[0]?.value || 0;
  const strokeDashoffset = circumference - (pct / 100) * circumference;
  const col = sections[0]?.color || '#3b82f6';

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth={thickness} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={col}
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {label}
      </div>
    </div>
  );
}

export function Tooltip({ label, children }) {
  return (
    <span title={typeof label === 'string' ? label : undefined} style={{ display: 'inline-flex' }}>
      {children}
    </span>
  );
}

export function Alert({ icon, title, color = 'blue', children, style }) {
  return (
    <div
      style={{
        padding: '12px 16px',
        borderRadius: '8px',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        ...style
      }}
    >
      {icon && <div style={{ marginTop: '2px', color: '#60a5fa' }}>{icon}</div>}
      <div>
        {title && <div style={{ fontWeight: 700, fontSize: '13px', color: '#93c5fd', marginBottom: '2px' }}>{title}</div>}
        <div style={{ fontSize: '12px', lineHeight: 1.5, color: '#e2e8f0' }}>{children}</div>
      </div>
    </div>
  );
}

export function Modal({ opened, onClose, title, children }) {
  if (!opened) return null;

  return (
    <div className="mantine-Modal-overlay" onClick={onClose}>
      <div className="mantine-Modal-content" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
          <div>{title}</div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Divider({ style }) {
  return <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '1rem 0', ...style }} />;
}

export function Loader({ size = 'md', color = 'blue' }) {
  return (
    <div style={{ display: 'inline-block', width: '28px', height: '28px', border: '3px solid rgba(59,130,246,0.3)', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export function Code({ block, children, style }) {
  return (
    <pre style={{ backgroundColor: '#0f172a', padding: '8px 12px', borderRadius: '6px', color: '#38bdf8', fontSize: '12px', fontFamily: 'monospace', overflowX: 'auto', ...style }}>
      {children}
    </pre>
  );
}
