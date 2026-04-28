function MandalaSymbol() {
  const size = 320;
  const cx = size / 2, cy = size / 2;
  const outerR = 130;
  const innerR = 52;
  const nodeR = 10;
  const dirs = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none"
      className="animate-rotate-slow opacity-70">
      {/* Outer lotus petals */}
      {dirs.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const mid = ((deg + 22.5) * Math.PI) / 180;
        const nx = cx + Math.cos(rad) * outerR;
        const ny = cy + Math.sin(rad) * outerR;
        const mx = cx + Math.cos(mid) * (outerR * 0.55);
        const my = cy + Math.sin(mid) * (outerR * 0.55);
        return (
          <path key={`p${deg}`}
            d={`M ${cx} ${cy} Q ${mx} ${my} ${nx} ${ny} Q ${cx + Math.cos(mid - Math.PI/8) * (outerR * 0.4)} ${cy + Math.sin(mid - Math.PI/8) * (outerR * 0.4)} ${cx} ${cy}`}
            fill="#2A9478" opacity="0.08" />
        );
      })}
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={outerR + 8} stroke="#1D6B5A" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.3" />
      <circle cx={cx} cy={cy} r={outerR} stroke="#1D6B5A" strokeWidth="0.5" opacity="0.2" />
      {/* Inner ring */}
      <circle cx={cx} cy={cy} r={innerR} stroke="#B8962E" strokeWidth="0.8" opacity="0.25" />
      {/* Radial lines */}
      {dirs.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const nx = cx + Math.cos(rad) * outerR;
        const ny = cy + Math.sin(rad) * outerR;
        return (
          <line key={`l${deg}`} x1={cx} y1={cy} x2={nx} y2={ny}
            stroke="#1D6B5A" strokeWidth="0.7" opacity="0.35" />
        );
      })}
      {/* Outer teal nodes */}
      {dirs.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const nx = cx + Math.cos(rad) * outerR;
        const ny = cy + Math.sin(rad) * outerR;
        return (
          <g key={`g${deg}`}>
            <circle cx={nx} cy={ny} r={nodeR + 4} fill="#2A9478" opacity="0.12" />
            <circle cx={nx} cy={ny} r={nodeR} fill="#2A9478" />
          </g>
        );
      })}
      {/* Center gold pulse */}
      <circle cx={cx} cy={cy} r={22} fill="#B8962E" opacity="0.15" className="animate-pulse-slow" />
      <circle cx={cx} cy={cy} r={14} fill="#B8962E" opacity="0.3" />
      <circle cx={cx} cy={cy} r={8} fill="#D4AF5A" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg pt-16">
      {/* Warm radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 55% at 50% 10%, rgba(29,107,90,0.08) 0%, transparent 65%)" }} />

      {/* Mandala orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none">
        <MandalaSymbol />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="animate-fade-up opacity-0-init inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rimba/25 bg-rimba/8 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-rimba animate-pulse" />
          <span className="font-ui text-xs text-rimba tracking-widest uppercase">
            ESG Compliant · IPCC 2006 · Perpres 98/2021
          </span>
        </div>

        {/* Tagline kecil */}
        <p className="animate-fade-up opacity-0-init font-ui text-xs text-abu tracking-[0.2em] uppercase mb-4">
          nawa·sanga — Sembilan Penjuru Alam
        </p>

        {/* Headline */}
        <h1 className="animate-fade-up delay-100 opacity-0-init font-display font-normal tracking-tight leading-[1.08] mb-6"
          style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)" }}>
          Monitor BBM & Emisi
          <br />
          <span className="text-gradient-hero">Karbon Industri Anda</span>
        </h1>

        {/* Sub */}
        <p className="animate-fade-up delay-200 opacity-0-init font-ui text-abu text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          Platform SaaS multi-tenant untuk logistik, konstruksi, dan perkebunan.
          Catat konsumsi BBM, hitung CO₂ otomatis, dan hasilkan laporan ESG
          sesuai regulasi Indonesia — dalam satu dashboard.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-300 opacity-0-init flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="#pricing"
            className="px-8 py-3.5 rounded-xl bg-rimba hover:bg-jati text-lontar font-semibold text-sm transition-all duration-200 glow-rimba hover:scale-[1.02] active:scale-[0.99] font-ui">
            Mulai Gratis Sekarang
          </a>
          <a href="#fitur"
            className="px-8 py-3.5 rounded-xl border border-rimba/20 hover:border-rimba/40 text-arang/70 hover:text-arang font-ui text-sm transition-all duration-200 hover:bg-rimba/5">
            Lihat Cara Kerja →
          </a>
        </div>

        {/* Stats row */}
        <div className="animate-fade-up delay-400 opacity-0-init grid grid-cols-3 gap-px max-w-2xl mx-auto rounded-2xl overflow-hidden border border-rimba/15">
          {[
            { value: "B40", label: "Biodiesel Mandatori 2025" },
            { value: "CO₂eq", label: "GWP AR6 IPCC Certified" },
            { value: "SIGN", label: "SMART KLHK Compatible" },
          ].map((s) => (
            <div key={s.value} className="bg-pasir/60 px-6 py-5 text-center">
              <div className="font-display text-xl font-bold text-rimba mb-1">{s.value}</div>
              <div className="font-ui text-xs text-abu leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-up delay-500 opacity-0-init mt-14 flex justify-center">
          <div className="flex flex-col items-center gap-2 text-abu/50">
            <span className="font-ui text-xs tracking-widest uppercase">Scroll</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="animate-bounce">
              <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" />
              <rect x="7" y="5" width="2" height="6" rx="1" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
