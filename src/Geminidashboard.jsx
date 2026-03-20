import React from 'react';
import { ConfigProvider } from 'antd';
import {
  Sun, Droplets, Gauge, Thermometer,
  Volume2, Move, Leaf, Wind, Cigarette, CloudFog,
} from 'lucide-react';

const WAVEFORM_HEIGHTS = [6, 12, 20, 15, 24, 18, 9, 22, 28, 14, 20, 11, 25, 18, 7, 14, 21, 13, 17, 9];

/* ─── Shared helpers ─────────────────────────────────────────────── */

const Dot = ({ color = 'green' }) => {
  const bg = { green: '#16a34a', yellow: '#ca8a04', red: '#dc2626' };
  return (
    <span
      style={{
        display: 'inline-block',
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: bg[color],
        flexShrink: 0,
      }}
    />
  );
};

const Panel = ({ title, children, className = '' }) => (
  <div
    className={className}
    style={{
      background: '#e5e7eb',
      border: '1px solid #d1d5db',
      borderRadius: 12,
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}
  >
    <p
      style={{
        color: '#374151',
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        margin: 0,
      }}
    >
      {title}
    </p>
    <div style={{ flex: 1 }}>{children}</div>
  </div>
);

const MoleculeIcon = () => (
  <svg viewBox="0 0 40 40" width="44" height="44">
    <circle cx="20" cy="6"  r="5" fill="#6b7280" />
    <circle cx="6"  cy="32" r="5" fill="#6b7280" />
    <circle cx="34" cy="32" r="5" fill="#6b7280" />
    <line x1="20" y1="6"  x2="6"  y2="32" stroke="#9ca3af" strokeWidth="2" />
    <line x1="20" y1="6"  x2="34" y2="32" stroke="#9ca3af" strokeWidth="2" />
    <line x1="6"  y1="32" x2="34" y2="32" stroke="#9ca3af" strokeWidth="2" />
  </svg>
);

const AQIBar = ({ value, max = 300 }) => {
  const pct = Math.min((value / max) * 100, 97);
  return (
    <div style={{ position: 'relative', marginBottom: 18 }}>
      <div
        style={{
          height: 16,
          borderRadius: 8,
          background:
            'linear-gradient(to right, #22c55e 0%, #84cc16 20%, #eab308 40%, #f97316 60%, #ef4444 80%, #7f1d1d 100%)',
        }}
      />
      <svg
        style={{
          position: 'absolute',
          bottom: -10,
          left: `${pct}%`,
          transform: 'translateX(-50%)',
        }}
        width="14"
        height="10"
        viewBox="0 0 14 10"
      >
        <polygon points="7,0 0,10 14,10" fill="#374151" />
      </svg>
    </div>
  );
};

const ContaminantCircle = ({ Icon, label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
    <div
      style={{
        width: 58,
        height: 58,
        borderRadius: '50%',
        background: '#15803d',
        border: '2px solid #16a34a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon size={22} color="white" />
    </div>
    <span style={{ color: '#111827', fontSize: 11, fontWeight: 700, textAlign: 'center' }}>{label}</span>
    <span style={{ color: '#4b5563', fontSize: 10, textAlign: 'center' }}>{value}</span>
  </div>
);

/* ─── Dashboard ──────────────────────────────────────────────────── */

export default function GeminiDashboard() {
  return (
    <ConfigProvider>
      {/* responsive page wrapper */}
      <div
        style={{
          minHeight: '100vh',
          background: '#f3f4f6',
          padding: '16px',
          fontFamily: 'Inter, system-ui, sans-serif',
          boxSizing: 'border-box',
        }}
      >
        {/* responsive grid: 1 col mobile → 2 col tablet → 3 col desktop */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: 12, maxWidth: 1280, margin: '0 auto' }}
        >

          {/* ── ENVIRONMENT ─────────────────────────────────────── */}
          <Panel title="Environment">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {[
                  { Icon: Sun,      label: 'Light Level', val: '81 lux'    },
                  { Icon: Droplets, label: 'Humidity',    val: '37% RH'    },
                  { Icon: Gauge,    label: 'Pressure',    val: '944.5 hPa' },
                ].map(({ Icon, label, val }) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <Icon size={28} color="#374151" />
                    <span style={{ color: '#6b7280', fontSize: 10 }}>{label}</span>
                    <span style={{ color: '#111827', fontSize: 11, fontWeight: 700 }}>{val}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Thermometer size={22} color="#374151" />
                <span style={{ color: '#111827', fontSize: 40, fontWeight: 900, lineHeight: 1 }}>29°C</span>
                <span style={{ color: '#6b7280', fontSize: 13 }}>85°F</span>
              </div>
            </div>
          </Panel>

          {/* ── AIR PARTICULATES ────────────────────────────────── */}
          <Panel title="Air Particulates">
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              {[
                { name: 'PM1',   val: '16 μg/m³', color: 'green'  },
                { name: 'PM2.5', val: '17 μg/m³', color: 'yellow' },
                { name: 'PM10',  val: '17 μg/m³', color: 'yellow' },
              ].map((pm) => (
                <div key={pm.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                  <MoleculeIcon />
                  <span style={{ color: '#111827', fontSize: 13, fontWeight: 700 }}>{pm.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Dot color={pm.color} />
                    <span style={{ color: '#111827', fontSize: 12, fontWeight: 600 }}>{pm.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* ── GASES ───────────────────────────────────────────── */}
          <Panel title="Gases">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <p style={{ color: '#dc2626', fontSize: 28, fontWeight: 900, lineHeight: 1, margin: 0 }}>3000 ppm</p>
                <p style={{ color: '#111827', fontSize: 13, fontWeight: 700, marginTop: 4 }}>CO₂cal</p>
                <p style={{ color: '#dc2626', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', marginTop: 2 }}>HAZARDOUS</p>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', gap: 7 }}>
                {[
                  { name: 'CO',   val: '2.2 ppm', color: 'green' },
                  { name: 'NH₃',  val: '0.0 ppm', color: 'green' },
                  { name: 'NO₂',  val: '4 ppb',   color: 'green' },
                  { name: 'TVOC', val: '400 ppb',  color: 'green' },
                ].map((g) => (
                  <div key={g.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Dot color={g.color} />
                    <span style={{ color: '#4b5563', fontSize: 11, minWidth: 34 }}>{g.name}</span>
                    <span style={{ color: '#111827', fontSize: 11, fontWeight: 700 }}>{g.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          {/* ── CONTAMINANTS ────────────────────────────────────── */}
          <Panel title="Contaminants">
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 10 }}>
              <ContaminantCircle Icon={Wind}      label="Vape"    value="None Detected" />
              <ContaminantCircle Icon={Leaf}      label="THC"     value="None Detected" />
              <ContaminantCircle Icon={CloudFog}  label="Masking" value="None Detected" />
              <ContaminantCircle Icon={Cigarette} label="Smoking" value="None Detected" />
            </div>
          </Panel>

          {/* ── AIR QUALITY INDEX ───────────────────────────────── */}
          <Panel title="Air Quality Index (AQI)">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div
                style={{
                  background: '#eab308',
                  color: '#111827',
                  borderRadius: 10,
                  width: 76,
                  height: 76,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 38,
                  fontWeight: 900,
                  flexShrink: 0,
                }}
              >
                85
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <AQIBar value={85} />
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {[
                    { label: 'PM2.5:', val: '85', color: 'yellow' },
                    { label: 'PM10:',  val: '26', color: 'green'  },
                  ].map((item) => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Dot color={item.color} />
                      <span style={{ color: '#4b5563', fontSize: 11 }}>{item.label}</span>
                      <span style={{ color: '#111827', fontSize: 11, fontWeight: 700 }}>{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Panel>

          {/* ── HEALTH INDEX ────────────────────────────────────── */}
          <Panel title="Health Index">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap' }}>
              <div
                style={{
                  background: '#dc2626',
                  borderRadius: 10,
                  width: 76,
                  height: 76,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 38, fontWeight: 900, lineHeight: 1 }}>5</span>
                <span style={{ fontSize: 9, textAlign: 'center', lineHeight: 1.3, marginTop: 2 }}>
                  Hazardous<br />Condition
                </span>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '7px 18px',
                  marginTop: 4,
                }}
              >
                {[
                  { name: 'CO₂cal', color: 'red'    },
                  { name: 'PM2.5',  color: 'yellow' },
                  { name: 'PM2.5',  color: 'yellow' },
                  { name: 'TVOC',   color: 'green'  },
                  { name: 'PM1',    color: 'green'  },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Dot color={item.color} />
                    <span style={{ color: '#111827', fontSize: 11, fontWeight: 600 }}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          {/* ── ROOM OCCUPANCY ──────────────────────────────────── */}
          <Panel title="Room Occupancy">
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingTop: 6 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ color: '#4b5563', fontSize: 13 }}>Motion</span>
                <span style={{ color: '#111827', fontSize: 48, fontWeight: 900, lineHeight: 1.1 }}>187</span>
              </div>
              <div style={{ width: 1, height: 50, background: '#d1d5db' }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ color: '#4b5563', fontSize: 13 }}>People Count</span>
                <span style={{ color: '#111827', fontSize: 48, fontWeight: 900, lineHeight: 1.1 }}>2</span>
              </div>
            </div>
          </Panel>

          {/* ── SOUND LEVEL ─────────────────────────────────────── */}
          <Panel title="Sound Level">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Volume2 size={36} color="#374151" style={{ flexShrink: 0 }} />
              <div>
                <p style={{ color: '#4b5563', fontSize: 11, margin: 0 }}>Total Level</p>
                <p style={{ color: '#111827', fontSize: 22, fontWeight: 700, margin: 0 }}>62 db</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 32 }}>
              {WAVEFORM_HEIGHTS.map((h, i) => (
                <div
                  key={i}
                  style={{ flex: 1, height: h, background: '#9ca3af', borderRadius: 2 }}
                />
              ))}
            </div>
            <p style={{ color: '#9ca3af', fontSize: 10, textAlign: 'right', margin: 0 }}>
              Device 3/18/2026, 12:47:41 PM
            </p>
          </Panel>

          {/* ── MOVEMENT ────────────────────────────────────────── */}
          <Panel title="Movement">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Move size={42} color="#374151" style={{ flexShrink: 0 }} />
              <div>
                <p style={{ color: '#4b5563', fontSize: 11, margin: 0 }}>Move</p>
                <p style={{ color: '#111827', fontSize: 22, fontWeight: 700, margin: 0 }}>25 mm/100</p>
                <p style={{ color: '#4b5563', fontSize: 11, marginTop: 4 }}>X:-23, Y:2, Z:-1074 mg</p>
              </div>
            </div>
          </Panel>

        </div>
      </div>
    </ConfigProvider>
  );
}
