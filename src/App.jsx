import { useEffect, useRef, useState } from 'react'
import './App.css'

const SERVICES = [
  {
    number: '01',
    title: 'Backend architecture',
    description:
      'Design and evolve Go services, APIs, event-driven systems, and distributed workflows that remain understandable as they scale.',
    capabilities: ['System design', 'gRPC & GraphQL', 'Concurrency', 'Performance'],
  },
  {
    number: '02',
    title: 'AI infrastructure',
    description:
      'Build agent runtimes, model-provider integrations, tool-calling layers, RAG pipelines, and the protocols connecting them.',
    capabilities: ['Agent orchestration', 'Tool protocols', 'RAG', 'LLM providers'],
  },
  {
    number: '03',
    title: 'Developer platforms',
    description:
      'Turn complex engineering workflows into focused frameworks, CLIs, SDKs, and automation that teams can use confidently.',
    capabilities: ['SDKs & frameworks', 'CLI tooling', 'CI/CD', 'Open source'],
  },
]

const PROJECTS = [
  {
    number: '01',
    name: 'go-agent',
    type: 'AI agent framework',
    description:
      'A Go-native framework for autonomous agents with orchestration, tool calling, sessions, memory, and multiple model providers.',
    tags: ['Go', 'Agents', 'Tool calling'],
    href: 'https://github.com/Protocol-Lattice/go-agent',
  },
  {
    number: '02',
    name: 'neo',
    type: 'Type-friendly RPC',
    description:
      'A procedure-oriented backend framework with queries, mutations, subscriptions, middleware, typed clients, and code generation.',
    tags: ['Go', 'RPC', 'WebSocket'],
    href: 'https://github.com/Protocol-Lattice/neo',
  },
  {
    number: '03',
    name: 'go-harness',
    type: 'Agentic development runtime',
    description:
      'A controllable coding-agent harness with approval gates, task graphs, work queues, validation, and multi-agent workflows.',
    tags: ['Go', 'AI tooling', 'Automation'],
    href: 'https://github.com/Protocol-Lattice/go-harness',
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

const PROCESS = [
  ['Discover', 'Clarify the outcome, constraints, risks, and definition of done.'],
  ['Design', 'Create the smallest architecture that solves the real problem cleanly.'],
  ['Deliver', 'Implement in visible increments with tests, review, and practical documentation.'],
  ['Transfer', 'Leave the system understandable, maintainable, and owned by the team.'],
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
      { rootMargin: '0px 0px -7% 0px', threshold: 0.08 },
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
        <a href="#services" onClick={closeMenu}>Services</a>
        <a href="#work" onClick={closeMenu}>Work</a>
        <a href="#about" onClick={closeMenu}>Approach</a>
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

function HeroVisual() {
  return (
    <div className="hero-visual vibe-visual" aria-hidden="true">
      <div className="vibe-grid" />
      <div className="vibe-glow vibe-glow-primary" />
      <div className="vibe-glow vibe-glow-secondary" />
      <div className="vibe-orbit vibe-orbit-outer"><span /></div>
      <div className="vibe-orbit vibe-orbit-middle"><span /></div>
      <div className="vibe-orbit vibe-orbit-inner"><span /></div>
      <div className="vibe-beam vibe-beam-one" />
      <div className="vibe-beam vibe-beam-two" />
      <div className="vibe-core">
        <small>Protocol Lattice</small>
        <strong>Go</strong>
        <span>systems in motion</span>
      </div>
      <div className="vibe-chip vibe-chip-agent"><i /> agents</div>
      <div className="vibe-chip vibe-chip-events"><i /> events</div>
      <div className="vibe-chip vibe-chip-api"><i /> APIs</div>
      <div className="vibe-chip vibe-chip-tools"><i /> tools</div>
      <div className="vibe-signal vibe-signal-one" />
      <div className="vibe-signal vibe-signal-two" />
      <div className="vibe-signal vibe-signal-three" />
      <div className="hero-visual-label hero-visual-label-bottom">
        Go · agents · services
      </div>
    </div>
  )
}

function Hero() {
  return (
    <main id="top">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span /> Senior Go engineer · Open source builder</div>
          <h1 id="hero-title">
            Complex systems.
            <span>Clear engineering.</span>
          </h1>
          <p className="hero-intro">
            I help teams design and deliver dependable Go backends, AI-agent infrastructure, and
            developer platforms—without unnecessary architecture or opaque abstractions.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#services">Explore services</a>
            <a className="button button-secondary" href="mailto:kmosc@protonmail.com?subject=Project%20inquiry">
              Discuss a project <ArrowUpRight />
            </a>
          </div>
          <dl className="hero-facts">
            <div><dt>Specialism</dt><dd>Go · AI · distributed systems</dd></div>
            <div><dt>Engagement</dt><dd>Architecture · delivery · review</dd></div>
            <div><dt>Location</dt><dd>Poland · Remote Europe</dd></div>
          </dl>
        </div>
        <HeroVisual />
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

function Services() {
  return (
    <section className="section shell" id="services">
      <Reveal>
        <SectionHeading
          eyebrow="01 · Services"
          title="Senior engineering where the architecture matters."
          description="Focused help for teams building backend infrastructure, AI products, and developer-facing platforms."
        />
      </Reveal>
      <div className="service-grid">
        {SERVICES.map((service, index) => (
          <Reveal className="service-card" key={service.title} delay={index * 70}>
            <div className="service-number">{service.number}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <ul>
              {service.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Work() {
  return (
    <section className="section section-muted" id="work">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="02 · Selected work"
            title="Proof through open-source systems."
            description="Projects that demonstrate the same principles used in client work: direct APIs, deliberate tradeoffs, and maintainable implementation."
          />
        </Reveal>
        <div className="project-list">
          {PROJECTS.map((project, index) => (
            <Reveal className="project-row" key={project.name} delay={index * 55}>
              <a href={project.href} target="_blank" rel="noreferrer" aria-label={`${project.name} on GitHub`}>
                <span className="project-number">{project.number}</span>
                <div className="project-title">
                  <p>{project.type}</p>
                  <h3>{project.name}</h3>
                </div>
                <p className="project-description">{project.description}</p>
                <ul className="tag-list" aria-label="Technologies">
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <span className="project-arrow"><ArrowUpRight /></span>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal className="section-footer-link">
          <a href="https://github.com/orgs/Protocol-Lattice/repositories" target="_blank" rel="noreferrer">
            Browse all Protocol Lattice repositories <ArrowUpRight />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section shell" id="about">
      <Reveal>
        <SectionHeading
          eyebrow="03 · Approach"
          title="Small feedback loops. Durable outcomes."
          description="The goal is not simply to ship code. It is to leave behind a system the team can understand, operate, and extend."
        />
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-statement">
          <p>
            I work at the layer where architecture becomes an API—turning concurrency,
            distributed communication, and agent orchestration into tools developers can trust.
          </p>
          <a className="text-link" href="https://github.com/Raezil" target="_blank" rel="noreferrer">
            See the engineering in public <ArrowUpRight />
          </a>
        </Reveal>
        <div className="process-list">
          {PROCESS.map(([title, description], index) => (
            <Reveal className="process-row" key={title} delay={index * 55}>
              <span>0{index + 1}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section section-muted" id="experience">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="04 · Experience"
            title="Backend engineering with a product mindset."
            description="Experience across open-source infrastructure, enterprise systems, APIs, and production web platforms."
          />
        </Reveal>
        <div className="experience-list">
          {EXPERIENCE.map((item, index) => (
            <Reveal className="experience-row" key={`${item.company}-${item.period}`} delay={index * 55}>
              <p className="experience-period">{item.period}</p>
              <div className="experience-title"><h3>{item.company}</h3><p>{item.role}</p></div>
              <p className="experience-description">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="shell contact-grid">
        <Reveal>
          <p className="section-eyebrow">05 · Contact</p>
          <h2>Bring the difficult system problem.</h2>
        </Reveal>
        <Reveal className="contact-panel" delay={90}>
          <p>
            Share the outcome you need, the constraints you are facing, and where the current
            system is getting in the way. I will reply with the most sensible next step.
          </p>
          <div className="contact-actions">
            <a className="button button-light" href="mailto:kmosc@protonmail.com?subject=Engineering%20project%20inquiry">
              Start a conversation
            </a>
            <a className="text-link" href="https://www.linkedin.com/in/kamilm97" target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight />
            </a>
          </div>
        </Reveal>
      </div>
      <footer className="shell site-footer">
        <p>© {new Date().getFullYear()} Kamil Mościszko</p>
        <p>Go systems · AI infrastructure · developer platforms</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  )
}

export default function App() {
  return (
    <div className="page">
      <a className="skip-link" href="#services">Skip to services</a>
      <Header />
      <Hero />
      <Services />
      <Work />
      <About />
      <Experience />
      <Contact />
    </div>
  )
}
