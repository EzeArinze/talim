import { Badge } from "@/components/ui/badge";
import HeroSection from "./_components/hero-section";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 pt-16">
      <Badge variant={"outline"}>
        <div className="flex items-center justify-center text-sm">
          Introducing Talim
          <p className="me-1 text-base leading-none">✨</p>
        </div>
      </Badge>
      <HeroSection />
    </section>
  );
}
