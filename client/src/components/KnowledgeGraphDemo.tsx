import { useState } from "react";
import { cn } from "@/lib/utils";
import { Hash, ArrowRight, Network, MousePointer2, Sparkles } from "lucide-react";

type EntityNode = {
  id: string;
  type: string;
  label: string;
  refs: string[];
};

const entities: EntityNode[] = [
  { id: "def-prime", type: "term_def", label: "Prime Number", refs: [] },
  { id: "def-composite", type: "term_def", label: "Composite", refs: ["def-prime"] },
  { id: "lem-euclid", type: "lemma", label: "Euclid's Lemma", refs: ["def-prime"] },
  { id: "thm-fund", type: "theorem", label: "Fundamental Theorem", refs: ["def-prime", "def-composite", "lem-euclid"] },
  { id: "ex-factor", type: "example", label: "Factorization of 84", refs: ["thm-fund"] },
  { id: "code-isprime", type: "code_block", label: "is_prime()", refs: ["def-prime"] },
];

// Positioned in a more intentional tree-like layout
const nodePositions: Record<string, { x: number; y: number }> = {
  "def-prime": { x: 50, y: 85 },
  "def-composite": { x: 25, y: 60 },
  "lem-euclid": { x: 75, y: 60 },
  "thm-fund": { x: 50, y: 40 },
  "ex-factor": { x: 30, y: 15 },
  "code-isprime": { x: 70, y: 15 },
};

const typeConfig: Record<string, { bg: string; border: string; text: string; label: string }> = {
  term_def: {
    bg: "bg-sky-500/10",
    border: "border-sky-500/40",
    text: "text-sky-600 dark:text-sky-400",
    label: "Definition"
  },
  lemma: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/40",
    text: "text-amber-600 dark:text-amber-400",
    label: "Lemma"
  },
  theorem: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/40",
    text: "text-emerald-600 dark:text-emerald-400",
    label: "Theorem"
  },
  example: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/40",
    text: "text-violet-600 dark:text-violet-400",
    label: "Example"
  },
  code_block: {
    bg: "bg-rose-500/10",
    border: "border-rose-500/40",
    text: "text-rose-600 dark:text-rose-400",
    label: "Code"
  },
};

