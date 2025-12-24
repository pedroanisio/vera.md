import { Button } from "@/components/ui/button";
import { EntityGallery } from "@/components/EntityGallery";
import { ProvenanceDemo } from "@/components/ProvenanceDemo";
import { ConsistencyDemo } from "@/components/ConsistencyDemo";
import { KnowledgeGraphDemo } from "@/components/KnowledgeGraphDemo";
import { EditorTeaser } from "@/components/EditorTeaser";
import SpecDemo from "@/components/SpecDemo";
import { ArrowRight, FileText, GitBranch, Layers, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary"></div>
            <span className="font-bold tracking-tighter text-xl">VERA</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#provenance" className="hover:text-primary transition-colors">Provenance</a>
            <a href="#spec" className="hover:text-primary transition-colors">Specification</a>
            <Button size="sm" className="rounded-none font-bold">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 lg:pt-48 lg:pb-32 border-b border-border relative overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block px-3 py-1 mb-6 border border-primary text-primary text-xs font-mono font-bold uppercase tracking-widest">
              Structured Document Editor
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              TRUTH <br />
              <span className="text-primary">THROUGH</span> <br />
              DATA.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
              Knowledge dies in documents. VERA transforms unstructured text into typed, queryable data structures where every theorem is validated, every reference resolves, and trust is queryable metadata.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-none h-14 px-8 text-lg font-bold">
                Read the Spec <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-none h-14 px-8 text-lg font-bold bg-transparent">
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
        
        {/* Abstract Grid Background */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none hidden lg:block">
          <img src="/images/hero-grid.png" alt="Grid Pattern" className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-screen" />
        </div>
      </header>

      {/* Value Props */}
      <section className="py-20 border-b border-border bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-4">
              <Layers className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">Types Prevent Mistakes</h3>
              <p className="text-muted-foreground">A theorem without a conclusion is impossible to construct. Invalid states are unrepresentable at compile time.</p>
            </div>
            <div className="space-y-4">
              <GitBranch className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">Trust Is Metadata</h3>
              <p className="text-muted-foreground">Content has provenance: who created it, how confident we are, whether it claims truth or invents fiction.</p>
            </div>
            <div className="space-y-4">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">Queries, Not Grep</h3>
              <p className="text-muted-foreground">"All theorems in category 'soundness' without proofs" becomes a trivial query, not hours of searching.</p>
            </div>
            <div className="space-y-4">
              <FileText className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">One Source, Many Formats</h3>
              <p className="text-muted-foreground">Render to Markdown, LaTeX, HTML, or slides from a single typed specification. Structure survives transformation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section id="features" className="py-24">
        <div className="container">
          <div className="mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4">DEFINITION KINDS</h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              14 typed interfaces, 16 kind discriminants. From theorems and grammars to dialogues and letters. One generic core, many specialized domains: PL research, software architecture, literary manuscripts, historical archives.
            </p>
          </div>

          <div className="border-t border-border pt-12">
            <EntityGallery />
          </div>
        </div>
      </section>

      {/* Provenance Section */}
      <section id="provenance" className="py-24 bg-muted/20 border-t border-border relative overflow-hidden">
        <div className="container relative z-10">
          <div className="mb-16">
            <div className="inline-block px-3 py-1 mb-6 border border-primary text-primary text-xs font-mono font-bold uppercase tracking-widest">
              Auditable
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
              TRUST IS <br />
              <span className="text-primary">QUERYABLE.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              In an age of AI-generated content, provenance isn't optional. Filter by "peer-reviewed claims only." Highlight AI-generated content for review. Separate historical facts from dramatized scenes. Trust is built into every entity.
            </p>
          </div>

          <ProvenanceDemo />
        </div>
      </section>

      {/* Consistency Section */}
      <section id="consistency" className="py-24 bg-background border-t border-border relative overflow-hidden">
        <div className="container relative z-10">
          <div className="mb-16">
            <div className="inline-block px-3 py-1 mb-6 border border-primary text-primary text-xs font-mono font-bold uppercase tracking-widest">
              Validated
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
              EVERY REF <br />
              <span className="text-primary">RESOLVES.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              When the spec changes, you manually hunt for broken cross-references. Not anymore. VERA validates at build time: broken refs, missing conclusions, duplicate IDs. Living documentation that can't silently rot.
            </p>
          </div>

          <ConsistencyDemo />
        </div>
      </section>

      {/* Knowledge Graph Section */}
      <section id="graph" className="py-24 bg-muted/10 border-t border-border relative overflow-hidden">
        <div className="container relative z-10">
          <div className="mb-16">
            <div className="inline-block px-3 py-1 mb-6 border border-primary text-primary text-xs font-mono font-bold uppercase tracking-widest">
              Connected
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
              DOCUMENTS AS <br />
              <span className="text-primary">GRAPHS.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Every entity has a unique ID. References create edges. The result: a queryable dependency graph. Ask "what depends on Definition 2.3?" and get an answer in milliseconds, not hours of searching.
            </p>
          </div>

          <KnowledgeGraphDemo />
        </div>
      </section>

      {/* Specification Demo Section */}
      <section id="spec" className="py-24 bg-background border-t border-border">
        <SpecDemo />
      </section>

      {/* Editor Teaser Section */}
      <section id="editor" className="py-24 bg-muted/10 border-t border-border relative overflow-hidden">
        <div className="container relative z-10">
          <EditorTeaser />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-primary"></div>
                <span className="font-bold tracking-tighter text-xl">VERA</span>
              </div>
              <p className="text-muted-foreground max-w-sm">
                From Latin <em>vera</em> (true things). Structured documents as data, not text. Where theorems are validated objects and trust is queryable metadata.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Documentation</a></li>
                <li><a href="#" className="hover:text-primary">Specification</a></li>
                <li><a href="#" className="hover:text-primary">Examples</a></li>
                <li><a href="#" className="hover:text-primary">GitHub</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary">License (MIT)</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-mono">
            <div>© 2025 VERA Project. All rights reserved.</div>
            <div>Designed with Swiss Style Principles.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
