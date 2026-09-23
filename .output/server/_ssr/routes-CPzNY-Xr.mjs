import { n as __toESM } from "../_runtime.mjs";
import { r as AnimatePresence, t as useReducedMotion } from "../_libs/framer-motion+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { a as ArrowRight, i as ExternalLink, n as Menu, o as ArrowDownRight, r as Folder, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CPzNY-Xr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var designer_portrait_default = "/assets/designer-portrait-BNDIgd-v.jpg";
var project_chair_default = "/assets/project-chair-Dud_xy1u.jpg";
var project_device_default = "/assets/project-device-DQgemGsk.jpg";
var project_research_default = "/assets/project-research-D9RQzyFU.jpg";
var SOFTWARE = [
	"Adobe Illustrator",
	"Adobe Photoshop",
	"Figma",
	"SolidWorks",
	"Fusion 360"
];
var EXPERIENCE = [
	{
		company: "Company / Studio",
		role: "Industrial Design Intern",
		period: "20XX — 20XX",
		note: "Add a concise description of your contribution and the products you helped shape."
	},
	{
		company: "Organisation",
		role: "Product Design Intern",
		period: "20XX — 20XX",
		note: "Add a short summary of your role, process and most meaningful outcome."
	},
	{
		company: "Independent",
		role: "Design Collaborator",
		period: "20XX — Present",
		note: "Add a brief note about the collaboration, responsibilities and impact."
	}
];
var LEADERSHIP = [
	{
		role: "Leadership Role",
		org: "Student Organisation",
		note: "Describe how you guided a team, initiative or creative community."
	},
	{
		role: "Design Lead",
		org: "Campus Initiative",
		note: "Describe the challenge, your approach and the shared result."
	},
	{
		role: "Workshop Facilitator",
		org: "Design Community",
		note: "Describe how you helped others learn through making and conversation."
	}
];
var ARCHIVE = [
	{
		name: "Product Design",
		count: "03 studies",
		projects: [
			{
				title: "Seating Study",
				image: project_chair_default
			},
			{
				title: "Tactile Device",
				image: project_device_default
			},
			{
				title: "Form Language",
				image: project_research_default
			}
		]
	},
	{
		name: "Research",
		count: "03 studies",
		projects: [
			{
				title: "Material Atlas",
				image: project_research_default
			},
			{
				title: "Ergonomic Study",
				image: project_device_default
			},
			{
				title: "Behaviour Mapping",
				image: project_chair_default
			}
		]
	},
	{
		name: "Graphic Design",
		count: "03 studies",
		projects: [
			{
				title: "Visual Systems",
				image: project_research_default
			},
			{
				title: "Object Stories",
				image: project_chair_default
			},
			{
				title: "Field Notes",
				image: project_device_default
			}
		]
	},
	{
		name: "UX / UI",
		count: "03 studies",
		projects: [
			{
				title: "Product Interface",
				image: project_device_default
			},
			{
				title: "Research Tool",
				image: project_research_default
			},
			{
				title: "Spatial Control",
				image: project_chair_default
			}
		]
	},
	{
		name: "Experiments",
		count: "03 studies",
		projects: [
			{
				title: "Soft Geometry",
				image: project_chair_default
			},
			{
				title: "Sense Object",
				image: project_device_default
			},
			{
				title: "Process Fragments",
				image: project_research_default
			}
		]
	}
];
var SOCIALS = [
	"Email",
	"LinkedIn",
	"Instagram",
	"Behance"
];
function PortfolioHome() {
	const reduceMotion = useReducedMotion();
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [openFile, setOpenFile] = (0, import_react.useState)(0);
	const [cursor, setCursor] = (0, import_react.useState)({
		x: -100,
		y: -100,
		label: ""
	});
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 30);
		const onMove = (event) => setCursor((value) => ({
			...value,
			x: event.clientX,
			y: event.clientY
		}));
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("mousemove", onMove, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("mousemove", onMove);
		};
	}, []);
	const scrollTo = (id) => {
		document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
		setMenuOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen overflow-x-clip bg-background text-foreground selection:bg-accent selection:text-accent-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "pointer-events-none fixed left-0 top-0 z-[100] hidden size-3 rounded-full border border-highlight/70 bg-highlight/25 backdrop-blur-sm lg:flex lg:items-center lg:justify-center",
				animate: {
					x: cursor.x - (cursor.label ? 30 : 6),
					y: cursor.y - (cursor.label ? 14 : 6),
					width: cursor.label ? 60 : 12,
					height: cursor.label ? 28 : 12
				},
				transition: {
					type: "spring",
					stiffness: 500,
					damping: 32
				},
				children: cursor.label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-body text-[9px] font-semibold uppercase text-foreground",
					children: cursor.label
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: `fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-border/70 bg-background/75 backdrop-blur-xl" : "bg-transparent"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10",
					"aria-label": "Primary navigation",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => scrollTo("home"),
							className: "group flex items-center gap-3 text-left",
							"aria-label": "Return home",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-highlight transition-transform group-hover:scale-150" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-heading text-xs font-bold uppercase tracking-[0.18em]",
								children: "ID / 26"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden items-center gap-10 md:flex",
							children: [
								"Home",
								"Works",
								"Connect"
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => scrollTo(item.toLowerCase()),
								className: `nav-link ${item === "Home" ? "nav-link-active" : ""}`,
								children: item
							}, item))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "flex size-10 items-center justify-center rounded-full border border-border bg-surface/60 md:hidden",
							onClick: () => setMenuOpen((value) => !value),
							"aria-label": menuOpen ? "Close menu" : "Open menu",
							"aria-expanded": menuOpen,
							children: menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 18 })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: -12
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						y: -12
					},
					className: "border-b border-border bg-background/95 px-5 pb-6 backdrop-blur-xl md:hidden",
					children: [
						"Home",
						"Works",
						"Connect"
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => scrollTo(item.toLowerCase()),
						className: "block w-full border-b border-border py-4 text-left font-heading text-lg font-bold uppercase",
						children: item
					}, item))
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "home",
				className: "relative mx-auto flex min-h-[920px] max-w-[1440px] flex-col justify-center px-5 pb-16 pt-28 md:min-h-screen md:px-10 md:pb-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-y-0 left-5 border-l border-border/40 md:left-10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-y-0 right-5 border-r border-border/40 md:right-10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-6 ml-4 font-body text-[10px] uppercase tracking-[0.26em] text-muted-foreground md:ml-8",
						children: [
							"Research ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-2 text-highlight",
								children: "→"
							}),
							" Ideas ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-2 text-highlight",
								children: "→"
							}),
							" Form ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-2 text-highlight",
								children: "→"
							}),
							" Experience"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
							initial: {
								opacity: 0,
								y: 36
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .9,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "font-heading text-[clamp(3.25rem,10.7vw,10rem)] font-extrabold uppercase leading-[0.82] tracking-normal",
							children: [
								"Industrial",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-[8vw] text-stroke md:ml-[15vw]",
									children: "Designer"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 grid items-end gap-8 md:grid-cols-[1fr_310px_1fr] md:gap-12",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.p, {
									initial: {
										opacity: 0,
										y: 16
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: {
										delay: .45,
										duration: .7
									},
									className: "max-w-xs font-body text-base leading-relaxed text-muted-foreground md:pb-10 md:text-lg",
									children: [
										"From a spark of thought",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"to a world of ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-highlight",
											children: "possibilities."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortraitCard, {
									reduceMotion: Boolean(reduceMotion),
									setCursorLabel: (label) => setCursor((value) => ({
										...value,
										label
									}))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex md:justify-end md:pb-10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
										onClick: () => scrollTo("connect"),
										children: ["Contact ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { size: 17 })]
									})
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-6 left-10 hidden items-center gap-3 font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-highlight/60" }), " Scroll to explore"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "section-shell border-y border-border/50 py-24 md:py-36",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "max-w-5xl font-body text-2xl leading-[1.45] text-muted-foreground md:text-4xl",
					children: [
						"An Industrial Designer exploring ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground",
							children: "product development"
						}),
						", visual design and experiences through ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-highlight",
							children: "curiosity"
						}),
						", research and making."
					]
				}) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "section-shell py-24 md:py-36",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					number: "01",
					title: "Software Skills"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "marquee-mask group mt-10 overflow-hidden border-y border-border bg-surface/45 py-7 backdrop-blur-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "marquee-track flex w-max items-center gap-6 group-hover:[animation-play-state:paused]",
						children: [...SOFTWARE, ...SOFTWARE].map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "software-item flex items-center gap-6 whitespace-nowrap font-heading text-base font-bold uppercase text-muted-foreground transition-all duration-300 hover:scale-105 hover:text-highlight md:text-2xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-highlight/70" }), item]
						}, `${item}-${index}`))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "section-shell pb-24 md:pb-40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					number: "02",
					title: "Professional Experience"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-4 md:grid-cols-3",
					children: EXPERIENCE.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperienceCard, {
						item,
						index
					}, item.role))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "section-shell pb-24 md:pb-40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					number: "03",
					title: "Leadership Experience"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-4 md:grid-cols-12 md:grid-rows-2",
					children: LEADERSHIP.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						className: index === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "group flex h-full min-h-64 flex-col justify-between border border-border bg-surface/55 p-7 backdrop-blur-md transition-all duration-500 hover:border-highlight/50 hover:bg-surface-strong/70 md:p-9",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-body text-[10px] uppercase tracking-[0.22em] text-highlight",
									children: [
										"0",
										index + 1,
										" / Role"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, {
									size: 18,
									className: "text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-highlight"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-16",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-2 font-body text-xs uppercase tracking-[0.18em] text-muted-foreground",
										children: item.org
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-heading text-2xl font-bold uppercase md:text-3xl",
										children: item.role
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-5 max-w-md font-body text-sm leading-relaxed text-muted-foreground",
										children: item.note
									})
								]
							})]
						})
					}, item.role))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "works",
				className: "border-y border-border/50 bg-deep py-24 md:py-40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-shell",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "04",
							title: "Works / Project Archive"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-lg font-body text-sm leading-relaxed text-muted-foreground",
							children: "A working archive of forms, questions and unfinished ideas. Select a file to examine its contents."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-14 space-y-3",
							children: ARCHIVE.map((file, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveFile, {
								file,
								index,
								isOpen: openFile === index,
								onOpen: () => setOpenFile(openFile === index ? null : index),
								setCursorLabel: (label) => setCursor((value) => ({
									...value,
									label
								}))
							}, file.name))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "connect",
				className: "section-shell flex min-h-[78vh] flex-col justify-center py-24 md:py-36",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						number: "05",
						title: "Connect"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						className: "mt-14",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "max-w-5xl font-heading text-[clamp(2.8rem,7vw,7.5rem)] font-bold uppercase leading-[0.95]",
							children: [
								"Let's create",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"something ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-highlight",
									children: "meaningful."
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-16 grid gap-10 border-t border-border pt-8 md:grid-cols-[1fr_auto] md:items-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-x-8 gap-y-4",
							children: SOCIALS.map((social) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#connect",
								onMouseEnter: () => setCursor((v) => ({
									...v,
									label: "CONNECT"
								})),
								onMouseLeave: () => setCursor((v) => ({
									...v,
									label: ""
								})),
								className: "link-line font-body text-sm text-muted-foreground hover:text-highlight",
								children: social
							}, social))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": "Start a conversation",
							onMouseEnter: () => setCursor((v) => ({
								...v,
								label: "CONNECT"
							})),
							onMouseLeave: () => setCursor((v) => ({
								...v,
								label: ""
							})),
							className: "group flex size-28 items-center justify-center rounded-full bg-highlight text-accent-foreground transition-all duration-500 hover:scale-105 hover:bg-highlight-strong md:size-36",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "size-9 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 md:size-12" })
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-shell flex flex-col gap-5 font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:flex-row md:items-center md:justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-heading font-bold text-foreground",
							children: "Industrial Designer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "© 2026 — All rights reserved" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#connect",
									className: "hover:text-highlight",
									children: "LI"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#connect",
									className: "hover:text-highlight",
									children: "IG"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#connect",
									className: "hover:text-highlight",
									children: "BE"
								})
							]
						})
					]
				})
			})
		]
	});
}
function PortraitCard({ reduceMotion, setCursorLabel }) {
	const [tilt, setTilt] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const handlePointer = (event) => {
		if (reduceMotion || event.pointerType === "touch") return;
		const rect = event.currentTarget.getBoundingClientRect();
		setTilt({
			x: ((event.clientY - rect.top) / rect.height - .5) * -8,
			y: ((event.clientX - rect.left) / rect.width - .5) * 8
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		onPointerMove: handlePointer,
		onPointerEnter: () => setCursorLabel("HELLO"),
		onPointerLeave: () => {
			setTilt({
				x: 0,
				y: 0
			});
			setCursorLabel("");
		},
		whileHover: reduceMotion ? {} : { scale: 1.045 },
		whileTap: {
			scale: .98,
			rotate: -1
		},
		animate: {
			rotateX: tilt.x,
			rotateY: tilt.y
		},
		transition: {
			type: "spring",
			stiffness: 180,
			damping: 20
		},
		className: "group relative mx-auto w-full max-w-[310px] [perspective:900px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-3 translate-x-3 translate-y-3 rounded-[5px] border border-highlight/20 bg-teal/40 transition-all duration-500 group-hover:translate-x-4 group-hover:translate-y-4 group-hover:shadow-[0_20px_70px_var(--shadow-accent)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[4/5] overflow-hidden rounded-[5px] border border-border bg-surface",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: designer_portrait_default,
				alt: "Industrial designer portrait placeholder",
				width: 1024,
				height: 1280,
				className: "h-full w-full object-cover grayscale-[20%] transition duration-700 group-hover:grayscale-0"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-background/90 to-transparent p-5 pt-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-9 items-center justify-center rounded-full border border-highlight/50 bg-deep/80",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, {
						size: 14,
						className: "text-highlight"
					})
				})
			})]
		})]
	});
}
function MagneticButton({ children, onClick }) {
	const ref = (0, import_react.useRef)(null);
	const [position, setPosition] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
		ref,
		onClick,
		onMouseMove: (event) => {
			const rect = ref.current?.getBoundingClientRect();
			if (rect) setPosition({
				x: (event.clientX - rect.left - rect.width / 2) * .12,
				y: (event.clientY - rect.top - rect.height / 2) * .12
			});
		},
		onMouseLeave: () => setPosition({
			x: 0,
			y: 0
		}),
		animate: position,
		className: "group flex items-center gap-4 rounded-full border border-border bg-surface px-6 py-3 font-body text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:border-highlight/50 hover:bg-teal",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex size-7 items-center justify-center rounded-full bg-highlight text-accent-foreground transition-transform group-hover:translate-x-1",
			children: "↘"
		})]
	});
}
function SectionHeading({ number, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-end justify-between gap-5 border-b border-border pb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-heading text-3xl font-bold uppercase md:text-5xl",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-body text-[10px] tracking-[0.2em] text-highlight",
			children: [
				"(",
				number,
				")"
			]
		})]
	}) });
}
function Reveal({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className,
		initial: {
			opacity: 0,
			y: 28
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-80px"
		},
		transition: {
			duration: .7,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		children
	});
}
function ExperienceCard({ item, index }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
		whileHover: { y: -8 },
		className: "group flex min-h-[390px] flex-col border border-border bg-surface/60 p-7 backdrop-blur-md transition-colors duration-500 hover:border-highlight/50 hover:bg-surface-strong/80 md:p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-body text-[10px] tracking-[0.18em] text-highlight",
				children: ["0", index + 1]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
				size: 18,
				className: "translate-x-2 text-highlight opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
					children: item.company
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-3 font-heading text-2xl font-bold uppercase",
					children: item.role
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-body text-xs text-highlight",
					children: item.period
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 font-body text-sm leading-relaxed text-muted-foreground transition-transform duration-500 group-hover:-translate-y-1",
					children: item.note
				})
			]
		})]
	}) });
}
function ArchiveFile({ file, index, isOpen, onOpen, setCursorLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
		layout: true,
		className: `archive-file ${isOpen ? "archive-file-open" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: onOpen,
			onMouseEnter: () => setCursorLabel("VIEW"),
			onMouseLeave: () => setCursorLabel(""),
			"aria-expanded": isOpen,
			className: "relative z-30 flex w-full items-center justify-between gap-4 px-5 py-6 text-left md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-4 md:gap-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, {
						className: `shrink-0 ${isOpen ? "text-highlight" : "text-muted-foreground"}`,
						size: 22
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-body text-[10px] text-muted-foreground",
						children: ["0", index + 1]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "truncate font-heading text-lg font-bold uppercase md:text-3xl",
						children: file.name
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:block",
					children: file.count
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `flex size-9 items-center justify-center rounded-full border transition-all ${isOpen ? "rotate-45 border-highlight bg-highlight text-accent-foreground" : "border-border text-foreground"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { size: 16 })
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			initial: false,
			children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					height: 0,
					opacity: 0
				},
				animate: {
					height: "auto",
					opacity: 1
				},
				exit: {
					height: 0,
					opacity: 0
				},
				transition: {
					duration: .55,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative flex min-h-[410px] items-center justify-center px-5 pb-10 pt-5 md:min-h-[520px] md:px-12",
					children: file.projects.map((project, projectIndex) => {
						const x = (projectIndex - 1) * 36;
						const rotate = (projectIndex - 1) * 7;
						const y = projectIndex === 1 ? -24 : 20;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.figure, {
							initial: {
								x: 0,
								y: 150,
								rotate: 0,
								scale: .65,
								opacity: 0
							},
							animate: {
								x: `${x}%`,
								y,
								rotate,
								scale: 1,
								opacity: 1
							},
							exit: {
								x: 0,
								y: 140,
								rotate: 0,
								scale: .7,
								opacity: 0
							},
							transition: {
								type: "spring",
								stiffness: 95,
								damping: 18,
								delay: projectIndex * .06
							},
							onMouseEnter: () => setCursorLabel("EXPLORE"),
							onMouseLeave: () => setCursorLabel(""),
							className: "group absolute w-[68vw] max-w-[390px] origin-bottom cursor-none overflow-hidden rounded-[4px] border border-border bg-surface shadow-2xl transition-[border-color] hover:z-20 hover:border-highlight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-[4/3] overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: project.image,
									alt: `${project.title} placeholder project`,
									loading: "lazy",
									width: 1408,
									height: 1056,
									className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
								className: "flex items-center justify-between bg-deep/95 px-4 py-3 font-body text-[10px] uppercase tracking-[0.15em]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: project.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
									size: 13,
									className: "text-highlight"
								})]
							})]
						}, project.title);
					})
				})
			})
		})]
	});
}
//#endregion
export { PortfolioHome as component };
