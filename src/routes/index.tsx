import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowDownRight,
  ArrowRight,
  ExternalLink,
  Folder,
  ImagePlus,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { PdfProjectViewer } from "@/components/pdf-project-viewer";
import { FolderFloat } from "@/components/folder-float";
import ScrollReveal from "@/components/ScrollReveal";
import TechText from "@/components/TechText";
import WebThreads from "@/components/WebThreads";
import WarpText, { type WarpTextSegment } from "@/components/WarpText";

import portrait from "@/assets/designer-portrait.jpg";
import samsonitePhoto from "@/assets/Samsonite-1.jpeg";
import impexPhoto from "@/assets/Impex-1.jpeg";
import mlaPhoto from "@/assets/MLA-1.jpeg";
import brandingOne from "@/assets/branding-1.jpg";
import brandingTwo from "@/assets/branding-2.jpg";
import productDesignOne from "@/assets/product-design-1.jpg";
import productDesignTwo from "@/assets/product-design-2.jpg";
import productDesignThree from "@/assets/product-design-3.jpg";
import productDesignFour from "@/assets/product-design-4.jpg";
import researchImage from "@/assets/research.jpg";

const pdOne = new URL("../assets/product--1.pdf", import.meta.url).href;
const pdTwo = new URL("../assets/product--2.pdf", import.meta.url).href;
const pdThree = new URL("../assets/product--3.pdf", import.meta.url).href;
const pdFour = new URL("../assets/product--4.pdf", import.meta.url).href;
const researchPdf = new URL("../assets/research-1.pdf", import.meta.url).href;
const brandingOnePdf = new URL("../assets/brand-1.pdf", import.meta.url).href;
const brandingTwoPdf = new URL("../assets/branding -2.pdf", import.meta.url).href;
const resumePdf = new URL("../assets/RESUME.pdf", import.meta.url).href;

const SOFTWARE_ITEMS = ["SolidWorks", "Rhino", "Fusion 360", "Blender", "Photoshop", "Illustrator", "Figma", "Canva"];
const SKILL_ITEMS = ["DESIGN AND DOMAIN SKILL", "Product Designing", "Graphic Designing", "Digital Marketing", "Presentation Design", "SOFT SKILL", "Communication", "Public Speaking", "Team Leadership", "Collaboration"];
const INTERESTS = ["Product Designing", "Problem Solving", "Ergonomics", "User Research", "Concept Development", "Ideation", "Sketching", "Painting", "Product Styling", "3D Modelling", "Prototyping"];

const FOLDER_GROUPS = [
  { id: "software-folder", label: "SOFTWARE", subtitle: "TOOLS", items: SOFTWARE_ITEMS },
  { id: "skills-folder", label: "SKILLS", subtitle: "DESIGN + SOFT SKILLS", items: SKILL_ITEMS },
  { id: "interest-folder", label: "INTERESTS", subtitle: "PRACTICE", items: INTERESTS },
];

type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  note: string;
  image?: string;
};

const EXPERIENCE: ExperienceEntry[] = [
  { company: "Samsonite", role: "Product Design Intern", period: "May 2026 — July 2026", note: "Contributed to product design and development within the NPD process.", image: samsonitePhoto },
  { company: "Impex", role: "NPD Intern", period: "Aug 2025 — Sept 2025", note: "Supported new product development through design and problem solving.", image: impexPhoto },
  { company: "MLA Club", role: "Design Head", period: "Jan 2026 — Present", note: "Leading design direction and visual communication for the club.", image: mlaPhoto },
];

const LEADERSHIP = [
  { role: "Design Head", org: "MLA Club", note: "Leading design direction and creative collaboration." },
  { role: "Design Organiser", org: "Thanima’26", note: "Organising design work and coordinating visual outcomes." },
  { role: "Design Team Lead", org: "Smriti’26 & Unarv’26", note: "Guiding design teams through collaborative event work." },
  { role: "Design & Print Coordinator", org: "Gravitas’25", note: "Coordinating design and print production." },
  { role: "Design Coordinator", org: "Thanima’25", note: "Coordinating design deliverables for the event." },
  { role: "Design & Media Volunteer", org: "Riveira’25", note: "Supporting design and media communication." },
  { role: "Campus Decoration Volunteer", org: "Gravitas’26", note: "Contributing to campus decoration and visual identity." },
  { role: "Design Team Member", org: "Team Asena", note: "Collaborating on team design projects." },
  { role: "Core Member", org: "Finance Dept., Admark", note: "Supporting the finance department as a core member." },
];

