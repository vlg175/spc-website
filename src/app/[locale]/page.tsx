import Hero from "@/components/Hero";
import About from "@/components/About";
import ProductionProcess from "@/components/ProductionProcess";
import Products from "@/components/Products";
import Quality from "@/components/Quality";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";

/* ── Home page — SPA single-page layout ─────────────────────────────────
   All sections are stacked here and navigated via section IDs.
   ─────────────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ProductionProcess />
      <Products />
      <Quality />
      <Partners />
      <Contact />
    </>
  );
}
