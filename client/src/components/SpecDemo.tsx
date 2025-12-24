import { VeraEntity } from "@/components/VeraEntity";

function SpecSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="space-y-6">
      <div>
        <div className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">{title}</div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-3">{description}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {children}
      </div>
    </section>
  );
}

function SpecCard({ title, type, children }: { title: string; type: string; children: React.ReactNode }) {
  return (
    <div className="border border-border bg-card p-6 flex flex-col gap-4 min-h-[320px]">
      <div>
        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{type}</div>
        <h3 className="text-lg font-bold mt-2">{title}</h3>
      </div>
      <div className="border border-border bg-background p-4 flex-1">
        {children}
      </div>
    </div>
  );
}

function SectionBlock() {
  return (
    <SpecCard title="Section Block" type="section_block">
      <VeraEntity type="section_block" title="1. Overview" id="sec-overview">
        <p>Structured sections keep documents navigable while preserving Markdown compatibility.</p>
      </VeraEntity>
    </SpecCard>
  );
}

function FigureBlock() {
  return (
    <SpecCard title="Figure Block" type="figure_block">
      <VeraEntity type="figure_block" id="fig-architecture">
        <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground text-sm">[Diagram Placeholder]</div>
        <p className="text-sm text-muted-foreground mt-2">Figure 1: Provenance pipeline overview.</p>
      </VeraEntity>
    </SpecCard>
  );
}

function TableBlock() {
  return (
    <SpecCard title="Table Block" type="table_block">
      <VeraEntity type="table_block" id="tab-latency">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-2 text-left">Metric</th>
              <th className="p-2 text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="p-2">Latency</td>
              <td className="p-2 text-right">12ms</td>
            </tr>
            <tr className="border-t border-border">
              <td className="p-2">Throughput</td>
              <td className="p-2 text-right">10k/s</td>
            </tr>
          </tbody>
        </table>
      </VeraEntity>
    </SpecCard>
  );
}

function ResultBlock() {
  return (
    <SpecCard title="Result Block" type="result_block">
      <VeraEntity type="result_block" id="res-accuracy" metadata={{ metric: "Accuracy", value: "98.5%", task: "ImageNet" }}>
        <p className="text-sm">Replicable benchmark output with metadata captured alongside results.</p>
      </VeraEntity>
    </SpecCard>
  );
}

function DiagramBlock() {
  return (
    <SpecCard title="Diagram Block" type="diagram_block">
      <VeraEntity type="diagram_block" id="diag-flow" metadata={{ notation: "mermaid" }}>
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div className="border border-border py-2">A</div>
          <div className="border border-border py-2">B</div>
          <div className="border border-border py-2">C</div>
        </div>
      </VeraEntity>
    </SpecCard>
  );
}

function CodeBlock() {
  return (
    <SpecCard title="Code Block" type="code_block">
      <VeraEntity type="code_block" id="code-parse" metadata={{ language: "ts" }}>
        <pre className="whitespace-pre-wrap text-xs">{`const entity = parseVera(markdown);\nvalidate(entity);`}</pre>
      </VeraEntity>
    </SpecCard>
  );
}

function ComparisonBlock() {
  return (
    <SpecCard title="Comparison Block" type="comparison_block">
      <VeraEntity type="comparison_block" id="comp-tools" metadata={{ subjects: "Parser A, Parser B" }}>
        <div className="border border-border p-4">
          <div className="text-xs font-mono uppercase text-muted-foreground">Parser A</div>
          <div className="mt-2 text-sm">1.2s build time</div>
        </div>
        <div className="border border-border p-4">
          <div className="text-xs font-mono uppercase text-muted-foreground">Parser B</div>
          <div className="mt-2 text-sm">0.9s build time</div>
        </div>
      </VeraEntity>
    </SpecCard>
  );
}

function AbstractBlock() {
  return (
    <SpecCard title="Abstract Block" type="abstract_block">
      <VeraEntity type="abstract_block">
        <p>VERA introduces semantic entities while maintaining full Markdown portability across tools.</p>
      </VeraEntity>
    </SpecCard>
  );
}

function TheoremBlock() {
  return (
    <SpecCard title="Theorem Block" type="theorem_block">
      <VeraEntity type="theorem_block" title="Theorem 1" id="thm-fund">
        <p>Every continuous function on a compact interval is bounded.</p>
      </VeraEntity>
    </SpecCard>
  );
}

function ProofBlock() {
  return (
    <SpecCard title="Proof Block" type="proof_block">
      <VeraEntity type="proof_block">
        <p>Assume the contrary. By compactness, a finite subcover yields a contradiction. ∎</p>
      </VeraEntity>
    </SpecCard>
  );
}

