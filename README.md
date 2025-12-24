---
title: VERA
date: 2025-10-12
revised: 2025-12-14
version: 0.1.3
---

# VERA

> Structured document editor for rigorous specifications

<p align="center">
  <img src="assets/logo.svg" alt="VERA" width="280" />
</p>

## About the Name

**VERA** derives from Latin *vera* (true things), reflecting our commitment to verifiable, rigorous documentation.

The name captures the project's core philosophy:
- **V**erified specifications through semantic validation
- **E**ngineering rigor via type-safe construction
- **R**eferenceable architecture with stable cross-links
- **A**uditable provenance tracking

Just as mathematical proof systems establish truth through formal structure, VERA enables **truth through data**—where theorems are validated objects, not unverified text; where every reference resolves; where trust is queryable metadata.

The three-layer logo represents VERA's architectural foundation:
- **Core layer** (bottom) — Zero-dependency document model
- **Server layer** (middle) — GraphQL API and persistence
- **Client layer** (top) — React editor with the handle representing user interaction

## Why This Exists

**The problem**: Knowledge dies in documents.

You write a formal spec in LaTeX or Markdown. It has theorems, definitions, invariants. But to the computer, it's just text. You can't ask "which theorems lack proofs?" or "what depends on Definition 2.3?" You can't validate that every reference resolves. When the spec changes, you manually hunt for broken cross-references.

The same problem plagues literary and historical work. A novel has dialogue, scenes, letters—but Word doesn't know a character's speech from narration. An archive has transcriptions, reconstructions, and speculation—but there's no way to mark what's verified versus uncertain. An oral history mixes direct quotes with editorial summaries, and readers can't tell which is which.

**The belief**: Structured documents should be *data*, not text.

When a theorem is a data structure—not a paragraph—everything changes:
- **Validation becomes automatic**: broken refs, missing conclusions, duplicate IDs
- **Queries become trivial**: "all theorems in category 'soundness' without proofs"
- **Transformation becomes possible**: one source → Markdown, LaTeX, HTML, slides
- **Tooling becomes real**: IDE completion, linting, visualization, diffs

When a dialogue exchange is typed data—not stylized text—new possibilities emerge:
- **Character analysis**: "all lines spoken by Elizabeth in Act 2"
- **Format flexibility**: render as screenplay, novel prose, or stage directions
- **Attribution tracking**: mark reconstructed dialogue versus verified transcripts

When content has provenance—trust becomes queryable:
- **Verification filtering**: "show only peer-reviewed claims"
- **Source attribution**: "highlight AI-generated content for review"
- **Fiction/fact distinction**: "separate historical facts from dramatized scenes"

**The philosophy**:

1. **Structure enables rigor**. Unstructured text decays. Structured data can be checked, enforced, and maintained. A theorem without a conclusion shouldn't be *possible*, not just *discouraged*.

2. **Types prevent mistakes**. Discriminated unions mean TypeScript catches structural errors at compile time. You literally cannot construct an invalid specification.

3. **Formalism should be accessible**. Academic rigor shouldn't require academic tooling. You should be able to `pnpm install` a spec language, not configure a theorem prover.

4. **Domain specificity through extension, not forking**. Software specs, literary manuscripts, and historical archives share structure (sections, references, content blocks) but differ in vocabulary. One generic core, many typed specializations.

5. **Trust is metadata**. Content has provenance—who created it, how confident we are, whether it claims truth or invents fiction. This isn't optional annotation; it's core to the document model.

## Who This Is For

- **Researchers** writing formal specifications who want machine-checkable structure
- **Architects** documenting systems who want validated cross-references
- **Authors** crafting novels, plays, or poetry who want structured manuscripts
- **Historians** building archives who need to distinguish fact from reconstruction
- **Archivists** preserving correspondence and oral histories with provenance tracking
- **Teams** maintaining living documentation that shouldn't silently rot
- **Tool builders** who need a typed foundation for document-aware tooling

## What Makes This Different

| Approach | Problem |
|----------|---------|
| **Markdown** | No structure. A "theorem" is just bold text. A "dialogue" is just quotes. |
| **LaTeX** | Structure exists but isn't queryable or validatable. |
| **XML/DocBook** | Verbose, untyped, painful to construct. |
| **TEI/XML** | Rich literary markup, but heavyweight tooling and steep learning curve. |
| **JSON Schema** | Describes shape, can't validate relationships or provenance. |
| **Word/Google Docs** | WYSIWYG convenience, zero semantic structure, no trust tracking. |
| **This model** | Typed structure + semantic validation + provenance + ergonomic construction. |

---

## Install

```bash
pnpm install vera-editor

# Optional: for runtime schema validation
pnpm install zod
```

**TypeScript config** (for subpath imports):
```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```

## Commands

```bash
# Development
pnpm dev              # Watch mode with tsx
pnpm build            # Compile TypeScript to dist/
pnpm type-check       # Type check without emit

# Testing
pnpm test             # Run tests once
pnpm test:watch       # Watch mode

# Code Quality
pnpm lint             # Check with Biome
pnpm lint:fix         # Auto-fix with Biome
pnpm validate:schema  # Validate types.ts ↔ zod.ts sync
```

## Pre-commit Hooks

This project uses lint-staged to run validation on commit. The hooks include:

1. **Biome check/format** - Linting and formatting for TypeScript/JSON files
2. **Schema validation** - Ensures `types.ts` and `zod.ts` stay in sync

### Schema Validation

The `pnpm validate:schema` script validates that:
- All definition kinds in `types.ts` have corresponding Zod schemas in `zod.ts`
- All schemas are included in the `DefSchema` discriminated union
- No orphan schemas exist without corresponding TypeScript interfaces

If you see validation errors like:
```
[missing_schema] Definition kind "theorem" in types.ts has no corresponding schema in zod.ts
```

This usually means:
1. You added a new definition kind to `types.ts` but not `zod.ts`
2. Biome reformatted the `z.enum()` pattern in a way the regex doesn't match

