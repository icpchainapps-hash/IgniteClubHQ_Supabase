import { Loader2 } from "lucide-react";
import igniteLogo from "@/assets/ignite-logo-dark.png";

interface PageLoadingProps {
  message?: string;
}

export function PageLoading({ message = "Loading..." }: PageLoadingProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12">
      <img src={igniteLogo} alt="Ignite" className="h-48 w-48" />
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
