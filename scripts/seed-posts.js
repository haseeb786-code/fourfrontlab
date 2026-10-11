const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seedPosts() {
  console.log('Seeding initial agency Insights & Blog posts...')

  const posts = [
    {
      title: 'Engineering Sub-Second 3D WebGL Experiences with Next.js 14',
      slug: 'sub-second-3d-webgl-nextjs',
      excerpt: 'How we engineer 60fps Three.js brand flagships that achieve 99+ Core Web Vitals and load in under 800ms on mobile devices.',
      content: `### The Myth of Heavy 3D Web Applications

For years, digital agencies made a fatal trade-off: immersive 3D experiences at the expense of mobile load speed, SEO rankings, and conversion rates. Heavy GLTF models, blocking shader compilations, and unoptimized rendering loops consistently ruined Core Web Vitals.

At Four Front Lab, we take a different architectural approach.

### 1. Procedural Geometries Over Monolithic 3D Models
Rather than loading 15MB 3D meshes over the wire, we engineer procedural meshes directly on the client canvas using custom GLSL shaders and parameterized geometry. The total network payload for our 3D hero is under 40 kilobytes—smaller than a standard JPEG thumbnail.

### 2. Offscreen Canvas & Dynamic Resolution Scaling
On high-DPI retina displays, rendering full-resolution framebuffers at 60fps causes severe thermal throttling on mobile GPUs. By dynamically clamping device pixel ratio to 1.5 and utilizing WebGL offscreen contexts, we eliminate frame drops completely.

### 3. Graceful Degradation for Low-Power Devices
Using modern hardware detection hooks, we monitor initial WebGL context creation. If a user device exhibits memory constraints or requests \`prefers-reduced-motion\`, the engine instantaneously swaps to an optimized SVG vector representation with zero layout shift.

### Conclusion
3D is no longer a gimmick—when engineered correctly, it elevates brand authority, increases session dwell time by 4x, and drives qualified inbound inquiries.`,
      coverImage: '/images/portfolio-veloce.jpg',
      category: 'Engineering',
      author: 'Four Front Lab Engineering',
      readTime: '6 min read',
      featured: true,
      published: true,
    },
    {
      title: 'Why Most Enterprise AI Projects Fail (And How to Fix Them)',
      slug: 'why-enterprise-ai-fails',
      excerpt: 'Moving past prototype demos: how domain-specific RAG architectures, strict privacy guardrails, and deterministic tool execution create real business leverage.',
      content: `### The Proof-of-Concept Trap
Over 80% of corporate AI initiatives stall after the initial proof of concept. The reason is simple: generic chat wrappers lack domain grounding, hallucinate under edge cases, and fail to interact reliably with mission-critical ERP and SQL backends.

### 1. The RAG Hierarchy
A naive vector database retrieval strategy fails when querying structured financial figures or time-sensitive tabular documents. High-leverage enterprise AI requires hybrid retrieval:
- BM25 lexical keyword matching for exact nomenclature.
- Dense embedding similarity for conceptual alignment.
- Deterministic SQL TVF execution for authoritative numeric aggregation.

### 2. Tool Calling with Deterministic Guardrails
An LLM should never directly mutate production state. Instead, we implement dual-phase verification: the model synthesizes candidate intent, which is validated by a strongly-typed Zod schema, followed by human-in-the-loop escalation rules for transactions exceeding predefined thresholds.

### 3. Absolute Enterprise Data Isolation
Enterprise sovereignty requires zero-data-retention APIs and self-hosted vector infrastructure. Your proprietary contract clauses and trade secrets must never train public baseline models.

### Key Takeaway
AI produces immense value only when embedded into existing operational workflows with rigid validation, deterministic fallbacks, and human oversight.`,
      coverImage: '/images/portfolio-aetheris.jpg',
      category: 'AI & Automation',
      author: 'Marcus Vance, CTO',
      readTime: '8 min read',
      featured: true,
      published: true,
    },
    {
      title: 'Self-Healing Automation: Replacing Brittle Webhooks with Event-Driven Queues',
      slug: 'self-healing-automation-queues',
      excerpt: 'Why standard Zapier and simple webhook scripts fail at scale, and how to build fault-tolerant event pipelines with idempotent workers.',
      content: `### The Hidden Cost of Manual Data Entry
When companies scale past 50 employees, operational drag explodes. Back-office teams spend thousands of hours reconciling freight invoices, re-keying lead details, and synchronizing billing tools.

### The Problem with Simple Webhooks
Standard webhooks have a critical flaw: if the receiver experiences 15 seconds of downtime or rate limits, the payload is permanently lost. Silent data loss in financial or logistics pipelines results in costly operational errors.

### The Solution: Event-Driven Asynchronous Queues
We design self-healing architectures utilizing:
1. **Exponential Backoff Retries:** Failed deliveries automatically retry with jittered intervals.
2. **Idempotency Keys:** Every event carries a unique hash to prevent duplicate billing or orders.
3. **Dead-Letter Queues (DLQ):** Unresolvable payloads trigger instant engineering alerts with full payload replay capabilities.

### Measurable Results
Deploying event-driven pipelines regularly eliminates 1,000+ hours of manual labor per month while cutting clerical error rates to 0.04%.`,
      coverImage: '/images/portfolio-omniflow.jpg',
      category: 'Architecture',
      author: 'Four Front Lab Systems Group',
      readTime: '5 min read',
      featured: false,
      published: true,
    },
  ]

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    })
    console.log('✓ Upserted post:', post.title)
  }

  console.log('Finished seeding Insights & Blog posts!')
}

seedPosts()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