export function KnowledgeGraphDemo() {
  const [selectedNode, setSelectedNode] = useState<string | null>("thm-fund");

  const selectedEntity = entities.find((e) => e.id === selectedNode);
  const directRefs = selectedNode
    ? entities.find((e) => e.id === selectedNode)?.refs || []
    : [];

  // Find entities that reference the selected node
  const referencedBy = selectedNode
    ? entities.filter((e) => e.refs.includes(selectedNode)).map((e) => e.id)
    : [];

  const allRelated = selectedNode ? [selectedNode, ...directRefs, ...referencedBy] : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Panel: Graph Visualization */}
      <div className="lg:col-span-7 border border-border bg-gradient-to-br from-background to-muted/20 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* Header */}
        <div className="relative z-10 p-6 border-b border-border bg-background/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest font-bold">
              <Network className="w-4 h-4" /> Reference Graph
            </div>
            <div className="text-xs text-muted-foreground">
              Click nodes to explore
            </div>
          </div>
        </div>

        {/* Graph Area */}
        <div className="relative w-full h-[420px] p-6">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
            <defs>
              <marker
                id="arrowhead-active"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" className="fill-primary" />
              </marker>
              <marker
                id="arrowhead-muted"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" className="fill-border" />
              </marker>
              {/* Glow filter for active edges */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Draw edges */}
            {entities.map((entity) =>
              entity.refs.map((refId) => {
                const from = nodePositions[entity.id];
                const to = nodePositions[refId];
                if (!from || !to) return null;

                const isHighlighted =
                  allRelated.includes(entity.id) && allRelated.includes(refId);

                const isDirectRef = selectedNode === entity.id && entity.refs.includes(refId);
                const isReferencedBySelected = selectedNode === refId && entity.refs.includes(refId);

                // Calculate control point for curved line
                const midX = (from.x + to.x) / 2;
                const midY = (from.y + to.y) / 2;
                const dx = to.x - from.x;
                const dy = to.y - from.y;
                // Offset perpendicular to the line
                const offset = 8;
                const len = Math.sqrt(dx * dx + dy * dy);
                const cx = midX + (dy / len) * offset;
                const cy = midY - (dx / len) * offset;

                return (
                  <path
                    key={`${entity.id}-${refId}`}
                    d={`M ${from.x}% ${100 - from.y}% Q ${cx}% ${100 - cy}% ${to.x}% ${100 - to.y}%`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={isHighlighted ? 2 : 1}
                    strokeDasharray={isReferencedBySelected ? "4 4" : "none"}
                    className={cn(
                      "transition-all duration-500",
                      isDirectRef ? "text-primary" :
                      isReferencedBySelected ? "text-primary/50" :
                      isHighlighted ? "text-muted-foreground/50" : "text-border/50"
                    )}
                    markerEnd={isHighlighted ? "url(#arrowhead-active)" : "url(#arrowhead-muted)"}
                    filter={isDirectRef ? "url(#glow)" : undefined}
                  />
                );
              })
            )}
          </svg>

          {/* Nodes */}
          {entities.map((entity) => {
            const pos = nodePositions[entity.id];
            if (!pos) return null;

            const config = typeConfig[entity.type];
            const isSelected = selectedNode === entity.id;
            const isHighlighted = allRelated.includes(entity.id);

            return (
              <div
                key={entity.id}
                className={cn(
                  "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 group",
                  "flex flex-col items-center gap-1"
                )}
                style={{ left: `${pos.x}%`, top: `${100 - pos.y}%` }}
                onClick={() => setSelectedNode(entity.id)}
              >
                {/* Node card */}
                <div
                  className={cn(
                    "border px-3 py-2 rounded-lg text-xs font-mono transition-all duration-300",
                    "shadow-sm hover:shadow-md",
                    config.bg,
                    config.border,
                    config.text,
                    isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110 shadow-lg",
                    isHighlighted && !isSelected && "opacity-100 scale-105",
                    !isHighlighted && selectedNode && "opacity-25 scale-95"
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <Hash className="w-3 h-3 opacity-60" />
                    <span className="font-semibold">{entity.id}</span>
                  </div>
                </div>

                {/* Label below node */}
                <div className={cn(
                  "text-[10px] text-muted-foreground transition-opacity duration-300 whitespace-nowrap",
                  isHighlighted ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                  !isHighlighted && selectedNode && "opacity-0"
                )}>
                  {entity.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="relative z-10 px-6 pb-6">
          <div className="flex flex-wrap gap-4 text-xs border-t border-border pt-4">
            {Object.entries(typeConfig).map(([type, config]) => (
              <div key={type} className="flex items-center gap-2">
                <div className={cn("w-3 h-3 rounded border", config.bg, config.border)} />
                <span className="text-muted-foreground">{config.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel: Details */}
      <div className="lg:col-span-5 space-y-6">
        {/* Selected Entity Card */}
        <div className="border border-border bg-card overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest font-bold">
              <MousePointer2 className="w-4 h-4" /> Selected Entity
            </div>
          </div>

          {selectedEntity ? (
            <div className="p-6 space-y-6">
              {/* ID and Type */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Identifier</div>
                  <div className="font-mono text-xl font-bold flex items-center gap-2">
                    <span className="text-primary">#</span>
                    {selectedEntity.id}
                  </div>
                </div>
                <div className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium border",
                  typeConfig[selectedEntity.type].bg,
                  typeConfig[selectedEntity.type].border,
                  typeConfig[selectedEntity.type].text
                )}>
                  {typeConfig[selectedEntity.type].label}
                </div>
              </div>

              {/* Label */}
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Label</div>
                <div className="text-lg font-medium">{selectedEntity.label}</div>
              </div>

              {/* References */}
              {selectedEntity.refs.length > 0 && (
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <ArrowRight className="w-3 h-3" />
                    References ({selectedEntity.refs.length})
                  </div>
                  <div className="space-y-2">
                    {selectedEntity.refs.map((refId) => {
                      const refEntity = entities.find((e) => e.id === refId);
                      const refConfig = refEntity ? typeConfig[refEntity.type] : null;
                      return (
                        <button
                          key={refId}
                          className={cn(
                            "w-full flex items-center gap-3 text-sm p-3 rounded-lg border transition-all",
                            "hover:bg-muted/50 hover:border-primary/30 text-left",
                            refConfig?.bg,
                            refConfig?.border
                          )}
                          onClick={() => setSelectedNode(refId)}
                        >
                          <Hash className={cn("w-3.5 h-3.5", refConfig?.text)} />
                          <span className={cn("font-mono font-medium", refConfig?.text)}>{refId}</span>
                          <span className="text-muted-foreground ml-auto text-xs">{refEntity?.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Referenced By */}
              {referencedBy.length > 0 && (
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 rotate-180" />
                    Referenced By ({referencedBy.length})
                  </div>
                  <div className="space-y-2">
                    {referencedBy.map((refId) => {
                      const refEntity = entities.find((e) => e.id === refId);
                      const refConfig = refEntity ? typeConfig[refEntity.type] : null;
                      return (
                        <button
                          key={refId}
                          className="w-full flex items-center gap-3 text-sm p-3 rounded-lg border border-dashed border-border hover:bg-muted/50 hover:border-primary/30 text-left transition-all"
                          onClick={() => setSelectedNode(refId)}
                        >
                          <Hash className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="font-mono text-muted-foreground">{refId}</span>
                          <span className="text-muted-foreground ml-auto text-xs">{refEntity?.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 text-center text-muted-foreground">
              <MousePointer2 className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p>Click a node to see details</p>
            </div>
          )}
        </div>

        {/* Code Example */}
        <div className="border border-border bg-zinc-950 dark:bg-zinc-900 overflow-hidden rounded-lg">
          <div className="px-4 py-3 border-b border-zinc-800 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs font-mono text-zinc-400">Query API</span>
          </div>
          <div className="p-4 font-mono text-sm space-y-4">
            <div>
              <div className="text-zinc-500 text-xs mb-1">// Get dependencies</div>
              <div className="text-zinc-100">
                <span className="text-sky-400">related</span>
                <span className="text-zinc-400">(</span>
                <span className="text-amber-300">"#thm-fund"</span>
                <span className="text-zinc-400">)</span>
              </div>
              <div className="text-emerald-400 text-xs mt-1 pl-2 border-l-2 border-emerald-500/30">
                → [def-prime, def-composite, lem-euclid]
              </div>
            </div>
            <div className="border-t border-zinc-800 pt-4">
              <div className="text-zinc-500 text-xs mb-1">// Find dependents</div>
              <div className="text-zinc-100">
                <span className="text-sky-400">dependents</span>
                <span className="text-zinc-400">(</span>
                <span className="text-amber-300">"#def-prime"</span>
                <span className="text-zinc-400">)</span>
              </div>
              <div className="text-emerald-400 text-xs mt-1 pl-2 border-l-2 border-emerald-500/30">
                → [thm-fund, lem-euclid, code-isprime, ...]
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