function GuaranteeBlock() {
  return (
    <SpecCard title="Guarantee Block" type="guarantee_block">
      <VeraEntity type="guarantee_block" metadata={{ property: "Deterministic" }}>
        <p>Identical inputs yield identical entity graphs.</p>
      </VeraEntity>
    </SpecCard>
  );
}

function OperationBlock() {
  return (
    <SpecCard title="Operation Block" type="operation_block">
      <VeraEntity type="operation_block" metadata={{ method: "POST", endpoint: "/entities" }}>
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="px-2 py-1 border border-border">POST</span>
          <span>/entities</span>
        </div>
        <p className="mt-3 text-sm">Create a new entity from a Markdown directive.</p>
      </VeraEntity>
    </SpecCard>
  );
}

function ExampleBlock() {
  return (
    <SpecCard title="Example Block" type="example_block">
      <VeraEntity type="example_block" title="Example" id="ex-1">
        <p>Example: Define an entity with a stable ID and reusable alias.</p>
      </VeraEntity>
    </SpecCard>
  );
}

function ExerciseBlock() {
  return (
    <SpecCard title="Exercise Block" type="exercise_block">
      <VeraEntity type="exercise_block" metadata={{ difficulty: "intermediate", points: 10 }}>
        <p>Prove that for primes p &gt; 3, p + 1 is divisible by 6.</p>
      </VeraEntity>
    </SpecCard>
  );
}

function ProfileBlock() {
  return (
    <SpecCard title="Profile Block" type="profile_block">
      <VeraEntity type="profile_block" metadata={{ role: "Reviewer" }}>
        <div className="text-sm font-semibold">Dr. Ada Bloom</div>
        <div className="text-sm text-muted-foreground">Verified 42 theorem proofs</div>
      </VeraEntity>
    </SpecCard>
  );
}

function AdmonitionBlock() {
  return (
    <SpecCard title="Admonition Block" type="admonition_block">
      <VeraEntity type="admonition_block" variant="warning">
        <p>Aliases can change. Always keep stable local IDs for cross-doc links.</p>
      </VeraEntity>
    </SpecCard>
  );
}

function QuoteBlock() {
  return (
    <SpecCard title="Quote Block" type="quote_block">
      <VeraEntity type="quote_block">
        <p>“Semantic structure turns documents into systems.”</p>
      </VeraEntity>
    </SpecCard>
  );
}

function DialogueBlock() {
  return (
    <SpecCard title="Dialogue Block" type="dialogue_block">
      <VeraEntity type="dialogue_block">
        <div className="border border-border p-3">
          <div className="text-xs font-mono text-muted-foreground">Reviewer</div>
          <div className="text-sm">The references are stable across versions.</div>
        </div>
        <div className="border border-border p-3">
          <div className="text-xs font-mono text-muted-foreground">Author</div>
          <div className="text-sm">Yes, local IDs never change.</div>
        </div>
      </VeraEntity>
    </SpecCard>
  );
}

function VerseBlock() {
  return (
    <SpecCard title="Verse Block" type="verse_block">
      <VeraEntity type="verse_block">
        <p>Define the form, preserve the proof,\nLet meaning travel, uncoupled truth.</p>
      </VeraEntity>
    </SpecCard>
  );
}

function LetterBlock() {
  return (
    <SpecCard title="Letter Block" type="letter_block">
      <VeraEntity type="letter_block">
        <p>Dear Colleague,\nVERA lets our proofs remain verifiable across formats.\nRegards.</p>
      </VeraEntity>
    </SpecCard>
  );
}

function TimelineBlock() {
  return (
    <SpecCard title="Timeline Block" type="timeline_block">
      <VeraEntity type="timeline_block">
        <VeraEntity type="event">
          <div className="text-xs font-mono text-muted-foreground">2024</div>
          <div className="text-sm">Schema draft published</div>
        </VeraEntity>
        <VeraEntity type="event">
          <div className="text-xs font-mono text-muted-foreground">2025</div>
          <div className="text-sm">RFC v0.9.2 released</div>
        </VeraEntity>
      </VeraEntity>
    </SpecCard>
  );
}

function TypeDef() {
  return (
    <SpecCard title="Type Definition" type="type_def">
      <VeraEntity type="type_def" title="EntityId">
        <p>EntityId := string matching /[a-z][a-z0-9-]+/</p>
      </VeraEntity>
    </SpecCard>
  );
}

function EnumDef() {
  return (
    <SpecCard title="Enum Definition" type="enum_def">
      <VeraEntity type="enum_def" title="EntityKind">
        <p>section | theorem | proof | definition</p>
      </VeraEntity>
    </SpecCard>
  );
}

function FunctionDef() {
  return (
    <SpecCard title="Function Definition" type="function_def">
      <VeraEntity type="function_def" title="resolve">
        <p>resolve(id: EntityId) → Entity</p>
      </VeraEntity>
    </SpecCard>
  );
}