For multi-kind schemas like `TheoremDefSchema` (which handles `"theorem" | "lemma" | "corollary"`), ensure the `kind:` field uses `z.enum([...])` and Biome's formatting keeps `z` and `.enum()` close together:

```typescript
// ✅ Correct - z and .enum on same line or with only whitespace
kind: z.enum(["theorem", "lemma", "corollary"])

// ✅ Also correct - Biome's multiline formatting
kind: z
  .enum(["theorem", "lemma", "corollary"])
```

## Development Infrastructure

Local development services are managed via Docker Compose (ADR-135 through ADR-139).

**Key Design Decision (ADR-138):** Ports are **NOT** exposed to host by default. Services communicate via internal Docker network only. This prevents port conflicts when running multiple projects on the same machine.

### Quick Start

```bash
# Start services (internal network only - default)
docker compose up -d

# Check service health
docker compose ps

# View logs
docker compose logs -f postgres
docker compose logs -f redis

# Stop services
docker compose down

# Stop and remove volumes (fresh start)
docker compose down -v
```

### Services

| Service | Container | Internal Port | Purpose |
|---------|-----------|---------------|---------|
| PostgreSQL 16 | `vera-db` | 5432 | Primary database (ADR-050) |
| Redis 7 | `vera-cache` | 6379 | Caching layer (ADR-053) |

### Accessing Services

**From within Docker network** (default):
```bash
# App connects using container names as hostnames
DATABASE_URL="postgresql://vera:password@vera-db:5432/vera_dev"
REDIS_URL="redis://vera-cache:6379"
```

**From host machine** (optional—for DB tools, migrations, debugging):
```bash
# Use the host-ports override file
docker compose -f docker-compose.yml -f docker-compose.host-ports.yml up -d

# Then connect via localhost with non-default ports
DATABASE_URL="postgresql://vera:password@localhost:15432/vera_dev"
REDIS_URL="redis://localhost:16379"
```

**Why non-default ports?** Using 15432/16379 instead of 5432/6379 avoids conflicts with other projects running on the same dev machine.

### Environment Variables

Copy `.env.example` to `.env` and customize:

```bash
cp .env.example .env
```

| Variable | Default | Description |
|----------|---------|-------------|
| `POSTGRES_USER` | `vera` | Database user |
| `POSTGRES_PASSWORD` | `dev_password...` | Database password |
| `POSTGRES_DB` | `vera_dev` | Database name |
| `POSTGRES_HOST_PORT` | `15432` | Host port (only with override file) |
| `REDIS_HOST_PORT` | `16379` | Host port (only with override file) |
| `PORT` | `4000` | Application server port |
| `NODE_ENV` | `development` | Environment profile |

### Project Structure (ADR-009, ADR-135)

```
├── docker-compose.yml            # Base config (internal network only)
├── docker-compose.host-ports.yml # Override for host port exposure
├── docker-compose.dev-tools.yml  # Override for GUI dev tools + Traefik
├── docker/
│   ├── postgres/
│   │   └── init.sql              # Database initialization
│   └── pgadmin/
│       └── servers.json          # Auto-configured server list
├── .env.example                  # Environment template (committed)
├── .env                          # Local config (gitignored)
└── Dockerfile                    # Application container (if needed)
```

### Database Access Patterns

| Scenario | Command |
|----------|---------|
| Run psql inside container | `docker exec -it vera-db psql -U vera -d vera_dev` |
| Run redis-cli inside container | `docker exec -it vera-cache redis-cli` |
| GUI tools (pgAdmin, TablePlus) | Use dev-tools override (see below) |
| Prisma migrations from host | Use host-ports override, set `DATABASE_URL` to localhost |

### Development Tools (Optional)

GUI tools for database management, accessible via Traefik reverse proxy (single port):

```bash
# Start with dev tools
docker compose -f docker-compose.yml -f docker-compose.dev-tools.yml up -d

# Stop dev tools (keeps core services running)
docker compose -f docker-compose.yml -f docker-compose.dev-tools.yml down

# Combine: dev tools + host port access (for Prisma migrations from host)
docker compose -f docker-compose.yml \
  -f docker-compose.dev-tools.yml \
  -f docker-compose.host-ports.yml up -d
```

| Tool | URL | Purpose |
|------|-----|---------|
| Traefik Dashboard | http://localhost:8081 | Reverse proxy status |
| pgAdmin | http://localhost:8080/pgadmin | PostgreSQL GUI (auto-configured) |
| Redis Commander | http://localhost:8080/redis | Redis GUI |
| Mailhog | http://localhost:8080/mail | Email testing (SMTP on port 1025) |

**Why Traefik?** Single port (8080) routes to all tools via path prefixes. No port conflicts, no remembering multiple ports. Tools communicate internally via Docker network.

| Variable | Default | Description |
|----------|---------|-------------|
| `DEV_TOOLS_PORT` | `8080` | Traefik entry port |
| `TRAEFIK_DASHBOARD_PORT` | `8081` | Traefik dashboard |
| `PGADMIN_EMAIL` | `admin@vera-editor.local` | pgAdmin login |
| `PGADMIN_PASSWORD` | `admin` | pgAdmin password |

**pgAdmin auto-configuration:** The PostgreSQL server is pre-configured in pgAdmin via [docker/pgadmin/servers.json](docker/pgadmin/servers.json). Just log in and the connection is ready.

### Related ADRs

| ADR | Topic |
|-----|-------|
| ADR-135 | Docker File Organization |
| ADR-136 | Docker Compose Conventions |
| ADR-137 | Environment Profiles |
| ADR-138 | Port Allocation Strategy (internal-only by default) |
| ADR-139 | Container Networking |

## Quick Start

