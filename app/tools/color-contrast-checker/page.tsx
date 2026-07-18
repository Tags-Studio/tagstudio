"use client"

import React, { useState, useEffect, useRef } from "react"
import { Github, ArrowRightLeft, Check, X, Code, ChevronDown, Clipboard, BookOpen, ArrowLeft, Type, Heading } from "lucide-react"

/* ===== Helper Functions ===== */
function hexToRgb(h: string) {
  h = h.replace('#', '')
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16)
  }
}
function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(c => {
    const hex = Math.max(0, Math.min(255, Math.round(c))).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('').toUpperCase()
}
function lin(c: number) {
  c /= 255
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}
function relLum(r: number, g: number, b: number) {
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}
function getRatio(h1: string, h2: string) {
  const c1 = hexToRgb(h1), c2 = hexToRgb(h2)
  const l1 = relLum(c1.r, c1.g, c1.b), l2 = relLum(c2.r, c2.g, c2.b)
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}
function parseHex(i: string) {
  i = i.trim()
  if (i.startsWith('#')) i = i.slice(1)
  if (i.length === 3) i = i[0] + i[0] + i[1] + i[1] + i[2] + i[2]
  if (i.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(i)) return null
  return '#' + i.toUpperCase()
}
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn
  let h = 0, s = 0, l = (mx + mn) / 2
  if (d !== 0) {
    s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn)
    if (mx === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
    else if (mx === g) h = ((b - r) / d + 2) / 6
    else h = ((r - g) / d + 4) / 6
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}
function suggestFix(fgH: string, bgH: string, target: number) {
  const fg = hexToRgb(fgH), bg = hexToRgb(bgH)
  const Lbg = relLum(bg.r, bg.g, bg.b), Lfg = relLum(fg.r, fg.g, fg.b)
  let tLfg, toW
  if (Lfg >= Lbg) { tLfg = (Lbg + .05) * target - .05; toW = true }
  else { tLfg = (Lbg + .05) / target - .05; toW = false }
  tLfg = Math.max(0, Math.min(1, tLfg))
  let lo = 0, hi = 1
  for (let i = 0; i < 60; i++) {
    const t = (lo + hi) / 2
    let nr, ng, nb
    if (toW) { nr = fg.r + (255 - fg.r) * t; ng = fg.g + (255 - fg.g) * t; nb = fg.b + (255 - fg.b) * t }
    else { nr = fg.r * (1 - t); ng = fg.g * (1 - t); nb = fg.b * (1 - t) }
    const nL = relLum(nr, ng, nb)
    if (toW) { if (nL < tLfg) lo = t; else hi = t }
    else { if (nL > tLfg) lo = t; else hi = t }
  }
  const t = (lo + hi) / 2
  let nr, ng, nb
  if (toW) { nr = fg.r + (255 - fg.r) * t; ng = fg.g + (255 - fg.g) * t; nb = fg.b + (255 - fg.b) * t }
  else { nr = fg.r * (1 - t); ng = fg.g * (1 - t); nb = fg.b * (1 - t) }
  return rgbToHex(nr, ng, nb)
}

const levels = [
  { label: 'AA', size: 'عادي', threshold: 4.5, icon: Type, tip: 'نصوص الفقرات، التسميات، الأوصاف' },
  { label: 'AA', size: 'كبير', threshold: 3.0, icon: Heading, tip: 'عناوين 18px+، أو 14px+ عريض' },
  { label: 'AAA', size: 'عادي', threshold: 7.0, icon: Type, tip: 'معيار قراءة محسّن للوضوح العالي' },
  { label: 'AAA', size: 'كبير', threshold: 4.5, icon: Heading, tip: 'نصوص كبيرة بأعلى معايير الوضوح' },
]

export default function ColorContrastChecker() {
  const [fgColor, setFgColor] = useState('#1E293B');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [fgInput, setFgInput] = useState('#1E293B');
  const [bgInput, setBgInput] = useState('#FFFFFF');
  const [fgError, setFgError] = useState(false);
  const [bgError, setBgError] = useState(false);
  
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [tokenOpen, setTokenOpen] = useState(false);
  const [wcagOpen, setWcagOpen] = useState(false);
  const [swapping, setSwapping] = useState(false);
  
  const currentRatio = getRatio(fgColor, bgColor);
  const [displayRatio, setDisplayRatio] = useState(currentRatio);
  const [copyingRatio, setCopyingRatio] = useState(false);
  const [copyingTokens, setCopyingTokens] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT') return;
      if (e.key.toLowerCase() === 's') {
        e.preventDefault();
        swapColors();
      }
      if (e.key.toLowerCase() === 'c') {
        e.preventDefault();
        copyRatio();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  // Animate ratio
  useEffect(() => {
    let animFrame: number;
    let start = displayRatio;
    let diff = currentRatio - start;
    let dur = 400;
    let t0 = performance.now();
    function step(now: number) {
        let p = Math.min((now - t0) / dur, 1);
        let e = 1 - Math.pow(1 - p, 3);
        let cur = start + diff * e;
        setDisplayRatio(cur);
        if (p < 1) {
            animFrame = requestAnimationFrame(step);
        } else {
            setDisplayRatio(currentRatio);
        }
    }
    animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [currentRatio]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const handleFgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setFgInput(val);
    const p = parseHex(val);
    if (p) {
        setFgColor(p);
        setFgError(false);
    } else {
        if (val.trim() !== '') setFgError(true);
    }
  };
  const handleBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setBgInput(val);
    const p = parseHex(val);
    if (p) {
        setBgColor(p);
        setBgError(false);
    } else {
        if (val.trim() !== '') setBgError(true);
    }
  };

  const handleFgBlur = () => {
      const p = parseHex(fgInput);
      if (p) { setFgColor(p); setFgInput(p); setFgError(false); }
  }
  const handleBgBlur = () => {
      const p = parseHex(bgInput);
      if (p) { setBgColor(p); setBgInput(p); setBgError(false); }
  }

  const handleFgPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.toUpperCase();
      setFgColor(val); setFgInput(val); setFgError(false);
  }
  const handleBgPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.toUpperCase();
      setBgColor(val); setBgInput(val); setBgError(false);
  }

  const swapColors = () => {
    const tC = fgColor, tI = fgInput;
    setFgColor(bgColor); setBgColor(tC);
    setFgInput(bgInput); setBgInput(tI);
    setSwapping(true);
    setTimeout(() => setSwapping(false), 500);
  };

  const copyRatio = () => {
    const text = currentRatio.toFixed(1) + ":1";
    navigator.clipboard.writeText(text);
    setCopyingRatio(true);
    showToast(`تم نسخ النسبة ${text}`);
    setTimeout(() => setCopyingRatio(false), 2000);
  };

  const fgR = hexToRgb(fgColor), bgR = hexToRgb(bgColor);
  const fgH = rgbToHsl(fgR.r, fgR.g, fgR.b), bgH = rgbToHsl(bgR.r, bgR.g, bgR.b);
  const fgL = relLum(fgR.r, fgR.g, fgR.b), bgL = relLum(bgR.r, bgR.g, bgR.b);
  const lighter = fgL >= bgL ? fgColor : bgColor;

  // tokens text
  const tokensText = `/* TAG Studio — Color Contrast Tokens */
/* Contrast Ratio: ${currentRatio.toFixed(2)}:1 */

--color-foreground: ${fgColor};
--color-foreground-rgb: ${fgR.r}, ${fgR.g}, ${fgR.b};
--color-foreground-hsl: ${fgH.h} ${fgH.s}% ${fgH.l}%;

--color-background: ${bgColor};
--color-background-rgb: ${bgR.r}, ${bgR.g}, ${bgR.b};
--color-background-hsl: ${bgH.h} ${bgH.s}% ${bgH.l}%;

--contrast-ratio: ${currentRatio.toFixed(2)};
--wcag-aa-normal: ${currentRatio>=4.5?'pass':'fail'};
--wcag-aa-large: ${currentRatio>=3?'pass':'fail'};
--wcag-aaa-normal: ${currentRatio>=7?'pass':'fail'};
--wcag-aaa-large: ${currentRatio>=4.5?'pass':'fail'};`;

  const copyTokens = () => {
    navigator.clipboard.writeText(tokensText);
    setCopyingTokens(true);
    showToast('تم نسخ متغيرات التصميم');
    setTimeout(() => setCopyingTokens(false), 2000);
  };

  const failed = [...levels].reverse().find(l => currentRatio < l.threshold);
  const sug = failed ? suggestFix(fgColor, bgColor, failed.threshold) : null;
  const sugR = sug ? getRatio(sug, bgColor) : 0;

  const handleSuggest = () => {
    if (sug) {
      setFgColor(sug);
      setFgInput(sug);
      showToast('تم تطبيق اللون المقترح');
    }
  };

  const pct = Math.min(100, ((currentRatio - 1) / 20) * 100);
  let barColor = currentRatio >= 7 ? 'var(--green)' : currentRatio >= 4.5 ? '#10B981' : currentRatio >= 3 ? 'var(--orange)' : 'var(--red)';

  const formatTokensHtml = () => {
      return tokensText.split('\n').map((line, i) => {
          if (line.startsWith('/*')) return <span key={i} className="tk-comment">{line}<br/></span>;
          if (line === '') return <br key={i}/>;
          const [prop, val] = line.split(': ');
          return <span key={i}><span className="tk-prop">{prop}</span>: <span className="tk-val">{val.replace(';','')}</span>;<br/></span>
      });
  }

  const renderDetailGrid = (rgb: any, hsl: any, lum: number, hex: string) => (
      <div className="detail-grid" dir="ltr">
          <div className="detail-cell"><span className="detail-label">HSL</span><span className="detail-value">{hsl.h}° {hsl.s}% {hsl.l}%</span></div>
          <div className="detail-cell"><span className="detail-label">Luminance</span><span className="detail-value">{lum.toFixed(4)}</span></div>
          <div className="detail-cell"><span className="detail-label">RGB</span><span className="detail-value">{rgb.r}, {rgb.g}, {rgb.b}</span></div>
          <div className="detail-cell"><span className="detail-label">Hex</span><span className="detail-value">{hex}</span></div>
      </div>
  );

  return (
    <div dir="rtl" className="color-checker-wrapper bg-[var(--bg)] text-[var(--fg)] min-h-screen overflow-x-hidden antialiased">
      <div className="tag-stripe"></div>

      <nav className="top-bar">
          <div className="flex items-center">
              <div className="logo-mark">
                  <div className="bar bar-h"></div>
                  <div className="bar bar-v"></div>
              </div>
              <span className="logo-text ml-2">TAG STUDIO</span>
          </div>
          <div className="flex items-center gap-3">
              <span className="hidden sm:flex items-center gap-2 mr-3" style={{color:'var(--subtle)',fontSize:'11px',fontWeight:500}}>
                  نسخ <kbd>C</kbd>
                  تبديل <kbd>S</kbd>
              </span>
              <a href="https://github.com/Tags-Studio/tagstudio" target="_blank" rel="noopener noreferrer"
                 className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
                 style={{color:'var(--subtle)'}} aria-label="GitHub">
                  <Github size={15} />
              </a>
          </div>
      </nav>

      <div className="bg-pattern"></div>
      <div className="bg-decor bg-blob-1" style={{background: `radial-gradient(circle, ${fgColor}18 0%, transparent 70%)`}}></div>
      <div className="bg-decor bg-blob-2" style={{background: `radial-gradient(circle, ${bgColor}15 0%, transparent 70%)`}}></div>
      <div className="bg-decor bg-blob-3"></div>

      <main className="relative z-10 max-w-2xl mx-auto px-6 pt-12 pb-28 sm:pt-16">

          <header className="mb-12 anim-in text-center sm:text-right">
              <p className="text-xs sm:text-sm tracking-[0.1em] mb-3 font-semibold" style={{color:'var(--tag-blue)'}}>أداة إمكانية الوصول</p>
              <h1 className="text-4xl sm:text-5xl tracking-tight font-bold" style={{lineHeight:1.2}}>
                  مدقق تباين <br className="hidden sm:block" />
                  <span style={{fontWeight:300,color:'var(--muted)'}}>الألوان</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg mx-auto sm:mx-0" style={{color:'var(--muted)',fontWeight:400,maxWidth:'440px',lineHeight:1.65}}>
                  تأكد من أن توافق ألوانك يلبي معايير إمكانية الوصول WCAG 2.1. احصل على اقتراحات فورية وصدرها كـ Design Tokens بكل سهولة.
              </p>
          </header>

          <section className="mb-10 anim-in" style={{animationDelay:'.08s'}} aria-label="Color selection">
              <div className="flex items-center justify-center gap-4 sm:gap-6 flex-row-reverse sm:flex-row">
                  <div className="color-card">
                      <p className="text-[11px] tracking-[0.05em] mb-4 font-bold" style={{color:'var(--subtle)'}}>لون النص</p>
                      <div className="color-swatch" style={{background:fgColor,boxShadow:`0 4px 20px -4px ${fgColor}55`}}>
                          <input type="color" value={fgColor.length === 7 ? fgColor : '#1E293B'} onChange={handleFgPicker} aria-label="اختر لون النص"/>
                      </div>
                      <input type="text" value={fgInput} onChange={handleFgChange} onBlur={handleFgBlur} onKeyDown={(e)=>{if(e.key==='Enter')e.currentTarget.blur()}} className={`hex-input ${fgError ? 'error':''}`} maxLength={7} spellCheck={false} aria-label="رمز لون النص"/>
                      <p className="text-[11px] mt-2" style={{color:'var(--subtle)',fontFamily:"'SF Mono',monospace", direction:'ltr'}}>rgb({fgR.r}, {fgR.g}, {fgR.b})</p>
                  </div>
                  <button className={`swap-btn ${swapping ? 'rotating':''}`} onClick={swapColors} aria-label="تبديل الألوان" title="تبديل الألوان">
                      <ArrowRightLeft size={15}/>
                  </button>
                  <div className="color-card">
                      <p className="text-[11px] tracking-[0.05em] mb-4 font-bold" style={{color:'var(--subtle)'}}>لون الخلفية</p>
                      <div className="color-swatch" style={{background:bgColor,boxShadow:`0 4px 20px -4px ${bgColor}55`}}>
                          <input type="color" value={bgColor.length === 7 ? bgColor : '#FFFFFF'} onChange={handleBgPicker} aria-label="اختر لون الخلفية"/>
                      </div>
                      <input type="text" value={bgInput} onChange={handleBgChange} onBlur={handleBgBlur} onKeyDown={(e)=>{if(e.key==='Enter')e.currentTarget.blur()}} className={`hex-input ${bgError ? 'error':''}`} maxLength={7} spellCheck={false} aria-label="رمز لون الخلفية"/>
                      <p className="text-[11px] mt-2" style={{color:'var(--subtle)',fontFamily:"'SF Mono',monospace", direction:'ltr'}}>rgb({bgR.r}, {bgR.g}, {bgR.b})</p>
                  </div>
              </div>
          </section>

          <section className="mb-10 anim-in" style={{animationDelay:'.12s'}} aria-label="Color details">
              <div className="flex gap-3 flex-col sm:flex-row">
                  <div className="flex-1">
                      <p className="text-[11px] tracking-[0.05em] mb-2 px-1 font-bold" style={{color:'var(--subtle)'}}>تفاصيل لون النص</p>
                      {renderDetailGrid(fgR, fgH, fgL, fgColor)}
                  </div>
                  <div className="flex-1">
                      <p className="text-[11px] tracking-[0.05em] mb-2 px-1 font-bold" style={{color:'var(--subtle)'}}>تفاصيل لون الخلفية</p>
                      {renderDetailGrid(bgR, bgH, bgL, bgColor)}
                  </div>
              </div>
          </section>

          <section className="mb-9 text-center anim-in" style={{animationDelay:'.18s'}} aria-label="Contrast ratio">
              <div className="ratio-wrapper" dir="ltr">
                  <div className="ratio-glow visible" style={{background:`radial-gradient(ellipse at center, ${lighter}44 0%, transparent 70%)`}}></div>
                  <div className="relative">
                      <span className="ratio-number" style={{color: currentRatio>=4.5 ? 'var(--fg)' : currentRatio>=3 ? 'var(--orange)' : 'var(--red)'}}>{displayRatio.toFixed(1)}</span>
                      <span className="ratio-suffix">:1</span>
                  </div>
              </div>
              <p className="text-xs tracking-[0.1em] mt-2 font-bold" style={{color:'var(--subtle)'}}>نسبة التباين</p>
              <div className="mt-7 px-2">
                  <div className="ratio-bar-track" dir="ltr">
                      <div className="ratio-bar-fill" style={{width: `${pct}%`, background: barColor}}></div>
                      <div className="ratio-marker" style={{left: `${pct}%`, boxShadow: `0 2px 10px ${barColor}44`}}></div>
                      <div className={`ratio-threshold ${currentRatio>=3?'active':''}`} style={{left:'9.52%'}}>3</div>
                      <div className={`ratio-threshold ${currentRatio>=4.5?'active':''}`} style={{left:'17.14%'}}>4.5</div>
                      <div className={`ratio-threshold ${currentRatio>=7?'active':''}`} style={{left:'28.57%'}}>7</div>
                  </div>
                  <div className="flex justify-between mt-3" dir="ltr">
                      <span className="text-[10px]" style={{color:'var(--subtle)'}}>1:1</span>
                      <span className="text-[10px]" style={{color:'var(--subtle)'}}>21:1</span>
                  </div>
              </div>
          </section>

          <section className="mb-4 anim-in" style={{animationDelay:'.24s'}} aria-label="WCAG compliance">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {levels.map((l, i) => {
                      const p = currentRatio >= l.threshold;
                      const Icon = l.icon;
                      return (
                          <div key={i} className={`comp-card ${p?'pass':'fail'}`} style={{animation:`fadeInUp .5s ${.24+i*.07}s cubic-bezier(.25,.46,.45,.94) both`}}>
                              <div className="tip">{l.tip}</div>
                              <p style={{fontSize:'20px',fontWeight:700,letterSpacing:'-0.5px',color:'var(--fg)'}} dir="ltr">{l.label}</p>
                              <p style={{fontSize:'12px',color:'var(--muted)',fontWeight:500,marginTop:'2px'}} className="flex items-center justify-center gap-1 font-bold">
                                  <Icon size={10} style={{opacity:0.6}}/> {l.size}
                              </p>
                              <div className={`badge ${p?'pass':'fail'}`}>
                                  {p ? <Check size={12}/> : <X size={12}/>} {p?'ناجح':'فاشل'}
                              </div>
                              <p style={{fontSize:'11px',color:'var(--subtle)',marginTop:'5px',fontFamily:"'SF Mono',monospace"}} dir="ltr">{l.threshold}:1</p>
                          </div>
                      );
                  })}
              </div>
          </section>

          {failed && sug && (
          <section className="mb-8 anim-in" style={{animationDelay:'.28s'}}>
              <div className="suggestion-card" role="button" tabIndex={0} aria-label={`تطبيق اللون المقترح ${sug}`} onClick={handleSuggest} onKeyDown={e=>{if(e.key==='Enter'||e.key===' ')handleSuggest()}}>
                  <div className="suggestion-swatch" style={{background:sug}}></div>
                  <div style={{flex:1,minWidth:0}}>
                      <p style={{fontSize:'13px',fontWeight:600,color:'var(--fg)'}}>اقتراح تصحيح لـ {failed.label} {failed.size}</p>
                      <p style={{fontSize:'13px',color:'var(--muted)',marginTop:'2px'}}>
                          اضبط لون النص إلى <span style={{fontFamily:"'SF Mono',monospace",color:'var(--tag-blue)',fontWeight:600}} dir="ltr">{sug}</span>
                          <span style={{margin:'0 6px',color:'var(--subtle)'}}>&middot;</span>يحقق نسبة <span style={{color:'var(--green)',fontWeight:600}} dir="ltr">{sugR.toFixed(1)}:1</span>
                      </p>
                  </div>
                  <ArrowLeft style={{color:'var(--subtle)'}} size={14} className="flex-shrink-0 mr-2" />
              </div>
          </section>
          )}

          <div className="divider my-8"></div>

          <section className="mb-8 anim-in" style={{animationDelay:'.32s'}} aria-label="Text preview">
              <p className="text-[12px] tracking-[0.05em] mb-4 font-bold" style={{color:'var(--subtle)'}}>معاينة حية</p>
              <div className="preview-box" style={{backgroundColor:bgColor,color:fgColor}}>
                  <p className="relative z-10 text-[12px] mb-3 font-semibold" style={{opacity:0.6}}>نص توضيحي — 11px / 600</p>
                  <p className="relative z-10 text-base mb-4 font-medium" style={{lineHeight:1.7}}>
                      نص الفقرة — 14px / 400. هذا النص هو مثال لمعاينة شكل الفقرات لتتأكد من وضوح وسهولة القراءة للمستخدمين وفقاً لدرجة التباين الحالية.
                  </p>
                  <p className="relative z-10 text-lg mb-3 font-bold" style={{lineHeight:1.5}}>عنوان فرعي — 18px / 600</p>
                  <p className="relative z-10 text-2xl sm:text-3xl mb-4 font-extrabold" style={{lineHeight:1.3}}>عنوان رئيسي — 30px / 800</p>
                  <div className="relative z-10 flex items-center gap-4 mt-5">
                      <span style={{display:'inline-block',padding:'8px 24px',background:'currentColor',borderRadius:'100px',fontSize:'14px',fontWeight:600,position:'relative',mixBlendMode:'difference',color:'#fff'}}>زر تفاعلي</span>
                      <span style={{fontSize:'14px',fontWeight:600,opacity:0.8,textDecoration:'underline',cursor:'pointer'}}>رابط نصي</span>
                  </div>
              </div>
          </section>

          <div className="divider my-8"></div>

          <section className="mb-3 anim-in" style={{animationDelay:'.36s'}} aria-label="Design tokens">
              <button className={`section-toggle ${tokenOpen?'open':''}`} onClick={()=>setTokenOpen(!tokenOpen)} aria-expanded={tokenOpen}>
                  <span className="flex items-center gap-2.5 font-bold">
                      <Code className="icon-label ml-1" size={14} />
                      تصدير Design Tokens
                  </span>
                  <ChevronDown className="chevron" size={16} />
              </button>
              <div className={`section-body ${tokenOpen?'open':''}`}>
                  <div className="mt-3 mb-2 flex justify-end">
                      <button className={`btn-ghost ${copyingTokens?'copied':''}`} onClick={copyTokens} dir="ltr">
                          {copyingTokens ? <Check size={14}/> : <Clipboard size={14}/>} نسخ المتغيرات
                      </button>
                  </div>
                  <div className="token-block">{formatTokensHtml()}</div>
              </div>
          </section>

          <section className="mb-3 anim-in" style={{animationDelay:'.38s'}} aria-label="WCAG reference">
              <button className={`section-toggle ${wcagOpen?'open':''}`} onClick={()=>setWcagOpen(!wcagOpen)} aria-expanded={wcagOpen}>
                  <span className="flex items-center gap-2.5 font-bold">
                      <BookOpen className="icon-label ml-1" size={14} />
                      مرجع WCAG 2.1 السريع
                  </span>
                  <ChevronDown className="chevron" size={16} />
              </button>
              <div className={`section-body ${wcagOpen?'open':''}`}>
                  <div className="mt-3" style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:'14px',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,0.03)'}}>
                      <div className="wcag-item" style={{borderRight:'3px solid var(--green)'}}>
                          <p style={{fontSize:'14px',fontWeight:700,color:'var(--fg)'}}>AA — نص عادي</p>
                          <p style={{fontSize:'13px',color:'var(--muted)',marginTop:'4px',lineHeight:1.6}}>الحد الأدنى <span style={{color:'var(--fg)',fontWeight:700}} dir="ltr">4.5:1</span> — نصوص الفقرات أصغر من 18pt أو 14pt عريض.</p>
                          <p style={{fontSize:'12px',color:'var(--subtle)',marginTop:'4px'}} dir="ltr">WCAG 1.4.3 — Level AA</p>
                      </div>
                      <div className="wcag-item" style={{borderRight:'3px solid var(--tag-green)'}}>
                          <p style={{fontSize:'14px',fontWeight:700,color:'var(--fg)'}}>AA — نص كبير</p>
                          <p style={{fontSize:'13px',color:'var(--muted)',marginTop:'4px',lineHeight:1.6}}>الحد الأدنى <span style={{color:'var(--fg)',fontWeight:700}} dir="ltr">3:1</span> — النصوص بحجم 18pt وأكبر، أو 14pt عريض وأكبر.</p>
                          <p style={{fontSize:'12px',color:'var(--subtle)',marginTop:'4px'}} dir="ltr">WCAG 1.4.3 — Level AA</p>
                      </div>
                      <div className="wcag-item" style={{borderRight:'3px solid var(--orange)'}}>
                          <p style={{fontSize:'14px',fontWeight:700,color:'var(--fg)'}}>AAA — نص عادي</p>
                          <p style={{fontSize:'13px',color:'var(--muted)',marginTop:'4px',lineHeight:1.6}}>الحد الأدنى <span style={{color:'var(--fg)',fontWeight:700}} dir="ltr">7:1</span> — قراءة محسنة للمحتوى الحساس والمهم.</p>
                          <p style={{fontSize:'12px',color:'var(--subtle)',marginTop:'4px'}} dir="ltr">WCAG 1.4.6 — Level AAA</p>
                      </div>
                      <div className="wcag-item" style={{borderRight:'3px solid var(--red)'}}>
                          <p style={{fontSize:'14px',fontWeight:700,color:'var(--fg)'}}>AAA — نص كبير</p>
                          <p style={{fontSize:'13px',color:'var(--muted)',marginTop:'4px',lineHeight:1.6}}>الحد الأدنى <span style={{color:'var(--fg)',fontWeight:700}} dir="ltr">4.5:1</span> — نفس الحد الخاص بالنص العادي في مستوى AA.</p>
                          <p style={{fontSize:'12px',color:'var(--subtle)',marginTop:'4px'}} dir="ltr">WCAG 1.4.6 — Level AAA</p>
                      </div>
                      <div className="wcag-item" style={{borderRight:'3px solid var(--subtle)'}}>
                          <p style={{fontSize:'14px',fontWeight:700,color:'var(--fg)'}}>مكونات الواجهة والرسوميات</p>
                          <p style={{fontSize:'13px',color:'var(--muted)',marginTop:'4px',lineHeight:1.6}}>الحد الأدنى <span style={{color:'var(--fg)',fontWeight:700}} dir="ltr">3:1</span> — للأيقونات، الحدود، وعناصر الإدخال.</p>
                          <p style={{fontSize:'12px',color:'var(--subtle)',marginTop:'4px'}} dir="ltr">WCAG 1.4.11 — Non-text Contrast</p>
                      </div>
                  </div>
              </div>
          </section>

          <section className="text-center mt-10 anim-in" style={{animationDelay:'.42s'}}>
              <button className={`btn-primary ${copyingRatio?'copied':''}`} onClick={copyRatio} aria-label="نسخ نسبة التباين" dir="ltr">
                  {copyingRatio ? <Check size={16}/> : <Clipboard size={16}/>}
                  <span className="font-bold mr-1">{copyingRatio ? 'تم النسخ' : 'نسخ النسبة'}</span>
              </button>
          </section>

          <footer className="mt-20 text-center anim-in" style={{animationDelay:'.48s'}}>
              <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="logo-mark" style={{width:'20px',height:'20px'}}>
                      <div className="bar bar-h" style={{width:'20px',height:'5px',top:'7.5px',borderRadius:'2px'}}></div>
                      <div className="bar bar-v" style={{width:'5px',height:'20px',left:'7.5px',borderRadius:'2px'}}></div>
                  </div>
                  <span style={{fontSize:'13px',fontWeight:800,color:'var(--tag-blue)'}} dir="ltr">TAG STUDIO</span>
              </div>
              <p style={{color:'var(--subtle)',fontSize:'13px',lineHeight:1.8,fontWeight:500}}>
                  <a href="https://www.wearetagstudio.com/tools/color-contrast-checker" target="_blank" rel="noopener noreferrer" className="footer-link">الأداة الأصلية</a>
                  &nbsp;&middot;&nbsp;
                  <a href="https://github.com/Tags-Studio/tagstudio" target="_blank" rel="noopener noreferrer" className="footer-link">كود تاج ستوديو</a>
                  &nbsp;&middot;&nbsp; مبني على WCAG 2.1
              </p>
          </footer>
      </main>

      <div className={`toast ${toastVisible?'show':''}`} role="status" aria-live="polite">
          <Check style={{color:'var(--tag-green)'}} size={14} />
          <span className="font-bold mr-1">{toastMsg}</span>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .color-checker-wrapper {
            --tag-blue: #1D4ED8;
            --tag-blue-light: #3B82F6;
            --tag-blue-pale: #EFF6FF;
            --tag-blue-ghost: #DBEAFE;
            --tag-yellow: #F59E0B;
            --tag-green: #10B981;
            --tag-red: #EF4444;
            --tag-cyan: #06B6D4;

            --bg: #FFFFFF;
            --bg-subtle: #F8FAFC;
            --fg: #0F172A;
            --fg-secondary: #334155;
            --muted: #64748B;
            --subtle: #94A3B8;
            --card: #FFFFFF;
            --card-alt: #F8FAFC;
            --border: #E2E8F0;
            --border-hover: #CBD5E1;
            --input-bg: #F1F5F9;
            --input-focus: #E2E8F0;

            --green: #059669;
            --green-bg: #ECFDF5;
            --green-border: #A7F3D0;
            --red: #DC2626;
            --red-bg: #FEF2F2;
            --red-border: #FECACA;
            --orange: #D97706;
            --orange-bg: #FFFBEB;
        }

        .color-checker-wrapper .top-bar {
            position: sticky; top: 0; z-index: 50;
            background: rgba(255,255,255,0.82);
            backdrop-filter: blur(24px) saturate(180%);
            -webkit-backdrop-filter: blur(24px) saturate(180%);
            border-bottom: 1px solid var(--border);
            padding: 0 24px; height: 56px;
            display: flex; align-items: center; justify-content: space-between;
        }
        .color-checker-wrapper .logo-mark {
            width: 28px; height: 28px; position: relative; flex-shrink: 0;
        }
        .color-checker-wrapper .logo-mark .bar {
            position: absolute; border-radius: 3px;
        }
        .color-checker-wrapper .logo-mark .bar-h {
            width: 28px; height: 7px; top: 10.5px; right: 0;
            background: linear-gradient(-90deg, var(--tag-yellow) 0%, var(--tag-green) 33%, var(--tag-blue-light) 66%, var(--tag-red) 100%);
        }
        .color-checker-wrapper .logo-mark .bar-v {
            width: 7px; height: 28px; top: 0; right: 10.5px;
            background: linear-gradient(180deg, var(--tag-yellow) 0%, var(--tag-green) 33%, var(--tag-blue-light) 66%, var(--tag-red) 100%);
        }
        .color-checker-wrapper .logo-text {
            font-size: 15px; font-weight: 700; color: var(--tag-blue);
            margin-right: 10px; letter-spacing: -0.3px;
        }

        .color-checker-wrapper .bg-decor {
            position: fixed; pointer-events: none; z-index: 0;
        }
        .color-checker-wrapper .bg-blob-1 {
            width: 500px; height: 500px; border-radius: 50%;
            top: -200px; left: -150px;
            filter: blur(60px);
            transition: background 0.8s ease;
        }
        .color-checker-wrapper .bg-blob-2 {
            width: 400px; height: 400px; border-radius: 50%;
            bottom: -100px; right: -100px;
            filter: blur(60px);
            transition: background 0.8s ease;
        }
        .color-checker-wrapper .bg-blob-3 {
            width: 300px; height: 300px; border-radius: 50%;
            top: 50%; right: 60%;
            background: radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%);
            filter: blur(50px);
        }
        .color-checker-wrapper .bg-pattern {
            position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.35;
            background-image: radial-gradient(circle at 1px 1px, rgba(148,163,184,0.15) 1px, transparent 0);
            background-size: 32px 32px;
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .color-checker-wrapper .anim-in { animation: fadeInUp .8s cubic-bezier(.25,.46,.45,.94) both; }

        .color-checker-wrapper .color-card {
            display: flex; flex-direction: column; align-items: center;
            padding: 28px 28px 22px; background: var(--card);
            border: 1px solid var(--border); border-radius: 20px;
            transition: all .35s cubic-bezier(.25,.46,.45,.94);
            flex: 1; max-width: 210px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .color-checker-wrapper .color-card:hover {
            border-color: var(--border-hover);
            box-shadow: 0 8px 24px -4px rgba(0,0,0,0.08);
            transform: translateY(-2px);
        }

        .color-checker-wrapper .color-swatch {
            width: 96px; height: 96px; border-radius: 18px; cursor: pointer;
            position: relative; transition: transform .35s ease, box-shadow .4s ease;
            border: 2px solid var(--border);
        }
        .color-checker-wrapper .color-swatch:hover { transform: scale(1.05); }
        .color-checker-wrapper .color-swatch:active { transform: scale(.98); }
        .color-checker-wrapper .color-swatch input[type="color"] {
            position: absolute; inset: 0; width: 100%; height: 100%;
            opacity: 0; cursor: pointer; border: none;
        }

        .color-checker-wrapper .hex-input {
            background: var(--input-bg); border: 1px solid var(--border); border-radius: 10px;
            padding: 8px 12px; color: var(--fg);
            font-family: 'SF Mono','Fira Code','Cascadia Code','Consolas',monospace;
            font-size: 14px; font-weight: 600; text-align: center; width: 120px;
            margin-top: 10px; transition: all .25s ease; outline: none; letter-spacing: .5px; direction: ltr;
        }
        .color-checker-wrapper .hex-input:focus { border-color: var(--tag-blue-light); background: #fff; box-shadow: 0 0 0 3px rgba(29,78,216,0.1); }
        .color-checker-wrapper .hex-input.error { border-color: var(--red); box-shadow: 0 0 0 3px var(--red-bg); }

        .color-checker-wrapper .swap-btn {
            width: 46px; height: 46px; border-radius: 50%; background: var(--card);
            border: 1px solid var(--border); color: var(--muted); cursor: pointer;
            display: flex; align-items: center; justify-content: center; font-size: 15px;
            transition: all .35s ease; flex-shrink: 0; align-self: center;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .color-checker-wrapper .swap-btn:hover { background: var(--tag-blue-pale); color: var(--tag-blue); border-color: var(--tag-blue-ghost); }
        .color-checker-wrapper .swap-btn:active { transform: scale(.92); }
        .color-checker-wrapper .swap-btn.rotating svg { animation: swapR .5s cubic-bezier(.25,.46,.45,.94); }
        @keyframes swapR { from{transform:rotate(0)} to{transform:rotate(180deg)} }

        .color-checker-wrapper .ratio-wrapper { position: relative; display: inline-block; }
        .color-checker-wrapper .ratio-glow {
            position: absolute; width: 320px; height: 180px; top: 50%; left: 50%;
            transform: translate(-50%,-50%); border-radius: 50%; filter: blur(60px);
            opacity: 0.12; pointer-events: none; transition: background .8s ease, opacity .8s ease;
        }
        .color-checker-wrapper .ratio-number {
            font-size: clamp(64px, 10vw, 100px); font-weight: 800;
            letter-spacing: -3px; line-height: 1; position: relative;
            transition: color .5s ease;
        }
        .color-checker-wrapper .ratio-suffix {
            font-size: clamp(20px, 3.5vw, 32px); font-weight: 200; color: var(--subtle);
            vertical-align: top; margin-left: 2px; position: relative; top: .15em;
        }

        .color-checker-wrapper .ratio-bar-track {
            position: relative; height: 4px; background: var(--border); border-radius: 2px;
            max-width: 380px; margin: 0 auto;
        }
        .color-checker-wrapper .ratio-bar-fill {
            position: absolute; left: 0; top: 0; height: 100%; border-radius: 2px;
            transition: width .6s cubic-bezier(.25,.46,.45,.94), background .5s ease;
        }
        .color-checker-wrapper .ratio-marker {
            position: absolute; top: 50%; width: 14px; height: 14px; border-radius: 50%;
            background: var(--fg); transform: translate(-50%,-50%);
            transition: left .6s cubic-bezier(.25,.46,.45,.94), box-shadow .5s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            border: 2px solid #fff;
        }
        .color-checker-wrapper .ratio-threshold {
            position: absolute; top: -20px; transform: translateX(-50%);
            font-size: 11px; font-weight: 700; color: var(--subtle);
            transition: color .3s ease; user-select: none;
        }
        .color-checker-wrapper .ratio-threshold::after {
            content: ''; position: absolute; bottom: -5px; left: 50%;
            transform: translateX(-50%); width: 1px; height: 8px;
            background: var(--border); border-radius: 1px;
        }
        .color-checker-wrapper .ratio-threshold.active { color: var(--tag-blue); }

        .color-checker-wrapper .comp-card {
            padding: 16px 10px 14px; background: var(--card); border: 1px solid var(--border);
            border-radius: 16px; text-align: center; transition: all .35s ease;
            position: relative; overflow: hidden; cursor: default;
            box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        }
        .color-checker-wrapper .comp-card::before {
            content: ''; position: absolute; top: 0; left: 0; right: 0;
            height: 2.5px; transition: background .5s ease;
        }
        .color-checker-wrapper .comp-card.pass { border-color: var(--green-border); background: var(--green-bg); }
        .color-checker-wrapper .comp-card.pass::before { background: var(--green); }
        .color-checker-wrapper .comp-card.fail { border-color: var(--red-border); background: var(--red-bg); }
        .color-checker-wrapper .comp-card.fail::before { background: var(--red); }
        .color-checker-wrapper .comp-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px -4px rgba(0,0,0,0.08); }
        .color-checker-wrapper .badge {
            display: inline-flex; align-items: center; gap: 5px; padding: 4px 12px;
            border-radius: 100px; font-size: 12px; font-weight: 700; margin-top: 8px;
        }
        .color-checker-wrapper .badge.pass { background: rgba(5,150,105,0.12); color: var(--green); }
        .color-checker-wrapper .badge.fail { background: rgba(220,38,38,0.1); color: var(--red); }

        .color-checker-wrapper .comp-card .tip {
            position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%) translateY(4px);
            background: var(--fg); color: #fff; font-size: 11px; font-weight: 600;
            padding: 8px 14px; border-radius: 10px; white-space: nowrap;
            pointer-events: none; opacity: 0; transition: all .25s ease; z-index: 10;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .color-checker-wrapper .comp-card .tip::after {
            content: ''; position: absolute; top: 100%; left: 50%;
            transform: translateX(-50%); border: 5px solid transparent; border-top-color: var(--fg);
        }
        .color-checker-wrapper .comp-card:hover .tip { opacity: 1; transform: translateX(-50%) translateY(-6px); }

        .color-checker-wrapper .detail-grid {
            display: grid; grid-template-columns: 1fr 1fr; gap: 1px;
            background: var(--border); border-radius: 12px; overflow: hidden;
        }
        .color-checker-wrapper .detail-cell {
            background: var(--bg); padding: 10px 12px;
            display: flex; justify-content: space-between; align-items: center;
        }
        .color-checker-wrapper .detail-cell:first-child { border-radius: 11px 0 0 0; }
        .color-checker-wrapper .detail-cell:nth-child(2) { border-radius: 0 11px 0 0; }
        .color-checker-wrapper .detail-cell:nth-child(3) { border-radius: 0 0 0 11px; }
        .color-checker-wrapper .detail-cell:last-child { border-radius: 0 0 11px 0; }
        .color-checker-wrapper .detail-label { font-size: 11px; text-transform: uppercase; letter-spacing: .05em; color: var(--subtle); font-weight: 700; }
        .color-checker-wrapper .detail-value { font-size: 12px; color: var(--muted); font-family: 'SF Mono','Fira Code',monospace; font-weight: 600; }

        .color-checker-wrapper .section-toggle {
            width: 100%; display: flex; align-items: center; justify-content: space-between;
            padding: 16px 20px; background: var(--card); border: 1px solid var(--border);
            border-radius: 14px; color: var(--fg); font-size: 15px; font-weight: 700;
            cursor: pointer; transition: all .25s ease; font-family: inherit;
            box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        }
        .color-checker-wrapper .section-toggle:hover { border-color: var(--border-hover); box-shadow: 0 4px 12px -2px rgba(0,0,0,0.06); }
        .color-checker-wrapper .section-toggle .chevron { color: var(--subtle); transition: transform .3s ease; }
        .color-checker-wrapper .section-toggle.open .chevron { transform: rotate(180deg); }
        .color-checker-wrapper .section-toggle .icon-label { color: var(--tag-blue); }
        .color-checker-wrapper .section-body { max-height: 0; overflow: hidden; transition: max-height .5s cubic-bezier(.25,.46,.45,.94); }
        .color-checker-wrapper .section-body.open { max-height: 800px; }

        .color-checker-wrapper .wcag-item {
            padding: 16px 20px; transition: border-color .25s ease;
            text-align: right; border-bottom: 1px solid var(--border);
        }
        .color-checker-wrapper .wcag-item:last-child { border-bottom: none; }
        .color-checker-wrapper .wcag-item:hover { background: var(--bg-subtle); }

        .color-checker-wrapper .token-block {
            background: #F8FAFC; border: 1px solid var(--border); border-radius: 12px;
            padding: 16px 20px;
            font-family: 'SF Mono','Fira Code','Cascadia Code',monospace;
            font-size: 13px; line-height: 1.8; color: var(--muted);
            position: relative; overflow-x: auto;
            text-align: left;
            direction: ltr;
        }
        .color-checker-wrapper .token-block .tk-prop { color: var(--tag-blue); }
        .color-checker-wrapper .token-block .tk-val { color: var(--tag-green); font-weight: 600; }
        .color-checker-wrapper .token-block .tk-comment { color: var(--subtle); font-style: italic; }

        .color-checker-wrapper .suggestion-card {
            background: var(--card); border: 1px solid var(--border); border-radius: 16px;
            padding: 14px 20px; display: flex; align-items: center; gap: 14px;
            transition: all .35s ease; cursor: pointer;
            box-shadow: 0 1px 3px rgba(0,0,0,0.03);
            text-align: right;
        }
        .color-checker-wrapper .suggestion-card:hover { border-color: var(--tag-blue-ghost); background: var(--tag-blue-pale); transform: translateY(-1px); box-shadow: 0 6px 16px -4px rgba(29,78,216,0.1); }
        .color-checker-wrapper .suggestion-swatch { width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0; transition: transform .25s ease; border: 1px solid var(--border); }
        .color-checker-wrapper .suggestion-card:hover .suggestion-swatch { transform: scale(1.08); }

        .color-checker-wrapper .preview-box {
            border-radius: 20px; padding: 32px 28px;
            transition: background-color .5s ease, color .5s ease;
            border: 1px solid var(--border); position: relative; overflow: hidden;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
            text-align: right;
        }
        .color-checker-wrapper .preview-box::before {
            content: ''; position: absolute; inset: 0;
            background: repeating-conic-gradient(rgba(0,0,0,.02) 0% 25%, transparent 0% 50%) 0 0 / 16px 16px;
            pointer-events: none; border-radius: inherit;
        }

        .color-checker-wrapper kbd {
            display: inline-flex; align-items: center; justify-content: center;
            min-width: 24px; height: 22px; padding: 0 6px;
            background: var(--input-bg); border: 1px solid var(--border); border-bottom-width: 2px;
            border-radius: 5px; font-size: 11px; font-weight: 700; color: var(--muted);
            font-family: inherit; margin: 0 4px;
        }

        .color-checker-wrapper .btn-primary {
            display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px;
            background: var(--tag-blue); border: none; border-radius: 100px;
            color: #fff; font-size: 14px; font-weight: 700; cursor: pointer;
            transition: all .25s ease; font-family: inherit;
            box-shadow: 0 2px 8px rgba(29,78,216,0.25);
        }
        .color-checker-wrapper .btn-primary:hover { background: var(--tag-blue-light); box-shadow: 0 4px 16px rgba(29,78,216,0.3); transform: translateY(-1px); }
        .color-checker-wrapper .btn-primary:active { transform: scale(.97); }
        .color-checker-wrapper .btn-primary.copied { background: var(--green); box-shadow: 0 2px 8px rgba(5,150,105,0.25); }

        .color-checker-wrapper .btn-ghost {
            display: inline-flex; align-items: center; gap: 6px; padding: 8px 18px;
            background: transparent; border: 1px solid var(--border); border-radius: 100px;
            color: var(--muted); font-size: 13px; font-weight: 600; cursor: pointer;
            transition: all .25s ease; font-family: inherit;
        }
        .color-checker-wrapper .btn-ghost:hover { border-color: var(--tag-blue-ghost); color: var(--tag-blue); background: var(--tag-blue-pale); }
        .color-checker-wrapper .btn-ghost.copied { border-color: var(--green-border); color: var(--green); background: var(--green-bg); }

        .color-checker-wrapper .toast {
            position: fixed; bottom: 36px; left: 50%; transform: translateX(-50%) translateY(16px);
            background: var(--fg); color: #fff;
            padding: 12px 24px; border-radius: 100px; font-size: 14px; font-weight: 600;
            pointer-events: none; opacity: 0; transition: all .35s cubic-bezier(.25,.46,.45,.94);
            z-index: 100; display: flex; align-items: center; gap: 8px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
        .color-checker-wrapper .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

        .color-checker-wrapper .divider { height: 1px; background: var(--border); }

        .color-checker-wrapper .tag-stripe {
            height: 3px; width: 100%;
            background: linear-gradient(90deg,
                var(--tag-yellow) 0%,
                var(--tag-green) 25%,
                var(--tag-cyan) 50%,
                var(--tag-blue-light) 75%,
                var(--tag-red) 100%
            );
        }

        .color-checker-wrapper .footer-link { color: var(--subtle); text-decoration: none; transition: color .2s ease; font-size: 13px; }
        .color-checker-wrapper .footer-link:hover { color: var(--tag-blue); }

        @media (max-width: 640px) {
            .color-checker-wrapper .color-card { padding: 20px 20px 16px; max-width: none; }
            .color-checker-wrapper .color-swatch { width: 76px; height: 76px; border-radius: 14px; }
            .color-checker-wrapper .hex-input { width: 105px; font-size: 12px; }
            .color-checker-wrapper .ratio-number { letter-spacing: -2px; }
            .color-checker-wrapper .preview-box { padding: 24px 20px; }
        }
      `}} />
    </div>
  )
}
