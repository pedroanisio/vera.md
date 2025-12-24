import { useState } from "react";
import { cn } from "@/lib/utils";
import { FileText, GitBranch, ShieldCheck, Search, Database, UserCheck, Clock, AlertCircle } from "lucide-react";
import { VeraEntity } from "./VeraEntity";

export function ProvenanceDemo() {
  const [activeLayer, setActiveLayer] = useState<1 | 2 | 3>(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Sidebar / Controls */}
      <div className="lg:col-span-4 space-y-4">
        <div 
          className={cn(
            "p-6 border cursor-pointer transition-all duration-300",
            activeLayer === 1 
              ? "border-primary bg-primary/5 shadow-md" 
              : "border-border bg-card hover:border-primary/50"
          )}
          onClick={() => setActiveLayer(1)}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", activeLayer === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>1</div>
            <h3 className="font-bold text-lg">Document Level</h3>
          </div>
          <p className="text-sm text-muted-foreground pl-11">
            Global metadata defining the source document, extraction method, and pipeline details.
          </p>
        </div>

        <div 
          className={cn(
            "p-6 border cursor-pointer transition-all duration-300",
            activeLayer === 2 
              ? "border-primary bg-primary/5 shadow-md" 
              : "border-border bg-card hover:border-primary/50"
          )}
          onClick={() => setActiveLayer(2)}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", activeLayer === 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>2</div>
            <h3 className="font-bold text-lg">Entity Level</h3>
          </div>
          <p className="text-sm text-muted-foreground pl-11">
            Granular attributes for every block: page numbers, timestamps, and confidence scores.
          </p>
        </div>

        <div 
          className={cn(
            "p-6 border cursor-pointer transition-all duration-300",
            activeLayer === 3 
              ? "border-primary bg-primary/5 shadow-md" 
              : "border-border bg-card hover:border-primary/50"
          )}
          onClick={() => setActiveLayer(3)}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", activeLayer === 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>3</div>
            <h3 className="font-bold text-lg">Rich Provenance</h3>
          </div>
          <p className="text-sm text-muted-foreground pl-11">
            Complex narratives for multi-source synthesis, manual corrections, and verification chains.
          </p>
        </div>
      </div>

      {/* Main Display Area */}
      <div className="lg:col-span-8 bg-card border border-border p-8 min-h-[500px] flex flex-col">
        
        {/* Layer 1 Content */}
        {activeLayer === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-2 mb-6 text-primary font-mono text-xs uppercase tracking-widest font-bold">
              <FileText className="w-4 h-4" /> Frontmatter Configuration
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-muted/80 text-foreground p-6 rounded-sm font-mono text-sm overflow-x-auto border border-border">
                <div className="text-muted-foreground">---</div>
                <div><span className="text-primary">documentId:</span> <span className="text-foreground">"V1StGXR8_Z5jdHi6B"</span></div>
                <div><span className="text-primary">provenance:</span></div>
                <div className="pl-4"><span className="text-primary">source:</span></div>
                <div className="pl-8"><span className="text-primary">type:</span> <span className="text-foreground">pdf</span></div>
                <div className="pl-8"><span className="text-primary">path:</span> <span className="text-foreground">"research-paper.pdf"</span></div>
                <div className="pl-8"><span className="text-primary">sha256:</span> <span className="text-foreground">"e3b0c4..."</span></div>
                <div className="pl-4"><span className="text-primary">extraction:</span></div>
                <div className="pl-8"><span className="text-primary">method:</span> <span className="text-foreground">hybrid</span></div>
                <div className="pl-8"><span className="text-primary">confidence:</span> <span className="text-foreground">0.85</span></div>
                <div className="text-muted-foreground">---</div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Source Tracking</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Links the entire Markdown file to its original source (PDF, Video, URL) with cryptographic hash verification.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-muted p-3 rounded-full text-foreground">
                    <Search className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Extraction Metadata</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Records how the content was digitized (OCR, LLM, Manual) and the pipeline version used.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Layer 2 Content */}
        {activeLayer === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-2 mb-6 text-primary font-mono text-xs uppercase tracking-widest font-bold">
              <GitBranch className="w-4 h-4" /> Attribute Injection
            </div>

            <div className="space-y-8">
              <div className="relative group">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="mb-2 font-mono text-xs text-muted-foreground">Markdown Source:</div>
                <div className="bg-muted/80 text-foreground p-4 rounded-sm font-mono text-sm mb-4 border border-border">
                  <span className="text-primary">:::theorem</span>&#123;<span className="text-foreground">#thm-fund</span> <span className="text-muted-foreground">sourceLoc="p.42" confidence=0.97</span>&#125;
                </div>

                <div className="mb-2 font-mono text-xs text-muted-foreground">Rendered Result:</div>
                <VeraEntity 
                  type="theorem_block" 
                  title="Fundamental Theorem" 
                  id="thm-fund"
                  metadata={{ sourceLoc: "p.42", confidence: 0.97 }}
                >
                  <p>Every integer greater than 1 is either a prime number itself or can be represented as the product of prime numbers.</p>
                </VeraEntity>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 border border-border bg-muted/10">
                  <div className="text-2xl font-bold text-primary mb-1">p.42</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Source Loc</div>
                </div>
                <div className="p-4 border border-border bg-muted/10">
                  <div className="text-2xl font-bold text-foreground mb-1">97%</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Confidence</div>
                </div>
                <div className="p-4 border border-border bg-muted/10">
                  <div className="text-2xl font-bold text-muted-foreground mb-1">PDF</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Origin</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Layer 3 Content */}
        {activeLayer === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-2 mb-6 text-primary font-mono text-xs uppercase tracking-widest font-bold">
              <ShieldCheck className="w-4 h-4" /> Rich Provenance Slot
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-muted/80 text-foreground p-4 rounded-sm font-mono text-xs leading-relaxed border border-border">
                  <div><span className="text-primary">:::theorem</span>&#123;<span className="text-foreground">#thm-composite</span>&#125;</div>
                  <div><span className="text-muted-foreground">...statement...</span></div>
                  <br/>
                  <div><span className="text-primary">#_provenance</span></div>
                  <div>| Aspect | Detail |</div>
                  <div>|--------|--------|</div>
                  <div>| Source | [Knuth 1997], p.42 |</div>
                  <div>| Verify | Checked by @alice |</div>
                  <div><span className="text-primary">:::</span></div>
                </div>
                
                <div className="bg-muted/30 border border-border p-4 text-sm">
                  <div className="flex items-center gap-2 text-primary font-bold mb-2">
                    <AlertCircle className="w-4 h-4" /> Use Case
                  </div>
                  <p className="text-muted-foreground">
                    Perfect for entities synthesized from multiple sources, manually corrected data, or claims requiring an explicit audit trail.
                  </p>
                </div>
              </div>

              <div className="border border-border p-6 bg-card shadow-sm">
                <h4 className="font-bold border-b border-border pb-2 mb-4">Audit Trail</h4>
                
                <div className="space-y-6 relative pl-4 border-l border-dashed border-border">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-primary rounded-full"></div>
                    <div className="text-xs text-muted-foreground mb-1 flex items-center gap-2">
                      <Clock className="w-3 h-3" /> 2025-12-20 14:30
                    </div>
                    <div className="font-medium text-sm">Extracted via OCR (Tesseract 5)</div>
                    <div className="text-xs text-muted-foreground">Confidence: 0.72</div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-foreground rounded-full"></div>
                    <div className="text-xs text-muted-foreground mb-1 flex items-center gap-2">
                      <UserCheck className="w-3 h-3" /> 2025-12-21 09:15
                    </div>
                    <div className="font-medium text-sm">Manual Correction by @alice</div>
                    <div className="text-xs text-muted-foreground">Fixed typo in variable name</div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-muted-foreground rounded-full"></div>
                    <div className="text-xs text-muted-foreground mb-1 flex items-center gap-2">
                      <ShieldCheck className="w-3 h-3" /> 2025-12-21 10:00
                    </div>
                    <div className="font-medium text-sm">Verified Final</div>
                    <div className="text-xs text-muted-foreground">Status: Approved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