function PredicateDef() {
  return (
    <SpecCard title="Predicate Definition" type="predicate_def">
      <VeraEntity type="predicate_def" title="ValidAlias">
        <p>ValidAlias(a) ⇔ a ∈ kebab-case</p>
      </VeraEntity>
    </SpecCard>
  );
}

function NotationDef() {
  return (
    <SpecCard title="Notation Definition" type="notation_def">
      <VeraEntity type="notation_def" title=":::">
        <p><code>{":::entity{#id}"}</code> introduces a typed block entity.</p>
      </VeraEntity>
    </SpecCard>
  );
}

function TermDef() {
  return (
    <SpecCard title="Term Definition" type="term_def">
      <VeraEntity type="term_def" title="Provenance">
        <p>Metadata describing origin, extraction, and validation of an entity.</p>
      </VeraEntity>
    </SpecCard>
  );
}

function AxiomDef() {
  return (
    <SpecCard title="Axiom Definition" type="axiom_def">
      <VeraEntity type="axiom_def" title="Uniqueness">
        <p>Every entity has exactly one local identifier.</p>
      </VeraEntity>
    </SpecCard>
  );
}

function RuleDef() {
  return (
    <SpecCard title="Rule Definition" type="rule_def">
      <VeraEntity type="rule_def" title="Alias Resolution">
        <p>Resolve alias only when local ID is absent.</p>
      </VeraEntity>
    </SpecCard>
  );
}

function GrammarDef() {
  return (
    <SpecCard title="Grammar Definition" type="grammar_def">
      <VeraEntity type="grammar_def" title="Directive">
        <p>directive := ":::" name attrs newline content ":::"</p>
      </VeraEntity>
    </SpecCard>
  );
}

function JudgmentDef() {
  return (
    <SpecCard title="Judgment Definition" type="judgment_def">
      <VeraEntity type="judgment_def" title="Well-Formed">
        <p>Γ ⊢ entity : WellFormed</p>
      </VeraEntity>
    </SpecCard>
  );
}

function ReferenceDef() {
  return (
    <SpecCard title="Reference Definition" type="reference_def">
      <VeraEntity type="reference_def" title="Knuth 1997">
        <p>Source: The Art of Computer Programming, Vol. 1.</p>
      </VeraEntity>
    </SpecCard>
  );
}

function ProofStep() {
  return (
    <SpecCard title="Proof Step" type="proof_step">
      <VeraEntity type="proof_step">
        <div className="text-xs font-mono text-muted-foreground">Step 1</div>
        <p>Assume n is even, then n = 2k for some k.</p>
      </VeraEntity>
    </SpecCard>
  );
}

function Event() {
  return (
    <SpecCard title="Event" type="event">
      <VeraEntity type="event">
        <div className="text-xs font-mono text-muted-foreground">2025-01-15</div>
        <p>Reference graph validation completed.</p>
      </VeraEntity>
    </SpecCard>
  );
}

function Hint() {
  return (
    <SpecCard title="Hint" type="hint">
      <VeraEntity type="hint">
        <p>Use alias for human-friendly links, not for permanence.</p>
      </VeraEntity>
    </SpecCard>
  );
}

export default function SpecDemo() {
  return (
    <div className="container space-y-24">
      <header className="border border-border p-10 bg-muted/20">
        <div className="text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground">RFC v0.9.2</div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mt-4">VERA Specification Elements</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
          One rendered example for every entity type in the schema, unified under the VERA visual language.
        </p>
      </header>

      <SpecSection title="Content" description="Entity Blocks">
        <SectionBlock />
        <FigureBlock />
        <TableBlock />
        <ResultBlock />
        <DiagramBlock />
        <CodeBlock />
        <ComparisonBlock />
        <AbstractBlock />
        <TheoremBlock />
        <ProofBlock />
        <GuaranteeBlock />
        <OperationBlock />
        <ExampleBlock />
        <ExerciseBlock />
        <ProfileBlock />
        <AdmonitionBlock />
        <QuoteBlock />
        <DialogueBlock />
        <VerseBlock />
        <LetterBlock />
        <TimelineBlock />
      </SpecSection>

      <SpecSection title="Definitions" description="Formal Vocabulary">
        <TypeDef />
        <EnumDef />
        <FunctionDef />
        <PredicateDef />
        <NotationDef />
        <TermDef />
        <AxiomDef />
        <RuleDef />
        <GrammarDef />
        <JudgmentDef />
        <ReferenceDef />
      </SpecSection>

      <SpecSection title="Supporting" description="Auxiliary Elements">
        <ProofStep />
        <Event />
        <Hint />
      </SpecSection>
    </div>
  );
}
