"use client";
import { useState } from "react";

const plans = [
  {
    id: "freemium",
    name: "Freemium",
    price: null,
    priceLabel: "Gratis",
    period: "",
    maxAssets: "1 aset",
    maxUsers: "1 user",
    featured: false,
    cta: "Mulai Gratis",
    ctaStyle: "border border-rimba/20 hover:border-rimba/40 text-arang/70 hover:text-arang",
    features: [
      { text: "Dashboard basic", ok: true },
      { text: "Input fuel log manual", ok: true },
      { text: "Kalkulasi CO₂ otomatis", ok: true },
      { text: "1 kendaraan / aset", ok: true },
      { text: "Laporan PDF", ok: false },
      { text: "Multi-user", ok: false },
      { text: "Approval workflow", ok: false },
      { text: "API access", ok: false },
      { text: "WhatsApp Bot", ok: false },
      { text: "Anomaly detection", ok: false },
    ],
  },
  {
    id: "starter",
    name: "Starter",
    price: 299000,
    priceLabel: "299K",
    period: "/bulan",
    maxAssets: "10 aset",
    maxUsers: "3 user",
    featured: false,
    cta: "Pilih Starter",
    ctaStyle: "border border-rimba/20 hover:border-rimba/40 text-arang/70 hover:text-arang",
    features: [
      { text: "Semua fitur Freemium", ok: true },
      { text: "10 kendaraan / aset", ok: true },
      { text: "3 user seat", ok: true },
      { text: "Laporan PDF", ok: true },
      { text: "Approval workflow", ok: true },
      { text: "Anomaly detection basic", ok: true },
      { text: "API access", ok: false },
      { text: "WhatsApp Bot", ok: false },
      { text: "IoT sensor", ok: false },
      { text: "White-label", ok: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 799000,
    priceLabel: "799K",
    period: "/bulan",
    maxAssets: "50 aset",
    maxUsers: "10 user",
    featured: true,
    cta: "Pilih Pro",
    ctaStyle: "bg-rimba hover:bg-jati text-lontar font-semibold glow-rimba",
    features: [
      { text: "Semua fitur Starter", ok: true },
      { text: "50 kendaraan / aset", ok: true },
      { text: "10 user seat", ok: true },
      { text: "API access publik", ok: true },
      { text: "WhatsApp Bot input", ok: true },
      { text: "Anomaly detection full", ok: true },
      { text: "Analitik per driver/lokasi", ok: true },
      { text: "Mobile PWA", ok: true },
      { text: "IoT sensor", ok: false },
      { text: "White-label", ok: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    priceLabel: "Custom",
    period: "",
    maxAssets: "Unlimited",
    maxUsers: "Unlimited",
    featured: false,
    cta: "Hubungi Sales",
    ctaStyle: "border border-emas/30 hover:border-emas/60 text-emas hover:text-emas",
    features: [
      { text: "Semua fitur Pro", ok: true },
      { text: "Unlimited aset & user", ok: true },
      { text: "IoT sensor & GPS tracker", ok: true },
      { text: "White-label platform", ok: true },
      { text: "Dedicated support & SLA", ok: true },
      { text: "Onboarding & training", ok: true },
      { text: "ERP integration", ok: true },
      { text: "Custom domain", ok: true },
      { text: "AI prediksi konsumsi", ok: true },
      { text: "Carbon credit marketplace", ok: true },
    ],
  },
];

const tableFeatures = [
  { label: "Jumlah aset", values: ["1", "10", "50", "∞"] },
  { label: "Jumlah user/seat", values: ["1", "3", "10", "∞"] },
  { label: "Dashboard & analytics", values: ["✓", "✓", "✓", "✓"] },
  { label: "Kalkulasi CO₂ otomatis", values: ["✓", "✓", "✓", "✓"] },
  { label: "Laporan PDF", values: ["—", "✓", "✓", "✓"] },
  { label: "Approval workflow", values: ["—", "✓", "✓", "✓"] },
  { label: "API access", values: ["—", "—", "✓", "✓"] },
  { label: "WhatsApp Bot", values: ["—", "—", "✓", "✓"] },
  { label: "Anomaly detection", values: ["—", "Basic", "Full", "Full"] },
  { label: "IoT sensor & GPS", values: ["—", "—", "—", "✓"] },
  { label: "White-label", values: ["—", "—", "—", "✓"] },
  { label: "Dedicated support", values: ["—", "—", "—", "✓"] },
];

export default function Pricing() {
  const [showTable, setShowTable] = useState(false);

  return (
    <section id="pricing" className="py-32 relative bg-pasir/30 border-t border-rimba/10">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="font-ui text-xs text-rimba tracking-widest uppercase mb-4">
            — Pricing —
          </div>
          <h2 className="font-display text-4xl font-normal tracking-tight mb-4 text-arang">
            Mulai Gratis, Skalakan
            <br />
            <span className="text-abu font-display">Sesuai Pertumbuhan</span>
          </h2>
          <p className="font-ui text-abu text-sm max-w-sm mx-auto">
            Tidak perlu kartu kredit untuk memulai. Upgrade kapan saja.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`card-white card-hover rounded-2xl p-6 flex flex-col relative ${
                plan.featured ? "border-rimba/30 shadow-lg shadow-rimba/8" : ""
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="font-ui text-xs bg-rimba text-lontar px-3 py-1 rounded-full">
                    Paling Populer
                  </span>
                </div>
              )}

              <div className="mb-5">
                <div className={`font-display text-base mb-1 text-arang`}>{plan.name}</div>
                <div className="font-ui text-xs text-abu/60">{plan.maxAssets} · {plan.maxUsers}</div>
              </div>

              <div className="flex items-baseline gap-1 mb-6 pb-5 border-b border-rimba/10">
                {plan.price ? (
                  <>
                    <span className="font-ui text-xs text-abu mr-0.5">Rp</span>
                    <span className="font-display text-3xl text-arang">{plan.priceLabel}</span>
                    <span className="font-ui text-xs text-abu">{plan.period}</span>
                  </>
                ) : (
                  <span className="font-display text-2xl text-arang">{plan.priceLabel}</span>
                )}
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 font-ui text-xs">
                    <span className={`mt-0.5 flex-shrink-0 w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                      f.ok ? "bg-rimba/15 text-rimba" : "bg-pasir text-abu/30"
                    }`}>
                      {f.ok ? (
                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                          <polyline points="1,3.5 2.5,5 6,1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      ) : (
                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                          <line x1="2" y1="3.5" x2="5" y2="3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      )}
                    </span>
                    <span className={f.ok ? "text-arang/75" : "text-abu/40"}>{f.text}</span>
                  </li>
                ))}
              </ul>

              <a href="#" className={`block text-center font-ui text-sm py-2.5 rounded-xl transition-all duration-200 ${plan.ctaStyle}`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Comparison toggle */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowTable(!showTable)}
            className="font-ui text-xs text-abu/60 hover:text-rimba transition-colors tracking-widest uppercase"
          >
            {showTable ? "▲ Sembunyikan" : "▼ Lihat perbandingan lengkap"}
          </button>
        </div>

        {showTable && (
          <div className="card-white rounded-2xl overflow-hidden">
            <table className="w-full font-ui text-sm">
              <thead>
                <tr className="border-b border-rimba/10">
                  <th className="text-left px-6 py-4 text-xs text-abu uppercase tracking-widest w-2/5">Fitur</th>
                  {["Freemium", "Starter", "Pro", "Enterprise"].map((h, i) => (
                    <th key={h} className={`px-4 py-4 text-xs uppercase tracking-widest text-center ${
                      i === 2 ? "text-rimba" : "text-abu"
                    }`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableFeatures.map((row, i) => (
                  <tr key={i} className={`border-b border-rimba/6 last:border-0 ${i % 2 === 0 ? "bg-pasir/30" : ""}`}>
                    <td className="px-6 py-3 text-xs text-arang/70">{row.label}</td>
                    {row.values.map((v, j) => (
                      <td key={j} className={`px-4 py-3 text-center font-ui text-xs ${
                        v === "✓" ? "text-rimba" : v === "—" ? "text-abu/25" : j === 2 ? "text-rimba" : "text-arang/70"
                      } ${j === 2 ? "bg-rimba/3" : ""}`}>
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
