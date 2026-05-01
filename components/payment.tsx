"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────
interface PlanDetail {
    id: string;
    name: string;
    priceLabel: string;
    price: number | null;
    period: string;
    maxAssets: string;
    maxUsers: string;
    features: string[];
    badge?: string;
}

type PaymentMethod = "transfer" | "va_bca" | "va_mandiri" | "va_bni" | "qris";

// ─── Plan Data (mirror dari Pricing.tsx) ─────────────────────────────────────
const PLANS: Record<string, PlanDetail> = {
    freemium: {
        id: "freemium",
        name: "Freemium",
        priceLabel: "Gratis",
        price: null,
        period: "",
        maxAssets: "3 aset",
        maxUsers: "3 user",
        features: ["Input fuel log manual", "Kalkulasi CO₂ otomatis", "3 kendaraan / aset"],
    },
    starter: {
        id: "starter",
        name: "Starter",
        priceLabel: "799K",
        price: 799000,
        period: "/bulan",
        maxAssets: "15 aset",
        maxUsers: "15 user",
        features: ["Semua fitur Freemium", "15 kendaraan / aset", "Laporan PDF", "Approval workflow"],
    },
    pro: {
        id: "pro",
        name: "Pro",
        priceLabel: "1.5K",
        price: 1500000,
        period: "/bulan",
        maxAssets: "80 aset",
        maxUsers: "80 user",
        badge: "Paling Populer",
        features: ["Semua fitur Starter", "WhatsApp Bot input", "Analitik per driver/lokasi", "Mobile PWA"],
    },
    enterprise: {
        id: "enterprise",
        name: "Enterprise",
        priceLabel: "Custom",
        price: null,
        period: "",
        maxAssets: "Unlimited",
        maxUsers: "Unlimited",
        features: ["Semua fitur Pro", "IoT sensor & GPS tracker", "White-label platform", "Dedicated SLA"],
    },
};

