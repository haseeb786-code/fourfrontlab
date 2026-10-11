# Four Front Lab — Premium Digital Agency Platform

A complete, production-grade digital solutions agency website, 3D interactive portfolio, lead-generation CRM, and authenticated Admin CMS built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Three.js**, and **Prisma ORM**.

---

## 🌟 Key Features

### 1. High-Impact Public Agency Experience
* **Brand Identity & Aesthetic**: Modern dark theme canvas (`#080A10`), crisp typography, electric cyan/lime accents directly derived from the official Four Front Lab geometric circuit emblem.
* **Interactive 3D Hero (`Hero3D.tsx`)**: Procedural 3D geometric brand emblem with glowing circuit node vertices, orbital cursor physics, and touch gesture support for mobile.
* **Homepage Flow**:
  1. *Hero* with dual conversion CTAs ("Start a Project" & "Explore Our Work").
  2. *Services Grid* linking to deep-dive service pages.
  3. *Business Problems We Solve* (comparing operational bottlenecks with high-leverage digital solutions).
  4. *6-Step Delivery Workflow* (Discovery, Planning, Prototyping, Development, QA, Launch).
  5. *Featured Case Studies* with metric highlights.
  6. *Client Testimonials & Trust Metrics*.
  7. *Multi-Tier Project Inquiry Form*.

### 2. Dedicated Service Detail Pages (`/services/[slug]`)
* **Website Development**: High-performance web applications, 3D/WebGL experiences, headless architecture.
* **Business Automation**: ERP/CRM bridges, document OCR extraction, webhook workers.
* **AI Solutions & Integrations**: Domain-specific LLM copilots, private RAG pipelines, multimodal assistants.
* **Digital Marketing & Growth**: Programmatic SEO, high-intent landing funnels, multi-touch attribution.
* **Custom Business Solutions**: Bespoke enterprise dashboards, RBAC portals, and client hubs ("Describe Your Challenge").

### 3. Dynamic Portfolio & Case Study Engine (`/portfolio`, `/portfolio/[slug]`)
* Configurable categories with real-time filtering (Websites, Web Apps, AI Solutions, Automation, E-Commerce).
* Comprehensive case-study narratives: Problem statement, engineered solution, tech stack chips, verified business results/metrics, responsive media galleries, video embeds, and live website demo URLs.
* Draft vs. Published visibility toggle (drafts hidden from public visitors).

### 4. Authenticated Admin Dashboard & CMS (`/admin`)
* **Edge Route Protection**: Intercepted by `middleware.ts` with `jose` JWT authentication. Unauthenticated requests are redirected with status `307` to `/admin/login`.
* **Dashboard Overview (`/admin`)**: Real-time business metrics (total projects, draft count, active services, unread inquiries, system health).
* **Portfolio Manager (`/admin/portfolio`)**: Full CRUD for projects, custom category manager, draft/publish toggles, display order adjustments, and gallery management.
* **Inquiry Lead CRM (`/admin/inquiries`)**: Lead inbox with status progression (*New → Contacted → Qualified → Converted → Closed*), priority tagging, internal notes, and instant **CSV Export**.
* **Media Library (`/admin/media`)**: Multi-file uploader with strict MIME validation (`JPEG, PNG, WebP, SVG, GIF`), 10MB limits, disk file cleanup on record deletion, and reusable asset URLs.
* **Services Manager (`/admin/services`)**: Edit service descriptions, deliverables, and FAQs.
* **Testimonials Manager (`/admin/testimonials`)**: Manage client reviews, ratings, and quotes.
* **Site Settings (`/admin/settings`)**: Configurable WhatsApp number, contact email, office address, and social links.

### 5. Lead Generation & WhatsApp Bridge
* Fully validated client inquiry form with email regex, length boundaries, and spam mitigation.
* Floating WhatsApp click-to-chat button with pre-filled message templates that dynamically pull the agency's WhatsApp number from `SiteSetting`.

---

## 🛠️ Tech Stack & Architecture

* **Framework**: Next.js 14.2 (App Router, Server Components & Dynamic Route Handlers)
* **Language**: TypeScript 5.6
* **Styling**: Tailwind CSS + PostCSS
* **3D & Graphics**: Three.js (Procedural geometries, mesh points, dynamic canvas sizing)
* **Icons**: Lucide React
* **Database & ORM**: SQLite + Prisma ORM (configured in `prisma/schema.prisma` for zero-friction local persistence; seamlessly migrates to PostgreSQL / Supabase)
* **Auth**: Stateless HTTP-only JWT sessions (`jose` + `bcryptjs`)
* **Testing**: Comprehensive 49-point E2E assertion suite (`scripts/verify-e2e.js`)

---

## 🚀 Getting Started

### Prerequisites
* Node.js v18+ (tested on Node v24)
* npm or pnpm

### 1. Installation
```bash
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env
```

### 3. Database Migration & Seeding
Initialize the SQLite database and seed initial agency case studies, services, testimonials, and default admin credentials:
```bash
npx prisma db push
npm run db:seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Default Admin Credentials

* **Login URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
* **Email**: `admin@fourfrontlab.com`
* **Password**: `admin123456`

*(You can update this password or add additional admin users directly in the database or via the admin settings).*

---

## 🧪 Verification & Testing

To execute the automated 49-assertion End-to-End verification suite:

1. Build and start the production server:
   ```bash
   npm run build
   npx next start -p 3000
   ```
2. In a separate terminal, run:
   ```bash
   node scripts/verify-e2e.js
   ```

The suite tests:
1. Public pages (Homepage, Services index, Service slugs, Portfolio index, Case studies, Contact, `robots.txt`, `sitemap.xml`).
2. Server-enforced Edge authentication guards and 307 redirects.
3. Lead ingestion validation boundaries (empty payloads, malformed emails).
4. Admin authentication, session cookies, and `/api/auth/me`.
5. CRM status workflows and CSV export generation.
6. Category creation, project drafts, public filtering, and deletion.
7. Media upload security (malicious file rejection, PNG upload, disk cleanup).
8. Site settings and WhatsApp phone number synchronization.
9. Session logout and unauthorized access rejection.

---

## 🌐 Deploying to Production (Vercel / Cloud)

1. Set the following environment variables on your hosting provider:
   * `DATABASE_URL`: Your PostgreSQL / Supabase connection string (e.g., `postgresql://user:pass@host:5432/db`).
   * `JWT_SECRET`: A strong, random 32+ character string.
   * `NODE_ENV`: `production`
2. If using PostgreSQL, update `datasource db` in `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Run `npx prisma db push` and `node prisma/seed.js` against your production database.
4. Deploy the Next.js application.
