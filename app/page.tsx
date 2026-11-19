import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Seam } from "@/components/seam";
import { FinalCta, Faq, Footer, Pricing, StickyCta, Why } from "@/components/sections-offer";
import { Benefits, Problem, Steps } from "@/components/sections-story";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Seam />
        <Problem />
        <Seam />
        <Benefits />
        <Seam />
        <Steps />
        <Seam />
        <Why />
        <Seam />
        <Pricing />
        <Seam />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
