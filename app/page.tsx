import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Badge>
        <div className="flex  items-center justify-center text-sm">
          Introducing Talim
          <p className="me-1 text-base leading-none">✨</p>
        </div>
      </Badge>
    </div>
  );
}
