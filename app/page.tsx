'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Mail,
  ExternalLink,
  ChevronDown,
  Terminal,
  Database,
  Code2,
  BookOpen,
  Layers,
  GitBranch,
  BriefcaseBusiness,
} from 'lucide-react';

// ==========================================
// 1. PORTFOLIO CONFIGURATION DATA
// Update your personal details here!
// ==========================================
const PORTFOLIO_DATA = {
  about: {
    name: "Sairam Tupakula",
    headline: "Engineering ideas into reality.",
    intro: "Computer Science and Engineering student focused on Software Engineering, Python, Data Systems, and AI. I build strong foundations in programming and algorithms to solve complex technical problems.",
    email: "your.email@example.com", // TODO: Update this
    github: "https://github.com/yourusername", // TODO: Update this
    linkedin: "https://linkedin.com/in/yourusername", // TODO: Update this
  },
  skills: [
    { category: "Programming", items: ["Python", "JavaScript", "TypeScript", "C++"] },
    { category: "Computer Science", items: ["Data Structures", "Algorithms", "OOP", "Problem Solving"] },
    { category: "Data & Systems", items: ["SQL", "Data Warehousing", "Data Mining", "Data Modeling"] },
    { category: "Development", items: ["Git & GitHub", "Next.js", "React", "Node.js"] }
  ],
  projects: [
    {
      title: "Data Warehouse and Analytics",
      description: "A comprehensive data warehousing solution analyzing large datasets with optimized query performance and modeling.",
      tags: ["SQL", "Python", "Data Modeling"],
      github: "#",
      demo: "#",
      isPlaceholder: true
    },
    {
      title: "Python DSA Practice & Benchmarks",
      description: "A collection of optimized data structures and algorithmic problem-solving implementations with performance benchmarks.",
      tags: ["Python", "Algorithms", "Performance"],
      github: "#",
      demo: "#",
      isPlaceholder: true
    },
    {
      title: "Interactive Developer Portfolio",
      description: "A premium 3D web experience built with Next.js, Tailwind CSS, and Three.js featuring real-time WebGL rendering.",
      tags: ["Next.js", "Three.js", "TypeScript"],
      github: "#",
      demo: "#",
      isPlaceholder: false
    }
  ],
  journey: [
    {
      year: "Present",
      title: "Computer Science and Engineering",
      subtitle: "University Student",
      description: "Focusing on software development, algorithmic problem solving, and modern data architectures."
    },
    {
      year: "Recent",
      title: "Deepening Data Engineering Skills",
      subtitle: "Independent Learning",
      description: "Exploring data mining, warehousing, and building efficient pipelines using Python and SQL."
    }
  ]
};

// ==========================================
// 2. THREE.JS HERO BACKGROUND COMPONENT
// ==========================================
const Hero3DScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Create central abstract computational structure
    const group = new THREE.Group();
    scene.add(group);

    // Inner core
    const coreGeometry = new THREE.IcosahedronGeometry(1.5, 0);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00F0FF, // Cyan
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    // Outer nodes (Data points)
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 150;
    const posArray = new Float32Array(particleCount * 3);
    for(let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xD4FF33, // Electric Lime
      transparent: true,
      opacity: 0.8,
    });
    const particlesMesh = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particlesMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x8B5CF6, 2); // Violet
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Idle rotation
      core.rotation.x += 0.002;
      core.rotation.y += 0.003;
      particlesMesh.rotation.y -= 0.001;
      
      // Mouse interaction rotation
      group.rotation.x += (mouseY * 0.1 - group.rotation.x) * 0.05;
      group.rotation.y += (mouseX * 0.1 - group.rotation.y) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 -z-10 opacity-60" />;
};

