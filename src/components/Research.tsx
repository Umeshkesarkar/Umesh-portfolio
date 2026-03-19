import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { reports, Report } from '../data/reports';

// ─── accent config ────────────────────────────────────────────────────────────
const ACCENT: Record<Report['rating'], { color: string; rgb: string }> = {
  BUY: { color: '#10b981', rgb: '16,185,129' },
  WATCH: { color: '#f59e0b', rgb: '245,158,11' },
  AVOID: { color: '#ef4444', rgb: '239,68,68' },
};

// ─── inject card CSS once (avoids external file dependency) ──────────────────
const CARD_CSS = `
.rc-card{
  position:relative;overflow:hidden;flex-shrink:0;
  width:300px;min-height:380px;
  background:#111111;
  border:1px solid rgba(255,255,255,0.06);
  border-radius:16px;
  transition:transform .45s cubic-bezier(.16,1,.3,1),
             box-shadow .45s cubic-bezier(.16,1,.3,1),
             border-color .3s;
  cursor:default;
}
.rc-card:hover{
  transform:translateY(-10px);
  box-shadow:0 24px 40px -8px rgba(0,0,0,.6),
             0 0 0 1px rgba(var(--a-rgb),.18);
  border-color:rgba(var(--a-rgb),.3);
}
.rc-shine{
  position:absolute;inset:0;border-radius:16px;z-index:3;
  pointer-events:none;
  background:linear-gradient(120deg,
    rgba(255,255,255,0) 30%,
    rgba(255,255,255,.06) 50%,
    rgba(255,255,255,0) 70%);
  background-size:200% 100%;
  opacity:0;transition:opacity .3s;
}
.rc-card:hover .rc-shine{opacity:1;animation:rc-shine 2s infinite;}
@keyframes rc-shine{
  0%  {background-position:-100% 0;}
  100%{background-position: 200% 0;}
}
.rc-glow{
  position:absolute;inset:-8px;border-radius:24px;z-index:0;
  pointer-events:none;
  background:radial-gradient(circle at 50% 0%,var(--a-color) 0%,transparent 65%);
  opacity:0;transition:opacity .5s;
}
.rc-card:hover .rc-glow{opacity:.18;}
.rc-top-grid{
  position:absolute;inset:0;
  background:repeating-linear-gradient(
    45deg,
    rgba(255,255,255,.015) 0,rgba(255,255,255,.015) 1px,
    transparent 1px,transparent 12px);
}
.rc-icon-btn{
  width:28px;height:28px;border-radius:6px;
  display:flex;align-items:center;justify-content:center;
  background:#1a1a1a;border:1px solid #2a2a2a;
  color:#6b7280;text-decoration:none;
  transition:background .2s,border-color .2s,color .2s;
}
.rc-icon-btn:hover{background:#1e3a5f;border-color:rgba(59,130,246,.4);color:#60a5fa;}
.rc-read-btn{
  display:flex;align-items:center;gap:6px;
  padding:8px 16px;border-radius:6px;
  background:#2563eb;color:#fff;text-decoration:none;
  font-size:11px;font-weight:700;letter-spacing:.6px;
  transition:background .2s;border:none;cursor:pointer;
}
.rc-read-btn:hover{background:#1d4ed8;}
.rc-progress-track{width:100%;height:2px;background:#1f2937;border-radius:1px;margin-top:8px;}
.rc-progress-fill{height:2px;background:#3b82f6;border-radius:1px;transition:width .1s ease;}
`;

function useInjectCSS(css: string) {
  useEffect(() => {
    const id = 'rc-styles';
    if (document.getElementById(id)) return;
    const el = document.createElement('style');
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
    return () => { document.getElementById(id)?.remove(); };
  }, []);
}

// ─── SVG icons (no external dep needed for tiny icons) ───────────────────────
const IconLinkedIn = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const IconX = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const IconDownload = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const IconBack = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

