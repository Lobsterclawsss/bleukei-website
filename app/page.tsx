'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Megaphone,
  TrendingUp,
  ShieldCheck,
  Zap,
  Settings2,
  Code2,
  ArrowRight,
  Calendar,
  Send,
  CheckCircle2,
  AlertCircle,
  Plus,
} from 'lucide-react';

// Internal booking page. The cal.com embed lives at /book so every CTA lands on
// a page we control and can measure, rather than handing the visitor off to a
// third-party domain mid-funnel.
const BOOKING_URL = '/book';

// Character-stagger headline word
function StaggerWord({ text, delayStart = 0 }: { text: string; delayStart?: number }) {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.04, delayChildren: delayStart } },
      }}
      className="inline-block"
      aria-label={text}
    >
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 46 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Editorial section label: (BK·01) WHAT WE DO
function SectionLabel({ index, text }: { index: string; text: string }) {
  return (
    <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.3em] uppercase text-white/40 mb-5">
      <span className="text-teal-400/80">(BK·{index})</span>
      <span>{text}</span>
    </p>
  );
}

function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <SectionLabel index={index} text={eyebrow} />
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{title}</h2>
      {subtitle && (
        <p className="text-lg text-white/60 max-w-2xl mx-auto text-balance">{subtitle}</p>
      )}
    </motion.div>
  );
}

// Hero
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] bg-royal-600/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-teal-500/15 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 container mx-auto max-w-4xl px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block glass rounded-full px-4 py-2 text-sm text-white/70 mb-8"
        >
          Growth &amp; Operations Consultancy
        </motion.p>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          <StaggerWord text="Growth," delayStart={0.15} />{' '}
          <motion.span
            initial={{ opacity: 0, y: 46 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block gradient-text"
          >
            engineered.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-xl text-white/65 max-w-2xl mx-auto mb-5 text-balance"
        >
          BLEUKEI helps ambitious businesses scale: marketing that wins attention,
          and the automation, operations, and technology that win back your time.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="text-sm text-white/45 max-w-xl mx-auto mb-10"
        >
          For business leaders who know they should be doing more, but don&apos;t have the
          time, expertise, or energy to do it themselves.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href={BOOKING_URL}
            className="inline-flex items-center gap-2 bg-white text-black font-semibold px-7 py-4 rounded-xl hover:bg-white/90 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            Book a Call
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 glass glass-hover font-semibold px-7 py-4 rounded-xl text-white/90 hover:text-white transition-colors"
          >
            Tell Us About Your Project
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Capability marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="absolute bottom-10 left-0 right-0 overflow-hidden marquee-mask"
      >
        <CapabilityMarquee />
      </motion.div>
    </section>
  );
}

function CapabilityMarquee() {
  const capabilities = [
    'Social Media',
    'Brand Strategy',
    'GEO + SEO',
    'Partnerships & Sponsorships',
    'Sales Automation',
    'Outbound',
    'AI Workflows',
    'Lead Nurture',
    'Process Design',
    'Operations',
    'Dashboards',
    'Web Development',
    'Integrations',
    'AI Implementation',
  ];
  const doubled = [...capabilities, ...capabilities];
  return (
    <div className="flex w-max animate-marquee gap-3 px-3">
      {doubled.map((cap, i) => (
        <span
          key={i}
          className="flex items-center gap-2 whitespace-nowrap border border-white/10 rounded-full px-4 py-2 text-sm text-white/55"
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-teal-400' : 'bg-royal-400'}`}
          />
          {cap}
        </span>
      ))}
    </div>
  );
}

