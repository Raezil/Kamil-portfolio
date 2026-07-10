import { useEffect, useRef, useState } from 'react'
import './App.css'

const PROJECTS = [
  {
    index: '01',
    name: 'go-agent',
    type: 'AI agent framework',
    description:
      'A Go-native framework for building autonomous agents with orchestration, tool calling, memory, sessions, and multiple model providers as first-class primitives.',
    tags: ['Go', 'Agents', 'Tool calling'],
    href: 'https://github.com/Protocol-Lattice/go-agent',
    featured: true,
  },
  {
    index: '02',
    name: 'neo',
    type: 'Type-friendly RPC',
    description:
      'A procedure-oriented framework for Go backends with queries, mutations, subscriptions, middleware, typed clients, and code generation.',
    tags: ['Go', 'RPC', 'WebSocket'],
    href: 'https://github.com/Protocol-Lattice/neo',
    featured: true,
  },
  {
    index: '03',
    name: 'go-harness',
    type: 'Agentic development runtime',
    description:
      'A controllable coding-agent harness with approval-gated execution, task graphs, work queues, validation, and multi-agent workflows.',
    tags: ['Go', 'AI tooling', 'Automation'],
    href: 'https://github.com/Protocol-Lattice/go-harness',
    featured: true,
  },
  {
    index: '04',
    name: 'go-utcp',
    type: 'Universal tool protocol',
    description:
      'The Go SDK for a transport-agnostic protocol that lets agents discover and call tools through HTTP, SSE, WebSocket, gRPC, CLI, and more.',
    tags: ['Go', 'Protocols', 'Interoperability'],
    href: 'https://github.com/universal-tool-calling-protocol/go-utcp',
    featured: false,
  },
  {
    index: '05',
    name: 'GoEventBus',
    type: 'Event-driven infrastructure',
    description:
      'A compact event bus for concurrent Go applications, designed around predictable dispatch, extensible transports, and straightforward APIs.',
    tags: ['Go', 'Concurrency', 'Messaging'],
    href: 'https://github.com/Protocol-Lattice/GoEventBus',
    featured: false,
  },
  {
    index: '06',
    name: 'memoryArena',
    type: 'Allocation toolkit',
    description:
      'A family of typed arena allocators for performance-sensitive Go workloads, including concurrent and pooled variants.',
    tags: ['Go', 'Performance', 'Memory'],
    href: 'https://github.com/Protocol-Lattice/memoryArena',
    featured: false,
  },
]

const EXPERIENCE = [
  {
    period: 'Now',
    company: 'Protocol Lattice',
    role: 'Founder · Open-source engineer',
    description:
      'Designing and maintaining Go infrastructure for AI agents, typed backends, event-driven systems, and developer tooling.',
  },
  {
    period: '2022',
    company: 'EPAM Systems',
    role: 'Software engineer',
    description:
      'Maintained enterprise backend systems, improved APIs, and contributed to performance-focused application work.',
  },
  {
    period: '2021–22',
    company: 'intive',
    role: 'Software engineer',
    description:
      'Built Go services and test suites for production web applications in a collaborative engineering environment.',
  },
  {
    period: '2021',
    company: 'Monterail',
    role: 'Software engineer',
    description:
      'Developed GraphQL APIs and product features across backend and web application boundaries.',
  },
]

const CAPABILITIES = [
  ['Backend systems', 'Go, gRPC, GraphQL, REST, WebSocket'],
  ['Distributed architecture', 'Event-driven systems, microservices, messaging'],
  ['AI infrastructure', 'Agents, tool protocols, RAG, model providers'],
  ['Platform engineering', 'Docker, Kubernetes, CI/CD, observability'],
]

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  )
}

function MenuIcon({ open }) {
  return (
    <span className={`menu-icon ${open ? 'is-open' : ''}`} aria-hidden="true">
      <span />
      <span />
    </span>
  )
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Kamil Mościszko — home" onClick={closeMenu}>
        <span className="brand-glyph">KM</span>
        <span className="brand-copy">
          <strong>Kamil Mościszko</strong>
          <small>Go systems · AI infrastructure</small>
        </span>
      </a>

      <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
        <a href="#work" onClick={closeMenu}>Work</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#experience" onClick={closeMenu}>Experience</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
        <a
          className="nav-social"
          href="https://github.com/Raezil"
          target="_blank"
          rel="noreferrer"
          onClick={closeMenu}
        >
          GitHub <ArrowUpRight />
        </a>
      </nav>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        <MenuIcon open={menuOpen} />
      </button>
    </header>
  )
}

function NetworkVisual() {
  return (
    <div className="network-visual" aria-hidden="true">
      <div className="network-grid" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="network-node node-core"><span>Go</span></div>
      <div className="network-node node-agent"><span>agent</span></div>
      <div className="network-node node-tool"><span>tool</span></div>
      <div className="network-node node-event"><span>event</span></div>
      <div className="network-node node-api"><span>API</span></div>
      <div className="network-line line-one" />
      <div className="network-line line-two" />
      <div className="network-line line-three" />
      <div className="network-line line-four" />
      <div className="visual-caption">
        <span className="status-dot" />
        building reliable connections
      </div>
    </div>
  )
}

