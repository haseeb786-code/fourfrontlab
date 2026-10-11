const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database for Four Front Lab...')

  // 1. Clean existing records
  await prisma.inquiry.deleteMany({})
  await prisma.testimonial.deleteMany({})
  await prisma.project.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.service.deleteMany({})
  await prisma.mediaAsset.deleteMany({})
  await prisma.siteSetting.deleteMany({})
  await prisma.adminUser.deleteMany({})

  // 2. Admin User
  const passwordHash = await bcrypt.hash('admin123456', 10)
  const admin = await prisma.adminUser.create({
    data: {
      email: 'admin@fourfrontlab.com',
      passwordHash,
      name: 'Director of Technology',
      role: 'superadmin',
    },
  })
  console.log('Created admin user:', admin.email)

  // 3. Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Websites & Digital Experiences',
        slug: 'websites',
        description: 'High-impact 3D, WebGL, and Next.js brand flagships with sub-second performance.',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Web Applications & SaaS',
        slug: 'web-apps',
        description: 'Complex portals, real-time dashboards, and full-stack software products.',
      },
    }),
    prisma.category.create({
      data: {
        name: 'AI & Intelligent Systems',
        slug: 'ai-solutions',
        description: 'Domain-specific LLM copilots, RAG architectures, and predictive machine learning models.',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Business Automation',
        slug: 'automation',
        description: 'Self-healing workflow pipelines, ERP/CRM bridges, and automated document processing.',
      },
    }),
    prisma.category.create({
      data: {
        name: 'E-Commerce & Growth Engines',
        slug: 'ecommerce',
        description: 'Headless commerce storefronts, edge-rendered checkouts, and custom conversion funnels.',
      },
    }),
  ])
  const catMap = Object.fromEntries(categories.map((c) => [c.slug, c.id]))

  // 4. Projects (Rich Case Studies)
  await prisma.project.create({
    data: {
      title: 'Aetheris AI - Autonomous Financial Intelligence',
      slug: 'aetheris-ai',
      client: 'Aetheris Capital Group',
      industry: 'Fintech & Asset Management',
      overview: 'An enterprise intelligence platform ingesting real-time SEC filings and market telemetry to generate predictive macro-risk models and automated portfolio rebalancing briefs.',
      problem: 'Investment analysts spent 14+ manual hours compiling risk dossiers across Bloomberg terminals, PDF reports, and spreadsheets, delaying time-critical trading decisions.',
      solution: 'Engineered a real-time reactive Next.js 14 mission control connected to Python vector microservices. Analysts query complex filings using natural language with zero-latency streaming responses.',
      techStack: JSON.stringify(['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Python', 'FastAPI', 'Claude 3.5 Sonnet', 'pgvector', 'Three.js']),
      results: JSON.stringify({
        'Turnaround Time': '78% faster brief generation',
        'Model Accuracy': '99.4% entity extraction precision',
        'Annual Savings': '$1.4M saved in research labor',
      }),
      coverImage: '/images/portfolio-aetheris.jpg',
      gallery: JSON.stringify([
        '/images/portfolio-aetheris.jpg',
        '/images/portfolio-aetheris-dashboard.jpg',
      ]),
      liveUrl: 'https://aetheris-demo.fourfrontlab.com',
      videoUrl: 'https://vimeo.com/placeholder',
      featured: true,
      order: 1,
      categoryId: catMap['ai-solutions'],
    },
  })

  await prisma.project.create({
    data: {
      title: 'Veloce Motors - 3D Luxury Hypercar Configurator',
      slug: 'veloce-motors',
      client: 'Veloce Bespoke Automotive',
      industry: 'Luxury Automotive & Retail',
      overview: 'Immersive WebGL digital showroom allowing ultra-high-net-worth clients to customize bespoke hypercars in real time with dynamic lighting, paint reflection shaders, and concierge booking.',
      problem: 'Static brochure websites suffered high bounce rates and could not convey the tactile precision of bespoke carbon fiber options, causing low private-viewing bookings.',
      solution: 'Constructed a 60fps WebGL / Three.js 3D configurator featuring procedural material shaders, realistic audio feedback, and instant VIP WhatsApp concierge reservations.',
      techStack: JSON.stringify(['Three.js', 'React Three Fiber', 'Next.js 14', 'GLSL Shaders', 'Tailwind CSS', 'Web Audio API', 'Stripe']),
      results: JSON.stringify({
        'Test Drive Inquiries': '+320% qualified bookings',
        'Average Dwell Time': '4.2x increase in session length',
        'Industry Recognition': 'Awwwards Site of the Day Nominee',
      }),
      coverImage: '/images/portfolio-veloce.jpg',
      gallery: JSON.stringify(['/images/portfolio-veloce.jpg']),
      liveUrl: 'https://veloce.fourfrontlab.com',
      featured: true,
      order: 2,
      categoryId: catMap['websites'],
    },
  })

  await prisma.project.create({
    data: {
      title: 'OmniFlow - Autonomous Supply Chain Orchestration',
      slug: 'omniflow-automation',
      client: 'OmniLogistics Global',
      industry: 'Freight & Supply Chain',
      overview: 'Automated dispatching, customs clearance OCR parsing, carrier invoice reconciliation, and proactive exception handling across 12 countries.',
      problem: 'Fragmented legacy ERP systems forced 25 back-office operators to manually re-key manifests, producing costly 4.2% error rates and shipping delays.',
      solution: 'Designed an event-driven automation engine with OCR document processors, self-healing webhook queues, and an executive telemetry dashboard.',
      techStack: JSON.stringify(['Next.js', 'TypeScript', 'Prisma', 'BullMQ', 'Redis', 'Python OCR', 'WhatsApp Business API']),
      results: JSON.stringify({
        'Hours Saved': '1,200 hours / month eliminated',
        'Error Reduction': 'Clerical errors cut to 0.04%',
        'Break-Even': 'Full ROI achieved in 47 days',
      }),
      coverImage: '/images/portfolio-omniflow.jpg',
      gallery: JSON.stringify(['/images/portfolio-omniflow.jpg']),
      liveUrl: 'https://omniflow.fourfrontlab.com',
      featured: true,
      order: 3,
      categoryId: catMap['automation'],
    },
  })

  await prisma.project.create({
    data: {
      title: 'Kura Health - Intelligent Telehealth & Clinician Hub',
      slug: 'kura-health',
      client: 'Kura Health Systems',
      industry: 'Healthcare & Medtech',
      overview: 'HIPAA-grade telemedicine web application combining encrypted video consultations with AI clinician note transcription and instant prescription dispatch.',
      problem: 'Clinicians were overwhelmed with administrative charting, spending up to two hours after clinic hours filling EHR records.',
      solution: 'Built an elegant Next.js patient/clinician platform featuring automated speech-to-structured-SOAP-notes and automated pharmacy integration.',
      techStack: JSON.stringify(['Next.js 14', 'TypeScript', 'WebRTC', 'OpenAI Whisper', 'Prisma', 'Tailwind CSS', 'PostgreSQL']),
      results: JSON.stringify({
        'Admin Reduction': '-65% clinician charting time',
        'Clinician NPS': '88 Net Promoter Score',
        'Consultations': '120,000+ completed visits',
      }),
      coverImage: '/images/portfolio-kura.jpg',
      gallery: JSON.stringify(['/images/portfolio-kura.jpg']),
      liveUrl: 'https://kurahealth.fourfrontlab.com',
      featured: true,
      order: 4,
      categoryId: catMap['web-apps'],
    },
  })

  await prisma.project.create({
    data: {
      title: 'Novus Atelier - Headless Luxury Commerce Flagship',
      slug: 'novus-atelier',
      client: 'Novus Atelier Paris',
      industry: 'High Fashion & Luxury Retail',
      overview: 'Sub-second headless e-commerce experience with multi-currency localized checkouts, predictive search, and personalized VIP styling.',
      problem: 'Legacy monolithic storefront had 4.8s mobile load times, causing 64% cart abandonment among European and Asian shoppers.',
      solution: 'Re-architected on Next.js edge runtime with instant Algolia search, custom cart state management, and automated VIP SMS/WhatsApp retargeting.',
      techStack: JSON.stringify(['Next.js 14', 'Shopify Storefront API', 'Tailwind CSS', 'Algolia', 'Cloudflare Edge', 'Framer Motion']),
      results: JSON.stringify({
        'Mobile Speed': '0.7s Largest Contentful Paint',
        'Global Revenue': '+185% YoY international sales',
        'Cart Recovery': '42% decrease in abandoned checkouts',
      }),
      coverImage: '/images/portfolio-novus.jpg',
      gallery: JSON.stringify(['/images/portfolio-novus.jpg']),
      liveUrl: 'https://novusatelier.fourfrontlab.com',
      featured: true,
      order: 5,
      categoryId: catMap['ecommerce'],
    },
  })

  await prisma.project.create({
    data: {
      title: 'PulseScale - Predictive Lead Scoring & SDR Router',
      slug: 'pulsescale',
      client: 'ScaleDirect B2B',
      industry: 'B2B SaaS & Growth',
      overview: 'Inbound prospect qualification system matching website behavior and firmographic data to instantly route high-value leads to senior reps.',
      problem: 'High lead volume meant SDRs spent 60% of their workday pursuing unqualified contacts while enterprise opportunities sat cold.',
      solution: 'Engineered an automated enrichment pipeline that scores inbound leads in under 2 seconds and fires priority calendar invitations and alerts.',
      techStack: JSON.stringify(['Next.js', 'Python', 'FastAPI', 'Prisma', 'PostgreSQL', 'Twilio API', 'Slack API']),
      results: JSON.stringify({
        'Sales Qualified Leads': '+210% pipeline increase',
        'Response Time': 'Under 60 seconds from form submit',
        'Deal Velocity': 'Sales cycle reduced from 44 to 18 days',
      }),
      coverImage: '/images/portfolio-pulsescale.jpg',
      gallery: JSON.stringify(['/images/portfolio-pulsescale.jpg']),
      liveUrl: 'https://pulsescale.fourfrontlab.com',
      featured: false,
      order: 6,
      categoryId: catMap['ai-solutions'],
    },
  })

  // 5. Services
  await prisma.service.create({
    data: {
      title: 'Website Development',
      slug: 'website-development',
      shortDesc: 'Bespoke, lightning-fast digital flagships crafted with modern frameworks, 3D interactions, and conversion-engineered architecture.',
      fullDesc: 'At Four Front Lab, we treat your website as your highest-leverage business asset. We do not use cookie-cutter templates or bloated page builders. Every digital experience we engineer is custom-built with Next.js, TypeScript, and modern styling, yielding sub-second load times, world-class SEO rankings, and immersive 3D/interactive brand narratives that captivate your target market.',
      icon: 'Code',
      deliverables: JSON.stringify([
        'Custom Next.js & React Architecture',
        'Interactive 3D / WebGL Visual Centers',
        'Headless CMS & Content Workflows',
        'Technical SEO & Core Web Vitals (99+)',
        'Multi-device Responsive Optimization',
        'Analytics & Conversion Tracking',
      ]),
      benefits: JSON.stringify([
        'Sub-second load speeds boost search rankings and reduce bounce rates',
        'Distinctive visual branding separates you from generic competitors',
        'Custom admin CMS allows effortless content updates without developers',
        'Zero security vulnerabilities compared to traditional WordPress setups',
      ]),
      techStack: JSON.stringify(['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'Three.js / R3F', 'Prisma', 'Cloudflare Edge']),
      faqs: JSON.stringify([
        {
          question: 'How long does a custom website build take?',
          answer: 'Typical production timelines range from 3 to 6 weeks depending on custom 3D requirements, CMS scope, and complex integrations.',
        },
        {
          question: 'Can our marketing team update text and images easily?',
          answer: 'Yes. Every website comes with our intuitive Four Front Lab Admin CMS where you can modify copy, upload media, publish case studies, and manage inquiries.',
        },
        {
          question: 'Do you provide hosting and post-launch maintenance?',
          answer: 'We provide end-to-end deployment on global edge CDNs with 99.99% uptime guarantees, automated backups, and ongoing optimization retainers.',
        },
      ]),
      order: 1,
    },
  })

  await prisma.service.create({
    data: {
      title: 'Business Automation',
      slug: 'business-automation',
      shortDesc: 'Eliminate repetitive manual tasks, eradicate human data entry errors, and interconnect your entire software stack with self-healing workflows.',
      fullDesc: 'Manual operational friction is the single greatest bottleneck to scaling profitability. Four Front Lab designs and deploys autonomous automation engines that bridge ERPs, CRMs, accounting systems, and customer channels into synchronized, real-time pipelines. Free your high-value talent to focus on revenue while automated systems handle the rest.',
      icon: 'Cpu',
      deliverables: JSON.stringify([
        'Cross-System API & Webhook Bridges',
        'Automated Invoice & Document OCR Extraction',
        'Multi-Tier CRM Lead Routing & Notification Engines',
        'Inventory, Shipping & Logistics Sync',
        'Automated WhatsApp & Email Customer Triggers',
        'Failure-Proof Queue Workers & Error Alerts',
      ]),
      benefits: JSON.stringify([
        'Save 150+ employee hours every month per department',
        'Reduce operational data entry errors to practically 0%',
        'Achieve instant sub-second response times for inbound business inquiries',
        'Scale transaction volume 10x without hiring proportional back-office staff',
      ]),
      techStack: JSON.stringify(['Node.js / TypeScript', 'Python Workflows', 'Redis / BullMQ', 'Prisma ORM', 'Stripe API', 'Make / n8n', 'WhatsApp Business API']),
      faqs: JSON.stringify([
        {
          question: 'What tools and software can you automate?',
          answer: 'Virtually any modern system with an API or webhook: Salesforce, HubSpot, QuickBooks, Xero, Stripe, Shopify, Google Workspace, Slack, custom SQL databases, and legacy endpoints.',
        },
        {
          question: 'What happens if a third-party service experiences downtime?',
          answer: 'We build fault-tolerant architectures with automatic exponential backoff retry queues, transaction idempotency, and immediate escalation alerts so no data is ever lost.',
        },
      ]),
      order: 2,
    },
  })

  await prisma.service.create({
    data: {
      title: 'AI Solutions & Integrations',
      slug: 'ai-solutions',
      shortDesc: 'Custom LLM agents, proprietary vector retrieval (RAG), multimodal assistants, and predictive models tailored to your business knowledge base.',
      fullDesc: 'Artificial intelligence is only valuable when it produces concrete business leverage. We do not ship generic wrappers. Four Front Lab engineers domain-specific AI workflows, intelligent document processors, autonomous customer agents, and internal analytical assistants that operate securely on your private company data.',
      icon: 'Bot',
      deliverables: JSON.stringify([
        'Proprietary RAG & Vector Knowledge Retrieval',
        'Autonomous Task-Execution AI Agents',
        'Intelligent Multimodal Document Extraction',
        'Custom Fine-Tuning & Prompt Optimization',
        'Role-Based Secure LLM Copilots for Teams',
        'Real-Time AI Audio & Transcription Pipelines',
      ]),
      benefits: JSON.stringify([
        'Empower teams to interrogate complex company databases in natural language',
        'Automate 80% of customer support queries with contextual accuracy',
        'Accelerate executive document synthesis from hours to seconds',
        'Protect enterprise data privacy with isolated, secure inference boundaries',
      ]),
      techStack: JSON.stringify(['OpenAI GPT-4o', 'Claude 3.5 Sonnet', 'Google Gemini 1.5 Pro', 'LangChain / LlamaIndex', 'Pinecone / pgvector', 'FastAPI', 'Next.js UI']),
      faqs: JSON.stringify([
        {
          question: 'Is our private company data used to train public AI models?',
          answer: 'Never. We enforce strict enterprise zero-data-retention APIs and self-hosted vector databases, ensuring your proprietary IP remains 100% confidential and compliant.',
        },
        {
          question: 'Can the AI perform actions rather than just answering questions?',
          answer: 'Yes. We specialize in tool-augmented agents that can verify user permissions, query internal databases, generate PDF reports, trigger emails, and create CRM records automatically.',
        },
      ]),
      order: 3,
    },
  })

  await prisma.service.create({
    data: {
      title: 'Digital Marketing & Growth',
      slug: 'digital-marketing',
      shortDesc: 'Data-backed performance marketing, programmatic SEO engines, and conversion rate optimization that transform clicks into enterprise pipeline.',
      fullDesc: 'Traffic without conversion is vanity. Four Front Lab fuses technical engineering with high-intent performance marketing. From high-converting landing page architectures and programmatic SEO pages to dynamic retargeting funnels and granular multi-touch attribution, we build sustainable growth engines.',
      icon: 'BarChart',
      deliverables: JSON.stringify([
        'High-Converting Funnel & Landing Page Architecture',
        'Technical & Programmatic SEO Systems',
        'Advanced Multi-Touch Attribution & Event Tracking',
        'Automated A/B Testing Infrastructure',
        'Paid Acquisition Strategy (Meta, Google, LinkedIn)',
        'Full-Funnel CRO & Heatmap Analysis',
      ]),
      benefits: JSON.stringify([
        'Lower customer acquisition cost (CAC) through laser-targeted messaging',
        'Multiply conversion rates on existing traffic by 2x to 4x',
        'Dominate high-intent search queries with automated programmatic landing pages',
        'Unify marketing spend and actual closed revenue in real-time dashboards',
      ]),
      techStack: JSON.stringify(['Google Tag Manager', 'PostHog', 'Mixpanel', 'Meta Pixel / CAPI', 'Google Ads', 'Vercel Edge Config', 'Tailwind CSS']),
      faqs: JSON.stringify([
        {
          question: 'How do you approach Conversion Rate Optimization (CRO)?',
          answer: 'We combine user session recordings, heatmaps, and systematic multivariate tests on headlines, social proof placement, and form micro-interactions to continually push conversion rates higher.',
        },
        {
          question: 'What makes your SEO different from traditional agencies?',
          answer: 'We build programmatic, server-rendered architectures that load in 200ms and programmatically generate high-intent search landing pages with perfect Core Web Vitals.',
        },
      ]),
      order: 4,
    },
  })

  await prisma.service.create({
    data: {
      title: 'Custom Business Solutions',
      slug: 'custom-software',
      shortDesc: 'Tailored web applications, internal operational hubs, customer portals, and specialized software engineered precisely to your exact business workflow.',
      fullDesc: 'Off-the-shelf software forces your business into someone else\'s rigid box. When your operational advantage demands bespoke tooling, Four Front Lab develops tailored SaaS platforms, internal management portals, and client portals built to scale reliably under heavy enterprise usage.',
      icon: 'Layers',
      deliverables: JSON.stringify([
        'Custom Web Portals & Enterprise Dashboards',
        'Role-Based Access Control (RBAC) & Security',
        'Interactive Data Visualizations & Reporting',
        'Scalable Relational Database Schemas',
        'Third-Party Payment & Billing Integrations',
        'Comprehensive API Documentation & Testing',
      ]),
      benefits: JSON.stringify([
        'Own your software asset entirely with zero recurring per-seat SaaS tax',
        'Unify fragmented spreadsheets into a single source of operational truth',
        'Give clients a branded, white-glove digital portal that builds loyalty',
        'Scale your system freely without arbitrary vendor limitations',
      ]),
      techStack: JSON.stringify(['Next.js', 'TypeScript', 'Prisma ORM', 'PostgreSQL / SQLite', 'Tailwind CSS', 'Docker', 'Stripe Connect']),
      faqs: JSON.stringify([
        {
          question: 'How do we get started if we only have a rough concept?',
          answer: 'We run a structured 1-week Discovery & Scoping Sprint where our technical leads map out system architecture, database models, interactive wireframes, and an exact milestone roadmap.',
        },
        {
          question: 'Do we own the intellectual property (IP) and source code?',
          answer: '100%. Upon completion, full copyright, source code repositories, and deployment assets are completely transferred to your organization.',
        },
      ]),
      order: 5,
    },
  })

  // 6. Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        clientName: 'Marcus Vance',
        clientRole: 'Chief Technology Officer',
        clientCompany: 'Aetheris Capital',
        avatarUrl: '/images/avatar-marcus.jpg',
        quote: 'Four Front Lab engineered our market intelligence platform in record time. Their fusion of high-performance Next.js interfaces with secure AI models delivered an immediate 78% reduction in research turnaround. Unmatched technical caliber.',
        rating: 5,
        featured: true,
      },
      {
        clientName: 'Elena Rostova',
        clientRole: 'VP of Brand & Innovation',
        clientCompany: 'Veloce Motors',
        avatarUrl: '/images/avatar-elena.jpg',
        quote: 'The 3D interactive showroom they built exceeded every expectation. It won accolades across the design community and drove a 320% surge in qualified private viewings. They are truly in a league of their own.',
        rating: 5,
        featured: true,
      },
      {
        clientName: 'David Chen',
        clientRole: 'Head of Global Operations',
        clientCompany: 'OmniLogistics',
        avatarUrl: '/images/avatar-david.jpg',
        quote: 'Before Four Front Lab, our team spent half their day manually reconciling freight manifests. Their custom automation workflows saved us over 1,200 hours monthly and paid for themselves in under seven weeks.',
        rating: 5,
        featured: true,
      },
      {
        clientName: 'Sarah Jenkins',
        clientRole: 'Chief Commercial Officer',
        clientCompany: 'Novus Paris',
        avatarUrl: '/images/avatar-sarah.jpg',
        quote: 'Our international conversion rate jumped by 185% after Four Front Lab rebuilt our digital flagship. Sub-second page loads, effortless admin controls, and seamless WhatsApp lead routing. Simply exceptional.',
        rating: 5,
        featured: true,
      },
    ],
  })

  // 7. Inquiries
  await prisma.inquiry.createMany({
    data: [
      {
        name: 'Alexander Wright',
        email: 'a.wright@summitventures.co',
        phone: '+1 (415) 890-2341',
        company: 'Summit Ventures',
        service: 'AI Solutions & Integrations',
        budget: '$25,000 - $50,000',
        timeline: '1 - 2 Months',
        message: 'We need a bespoke internal LLM system to analyze private equity term sheets, extract debt covenants, and cross-reference historic fund performance metrics.',
        status: 'new',
        priority: 'urgent',
        notes: 'High-priority prospect. Book introductory architecture demo as soon as possible.',
      },
      {
        name: 'Sophia Laurent',
        email: 'sophia@laurentatelier.fr',
        phone: '+33 6 12 34 56 78',
        company: 'Laurent Haute Horlogerie',
        service: 'Website Development',
        budget: '$15,000 - $25,000',
        timeline: '2 - 3 Months',
        message: 'Looking for a luxury digital flagship with interactive 3D watch mechanisms and VIP private consultation scheduling via WhatsApp.',
        status: 'contacted',
        priority: 'high',
        notes: 'Introductory call completed on Monday. Sent 3D interactive portfolio case study.',
      },
      {
        name: 'Michael Sterling',
        email: 'msterling@apexsupply.com',
        phone: '+1 (312) 555-0199',
        company: 'Apex Supply Chain',
        service: 'Business Automation',
        budget: '$50,000+',
        timeline: 'Immediate',
        message: 'Currently using NetSuite and 4 carrier portals. We need complete automation for carrier billing matching and bill-of-lading processing.',
        status: 'qualified',
        priority: 'urgent',
        notes: 'Qualified budget and timeline. Technical discovery call scheduled for Thursday 2 PM EST.',
      },
      {
        name: 'Rachel Adams',
        email: 'rachel@pulsepay.io',
        phone: '+1 (650) 443-8821',
        company: 'PulsePay',
        service: 'Custom Business Solutions',
        budget: '$25,000 - $50,000',
        timeline: '1 - 2 Months',
        message: 'Need a custom compliance merchant portal with real-time KYB document verification and role-based permissions.',
        status: 'converted',
        priority: 'high',
        notes: 'Contract signed. Project kickoff in progress with engineering team.',
      },
    ],
  })

  // 8. Site Settings
  const settings = [
    { key: 'site_name', value: 'Four Front Lab' },
    { key: 'site_tagline', value: 'Engineering Next-Generation Digital Experiences, Intelligent Automation & Scalable Software' },
    { key: 'whatsapp_number', value: '+1 (800) 436-8736' },
    { key: 'whatsapp_raw', value: '+18004368736' },
    { key: 'contact_email', value: 'contact@fourfrontlab.com' },
    { key: 'office_address', value: 'Four Front Lab, Tech Quarter Innovation Tower, Suite 400' },
    { key: 'social_twitter', value: 'https://x.com/fourfrontlab' },
    { key: 'social_linkedin', value: 'https://linkedin.com/company/fourfrontlab' },
    { key: 'social_github', value: 'https://github.com/fourfrontlab' },
    { key: 'meta_title', value: 'Four Front Lab | Premium Digital Agency & Software Engineering' },
    { key: 'meta_description', value: 'Four Front Lab is an elite digital engineering agency specializing in bespoke web development, business process automation, AI integration, and high-performance custom software.' },
  ]

  for (const s of settings) {
    await prisma.siteSetting.create({
      data: s,
    })
  }

  // 9. Media Assets sample
  await prisma.mediaAsset.createMany({
    data: [
      {
        fileName: 'logo.jpeg',
        fileUrl: '/logo.jpeg',
        mimeType: 'image/jpeg',
        sizeBytes: 34159,
        altText: 'Four Front Lab Official Logo',
      },
      {
        fileName: 'portfolio-aetheris.jpg',
        fileUrl: '/images/portfolio-aetheris.jpg',
        mimeType: 'image/jpeg',
        sizeBytes: 120400,
        altText: 'Aetheris AI Financial Intelligence Platform',
      },
      {
        fileName: 'portfolio-veloce.jpg',
        fileUrl: '/images/portfolio-veloce.jpg',
        mimeType: 'image/jpeg',
        sizeBytes: 145000,
        altText: 'Veloce Motors 3D Configurator',
      },
    ],
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