```typescript
import { DefFactory, doc, section, validate, stats, theorems, related } from "vera-editor";

const spec = doc("type-system", "A Simple Type System", "1.0.0")
  .desc("Formal specification of a typed lambda calculus")
  .section(
    section("sec-1", 0, "Syntax")
      .overview("Core syntactic forms")
      .def(DefFactory.grammar({
        id: "grammar-terms",
        position: 0,
        name: "Terms",
        sectionId: "sec-1",
        containerType: "section",
        description: "The term language",
        productions: [
          "e ::= x | λx:τ.e | e e",
          "τ ::= Base | τ → τ",
        ],
      }))
      .def(DefFactory.judgment({
        id: "judgment-typing",
        position: 1,
        name: "Typing Judgment",
        sectionId: "sec-1",
        containerType: "section",
        description: "The typing relation",
        form: "Γ ⊢ e : τ",
        reads: "In context Γ, term e has type τ",
      }))
      .build()
  )
  .section(
    section("sec-2", 1, "Metatheory")
      .def(DefFactory.theorem({
        id: "thm-soundness",
        position: 0,
        name: "Type Soundness",
        sectionId: "sec-2",
        containerType: "section",
        description: "Well-typed programs don't get stuck",
        premises: ["Γ ⊢ e : τ", "e →* v"],
        conclusion: "v is a value of type τ",
        category: "soundness",
        refs: ["#grammar-terms", "#judgment-typing"],
      }))
      .build()
  )
  .build();

// What you get:
const result = validate(spec);
// → Checks: all refs resolve, theorems have conclusions, no duplicate IDs

const s = stats(spec);
// → { definitions: 3, theorems: 1, byKind: { grammar: 1, judgment: 1, theorem: 1 } }

const thms = theorems(spec);
// → [TheoremDef] - typed array, not unknown[]

const firstThm = thms[0];
if (firstThm) {
  const deps = related(spec, firstThm);
  // → [GrammarDef, JudgmentDef] - the definitions this theorem references
}

// Render to multiple formats
import { toMarkdown, toHTML, toLatex } from "vera-editor/render";

const md = toMarkdown(spec);     // Result<string, RenderError>
const html = toHTML(spec, { standalone: true });
const latex = toLatex(spec);
```

## Core Design

### The Insight

A formal document is a graph of typed definitions with cross-references. Model it as such:

```
Doc
 └── Section[]
      └── Def[]  ←──refs──→  Def[]
           │
           ├── TypeDef      { kind: "type", components, constraints }
           ├── TheoremDef   { kind: "theorem", premises, conclusion }
           ├── GrammarDef   { kind: "grammar", productions }
           └── ...14 interfaces, 16 kind discriminants
```

### Compartmentalized JSON Structure

**Break down documents, papers, books, and chapters into modular section JSON files.** This is the recommended approach for organizing large specifications:

```
my-specification/
├── manifest.json           # Composition manifest
├── metadata.json           # Document metadata, authors, abstract
├── sections/
│   ├── 01-introduction.json
│   ├── 02-background.json
│   ├── 03-model.json
│   ├── 04-proofs.json
│   └── 05-conclusion.json
├── figures.json            # All figure definitions
├── tables.json             # All table definitions
└── references.json         # Bibliography
```

Each JSON file contains a partial document that gets assembled into the final `Doc`:

```json
// sections/03-model.json
{
  "id": "model-fragment",
  "title": "Core Model",
  "version": "1.0.0",
  "sections": [
    {
      "id": "sec-model",
      "position": 2,
      "title": "Core Model",
      "overview": "This section defines the core model...",
      "defs": [
        {
          "kind": "type",
          "id": "def-term",
          "position": 0,
          "name": "Term",
          "section": "sec-model",
          "description": "The term language"
        }
      ]
    }
  ]
}
```

**Benefits of compartmentalization:**
- **Version control**: Track changes per section, not per monolithic file
- **Parallel authoring**: Multiple authors can work on different sections
- **Selective composition**: Include only relevant sections in different outputs
- **Reuse**: Share common sections (e.g., foundations) across documents
- **Maintainability**: Smaller files are easier to review and validate

**Assembly pattern:**

```typescript
import { assembleManifest } from "vera-editor";

// Load compartmentalized sections
const sections = await Promise.all([
  loadJson("sections/01-introduction.json"),
  loadJson("sections/02-background.json"),
  loadJson("sections/03-model.json"),
]);

// Assemble into unified Doc
const doc: Doc = {
  id: metadata.id,
  title: metadata.title,
  version: metadata.version,
  sections: sections.flatMap(s => s.sections),
  meta: metadata.meta,
};

// Or use manifest-based assembly
const result = assembleManifest(manifest, {
  "sections/01-introduction.json": introDoc,
  "sections/02-background.json": bgDoc,
  // ...
});
```

See the `docs/examples/` directory for additional examples of VERA patterns, including format comparisons and forward references.

### Type Safety Through Discriminated Unions

Each definition kind is a distinct interface. The `Def` type is their union:

```typescript
type Def = TypeDef | EnumDef | TheoremDef | ... ;
```

This means:
- **Construction is guided**: `DefFactory.theorem({...})` requires `conclusion`
- **Narrowing is automatic**: `if (d.kind === "theorem") { d.conclusion }` just works
- **Invalid states are unrepresentable**: a theorem without a conclusion won't compile

### Generic Over Domain

```typescript
Doc<M, T>
//   │  └── T: Tier type ("motivation" | "logical" | "impl")
//   └───── M: Metadata shape ({ status: "draft" | "final" })
```

Same structural model, different vocabularies:
- **PL research**: types, judgments, inference rules, soundness theorems
- **Software architecture**: components, APIs, constraints, guarantees
- **Standards bodies**: requirements, conformance clauses, test assertions

### Validation: Structure + Semantics

**Zod** validates structure (is this JSON a valid Doc?).
**validate()** validates semantics (do all refs resolve? do theorems have conclusions?).

Use both:
```typescript
const doc = parseDoc(untrustedJson);  // Structure (Zod)
const result = validate(doc);          // Semantics (TS)
```

---

## Module Structure