// ─── Mandala Logo ─────────────────────────────────────────────────────────────
function MandalaLogo({ size = 38 }: { size?: number }) {
    const cx = size / 2;
    const cy = size / 2;
    const outerR = cx * 0.82;
    const nodeR = size * 0.082;
    const dirs = [0, 45, 90, 135, 180, 225, 270, 315];
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
            <circle cx={cx} cy={cy} r={cx - 1} stroke="rgba(247,245,239,0.15)" strokeWidth="1" />
            {dirs.map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const nx = cx + Math.cos(rad) * outerR;
                const ny = cy + Math.sin(rad) * outerR;
                return (
                    <g key={deg}>
                        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="rgba(247,245,239,0.2)" strokeWidth="0.8" />
                        <circle cx={nx} cy={ny} r={nodeR} fill="#2A9478" />
                    </g>
                );
            })}
            <circle cx={cx} cy={cy} r={nodeR * 1.4} fill="#B8962E" />
        </svg>
    );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ plan, kycName, kycCompany }: { plan: PlanDetail; kycName: string; kycCompany: string }) {
    return (
        <aside
            className="hidden lg:flex flex-col sticky top-0 h-screen px-10 py-12 overflow-hidden"
            style={{
                width: 360,
                flexShrink: 0,
                background: "#4A3728",
                backgroundImage:
                    "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(29,107,90,0.35) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 70% 80%, rgba(184,150,46,0.12) 0%, transparent 55%)",
            }}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-14">
                <MandalaLogo size={38} />
                <div className="flex flex-col leading-none">
                    <span className="font-display text-xl font-medium text-lontar">Nawasanga</span>
                    <span className="font-ui text-[9px] uppercase tracking-[0.18em] text-abu mt-0.5">ESG Platform</span>
                </div>
            </div>

            {/* Headline */}
            <h2 className="font-display text-[1.85rem] font-normal leading-[1.22] text-lontar mb-4">
                Satu langkah lagi<br />menuju{" "}
                <em className="italic" style={{ color: "#D4AF5A" }}>emisi terkendali</em>.
            </h2>
            <p className="font-ui text-sm leading-relaxed mb-10" style={{ color: "rgba(247,245,239,0.5)" }}>
                Selesaikan pembayaran untuk mengaktifkan akun Anda dan mulai memantau emisi karbon perusahaan secara real-time.
            </p>

            {/* Plan summary box */}
            <div
                className="rounded-2xl p-5 mb-6"
                style={{
                    background: "rgba(247,245,239,0.05)",
                    border: "1px solid rgba(247,245,239,0.1)",
                }}
            >
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <div className="font-ui text-[10px] uppercase tracking-widest text-abu mb-1">Paket Terpilih</div>
                        <div className="font-display text-xl text-lontar">{plan.name}</div>
                        {plan.badge && (
                            <span className="font-ui text-[10px] bg-rimba text-lontar px-2 py-0.5 rounded-full mt-1 inline-block">
                {plan.badge}
              </span>
                        )}
                    </div>
                    <div className="text-right">
                        {plan.price ? (
                            <>
                                <div className="font-ui text-[10px] text-abu">Rp</div>
                                <div className="font-display text-2xl text-emas-light">{plan.priceLabel}</div>
                                <div className="font-ui text-[10px] text-abu">{plan.period}</div>
                            </>
                        ) : (
                            <div className="font-display text-xl text-lontar">{plan.priceLabel}</div>
                        )}
                    </div>
                </div>
                <div className="flex gap-3 mb-4">
                    <span className="font-ui text-[11px] text-abu/70 bg-white/5 rounded-full px-3 py-1">{plan.maxAssets}</span>
                    <span className="font-ui text-[11px] text-abu/70 bg-white/5 rounded-full px-3 py-1">{plan.maxUsers}</span>
                </div>
                <div className="w-full h-px bg-white/10 mb-4" />
                <ul className="flex flex-col gap-2">
                    {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 font-ui text-[11px]" style={{ color: "rgba(247,245,239,0.6)" }}>
              <span
                  className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(42,148,120,0.3)" }}
              >
                <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                  <polyline points="1,3.5 2.5,5 6,1.5" stroke="#2A9478" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </span>
                            {f}
                        </li>
                    ))}
                </ul>
            </div>

            {/* KYC data snippet */}
            {(kycName || kycCompany) && (
                <div
                    className="rounded-xl px-4 py-3"
                    style={{ background: "rgba(184,150,46,0.08)", border: "1px solid rgba(184,150,46,0.2)" }}
                >
                    <div className="font-ui text-[10px] uppercase tracking-widest mb-2" style={{ color: "rgba(212,175,90,0.7)" }}>
                        Data Pemohon
                    </div>
                    {kycName && (
                        <div className="font-ui text-[12px] text-lontar font-medium">{kycName}</div>
                    )}
                    {kycCompany && (
                        <div className="font-ui text-[11px] text-abu/60">{kycCompany}</div>
                    )}
                </div>
            )}

            {/* Security badges */}
            <div className="mt-auto flex items-center gap-2 pt-8" style={{ borderTop: "1px solid rgba(247,245,239,0.08)" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1L2 3v4c0 3 2.5 5.5 5 6 2.5-.5 5-3 5-6V3L7 1z" stroke="rgba(247,245,239,0.3)" strokeWidth="1" fill="none" />
                    <path d="M4.5 7l1.5 1.5 3-3" stroke="rgba(247,245,239,0.3)" strokeWidth="1" strokeLinecap="round" />
                </svg>
                <span className="font-ui text-[10px] tracking-wide" style={{ color: "rgba(247,245,239,0.3)" }}>
          SSL Terenkripsi · 256-bit · PCI DSS
        </span>
            </div>
        </aside>
    );
}