const ARCHIVE = [
  { name: "Product Design", count: "04 works", projects: [{ title: "Product Design 01", image: productDesignOne, pdf: pdOne }, { title: "Product Design 02", image: productDesignTwo, pdf: pdTwo }, { title: "Product Design 03", image: productDesignThree, pdf: pdThree }, { title: "Product Design 04", image: productDesignFour, pdf: pdFour }] },
  { name: "Research", count: "01 work", projects: [{ title: "Research", image: researchImage, pdf: researchPdf }] },
  { name: "Branding", count: "02 works", projects: [{ title: "Branding 01", image: brandingOne, pdf: brandingOnePdf }, { title: "Branding 02", image: brandingTwo, pdf: brandingTwoPdf }] },
];

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/fathimafaiha/", target: "_blank" },
  { label: "Contact", href: "tel:+918129804040" },
  { label: "Email", href: "mailto:mfathimafaiha@gmail.com" },
];
const INTRO_SEGMENTS: WarpTextSegment[] = [
  { text: "An Industrial Designer exploring ", color: "var(--muted-foreground)" },
  { text: "product development", color: "var(--foreground)" },
  { text: ", visual design and experiences through ", color: "var(--muted-foreground)" },
  { text: "curiosity", color: "var(--highlight)" },
  { text: ", research and making.", color: "var(--muted-foreground)" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Industrial Designer — Portfolio" },
      { name: "description", content: "An industrial design portfolio exploring research, ideas, form and experience." },
      { property: "og:title", content: "Industrial Designer — Portfolio" },
      { property: "og:description", content: "A physical industrial design portfolio translated into an interactive digital space." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioHome,
});

function PortfolioHome() {
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFile, setOpenFile] = useState<number | null>(0);
  const [selectedPdf, setSelectedPdf] = useState<{ title: string; url: string } | null>(null);
  const [openFolderId, setOpenFolderId] = useState<string | null>(null);
  const [hoveredFolderId, setHoveredFolderId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedPdf ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPdf]);

  useEffect(() => {
    if (!openFolderId) return;
    const closeOnOutsidePointer = (event: globalThis.PointerEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest("[data-folder-float-id]")) {
        setOpenFolderId(null);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenFolderId(null);
        setHoveredFolderId(null);
      }
    };
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [openFolderId]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-transparent text-foreground selection:bg-accent selection:text-accent-foreground">

      {selectedPdf && <PdfProjectViewer title={selectedPdf.title} url={selectedPdf.url} onClose={() => setSelectedPdf(null)} />}

      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-border/70 bg-background/75 backdrop-blur-xl" : "bg-transparent"}`}>
        <nav className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10" aria-label="Primary navigation">
          <button onClick={() => scrollTo("home")} className="group flex items-center gap-3 text-left" aria-label="Return home">
            <span className="size-2 rounded-full bg-highlight transition-transform group-hover:scale-150" />
            <span className="font-heading text-xs font-bold uppercase tracking-[0.18em]">ID / 26</span>
          </button>
          <div className="hidden items-center gap-10 md:flex">
            {["Home", "Works", "Connect"].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className={`nav-link ${item === "Home" ? "nav-link-active" : ""}`}>{item}</button>
            ))}
          </div>
          <button className="flex size-10 items-center justify-center rounded-full border border-border bg-surface/60 md:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="border-b border-border bg-background/95 px-5 pb-6 backdrop-blur-xl md:hidden">
              {["Home", "Works", "Connect"].map((item) => <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="block w-full border-b border-border py-4 text-left font-heading text-lg font-bold uppercase">{item}</button>)}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section id="home" className="relative isolate mx-auto flex min-h-[920px] max-w-[1440px] flex-col justify-start overflow-hidden px-5 pb-24 pt-20 md:min-h-screen md:px-10 md:pb-28">
        <div className="pointer-events-none absolute inset-y-0 left-5 z-[2] border-l border-border/40 md:left-10" />
        <div className="pointer-events-none absolute inset-y-0 right-5 z-[2] border-r border-border/40 md:right-10" />
        <p className="relative z-10 mb-6 ml-0 font-body text-[10px] uppercase tracking-[0.26em] text-muted-foreground md:-ml-2">Research <span className="mx-2 text-highlight">→</span> Ideas <span className="mx-2 text-highlight">→</span> Form <span className="mx-2 text-highlight">→</span> Experience</p>
        <div className="relative z-10 grid w-full items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(280px,390px)] md:gap-12">
          <div className="min-w-0 md:-translate-x-2">
            <h1 className="translate-y-[60px] font-heading font-extrabold uppercase leading-[0.82] tracking-normal">
              <TechText text="INDUSTRIAL" fontFamily="Montserrat, sans-serif" fontWeight={800} fontSize={116} letterSpacing={-0.04} color="#F1F4F0" accentColor="#91DA73" reveal="letter" selection labels={false} draggable={false} sweep specks={8} className="hero-tech-text" />
              <TechText text="DESIGNER" fontFamily="Montserrat, sans-serif" fontWeight={800} fontSize={116} letterSpacing={-0.04} color="#91DA73" accentColor="#91DA73" reveal="letter" selection labels={false} draggable={false} sweep specks={8} className="hero-tech-text hero-tech-text--offset" />
            </h1>
            <div className="mt-6 translate-y-[50px] flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7 }} className="max-w-xs font-body text-base leading-relaxed text-muted-foreground md:text-lg">
                From a spark of thought<br />to a world of <span className="text-highlight">possibilities.</span>
              </motion.p>
              <div className="flex flex-wrap gap-3">
                <MagneticButton onClick={() => scrollTo("connect")}>Contact <ArrowDownRight size={17} /></MagneticButton>
                <MagneticButton onClick={() => scrollTo("works")}>Works <ArrowRight size={17} /></MagneticButton>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[350px] translate-y-[50px] justify-self-center md:justify-self-end">
            <PortraitCard />
          </div>
        </div>
        <div className="relative z-10 mt-4 grid w-full md:grid-cols-[minmax(0,1fr)_minmax(280px,390px)] md:gap-12">
          <div className="cv-stats-content flex w-full max-w-[640px] justify-center justify-self-center md:-translate-x-2">
            <a href={resumePdf} download="RESUME.pdf" className="inline-flex min-h-11 items-center justify-center rounded-full bg-highlight px-7 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-highlight-strong">DOWNLOAD CV</a>
          </div>
        </div>
        <div className="absolute bottom-6 left-10 hidden items-center gap-3 font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:flex"><span className="h-px w-10 bg-highlight/60" /> Scroll to explore</div>
      </section>

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 px-5 md:grid-cols-[minmax(0,1fr)_minmax(280px,390px)] md:gap-12 md:px-10">
        <div className="w-full max-w-[640px] justify-self-center md:-translate-x-2">
          <div className="cv-stats-card" aria-label="Portfolio statistics">
            <div className="cv-stat"><span className="cv-stat-number">12</span><span className="cv-stat-label">Work<br />Experiences</span></div>
            <div className="cv-stat"><span className="cv-stat-number">4</span><span className="cv-stat-label">Industrial Design<br />Projects</span></div>
            <div className="cv-stat"><span className="cv-stat-number">2</span><span className="cv-stat-label">Branding Design<br />Projects</span></div>
            <div className="cv-stat"><span className="cv-stat-number">1</span><span className="cv-stat-label">Research<br />Project</span></div>
          </div>
        </div>
      </div>

      <section className="section-shell border-y border-border/50 pb-6 pt-16 md:pb-8 md:pt-28">
        <Reveal className="mx-auto mt-[60px] max-w-5xl text-center"><WarpText text={INTRO_SEGMENTS.map((segment) => segment.text).join("")} segments={INTRO_SEGMENTS} fontFamily="Poppins, sans-serif" fontWeight={400} fontSize="var(--warp-font-size)" letterSpacing="0em" lineHeight={1.4} warpStrength={0.08} warpScale={1.7} speed={0.55} pointerInfluence={0.42} pointerStrength={0.38} refraction={0.018} ripple className="intro-warp-text" /></Reveal>
      </section>

      <section aria-label="Software, skills, and interests" className="section-shell folder-groups-section pb-20 pt-2 md:pb-28 md:pt-3">
        <Reveal>
          <div className="folder-float-grid folder-float-grid--categories">
            {FOLDER_GROUPS.map((folder) => (
              <FolderFloat
                key={folder.id}
                id={folder.id}
                label={folder.label}
                subtitle={folder.subtitle}
                items={folder.items}
                layout="collection"
                isOpen={openFolderId === folder.id || hoveredFolderId === folder.id}
                onToggle={() => setOpenFolderId((current) => current === folder.id ? null : folder.id)}
                onHoverStart={() => setHoveredFolderId(folder.id)}
                onHoverEnd={() => setHoveredFolderId((current) => current === folder.id ? null : current)}
              />
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section-shell pb-20 md:pb-32">
        <SectionHeading number="02" title="Professional Experience" compact highlight />
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {EXPERIENCE.map((item, index) => <ExperienceCard key={item.role} item={item} index={index} />)}
        </div>
      </section>

      <section className="section-shell pb-20 md:pb-32">
        <SectionHeading number="03" title="Leadership Experience" compact highlight />
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {LEADERSHIP.map((item, index) => (
            <Reveal key={`${item.role}-${item.org}`}>
              <article className="leadership-card group flex h-full min-h-44 flex-col justify-between border border-border bg-surface/55 p-4 backdrop-blur-md transition-all duration-500 hover:border-highlight/50 hover:bg-surface-strong/70 md:p-5">
                <div className="flex justify-between"><span className="font-body text-[9px] uppercase tracking-[0.18em] text-highlight">0{index + 1} / Role</span><ArrowDownRight size={15} className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-highlight" /></div>
                <div className="mt-7"><p className="mb-1.5 font-body text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{item.org}</p><h3 className="font-heading text-lg font-bold uppercase">{item.role}</h3><p className="mt-3 font-body text-xs leading-relaxed text-muted-foreground">{item.note}</p></div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="works" className="border-y border-border/50 py-20 md:py-32">
        <div className="section-shell">
          <SectionHeading number="04" title="Works" compact />
          <div className="mt-10 space-y-3">
            {ARCHIVE.map((file, index) => <Reveal key={file.name}><ArchiveFile file={file} isOpen={openFile === index} onOpen={() => setOpenFile(openFile === index ? null : index)} onSelectPdf={setSelectedPdf} /></Reveal>)}
          </div>
        </div>
      </section>

      <section id="connect" className="contact-section section-shell relative isolate flex min-h-[78vh] flex-col justify-center pb-0 pt-24 md:pt-36">
        <div className="contact-content relative z-10">
          <SectionHeading number="05" title="Connect" />
          <Reveal className="mt-5"><div className="flex flex-wrap gap-x-8 gap-y-4">{SOCIALS.map((social) => <a key={social.label} href={social.href} target={social.target} rel={social.target === "_blank" ? "noreferrer" : undefined} className="link-line font-body text-base font-medium text-highlight transition-colors hover:text-highlight-strong md:text-lg">{social.label}</a>)}</div></Reveal>
          <Reveal className="mt-10"><h2 className="max-w-5xl font-heading text-[clamp(2rem,5vw,5rem)] font-bold uppercase leading-[0.92]">Let&apos;s create<br />something <span className="text-highlight">meaningful.</span></h2></Reveal>
          <div className="mt-12 grid gap-8 border-t border-border pt-7 md:grid-cols-[1fr_auto] md:items-end">
            <button aria-label="Start a conversation" className="group flex size-28 items-center justify-center rounded-full bg-highlight text-accent-foreground transition-colors duration-300 hover:bg-highlight-strong md:col-start-2 md:size-36"><ArrowDownRight className="size-9 md:size-12" /></button>
          </div>
        </div>
        <div className="threads-section threads-outro" aria-hidden="true">
          <WebThreads color1="#426B30" color2="#91DA73" color3="#F1F4F0" speed={0.2} threadCount={6} frequency={5} spread={0.18} fanMode="center" glow={0.02} brightness={0.6} mouseInteraction={false} />
        </div>
      </section>

      <footer className="border-t border-border py-8"><Reveal><div className="section-shell flex flex-col gap-5 font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:flex-row md:items-center md:justify-between"><span className="font-heading font-bold text-foreground">Industrial Designer</span><span>© 2026 — All rights reserved</span><div className="flex gap-5"><a href="#connect" className="hover:text-highlight">EMAIL</a><a href="#connect" className="hover:text-highlight">LI</a><a href="#connect" className="hover:text-highlight">PHONE</a></div></div></Reveal></footer>
    </main>
  );
}

function PortraitCard() {
  return <div className="group relative mx-auto w-full max-w-[350px]">
    <div className="absolute -inset-3 translate-x-3 translate-y-3 rounded-lg border border-highlight/20 bg-teal/40 transition-all duration-500 group-hover:translate-x-4 group-hover:translate-y-4 group-hover:shadow-[0_20px_70px_var(--shadow-accent)]" />
    <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-surface"><img src={portrait} alt="Industrial designer portrait placeholder" width={1024} height={1280} className="h-full w-full object-cover transition duration-700" /><div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-background/90 to-transparent p-5 pt-16"><span className="flex size-9 items-center justify-center rounded-full border border-highlight/50 bg-deep/80"><ArrowDownRight size={14} className="text-highlight" /></span></div></div>
  </div>;
}

function MagneticButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return <button onClick={onClick} className="group flex items-center gap-4 rounded-full border border-border bg-surface px-6 py-3 font-body text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:border-highlight/50 hover:bg-teal"><span>{children}</span><span className="flex size-7 items-center justify-center rounded-full bg-highlight text-accent-foreground transition-transform group-hover:translate-x-1">↘</span></button>;
}

function SectionHeading({ number, title, compact = false, highlight = false }: { number: string; title: string; compact?: boolean; highlight?: boolean }) { return <Reveal><div className="flex items-end justify-between gap-5 border-b border-border pb-4"><h2 className={`section-title font-heading font-bold uppercase ${compact ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"} ${highlight ? "text-highlight" : ""}`}>{title}</h2><span className="font-body text-[10px] tracking-[0.2em] text-highlight">({number})</span></div></Reveal>; }

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <ScrollReveal className={className} baseOpacity={0.1} enableBlur baseRotation={3} blurStrength={4}>{children}</ScrollReveal>; }

function ExperienceCard({ item, index }: { item: ExperienceEntry; index: number }) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageUrl = useMemo(() => imageFile ? URL.createObjectURL(imageFile) : item.image, [imageFile, item.image]);
  const imageInputId = `experience-image-${index}`;
  const category = item.company === "Samsonite" ? "Product" : item.company === "Impex" ? "NPD" : "Campus";

  useEffect(() => () => {
    if (imageFile && imageUrl) URL.revokeObjectURL(imageUrl);
  }, [imageFile, imageUrl]);

  return (
    <Reveal>
      <motion.article whileHover={{ y: -6 }} className="experience-card group flex min-h-[390px] flex-col border border-border bg-surface/60 p-6 backdrop-blur-md transition-colors duration-500 hover:border-highlight/50 hover:bg-surface-strong/80 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="font-body text-[10px] tracking-[0.18em] text-highlight">0{index + 1}</span>
          <label htmlFor={imageInputId} className="experience-image-slot relative flex h-26 w-32 shrink-0 cursor-pointer items-center justify-center overflow-hidden border border-dashed border-highlight/35 bg-deep/50 text-muted-foreground transition-colors hover:border-highlight/70 hover:text-highlight" aria-label={`Add image for ${item.company}`}>
            {imageUrl ? <img src={imageUrl} alt={`${item.company} experience`} className="absolute inset-0 h-full w-full object-cover" /> : <span className="flex flex-col items-center gap-1.5"><ImagePlus size={18} /><span className="font-body text-[9px] uppercase tracking-[0.12em]">Add image</span></span>}
            <input id={imageInputId} type="file" accept="image/*" className="sr-only" onChange={(event) => setImageFile(event.currentTarget.files?.[0] ?? null)} />
          </label>
        </div>
        <div className="mt-auto">
          <p className="font-body text-[10px] uppercase tracking-[0.2em] text-highlight">{category}</p>
          <h3 className="mt-2 font-heading text-2xl font-bold uppercase">{item.company}</h3>
          <p className="mt-1 font-body text-xs uppercase tracking-[0.08em] text-muted-foreground">{item.role}</p>
          <p className="mt-3 font-body text-xs text-highlight">{item.period}</p>
          <p className="mt-5 font-body text-sm leading-relaxed text-muted-foreground transition-transform duration-500 group-hover:-translate-y-1">{item.note}</p>
        </div>
      </motion.article>
    </Reveal>
  );
}

function ArchiveFile({ file, isOpen, onOpen, onSelectPdf }: { file: (typeof ARCHIVE)[number]; isOpen: boolean; onOpen: () => void; onSelectPdf: (pdf: { title: string; url: string } | null) => void }) {
  const [activeProject, setActiveProject] = useState(0);

  return <motion.article layout className={`archive-file ${isOpen ? "archive-file-open" : ""}`}>
    <button onClick={onOpen} aria-expanded={isOpen} className="relative z-30 flex w-full items-center justify-between gap-4 px-5 py-6 text-left md:px-8">
      <div className="flex min-w-0 items-center gap-4 md:gap-7"><Folder className={`shrink-0 ${isOpen ? "text-highlight" : "text-muted-foreground"}`} size={22} /><h3 className="truncate font-heading text-lg font-bold uppercase md:text-3xl">{file.name}</h3></div><div className="flex items-center gap-5"><span className="hidden font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:block">{file.count}</span><span className={`flex size-9 items-center justify-center rounded-full border transition-all ${isOpen ? "rotate-45 border-highlight bg-highlight text-accent-foreground" : "border-border text-foreground"}`}><ArrowDownRight size={16} /></span></div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden"><div className="relative flex min-h-[410px] items-center justify-center px-5 pb-10 pt-5 md:min-h-[520px] md:px-12">
        {file.projects.map((project, projectIndex) => {
          const center = (file.projects.length - 1) / 2;
          const x = (projectIndex - center) * 34;
          const isActive = activeProject === projectIndex;
          const rotate = (projectIndex - center) * 5;
          return <motion.figure key={project.title} initial={{ x: 0, y: 150, rotate: 0, scale: 0.65, opacity: 0 }} animate={{ x: `${x}%`, y: isActive ? -30 : 20, rotate, scale: isActive ? 1.08 : 0.88, opacity: isActive ? 1 : 0.68, zIndex: isActive ? 20 : projectIndex }} exit={{ x: 0, y: 140, rotate: 0, scale: 0.7, opacity: 0 }} transition={{ type: "spring", stiffness: 110, damping: 18 }} onPointerEnter={() => setActiveProject(projectIndex)} onPointerDown={() => setActiveProject(projectIndex)} onFocus={() => setActiveProject(projectIndex)} onClick={() => { if (project.pdf) onSelectPdf({ title: project.title, url: project.pdf }); }} onKeyDown={(event) => {
            if ((event.key === "Enter" || event.key === " ") && project.pdf) {
              event.preventDefault();
              onSelectPdf({ title: project.title, url: project.pdf });
            }
          }} tabIndex={project.pdf ? 0 : -1} aria-label={project.pdf ? `View ${project.title}` : `${project.title} has no PDF`} className={`group archive-project-card absolute w-[72vw] max-w-[390px] origin-bottom overflow-hidden rounded-lg border bg-surface outline-none transition-[border-color,box-shadow,background-color] ${isActive ? "border-highlight/70 bg-surface-strong shadow-[0_24px_60px_rgba(0,0,0,0.42)]" : "border-border/80 shadow-[0_16px_40px_rgba(0,0,0,0.28)]"}`}><div className="archive-project-image relative aspect-[4/3] overflow-hidden rounded-md border border-border/70 bg-deep/80 p-2"><img src={project.image} alt={project.title} loading="lazy" width={1408} height={1056} className={`h-full w-full rounded-sm object-contain transition duration-700 ${isActive ? "grayscale-0" : "grayscale-[18%]"}`} /></div><figcaption className="flex items-center justify-between gap-3 bg-deep/95 px-4 py-3 font-body text-[10px] uppercase tracking-[0.15em]"><span className="truncate">{project.title}</span><ExternalLink size={13} className="shrink-0 text-highlight/80" /></figcaption></motion.figure>;
        })}
      </div></motion.div>}
    </AnimatePresence>
  </motion.article>;
}