```
docker/                          # Infrastructure configs (ADR-135)
├── postgres/
│   └── init.sql                 # Database initialization
src/
├── cli/
│   └── manifest.ts              # CLI entry point (Commander.js)
├── server/
│   ├── index.ts                 # Server entry point
│   └── persistence/             # Database repositories
│       ├── document-repository.ts
│       ├── manifest-repository.ts
│       ├── user-repository.ts
│       ├── folder-repository.ts
│       ├── collection-repository.ts
│       ├── association-repository.ts
│       ├── command-repository.ts
│       ├── workspace-repository.ts
│       ├── graphql-adapter.ts
│       ├── error-factory.ts         # Error construction utilities
│       ├── cached-document-repository.ts  # Caching wrapper
│       ├── in-memory-repository.ts  # In-memory implementation
│       └── types.ts                 # Repository type definitions
├── client/
│   ├── main.tsx                 # Vite entry point
│   ├── App.tsx                  # Root component with providers
│   ├── routes.tsx               # React Router configuration
│   └── pages/                   # Page components (17 pages)
│       ├── HomePage.tsx
│       ├── DocumentPage.tsx
│       ├── DocumentViewPage.tsx
│       ├── DefinitionPage.tsx
│       ├── EditorPage.tsx
│       ├── SearchPage.tsx
│       ├── GraphPage.tsx
│       ├── FoldersPage.tsx
│       ├── CollectionsPage.tsx
│       ├── ManifestsPage.tsx
│       ├── ManifestPage.tsx
│       ├── PluginsPage.tsx
│       ├── ElementsGuidePage.tsx
│       ├── DesignSystemsPage.tsx
│       ├── GuidePage.tsx
│       ├── SettingsPage.tsx
│       └── RouteErrorPage.tsx
└── shared/
    ├── document-model/
    │   ├── types.ts              # Pure types, zero dependencies
    │   ├── guards.ts             # Type guards & queries
    │   ├── builders.ts           # Factories & fluent builders
    │   ├── validate.ts           # Pure TS validation
    │   ├── stats.ts              # Statistics
    │   ├── manifest.ts           # Document composition engine
    │   ├── manifest-v2.ts        # Manifest v2 format with semantic naming
    │   ├── manifest-cli.ts       # Manifest API functions
    │   ├── manifest-validation.ts # Manifest schema validation
    │   ├── section-utils.ts      # Section manipulation utilities
    │   ├── mutations.ts          # Definition mutation helpers
    │   ├── query.ts              # Fluent query API
    │   ├── query-index.ts        # Indexed queries (O(1) performance)
    │   ├── ref-extraction.ts     # Cross-reference extraction
    │   ├── ref-graph.ts          # Dependency graph building
    │   ├── ref-index.ts          # Reference index for lookups
    │   ├── schema-validation.ts  # JSON schema validation
    │   ├── schema-metadata.ts    # Schema metadata extraction
    │   ├── def-migration.ts      # ContentBlock → Def migration
    │   ├── label-parser.ts       # Label parsing for metadata
    │   ├── def-id-generator.ts   # Slugified ID generation
    │   ├── export.ts             # Multi-format export coordination
    │   ├── generate-guide.ts     # Elements guide generation
    │   ├── zod.ts                # OPTIONAL: Zod schemas
    │   ├── index.ts              # Re-exports
    │   └── graphql/              # GraphQL API support
    │       ├── schema.ts         # GraphQL type definitions
    │       ├── resolvers.ts      # Query/mutation resolvers
    │       ├── server.ts         # graphql-yoga server
    │       └── index.ts          # GraphQL exports
    └── render/
        ├── types.ts          # Render error types, options, themes
        ├── ir.ts             # Intermediate representation nodes
        ├── traverser.ts      # Doc → RenderTree conversion
        ├── def-renderers/    # Per-kind definition renderers
        ├── adapters/         # Output format adapters
        │   ├── markdown.ts   # Markdown output
        │   ├── html.ts       # HTML output (ARIA accessible)
        │   └── latex.ts      # LaTeX output
        ├── themes/           # Theme configurations
        └── index.ts          # Public API
```

**Why this split?**
- `types.ts` can be used anywhere, even in constrained environments
- `zod.ts` is optional—don't pay for what you don't use
- Each module has a single responsibility
- `manifest.ts` enables version composition workflows
- `render/` provides a three-stage pipeline for multi-format output
- `graphql/` enables programmatic API access to document data

**Query & cross-reference system:**
- `query.ts` — Fluent API for filtering definitions by kind, tag, section
- `query-index.ts` — Pre-built indexes for O(1) query performance
- `ref-extraction.ts` — Extract refs from formula text
- `ref-graph.ts` — Build dependency graphs from definition refs
- `ref-index.ts` — Index for fast reference resolution

**Migration utilities** (for converting legacy formats):
- `schema-validation.ts` — Validate JSON structure against schema rules
- `def-migration.ts` — Convert `ContentBlock` entries to formal `Def` objects
- `label-parser.ts` — Extract metadata (number, name, type) from labels
- `def-id-generator.ts` — Generate slugified IDs by definition kind

## Type Reference

### Primitive Types

| Type | Values | Description |
|------|--------|-------------|
| `Severity` | `"error"` \| `"warning"` \| `"info"` | Issue severity level |
| `Cardinality` | `"finite"` \| `"countably_infinite"` \| `"uncountably_infinite"` | Set cardinality |
| `StandardTier` | `"motivation"` \| `"logical"` \| `"realization"` \| `"grounding"` | Specification layer |
| `TheoremCategory` | `"soundness"` \| `"completeness"` \| `"decidability"` \| `"preservation"` \| `"monotonicity"` \| `"termination"` | Theorem classification |
| `Ref` | `` `#${string}` `` | Cross-reference (must start with `#`) |
| `SemVer` | `` `${number}.${number}.${number}` `` | Semantic version string |
| `ReferenceType` | `"article"` \| `"book"` \| `"inproceedings"` \| `"incollection"` \| `"techreport"` \| `"phdthesis"` \| `"mastersthesis"` \| `"misc"` | BibTeX entry types |

