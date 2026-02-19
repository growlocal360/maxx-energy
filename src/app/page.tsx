import Hero from "@/components/Hero";
import ProductsOverview from "@/components/ProductsOverview";
import StatsBar from "@/components/StatsBar";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import MarketsGrid from "@/components/MarketsGrid";
import ShalePlaysMap from "@/components/ShalePlaysMap";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductsOverview />
      <StatsBar />
      <ProjectsShowcase />
      <MarketsGrid />
      <ShalePlaysMap />
      <CTASection />
    </>
  );
}
