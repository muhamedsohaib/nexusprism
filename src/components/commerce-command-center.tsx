'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { capabilities, dashboardModules, proofItems, services, whatsappLink } from '@/lib/constants'
import { ScoreForm } from '@/components/score-form'
import { nexusPrismLogoSrc } from '@/lib/logo-data'

type Language = 'en' | 'ar'

const copy = {
  en: {
    entryLine: 'The AI operating layer for UAE sellers.',
    entryNote: 'For Amazon.ae sellers ready to see what their store is really leaving behind.',
    entryCta: 'Check Your Actual Worth',
    heroEyebrow: 'Amazon.ae commerce operations',
    heroTitle: 'The AI operating layer for UAE sellers.',
    heroLead:
      'Nexus Prism reviews your Amazon.ae presence, identifies the operational gaps holding your store back, and turns the highest-impact fixes into focused execution sprints.',
    primaryCta: 'Get My Free Commerce Score',
    secondaryCta: 'WhatsApp the Founder',
    trust: ['Amazon.ae first', 'UAE-first, globally capable', 'Human-reviewed AI analysis', 'No fake promises'],
    scannerEyebrow: 'Free first review',
    scannerTitle: 'Submit your store for a real Commerce Score.',
    scannerBody:
      'Paste your Amazon.ae listing, storefront, or product link. We review visible gaps across catalog quality, images, search readiness, trust signals, conversion risk, automation, and compliance readiness.',
    dashboardEyebrow: 'Command view',
    dashboardTitle: 'See the work like an operator, not a client waiting in the dark.',
    dashboardBody:
      'Every audit leads to a clear operating view: what is broken, what matters first, what is being fixed, and what needs your approval.',
    labEyebrow: 'Before / After Lab',
    labTitle: 'We do not sell AI noise. We show the fix.',
    labBody:
      'The lab demonstrates how messy commerce assets become clearer, sharper, and more conversion-ready through structured review and execution.',
    servicesEyebrow: 'Fix sprints',
    servicesTitle: 'After the score, we fix what matters first.',
    servicesBody:
      'Each sprint solves one visible commerce problem quickly, then turns repeated work into a cleaner operating system.',
    proofEyebrow: 'Operator experience',
    proofTitle: 'Built from real marketplace operations, not theory.',
    proofBody:
      'Nexus Prism is being shaped around hands-on experience with Amazon selling, listings, catalog fixes, product images, procurement, customer service, and the messy operational work most sellers avoid.',
    pricingEyebrow: 'Start here',
    pricingTitle: 'Start free. Pay only when there is something worth fixing.',
    pricingBody:
      'The first Commerce Score is free. Paid sprints begin only when the audit reveals a clear execution path.',
    faqEyebrow: 'Questions',
    faqTitle: 'What serious sellers ask before they send a store.',
    finalEyebrow: 'Ready for the first review?',
    finalTitle: 'Send one store. See what it is actually worth fixing.',
    finalBody:
      'Start with the free Commerce Score. If the diagnosis is clear, we will show you the sprint that makes sense next.',
    openWhatsapp: 'Open WhatsApp',
    langLabel: 'العربية'
  },
  ar: {
    entryLine: 'طبقة تشغيل ذكية لتجار الإمارات.',
    entryNote: 'لتجار Amazon.ae الجاهزين لمعرفة ما يفوّته متجرهم فعلاً.',
    entryCta: 'اكتشف قيمتك الفعلية',
    heroEyebrow: 'تشغيل التجارة على Amazon.ae',
    heroTitle: 'طبقة تشغيل ذكية لتجار الإمارات.',
    heroLead:
      'يقوم Nexus Prism بمراجعة حضورك على Amazon.ae، وتحديد فجوات التشغيل التي تعيق نمو متجرك، ثم تحويل أهم الإصلاحات إلى خطوات تنفيذ واضحة.',
    primaryCta: 'احصل على تقييمك التجاري المجاني',
    secondaryCta: 'تواصل عبر واتساب',
    trust: ['Amazon.ae أولاً', 'الإمارات أولاً وبقدرة عالمية', 'مراجعة بشرية مدعومة بالذكاء الاصطناعي', 'بدون وعود وهمية'],
    scannerEyebrow: 'مراجعة أولى مجانية',
    scannerTitle: 'أرسل متجرك للحصول على تقييم تجاري فعلي.',
    scannerBody:
      'ضع رابط منتجك أو متجرك على Amazon.ae. سنراجع الفجوات الظاهرة في جودة الكتالوج، الصور، الظهور في البحث، الثقة، التحويل، الأتمتة، وجاهزية الامتثال.',
    dashboardEyebrow: 'لوحة القيادة',
    dashboardTitle: 'تابع العمل كمدير تشغيل، لا كعميل ينتظر دون وضوح.',
    dashboardBody:
      'كل مراجعة تتحول إلى رؤية تشغيلية واضحة: ما المشكلة، ما الأهم، ما الذي يتم إصلاحه، وما الذي يحتاج موافقتك.',
    labEyebrow: 'مختبر قبل وبعد',
    labTitle: 'لا نبيع ضجيج الذكاء الاصطناعي. نعرض الإصلاح.',
    labBody:
      'يوضح المختبر كيف تتحول أصول التجارة المبعثرة إلى عناصر أوضح وأقوى وأكثر جاهزية للبيع من خلال مراجعة وتنفيذ منظم.',
    servicesEyebrow: 'خطط الإصلاح',
    servicesTitle: 'بعد التقييم، نصلح ما يهم أولاً.',
    servicesBody:
      'كل خطة تنفيذ مصممة لحل مشكلة تجارية واضحة بسرعة، ثم تحويل العمل المتكرر إلى نظام تشغيل أنظف.',
    proofEyebrow: 'خبرة تشغيلية',
    proofTitle: 'مبني على تشغيل فعلي للمتاجر، وليس على نظريات.',
    proofBody:
      'يتشكل Nexus Prism من خبرة عملية في البيع على أمازون، تحسين القوائم، إصلاح الكتالوج، توجيه صور المنتجات، المشتريات، خدمة العملاء، والعمل التشغيلي المعقد الذي يتجنبه كثير من التجار.',
    pricingEyebrow: 'ابدأ من هنا',
    pricingTitle: 'ابدأ مجاناً. ادفع فقط عندما تظهر فرصة إصلاح حقيقية.',
    pricingBody:
      'التقييم التجاري الأول مجاني. تبدأ خطط التنفيذ المدفوعة فقط عندما تكشف المراجعة عن مسار إصلاح واضح.',
    faqEyebrow: 'أسئلة',
    faqTitle: 'ما الذي يسأل عنه التجار الجادون قبل إرسال متجرهم.',
    finalEyebrow: 'جاهز للمراجعة الأولى؟',
    finalTitle: 'أرسل متجراً واحداً واعرف ما يستحق الإصلاح فعلاً.',
    finalBody:
      'ابدأ بالتقييم التجاري المجاني. إذا كان التشخيص واضحاً، سنوضح لك خطة التنفيذ المناسبة بعد ذلك.',
    openWhatsapp: 'افتح واتساب',
    langLabel: 'EN'
  }
} as const