### Provenance Types (Planned - PDR-002)

Content blocks support optional provenance tracking for trust, verification, and content classification.

| Type | Values | Description |
|------|--------|-------------|
| `ContentMode` | `"factual"` \| `"fiction"` \| `"historical-fiction"` \| `"speculative"` \| `"satirical"` \| `"reconstructed"` | Content classification |
| `ConfidenceLevel` | `"unverified"` \| `"low"` \| `"medium"` \| `"high"` \| `"verified"` | Trust level (verified requires refs) |
| `ContentSource` | `"human"` \| `"ai"` \| `"ocr"` \| `"automated"` \| `"imported"` \| `"mixed"` | Content origin |

| Type | Description | Key Fields |
|------|-------------|------------|
| `Provenance` | Content trust metadata | `mode?`, `confidence?`, `source?`, `verification?`, `history?` |
| `Verification` | Verification record | `by`, `at`, `method?`, `refs?`, `notes?` |
| `ProvenanceHistory` | Audit trail entry | `from`, `to`, `at`, `by?`, `reason?` |

**Validation rules**:
- `confidence: "verified"` + `mode: "factual"` requires `verification.refs[]`
- `confidence: "high"` requires `source`
- All `verification.refs` must resolve to valid definitions

### Definition Kinds (14 interfaces, 16 discriminants)

All definitions extend `DefBase` with common fields: `id`, `position`, `name`, `sectionId`, `containerType`, `description`, `refs?`, `examples?`, `tags?`

> **Note**: Display numbers (e.g., "1.1", "2.3") are computed from `position` in the hierarchy. See `section-number.ts`.

| Kind | Interface | Required Fields | Optional Fields |
|------|-----------|-----------------|-----------------|
| `type` | `TypeDef` | — | `syntax`, `components`, `constraints`, `params` |
| `enum` | `EnumDef` | `values` | `syntax`, `ordered` |
| `function` | `FnDef` | `signature` | `params`, `returns`, `complexity`, `total`, `equation`, `equations` |
| `predicate` | `PredDef` | `syntax` | `params` |
| `notation` | `NotationDef` | `symbol`, `expansion` | — |
| `theorem` | `TheoremDef` | `conclusion` | `statement`, `premises`, `proof`, `complexity`, `category`, `clauses` |
| `lemma` | `TheoremDef` | `conclusion` | (same as theorem) |
| `corollary` | `TheoremDef` | `conclusion` | (same as theorem) |
| `axiom` | `AxiomDef` | `statement` | — |
| `rule` | `RuleDef` | `premises`, `conclusion` | `label`, `sideconditions`, `where` |
| `grammar` | `GrammarDef` | `productions` | `start` |
| `judgment` | `JudgmentDef` | `form`, `reads` | — |
| `guarantee` | `GuaranteeDef` | `label`, `ensures` | `when`, `severity` |
| `reference` | `ReferenceDef` | `refType`, `authors`, `title`, `year` | `journal`, `volume`, `pages`, `publisher`, `booktitle`, `doi`, `url`, ... |
| `figure` | `FigureDef` | — | `page`, `figureType`, `components`, `subfigures` |
| `table` | `TableDef` | `columns`, `rows` | — |

### Document Structure Types

| Type | Description | Key Fields |
|------|-------------|------------|
| `Doc<M, T>` | Root document | `id`, `title`, `version`, `sections`, `foundations?`, `notations?`, `profiles?`, `extensions?`, `packs?`, `graph?`, `meta?` |
| `Section` | Document section | `id`, `position`, `title`, `overview?`, `defs`, `children?`, `content?`, `containerType?` |
| `Component` | Field definition | `symbol`, `name`, `type`, `description?`, `optional?` |
| `Notation` | Symbol definition | `symbol`, `meaning`, `example?` |
| `TheoremClause` | Multi-part theorem clause | `name`, `statement`, `proof?` |
| `Equation` | Mathematical equation | `id`, `latex`, `number?`, `where?` |
| `Author` | Rich author info | `name`, `affiliation?`, `email?`, `contribution?`, `orcid?` |
| `ContentBlock` | Section content | 25 block types (see below) |

### Content Block Types

Content blocks represent the rich content within sections. Blocks are grouped by purpose:

**Core Blocks**
| Block | Description | Key Fields |
|-------|-------------|------------|
| `ParagraphBlock` | Plain text paragraph | `text` |
| `ListBlock` | Ordered/unordered list | `items`, `ordered?` |
| `MathBlock` | LaTeX math display | `latex`, `display?` |
| `CodeBlock` | Code with syntax highlighting | `code`, `language?`, `caption?` |

**Reference Blocks**
| Block | Description | Key Fields |
|-------|-------------|------------|
| `FigureRefBlock` | Figure reference | `figureId`, `caption?` |
| `TableRefBlock` | Table reference | `tableId`, `caption?` |
| `CrossRefBlock` | Cross-reference link | `targetId`, `label?` |

**Structured Blocks**
| Block | Description | Key Fields |
|-------|-------------|------------|
| `DefinitionListBlock` | Term/definition pairs | `items: {term, definition}[]` |
| `ResultBlock` | Experimental results | `data`, `format?` |
| `TimelineBlock` | Chronological events | `events: {date, description}[]` |
| `StepsBlock` | Numbered procedure | `steps[]` |
| `CardGridBlock` | Card layout | `cards[]`, `columns?` |

**Interactive Blocks**
| Block | Description | Key Fields |
|-------|-------------|------------|
| `AdmonitionBlock` | Note/warning/tip callout | `kind`, `content`, `title?` |
| `CalloutBlock` | Highlighted content | `content`, `type?` |
| `AccordionBlock` | Collapsible sections | `sections: {title, content}[]` |
| `TabsBlock` | Tabbed content | `tabs: {label, content}[]` |

