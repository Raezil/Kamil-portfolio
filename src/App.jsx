import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Lattice from './Lattice'
import Thread from './Thread'
import './App.css'

const PROJECTS = [
  {
    id: '01',
    name: 'neo',
    tag: 'rpc framework · protocol-lattice/neo',
    desc: 'A tRPC-style RPC framework for Go — typed errors, HTTP method enforcement, WebSocket support with leak-safe goroutine handling, and a hardened server builder with graceful shutdown built in from the start.',
    stack: ['Go', 'RPC', 'WebSocket'],
    url: 'https://github.com/protocol-Lattice/neo',
  },
  {
    id: '02',
    name: 'go-harness',
    tag: 'agentic coding harness · protocol-lattice/go-harness',
    desc: 'An agentic coding harness built around a UTCP CLI provider system — approval-gated execution loop, task queue runtime, and slash commands for structured, controllable AI-assisted development.',
    stack: ['Go', 'UTCP', 'Agent Tooling'],
    url: 'https://github.com/protocol-Lattice/go-harness',
  },
  {
    id: '03',
    name: 'go-agent',
    tag: 'agent framework',
    desc: 'Framework for building autonomous AI agents in Go — orchestration, tool-calling, and memory as first-class primitives rather than bolted-on middleware.',
    stack: ['Go', 'Concurrency', 'Agent Orchestration'],
  },
  {
    id: '04',
    name: 'UTCP',
    tag: 'protocol · go-utcp · rs-utcp',
    desc: 'Universal Tool Calling Protocol — a cross-language standard for structured communication between AI agents and tools. Multiple transports, pluggable providers, CodeMode execution.',
    stack: ['Go', 'Rust', 'Protocol Design'],
  },
  {
    id: '05',
    name: 'GoEventBus',
    tag: 'event bus',
    desc: 'Lightweight, high-performance event bus for Go, built for low-latency dispatch under real concurrent load.',
    stack: ['Go', 'Concurrency', 'Event-Driven'],
  },
  {
    id: '06',
    name: 'grpc_graphql_gateway',
    tag: 'rust plugin',
    desc: 'A Rust plugin that transforms gRPC services into GraphQL — interoperability at the protocol boundary, not the application layer.',
    stack: ['Rust', 'gRPC', 'GraphQL'],
  },
  {
    id: '07',
    name: 'Thunder',
    tag: 'backend framework',
    desc: 'Minimalist backend framework that transforms gRPC services into both REST and GraphQL from a single definition.',
    stack: ['Go', 'gRPC', 'REST'],
  },
]

const EXPERIENCE = [
  {
    org: 'Protocol Lattice',
    role: 'Founder / Open Source Developer',
    period: 'Ongoing',
    detail:
      'Founded and maintain an open-source ecosystem for Go-based backend systems, AI agents, and developer tooling. Design modular libraries for distributed and event-driven architectures; apply Go concurrency patterns for low-latency, scalable solutions.',
  },
  {
    org: 'Universal Tool Calling Protocol',
    role: 'Contributor',
    period: 'Ongoing',
    detail:
      'Contributed to a cross-language standard for structured communication between AI agents and tools, working across the Go and Rust implementations plus transport and provider layers.',
  },
  {
    org: 'EPAM Systems',
    role: 'Software Engineer',
    period: 'Jun 2022 – Sep 2022',
    detail: 'Enhanced and maintained a Ruby on Rails backend for enterprise clients, contributing to API design and performance tuning.',
  },
  {
    org: 'intive',
    role: 'Junior Software Engineer',
    period: 'Nov 2021 – May 2022',
    detail: 'Developed Golang services and unit tests for web-scale applications.',
  },
  {
    org: 'Monterail',
    role: 'Junior Software Engineer',
    period: 'May 2021 – Sep 2021',
    detail: 'Designed and maintained GraphQL APIs and web application features.',
  },
]