const faq = [
  ['Is the first Commerce Score really free?', 'Yes. The first review is free so we can see whether there is a real fix worth discussing.'],
  ['Will I get an instant AI-generated score?', 'No. The first version is manually reviewed with AI support so the advice stays practical and avoids fake automated promises.'],
  ['Do you only work with Amazon.ae sellers?', 'Amazon.ae sellers are the first focus, but the system is being built for noon, Shopify, and wider e-commerce operations as well.'],
  ['Do I need to share private seller account access?', 'No for the first review. We start with visible links and information you choose to submit. Deeper access is only discussed if a paid sprint requires it.'],
  ['Can you guarantee sales improvement?', 'No. We avoid fake guarantees. The goal is to identify and fix visible operational gaps that can improve the conditions for better performance.']
]

const proofPoints = [
  'Amazon marketplace operations experience',
  'Listing and catalog optimization',
  'Product image direction and editing',
  'Seller support and customer-service workflows',
  'Procurement and product opportunity thinking',
  'Automation mindset for repetitive work'
]

export function CommerceHomepage() {
  const [entered, setEntered] = useState(false)
  const [language, setLanguage] = useState<Language>('en')
  const t = copy[language]
  const dir = language === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('lang') === 'ar') setLanguage('ar')
  }, [])

  useEffect(() => {
    document.documentElement.lang = language === 'ar' ? 'ar-AE' : 'en-AE'
    document.documentElement.dir = dir
  }, [dir, language])

  const whatsappHref = useMemo(
    () => whatsappLink('Hi Nexus Prism, I want my free AI Commerce Score for my Amazon.ae store.'),
    []
  )

  return (
    <div className="cinematic-home" dir={dir}>
      {!entered && <EntryScreen language={language} onEnter={() => setEntered(true)} onToggleLanguage={() => setLanguage(language === 'en' ? 'ar' : 'en')} />}

      <section className="hero-section command-hero" id="top">
        <div className="cinematic-red-orbit" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy reveal">
            <div className="hero-language-row">
              <p className="eyebrow">{t.heroEyebrow}</p>
              <button className="language-toggle" type="button" onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}>
                {t.langLabel}
              </button>
            </div>
            <h1>{t.heroTitle}</h1>
            <p className="hero-lede">{t.heroLead}</p>
            <div className="hero-actions">
              <Link className="button primary" href="#score">{t.primaryCta}</Link>
              <a className="button ghost" href={whatsappHref} target="_blank" rel="noreferrer">{t.secondaryCta}</a>
            </div>
            <div className="assurance-row" role="list">
              {t.trust.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
          <HeroDashboard />
        </div>
      </section>

      <ScoreSection language={language} />
      <DashboardPreview language={language} />
      <BeforeAfterLab language={language} />
      <ServiceCards language={language} />
      <ProofSection language={language} />
      <PricingSection language={language} />
      <FAQSection language={language} />
      <WhatsAppCTA language={language} />
    </div>
  )
}