**Navigation Blocks**
| Block | Description | Key Fields |
|-------|-------------|------------|
| `TocBlock` | Table of contents | `depth?`, `scope?` |
| `IndexBlock` | Document index | `entries[]` |
| `EmbedBlock` | External content embed | `url`, `type?` |

**Creative Writing Blocks (PDR-001)**
| Block | Description | Key Fields |
|-------|-------------|------------|
| `BlockquoteBlock` | Quoted passage | `content`, `attribution?`, `style?` (default/epigraph/pullquote/citation) |
| `SceneBreakBlock` | Narrative separator | `style?` (asterisks/line/ornament/space), `symbol?` |
| `AsideBlock` | Marginalia/sidebar | `content`, `position?` (margin/sidebar/footnote/inline) |
| `DialogueBlock` | Speaker exchanges | `exchanges: {speaker, line, direction?}[]`, `format?` |
| `VerseBlock` | Poetry with structure | `lines[]` or `stanzas[]`, `attribution?`, `form?` |
| `LetterBlock` | Epistolary content | `salutation?`, `body`, `closing?`, `signature?`, `date?` |

> **Note**: Creative writing blocks enable literary and historical document modeling—novels, plays, correspondence, oral histories.

### Foundations Types

| Type | Description | Key Fields |
|------|-------------|------------|
| `Foundations` | Mathematical foundations | `primitives`, `constructors`, `conventions` |
| `Primitive` | Primitive type | `symbol`, `name`, `description`, `cardinality?`, `properties?` |
| `Constructor` | Type constructor | `symbol`, `name`, `syntax`, `description`, `params` |
| `Convention` | Naming convention | `symbols`, `represents`, `type?` |

### Domain Extension Types

| Type | Description | Key Fields |
|------|-------------|------------|
| `Profile<T>` | Specification profile | `id`, `name`, `layers`, `description?`, `depTypes?` |
| `Layer<T>` | Profile layer | `name`, `tier`, `types`, `question?`, `order?` |
| `Extension<T>` | Profile extension | `id`, `name`, `placement`, `types` |
| `Pack` | Constraint pack | `id`, `name`, `constraints`, `domain?`, `requires?` |
| `Constraint` | Single constraint | `id`, `name`, `category`, `severity`, `rule` |

### Graph Types

| Type | Description | Key Fields |
|------|-------------|------------|
| `Graph` | Dependency graph | `nodes`, `edges` |
| `Node` | Graph node | `id`, `label?`, `group?` |
| `Edge` | Graph edge | `from`, `to`, `label?`, `style?` |

### Manifest Types (Document Composition)

| Type | Description | Key Fields |
|------|-------------|------------|
| `Manifest` | Composition manifest | `id`, `title`, `version`, `include`, `merge?`, `provenance?` |
| `SourceRef` | Source reference | `source`, `version?`, `sections?`, `reason?`, `transform?` |
| `TransformOptions` | Section transforms | `renumber?`, `prefixIds?`, `prefixSections?` |
| `MergeStrategy` | Conflict resolution | `onDuplicateDefId?`, `onDuplicateSectionId?`, `notations?`, `validateRefs?` |
| `Provenance` | Version tracking | `basedOn?`, `changelog?`, `composedAt?` |
| `AssemblyResult` | Assembly output | `document`, `sources`, `warnings` |
| `RenumberOptions` | Renumbering options | `startFrom?`, `updateIds?`, `updateRefs?` |

### Result Types (ADR-021)

| Type | Description |
|------|-------------|
| `Result<T, E>` | Success or failure: `{ success: true, data: T }` \| `{ success: false, error: E }` |
| `ResultError` | Error object: `{ code: string, message: string }` |
| `ok(data)` | Create success result |
| `err(error)` | Create failure result |
| `isOk(result)` | Type guard for success |
| `isErr(result)` | Type guard for failure |

## API at a Glance

### Build
```typescript
doc(id, title, version).section(s).build()
section(id, num, title).def(d).build()
DefFactory.theorem({...})  DefFactory.type({...})  DefFactory.rule({...})
```

### Query
```typescript
allDefs(doc)              defById(doc, id)
defsByKind(doc, "type")   theorems(doc)
resolve(doc, ref)         related(doc, def)
defIndex(doc)             // Map for O(1) lookup
```

### Validate
```typescript
validate(doc)    // { valid, errors, warnings }
isValid(doc)     // boolean
errors(doc)      // just errors
```

### Stats
```typescript
stats(doc)       // { definitions, theorems, byKind, refs, brokenRefs }
```

### Render
```typescript
toMarkdown(doc)               // Result<string, RenderError>
toHTML(doc, { standalone })   // Result<string, RenderError>
toLatex(doc)                  // Result<string, RenderError>
```

### Transform
```typescript
renumberDocumentSequentially(doc, { startFrom: 1 })  // Renumber 1, 2, 3...
transformSection(section, { renumber: "A" })         // Per-section transform
```

---

## Document Composition (Manifests)

Compose documents from multiple sources—cherry-pick sections across versions:

### Manifest Structure

```json
{
  "$schema": "document-manifest/1.0",
  "id": "combined-spec",
  "title": "Combined Specification",
  "version": "3.0.0",
  "include": [
    "./v2/foundations.json",
    {
      "source": "./v1/appendix.json",
      "sections": ["sec-A1", "sec-A2"],
      "transform": { "renumber": "B" }
    }
  ],
  "merge": {
    "onDuplicateDefId": "error",
    "notations": "dedupe"
  }
}
```

### CLI Reference

