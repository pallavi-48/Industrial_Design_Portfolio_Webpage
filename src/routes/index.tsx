import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowDownRight,
  ArrowRight,
  ExternalLink,
  Folder,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent } from "react";

import portrait from "@/assets/designer-portrait.jpg";
import chair from "@/assets/project-chair.jpg";
import device from "@/assets/project-device.jpg";
import research from "@/assets/project-research.jpg";

const SOFTWARE = ["Adobe Illustrator", "Adobe Photoshop", "Figma", "SolidWorks", "Fusion 360"];

const EXPERIENCE = [
  { company: "Company / Studio", role: "Industrial Design Intern", period: "20XX — 20XX", note: "Add a concise description of your contribution and the products you helped shape." },
  { company: "Organisation", role: "Product Design Intern", period: "20XX — 20XX", note: "Add a short summary of your role, process and most meaningful outcome." },
  { company: "Independent", role: "Design Collaborator", period: "20XX — Present", note: "Add a brief note about the collaboration, responsibilities and impact." },
];

const LEADERSHIP = [
  { role: "Leadership Role", org: "Student Organisation", note: "Describe how you guided a team, initiative or creative community." },
  { role: "Design Lead", org: "Campus Initiative", note: "Describe the challenge, your approach and the shared result." },
  { role: "Workshop Facilitator", org: "Design Community", note: "Describe how you helped others learn through making and conversation." },
];

const ARCHIVE = [
  { name: "Product Design", count: "03 studies", projects: [{ title: "Seating Study", image: chair }, { title: "Tactile Device", image: device }, { title: "Form Language", image: research }] },
  { name: "Research", count: "03 studies", projects: [{ title: "Material Atlas", image: research }, { title: "Ergonomic Study", image: device }, { title: "Behaviour Mapping", image: chair }] },
  { name: "Graphic Design", count: "03 studies", projects: [{ title: "Visual Systems", image: research }, { title: "Object Stories", image: chair }, { title: "Field Notes", image: device }] },
  { name: "UX / UI", count: "03 studies", projects: [{ title: "Product Interface", image: device }, { title: "Research Tool", image: research }, { title: "Spatial Control", image: chair }] },
  { name: "Experiments", count: "03 studies", projects: [{ title: "Soft Geometry", image: chair }, { title: "Sense Object", image: device }, { title: "Process Fragments", image: research }] },
];