function EntryScreen({ language, onEnter, onToggleLanguage }: { language: Language; onEnter: () => void; onToggleLanguage: () => void }) {
  const t = copy[language]

  return (
    <section className="entry-screen" aria-label="Nexus Prism entry screen">
      <div className="entry-red-scan" aria-hidden="true" />
      <button className="entry-language" type="button" onClick={onToggleLanguage}>{t.langLabel}</button>
      <div className="entry-content">
        <img className="entry-logo" src={nexusPrismLogoSrc} alt="Nexus Prism" />
        <p className="entry-line">{t.entryLine}</p>
        <button className="button primary entry-cta" type="button" onClick={onEnter}>{t.entryCta}</button>
        <p className="entry-note">{t.entryNote}</p>
      </div>
    </section>
  )
}

function HeroDashboard() {
  const scanItems = ['Catalog', 'Images', 'Keywords', 'Trust', 'Automation']

  return (
    <div className="hero-console glass-card" aria-label="Cinematic dashboard preview">
      <div className="console-topbar"><i /><i /><i /><strong>NEXUS / COMMAND VIEW</strong></div>
      <div className="prism-orb" aria-hidden="true">
        <img src={nexusPrismLogoSrc} alt="" />
        <div className="orb-ring ring-one" />
        <div className="orb-ring ring-two" />
      </div>
      <div className="scan-stack">
        {scanItems.map((item, index) => (
          <div className="scan-row" style={{ ['--delay' as string]: `${index * 0.18}s` }} key={item}>
            <span>{item}</span><i />
          </div>
        ))}
      </div>
      <div className="floating-ticket ticket-left"><span className="status-dot" /> Human-reviewed score</div>
      <div className="floating-ticket ticket-right">No fake instant output</div>
    </div>
  )
}

function ScoreSection({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <section className="section scanner-section" id="score">
      <div className="container split-grid align-start">
        <div className="section-copy sticky-copy">
          <p className="eyebrow">{t.scannerEyebrow}</p>
          <h2>{t.scannerTitle}</h2>
          <p>{t.scannerBody}</p>
          <div className="chip-row">
            {capabilities.map(([title]) => <span key={title}>{title}</span>)}
          </div>
        </div>
        <ScoreForm language={language} />
      </div>
    </section>
  )
}