| Command | Description | Arguments | Options |
|---------|-------------|-----------|---------|
| `init` | Create new manifest | — | `--id` (req), `--title` (req), `-v/--doc-version` (req), `--description`, `--namespace`, `--authors`, `--license`, `-o/--output` |
| `add-source` | Add source document | `<manifest>` `<source>` | `--source-version`, `--reason` |
| `remove-source` | Remove source document | `<manifest>` `<source>` | — |
| `add-section` | Add section to source | `<manifest>` `<source>` `<section>` | — |
| `remove-section` | Remove section from source | `<manifest>` `<source>` `<section>` | — |
| `set-transform` | Set transform options | `<manifest>` `<source>` | `--renumber`, `--prefix-ids`, `--prefix-sections`, `--replace` |
| `show` | Display manifest | `<manifest>` | `--json` |
| `list-sources` | List all sources | `<manifest>` | — |
| `validate` | Validate manifest structure | `<manifest>` | `--strict`, `--json` |
| `assemble` | Assemble manifest into document | `<manifest>` | `-o/--output` |
| `render` | Render document to formats | `<document>` | `-f/--format` (md,html,latex), `-o/--output-dir`, `--renumber`, `--from-manifest` |
| `renumber` | Renumber sections sequentially | `<document>` | `-o/--output`, `--start`, `--update-ids` |
| `migrate-manifest` | Migrate manifest to v2 format | `<manifest>` | — |
| `graph` | Generate dependency graph | `<document>` | `--output`, `--stats` |
| `query` | Query definitions | `<document>` | `--kind`, `--format` |

### CLI Examples (`vera-cli`)

**Creating and Modifying Manifests**

```bash
# Create a new manifest from scratch
pnpm vera-cli init \
  --id my-spec \
  --title "My Specification" \
  -v 1.0.0 \
  --description "A typed specification document" \
  --authors "Alice, Bob" \
  --license "MIT" \
  -o my-spec/manifest.json

# Add source documents
pnpm vera-cli add-source my-spec/manifest.json ./sections/intro.json
pnpm vera-cli add-source my-spec/manifest.json ./sections/model.json \
  --source-version 2.0.0 \
  --reason "Core model definitions"

# Select specific sections from a source
pnpm vera-cli add-section my-spec/manifest.json ./sections/model.json sec-2
pnpm vera-cli add-section my-spec/manifest.json ./sections/model.json sec-3

# Transform sections (renumber, prefix IDs)
pnpm vera-cli set-transform my-spec/manifest.json ./sections/appendix.json \
  --renumber A \
  --prefix-ids "appendix-" \
  --prefix-sections "app-"

# Remove sources or sections
pnpm vera-cli remove-section my-spec/manifest.json ./sections/model.json sec-3
pnpm vera-cli remove-source my-spec/manifest.json ./sections/deprecated.json
```

**Document Transformation**

```bash
# Renumber sections sequentially (15, 13, 21 → 1, 2, 3)
pnpm vera-cli renumber docs/examples/stratum-v2.4/stratum-assembled.json \
  -o stratum-renumbered.json

# Start numbering from a specific section
pnpm vera-cli renumber document.json --start 10 -o output.json

# Update section IDs to match new numbers (sec-15 → sec-1)
pnpm vera-cli renumber document.json --update-ids -o output.json
```

### Programmatic API

```typescript
import { 
  assembleManifest, 
  selectSections, 
  transformSection,
  renumberDocumentSequentially 
} from "vera-editor";

// Load sources and assemble
const result = assembleManifest(manifest, { "./v1/core.json": coreDoc });

if (result.success) {
  const { document, warnings } = result.data;
  // document is the composed Doc
}

// Renumber sections sequentially (e.g., 15, 13, 21 → 1, 2, 3)
const renumberedDoc = renumberDocumentSequentially(doc, {
  startFrom: 1,       // Start from section 1 (default)
  updateIds: true,    // Update section IDs to match (sec-15 → sec-1)
  updateRefs: true,   // Update internal cross-references
});
```

### Merge Strategies

| Strategy | Options | Default |
|----------|---------|---------|
| Duplicate Def ID | `error`, `warn`, `rename`, `prefer-latest` | `error` |
| Duplicate Section ID | `error`, `warn`, `rename` | `error` |
| Notations | `dedupe`, `append`, `error` | `dedupe` |

---

## Validation Codes

```typescript
Codes.DUPLICATE_DEF_ID     // Same ID used twice
Codes.DUPLICATE_SECTION_ID // Same section ID
Codes.INVALID_REF_FORMAT   // Ref doesn't start with #
Codes.BROKEN_REF           // Ref target doesn't exist
Codes.MISSING_CONCLUSION   // Theorem without conclusion
Codes.EMPTY_ENUM           // Enum with no values
Codes.INVALID_VERSION      // Not semver format
Codes.MISSING_TITLE        // Document has no title
Codes.EMPTY_SECTION        // Section with no content (warning)
```

---

## Render Pipeline

Convert documents to Markdown, HTML, or LaTeX using a three-stage pipeline:

1. **Traverser**: `Doc` → `RenderTree` (format-agnostic IR)
2. **DefRenderers**: Handle each definition kind → `DefinitionNode`
3. **FormatAdapters**: `RenderTree` → Markdown / HTML / LaTeX

### Quick Usage

```typescript
import { toMarkdown, toHTML, toLatex } from "vera-editor/render";

// All functions return Result<string, RenderError> per ADR-021
const mdResult = toMarkdown(doc);
if (mdResult.success) {
  console.log(mdResult.data);  // Markdown string
}

const htmlResult = toHTML(doc, { standalone: true });
const latexResult = toLatex(doc);
```

### Render Options

```typescript
interface TraverseOptions {
  includeProofs?: boolean;    // Include proof callouts (default: true)
  includeExamples?: boolean;  // Include example callouts (default: true)
  includeTags?: boolean;      // Include definition tags (default: true)
}

// HTML-specific options
interface HTMLOptions {
  standalone?: boolean;       // Include <!DOCTYPE> and <html> wrapper
  includeStyles?: boolean;    // Embed CSS in <style> tag
}
```

### Intermediate Representation (IR)

The IR decouples document structure from output format:

