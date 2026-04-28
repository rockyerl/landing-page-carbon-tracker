const phases = [
  {
    phase: "Phase 1",
    label: "MVP",
    duration: "2–3 bulan",
    status: "In Progress",
    statusColor: "text-rimba bg-rimba/10",
    target: "5 pilot client",
    items: [
      "Auth & multi-tenant onboarding",
      "Master data CRUD: kendaraan, aset, sopir, lokasi",
      "Fuel log input (web + mobile responsive)",
      "Auto-calculate CO₂ per fuel log",
      "Dashboard: total BBM, CO₂, tren 30 hari",
      "Anomaly flag basic & laporan PDF",
      "Role-based access control",
    ],
  },
  {
    phase: "Phase 2",
    label: "Growth",
    duration: "2–3 bulan",
    status: "Planned",
    statusColor: "text-emas bg-emas/10",
    target: "50 client",
    items: [
      "WhatsApp Bot input fuel log",
      "Anomaly detection lengkap",
      "Approval workflow + notifikasi email",
      "Analytics breakdown per driver/lokasi",
      "Multi-currency support",
      "Mobile PWA optimization",
    ],
  },
  {
    phase: "Phase 3",
    label: "Scale",
    duration: "3–4 bulan",
    status: "Upcoming",
    statusColor: "text-jati bg-jati/10",
    target: "100+ client",
    items: [
      "IoT sensor integrasi (MQTT + AWS IoT Core)",
      "GPS tracking kendaraan",
      "Native Android app",
      "Public API untuk integrasi pihak ketiga",
      "Revenue positive target",
    ],
  },
  {
    phase: "Phase 4",
    label: "Advanced",
    duration: "Ongoing",
    status: "Future",
    statusColor: "text-abu bg-pasir",
    target: "Enterprise segment",
    items: [
      "AI prediksi konsumsi BBM",
      "Carbon credit marketplace",
      "White-label platform",
      "ERP integration",
      "Advanced ESG reporting suite",
    ],
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-32 relative border-t border-rimba/10 bg-pasir/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="font-ui text-xs text-rimba tracking-widest uppercase mb-4">
            — Roadmap —
          </div>
          <h2 className="font-display text-4xl font-normal tracking-tight mb-4 text-arang">
            Dari MVP ke Enterprise
          </h2>
          <p className="font-ui text-abu text-sm max-w-md mx-auto">
            Pengembangan bertahap yang terfokus. Setiap fase membuka nilai baru
            untuk pengguna dan pasar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {phases.map((p, i) => (
            <div key={i}
              className={`card-white card-hover rounded-2xl p-6 ${i === 0 ? "border-rimba/25" : ""}`}>
              <div className="flex items-center justify-between mb-5">
                <span className="font-ui text-xs text-abu">{p.phase}</span>
                <span className={`font-ui text-xs px-2 py-0.5 rounded-full ${p.statusColor}`}>
                  {p.status}
                </span>
              </div>

              <div className="font-display text-xl mb-1 text-arang">{p.label}</div>
              <div className="font-ui text-xs text-abu mb-4">{p.duration}</div>

              <div className="font-ui text-xs text-rimba/70 mb-4 pb-4 border-b border-rimba/10">
                Target: {p.target}
              </div>

              <ul className="space-y-2">
                {p.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 font-ui text-xs text-abu">
                    <span className="text-rimba/60 mt-0.5 flex-shrink-0">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
