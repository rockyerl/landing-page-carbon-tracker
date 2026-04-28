import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nawasanga — ESG & Carbon Monitoring Platform",
  description: "Dari semua penjuru, satu pandangan. Platform ESG & Carbon Monitoring untuk Indonesia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
