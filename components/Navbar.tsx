"use client";
import { useState, useEffect } from "react";

function NawasangaLogo({ size = 28 }: { size?: number }) {
  const r = size / 2;
  const cx = r, cy = r;
  const nodeR = size * 0.095;
  const outerR = r * 0.78;
  const dirs = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {/* Outer circle */}
      <circle cx={cx} cy={cy} r={r - 1} stroke="#1D6B5A" strokeWidth="0.8" opacity="0.3" />
      {/* Radial lines */}
      {dirs.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const nx = cx + Math.cos(rad) * outerR;
        const ny = cy + Math.sin(rad) * outerR;
        return (
          <line key={deg} x1={cx} y1={cy} x2={nx} y2={ny}
            stroke="#1D6B5A" strokeWidth="0.6" opacity="0.5" />
        );
      })}
      {/* Outer nodes — teal */}
      {dirs.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const nx = cx + Math.cos(rad) * outerR;
        const ny = cy + Math.sin(rad) * outerR;
        return <circle key={`n${deg}`} cx={nx} cy={ny} r={nodeR} fill="#2A9478" />;
      })}
      {/* Center node — gold */}
      <circle cx={cx} cy={cy} r={nodeR * 1.3} fill="#B8962E" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["Fitur", "Pricing", "Regulasi"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-lontar/92 backdrop-blur-md border-b border-rimba/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <NawasangaLogo size={32} />
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-base tracking-tight text-arang">
              Nawasanga
            </span>
            <span className="font-ui text-[9px] uppercase tracking-[0.15em] text-abu leading-none mt-0.5">
              ESG Platform
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm text-abu hover:text-arang transition-colors duration-200 font-ui tracking-wide"
            >
              {l}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#pricing"
            className="text-sm bg-rimba hover:bg-jati text-lontar font-semibold px-5 py-2 rounded-lg transition-colors duration-200 font-ui"
          >
            Mulai Gratis
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-abu hover:text-arang"
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {menuOpen ? (
              <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            ) : (
              <path fillRule="evenodd" clipRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-lontar/97 backdrop-blur-md border-t border-rimba/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              className="text-sm text-abu hover:text-arang font-ui">
              {l}
            </a>
          ))}
          <a href="#pricing" onClick={() => setMenuOpen(false)}
            className="text-sm bg-rimba text-lontar font-semibold px-4 py-2 rounded-lg text-center font-ui">
            Mulai Gratis
          </a>
        </div>
      )}
    </nav>
  );
}
