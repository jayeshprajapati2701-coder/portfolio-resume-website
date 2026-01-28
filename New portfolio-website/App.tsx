
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Mail, 
  Github, 
  Linkedin, 
  MapPin, 
  ChevronRight, 
  Download, 
  Code,
  Database,
  LineChart,
  BrainCircuit,
  Terminal,
  FileText,
  Copy,
  Check,
  ArrowUp
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { RESUME_DATA, SKILL_CATEGORIES, PROJECTS, EDUCATION, COURSEWORK } from './constants';
import Section from './components/Section';
import ProjectCard from './components/ProjectCard';

const SkillChart = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Ensures Recharts only renders on the client after initial mount
    setIsMounted(true);
  }, []);

  const data = [
    { name: 'Python', level: 95, color: '#0ea5e9' },
    { name: 'SQL', level: 85, color: '#0284c7' },
    { name: 'Pandas/NumPy', level: 90, color: '#0369a1' },
    { name: 'Matplotlib', level: 88, color: '#0c4a6e' },
    { name: 'Java/C++', level: 80, color: '#0ea5e9' },
  ];

  if (!isMounted) return <div className="h-64 w-full bg-slate-100/50 animate-pulse rounded-xl" />;

  return (
    <div className="h-64 w-full" style={{ minHeight: '256px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 30, top: 0, bottom: 0 }}>
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={100} 
            tick={{ fontSize: 12, fontWeight: 500, fill: '#475569' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(14, 165, 233, 0.05)' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="level" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

interface NavbarProps {
  activeSection: string;
  onNavClick: (id: string) => void;
}

const Navbar = ({ activeSection, onNavClick }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Education', id: 'education' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <button onClick={() => onNavClick('home')} className="text-xl font-bold tracking-tight text-slate-900 group">
          <span className="text-sky-600 group-hover:text-sky-500 transition-colors">PJ</span>.dev
        </button>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <button 
              key={link.id}
              onClick={() => onNavClick(link.id)}
              className={`transition-all relative py-1 ${
                activeSection === link.id 
                ? 'text-sky-600 font-bold' 
                : 'text-slate-600 hover:text-sky-600'
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-600 rounded-full"></span>
              )}
            </button>
          ))}
        </div>
        <button 
          onClick={() => onNavClick('contact')}
          className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-sky-600 transition-all hover:scale-105 active:scale-95"
        >
          Hire Me
        </button>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleNavClick = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Adjust for sticky header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  }, []);

  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
    
    // Clean up existing observer
    if (observerRef.current) observerRef.current.disconnect();

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    const handleScrollVisibility = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScrollVisibility, { passive: true });

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener('scroll', handleScrollVisibility);
    };
  }, []);

  const handleDownloadResume = useCallback(() => {
    window.print();
  }, []);

  const handleCopyEmail = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(RESUME_DATA.email).then(() => {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-sky-100 selection:text-sky-900">
      <Navbar activeSection={activeSection} onNavClick={handleNavClick} />

      {/* Hero Section */}
      <header id="home" className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden bg-grid">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
            Available for Internships
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-emerald-600">{RESUME_DATA.name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
            A <span className="text-slate-900 font-semibold">Data Analytics</span> enthusiast & <span className="text-slate-900 font-semibold">Software Developer</span> turning complex data into meaningful insights.
          </p>
          
          <div className="flex flex-wrap gap-4 items-center">
            <button 
              onClick={() => handleNavClick('projects')}
              className="bg-sky-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-sky-200 hover:bg-sky-700 transition-all hover:scale-105 active:scale-95"
            >
              View Work <ChevronRight size={20} />
            </button>
            <button 
              onClick={handleDownloadResume}
              className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              <Download size={20} className="text-sky-600" /> Download Resume
            </button>
            <div className="flex items-center gap-4 ml-2">
              <a href={RESUME_DATA.github} target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all hover:scale-110 active:scale-90">
                <Github size={24} />
              </a>
              <a href={RESUME_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-sky-600 transition-all hover:scale-110 active:scale-90">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-96 h-96 bg-sky-200/30 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 -left-20 w-80 h-80 bg-emerald-200/20 blur-3xl rounded-full"></div>
      </header>

      {/* About Section */}
      <Section id="about" title="About Me">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-slate-600 leading-relaxed">
              {RESUME_DATA.summary}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {RESUME_DATA.technicalStrengths.map((strength, i) => (
                <div key={i} className="flex gap-3 text-sm text-slate-700 font-medium items-start p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="mt-1 bg-sky-100 p-1.5 rounded-lg shrink-0">
                    <BrainCircuit size={14} className="text-sky-600" />
                  </div>
                  <span>{strength}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-inner">
            <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <LineChart size={20} className="text-sky-600" /> 
              Skills Proficiency
            </h4>
            <SkillChart />
            <p className="mt-4 text-xs text-slate-500 italic text-center">
              Self-rated based on personal projects and academic performance.
            </p>
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" title="Technical Arsenal" dark>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((cat, i) => (
            <div key={i} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-sky-500/50 transition-all group hover:bg-slate-800/80">
              <div className="mb-6 bg-slate-700 w-12 h-12 rounded-xl flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all transform group-hover:rotate-6 group-hover:scale-110">
                {cat.category === "Data Analytics" && <LineChart size={24} />}
                {cat.category === "Databases" && <Database size={24} />}
                {cat.category === "Software Dev" && <Code size={24} />}
                {cat.category === "Tools" && <Terminal size={24} />}
              </div>
              <h3 className="text-xl font-bold mb-4">{cat.category}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span key={skill} className="text-sm bg-slate-900/50 text-slate-400 px-3 py-1 rounded-md border border-slate-700 group-hover:text-sky-300 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="Featured Projects">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </Section>

      {/* Education & Coursework Section */}
      <Section id="education" title="Education & Learning" className="bg-slate-50">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{EDUCATION.degree}</h3>
                  <p className="text-lg text-sky-600 font-medium">{EDUCATION.field}</p>
                </div>
                <div>
                  <span className="bg-slate-100 text-slate-600 px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap">2022 - 2026</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <MapPin size={18} className="text-slate-400" />
                  <span>{EDUCATION.institution}, {EDUCATION.location}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <FileText size={18} className="text-slate-400" />
                  <span>{EDUCATION.graduation}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Code size={20} className="text-sky-600" /> Relevant Coursework
              </h4>
              <div className="flex flex-wrap gap-3">
                {COURSEWORK.map((course) => (
                  <div key={course} className="px-4 py-2 bg-slate-50 rounded-lg text-sm text-slate-700 font-medium border border-slate-100 hover:border-sky-300 hover:bg-sky-50 transition-all hover:scale-105 cursor-default">
                    {course}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
              <h4 className="text-xl font-bold mb-6">Self-Learning</h4>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex gap-3">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                  Independently studied Python for data analytics through online platforms and documentation.
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                  Regularly practice EDA, data cleaning, and visualization on real datasets.
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                  Continuously improving software development and data analysis skills through personal projects.
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="text-xl font-bold mb-4">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {["Data Analytics", "System Architecture", "Machine Learning", "Product Design"].map(interest => (
                  <span key={interest} className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded hover:bg-sky-50 hover:text-sky-600 transition-colors cursor-default">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" title="Get In Touch">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-slate-900 p-12 text-white">
            <h3 className="text-3xl font-bold mb-8">Let's work together.</h3>
            <p className="text-slate-400 mb-12">
              Looking for a Data Analytics intern who is passionate about problem-solving and modular development? Let's connect!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 group relative">
                <a href={`mailto:${RESUME_DATA.email}`} className="flex items-center gap-4 flex-1 hover:text-sky-400 transition-colors">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center group-hover:bg-sky-600 transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Email</p>
                    <p className="font-medium break-all">{RESUME_DATA.email}</p>
                  </div>
                </a>
                <button 
                  onClick={handleCopyEmail}
                  className="ml-auto bg-slate-800 p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-all flex items-center gap-2 group/copy"
                  title="Copy email to clipboard"
                >
                  {emailCopied ? (
                    <>
                      <Check size={16} className="text-emerald-500" />
                      <span className="text-xs font-bold text-emerald-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} className="group-hover/copy:scale-110 transition-transform" />
                    </>
                  )}
                </button>
              </div>
              <a href={`tel:${RESUME_DATA.phone}`} className="flex items-center gap-4 group hover:text-sky-400 transition-colors">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center group-hover:bg-sky-600 transition-colors">
                  <Terminal size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Phone</p>
                  <p className="font-medium">{RESUME_DATA.phone}</p>
                </div>
              </a>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Location</p>
                  <p className="font-medium">{RESUME_DATA.location}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 p-12 bg-white">
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks for reaching out! (Demo Only)");
            }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Name</label>
                  <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Email</label>
                  <input required type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Message</label>
                <textarea required rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all" placeholder="How can I help you?"></textarea>
              </div>
              <button type="submit" className="w-full bg-sky-600 text-white font-bold py-4 rounded-xl hover:bg-sky-700 transition-all shadow-lg shadow-sky-200 hover:scale-[1.02] active:scale-95">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </Section>

      <footer className="py-12 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
          <div className="flex gap-6">
            <a href={RESUME_DATA.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-all hover:scale-125">
              <Github size={20} />
            </a>
            <a href={RESUME_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-600 transition-all hover:scale-125">
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${RESUME_DATA.email}`} className="text-slate-400 hover:text-red-500 transition-all hover:scale-125">
              <Mail size={20} />
            </a>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} {RESUME_DATA.name}. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-sky-600 text-white p-4 rounded-full shadow-xl hover:bg-sky-700 transition-all z-40 hover:scale-110 active:scale-90"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default App;
