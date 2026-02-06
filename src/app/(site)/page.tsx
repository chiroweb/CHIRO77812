import Hero from "@/components/sections/hero";
import Philosophy from "@/components/sections/philosophy";
import Numbers from "@/components/sections/numbers";
import LiveProcess from "@/components/sections/live-process";
import PortfolioPreview from "@/components/sections/portfolio-preview";
import Testimonials from "@/components/sections/testimonials";
import Comparison from "@/components/sections/comparison";
import Faq from "@/components/sections/faq";
import CtaBand from "@/components/sections/cta-band";

export default function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Numbers />
      <LiveProcess />
      <PortfolioPreview />
      <Testimonials />
      <Comparison />
      <Faq />
      <CtaBand />
    </>
  );
}
