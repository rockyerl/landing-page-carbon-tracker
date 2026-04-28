export function CTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-lontar">
      {/* Subtle mandala bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(29,107,90,0.06) 0%, transparent 65%)" }} />
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <div className="rounded-3xl border border-rimba/20 bg-pasir/60 p-12"
          style={{ backdropFilter: "blur(16px)" }}>
          <div className="font-ui text-xs text-rimba tracking-widest uppercase mb-6">
            — Mulai Sekarang —
          </div>
          <p className="font-ui text-xs text-abu tracking-[0.18em] uppercase mb-4">
            Dari semua penjuru, satu pandangan.
          </p>
          <h2 className="font-display text-4xl font-normal tracking-tight mb-4 text-arang">
            Gratis untuk 1 Aset.
            <br />
            <span className="text-abu font-display">Tidak Perlu Kartu Kredit.</span>
          </h2>
          <p className="font-ui text-abu mb-10 leading-relaxed text-sm">
            Daftar dalam 2 menit, mulai catat konsumsi BBM hari ini.
            Upgrade kapan saja saat bisnis Anda berkembang.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#pricing"
              className="px-10 py-4 rounded-xl bg-rimba hover:bg-jati text-lontar font-semibold font-ui text-sm transition-all duration-200 glow-rimba hover:scale-[1.02]">
              Daftar Gratis →
            </a>
            <a href="mailto:sales@nawasanga.id"
              className="px-10 py-4 rounded-xl border border-rimba/20 hover:border-rimba/40 text-arang/60 hover:text-arang font-ui text-sm transition-all duration-200">
              Hubungi Tim Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function NawasangaLogoSmall() {
  const size = 28;
  const cx = size/2, cy = size/2;
  const outerR = cx * 0.78;
  const nodeR = size * 0.09;
  const dirs = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <circle cx={cx} cy={cy} r={cx-1} stroke="#1D6B5A" strokeWidth="0.7" opacity="0.25" />
      {dirs.map((deg) => {
        const rad = (deg*Math.PI)/180;
        const nx = cx + Math.cos(rad)*outerR;
        const ny = cy + Math.sin(rad)*outerR;
        return <g key={deg}>
          <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#1D6B5A" strokeWidth="0.5" opacity="0.4" />
          <circle cx={nx} cy={ny} r={nodeR} fill="#2A9478" />
        </g>;
      })}
      <circle cx={cx} cy={cy} r={nodeR*1.25} fill="#B8962E" />
    </svg>
  );
}

export function Footer() {
  const links = {
    Produk: ["Fitur", "Pricing", "Roadmap", "Changelog"],
    Regulasi: ["IPCC 2006", "Perpres 98/2021", "KLHK SIGN-SMART", "GHG Protocol"],
    Perusahaan: ["Tentang Kami", "Blog", "Karir", "Press Kit"],
    Dukungan: ["Dokumentasi", "API Reference", "Status", "Kontak"],
  };

  return (
    <footer className="border-t border-rimba/10 py-16 bg-pasir/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <NawasangaLogoSmall />
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-sm text-arang">Nawasanga</span>
                <span className="font-ui text-[8px] uppercase tracking-[0.15em] text-abu leading-none mt-0.5">ESG Platform</span>
              </div>
            </div>
            <p className="font-ui text-xs text-abu/70 leading-relaxed">
              Platform ESG & Carbon Monitoring untuk industri Indonesia.
            </p>
            <p className="font-ui text-xs text-abu/40 mt-2 italic">
              "Dari semua penjuru, satu pandangan."
            </p>
          </div>

          {Object.entries(links).map(([cat, items]) => (
            <div key={cat}>
              <div className="font-ui text-xs text-abu/50 tracking-widest uppercase mb-4">{cat}</div>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="font-ui text-xs text-abu/60 hover:text-arang/80 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-rimba/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-ui text-xs text-abu/40">
            © 2025 Nawasanga ESG Platform. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {["IPCC 2006", "Perpres 98/2021", "Permen LHK 21/2022", "KLHK SIGN-SMART"].map((tag) => (
              <span key={tag}
                className="font-ui text-xs text-rimba/50 border border-rimba/15 px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