// ─── Card ─────────────────────────────────────────────────────────────────────
const ResearchCard: React.FC<{ report: Report }> = ({ report }) => {
  const ac = ACCENT[report.rating];
  const tickerSymbol = report.ticker.includes(':')
    ? report.ticker.split(':')[1].trim()
    : report.ticker;

  return (
    <div
      className="rc-card"
      style={{ '--a-color': ac.color, '--a-rgb': ac.rgb } as React.CSSProperties}
    >
      <div className="rc-shine" />
      <div className="rc-glow" />

      {/* ── top panel ── */}
      <div
        style={{
          height: 130,
          background: 'linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="rc-top-grid" />

        {/* watermark ticker */}
        <span style={{
          position: 'absolute', right: -8, bottom: -8,
          fontSize: 64, fontWeight: 900, color: 'rgba(255,255,255,0.04)',
          fontFamily: 'monospace', lineHeight: 1, userSelect: 'none', zIndex: 1,
        }}>
          {tickerSymbol}
        </span>

        {/* rating pill */}
        <span style={{
          position: 'absolute', top: 14, left: 14, zIndex: 2,
          fontSize: 11, fontWeight: 700, letterSpacing: '1.5px',
          padding: '4px 12px', borderRadius: 999,
          border: `1px solid ${ac.color}`, color: ac.color,
          background: 'rgba(255,255,255,0.04)',
        }}>
          {report.rating}
        </span>

        {/* target upside */}
        <div style={{
          position: 'absolute', top: 14, right: 16, zIndex: 2, textAlign: 'right',
        }}>
          <div style={{
            fontSize: 24, fontWeight: 800, fontFamily: 'monospace',
            lineHeight: 1, color: ac.color,
          }}>
            {report.targetUpside}
          </div>
          <div style={{
            fontSize: 10, color: '#6b7280', letterSpacing: '1.5px', marginTop: 2,
          }}>
            TARGET
          </div>
        </div>
      </div>

      {/* ── body ── */}
      <div style={{
        padding: '18px 20px',
        display: 'flex', flexDirection: 'column', gap: 10,
        position: 'relative', zIndex: 2,
      }}>
        {/* company name */}
        <h3 style={{
          fontSize: 18, fontWeight: 700, color: '#f1f5f9',
          lineHeight: 1.2, margin: 0,
          transition: 'color .3s',
        }}>
          {report.company}
        </h3>

        {/* meta row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{
            fontSize: 11, color: '#6b7280', fontFamily: 'monospace', fontWeight: 700,
          }}>
            {report.ticker}
          </span>
          <span style={{
            fontSize: 10, padding: '2px 6px', background: '#1f2937',
            color: '#6b7280', borderRadius: 4, fontWeight: 700,
            letterSpacing: '.5px', textTransform: 'uppercase',
          }}>
            {report.marketCap}
          </span>
          <span style={{
            fontSize: 11, color: '#60a5fa', padding: '2px 8px',
            background: 'rgba(59,130,246,0.08)',
            border: '1px solid rgba(59,130,246,0.2)', borderRadius: 4,
          }}>
            {report.sector}
          </span>
          <span style={{
            fontSize: 10, color: '#4b5563', fontFamily: 'monospace', marginLeft: 'auto',
          }}>
            {report.date}
          </span>
        </div>

        {/* thesis */}
        <p style={{
          fontSize: 13, color: '#9ca3af', lineHeight: 1.65,
          margin: 0, flexGrow: 1,
        }}>
          {report.thesis}
        </p>

        {/* tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {report.tags.map(tag => (
            <span key={tag} style={{
              fontSize: 9, padding: '2px 7px',
              background: '#1a1a1a', border: '1px solid #2a2a2a',
              color: '#6b7280', borderRadius: 4,
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: 10, borderTop: '1px solid #1f2937', marginTop: 4,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {report.linkedinUrl && (
              <a href={report.linkedinUrl} target="_blank" rel="noopener noreferrer"
                className="rc-icon-btn" title="LinkedIn post">
                <IconLinkedIn />
              </a>
            )}
            {report.twitterUrl && (
              <a href={report.twitterUrl} target="_blank" rel="noopener noreferrer"
                className="rc-icon-btn" title="X / Twitter post">
                <IconX />
              </a>
            )}
          </div>
          <a href={report.pdfUrl} target="_blank" rel="noopener noreferrer"
            className="rc-read-btn">
            <IconDownload />
            READ REPORT
          </a>
        </div>
      </div>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const Research: React.FC = () => {
  useInjectCSS(CARD_CSS);
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? (el.scrollLeft / max) * 100 : 0);
  };

  return (
    <section
      id="research"
      style={{
        background: '#0a0a0a', color: '#fff',
        minHeight: '100vh', padding: '40px 0 60px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* ── hero ── */}
        <div style={{ marginBottom: 40 }}>

          {/* heading row with back button */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12,
          }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 8,
                background: '#1a1a1a', border: '1px solid #2a2a2a',
                color: '#9ca3af', fontSize: 13, fontWeight: 500,
                cursor: 'pointer', transition: 'all .2s', flexShrink: 0,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#4b5563';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.color = '#9ca3af';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#2a2a2a';
              }}
            >
              <IconBack />
              Back
            </button>

            <h1 style={{
              fontSize: 'clamp(32px,6vw,56px)', fontWeight: 800,
              letterSpacing: '-1.5px', lineHeight: 1, margin: 0,
              color: '#fff',
            }}>
              Equity{' '}
              <span style={{ color: '#3b82f6' }}>Research</span>
            </h1>
          </div>

          <p style={{
            fontSize: 18, color: '#6b7280', marginBottom: 16,
            maxWidth: 520, lineHeight: 1.6,
          }}>
            Independent fundamental analysis of Indian smallcap &amp; microcap stocks.
          </p>

          {/* pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            {['Weekend Research', 'Fundamental Focus', 'Screener.in Based'].map(p => (
              <span key={p} style={{
                padding: '6px 16px', borderRadius: 999,
                border: '1px solid #1f2937',
                background: 'rgba(17,24,39,0.5)',
                fontSize: 13, fontWeight: 500, color: '#d1d5db',
              }}>
                {p}
              </span>
            ))}
          </div>


        </div>

        {/* ── scroll label row ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14,
        }}>
          <span style={{
            fontSize: 11, color: '#4b5563',
            letterSpacing: '2px', textTransform: 'uppercase', whiteSpace: 'nowrap',
          }}>
            Reports — scroll to explore
          </span>
          <div style={{ flex: 1, height: 1, background: '#111' }} />
          <span style={{
            fontSize: 11, color: '#374151', fontFamily: 'monospace', whiteSpace: 'nowrap',
          }}>
            {reports.length} published
          </span>
        </div>

        {/* ── cards ── */}
        {reports.length > 0 ? (
          <>
            <div
              ref={trackRef}
              onScroll={handleScroll}
              style={{
                overflowX: 'auto',
                paddingBottom: 8,
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'thin',
                scrollbarColor: '#1f2937 transparent',
              }}
            >
              <div style={{
                display: 'flex', gap: 18,
                width: 'max-content',
                padding: '4px 2px 12px',
              }}>
                {reports.map(r => <ResearchCard key={r.id} report={r} />)}
              </div>
            </div>

            {/* scroll progress bar */}
            <div className="rc-progress-track">
              <div
                className="rc-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </>
        ) : (
          <div style={{
            padding: 48, border: '2px dashed #1f2937',
            borderRadius: 20, textAlign: 'center',
            background: 'rgba(17,24,39,0.2)',
          }}>
            <p style={{ color: '#6b7280', fontSize: 18, margin: '0 0 8px' }}>
              First report coming soon
            </p>
            <p style={{ color: '#9ca3af', margin: 0 }}>
              Currently analysing{' '}
              <span style={{ color: '#60a5fa' }}>Chemical and EV Battery sectors</span>
            </p>
          </div>
        )}

        {/* methodology quote */}
        <div style={{
          padding: '12px 16px',
          borderLeft: '4px solid #3b82f6',
          background: 'rgba(59,130,246,0.05)',
          borderRadius: '0 8px 8px 0',
          maxWidth: 680,
        }}>
          <p style={{
            fontSize: 14, color: '#d1d5db', lineHeight: 1.75,
            margin: 0, fontStyle: 'italic',
          }}>
            "I screen for companies with ROCE &gt; 20%, low debt, strong promoter holding,
            and identifiable competitive moats. Research is for learning — not financial advice."
          </p>
        </div>

        {/* ── disclaimer ── */}
        <div style={{
          marginTop: 60, paddingTop: 32,
          borderTop: '1px solid #111', textAlign: 'center',
        }}>
          <p style={{
            fontSize: 10, color: '#374151',
            letterSpacing: '1.2px', textTransform: 'uppercase',
            maxWidth: 560, margin: '0 auto', lineHeight: 1.9,
          }}>
            Disclaimer: All research is for educational purposes only and does not
            constitute financial advice. I am a software engineer, not a SEBI-registered
            analyst. Investing in smallcaps/microcaps involves high risk.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Research;