// Services: numbered editorial list
function ServicesSection() {
  const services = [
    {
      number: '01',
      icon: Megaphone,
      accent: 'text-royal-400',
      title: 'Marketing',
      description:
        'Strategy and execution that gets you found and chosen: across search, social, and the rooms you are not in yet.',
      tags: ['Social Media', 'Brand Strategy', 'GEO + SEO', 'Partnerships & Sponsorships'],
    },
    {
      number: '02',
      icon: TrendingUp,
      accent: 'text-teal-400',
      title: 'Sales',
      description:
        'Pipelines that fill themselves: outbound systems that find the right prospects, reach out, book the call, and follow up so nothing slips.',
      tags: ['Outbound Systems', 'CRM Integration', 'Scheduling & Follow-up', 'Signal Tracking'],
    },
    {
      number: '03',
      icon: Zap,
      accent: 'text-royal-400',
      title: 'Automation & AI',
      description:
        'Systems that handle the repetitive work, so your team can do the valuable work. Example: a lead comes in, your CRM is updated and tagged, and a follow-up goes out in minutes, hands-free.',
      tags: ['AI Workflows', 'Lead Nurture', 'Reporting', 'Custom Agents'],
    },
    {
      number: '04',
      icon: Settings2,
      accent: 'text-teal-400',
      title: 'Operations',
      description:
        'Streamlined processes that make the business run smoothly without depending on you for everything.',
      tags: ['Process Design', 'Systems & SOPs', 'Dashboards', 'Time Recovery'],
    },
    {
      number: '05',
      icon: Code2,
      accent: 'text-royal-400',
      title: 'Tech Development',
      description:
        'Websites, internal tools, and integrations built to fit how your business actually works.',
      tags: ['Web Development', 'Internal Tools', 'Integrations', 'AI Implementation'],
    },
  ];

  return (
    <section id="services" className="py-24 sm:py-32 relative">
      <div className="container mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] uppercase text-white/40 mb-5">
            <span className="text-teal-400/80">(BK·01)</span>
            <span>What We Do</span>
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Services <span className="text-white/30 font-light">(5)</span>
            </h2>
            <p className="text-white/50 max-w-sm text-sm leading-relaxed">
              End-to-end growth: visibility on the front end, efficiency on the back end.
            </p>
          </div>
        </motion.div>

        <div className="border-t border-white/10">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group grid grid-cols-12 gap-4 sm:gap-8 py-10 border-b border-white/10 transition-colors hover:bg-white/[0.02] px-2 sm:px-4"
            >
              <div className="col-span-2 sm:col-span-1">
                <span className="text-sm font-bold gradient-text-teal">{service.number}</span>
              </div>
              <div className="col-span-10 sm:col-span-4 flex items-start gap-3">
                <service.icon className={`w-6 h-6 mt-1 ${service.accent} shrink-0`} />
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  {service.title}
                </h3>
              </div>
              <div className="col-span-12 sm:col-span-7 sm:col-start-6">
                <p className="text-white/60 leading-relaxed mb-5">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-white/50 border border-white/10 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


// Real builds (no client names: discretion is part of the service)
function BuiltSection() {
  const builds = [
    {
      title: 'Autonomous sales agent',
      description:
        'Discovers the right prospects, reaches out, logs everything into the CRM, books the call, and keeps watching for reasons to follow up: a promotion, a product launch, a job change.',
    },
    {
      title: 'Self-improving content engine',
      description:
        'Turns founder thinking and market signals into ideas, copy, and scheduled posts. Reviews its own metrics, learns what works and what the client prefers, and improves over time, with human approval at every level.',
    },
    {
      title: 'Visibility infrastructure',
      description:
        'Websites built to surface in Google search, AI answers, and Google Maps, backed by the reviews, photos, and signals that mark a business as the leader in its space.',
    },
  ];

  return (
    <section id="built" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[480px] h-[420px] bg-royal-700/10 rounded-full blur-[180px]" />
      </div>
      <div className="container mx-auto max-w-6xl px-4 relative">
        <SectionHeading
          index="02"
          eyebrow="Real Builds"
          title="Built, shipped, running"
          subtitle="A few of the systems working for clients right now, from marketing firms and restaurants to hospitality hosts and growing service businesses."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {builds.map((build, i) => (
            <motion.div
              key={build.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="glass rounded-2xl p-8 h-full">
                <p className="text-sm font-bold gradient-text-teal mb-4">{`0${i + 1}`}</p>
                <h3 className="text-xl font-semibold mb-3">{build.title}</h3>
                <p className="text-white/55 leading-relaxed text-sm">{build.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex items-start justify-center gap-3 text-center"
        >
          <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <p className="text-white/50 text-sm max-w-xl">
            No client names here, by design. We work quietly behind brands: your customers
            see you, not us. Discretion is part of the service.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Process: giant numeral anchors
function ProcessSection() {
  const steps = [
    {
      number: '01',
      name: 'Clarity',
      description:
        'We audit your business: what is working, what is leaking time and money, and where the biggest opportunities sit. No templates, no assumptions.',
    },
    {
      number: '02',
      name: 'Strategy',
      description:
        'A 90-day roadmap with specific goals, specific tactics, and clear success metrics. You know exactly what we are doing and why.',
    },
    {
      number: '03',
      name: 'Execution',
      description:
        'We build and implement alongside your team: campaigns, systems, and automation working together, not in silos.',
    },
    {
      number: '04',
      name: 'Optimization',
      description:
        'We measure against targets, scale what works, and kill what does not. Growth compounds; so does our work.',
    },
  ];

  return (
    <section id="process" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-royal-700/10 rounded-full blur-[180px]" />
      </div>
      <div className="container mx-auto max-w-6xl px-4 relative">
        <SectionHeading
          index="03"
          eyebrow="How We Work"
          title="Complex growth, simplified"
          subtitle="A proven four-phase cycle that turns ambitious goals into measurable results."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative glass rounded-2xl p-7 overflow-hidden"
            >
              <span
                aria-hidden
                className="absolute -top-5 -right-2 text-[7rem] leading-none font-bold text-white/[0.05] select-none pointer-events-none"
              >
                {step.number}
              </span>
              <p className="text-sm font-bold gradient-text-teal mb-16">{step.number}</p>
              <h3 className="text-xl font-semibold mb-3">{step.name}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why BLEUKEI
function WhySection() {
  const points = [
    {
      title: 'Builders, not just advisors',
      description:
        'We do not hand you a strategy deck and disappear. We build and run the systems: automation, tools, and infrastructure that keep working after the engagement.',
    },
    {
      title: 'Founder-led, every engagement',
      description:
        'You work directly with the founder. No account managers, no hand-offs to junior staff. The thinking that builds the strategy is the same presence that executes it.',
    },
    {
      title: 'AI-native by default',
      description:
        'Every system we build leverages AI where it actually helps: not as a buzzword, but as leverage that lets a small team operate like a big one.',
    },
    {
      title: 'Results-first, always measurable',
      description:
        'Clear baselines in week one. If we cannot tie a metric to revenue, leads, or time saved, we do not track it.',
    },
  ];

  const tools = ['Anthropic', 'OpenAI', 'Google', 'Meta', 'Shopify', 'Notion', 'Zapier', 'Cloudflare'];

  return (
    <section id="why" className="py-24 sm:py-32 relative">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeading
          index="04"
          eyebrow="Why BLEUKEI"
          title={
            <>
              Built different, <span className="gradient-text">on purpose</span>
            </>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="glass rounded-2xl p-8 h-full">
                <CheckCircle2 className="w-6 h-6 text-teal-400 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
                <p className="text-white/55 leading-relaxed">{point.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/30 mb-8">
            Tools We Build With
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {tools.map((tool) => (
              <span
                key={tool}
                className="text-lg font-semibold tracking-wide text-white/25 hover:text-white/50 transition-colors select-none"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


// Founder
function FounderSection() {
  return (
    <section id="founder" className="py-24 sm:py-32 relative">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-10 sm:p-14"
        >
          <div className="flex flex-col sm:flex-row gap-10 items-start">
            <div className="shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-royal-600 to-teal-500 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">NB</span>
              </div>
            </div>
            <div>
              <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] uppercase text-white/40 mb-4">
                <span className="text-teal-400/80">(BK·05)</span>
                <span>The Founder</span>
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
                Noa Berger
              </h2>
              <p className="text-white/60 leading-relaxed mb-4">
                Noa spent years in sports sponsorship brokerage watching how serious brands
                operate: the strategy, the systems, and the playbooks that make everything
                compound. BLEUKEI exists to bring that same infrastructure, plus the AI
                leverage big companies take for granted, to businesses that never had access
                to it.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                Every engagement is run by Noa directly. The person who builds your strategy
                is the person who executes it with you.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <a
                  href="https://noaberger.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors font-medium"
                >
                  More about Noa <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/noabberger/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors font-medium"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// FAQ
function FaqItem({ q, a, index, defaultOpen = false }: { q: string; a: string; index: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-6 text-left group"
        aria-expanded={open}
      >
        <span className="flex items-baseline gap-4">
          <span className="text-xs font-bold text-teal-400/70">{index}</span>
          <span className="font-medium text-lg text-white/90 group-hover:text-white transition-colors">
            {q}
          </span>
        </span>
        <Plus
          className={`w-5 h-5 shrink-0 text-teal-400 transition-transform duration-200 ${
            open ? 'rotate-45' : ''
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-9 text-white/55 leading-relaxed max-w-2xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FaqSection() {
  const faqs = [
    {
      q: 'How long does it take to see results?',
      a: 'Most clients see early indicators within 30 days: improved visibility, more leads, operational time savings. Meaningful revenue impact typically shows at 60 to 90 days as the systems compound. We set specific milestones upfront so you always know what to expect by when.',
    },
    {
      q: 'How is BLEUKEI different from a marketing agency?',
      a: 'Marketing agencies run campaigns. We build the underlying infrastructure that makes everything compound: operations, automation, visibility, and systems. The result is not just more leads; it is a business that runs better with less of your time.',
    },
    {
      q: 'What does the process actually look like?',
      a: 'Four phases: Clarity (we audit your business and identify the biggest opportunities), Strategy (a 90-day roadmap with specific goals and metrics), Execution (we implement alongside your team), and Optimization (we measure, iterate, and scale what works).',
    },
    {
      q: 'How much does it cost?',
      a: 'Every engagement is scoped to your needs, timeline, budget, and how hands-on you want us to be. Pricing is project-based rather than hourly, transparent, and tied to defined deliverables. You will leave your free call with a clear ballpark, not a sales pitch.',
    },
    {
      q: 'How do we get started?',
      a: 'Book a free 30-minute consultation. We talk about your business, your challenges, and whether we are a fit. No pitch, no pressure. If it makes sense to work together, we outline a proposal within a few days.',
    },
  ];

  return (
    <section id="faq" className="py-24 sm:py-32 relative">
      <div className="container mx-auto max-w-3xl px-4">
        <SectionHeading
          index="06"
          eyebrow="Questions"
          title="Answers, upfront"
        />
        <div className="border-t border-white/10">
          {faqs.map((faq, i) => (
            <FaqItem key={i} index={`0${i + 1}`} q={faq.q} a={faq.a} defaultOpen={i === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact
function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch('https://formspree.io/f/xqedgjon', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-teal-600/10 rounded-full blur-[180px]" />
      </div>
      <div className="container mx-auto max-w-5xl px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-white/70 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
            </span>
            Taking on select engagements
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">Ready to grow?</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto text-balance">
            Book a free consultation, or tell us about your project and we will respond within
            one business day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl p-8 h-full flex flex-col justify-between glow-royal">
              <div>
                <Calendar className="w-8 h-8 text-royal-400 mb-5" />
                <h3 className="text-2xl font-semibold mb-3">Book a free consultation</h3>
                <p className="text-white/60 leading-relaxed mb-8">
                  Thirty minutes, no pitch, no pressure. We talk about your business and
                  whether we are a fit.
                </p>
              </div>
              <Link
                href={BOOKING_URL}
                className="inline-flex items-center justify-center gap-2 bg-royal-600 hover:bg-royal-500 text-white font-semibold px-6 py-4 rounded-xl transition-colors"
              >
                <Calendar className="w-5 h-5" />
                Schedule a Call
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm text-white/60 mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-teal-500/60 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-white/60 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-teal-500/60 transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm text-white/60 mb-2">
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-teal-500/60 transition-colors"
                    placeholder="Your business"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-white/60 mb-2">
                    Tell us about your project
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-teal-500/60 transition-colors resize-none"
                    placeholder="What are you trying to grow, fix, or build?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3.5 rounded-xl hover:bg-white/90 transition-colors disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>

                {status === 'success' && (
                  <p className="flex items-center gap-2 text-teal-400 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Message sent. We will get back to you within one business day.
                  </p>
                )}
                {status === 'error' && (
                  <p className="flex items-center gap-2 text-royal-300 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    Something went wrong. Email us directly at hello@bleukei.com.
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="border-t border-white/10 py-14 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="text-lg font-bold tracking-wide">BLEUKEI</p>
            <p className="text-white/40 text-sm mt-1">Growth &amp; Operations Consultancy</p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="/about" className="text-white/50 hover:text-white transition-colors">
              About
            </a>
            <a href="/still-curious" className="text-white/50 hover:text-white transition-colors">
              FAQ
            </a>
            <a href="/privacy" className="text-white/50 hover:text-white transition-colors">
              Privacy
            </a>
            <a
              href="https://www.linkedin.com/in/noabberger/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-teal-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/noableu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-teal-400 transition-colors"
            >
              Instagram
            </a>
            <a
              href="mailto:hello@bleukei.com"
              className="text-white/50 hover:text-teal-400 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
        <p className="text-white/30 text-xs text-center sm:text-left mt-8">
          © {new Date().getFullYear()} BLEUKEI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// Main Page
export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <BuiltSection />
      <ProcessSection />
      <WhySection />
      <FounderSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