function Hero() {
  return (
    <main id="top">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span /> Senior Go engineer · Open source</div>
          <h1 id="hero-title">
            Infrastructure for
            <span>software that thinks.</span>
          </h1>
          <p className="hero-intro">
            I design Go systems, AI-agent infrastructure, and developer tools with an emphasis on
            clear APIs, predictable concurrency, and production-ready architecture.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore selected work</a>
            <a
              className="button button-secondary"
              href="https://github.com/Raezil"
              target="_blank"
              rel="noreferrer"
            >
              View GitHub <ArrowUpRight />
            </a>
          </div>
          <dl className="hero-facts">
            <div><dt>Focus</dt><dd>Go · AI · distributed systems</dd></div>
            <div><dt>Building</dt><dd>Protocol Lattice</dd></div>
            <div><dt>Based in</dt><dd>Poland · Remote Europe</dd></div>
          </dl>
        </div>
        <NetworkVisual />
      </section>
    </main>
  )
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <p className="section-eyebrow">{eyebrow}</p>
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  )
}

function ProjectCard({ project, delay }) {
  return (
    <Reveal className={`project-card ${project.featured ? 'project-featured' : ''}`} delay={delay}>
      <a href={project.href} target="_blank" rel="noreferrer" aria-label={`${project.name} on GitHub`}>
        <div className="project-topline">
          <span>{project.index}</span>
          <ArrowUpRight />
        </div>
        <div className="project-content">
          <p className="project-type">{project.type}</p>
          <h3>{project.name}</h3>
          <p className="project-description">{project.description}</p>
        </div>
        <ul className="tag-list" aria-label="Technologies">
          {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      </a>
    </Reveal>
  )
}

function Work() {
  return (
    <section className="section shell" id="work">
      <Reveal>
        <SectionHeading
          eyebrow="01 · Selected work"
          title="Open infrastructure, built in public."
          description="Frameworks and foundational libraries for agents, backends, protocols, and high-performance Go applications."
        />
      </Reveal>
      <div className="project-grid">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.name} project={project} delay={(index % 3) * 70} />
        ))}
      </div>
      <Reveal className="section-footer-link">
        <a href="https://github.com/orgs/Protocol-Lattice/repositories" target="_blank" rel="noreferrer">
          Browse all Protocol Lattice repositories <ArrowUpRight />
        </a>
      </Reveal>
    </section>
  )
}

function About() {
  return (
    <section className="section section-muted" id="about">
      <div className="shell">
        <Reveal>
          <SectionHeading eyebrow="02 · Approach" title="Make the complex feel obvious." />
        </Reveal>
        <div className="about-grid">
          <Reveal className="about-statement">
            <p>
              I work at the layer where architecture becomes an API: turning concurrency,
              distributed communication, and agent orchestration into tools other developers can
              understand and trust.
            </p>
          </Reveal>
          <div className="capability-list">
            {CAPABILITIES.map(([title, detail], index) => (
              <Reveal className="capability-row" key={title} delay={index * 60}>
                <span>0{index + 1}</span>
                <div><h3>{title}</h3><p>{detail}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section shell" id="experience">
      <Reveal>
        <SectionHeading
          eyebrow="03 · Experience"
          title="Backend engineering with a product mindset."
          description="Experience across open-source infrastructure, enterprise systems, APIs, and production web platforms."
        />
      </Reveal>
      <div className="experience-list">
        {EXPERIENCE.map((item, index) => (
          <Reveal className="experience-row" key={`${item.company}-${item.period}`} delay={index * 60}>
            <p className="experience-period">{item.period}</p>
            <div className="experience-title"><h3>{item.company}</h3><p>{item.role}</p></div>
            <p className="experience-description">{item.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="shell contact-grid">
        <Reveal>
          <p className="section-eyebrow">04 · Contact</p>
          <h2>Let’s build dependable infrastructure.</h2>
        </Reveal>
        <Reveal className="contact-panel" delay={90}>
          <p>
            Available for conversations about Go backend engineering, AI infrastructure,
            open-source collaboration, and developer tooling.
          </p>
          <div className="contact-actions">
            <a className="button button-light" href="mailto:kmosc@protonmail.com">kmosc@protonmail.com</a>
            <a className="text-link" href="https://www.linkedin.com/in/kamilm97" target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight />
            </a>
          </div>
        </Reveal>
      </div>
      <footer className="shell site-footer">
        <p>© {new Date().getFullYear()} Kamil Mościszko</p>
        <p>Designed for clarity. Built with React.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  )
}

export default function App() {
  return (
    <div className="page">
      <a className="skip-link" href="#work">Skip to selected work</a>
      <Header />
      <Hero />
      <Work />
      <About />
      <Experience />
      <Contact />
    </div>
  )
}
