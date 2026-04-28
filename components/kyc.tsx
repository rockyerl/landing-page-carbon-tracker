"use client";
import { useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormData {
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    nik: string;
    pob: string;
    dob: string;
    address: string;
    jobTitle: string;
    idType: string;
    companyName: string;
    npwp: string;
    nib: string;
    siup: string;
    foundedYear: string;
    sector: string;
    assetCount: string;
    corpAddress: string;
}

interface UploadedFiles {
    ktp: File | null;
    selfie: File | null;
    npwpDoc: File | null;
    nibDoc: File | null;
    akta: File | null;
}

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

// ─── Sidebar Step Indicator ────────────────────────────────────────────────────
const STEPS = [
    { label: "Akun",              desc: "Email & password" },
    { label: "PIC",               desc: "Data diri" },
    { label: "Data Perusahaan",   desc: "NPWP, NIB, SIUP" },
    { label: "Konfirmasi",        desc: "Tinjau & kirim" },
];

function Sidebar({ currentStep }: { currentStep: number }) {
    return (
        <aside
            className="hidden lg:flex flex-col sticky top-0 h-screen px-10 py-12 overflow-hidden"
            style={{
                width: 380,
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
                    <span className="font-sans text-[9px] uppercase tracking-[0.18em] text-abu mt-0.5">ESG Platform</span>
                </div>
            </div>

            {/* Headline */}
            <h2 className="font-display text-[2rem] font-normal leading-[1.22] text-lontar mb-5">
                Verifikasi akun<br />untuk{" "}
                <em className="italic" style={{ color: "#D4AF5A" }}>akses penuh</em>
                <br />platform.
            </h2>
            <p className="font-sans text-sm leading-relaxed mb-12" style={{ color: "rgba(247,245,239,0.5)" }}>
                Proses KYC ini memastikan data emisi Anda terproteksi dan laporan ESG yang dihasilkan memiliki keabsahan hukum.
            </p>

            {/* Steps */}
            <div className="flex flex-col">
                {STEPS.map((step, i) => {
                    const n = i + 1;
                    const isActive = n === currentStep;
                    const isDone = n < currentStep;
                    return (
                        <div
                            key={n}
                            className="flex items-start gap-3.5 py-3 relative"
                            style={{ opacity: isActive ? 1 : isDone ? 0.65 : 0.35 }}
                        >
                            {/* Connector line */}
                            {i < STEPS.length - 1 && (
                                <div
                                    className="absolute left-[12px] top-9 bottom-[-12px] w-px"
                                    style={{ background: "rgba(247,245,239,0.15)" }}
                                />
                            )}
                            {/* Dot */}
                            <div
                                className="w-[25px] h-[25px] rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-medium transition-all duration-300"
                                style={{
                                    background: isActive ? "#1D6B5A" : isDone ? "rgba(29,107,90,0.4)" : "rgba(247,245,239,0.04)",
                                    border: `1.5px solid ${isActive ? "#2A9478" : isDone ? "#1D6B5A" : "rgba(247,245,239,0.2)"}`,
                                    color: "rgba(247,245,239,0.9)",
                                }}
                            >
                                {isDone ? "✓" : n}
                            </div>
                            {/* Label */}
                            <div className="flex flex-col pt-0.5">
                                <span className="text-[13px] font-medium text-lontar">{step.label}</span>
                                <span className="text-[11px] mt-0.5" style={{ color: "rgba(247,245,239,0.45)" }}>{step.desc}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="mt-auto pt-8" style={{ borderTop: "1px solid rgba(247,245,239,0.08)" }}>
                <p className="text-[11px] leading-relaxed" style={{ color: "rgba(247,245,239,0.3)" }}>
                    Data KYC dienkripsi dan disimpan sesuai<br />
                    UU PDP No. 27 Tahun 2022.{" "}
                    <a href="#" className="hover:underline" style={{ color: "rgba(212,175,90,0.7)" }}>Kebijakan Privasi</a>
                </p>
            </div>
        </aside>
    );
}

// ─── Reusable Field Components ────────────────────────────────────────────────
function Field({
                   label, required, optional, hint, error, children,
               }: {
    label: string; required?: boolean; optional?: boolean;
    hint?: string; error?: string; children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-arang tracking-[0.03em]">
                {label}
                {required && <span className="text-tanah ml-0.5">*</span>}
                {optional && <span className="text-abu font-normal text-[11px] ml-1">(opsional)</span>}
            </label>
            {children}
            {hint && <span className="text-[11px] text-abu leading-relaxed">{hint}</span>}
            {error && <span className="text-[11px] text-tanah">{error}</span>}
        </div>
    );
}

const inputClass =
    "w-full px-3.5 py-2.5 text-sm text-arang bg-white border-[1.5px] border-pasir rounded-[10px] outline-none transition-all duration-200 placeholder:text-abu/40 hover:border-rimba/25 focus:border-rimba focus:shadow-[0_0_0_3px_rgba(29,107,90,0.08)] appearance-none font-sans";

function PasswordInput({
                           id, value, onChange, placeholder,
                       }: {
    id: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
    const [show, setShow] = useState(false);
    return (
        <div className="relative">
            <input
                type={show ? "text" : "password"}
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={inputClass + " pr-11"}
            />
            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-abu/50 hover:text-abu p-1"
            >
                {show ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M1 1l14 14M7 3.1A6.8 6.8 0 0115 8s-.8 1.6-2.2 2.8M1 8s2-4.5 7-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                        <path d="M5.5 5.5A2 2 0 0010.5 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.3"/>
                        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/>
                    </svg>
                )}
            </button>
        </div>
    );
}

function StrengthMeter({ value }: { value: string }) {
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    const colors = ["#C14B2A", "#B8962E", "#2A9478", "#1D6B5A"];
    const labels = ["Lemah", "Cukup", "Kuat", "Sangat Kuat"];

    if (!value) return (
        <p className="text-[11px] text-abu/50 mt-1.5">Gunakan huruf besar, angka, dan simbol.</p>
    );
    const idx = Math.max(0, score - 1);
    return (
        <div className="mt-1.5">
            <div className="h-[3px] bg-pasir rounded-full overflow-hidden mb-1">
                <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${(idx + 1) * 25}%`, background: colors[idx] }}
                />
            </div>
            <span className="text-[11px]" style={{ color: colors[idx] }}>{labels[idx]}</span>
        </div>
    );
}

function RadioCards({
                        options, value, onChange,
                    }: {
    options: { value: string; label: string; desc: string }[];
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="grid grid-cols-2 gap-2.5">
            {options.map((opt) => (
                <label key={opt.value} className="cursor-pointer">
                    <input type="radio" name="sector" value={opt.value} checked={value === opt.value}
                           onChange={() => onChange(opt.value)} className="sr-only" />
                    <div className={`flex items-start gap-3 px-4 py-3.5 rounded-[10px] border-[1.5px] transition-all duration-200 bg-white
            ${value === opt.value ? "border-rimba bg-rimba/[0.03]" : "border-pasir hover:border-rimba/30"}`}>
                        <div className={`w-4 h-4 rounded-full border-[1.5px] flex-shrink-0 mt-0.5 flex items-center justify-center transition-all
              ${value === opt.value ? "border-rimba bg-rimba" : "border-abu/40"}`}>
                            {value === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div>
                            <p className="text-[13px] font-medium text-arang">{opt.label}</p>
                            <p className="text-[11px] text-abu mt-0.5 leading-snug">{opt.desc}</p>
                        </div>
                    </div>
                </label>
            ))}
        </div>
    );
}

function FileUploadZone({
                            id, label, hint, accept, file, onChange, onRemove,
                        }: {
    id: string; label: string; hint: string; accept: string;
    file: File | null; onChange: (f: File) => void; onRemove: () => void;
}) {
    const [dragging, setDragging] = useState(false);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const f = e.dataTransfer.files[0];
        if (f) onChange(f);
    }, [onChange]);

    return (
        <div>
            <label
                htmlFor={id}
                className={`flex flex-col items-center text-center px-6 py-6 rounded-[10px] border-[1.5px] border-dashed cursor-pointer transition-all duration-200 bg-white
          ${dragging ? "border-rimba bg-rimba/5" : "border-pasir hover:border-rimba hover:bg-rimba/[0.02]"}`}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
            >
                <input
                    id={id} type="file" accept={accept} className="sr-only"
                    onChange={(e) => { if (e.target.files?.[0]) onChange(e.target.files[0]); }}
                />
                <div className="w-9 h-9 rounded-lg bg-pasir flex items-center justify-center mb-2.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1v9M5 4l3-3 3 3" stroke="#7A7A72" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 12v1.5A1.5 1.5 0 002.5 15h11A1.5 1.5 0 0015 13.5V12" stroke="#7A7A72" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                </div>
                <p className="text-[13px] font-medium text-arang mb-0.5">{label}</p>
                <p className="text-[11px] text-abu">
                    Seret file ke sini atau <span className="text-rimba">klik untuk pilih</span>
                </p>
                <p className="text-[10px] text-abu/50 mt-1">{hint}</p>
            </label>

            {file && (
                <div className="flex items-center gap-2.5 mt-2 px-3.5 py-2.5 rounded-[10px] border border-rimba/20 bg-rimba/5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 1.5h6.5L12 5v7.5H2V1.5z" stroke="#1D6B5A" strokeWidth="1.3"/>
                        <path d="M8.5 1.5V5H12" stroke="#1D6B5A" strokeWidth="1.3"/>
                    </svg>
                    <span className="text-[12px] text-arang flex-1 truncate">{file.name}</span>
                    <button type="button" onClick={onRemove} className="text-abu/50 hover:text-tanah text-base leading-none">×</button>
                </div>
            )}
        </div>
    );
}

function CheckboxField({
                           id, checked, onChange, children,
                       }: {
    id: string; checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode;
}) {
    return (
        <label htmlFor={id} className="flex items-start gap-2.5 cursor-pointer">
            <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
            <div className={`w-4 h-4 rounded flex-shrink-0 mt-0.5 border-[1.5px] flex items-center justify-center transition-all
        ${checked ? "bg-rimba border-rimba" : "bg-white border-pasir"}`}>
                {checked && (
                    <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                        <polyline points="1,3.5 3,5.5 7,1" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                )}
            </div>
            <span className="text-[13px] text-abu leading-[1.55]">{children}</span>
        </label>
    );
}

function NavButtons({
                        onBack, onNext, nextLabel = "Lanjut", isFirst = false, isLoading = false,
                    }: {
    onBack?: () => void; onNext: () => void;
    nextLabel?: string; isFirst?: boolean; isLoading?: boolean;
}) {
    return (
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-pasir">
            {!isFirst ? (
                <button type="button" onClick={onBack}
                        className="flex items-center gap-1.5 text-[13px] font-medium text-abu hover:text-arang transition-colors group">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:-translate-x-0.5 transition-transform">
                        <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Kembali
                </button>
            ) : <span />}
            <button type="button" onClick={onNext} disabled={isLoading}
                    className={`flex items-center gap-2 px-7 py-3 rounded-[10px] text-[14px] font-medium text-lontar bg-rimba hover:bg-jati transition-all duration-200 group
          ${isLoading ? "opacity-70 pointer-events-none" : "hover:shadow-[0_4px_16px_rgba(29,107,90,0.2)] hover:scale-[1.01] active:scale-[0.99]"}`}>
                {isLoading ? "Mengirim..." : nextLabel}
                {!isLoading && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                )}
            </button>
        </div>
    );
}

function PanelHeader({ step, title, subtitle }: { step: number; title: React.ReactNode; subtitle: string }) {
    return (
        <div className="mb-9">
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-rimba mb-2.5">
                Langkah {step} dari {STEPS.length}
            </p>
            <h1 className="font-display text-[1.9rem] font-normal text-arang leading-[1.25] mb-2">{title}</h1>
            <p className="text-[14px] text-abu leading-relaxed">{subtitle}</p>
        </div>
    );
}

// ─── Main KYC Page ────────────────────────────────────────────────────────────
export default function KYCPage() {
    const searchParams = useSearchParams();
    const selectedPlan = searchParams.get("plan") ?? "";

    const planLabels: Record<string, { name: string; color: string; bg: string }> = {
        freemium:   { name: "Freemium",   color: "#7A7A72", bg: "rgba(122,122,114,0.08)" },
        starter:    { name: "Starter",    color: "#1D6B5A", bg: "rgba(29,107,90,0.08)"  },
        pro:        { name: "Pro",        color: "#1D6B5A", bg: "rgba(29,107,90,0.12)"  },
        enterprise: { name: "Enterprise", color: "#B8962E", bg: "rgba(184,150,46,0.10)" },
    };
    const planInfo = planLabels[selectedPlan] ?? null;
    const [step, setStep] = useState(1);
    const [done, setDone] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState<FormData>({
        email: "", phone: "", password: "", confirmPassword: "",
        firstName: "", lastName: "", nik: "", pob: "", dob: "", address: "", jobTitle: "", idType: "",
        companyName: "", npwp: "", nib: "", siup: "", foundedYear: "", sector: "", assetCount: "", corpAddress: "",
    });

    const [files, setFiles] = useState<UploadedFiles>({
        ktp: null, selfie: null, npwpDoc: null, nibDoc: null, akta: null,
    });

    const [agree, setAgree] = useState({ pdp: false, tnc: false, accurate: false });

    const set = (key: keyof FormData) => (value: string) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const setFile = (key: keyof UploadedFiles) => (file: File | null) =>
        setFiles((prev) => ({ ...prev, [key]: file }));

    const formatNPWP = (val: string) => {
        const d = val.replace(/\D/g, "").substring(0, 15);
        let out = "";
        for (let i = 0; i < d.length; i++) {
            if (i === 2 || i === 5 || i === 8) out += ".";
            else if (i === 9) out += "-";
            else if (i === 12) out += ".";
            out += d[i];
        }
        return out;
    };

    const formatDOB = (val: string) => {
        const d = val.replace(/\D/g, "").substring(0, 8);
        let out = "";
        for (let i = 0; i < d.length; i++) {
            if (i === 2 || i === 4) out += "/";
            out += d[i];
        }
        return out;
    };

    const handleSubmit = () => {
        if (!agree.pdp || !agree.tnc || !agree.accurate) {
            alert("Harap setujui semua pernyataan sebelum mengirimkan permohonan.");
            return;
        }
        setLoading(true);
        setTimeout(() => { setLoading(false); setDone(true); }, 1800);
    };

    const progress = done ? 100 : (step / STEPS.length) * 100;

    // ── Success Screen ────────────────────────────────────────────────────────
    if (done) {
        return (
            <div className="flex min-h-screen bg-lontar">
                <Sidebar currentStep={6} />
                <main className="flex-1 flex items-center justify-center p-12">
                    <div className="text-center max-w-md">
                        <div className="w-[72px] h-[72px] rounded-full border-[1.5px] border-rimba/30 bg-rimba/10 flex items-center justify-center mx-auto mb-6 text-2xl">
                            ✓
                        </div>
                        <h2 className="font-display text-[1.9rem] font-normal text-arang mb-3">Permohonan terkirim!</h2>
                        <p className="text-[14px] text-abu leading-relaxed mb-8">
                            Data KYC Anda sedang dalam proses verifikasi otomatis. Notifikasi akan dikirim
                            melalui email dan WhatsApp dalam <strong className="text-arang font-medium">1×24 jam</strong>.
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 mb-10">
                            {["Enkripsi AES-256", "UU PDP Compliant", "Verifikasi Otomatis", "Notifikasi WhatsApp"].map((b) => (
                                <span key={b} className="text-[11px] font-medium text-rimba border border-rimba/20 bg-rimba/5 px-3 py-1 rounded-full">
                  {b}
                </span>
                            ))}
                        </div>
                        <button
                            className="px-9 py-3.5 rounded-[10px] bg-rimba hover:bg-jati text-lontar text-[14px] font-medium transition-colors"
                            onClick={() => alert("Menuju dashboard...")}
                        >
                            Masuk ke Dashboard →
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-lontar">
            <Sidebar currentStep={step} />

            <main className="flex-1 overflow-y-auto">
                <div className="max-w-[620px] mx-auto px-6 lg:px-14 py-12">
                    {/* Progress bar */}
                    <div className="h-[3px] bg-pasir rounded-full overflow-hidden mb-12">
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${progress}%`, background: "linear-gradient(90deg, #1D6B5A, #2A9478)" }}
                        />
                    </div>

                    {/* ═══ STEP 1: AKUN ═══ */}
                    {step === 1 && (
                        <div>
                            <PanelHeader step={1}
                                         title={<>Buat akun <em className="italic text-rimba">Nawasanga</em></>}
                                         subtitle="Email dan password untuk masuk ke platform. Verifikasi email dikirim setelah pendaftaran selesai."
                            />
                            {planInfo && (
                                <div
                                    className="flex items-center gap-2.5 px-4 py-3 rounded-[10px] border mb-6"
                                    style={{ background: planInfo.bg, borderColor: `${planInfo.color}30` }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M7 1L8.8 4.6L12.8 5.2L9.9 8L10.6 12L7 10.1L3.4 12L4.1 8L1.2 5.2L5.2 4.6Z"
                                              stroke={planInfo.color} strokeWidth="1.3" strokeLinejoin="round"/>
                                    </svg>
                                    <p className="text-[12.5px]" style={{ color: planInfo.color }}>
                                        Anda mendaftar dengan paket{" "}
                                        <strong className="font-semibold">{planInfo.name}</strong>.
                                        Bisa diubah kapan saja dari dashboard.
                                    </p>
                                </div>
                            )}
                            <div className="grid grid-cols-1 gap-5">
                                <Field label="Email Aktif" required hint="Alamat email aktif yang bisa diterima.">
                                    <input type="email" value={form.email} onChange={(e) => set("email")(e.target.value)}
                                           placeholder="nama@perusahaan.com" className={inputClass} />
                                </Field>
                                <Field label="Nomor WhatsApp" required hint="Digunakan untuk notifikasi dan input fuel log via WhatsApp Bot.">
                                    <div className="relative">
                                        <input type="tel" value={form.phone} onChange={(e) => set("phone")(e.target.value)}
                                               placeholder="08xx-xxxx-xxxx" className={inputClass + " pr-16"} />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-abu bg-pasir px-1.5 py-0.5 rounded-full">
                      ID +62
                    </span>
                                    </div>
                                </Field>
                                <Field label="Password" required>
                                    <PasswordInput id="password" value={form.password} onChange={set("password")} placeholder="Minimal 8 karakter" />
                                    <StrengthMeter value={form.password} />
                                </Field>
                                <Field label="Konfirmasi Password" required
                                       error={form.confirmPassword && form.password !== form.confirmPassword ? "Password tidak cocok." : undefined}>
                                    <PasswordInput id="confirm-password" value={form.confirmPassword}
                                                   onChange={set("confirmPassword")} placeholder="Ulangi password" />
                                </Field>
                            </div>
                            <NavButtons isFirst onNext={() => setStep(2)} nextLabel="Lanjut ke Identitas" />
                        </div>
                    )}

                    {/* ═══ STEP 2: IDENTITAS PRIBADI ═══ */}
                    {step === 2 && (
                        <div>
                            <PanelHeader step={2}
                                         title={<>Penanggung <em className="italic text-rimba">Jawab</em></>}
                                         subtitle="Data diri penanggung jawab akun. Sesuaikan dengan KTP yang akan diunggah di langkah berikutnya."
                            />
                            <div className="grid grid-cols-2 gap-5">
                                <Field label="Nama Depan" required>
                                    <input type="text" value={form.firstName} onChange={(e) => set("firstName")(e.target.value)}
                                           placeholder="Sesuai KTP" className={inputClass} />
                                </Field>
                                <Field label="Nama Belakang" required>
                                    <input type="text" value={form.lastName} onChange={(e) => set("lastName")(e.target.value)}
                                           placeholder="Sesuai KTP" className={inputClass} />
                                </Field>
                                <Field label="Jabatan di Perusahaan" required>
                                    <select value={form.jobTitle} onChange={(e) => set("jobTitle")(e.target.value)} className={inputClass}>
                                        <option value="">Pilih jabatan...</option>
                                        <option>Direktur / CEO</option>
                                        <option>Direktur Operasional / COO</option>
                                        <option>Manajer ESG / Sustainability</option>
                                        <option>Manajer Operasional</option>
                                        <option>Staf IT / Sistem</option>
                                        <option>Lainnya</option>
                                    </select>
                                </Field>
                            </div>
                            <NavButtons onBack={() => setStep(1)} onNext={() => setStep(3)} nextLabel="Lanjut ke Data Perusahaan" />
                        </div>
                    )}

                    {/* ═══ STEP 3: DATA PERUSAHAAN ═══ */}
                    {step === 3 && (
                        <div>
                            <PanelHeader step={3}
                                         title={<>Data <em className="italic text-rimba">perusahaan</em></>}
                                         subtitle="Informasi legal entitas yang akan menggunakan platform. Semua data akan diverifikasi secara otomatis."
                            />
                            <div className="grid grid-cols-2 gap-5">
                                <div className="col-span-2">
                                    <Field label="Nama Perusahaan Resmi" required>
                                        <input type="text" value={form.companyName} onChange={(e) => set("companyName")(e.target.value)}
                                               placeholder="PT / CV / UD sesuai akta" className={inputClass} />
                                    </Field>
                                </div>
                                <Field label="NPWP Perusahaan" required
                                       error={form.npwp && form.npwp.replace(/\D/g, "").length < 15 ? "Format NPWP tidak valid." : undefined}>
                                    <input type="text" value={form.npwp}
                                           onChange={(e) => set("npwp")(formatNPWP(e.target.value))}
                                           placeholder="XX.XXX.XXX.X-XXX.XXX" className={inputClass} maxLength={20} />
                                </Field>
                                <Field label="NIB (Nomor Induk Berusaha)" required hint="Diterbitkan oleh OSS (oss.go.id).">
                                    <input type="text" value={form.nib}
                                           onChange={(e) => set("nib")(e.target.value.replace(/\D/g, "").substring(0, 13))}
                                           placeholder="13 digit" className={inputClass} maxLength={13} />
                                </Field>
                                <Field label="Nomor SIUP / Izin Usaha" optional>
                                    <input type="text" value={form.siup} onChange={(e) => set("siup")(e.target.value)}
                                           placeholder="Nomor izin usaha" className={inputClass} />
                                </Field>
                                <Field label="Tahun Berdiri" required>
                                    <input type="text" value={form.foundedYear}
                                           onChange={(e) => set("foundedYear")(e.target.value.replace(/\D/g, "").substring(0, 4))}
                                           placeholder="YYYY" className={inputClass} maxLength={4} />
                                </Field>
                                <div className="col-span-2">
                                    <Field label="Sektor Industri" required>
                                        <RadioCards
                                            value={form.sector}
                                            onChange={set("sector")}
                                            options={[
                                                { value: "logistics",    label: "Fleet & Logistik",  desc: "Armada kendaraan & distribusi" },
                                                { value: "construction", label: "Konstruksi",        desc: "Alat berat & proyek infrastruktur" },
                                                { value: "plantation",   label: "Perkebunan",        desc: "Kelapa sawit, karet, kehutanan" },
                                                { value: "mining",       label: "Pertambangan",      desc: "Mineral, batu bara & energi" },
                                                { value: "corporate",    label: "Korporat / Tbk",    desc: "Pelaporan ESG ke OJK" },
                                                { value: "other",        label: "Lainnya",           desc: "Industri lain yang relevan" },
                                            ]}
                                        />
                                    </Field>
                                </div>
                                <Field label="Jumlah Kendaraan / Aset" required>
                                    <select value={form.assetCount} onChange={(e) => set("assetCount")(e.target.value)} className={inputClass}>
                                        <option value="">Estimasi...</option>
                                        <option>1–5 unit</option>
                                        <option>6–20 unit</option>
                                        <option>21–50 unit</option>
                                        <option>51–200 unit</option>
                                        <option>200+ unit</option>
                                    </select>
                                </Field>
                                <Field label="Alamat Kantor Pusat" required>
                                    <input type="text" value={form.corpAddress} onChange={(e) => set("corpAddress")(e.target.value)}
                                           placeholder="Kota / Provinsi" className={inputClass} />
                                </Field>
                            </div>
                            <NavButtons onBack={() => setStep(2)} onNext={() => setStep(4)} nextLabel="Lanjut ke Dokumen" />
                        </div>
                    )}

                    {/* ═══ STEP 5: KONFIRMASI ═══ */}
                    {step === 4 && (
                        <div>
                            <PanelHeader step={5}
                                         title={<>Tinjau & <em className="italic text-rimba">konfirmasi</em></>}
                                         subtitle="Periksa kembali ringkasan data Anda sebelum mengirimkan permohonan verifikasi."
                            />
                            {/* Summary cards */}
                            <div className="flex flex-col gap-3 mb-7">
                                {[
                                    {
                                        title: "Akun",
                                        editStep: 1,
                                        rows: [{ label: "Email", value: form.email || "—" }],
                                    },
                                    {
                                        title: "Penanggung Jawab",
                                        editStep: 2,
                                        rows: [
                                            { label: "Nama", value: `${form.firstName} ${form.lastName}`.trim() || "—" },
                                            { label: "Jabatan", value: form.jobTitle || "—" },
                                        ],
                                    },
                                    {
                                        title: "Perusahaan",
                                        editStep: 3,
                                        rows: [
                                            { label: "Nama", value: form.companyName || "—" },
                                            { label: "NPWP", value: form.npwp || "—" },
                                        ],
                                    },
                                ].map((card) => (
                                    <div key={card.title}
                                         className="px-5 py-4 bg-white border border-pasir rounded-[10px]">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-[11px] uppercase tracking-[0.1em] text-abu">{card.title}</span>
                                            <button onClick={() => setStep(card.editStep)}
                                                    className="text-[11px] text-rimba hover:underline">Edit</button>
                                        </div>
                                        {card.rows.map((row) => (
                                            <div key={row.label} className="flex justify-between text-[13px] mb-1 last:mb-0">
                                                <span className="text-abu">{row.label}</span>
                                                <span className="text-arang font-medium">{row.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            {/* Agreements */}
                            <div className="flex flex-col gap-4 mb-8">
                                <CheckboxField id="agree-pdp" checked={agree.pdp} onChange={(v) => setAgree((a) => ({ ...a, pdp: v }))}>
                                    Saya menyetujui{" "}
                                    <a href="#" className="text-rimba hover:underline">Kebijakan Privasi</a> dan memberikan persetujuan
                                    pemrosesan data pribadi sesuai{" "}
                                    <a href="#" className="text-rimba hover:underline">UU PDP No. 27 Tahun 2022</a>.
                                </CheckboxField>
                                <CheckboxField id="agree-tnc" checked={agree.tnc} onChange={(v) => setAgree((a) => ({ ...a, tnc: v }))}>
                                    Saya menyetujui{" "}
                                    <a href="#" className="text-rimba hover:underline">Syarat & Ketentuan Penggunaan</a> platform Nawasanga.
                                </CheckboxField>
                                <CheckboxField id="agree-accurate" checked={agree.accurate} onChange={(v) => setAgree((a) => ({ ...a, accurate: v }))}>
                                    Saya menyatakan bahwa seluruh data dan dokumen yang diberikan adalah benar, sah, dan dapat dipertanggungjawabkan.
                                </CheckboxField>
                            </div>
                            <NavButtons onBack={() => setStep(4)} onNext={handleSubmit}
                                        nextLabel="Kirim Permohonan Verifikasi" isLoading={loading} />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}