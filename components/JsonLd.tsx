import React from 'react'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fourfrontlab.tech'

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Four Front Lab',
    alternateName: ['FourFrontLab', 'Four Front Lab Agency'],
    url: baseUrl,
    logo: `${baseUrl}/logo.webp`,
    image: `${baseUrl}/og-image.png`,
    description:
      'Elite web development and AI automation agency based in Islamabad, Pakistan. Engineering high-performance Next.js web applications, autonomous workflows, and custom digital systems.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressRegion: 'Federal Capital Territory',
      addressCountry: 'PK',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+923444741603',
      contactType: 'customer support',
      areaServed: ['PK', 'US', 'GB', 'AE', 'Worldwide'],
      availableLanguage: ['English', 'Urdu'],
    },
    sameAs: [
      'https://instagram.com/fourfrontlab',
      'https://x.com/FourFrontLab',
      'https://facebook.com/fourfrontlab',
      'https://linkedin.com/company/fourfrontlab',
      'https://github.com/fourfrontlab',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'Four Front Lab',
    url: baseUrl,
    description:
      'Premier Next.js development and AI automation agency in Islamabad, Pakistan.',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    inLanguage: 'en-US',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ServiceJsonLd({
  name = 'Custom Next.js Web Development & AI Automation',
  description = 'High-performance Next.js 14 web development, autonomous workflow automation, custom AI integrations, and conversion architecture.',
  serviceType = 'Web Development Agency',
}: {
  name?: string
  description?: string
  serviceType?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType,
    description,
    provider: {
      '@id': `${baseUrl}/#organization`,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Worldwide',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software Engineering Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website Development & Kinetic Architecture',
            description: 'Custom Next.js 14 web apps, sub-second TTFB, responsive 60fps animations.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business Automation & Autonomous Workflows',
            description: 'API orchestration, CRM/ERP bridges, automated event triggers running 24/7.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Enterprise AI Solutions & RAG Integrations',
            description: 'Private RAG knowledge stores, LLM function calling, multimodal document understanding.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Starter Small Business Package',
            description: 'Affordable high-impact web presence for small businesses and startups starting at $500.',
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FaqJsonLd({
  faqs,
}: {
  faqs?: Array<{ question: string; answer: string }>
}) {
  const defaultFaqs = [
    {
      question: 'How much does a website cost?',
      answer:
        'Our Starter package for small businesses and startups starts at $500 to $2,000. Custom enterprise web applications, complex portals, and full automation pipelines are quoted based on technical scope and timeline.',
    },
    {
      question: 'How long does it take?',
      answer:
        'A custom high-performance Next.js website typically launches within 2 to 4 weeks. Larger web applications and multi-system automation workflows take between 4 to 8 weeks.',
    },
    {
      question: 'Do you work with small businesses?',
      answer:
        'Yes. We specifically created our Starter package ($500 - $2,000) to help small businesses and early-stage founders acquire an Awwwards-caliber, high-converting digital presence without big-agency overhead.',
    },
    {
      question: 'Where are you based?',
      answer:
        'Four Front Lab is based in Islamabad, Pakistan, founded by software engineering graduates from CUST. We work with clients locally across Pakistan and internationally worldwide.',
    },
  ]

  const items = faqs || defaultFaqs

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; url: string }>
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName = 'Four Front Lab',
  image = `${baseUrl}/og-image.png`,
}: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  authorName?: string
  image?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.startsWith('http') ? url : `${baseUrl}${url}`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