const STACK_GROUPS = [
  { label: 'Languages', items: ['Go', 'Rust', 'Ruby'] },
  { label: 'Protocols', items: ['gRPC', 'GraphQL', 'REST'] },
  { label: 'Frameworks', items: ['Gin', 'Prisma', 'Ruby on Rails', 'Sidekiq', 'Spec'] },
  { label: 'Infra', items: ['Docker', 'Kubernetes', 'CI/CD', 'MinIO'] },
  { label: 'Data', items: ['PostgreSQL', 'MySQL', 'NoSQL'] },
  { label: 'AI Tools', items: ['Claude Code', 'Codex', 'Google Antigravity', 'Gemini CLI'] },
]

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function Header() {
  return (
    <header className="site-header">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true" />
        Kamil Mościszko
      </div>
      <nav className="site-nav">
        <a href="#work">Work</a>
        <a href="#stack">Stack</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
      </nav>
      <a href="mailto:kmosc@protonmail.com" className="nav-cta">
        kmosc@protonmail.com
      </a>
    </header>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 500], [1, 0])
  const y = useTransform(scrollY, [0, 500], [0, 60])

  return (
    <section className="hero">
      <Lattice className="hero-canvas" />
      <div className="hero-scrim" aria-hidden="true" />
      <motion.div className="hero-content" style={{ opacity, y }}>
        <p className="hero-eyebrow">Protocol-Lattice · github.com/raezil</p>
        <h1 className="hero-title">
          Building the wire
          <br />
          machines talk on.
        </h1>
        <p className="hero-sub">
          Open-source Go developer specializing in high-performance backend systems,
          microservices, and event-driven architectures — with a growing focus on
          protocols for AI agents and tool-calling.
        </p>
        <div className="hero-actions">
          <a href="#work" className="btn-primary">
            See the work
          </a>
          <a href="https://github.com/raezil" target="_blank" rel="noreferrer" className="btn-ghost">
            @raezil on GitHub
          </a>
        </div>
      </motion.div>
      <div className="hero-scroll-cue" aria-hidden="true">
        <span />
        scroll
      </div>
    </section>
  )
}

function SectionLabel({ index, title }) {
  return (
    <div className="section-label">
      <span className="section-index">{index}</span>
      <span className="section-line" aria-hidden="true" />
      <span className="section-title">{title}</span>
    </div>
  )
}

function Profile() {
  return (
    <section className="profile" id="about">
      <Reveal>
        <SectionLabel index="§1" title="Profile" />
      </Reveal>
      <Reveal delay={80}>
        <p className="profile-text">
          A strong advocate of simplicity, performance, and clean architecture — designing
          developer tools and frameworks with a focus on concurrency, reliability, and
          extensibility. Experienced in building and maintaining scalable services using
          Go, gRPC, and GraphQL. Interested in AI-integrated systems and autonomous agents,
          and in the protocols that let them talk to each other reliably.
        </p>
      </Reveal>
    </section>
  )
}

function Projects() {
  return (
    <section className="projects" id="work">
      <Reveal>
        <SectionLabel index="§2" title="Key Projects" />
      </Reveal>
      <div className="project-list">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} delay={i * 70} className="project-row-wrap">
            <article className="project-row">
              <span className="project-id">{p.id}</span>
              <div className="project-body">
                <div className="project-heading">
                  <h3>
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noreferrer" className="project-link">
                        {p.name}
                      </a>
                    ) : (
                      p.name
                    )}
                  </h3>
                  <span className="project-tag">{p.tag}</span>
                </div>
                <p>{p.desc}</p>
                <ul className="project-stack">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function ThreadDivider({ seed }) {
  return (
    <div className="thread-divider" aria-hidden="true">
      <Thread seed={seed} className="thread-canvas" />
    </div>
  )
}

function Stack() {
  return (
    <section className="stack" id="stack">
      <Reveal>
        <SectionLabel index="§3" title="Core Competencies" />
      </Reveal>
      <div className="stack-grid">
        {STACK_GROUPS.map((g, i) => (
          <Reveal key={g.label} delay={i * 60} className="stack-group">
            <h4>{g.label}</h4>
            <ul>
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="experience" id="experience">
      <Reveal>
        <SectionLabel index="§4" title="Professional Experience" />
      </Reveal>
      <div className="timeline">
        {EXPERIENCE.map((e, i) => (
          <Reveal key={e.org} delay={i * 70} className="timeline-row-wrap">
            <div className="timeline-row">
              <div className="timeline-period">{e.period}</div>
              <div className="timeline-main">
                <div className="timeline-heading">
                  <h3>{e.org}</h3>
                  <span>{e.role}</span>
                </div>
                <p>{e.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <Reveal>
        <SectionLabel index="§5" title="Get in touch" />
      </Reveal>
      <Reveal delay={80}>
        <h2 className="contact-title">Open to backend &amp; AI-infra collaborations.</h2>
      </Reveal>
      <Reveal delay={140}>
        <div className="contact-links">
          <a href="mailto:kmosc@protonmail.com" className="btn-primary">
            kmosc@protonmail.com
          </a>
          <a href="tel:+48575044972" className="btn-ghost">
            +48 575 044 972
          </a>
          <a href="https://github.com/raezil" target="_blank" rel="noreferrer" className="btn-ghost">
            github.com/raezil
          </a>
        </div>
      </Reveal>
      <p className="footer-note">Protocol-Lattice — Szczecin, Poland</p>
    </section>
  )
}

export default function App() {
  return (
    <div className="page">
      <Header />
      <Hero />
      <Profile />
      <ThreadDivider seed={0} />
      <Projects />
      <ThreadDivider seed={2.1} />
      <Stack />
      <ThreadDivider seed={4.4} />
      <Experience />
      <Contact />
    </div>
  )
}