// ─── Payment Method Card ──────────────────────────────────────────────────────
function MethodCard({
                        id, label, desc, icon, selected, onSelect,
                    }: {
    id: PaymentMethod; label: string; desc: string; icon: React.ReactNode;
    selected: boolean; onSelect: () => void;
}) {
    return (
        <button
            onClick={onSelect}
            className="w-full text-left flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200"
            style={{
                background: selected ? "rgba(29,107,90,0.06)" : "transparent",
                border: `1.5px solid ${selected ? "#1D6B5A" : "rgba(29,107,90,0.12)"}`,
                boxShadow: selected ? "0 0 0 3px rgba(29,107,90,0.08)" : "none",
            }}
        >
            <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: selected ? "rgba(29,107,90,0.1)" : "rgba(237,234,224,0.8)" }}
            >
                {icon}
            </div>
            <div className="flex-1">
                <div className="font-ui text-[13px] font-medium text-arang">{label}</div>
                <div className="font-ui text-[11px] text-abu/60">{desc}</div>
            </div>
            <div
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                style={{
                    borderColor: selected ? "#1D6B5A" : "rgba(29,107,90,0.25)",
                    background: selected ? "#1D6B5A" : "transparent",
                }}
            >
                {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
        </button>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Payment() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const planId = searchParams.get("plan") || "starter";
    const plan = PLANS[planId] || PLANS["starter"];

    // KYC data – in production, get from sessionStorage or server state
    const [kycData, setKycData] = useState({ name: "", company: "", email: "", npwp: "" });
    useEffect(() => {
        // Try sessionStorage
        try {
            const stored = sessionStorage.getItem("nawasanga_kyc");
            if (stored) {
                const d = JSON.parse(stored);
                setKycData({
                    name: `${d.firstName || ""} ${d.lastName || ""}`.trim(),
                    company: d.companyName || "",
                    email: d.email || "",
                    npwp: d.npwp || "",
                });
            }
        } catch {
            // Demo fallback
            setKycData({ name: "Rendra Kusuma", company: "PT Hijau Nusantara", email: "rendra@hijaunusantara.co.id", npwp: "72.123.456.7-001.000" });
        }
    }, []);

    const [method, setMethod] = useState<PaymentMethod>("va_bca");
    const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
    const [promoCode, setPromoCode] = useState("");
    const [promoApplied, setPromoApplied] = useState(false);
    const [promoError, setPromoError] = useState("");
    const [loading, setLoading] = useState(false);
    const [paid, setPaid] = useState(false);

    const basePrice = plan.price || 0;
    const yearlyDiscount = 0.2;
    const promoDiscount = promoApplied ? 0.1 : 0;
    const periodMultiplier = billingPeriod === "yearly" ? 12 * (1 - yearlyDiscount) : 1;
    const subtotal = basePrice * periodMultiplier;
    const promoAmount = subtotal * promoDiscount;
    const tax = (subtotal - promoAmount) * 0.11; // PPN 11%
    const total = subtotal - promoAmount + tax;

    function fmtRp(n: number) {
        return "Rp " + Math.round(n).toLocaleString("id-ID");
    }

    function handlePromo() {
        if (promoCode.toUpperCase() === "NAWASANGA10") {
            setPromoApplied(true);
            setPromoError("");
        } else {
            setPromoApplied(false);
            setPromoError("Kode promo tidak valid.");
        }
    }

    async function handlePay() {
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1800));
        setLoading(false);
        setPaid(true);
    }

    // ─── Success State ─────────────────────────────────────────────────────────
    if (paid) {
        return (
            <div
                className="min-h-screen flex items-center justify-center px-6"
                style={{ background: "var(--lontar)" }}
            >
                <div className="max-w-md w-full text-center">
                    <div
                        className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                        style={{ background: "rgba(29,107,90,0.1)", border: "2px solid rgba(29,107,90,0.3)" }}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <polyline points="6,16 12,22 26,9" stroke="#1D6B5A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h2 className="font-display text-3xl text-arang mb-2">Pembayaran Berhasil</h2>
                    <p className="font-ui text-sm text-abu mb-1">
                        Akun <span className="text-arang font-medium">{plan.name}</span> Anda telah aktif.
                    </p>
                    <p className="font-ui text-xs text-abu/60 mb-8">
                        Email konfirmasi dikirim ke{" "}
                        <span className="text-rimba">{kycData.email || "email Anda"}</span>
                    </p>

                    <div
                        className="rounded-2xl p-5 text-left mb-8"
                        style={{ background: "#fff", border: "1px solid rgba(29,107,90,0.12)" }}
                    >
                        <div className="font-ui text-[10px] uppercase tracking-widest text-abu mb-3">Ringkasan Transaksi</div>
                        {[
                            { label: "No. Transaksi", value: `NWS-${Date.now().toString().slice(-8)}` },
                            { label: "Paket", value: plan.name },
                            { label: "Periode", value: billingPeriod === "yearly" ? "Tahunan" : "Bulanan" },
                            { label: "Total", value: plan.price ? fmtRp(total) : "Gratis" },
                        ].map((r) => (
                            <div key={r.label} className="flex justify-between font-ui text-[12px] mb-2 last:mb-0">
                                <span className="text-abu">{r.label}</span>
                                <span className="text-arang font-medium">{r.value}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => router.push("/")}
                        className="w-full font-ui text-sm py-3 rounded-xl text-lontar font-semibold transition-all duration-200"
                        style={{ background: "#1D6B5A" }}
                    >
                        Kembali ke Home →
                    </button>
                </div>
            </div>
        );
    }

    // ─── Enterprise / Freemium special case ────────────────────────────────────
    if (plan.id === "freemium" || plan.id === "enterprise") {
        return (
            <div className="min-h-screen flex" style={{ background: "var(--lontar)" }}>
                <Sidebar plan={plan} kycName={kycData.name} kycCompany={kycData.company} />
                <main className="flex-1 flex items-center justify-center px-8">
                    <div className="max-w-md w-full text-center">
                        {plan.id === "freemium" ? (
                            <>
                                <div
                                    className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center"
                                    style={{ background: "rgba(29,107,90,0.08)", border: "1px solid rgba(29,107,90,0.2)" }}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <polyline points="4,12 9,17 20,6" stroke="#1D6B5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h2 className="font-display text-3xl text-arang mb-2">Akun Gratis</h2>
                                <p className="font-ui text-sm text-abu mb-6">
                                    Tidak perlu pembayaran. Akun Anda langsung aktif setelah KYC diverifikasi.
                                </p>
                                <button
                                    onClick={() => router.push("/dashboard")}
                                    className="w-full font-ui text-sm py-3 rounded-xl text-lontar font-semibold"
                                    style={{ background: "#1D6B5A" }}
                                >
                                    Buka Dashboard →
                                </button>
                            </>
                        ) : (
                            <>
                                <div
                                    className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center"
                                    style={{ background: "rgba(184,150,46,0.08)", border: "1px solid rgba(184,150,46,0.2)" }}
                                >
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <path d="M11 2L13.5 8.5H20.5L15 12.5L17 19L11 15L5 19L7 12.5L1.5 8.5H8.5L11 2Z" stroke="#B8962E" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h2 className="font-display text-3xl text-arang mb-2">Enterprise</h2>
                                <p className="font-ui text-sm text-abu mb-6">
                                    Harga disesuaikan dengan kebutuhan dan skala bisnis Anda. Tim kami akan menghubungi dalam 1×24 jam.
                                </p>
                                <div
                                    className="rounded-xl p-4 mb-6 text-left"
                                    style={{ background: "rgba(184,150,46,0.05)", border: "1px solid rgba(184,150,46,0.2)" }}
                                >
                                    {kycData.email && (
                                        <div className="font-ui text-xs text-abu">
                                            Kami akan menghubungi <span className="text-emas font-medium">{kycData.email}</span>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => router.push("/dashboard")}
                                    className="w-full font-ui text-sm py-3 rounded-xl font-semibold transition-all duration-200"
                                    style={{ border: "1px solid rgba(184,150,46,0.4)", color: "#B8962E" }}
                                >
                                    Kembali ke Beranda
                                </button>
                            </>
                        )}
                    </div>
                </main>
            </div>
        );
    }

    // ─── Main Payment Form ─────────────────────────────────────────────────────
    return (
        <div className="min-h-screen flex" style={{ background: "var(--lontar)" }}>
            <Sidebar plan={plan} kycName={kycData.name} kycCompany={kycData.company} />

            <main className="flex-1 overflow-y-auto px-6 py-12 lg:px-14">
                <div className="max-w-xl mx-auto">

                    {/* Header */}
                    <div className="mb-10">
                        <div className="font-ui text-xs text-rimba tracking-widest uppercase mb-2">— Pembayaran —</div>
                        <h1 className="font-display text-3xl font-normal text-arang leading-tight">
                            Aktivasi Paket{" "}
                            <em className="italic text-rimba">{plan.name}</em>
                        </h1>
                    </div>

                    {/* Billing Period Toggle */}
                    {plan.price && (
                        <div className="mb-8">
                            <div className="font-ui text-xs text-abu uppercase tracking-widest mb-3">Periode Berlangganan</div>
                            <div
                                className="flex rounded-xl p-1 gap-1"
                                style={{ background: "var(--pasir)", border: "1px solid rgba(29,107,90,0.1)" }}
                            >
                                {(["monthly", "yearly"] as const).map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setBillingPeriod(p)}
                                        className="flex-1 font-ui text-sm py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                                        style={{
                                            background: billingPeriod === p ? "#fff" : "transparent",
                                            color: billingPeriod === p ? "var(--arang)" : "var(--abu)",
                                            boxShadow: billingPeriod === p ? "0 1px 4px rgba(29,107,90,0.1)" : "none",
                                            border: billingPeriod === p ? "1px solid rgba(29,107,90,0.15)" : "1px solid transparent",
                                        }}
                                    >
                                        {p === "monthly" ? "Bulanan" : "Tahunan"}
                                        {p === "yearly" && (
                                            <span
                                                className="font-ui text-[10px] px-1.5 py-0.5 rounded-full"
                                                style={{ background: "rgba(29,107,90,0.12)", color: "#1D6B5A" }}
                                            >
                        Hemat 20%
                      </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Order Summary */}
                    <div
                        className="rounded-2xl p-5 mb-8"
                        style={{ background: "#fff", border: "1px solid rgba(29,107,90,0.12)" }}
                    >
                        <div className="font-ui text-[10px] uppercase tracking-widest text-abu mb-4">Ringkasan Pesanan</div>

                        {/* KYC summary row */}
                        <div
                            className="flex items-center gap-3 p-3 rounded-xl mb-4"
                            style={{ background: "var(--pasir)", border: "1px solid rgba(29,107,90,0.08)" }}
                        >
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ background: "rgba(29,107,90,0.1)" }}
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <circle cx="7" cy="5" r="2.5" stroke="#1D6B5A" strokeWidth="1.2" />
                                    <path d="M2 12c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" stroke="#1D6B5A" strokeWidth="1.2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-ui text-[12px] font-medium text-arang truncate">
                                    {kycData.name || "—"}
                                </div>
                                <div className="font-ui text-[11px] text-abu/60 truncate">
                                    {kycData.company || "—"} · {kycData.email || "—"}
                                </div>
                            </div>
                            <button
                                onClick={() => router.back()}
                                className="font-ui text-[11px] text-rimba hover:underline flex-shrink-0"
                            >
                                Edit
                            </button>
                        </div>

                        {/* Price breakdown */}
                        <div className="space-y-2.5 mb-4">
                            <div className="flex justify-between font-ui text-[13px]">
                <span className="text-abu">
                  {plan.name} {billingPeriod === "yearly" ? "(12 bulan)" : "(1 bulan)"}
                </span>
                                <span className="text-arang">{fmtRp(basePrice * (billingPeriod === "yearly" ? 12 : 1))}</span>
                            </div>
                            {billingPeriod === "yearly" && (
                                <div className="flex justify-between font-ui text-[13px]">
                                    <span className="text-rimba">Diskon Tahunan (20%)</span>
                                    <span className="text-rimba">- {fmtRp(basePrice * 12 * yearlyDiscount)}</span>
                                </div>
                            )}
                            {promoApplied && (
                                <div className="flex justify-between font-ui text-[13px]">
                                    <span className="text-rimba">Kode Promo (10%)</span>
                                    <span className="text-rimba">- {fmtRp(promoAmount)}</span>
                                </div>
                            )}
                            <div className="flex justify-between font-ui text-[13px]">
                                <span className="text-abu">PPN 11%</span>
                                <span className="text-arang">{fmtRp(tax)}</span>
                            </div>
                        </div>

                        <div
                            className="flex justify-between items-center pt-4"
                            style={{ borderTop: "1px solid rgba(29,107,90,0.1)" }}
                        >
                            <span className="font-display text-base text-arang">Total</span>
                            <div className="text-right">
                                <div className="font-display text-2xl text-arang">{fmtRp(total)}</div>
                                <div className="font-ui text-[10px] text-abu/50">
                                    {billingPeriod === "yearly" ? "dibayar sekaligus" : "per bulan"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Promo Code */}
                    <div className="mb-8">
                        <div className="font-ui text-xs text-abu uppercase tracking-widest mb-3">Kode Promo</div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={promoCode}
                                onChange={(e) => { setPromoCode(e.target.value.toUpperCase()); setPromoError(""); setPromoApplied(false); }}
                                placeholder="Masukkan kode..."
                                className="flex-1 font-ui text-sm px-4 py-2.5 rounded-xl outline-none transition-all duration-200"
                                style={{
                                    background: "#fff",
                                    border: `1.5px solid ${promoError ? "#C14B2A" : promoApplied ? "#1D6B5A" : "rgba(29,107,90,0.15)"}`,
                                    color: "var(--arang)",
                                }}
                            />
                            <button
                                onClick={handlePromo}
                                disabled={!promoCode}
                                className="font-ui text-sm px-4 py-2.5 rounded-xl transition-all duration-200"
                                style={{
                                    background: promoCode ? "rgba(29,107,90,0.08)" : "var(--pasir)",
                                    border: "1.5px solid rgba(29,107,90,0.15)",
                                    color: promoCode ? "#1D6B5A" : "var(--abu)",
                                }}
                            >
                                Pakai
                            </button>
                        </div>
                        {promoError && <div className="font-ui text-[11px] text-tanah mt-1.5">{promoError}</div>}
                        {promoApplied && <div className="font-ui text-[11px] text-rimba mt-1.5">✓ Promo berhasil diterapkan!</div>}
                    </div>

                    {/* Payment Method */}
                    <div className="mb-8">
                        <div className="font-ui text-xs text-abu uppercase tracking-widest mb-3">Metode Pembayaran</div>
                        <div className="flex flex-col gap-2.5">
                            <MethodCard
                                id="va_bca"
                                label="Virtual Account BCA"
                                desc="Transfer 24 jam · Konfirmasi otomatis"
                                selected={method === "va_bca"}
                                onSelect={() => setMethod("va_bca")}
                                icon={
                                    <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
                                        <rect width="22" height="14" rx="3" fill="#005BAC" opacity="0.15" />
                                        <text x="4" y="10" fontFamily="Arial" fontSize="7" fontWeight="bold" fill="#005BAC">BCA</text>
                                    </svg>
                                }
                            />
                            <MethodCard
                                id="va_mandiri"
                                label="Virtual Account Mandiri"
                                desc="Transfer 24 jam · Konfirmasi otomatis"
                                selected={method === "va_mandiri"}
                                onSelect={() => setMethod("va_mandiri")}
                                icon={
                                    <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
                                        <rect width="22" height="14" rx="3" fill="#003D7C" opacity="0.15" />
                                        <text x="2" y="10" fontFamily="Arial" fontSize="6.5" fontWeight="bold" fill="#003D7C">MNDRI</text>
                                    </svg>
                                }
                            />
                            <MethodCard
                                id="va_bni"
                                label="Virtual Account BNI"
                                desc="Transfer 24 jam · Konfirmasi otomatis"
                                selected={method === "va_bni"}
                                onSelect={() => setMethod("va_bni")}
                                icon={
                                    <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
                                        <rect width="22" height="14" rx="3" fill="#F96B27" opacity="0.15" />
                                        <text x="4" y="10" fontFamily="Arial" fontSize="7" fontWeight="bold" fill="#F96B27">BNI</text>
                                    </svg>
                                }
                            />
                            <MethodCard
                                id="qris"
                                label="QRIS"
                                desc="Scan QR · Semua e-wallet & m-banking"
                                selected={method === "qris"}
                                onSelect={() => setMethod("qris")}
                                icon={
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <rect x="1" y="1" width="6" height="6" rx="1" stroke="#1D6B5A" strokeWidth="1.2" fill="none" />
                                        <rect x="3" y="3" width="2" height="2" fill="#1D6B5A" />
                                        <rect x="11" y="1" width="6" height="6" rx="1" stroke="#1D6B5A" strokeWidth="1.2" fill="none" />
                                        <rect x="13" y="3" width="2" height="2" fill="#1D6B5A" />
                                        <rect x="1" y="11" width="6" height="6" rx="1" stroke="#1D6B5A" strokeWidth="1.2" fill="none" />
                                        <rect x="3" y="13" width="2" height="2" fill="#1D6B5A" />
                                        <rect x="11" y="11" width="2" height="2" fill="#1D6B5A" />
                                        <rect x="15" y="11" width="2" height="2" fill="#1D6B5A" />
                                        <rect x="11" y="15" width="6" height="2" fill="#1D6B5A" />
                                    </svg>
                                }
                            />
                            <MethodCard
                                id="transfer"
                                label="Transfer Bank Manual"
                                desc="Konfirmasi 1–2 hari kerja"
                                selected={method === "transfer"}
                                onSelect={() => setMethod("transfer")}
                                icon={
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <rect x="1" y="5" width="16" height="10" rx="2" stroke="#7A7A72" strokeWidth="1.2" fill="none" />
                                        <path d="M1 8h16" stroke="#7A7A72" strokeWidth="1.2" />
                                        <rect x="3" y="10.5" width="4" height="2" rx="0.5" fill="#7A7A72" opacity="0.5" />
                                        <path d="M5 2l3-1.5 3 1.5" stroke="#7A7A72" strokeWidth="1" strokeLinecap="round" />
                                    </svg>
                                }
                            />
                        </div>
                    </div>

                    {/* Billing info (NPWP for invoice) */}
                    {kycData.npwp && (
                        <div
                            className="rounded-xl p-4 mb-8 flex items-start gap-3"
                            style={{ background: "rgba(29,107,90,0.04)", border: "1px solid rgba(29,107,90,0.1)" }}
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
                                <circle cx="7" cy="7" r="6" stroke="#1D6B5A" strokeWidth="1" fill="none" />
                                <path d="M7 6v4M7 4.5v.5" stroke="#1D6B5A" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                            <div className="font-ui text-[11px] text-abu/70 leading-relaxed">
                                Faktur pajak akan diterbitkan atas nama{" "}
                                <span className="text-arang font-medium">{kycData.company}</span> dengan NPWP{" "}
                                <span className="text-arang font-medium">{kycData.npwp}</span> dan dikirim ke email terdaftar.
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    <button
                        onClick={handlePay}
                        disabled={loading}
                        className="w-full font-ui text-sm py-3.5 rounded-xl text-lontar font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                        style={{
                            background: loading ? "rgba(29,107,90,0.5)" : "#1D6B5A",
                            boxShadow: loading ? "none" : "0 0 24px rgba(29,107,90,0.2), 0 0 48px rgba(29,107,90,0.08)",
                        }}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="6" stroke="rgba(247,245,239,0.3)" strokeWidth="2" />
                                    <path d="M8 2a6 6 0 0 1 6 6" stroke="rgba(247,245,239,0.9)" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                Memproses...
                            </>
                        ) : (
                            <>
                                Bayar Sekarang · {fmtRp(total)}
                            </>
                        )}
                    </button>

                    <p className="font-ui text-[11px] text-center text-abu/50 mt-4">
                        Dengan melanjutkan, Anda menyetujui{" "}
                        <a href="#" className="text-rimba hover:underline">Syarat & Ketentuan</a> dan{" "}
                        <a href="#" className="text-rimba hover:underline">Kebijakan Privasi</a> Nawasanga.
                    </p>
                </div>
            </main>
        </div>
    );
}