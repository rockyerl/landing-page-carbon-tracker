const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L3 6V14L10 18L17 14V6L10 2Z" stroke="#1D6B5A" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 7V10L12 12" stroke="#2A9478" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    tag: "Core",
    title: "Fuel Log Multi-Aset",
    desc: "Input konsumsi BBM untuk kendaraan, alat berat, dan genset. Support web form, mobile, dan WhatsApp Bot.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="#1D6B5A" strokeWidth="1.5" />
        <path d="M10 6V10L13 12" stroke="#2A9478" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    tag: "Kalkulasi",
    title: "CO₂eq Otomatis",
    desc: "Hitung emisi berdasarkan fuel-based atau distance-based. Mendukung blending B40, CH₄, N₂O sesuai GWP AR6 IPCC.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="#1D6B5A" strokeWidth="1.5" />
        <path d="M7 10L9 12L13 8" stroke="#2A9478" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tag: "Compliance",
    title: "Laporan ESG & PDF",
    desc: "Generate laporan kepatuhan otomatis. Compatible dengan sistem SIGN-SMART KLHK dan pelaporan OJK untuk perusahaan Tbk.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 15L7 10L10 13L14 7L17 10" stroke="#1D6B5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 5H17M3 5V17H17" stroke="#2A9478" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    tag: "Analytics",
    title: "Dashboard Real-time",
    desc: "Visualisasi konsumsi per kendaraan, per sopir, per lokasi, dan tren emisi 30 hari. Breakdown lengkap untuk manajemen.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z" stroke="#C14B2A" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    tag: "Keamanan",
    title: "Anomaly Detection",
    desc: "Flag otomatis pengisian melebihi kapasitas tangki, konsumsi > 2x rata-rata historis, dan pengisian di luar jam operasional.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="5" width="16" height="12" rx="2" stroke="#1D6B5A" strokeWidth="1.5" />
        <path d="M6 5V3.5C6 2.67 6.67 2 7.5 2H12.5C13.33 2 14 2.67 14 3.5V5" stroke="#2A9478" strokeWidth="1.5" />
        <path d="M8 10H12M10 8V12" stroke="#1D6B5A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    tag: "Multi-tenant",
    title: "Role-Based Access",
    desc: "5 level role: Super Admin, Admin, Manager, Operator, Viewer. Row-level security di PostgreSQL per organisasi.",
  },
];

const segments = [
  { icon: "🚚", label: "Fleet & Logistik" },
  { icon: "🏗️", label: "Konstruksi" },
  { icon: "🌿", label: "Perkebunan" },
  { icon: "⛏️", label: "Pertambangan" },
  { icon: "🏢", label: "Korporat ESG" },
];

export default function Features() {
  return (
    <section id="fitur" className="py-32 relative bg-lontar">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="font-ui text-xs text-rimba tracking-widest uppercase mb-4">
            — Platform Fitur —
          </div>
          <h2 className="font-display text-4xl font-normal tracking-tight mb-4 text-arang">
            Satu Platform, Semua Kebutuhan
            <br />
            <span className="text-abu font-display">Monitoring Energi</span>
          </h2>
          <p className="font-ui text-abu max-w-xl mx-auto leading-relaxed text-sm">
            Dari input manual hingga IoT sensor, dari startup logistik hingga korporat
            yang wajib lapor ESG ke OJK.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {features.map((f, i) => (
            <div key={i} className="card-white card-hover rounded-2xl p-6 group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rimba/8 flex items-center justify-center flex-shrink-0 group-hover:bg-rimba/15 transition-colors">
                  {f.icon}
                </div>
                <span className="font-ui text-xs text-rimba/70 mt-1 tracking-widest uppercase">
                  {f.tag}
                </span>
              </div>
              <h3 className="font-display text-base mb-2 text-arang">{f.title}</h3>
              <p className="font-ui text-sm text-abu leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Target segments */}
        <div className="rounded-2xl border border-rimba/12 bg-pasir/60 p-8">
          <div className="font-ui text-xs text-abu/70 tracking-widest uppercase text-center mb-6">
            Segmen yang didukung
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {segments.map((s) => (
              <div key={s.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-rimba/15 bg-lontar text-sm text-arang/70 font-ui">
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