const SOCIALS = ["Email", "LinkedIn", "Instagram", "Behance"];

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
  const [cursor, setCursor] = useState({ x: -100, y: -100, label: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    const onMove = (event: MouseEvent) => setCursor((value) => ({ ...value, x: event.clientX, y: event.clientY }));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[100] hidden size-3 rounded-full border border-highlight/70 bg-highlight/25 backdrop-blur-sm lg:flex lg:items-center lg:justify-center" animate={{ x: cursor.x - (cursor.label ? 30 : 6), y: cursor.y - (cursor.label ? 14 : 6), width: cursor.label ? 60 : 12, height: cursor.label ? 28 : 12 }} transition={{ type: "spring", stiffness: 500, damping: 32 }}>
        {cursor.label && <span className="font-body text-[9px] font-semibold uppercase text-foreground">{cursor.label}</span>}
      </motion.div>

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

      <section id="home" className="relative mx-auto flex min-h-[920px] max-w-[1440px] flex-col justify-center px-5 pb-16 pt-28 md:min-h-screen md:px-10 md:pb-12">
        <div className="pointer-events-none absolute inset-y-0 left-5 border-l border-border/40 md:left-10" />
        <div className="pointer-events-none absolute inset-y-0 right-5 border-r border-border/40 md:right-10" />
        <p className="mb-6 ml-4 font-body text-[10px] uppercase tracking-[0.26em] text-muted-foreground md:ml-8">Research <span className="mx-2 text-highlight">→</span> Ideas <span className="mx-2 text-highlight">→</span> Form <span className="mx-2 text-highlight">→</span> Experience</p>
        <div className="relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="font-heading text-[clamp(3.25rem,10.7vw,10rem)] font-extrabold uppercase leading-[0.82] tracking-normal">
            Industrial<br /><span className="ml-[8vw] text-stroke md:ml-[15vw]">Designer</span>
          </motion.h1>
          <div className="mt-8 grid items-end gap-8 md:grid-cols-[1fr_310px_1fr] md:gap-12">
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7 }} className="max-w-xs font-body text-base leading-relaxed text-muted-foreground md:pb-10 md:text-lg">
              From a spark of thought<br />to a world of <span className="text-highlight">possibilities.</span>
            </motion.p>
            <PortraitCard reduceMotion={Boolean(reduceMotion)} setCursorLabel={(label) => setCursor((value) => ({ ...value, label }))} />
            <div className="flex md:justify-end md:pb-10">
              <MagneticButton onClick={() => scrollTo("connect")}>Contact <ArrowDownRight size={17} /></MagneticButton>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-10 hidden items-center gap-3 font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:flex"><span className="h-px w-10 bg-highlight/60" /> Scroll to explore</div>
      </section>

      <section className="section-shell border-y border-border/50 py-24 md:py-36">
        <Reveal><p className="max-w-5xl font-body text-2xl leading-[1.45] text-muted-foreground md:text-4xl">An Industrial Designer exploring <span className="text-foreground">product development</span>, visual design and experiences through <span className="text-highlight">curiosity</span>, research and making.</p></Reveal>
      </section>

      <section className="section-shell py-24 md:py-36">
        <SectionHeading number="01" title="Software Skills" />
        <div className="marquee-mask group mt-10 overflow-hidden border-y border-border bg-surface/45 py-7 backdrop-blur-md">
          <div className="marquee-track flex w-max items-center gap-6 group-hover:[animation-play-state:paused]">
            {[...SOFTWARE, ...SOFTWARE].map((item, index) => <div key={`${item}-${index}`} className="software-item flex items-center gap-6 whitespace-nowrap font-heading text-base font-bold uppercase text-muted-foreground transition-all duration-300 hover:scale-105 hover:text-highlight md:text-2xl"><span className="size-1.5 rounded-full bg-highlight/70" />{item}</div>)}
          </div>
        </div>
      </section>

      <section className="section-shell pb-24 md:pb-40">
        <SectionHeading number="02" title="Professional Experience" />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {EXPERIENCE.map((item, index) => <ExperienceCard key={item.role} item={item} index={index} />)}
        </div>
      </section>

      <section className="section-shell pb-24 md:pb-40">
        <SectionHeading number="03" title="Leadership Experience" />
        <div className="mt-12 grid gap-4 md:grid-cols-12 md:grid-rows-2">
          {LEADERSHIP.map((item, index) => (
            <Reveal key={item.role} className={index === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5"}>
              <article className="group flex h-full min-h-64 flex-col justify-between border border-border bg-surface/55 p-7 backdrop-blur-md transition-all duration-500 hover:border-highlight/50 hover:bg-surface-strong/70 md:p-9">
                <div className="flex justify-between"><span className="font-body text-[10px] uppercase tracking-[0.22em] text-highlight">0{index + 1} / Role</span><ArrowDownRight size={18} className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-highlight" /></div>
                <div className="mt-16"><p className="mb-2 font-body text-xs uppercase tracking-[0.18em] text-muted-foreground">{item.org}</p><h3 className="font-heading text-2xl font-bold uppercase md:text-3xl">{item.role}</h3><p className="mt-5 max-w-md font-body text-sm leading-relaxed text-muted-foreground">{item.note}</p></div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="works" className="border-y border-border/50 bg-deep py-24 md:py-40">
        <div className="section-shell">
          <SectionHeading number="04" title="Works / Project Archive" />
          <p className="mt-5 max-w-lg font-body text-sm leading-relaxed text-muted-foreground">A working archive of forms, questions and unfinished ideas. Select a file to examine its contents.</p>
          <div className="mt-14 space-y-3">
            {ARCHIVE.map((file, index) => <ArchiveFile key={file.name} file={file} index={index} isOpen={openFile === index} onOpen={() => setOpenFile(openFile === index ? null : index)} setCursorLabel={(label) => setCursor((value) => ({ ...value, label }))} />)}
          </div>
        </div>
      </section>

      <section id="connect" className="section-shell flex min-h-[78vh] flex-col justify-center py-24 md:py-36">
        <SectionHeading number="05" title="Connect" />
        <Reveal className="mt-14"><h2 className="max-w-5xl font-heading text-[clamp(2.8rem,7vw,7.5rem)] font-bold uppercase leading-[0.95]">Let&apos;s create<br />something <span className="text-highlight">meaningful.</span></h2></Reveal>
        <div className="mt-16 grid gap-10 border-t border-border pt-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="flex flex-wrap gap-x-8 gap-y-4">{SOCIALS.map((social) => <a key={social} href="#connect" onMouseEnter={() => setCursor((v) => ({ ...v, label: "CONNECT" }))} onMouseLeave={() => setCursor((v) => ({ ...v, label: "" }))} className="link-line font-body text-sm text-muted-foreground hover:text-highlight">{social}</a>)}</div>
          <button aria-label="Start a conversation" onMouseEnter={() => setCursor((v) => ({ ...v, label: "CONNECT" }))} onMouseLeave={() => setCursor((v) => ({ ...v, label: "" }))} className="group flex size-28 items-center justify-center rounded-full bg-highlight text-accent-foreground transition-all duration-500 hover:scale-105 hover:bg-highlight-strong md:size-36"><ArrowDownRight className="size-9 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 md:size-12" /></button>
        </div>
      </section>

      <footer className="border-t border-border py-8"><div className="section-shell flex flex-col gap-5 font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:flex-row md:items-center md:justify-between"><span className="font-heading font-bold text-foreground">Industrial Designer</span><span>© 2026 — All rights reserved</span><div className="flex gap-5"><a href="#connect" className="hover:text-highlight">LI</a><a href="#connect" className="hover:text-highlight">IG</a><a href="#connect" className="hover:text-highlight">BE</a></div></div></footer>
    </main>
  );
}

function PortraitCard({ reduceMotion, setCursorLabel }: { reduceMotion: boolean; setCursorLabel: (label: string) => void }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handlePointer = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    setTilt({ x: ((event.clientY - rect.top) / rect.height - 0.5) * -8, y: ((event.clientX - rect.left) / rect.width - 0.5) * 8 });
  };
  return <motion.div onPointerMove={handlePointer} onPointerEnter={() => setCursorLabel("HELLO")} onPointerLeave={() => { setTilt({ x: 0, y: 0 }); setCursorLabel(""); }} whileHover={reduceMotion ? {} : { scale: 1.045 }} whileTap={{ scale: 0.98, rotate: -1 }} animate={{ rotateX: tilt.x, rotateY: tilt.y }} transition={{ type: "spring", stiffness: 180, damping: 20 }} className="group relative mx-auto w-full max-w-[310px] [perspective:900px]">
    <div className="absolute -inset-3 translate-x-3 translate-y-3 rounded-[5px] border border-highlight/20 bg-teal/40 transition-all duration-500 group-hover:translate-x-4 group-hover:translate-y-4 group-hover:shadow-[0_20px_70px_var(--shadow-accent)]" />
    <div className="relative aspect-[4/5] overflow-hidden rounded-[5px] border border-border bg-surface"><img src={portrait} alt="Industrial designer portrait placeholder" width={1024} height={1280} className="h-full w-full object-cover grayscale-[20%] transition duration-700 group-hover:grayscale-0" /><div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-background/90 to-transparent p-5 pt-16"><span className="flex size-9 items-center justify-center rounded-full border border-highlight/50 bg-deep/80"><ArrowDownRight size={14} className="text-highlight" /></span></div></div>
  </motion.div>;
}

function MagneticButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  return <motion.button ref={ref} onClick={onClick} onMouseMove={(event) => { const rect = ref.current?.getBoundingClientRect(); if (rect) setPosition({ x: (event.clientX - rect.left - rect.width / 2) * 0.12, y: (event.clientY - rect.top - rect.height / 2) * 0.12 }); }} onMouseLeave={() => setPosition({ x: 0, y: 0 })} animate={position} className="group flex items-center gap-4 rounded-full border border-border bg-surface px-6 py-3 font-body text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:border-highlight/50 hover:bg-teal"><span>{children}</span><span className="flex size-7 items-center justify-center rounded-full bg-highlight text-accent-foreground transition-transform group-hover:translate-x-1">↘</span></motion.button>;
}

