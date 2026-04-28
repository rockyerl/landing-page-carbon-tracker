const regulations = [
  {
    code: "Perpres 71/2011",
    title: "Inventarisasi GRK Nasional",
    desc: "Kewajiban inventarisasi gas rumah kaca secara nasional yang menjadi dasar sistem pelaporan emisi di Indonesia.",
  },
  {
    code: "Perpres 98/2021",
    title: "Nilai Ekonomi Karbon",
    desc: "Regulasi utama perdagangan karbon dan mekanisme penetapan harga karbon di Indonesia. Wajib CO₂eq.",
  },
  {
    code: "Permen LHK 21/2022",
    title: "Tata Cara Inventarisasi GRK",
    desc: "Pedoman teknis tata cara inventarisasi gas rumah kaca untuk sektor industri, energi, dan transportasi.",
  },
  {
    code: "IPCC 2006",
    title: "Guidelines for GHG Inventories",
    desc: "Standar internasional penghitungan emisi. Emission factor BBM bersumber dari panduan ini.",
  },
  {
    code: "GHG Protocol",
    title: "Corporate Standard",
    desc: "Framework pelaporan emisi korporasi paling widely-used di dunia. Scope 1, 2, dan 3.",
  },
  {
    code: "SIGN-SMART",
    title: "Platform KLHK",
    desc: "Sistem informasi inventarisasi GRK nasional (signsmart.menlhk.go.id). Platform resmi pelaporan.",
  },
];

export default function Regulasi() {
  return (
    <section id="regulasi" className="py-32 relative border-t border-rimba/10 bg-lontar">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <div>
            <div className="font-ui text-xs text-rimba tracking-widest uppercase mb-4">
              — Kepatuhan Regulasi —
            </div>
            <h2 className="font-display text-4xl font-normal tracking-tight mb-6 leading-tight text-arang">
              Dibangun Sesuai
              <br />
              <span className="text-abu">Hukum Indonesia</span>
            </h2>
            <p className="font-ui text-abu leading-relaxed mb-8 text-sm">
              Setiap kalkulasi emisi, setiap laporan yang dihasilkan platform ini
              mengacu pada regulasi resmi pemerintah Indonesia dan standar
              internasional yang diakui KLHK.
            </p>

            {/* B40 highlight */}
            <div className="rounded-xl border border-emas/25 bg-emas/5 p-5">
              <div className="font-ui text-xs text-emas mb-2 tracking-wide">
                ⚠ Update 2025 — B40 Mandatory
              </div>
              <p className="font-ui text-sm text-arang/60 leading-relaxed">
                Solar yang dijual di SPBU Indonesia saat ini adalah campuran B40.
                Emission factor dihitung dengan formula blending:{" "}
                <span className="font-ui text-rimba font-medium">
                  EF = (2.68 × 0.60) + (1.77 × 0.40) = 2.316 kg CO₂eq/liter
                </span>
              </p>
            </div>
          </div>

          {/* Right: regulation cards */}
          <div className="grid grid-cols-2 gap-3">
            {regulations.map((r, i) => (
              <div key={i} className="card-white card-hover rounded-xl p-4">
                <div className="font-ui text-xs text-rimba/70 mb-2 tracking-wide">{r.code}</div>
                <div className="font-display text-sm font-normal mb-1.5 text-arang">{r.title}</div>
                <div className="font-ui text-xs text-abu leading-relaxed">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
