import { cn } from "@/lib/utils";
import { 
  BookOpen, 
  Code, 
  FileText, 
  GitBranch, 
  Image as ImageIcon, 
  Layers, 
  List, 
  MessageSquare, 
  Quote, 
  Scale, 
  Sigma, 
  Table, 
  Terminal, 
  Type 
} from "lucide-react";

export type VeraEntityType = 
  // Structural
  | "section_block"
  // Data & Visual
  | "figure_block" | "table_block" | "result_block" | "diagram_block" | "code_block" | "comparison_block"
  // Formal & Technical
  | "abstract_block" | "theorem_block" | "proof_block" | "guarantee_block" | "operation_block" | "example_block" | "exercise_block" | "profile_block"
  // Narrative
  | "admonition_block" | "quote_block" | "dialogue_block" | "verse_block" | "letter_block" | "timeline_block"
  // Definitions
  | "type_def" | "enum_def" | "function_def" | "predicate_def" | "notation_def" | "term_def" | "axiom_def" | "rule_def" | "grammar_def" | "judgment_def" | "reference_def"
  // Supporting
  | "proof_step" | "event" | "hint" | "provenance";

interface VeraEntityProps {
  type: VeraEntityType;
  title?: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
  metadata?: Record<string, string | number | boolean>;
  variant?: string;
}