function SectionHeading({ number, title }: { number: string; title: string }) { return <Reveal><div className="flex items-end justify-between gap-5 border-b border-border pb-5"><h2 className="font-heading text-3xl font-bold uppercase md:text-5xl">{title}</h2><span className="font-body text-[10px] tracking-[0.2em] text-highlight">({number})</span></div></Reveal>; }

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>; }

function ExperienceCard({ item, index }: { item: (typeof EXPERIENCE)[number]; index: number }) { return <Reveal><motion.article whileHover={{ y: -8 }} className="group flex min-h-[390px] flex-col border border-border bg-surface/60 p-7 backdrop-blur-md transition-colors duration-500 hover:border-highlight/50 hover:bg-surface-strong/80 md:p-8"><div className="flex items-start justify-between"><span className="font-body text-[10px] tracking-[0.18em] text-highlight">0{index + 1}</span><ArrowRight size={18} className="translate-x-2 text-highlight opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" /></div><div className="mt-auto"><p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{item.company}</p><h3 className="mt-3 font-heading text-2xl font-bold uppercase">{item.role}</h3><p className="mt-2 font-body text-xs text-highlight">{item.period}</p><p className="mt-6 font-body text-sm leading-relaxed text-muted-foreground transition-transform duration-500 group-hover:-translate-y-1">{item.note}</p></div></motion.article></Reveal>; }

