import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingCallButton() {
  return (
    <a
      href="tel:+15149107370"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Call Angelo Randazzo"
    >
      <Button
        size="lg"
        className="h-16 w-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 bg-primary hover:bg-primary/90"
      >
        <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </Button>
      <span className="absolute -top-12 right-0 bg-slate-900 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Call (514) 910-7370
      </span>
    </a>
  );
}