export function VeraEntity({ type, title, id, children, className, metadata, variant }: VeraEntityProps) {
  
  // --- Style Configurations ---
  
  const getStyles = (type: VeraEntityType, variant?: string) => {
    const baseStyles = "relative p-4 my-4 border-l-4";
    
    switch (type) {
      // Structural
      case "section_block": return "border-b border-black/10 dark:border-white/10 pb-4 mb-12 mt-12 border-l-0";
      
      // Data & Visual
      case "figure_block": return "border border-border bg-muted/5 text-center p-6 rounded-sm";
      case "table_block": return "border border-border rounded-sm overflow-hidden shadow-sm";
      case "result_block": return "border-l-2 border-primary/40 bg-primary/5 p-6 rounded-sm";
      case "diagram_block": return "border border-dashed border-border bg-card p-12 flex justify-center rounded-sm";
      case "code_block": return "bg-muted/70 text-foreground font-mono text-[13px] leading-relaxed rounded-sm border border-border/70 shadow-inner border-l-0";
      case "comparison_block": return "grid grid-cols-2 gap-8 border-none p-0";

      // Formal & Technical
      case "abstract_block": return "bg-muted/20 italic border-l-2 border-muted-foreground/50 px-8 py-6 rounded-r-sm font-serif text-lg leading-relaxed text-muted-foreground";
      case "theorem_block": return "border border-primary/20 bg-primary/5 p-6 rounded-sm shadow-[4px_4px_0px_0px_rgba(var(--primary),0.1)]";
      case "proof_block": return "border-l-2 border-muted-foreground/30 pl-6 py-2 italic text-muted-foreground font-serif";
      case "guarantee_block": return "border border-primary/20 bg-primary/5 p-5 rounded-sm";
      case "operation_block": return "border border-border bg-card shadow-sm font-mono text-sm p-4 rounded-sm";
      case "example_block": return "border-l-2 border-primary/30 bg-primary/5 p-6 rounded-sm";
      case "exercise_block": return "border-2 border-dashed border-primary/20 bg-background p-6 rounded-sm";
      case "profile_block": return "border border-border bg-card flex gap-6 items-start p-6 rounded-sm shadow-sm";

      // Narrative
      case "admonition_block": 
        if (variant === 'warning') return "border-l-4 border-destructive/60 bg-destructive/5 p-5 rounded-sm";
        if (variant === 'tip') return "border-l-4 border-primary/50 bg-primary/5 p-5 rounded-sm";
        return "border-l-4 border-border bg-muted/30 p-5 rounded-sm";
      case "quote_block": return "border-l-4 border-primary/40 pl-8 italic text-xl font-serif bg-transparent py-4 text-muted-foreground";
      case "dialogue_block": return "space-y-6 border-none p-0";
      case "verse_block": return "whitespace-pre-wrap font-serif italic text-center border-none text-lg leading-loose";
      case "letter_block": return "border border-border p-10 bg-card font-serif shadow-sm max-w-2xl mx-auto";
      case "timeline_block": return "border-l-2 border-primary/20 ml-4 pl-10 space-y-10 py-4";

      // Definitions
      case "type_def":
      case "enum_def":
      case "function_def":
      case "predicate_def":
      case "grammar_def":
        return "font-mono text-sm border border-border bg-muted/30 p-5 rounded-sm";
      
      case "term_def":
      case "notation_def":
      case "axiom_def":
      case "rule_def":
      case "judgment_def":
      case "reference_def":
        return "border border-border bg-card shadow-sm p-5 rounded-sm";

      // Supporting
      case "proof_step": return "pl-6 border-l border-muted-foreground/20 my-3 relative";
      case "event": return "relative";
      case "hint": return "text-sm text-muted-foreground bg-muted/30 p-3 rounded border border-border/50 flex gap-2 items-start";
      case "provenance": return "text-[10px] font-mono border-t border-dashed border-border pt-3 mt-6 text-muted-foreground/70 border-l-0 uppercase tracking-widest";
      
      default: return baseStyles;
    }
  };

  const getIcon = (type: VeraEntityType) => {
    switch (type) {
      case "theorem_block": return <Sigma className="w-4 h-4" />;
      case "proof_block": return <Scale className="w-4 h-4" />;
      case "code_block": return <Terminal className="w-4 h-4" />;
      case "figure_block": return <ImageIcon className="w-4 h-4" />;
      case "table_block": return <Table className="w-4 h-4" />;
      case "quote_block": return <Quote className="w-4 h-4" />;
      case "dialogue_block": return <MessageSquare className="w-4 h-4" />;
      case "section_block": return <Layers className="w-4 h-4" />;
      case "term_def": return <BookOpen className="w-4 h-4" />;
      case "function_def": return <Code className="w-4 h-4" />;
      default: return null;
    }
  };

  const getLabel = (type: VeraEntityType, variant?: string) => {
    if (type === "admonition_block" && variant) return variant.toUpperCase();
    if (type === "section_block") return "";
    return type.replace("_block", "").replace("_def", "").toUpperCase();
  };

  // --- Rendering Logic ---

  return (
    <div className={cn(getStyles(type, variant), className)} id={id}>
      {/* Header / Label */}
      {type !== "section_block" && type !== "provenance" && type !== "comparison_block" && type !== "dialogue_block" && type !== "timeline_block" && (
        <div className="flex items-center gap-3 mb-4 select-none">
          <span className={cn(
            "font-bold uppercase tracking-widest text-[10px] flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] transition-colors",
            type.includes("def") ? "bg-muted text-foreground border border-border" : 
            type === "theorem_block" ? "bg-primary/5 text-primary border border-primary/20" :
            "bg-muted/50 text-muted-foreground border border-border"
          )}>
            {getIcon(type)}
            {getLabel(type, variant)}
          </span>
          {id && <span className="font-mono text-[10px] text-muted-foreground/50">#{id}</span>}
          {title && <span className="font-serif font-bold text-base text-foreground tracking-tight">{title}</span>}
        </div>
      )}
      
      {/* Special Header for Section */}
      {type === "section_block" && (
        <div className="flex items-baseline gap-3 mb-4 border-b border-border pb-2">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {id && <span className="text-xs font-mono text-muted-foreground opacity-50">#{id}</span>}
        </div>
      )}

      {/* Content Body */}
      <div className={cn(
        "prose-sm dark:prose-invert max-w-none",
        type === "code_block" && "font-mono text-xs overflow-x-auto p-4",
        type === "verse_block" && "text-lg leading-relaxed",
        type === "theorem_block" && "font-serif text-lg leading-relaxed italic text-foreground/90",
        type === "proof_block" && "text-base leading-relaxed text-muted-foreground",
        type === "abstract_block" && "text-base leading-relaxed"
      )}>
        {children}
      </div>

      {/* Metadata Footer */}
      {metadata && (
        <div className="mt-3 pt-2 border-t border-border/50 flex flex-wrap gap-3 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
          {Object.entries(metadata).map(([key, value]) => (
            <span key={key} className="flex items-center gap-1">
              <span className="opacity-50">{key}:</span> 
              <span className="font-medium text-foreground">{value.toString()}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