function ArchiveFile({ file, index, isOpen, onOpen, setCursorLabel }: { file: (typeof ARCHIVE)[number]; index: number; isOpen: boolean; onOpen: () => void; setCursorLabel: (label: string) => void }) {
  return <motion.article layout className={`archive-file ${isOpen ? "archive-file-open" : ""}`}>
    <button onClick={onOpen} onMouseEnter={() => setCursorLabel("VIEW")} onMouseLeave={() => setCursorLabel("")} aria-expanded={isOpen} className="relative z-30 flex w-full items-center justify-between gap-4 px-5 py-6 text-left md:px-8">
      <div className="flex min-w-0 items-center gap-4 md:gap-7"><Folder className={`shrink-0 ${isOpen ? "text-highlight" : "text-muted-foreground"}`} size={22} /><span className="font-body text-[10px] text-muted-foreground">0{index + 1}</span><h3 className="truncate font-heading text-lg font-bold uppercase md:text-3xl">{file.name}</h3></div><div className="flex items-center gap-5"><span className="hidden font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:block">{file.count}</span><span className={`flex size-9 items-center justify-center rounded-full border transition-all ${isOpen ? "rotate-45 border-highlight bg-highlight text-accent-foreground" : "border-border text-foreground"}`}><ArrowDownRight size={16} /></span></div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden"><div className="relative flex min-h-[410px] items-center justify-center px-5 pb-10 pt-5 md:min-h-[520px] md:px-12">
        {file.projects.map((project, projectIndex) => { const x = (projectIndex - 1) * 36; const rotate = (projectIndex - 1) * 7; const y = projectIndex === 1 ? -24 : 20; return <motion.figure key={project.title} initial={{ x: 0, y: 150, rotate: 0, scale: 0.65, opacity: 0 }} animate={{ x: `${x}%`, y, rotate, scale: 1, opacity: 1 }} exit={{ x: 0, y: 140, rotate: 0, scale: 0.7, opacity: 0 }} transition={{ type: "spring", stiffness: 95, damping: 18, delay: projectIndex * 0.06 }} onMouseEnter={() => setCursorLabel("EXPLORE")} onMouseLeave={() => setCursorLabel("")} className="group absolute w-[68vw] max-w-[390px] origin-bottom cursor-none overflow-hidden rounded-[4px] border border-border bg-surface shadow-2xl transition-[border-color] hover:z-20 hover:border-highlight"><div className="aspect-[4/3] overflow-hidden"><img src={project.image} alt={`${project.title} placeholder project`} loading="lazy" width={1408} height={1056} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" /></div><figcaption className="flex items-center justify-between bg-deep/95 px-4 py-3 font-body text-[10px] uppercase tracking-[0.15em]"><span>{project.title}</span><ExternalLink size={13} className="text-highlight" /></figcaption></motion.figure>; })}
      </div></motion.div>}
    </AnimatePresence>
  </motion.article>;
}