function DashboardPreview({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <section className="section dashboard-section">
      <div className="container dashboard-shell glass-card">
        <div className="section-copy">
          <p className="eyebrow">{t.dashboardEyebrow}</p>
          <h2>{t.dashboardTitle}</h2>
          <p>{t.dashboardBody}</p>
        </div>
        <div className="dashboard-grid">
          {dashboardModules.map((module, index) => (
            <article className={index === 0 || index === 8 ? 'dash-card wide' : 'dash-card'} key={module}>
              <span>{module}</span>
              <strong>{index === 0 ? 'Manual review' : index === 8 ? 'Sprint in progress' : 'Check pending'}</strong>
              <div className="bar"><i style={{ width: `${55 + (index % 4) * 10}%` }} /></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function BeforeAfterLab({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <section className="section muted-section" id="proof">
      <div className="container">
        <div className="section-heading center">
          <p className="eyebrow">{t.labEyebrow}</p>
          <h2>{t.labTitle}</h2>
          <p>{t.labBody}</p>
        </div>
        <div className="card-grid three">
          {proofItems.map((item) => (
            <article className="proof-card glass-card" key={item.title}>
              <h3>{item.title}</h3>
              <div className="before-after">
                <div><span>Before</span><p>{item.before}</p></div>
                <div><span>After</span><p>{item.after}</p></div>
              </div>
              <small>Founder work / demonstration example. No fake client claims.</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCards({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-heading center">
          <p className="eyebrow">{t.servicesEyebrow}</p>
          <h2>{t.servicesTitle}</h2>
          <p>{t.servicesBody}</p>
        </div>
        <div className="card-grid services-grid">
          {services.map((service, index) => (
            <article className={index === 0 ? 'service-card glass-card featured-card' : 'service-card glass-card'} key={service.title}>
              <span className="price">{service.price}</span>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
              <Link className="text-link" href={index === 0 ? '#score' : '/pricing'}>{service.cta}</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProofSection({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <section className="section muted-section">
      <div className="container split-grid align-start">
        <div className="section-copy">
          <p className="eyebrow">{t.proofEyebrow}</p>
          <h2>{t.proofTitle}</h2>
          <p>{t.proofBody}</p>
        </div>
        <div className="proof-list glass-card">
          {proofPoints.map((point) => <div key={point}><span className="status-dot" />{point}</div>)}
        </div>
      </div>
    </section>
  )
}

function PricingSection({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-heading center">
          <p className="eyebrow">{t.pricingEyebrow}</p>
          <h2>{t.pricingTitle}</h2>
          <p>{t.pricingBody}</p>
        </div>
        <div className="card-grid pricing-grid">
          {services.map((service, index) => (
            <article className={index === 0 ? 'pricing-card glass-card featured-card' : 'pricing-card glass-card'} key={service.title}>
              <span>{service.title}</span>
              <strong>{service.price}</strong>
              <p>{service.body}</p>
              <Link className="button ghost full" href={index === 0 ? '#score' : '/pricing'}>{service.cta}</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <section className="section muted-section" id="faq">
      <div className="container split-grid align-start">
        <div className="section-copy sticky-copy">
          <p className="eyebrow">{t.faqEyebrow}</p>
          <h2>{t.faqTitle}</h2>
        </div>
        <div className="faq-stack">
          {faq.map(([question, answer]) => (
            <details className="faq-item glass-card" key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhatsAppCTA({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <section className="section" id="contact">
      <div className="container contact-card glass-card">
        <img src={nexusPrismLogoSrc} alt="" aria-hidden="true" />
        <p className="eyebrow">{t.finalEyebrow}</p>
        <h2>{t.finalTitle}</h2>
        <p>{t.finalBody}</p>
        <div className="hero-actions center-actions">
          <Link className="button primary" href="#score">{t.primaryCta}</Link>
          <a className="button ghost" href={whatsappLink('Hi Nexus Prism, I want to start with the free Commerce Score.')} target="_blank" rel="noreferrer">{t.openWhatsapp}</a>
        </div>
      </div>
    </section>
  )
}
