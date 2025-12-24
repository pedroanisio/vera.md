import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, FileText, Link as LinkIcon, XCircle } from "lucide-react";
import { VeraEntity } from "./VeraEntity";

export function ConsistencyDemo() {
  const [mode, setMode] = useState<"local" | "cross" | "validation">("local");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Sidebar / Controls */}
      <div className="lg:col-span-4 space-y-4">
        <div 
          className={cn(
            "p-6 border cursor-pointer transition-all duration-300",
            mode === "local" 
              ? "border-primary bg-primary/5 shadow-md" 
              : "border-border bg-card hover:border-primary/50"
          )}
          onClick={() => setMode("local")}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", mode === "local" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
              <LinkIcon className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-lg">Local References</h3>
          </div>
          <p className="text-sm text-muted-foreground pl-11">
            Link to theorems, figures, or sections within the same document using stable IDs.
          </p>
        </div>

        <div 
          className={cn(
            "p-6 border cursor-pointer transition-all duration-300",
            mode === "cross" 
              ? "border-primary bg-primary/5 shadow-md" 
              : "border-border bg-card hover:border-primary/50"
          )}
          onClick={() => setMode("cross")}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", mode === "cross" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-lg">Cross-Document</h3>
          </div>
          <p className="text-sm text-muted-foreground pl-11">
            Reference entities across different files to build a connected knowledge graph.
          </p>
        </div>

        <div 
          className={cn(
            "p-6 border cursor-pointer transition-all duration-300",
            mode === "validation" 
              ? "border-primary bg-primary/5 shadow-md" 
              : "border-border bg-card hover:border-primary/50"
          )}
          onClick={() => setMode("validation")}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", mode === "validation" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-lg">Consistency Checks</h3>
          </div>
          <p className="text-sm text-muted-foreground pl-11">
            Prevent broken knowledge with build-time validation of all references.
          </p>
        </div>
      </div>

      {/* Main Display Area */}
      <div className="lg:col-span-8 bg-card border border-border p-8 min-h-[500px] flex flex-col relative overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        {/* Local References Demo */}
        {mode === "local" && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 relative z-10">
            <div className="flex items-center gap-2 mb-6 text-primary font-mono text-xs uppercase tracking-widest font-bold">
              <LinkIcon className="w-4 h-4" /> Intra-Document Linking
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="bg-muted/80 text-foreground p-4 rounded-sm font-mono text-sm border border-border shadow-xl">
                <div className="text-muted-foreground mb-2">// definition.md</div>
                <div><span className="text-primary">:::theorem</span>&#123;<span className="text-foreground">#thm-main</span>&#125;</div>
                <div className="pl-4">Every continuous function on a compact interval is bounded.</div>
                <div><span className="text-primary">:::</span></div>
                <br/>
                <div>As shown in <span className="text-primary">[Theorem 1](#thm-main)</span>, the function is bounded.</div>
              </div>

              <div className="relative">
                <div className="absolute left-8 top-1/2 -translate-y-1/2 w-0.5 h-16 bg-primary/20 -z-10"></div>
                
                <VeraEntity type="theorem_block" title="Theorem 1" id="thm-main">
                  <p>Every continuous function on a compact interval is bounded.</p>
                </VeraEntity>

                <div className="mt-8 p-4 bg-muted/10 border border-border rounded-sm">
                  <p>
                    As shown in <a href="#" className="text-primary font-bold hover:underline">Theorem 1</a>, the function is bounded.
                  </p>
                </div>

                {/* Connection Line */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50" style={{ overflow: 'visible' }}>
                  <path 
                    d="M 100 180 C 100 140, 50 140, 50 100" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    className="text-primary"
                    markerEnd="url(#arrow)"
                  />
                  <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill="currentColor" className="text-primary" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Cross-Document Demo */}
        {mode === "cross" && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 relative z-10">
            <div className="flex items-center gap-2 mb-6 text-primary font-mono text-xs uppercase tracking-widest font-bold">
              <FileText className="w-4 h-4" /> Inter-Document Linking
            </div>

            <div className="grid grid-cols-2 gap-12">
              {/* Doc A */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                  <FileText className="w-4 h-4" /> definitions.md
                </div>
                <div className="bg-card border border-border p-4 shadow-sm relative">
                  <VeraEntity type="term_def" title="Entropy" id="term-entropy">
                    <p>A measure of disorder.</p>
                  </VeraEntity>
                  <div className="absolute -right-3 top-1/2 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Doc B */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                  <FileText className="w-4 h-4" /> analysis.md
                </div>
                <div className="bg-card border border-border p-4 shadow-sm">
                  <p className="leading-relaxed">
                    Based on the definition of <span className="bg-primary/10 text-primary px-1 rounded-sm font-mono text-sm">entropy</span>...
                  </p>
                  <div className="mt-2 text-xs font-mono text-muted-foreground bg-muted/30 p-2 rounded-sm">
                    [Entropy](definitions.md#term-entropy)
                  </div>
                </div>
              </div>
            </div>

            {/* Connection Visual */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-20 pointer-events-none">
              <svg className="w-full h-full">
                <line x1="45%" y1="50%" x2="55%" y2="50%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-primary animate-[dash_1s_linear_infinite]" />
              </svg>
            </div>
          </div>
        )}

        {/* Validation Demo */}
        {mode === "validation" && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 relative z-10">
            <div className="flex items-center gap-2 mb-6 text-primary font-mono text-xs uppercase tracking-widest font-bold">
              <CheckCircle2 className="w-4 h-4" /> Build-Time Validation
            </div>

            <div className="space-y-6">
              <div className="bg-muted/80 text-foreground p-6 rounded-sm font-mono text-sm shadow-xl border border-border">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <CheckCircle2 className="w-4 h-4" /> Build Successful
                </div>
                <div className="text-muted-foreground pl-6">
                  <div>✓ Parsed 12 documents</div>
                  <div>✓ Resolved 45/45 references</div>
                  <div>✓ Verified 3 provenance chains</div>
                </div>
              </div>

              <div className="bg-destructive/10 border border-destructive/30 text-foreground p-6 rounded-sm font-mono text-sm shadow-xl">
                <div className="flex items-center gap-2 text-destructive mb-2">
                  <XCircle className="w-4 h-4" /> Build Failed
                </div>
                <div className="pl-6 space-y-2">
                  <div>Error: Unresolved reference in <span className="text-foreground">chapter1.md</span></div>
                  <div className="bg-destructive/15 p-2 rounded-sm text-xs">
                    [See Theorem 5](#thm-5) {'->'} Target #thm-5 not found
                  </div>
                  <div className="text-destructive/80 text-xs mt-2">Did you mean #thm-4?</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