| Node Type | Description |
|-----------|-------------|
| `DocumentNode` | Root node with title, version, metadata |
| `SectionNode` | Hierarchical section with level |
| `DefinitionNode` | Any definition kind with children |
| `ParagraphNode` | Text content with inline nodes |
| `ListNode` | Ordered or unordered list |
| `TableNode` | Table with headers and rows |
| `MathNode` | Block or inline LaTeX math |
| `CodeNode` | Code block with language |
| `CalloutNode` | Proof, example, note, warning |
| `FigureNode` | Figure with caption |
| `RefLinkNode` | Cross-reference link |

### Custom Rendering

```typescript
import { toRenderTree, markdownAdapter, createHTMLAdapter } from "vera-editor/render";

// Step 1: Convert to IR
const treeResult = toRenderTree(doc, { includeProofs: false });
if (!treeResult.success) return;

// Step 2: Render with adapter
const md = markdownAdapter.render(treeResult.data);
const html = createHTMLAdapter({ standalone: true }).render(treeResult.data);
```

### Themes

Customize labels, icons, and callout styles:

```typescript
import { toHTML } from "vera-editor/render";
import type { Theme } from "vera-editor/render";

const myTheme: Theme = {
  name: "academic",
  classPrefix: "ts",
  kindLabels: {
    theorem: "Theorem",
    lemma: "Lemma",
    function: "Definition",
  },
  kindIcons: {
    theorem: "📐",
    axiom: "⚡",
  },
};

const result = toHTML(doc, {}, myTheme);
```

### Accessibility (ADR-104)

HTML output includes ARIA attributes:
- `role="article"` on definitions
- `aria-labelledby` linking to headings
- Alt text support for math blocks

---

## GraphQL API

Access document data programmatically via GraphQL using the built-in `graphql-yoga` server:

### Quick Start

```typescript
import { createServer } from "vera-editor/graphql";

const server = createServer({
  documents: [myDoc],  // Pre-load documents
  port: 4000,
});

await server.start();
// GraphQL playground at http://localhost:4000/graphql
```

### Schema Overview

**Queries:**
```graphql
type Query {
  documents: [Doc!]!
  document(id: ID!): Doc
  definitions(docId: ID!, kind: DefKind): [Def!]!
  definition(docId: ID!, defId: ID!): Def
  sections(docId: ID!): [Section!]!
  search(docId: ID!, query: String!): [Def!]!
}
```

**Mutations:**
```graphql
type Mutation {
  createDefinition(docId: ID!, input: DefInput!): Def!
  updateDefinition(docId: ID!, defId: ID!, input: DefInput!): Def!
  deleteDefinition(docId: ID!, defId: ID!): Boolean!
}
```

### Custom Scalars

| Scalar | Description |
|--------|-------------|
| `JSON` | Arbitrary JSON values |
| `DateTime` | ISO 8601 date-time string |
| `SemVer` | Semantic version (e.g., `"1.0.0"`) |

### Example Queries

```graphql
# Get all theorems without proofs
query UnprovenTheorems($docId: ID!) {
  definitions(docId: $docId, kind: THEOREM) {
    ... on TheoremDef {
      id
      name
      conclusion
      proof
    }
  }
}

# Search definitions by name
query Search($docId: ID!) {
  search(docId: $docId, query: "soundness") {
    id
    kind
    name
    description
  }
}
```

---

## Extending

To add a definition kind (e.g., `simulation`):

1. **Interface** (`types.ts`): `interface SimDef extends DefBase { kind: "simulation"; script: string; }`
2. **Guard** (`guards.ts`): `isSimDef = (d): d is SimDef => d.kind === "simulation"`
3. **Factory** (`builders.ts`): `DefFactory.sim = (d) => ({ ...d, kind: "simulation" })`
4. **Export** (`index.ts`): `export { SimDef, isSimDef }`
5. **Schema** (`zod.ts`): Add to discriminated union (optional)

## Compatibility

| Requirement | Version |
|-------------|---------|
| Node.js | 20+ (LTS) |
| TypeScript | 5.6+ |
| Zod | 3.23+ (optional) |

**Bundle**: ~8KB core, +12KB with Zod

## Performance

`allDefs()` traverses on each call. For repeated lookups:

```typescript
const index = defIndex(doc);  // Build once: O(n)
index.get("def-1");           // Lookup: O(1)
```

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `zod` | ^3.23.0 | Runtime schema validation (optional peer) |
| `commander` | ^14.0.2 | CLI framework |
| `graphql` | ^16.9.0 | GraphQL core library |
| `graphql-yoga` | ^5.10.4 | GraphQL server |
| `@prisma/client` | ^5.22.0 | Database ORM (optional) |
| `tempy` | ^3.1.0 | Temporary file handling |

**Path Aliases** (tsconfig.json):
```typescript
import { ... } from "vera-editor/*"  // → ./src/shared/*
```

---

## The Bet

This model bets that:

1. **Structure is worth the investment**. The upfront cost of typed definitions pays off in validation, tooling, and maintainability—whether you're writing theorems or novels.

2. **TypeScript is sufficient**. You don't need Coq or Agda for structural guarantees. Discriminated unions + runtime validation gets you 90% of the value at 10% of the complexity.

3. **One model can serve many domains**. PL theory, software architecture, literary manuscripts, and historical archives share more structure than vocabulary. Sections, references, content blocks, and provenance are universal.

4. **Trust belongs in the data model**. In an age of AI-generated content, provenance isn't a nice-to-have—it's essential. Readers deserve to know what's verified, what's reconstructed, and what's invented. Documents that track trust are documents worth trusting.

5. **Literary and technical documents share DNA**. A play has scenes, dialogue, and stage directions. A specification has sections, theorems, and proofs. Both need cross-references, validation, and multi-format export. The same typed foundation serves both.

If you believe text documents are fine, this isn't for you. If you've ever lost hours to a broken cross-reference in a 50-page spec—or wondered whether that historical quote was real or dramatized—welcome.

## License

MIT