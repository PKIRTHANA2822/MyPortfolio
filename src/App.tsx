import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Check,
  Download,
  FileText,
  Github,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  Network,
  Sparkles,
  Sun,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const projects = [
  {
    number: '01',
    title: 'Immersive CPR\nTraining System',
    type: 'Interactive learning experience',
    description:
      'A responsive CPR simulator that turns critical procedures into clear, confident action through realistic scenarios and feedback.',
    tags: ['Unity 3D', 'C#', 'Simulation'],
    tone: 'sky',
    icon: BrainCircuit,
  },
  {
    number: '02',
    title: 'Credit Rating\nClassification',
    type: 'Machine learning study',
    description:
      'A credit-risk model comparing Logistic Regression, Random Forest, XGBoost and SMOTE, reaching roughly 84% accuracy with ROC-AUC evaluation.',
    tags: ['Python', 'Pandas', 'XGBoost'],
    tone: 'lime',
    icon: BarChart3,
  },
  {
    number: '03',
    title: 'Fraud\nDetection',
    type: 'Data intelligence project',
    description:
      'An interpretable fraud detection workflow shaped by thoughtful feature encoding, careful evaluation and a focus on real-world signals.',
    tags: ['Python', 'EDA', 'Scikit-learn'],
    tone: 'coral',
    icon: Network,
  },
];

const skills = ['Python', 'SQL', 'Power BI', 'Tableau', 'Pandas', 'Matplotlib', 'Seaborn', 'AWS', 'Java'];

