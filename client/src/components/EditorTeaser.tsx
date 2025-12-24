import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";

export function EditorTeaser() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Left: Content */}
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Coming Soon
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
          FORMALISM <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-foreground">
            MADE ACCESSIBLE.
          </span>
        </h2>

        <p className="text-xl text-muted-foreground leading-relaxed">
          Academic rigor shouldn't require academic tooling. You should be able to <code className="text-primary">pnpm install</code> a spec language, not configure a theorem prover. IDE completion, linting, and visualization built in.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Instant Preview</h3>
              <p className="text-sm text-muted-foreground">See your semantic entities render in real-time as you type.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-foreground shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Smart Autocomplete</h3>
              <p className="text-sm text-muted-foreground">Intelligent suggestions for cross-document references.</p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <form className="flex gap-2 max-w-md" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email for early access" 
              className="flex-1 bg-background border border-border px-4 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button type="submit" className="rounded-sm font-bold">
              Join Waitlist <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2">
            Limited spots available for the beta program.
          </p>
        </div>
      </div>

      {/* Right: Visuals */}
      <div className="relative group">
        {/* Main Mockup */}
        <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl border border-border bg-background transform transition-transform duration-500 group-hover:scale-[1.02]">
          <div className="absolute top-0 left-0 w-full h-8 bg-muted/50 border-b border-border flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
          </div>
          <img 
            src="/images/editor-mockup.png" 
            alt="VERA Editor Interface" 
            className="w-full h-auto pt-8"
          />
          
          {/* Floating Feature Highlight */}
          <div className="absolute -bottom-6 -left-6 w-64 rounded-lg overflow-hidden shadow-xl border border-border bg-background animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 hidden md:block">
            <img 
              src="/images/editor-features.png" 
              alt="Autocomplete Feature" 
              className="w-full h-auto"
            />
            <div className="p-3 bg-background/95 backdrop-blur border-t border-border">
              <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Smart Context</div>
              <div className="text-xs text-muted-foreground">Context-aware suggestions for theorems and definitions.</div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-foreground/10 rounded-xl blur-2xl -z-10 opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
      </div>
    </div>
  );
}
