import HeroCard from "@/components/hero/HeroCard";
import HeroText from "@/components/hero/HeroText";

function HeroSection() {
  return (
    <div className="flex flex-col items-center gap-6 px-4 py-6 ">
      <HeroText />
      <HeroCard />
    </div>
  );
}

export default HeroSection;
