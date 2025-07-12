import CTA from "@/components/hero/cta";
import HeroCard from "@/components/hero/hero-card";
import HeroText from "@/components/hero/hero-text";
import Testimonial from "@/components/hero/testimonial";

function HeroSection() {
  return (
    <div className="flex flex-col items-center gap-6 px-4 py-6 ">
      <HeroText />
      <HeroCard />
      <Testimonial />
      <CTA />
    </div>
  );
}

export default HeroSection;