function getInitialTheme(): 'dark' | 'light' {
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') return attr;
  }
  return 'dark';
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch { /* ignore */ }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <main className="site-shell">
      <nav className="nav wrap" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Kirthana home">
          <span className="brand-mark">KP</span>
          <span>Kirthana P</span>
        </a>
        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a className="nav-resume" href="/Kirthana_P_Resume.pdf" download="Kirthana_P_Resume.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
            Resume <Download size={14} />
          </a>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode" aria-pressed={theme === 'dark'}>
            <span className="toggle-track">
              <Moon size={13} />
              <Sun size={13} />
            </span>
            <span className="toggle-thumb" />
          </button>
          <a className="nav-cta" href="mailto:kirthanirama14@gmail.com">Let’s talk <ArrowUpRight size={15} /></a>
        </div>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      <section className="hero wrap" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> AI content creator · data storyteller</div>
          <h1>Making data<br /><em>feel human.</em></h1>
          <p className="hero-intro">I’m Kirthana, an aspiring data scientist who turns complex ideas into clear stories, useful tools and experiences people remember.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">See my work <ArrowDownRight size={17} /></a>
            <a className="button button-outline" href="/Kirthana_P_Resume.pdf" download="Kirthana_P_Resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume <Download size={16} />
            </a>
            <a className="text-link" href="mailto:kirthanirama14@gmail.com">Start a conversation <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="hero-art" aria-label="Abstract data visualization">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="orbital-core">
            <Sparkles size={30} strokeWidth={1.4} className="sparkle-icon" />
            <span>ideas<br />in motion</span>
          </div>

          <div className="orbit-track track-one">
            <div className="data-chip chip-one"><span className="chip-line" /> clarity</div>
          </div>

          <div className="orbit-track track-two">
            <div className="data-chip chip-two">+84% <span>model accuracy</span></div>
          </div>

          <div className="orbit-track track-three">
            <div className="data-chip chip-three"><span className="chip-pulse" /> curious</div>
          </div>

          <div className="hero-grid" />
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track"><span>Curious by nature</span><i>✦</i><span>Precise by practice</span><i>✦</i><span>Creative by default</span><i>✦</i><span>Curious by nature</span><i>✦</i><span>Precise by practice</span><i>✦</i></div>
      </div>

      <section className="work-section wrap" id="work">
        <div className="section-heading">
          <div><span className="section-kicker">Selected work</span><h2>Small projects,<br /><em>big questions.</em></h2></div>
          <p>Three ways I like to explore the space where technology, people and possibility meet.</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <article className={`project-card ${project.tone}`} key={project.number}>
                <div className="card-top"><span>{project.number}</span><ArrowUpRight size={19} /></div>
                <div className="project-visual"><Icon size={48} strokeWidth={1.2} /><div className="visual-rings" /></div>
                <div className="project-copy"><span className="project-type">{project.type}</span><h3>{project.title.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="experience-section wrap" id="experience">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Work Experience</span>
            <h2>Where ideas<br /><em>meet execution.</em></h2>
          </div>
          <p>Professional engineering, interactive systems, and hands-on industry experience.</p>
        </div>

        <div className="experience-list">
          <div className="experience-card featured">
            <div className="exp-badge">Current Position</div>
            <div className="exp-header">
              <div className="exp-title-block">
                <h3>Digifox Studio</h3>
                <span className="exp-role">Software & Immersive Developer</span>
              </div>
              <div className="exp-meta">
                <span className="exp-period">May 2026 — Present</span>
                <span className="exp-type">Industry Experience</span>
              </div>
            </div>
            <p className="exp-desc">
              Developing interactive simulation systems, spatial applications, and data-driven client-server workflows connecting modern interfaces with robust logic.
            </p>
            <div className="tag-row">
              <span>Simulation Systems</span>
              <span>Interactive UI</span>
              <span>Unity 3D / C#</span>
              <span>Full-Stack & APIs</span>
              <span>Data Intelligence</span>
            </div>
          </div>

          <div className="internship-grid">
            <div className="internship-card">
              <span className="intern-period">6 Months</span>
              <h4>Netzwerk Academy</h4>
              <p>Data Science & Machine Learning</p>
            </div>
            <div className="internship-card">
              <span className="intern-period">1 Month</span>
              <h4>Cavin InfoTech</h4>
              <p>Unity Development & Interactive Systems</p>
            </div>
            <div className="internship-card">
              <span className="intern-period">14 Days</span>
              <h4>Syscorp Technologies</h4>
              <p>Web Development & Frontend Architecture</p>
            </div>
            <div className="internship-card">
              <span className="intern-period">1 Month</span>
              <h4>Fintech Point</h4>
              <p>Front-end Development & UI Engineering</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="wrap about-layout">
          <div className="about-stamp"><span>KP</span><div className="stamp-ring">DATA · STORIES · SYSTEMS · DATA · STORIES · SYSTEMS · </div></div>
          <div className="about-copy">
            <span className="section-kicker">A little about me</span>
            <h2>Part analyst.<br /><em>Part maker.</em></h2>
            <p>I enjoy the part of technology that lives between the numbers and the people. Whether I’m building a learning simulation, exploring a dataset or shaping a presentation, I’m always looking for the clearest, most thoughtful way to make an idea land.</p>
            <p>Currently building my foundation in computer science and engineering at CK College of Engineering and Technology, and looking for meaningful opportunities to learn, contribute and create.</p>
            <p>I’ve also explored data science, UI development, front-end work, blockchain and fintech through five internships, including Netwrek Academy, Cavin InfoTech and Syscorp Technologies.</p>
            <div className="about-facts">
              <div><strong>2021—2025</strong><span>B.E. Computer Science<br />& Engineering</span></div>
              <div><strong>5 internships</strong><span>Data science · UI · Front-end</span></div>
              <div><strong>Based in</strong><span>India · open to ideas</span></div>
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
              <a className="button button-outline" href="/Kirthana_P_Resume.pdf" download="Kirthana_P_Resume.pdf" target="_blank" rel="noopener noreferrer">
                Download Resume <Download size={15} />
              </a>
              <a className="text-link" href="mailto:kirthanirama14@gmail.com">Say hello <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="toolkit-section wrap">
        <div className="toolkit-head"><span className="section-kicker">My toolkit</span><h2>Tools for turning<br /><em>thought into form.</em></h2></div>
        <div className="toolkit-content"><div className="skill-cloud">{skills.map((skill, index) => <span className={`skill skill-${index % 4}`} key={skill}>{skill}</span>)}</div><div className="toolkit-note"><MessageCircle size={22} /><p>“The best work happens when technical detail meets a little imagination.”</p><span>— Kirthana</span></div></div>
      </section>

      <footer className="footer wrap" id="contact">
        <div className="footer-prompt">
          <span className="section-kicker">Have a question or an idea?</span>
          <h2>Let’s make it<br /><em>worth exploring.</em></h2>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
            <a className="button button-dark" href="mailto:kirthanirama14@gmail.com">Get in touch <ArrowUpRight size={17} /></a>
            <a className="button button-outline" href="/Kirthana_P_Resume.pdf" download="Kirthana_P_Resume.pdf" target="_blank" rel="noopener noreferrer">
              Download Resume <Download size={16} />
            </a>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2025 Kirthana P</span><div className="socials"><a href="mailto:kirthanirama14@gmail.com" aria-label="Email"><Mail size={17} /></a><a href="https://www.linkedin.com/in/kirthana-p-4282b9304/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a><a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a></div><span>Made with curiosity <Check size={15} /></span></div>
      </footer>
    </main>
  );
}

export default App;
