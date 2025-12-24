import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface FeatureDemoProps {
  title: string;
  description: string;
  code: string;
  render: React.ReactNode;
  className?: string;
}

export function FeatureDemo({ title, description, code, render, className }: FeatureDemoProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 border border-border", className)}>
      {/* Left: Code / Syntax */}
      <div className="bg-muted/30 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-border flex flex-col">
        <div className="mb-6">
          <h3 className="text-xl font-bold tracking-tight mb-2">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
        
        <div className="relative mt-auto group">
          <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={copyCode}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <pre className="bg-card border border-border p-4 overflow-x-auto text-sm font-mono leading-relaxed">
            <code>{code}</code>
          </pre>
          <div className="mt-2 text-xs text-muted-foreground font-mono uppercase tracking-widest">
            Markdown / VERA Syntax
          </div>
        </div>
      </div>

      {/* Right: Rendered Output */}
      <div className="p-6 lg:p-8 bg-card flex flex-col justify-center min-h-[300px]">
        <div className="w-full max-w-md mx-auto">
          <div className="prose dark:prose-invert max-w-none">
            {render}
          </div>
        </div>
        <div className="mt-auto pt-8 text-center lg:text-right">
          <div className="text-xs text-primary font-bold font-mono uppercase tracking-widest">
            Rendered Output
          </div>
        </div>
      </div>
    </div>
  );
}