// ==========================================
// 3. MAIN PAGE COMPONENT
// ==========================================
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-300 font-sans selection:bg-[#00F0FF] selection:text-[#050811]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#050811]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter text-white">
            ST<span className="text-[#00F0FF]">.</span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            {['about', 'skills', 'projects', 'journey'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollTo(item)}
                className={`capitalize transition-colors hover:text-[#D4FF33] ${activeSection === item ? 'text-white' : 'text-slate-400'}`}
              >
                {item}
              </button>
            ))}
          </div>
          <button 
            onClick={() => scrollTo('contact')}
            className="px-5 py-2 text-sm font-semibold rounded-full border border-white/10 hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all"
          >
            Contact
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        <Hero3DScene />
        
        <div className="max-w-4xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#D4FF33] mb-8">
            <span className="w-2 h-2 rounded-full bg-[#D4FF33] animate-pulse"></span>
            Available for new opportunities
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            Engineering ideas <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00F0FF] via-[#8B5CF6] to-[#D4FF33]">
              into reality.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            I am <strong className="text-white font-medium">{PORTFOLIO_DATA.about.name}</strong>, a {PORTFOLIO_DATA.about.intro}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => scrollTo('projects')} className="w-full sm:w-auto px-8 py-4 bg-white text-[#050811] font-bold rounded-full hover:bg-[#D4FF33] transition-colors">
              Explore My Work
            </button>
            <button onClick={() => scrollTo('contact')} className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-bold rounded-full border border-white/20 hover:border-white/50 transition-colors">
              Get In Touch
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 bg-linear-to-b from-transparent to-white/2">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Arsenal</h2>
            <div className="w-20 h-1 bg-linear-to-r from-[#00F0FF] to-[#8B5CF6]"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PORTFOLIO_DATA.skills.map((skillGroup, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/3 border border-white/5 hover:border-white/10 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  {idx === 0 && <Code2 size={20} className="text-[#00F0FF]"/>}
                  {idx === 1 && <Terminal size={20} className="text-[#8B5CF6]"/>}
                  {idx === 2 && <Database size={20} className="text-[#D4FF33]"/>}
                  {idx === 3 && <Layers size={20} className="text-white"/>}
                  {skillGroup.category}
                </h3>
                <ul className="space-y-3">
                  {skillGroup.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 flex justify-between items-end">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Selected Work</h2>
              <div className="w-20 h-1 bg-linear-to-r from-[#D4FF33] to-[#00F0FF]"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PORTFOLIO_DATA.projects.map((project, idx) => (
              <div key={idx} className="group relative flex flex-col justify-between p-8 rounded-2xl bg-[#0A1124] border border-white/10 hover:border-white/20 hover:-translate-y-2 transition-all duration-300">
                {project.isPlaceholder && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded">
                    Placeholder
                  </span>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00F0FF] transition-colors">{project.title}</h3>
                  <p className="text-slate-400 mb-6 text-sm leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <a href={project.github} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                    <GitBranch size={20} />
                  </a>
                  <a href={project.demo} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="py-32 px-6 bg-linear-to-t from-transparent to-white/2">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">My Journey</h2>
            <div className="w-20 h-1 bg-linear-to-r from-[#8B5CF6] to-[#00F0FF]"></div>
          </div>
          
          <div className="space-y-12 border-l border-white/10 ml-3 pl-8 relative">
            {PORTFOLIO_DATA.journey.map((item, idx) => (
              <div key={idx} className="relative">
                <span className="absolute -left-10.25 top-1 w-5 h-5 rounded-full bg-[#050811] border-2 border-[#8B5CF6]"></span>
                <span className="text-sm font-mono text-[#00F0FF] mb-2 block">{item.year}</span>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <span className="text-sm font-medium text-slate-500 mb-3 block">{item.subtitle}</span>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section & Footer */}
      <section id="contact" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Let's build something.</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            I am currently focusing on building my skills and am open to exciting opportunities, collaborations, and learning experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-32">
            <a 
              href={`mailto:${PORTFOLIO_DATA.about.email}`}
              className="flex items-center gap-3 px-8 py-4 bg-white text-[#050811] font-bold rounded-full hover:scale-105 transition-transform"
            >
              <Mail size={20} />
              Say Hello
            </a>
            <div className="flex gap-4">
              <a href={PORTFOLIO_DATA.about.github} className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                <GitBranch size={24} />
              </a>
              <a href={PORTFOLIO_DATA.about.linkedin} className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                <BriefcaseBusiness size={24} />
              </a>
            </div>
          </div>
          
          <footer className="flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
            <p> {new Date().getFullYear()} {PORTFOLIO_DATA.about.name}. All rights reserved.</p>
            <p className="mt-2 md:mt-0 flex items-center gap-1">
              Built with Next.js & Three.js <span className="text-[#D4FF33]">✦</span>
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
}