import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FeatureDemo } from "@/components/FeatureDemo";
import { VeraEntity } from "@/components/VeraEntity";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function EntityGallery() {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="structural" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="h-auto flex-wrap justify-center gap-2 bg-transparent p-0">
            <TabsTrigger value="structural" className="rounded-none border border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5 data-[state=active]:text-primary px-4 py-2">Structural</TabsTrigger>
            <TabsTrigger value="data" className="rounded-none border border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5 data-[state=active]:text-primary px-4 py-2">Data & Visual</TabsTrigger>
            <TabsTrigger value="formal" className="rounded-none border border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5 data-[state=active]:text-primary px-4 py-2">Formal</TabsTrigger>
            <TabsTrigger value="narrative" className="rounded-none border border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5 data-[state=active]:text-primary px-4 py-2">Narrative</TabsTrigger>
            <TabsTrigger value="definitions" className="rounded-none border border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5 data-[state=active]:text-primary px-4 py-2">Definitions</TabsTrigger>
          </TabsList>
        </div>

        {/* --- STRUCTURAL --- */}
        <TabsContent value="structural" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <FeatureDemo
            title="Section Block"
            description="The fundamental building block for document hierarchy. Supports explicit nesting validation."
            code={`:::section{#sec-intro level=1 title="Introduction"}
Welcome to the VERA specification.

:::section{#sec-scope level=2 title="Scope"}
This document covers the core entity schema.
:::
:::`}
            render={
              <div className="border border-border p-6 bg-white dark:bg-black">
                <VeraEntity type="section_block" title="1. Introduction" id="sec-intro">
                  <p className="mb-6">Welcome to the VERA specification.</p>
                  <div className="pl-6 border-l border-border">
                    <VeraEntity type="section_block" title="1.1 Scope" id="sec-scope">
                      <p>This document covers the core entity schema.</p>
                    </VeraEntity>
                  </div>
                </VeraEntity>
              </div>
            }
          />
        </TabsContent>

        {/* --- DATA & VISUAL --- */}
        <TabsContent value="data" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 gap-12">
            <FeatureDemo
              title="Figure Block"
              description="Images and diagrams with semantic captions and accessibility attributes."
              code={`:::figure_block{#fig-arch src="arch.png" alt="Architecture Diagram"}
::caption
System architecture showing the three-layer provenance model.
:::`}
              render={
                <VeraEntity type="figure_block" id="fig-arch">
                  <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground mb-2">
                    [Image: arch.png]
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Figure 1: System architecture showing the three-layer provenance model.</p>
                </VeraEntity>
              }
            />

            <FeatureDemo
              title="Table Block"
              description="Structured tabular data with alignment and caption support."
              code={`:::table_block{#tab-perf alignments="left,right"}
::caption
Performance benchmarks.

| Metric | Value |
|--------|-------|
| Latency| 12ms  |
| Tput   | 10k   |
:::`}
              render={
                <VeraEntity type="table_block" id="tab-perf">
                  <p className="text-sm font-bold mb-2 text-center">Table 1: Performance benchmarks.</p>
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
                        <td className="p-2 text-right">10k ops/s</td>
                      </tr>
                    </tbody>
                  </table>
                </VeraEntity>
              }
            />

            <FeatureDemo
              title="Result Block"
              description="Experimental results for scientific reproducibility."
              code={`:::result_block{#res-acc metric="Accuracy" value="98.5%" task="ImageNet"}
::results
| Model | Top-1 | Top-5 |
|-------|-------|-------|
| Ours  | 98.5% | 99.9% |
:::`}
              render={
                <VeraEntity type="result_block" id="res-acc" metadata={{ metric: "Accuracy", value: "98.5%", task: "ImageNet" }}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr><th className="text-left">Model</th><th>Top-1</th><th>Top-5</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Ours</td><td>98.5%</td><td>99.9%</td></tr>
                    </tbody>
                  </table>
                </VeraEntity>
              }
            />

            <FeatureDemo
              title="Code Block"
              description="Executable code snippets with output capture."
              code={`:::code_block{#code-hello language="python" executable=true}
::source
print("Hello VERA")

::output
Hello VERA
:::`}
              render={
                <VeraEntity type="code_block" id="code-hello" metadata={{ language: "python", executable: true }}>
                  <div className="text-green-400 mb-2">print("Hello VERA")</div>
                  <div className="border-t border-slate-700 pt-2 text-slate-400">Hello VERA</div>
                </VeraEntity>
              }
            />

            <FeatureDemo
              title="Diagram Block"
              description="Rendered diagrams from textual descriptions (Mermaid, Graphviz, etc.)."
              code={`:::diagram_block{#diag-flow notation="mermaid"}
::source
graph TD;
    A-->B;
    A-->C;
:::`}
              render={
                <VeraEntity type="diagram_block" id="diag-flow" metadata={{ notation: "mermaid" }}>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center">A</div>
                    <div className="flex gap-8">
                      <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center">B</div>
                      <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center">C</div>
                    </div>
                  </div>
                </VeraEntity>
              }
            />

            <FeatureDemo
              title="Comparison Block"
              description="Side-by-side comparison of subjects."
              code={`:::comparison_block{#comp-models subjects="GPT-4,Claude 3"}
::criteria
| Feature | GPT-4 | Claude 3 |
|---------|-------|----------|
| Context | 128k  | 200k     |
:::`}
              render={
                <VeraEntity type="comparison_block" id="comp-models" metadata={{ subjects: "GPT-4, Claude 3" }}>
                  <div className="border border-border p-4">
                    <h4 className="font-bold mb-2">GPT-4</h4>
                    <div className="text-sm">Context: 128k</div>
                  </div>
                  <div className="border border-border p-4">
                    <h4 className="font-bold mb-2">Claude 3</h4>
                    <div className="text-sm">Context: 200k</div>
                  </div>
                </VeraEntity>
              }
            />
          </div>
        </TabsContent>

        {/* --- FORMAL --- */}
        <TabsContent value="formal" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 gap-12">
            <FeatureDemo
              title="Theorem & Proof"
              description="The core of formal documentation."
              code={`:::theorem_block{#thm-fund variant="theorem"}
::statement
Every integer > 1 is prime or product of primes.

:::proof_block
By induction on n.
:::`}
              render={
                <VeraEntity type="theorem_block" title="Fundamental Theorem" id="thm-fund">
                  <p className="mb-4">Every integer &gt; 1 is prime or product of primes.</p>
                  <VeraEntity type="proof_block">
                    <p>By induction on n.</p>
                  </VeraEntity>
                </VeraEntity>
              }
            />

            <FeatureDemo
              title="Abstract Block"
              description="Document or section summary."
              code={`:::abstract_block
This specification defines the VERA schema.
:::`}
              render={
                <VeraEntity type="abstract_block">
                  <p>This specification defines the VERA schema.</p>
                </VeraEntity>
              }
            />

            <FeatureDemo
              title="Guarantee Block"
              description="Formal guarantees provided by a system or algorithm."
              code={`:::guarantee_block{#guar-safe}
The system shall never deadlock.
:::`}
              render={
                <VeraEntity type="guarantee_block" id="guar-safe" title="Safety Guarantee">
                  <p>The system shall never deadlock.</p>
                </VeraEntity>
              }
            />

            <FeatureDemo
              title="Operation Block"
              description="API or system operation definition."
              code={`:::operation_block{#op-login}
POST /api/login
:::`}
              render={
                <VeraEntity type="operation_block" id="op-login" title="Login Operation">
                  <p>POST /api/login</p>
                </VeraEntity>
              }
            />

            <FeatureDemo
              title="Example & Exercise"
              description="Pedagogical content blocks."
              code={`:::example_block{#ex-1}
Consider the set of natural numbers.

:::exercise_block{#prob-1}
Prove that the set is infinite.
:::`}
              render={
                <VeraEntity type="example_block" id="ex-1">
                  <p className="mb-4">Consider the set of natural numbers.</p>
                  <VeraEntity type="exercise_block" id="prob-1">
                    <p>Prove that the set is infinite.</p>
                  </VeraEntity>
                </VeraEntity>
              }
            />

            <FeatureDemo
              title="Profile Block"
              description="Person or entity profile."
              code={`:::profile_block{#prof-alice}
**Alice Smith**
Lead Researcher
:::`}
              render={
                <VeraEntity type="profile_block" id="prof-alice">
                  <div className="w-12 h-12 bg-muted rounded-full"></div>
                  <div>
                    <div className="font-bold">Alice Smith</div>
                    <div className="text-sm text-muted-foreground">Lead Researcher</div>
                  </div>
                </VeraEntity>
              }
            />
          </div>
        </TabsContent>

        {/* --- NARRATIVE --- */}
        <TabsContent value="narrative" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 gap-12">
            <FeatureDemo
              title="Admonitions"
              description="Callout blocks for warnings, tips, and notes."
              code={`:::admonition_block{variant="warning"}
Do not delete the production database.
:::`}
              render={
                <VeraEntity type="admonition_block" variant="warning" title="Warning">
                  <p>Do not delete the production database.</p>
                </VeraEntity>
              }
            />

            <FeatureDemo
              title="Quote Block"
              description="Attributed quotations."
              code={`:::quote_block{author="Dijkstra"}
Simplicity is prerequisite for reliability.
:::`}
              render={
                <VeraEntity type="quote_block" metadata={{ author: "Dijkstra" }}>
                  <p>"Simplicity is prerequisite for reliability."</p>
                </VeraEntity>
              }
            />

            <FeatureDemo
              title="Dialogue Block"
              description="Script or conversation format."
              code={`:::dialogue_block
**Alice**: Did you check the logs?
**Bob**: Yes, they are empty.
:::`}
              render={
                <VeraEntity type="dialogue_block">
                  <div className="flex gap-4">
                    <div className="font-bold w-16 text-right">Alice</div>
                    <div>Did you check the logs?</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="font-bold w-16 text-right">Bob</div>
                    <div>Yes, they are empty.</div>
                  </div>
                </VeraEntity>
              }
            />

            <FeatureDemo
              title="Verse Block"
              description="Poetry or lyrics preserving line breaks."
              code={`:::verse_block
The code compiles,
The tests all pass,
Production fails.
:::`}
              render={
                <VeraEntity type="verse_block">
                  The code compiles,<br/>
                  The tests all pass,<br/>
                  Production fails.
                </VeraEntity>
              }
            />

            <FeatureDemo
              title="Letter Block"
              description="Formal correspondence format."
              code={`:::letter_block{to="Editor"}
Dear Sir,
I write to complain...
:::`}
              render={
                <VeraEntity type="letter_block" metadata={{ to: "Editor" }}>
                  <p className="mb-4">Dear Sir,</p>
                  <p>I write to complain...</p>
                </VeraEntity>
              }
            />

            <FeatureDemo
              title="Timeline Block"
              description="Chronological events."
              code={`:::timeline_block
**2024**: Project started
**2025**: V1.0 Released
:::`}
              render={
                <VeraEntity type="timeline_block">
                  <div className="relative">
                    <div className="absolute -left-[37px] top-1 w-3 h-3 bg-primary rounded-full"></div>
                    <span className="font-bold mr-4">2024</span> Project started
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[37px] top-1 w-3 h-3 bg-primary rounded-full"></div>
                    <span className="font-bold mr-4">2025</span> V1.0 Released
                  </div>
                </VeraEntity>
              }
            />
          </div>
        </TabsContent>

        {/* --- DEFINITIONS --- */}
        <TabsContent value="definitions" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureDemo
              title="Term Definition"
              description="Glossary terms."
              code={`:::term_def{#term-api}
Application Programming Interface
:::`}
              render={
                <VeraEntity type="term_def" id="term-api" title="API">
                  <p>Application Programming Interface</p>
                </VeraEntity>
              }
            />

            <FeatureDemo
              title="Type Definition"
              description="Data type schemas."
              code={`:::type_def{#type-user}
interface User { id: string }
:::`}
              render={
                <VeraEntity type="type_def" id="type-user" title="User">
                  <pre>interface User &#123; id: string &#125;</pre>
                </VeraEntity>
              }
            />

            <FeatureDemo
              title="Function Definition"
              description="Function signatures."
              code={`:::function_def{#fn-map}
map<T,U>(list: T[], fn: T->U): U[]
:::`}
              render={
                <VeraEntity type="function_def" id="fn-map" title="map">
                  <pre>map&lt;T,U&gt;(list: T[], fn: T-&gt;U): U[]</pre>
                </VeraEntity>
              }
            />

            <FeatureDemo
              title="Axiom Definition"
              description="Formal axioms."
              code={`:::axiom_def{#ax-ext}
Sets with same elements are equal.
:::`}
              render={
                <VeraEntity type="axiom_def" id="ax-ext" title="Extensionality">
                  <p>Sets with same elements are equal.</p>
                </VeraEntity>
              }
            />
            
            {/* Grouping remaining definitions for brevity in demo, but they are supported */}
            <div className="col-span-full p-8 border border-dashed border-border text-center text-muted-foreground">
              <p className="mb-4">Also supported:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["enum_def", "predicate_def", "notation_def", "rule_def", "grammar_def", "judgment_def", "reference_def"].map(type => (
                  <span key={type} className="px-2 py-1 bg-muted rounded text-xs font-mono">{type}</span>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
