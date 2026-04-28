import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Regulasi from "@/components/Regulasi";
import Roadmap from "@/components/Roadmap";
import { CTA, Footer } from "@/components/CtaFooter";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Regulasi />
      <CTA />
      <Footer />
    </main>
  );
}
