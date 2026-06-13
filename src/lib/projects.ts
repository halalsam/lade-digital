export type Category = "web" | "app" | "branding";

/** Aspect ratios supported by the case-study media frames (ProjectMedia). */
export type MediaAspect = "ultrawide" | "wide" | "square" | "portrait" | "tall";

export type ProjectStat = { value: string; label: string };
export type Swatch = { name: string; hex: string };

export type GalleryItem = {
  /**
   * Swap-ready image path under /public (e.g.
   * "/assets/projects/nestora/02.png"). Leave undefined to render a
   * gradient placeholder — drop in a screenshot and set `src` to go live.
   */
  src?: string;
  /** Art-direction note shown faintly on the placeholder; doubles as alt text. */
  label: string;
  aspect?: MediaAspect;
  /** Span both columns in the masonry gallery. */
  full?: boolean;
};

/** Rich case-study content for a project detail page. */
export type ProjectDetail = {
  year: string;
  /** Industry / product area, e.g. "Food & delivery". */
  sector: string;
  /**
   * Public URL of the shipped project. When set, the project detail page shows
   * the floating "view live site" badge linking here; omit it for work that
   * isn't publicly live and the badge is hidden.
   */
  live?: string;
  /** Optional hero cover image; falls back to a gradient placeholder. */
  cover?: string;
  /** One-line statement under the title. */
  tagline: string;
  /** Lead paragraph. */
  overview: string;
  challenge?: string;
  approach?: string;
  deliverables: string[];
  stack: string[];
  stats: ProjectStat[];
  palette: Swatch[];
  gallery: GalleryItem[];
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  categories: Category[];
  detail?: ProjectDetail;
};

// Four products we designed and built end to end. Cover/gallery images live at
// /public/assets/projects/<slug>/ — swap any `src`/`cover` to update the
// artwork; frames without a `src` fall back to a deterministic gradient
// placeholder (see GalleryItem above).
export const PROJECTS: Project[] = [
  {
    slug: "nestora",
    name: "Nestora",
    description: "A real-estate marketplace built on the MERN stack",
    categories: ["web", "app"],
    detail: {
      year: "2026",
      sector: "Real estate",
      cover: "/assets/projects/nestora/cover.png",
      tagline:
        "A property marketplace where search feels like browsing homes, not databases.",
      overview:
        "Nestora is a real-estate marketplace we designed and built end to end on the MERN stack — MongoDB, Express, React and Node — pairing map-led search with listing pages that let the homes do the talking.",
      challenge:
        "Property portals drown buyers in filters, tabs and duplicate listings. Nestora had to make browsing thousands of homes feel as effortless as scrolling a feed, while keeping agents' inventory accurate in real time.",
      approach:
        "We built search around the map: results re-rank as you pan, photography leads every card, and saved searches sync instantly through a MongoDB change-stream pipeline. Agents get a dashboard that treats listings like products, not paperwork.",
      deliverables: [
        "Product strategy",
        "UX & UI design",
        "Design system",
        "Full-stack build",
        "Agent dashboard",
      ],
      stack: [
        "MongoDB",
        "Express",
        "React",
        "Node.js",
        "Redux Toolkit",
        "Mapbox",
      ],
      stats: [
        { value: "12k+", label: "Listings indexed at launch" },
        { value: "0.6s", label: "Median search response" },
        { value: "+41%", label: "Lead conversion" },
        { value: "98", label: "Lighthouse SEO" },
      ],
      palette: [
        { name: "Forest", hex: "#1F3D2B" },
        { name: "Linen", hex: "#F5F0E8" },
        { name: "Clay", hex: "#C96F4A" },
        { name: "Stone", hex: "#8A8F98" },
      ],
      gallery: [
    
        {
          src: "/assets/projects/nestora/02.png",
          label: "Map-led search results",
          aspect: "wide",
          full: true,
        },
        {
          src: "/assets/projects/nestora/03.png",
          label: "Listing detail",
          aspect: "wide",
        },
        {
          src: "/assets/projects/nestora/04.png",
          label: "Saved homes",
          aspect: "wide",
        },
        {
          src: "/assets/projects/nestora/05.png",
          label: "Photo-first listing cards",
          aspect: "wide",
        },
        {
          src: "/assets/projects/nestora/06.png",
          label: "Virtual tour view",
          aspect: "wide",
        },
      ],
    },
  },
  {
    slug: "ledgerly",
    name: "Ledgerly",
    description: "Personal-finance analytics built end to end on Next.js",
    categories: ["web", "app"],
    detail: {
      year: "2025",
      sector: "Fintech",
      cover: "/assets/projects/ledgerly/cover.jpg",
      tagline:
        "A finance dashboard that turns raw transactions into decisions you can read at a glance.",
      overview:
        "Ledgerly is a personal-finance analytics platform we designed and built on Next.js — accounts, budgets and investments unified into one fast, server-rendered dashboard that updates as money moves.",
      challenge:
        "Finance apps either oversimplify into a single balance or overwhelm with spreadsheets. Ledgerly had to make a dense, live dataset feel calm — and load fast enough that checking your money becomes a habit, not a chore.",
      approach:
        "We leaned on Next.js server components to stream the dashboard in layers — balances first, charts as they resolve — and gave every metric one chart language: same scales, same colors, same rhythm. Dark-first UI keeps long sessions easy on the eyes.",
      deliverables: [
        "Product strategy",
        "UX & UI design",
        "Data visualization",
        "Design system",
        "Front-end build",
      ],
      stack: [
        "Next.js",
        "TypeScript",
        "tRPC",
        "Prisma",
        "PostgreSQL",
        "Recharts",
      ],
      stats: [
        { value: "0.5s", label: "Largest contentful paint" },
        { value: "40+", label: "Chart & metric components" },
        { value: "<300ms", label: "Live balance sync" },
        { value: "AA", label: "WCAG contrast across themes" },
      ],
      palette: [
        { name: "Midnight", hex: "#0B1220" },
        { name: "Frost", hex: "#EDF2F7" },
        { name: "Mint", hex: "#34D399" },
        { name: "Cobalt", hex: "#2563EB" },
      ],
      gallery: [
        {
          src: "/assets/projects/ledgerly/01.jpg",
          label: "Overview dashboard",
          aspect: "ultrawide",
          full: true,
        },
        {
          src: "/assets/projects/ledgerly/02.jpg",
          label: "Mobile portfolio",
          aspect: "portrait",
        },
        {
          src: "/assets/projects/ledgerly/03.jpg",
          label: "Marketing site",
          aspect: "portrait",
        },
        {
          src: "/assets/projects/ledgerly/04.jpg",
          label: "Markets & watchlists",
          aspect: "wide",
        },
        {
          src: "/assets/projects/ledgerly/05.jpg",
          label: "Building the design system",
          aspect: "wide",
        },
      ],
    },
  },
  {
    slug: "36x",
    name: "36x",
    description: "A headless commerce storefront on Medusa and Next.js",
    categories: ["web", "branding"],
    detail: {
      year: "2026",
      sector: "Fashion & e-commerce",
      cover: "/assets/projects/36x/cover.png",
      tagline:
        "A headless storefront where the catalogue reads like a lookbook and checkout never interrupts.",
      overview:
        "36x is a fashion storefront we built on Medusa and Next.js — a fully headless commerce stack with editorial product pages, region-aware pricing and a checkout that stays out of the way of the clothes.",
      challenge:
        "Template storefronts make every brand look the same. 36x needed lookbook-grade art direction on top of real commerce plumbing — multi-region carts, live inventory and promotions — without trading away performance.",
      approach:
        "Medusa gave us the commerce engine; Next.js gave us total control of the front of house. We designed collection pages as editorial spreads, kept the cart as a quiet slide-over, and let Stripe-powered checkout finish in three steps.",
      deliverables: [
        "Brand identity",
        "Art direction",
        "UX & UI design",
        "Storefront build",
        "Medusa backend setup",
      ],
      stack: ["Medusa", "Next.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
      stats: [
        { value: "0.8s", label: "Storefront LCP" },
        { value: "+32%", label: "Checkout completion" },
        { value: "3", label: "Regions & currencies" },
        { value: "1.2k", label: "SKUs at launch" },
      ],
      palette: [
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#ffffff" },
        { name: "Light Gray", hex: "#e6e6e6" },
      ],
      gallery: [
        {
          src: "/assets/projects/36x/01.png",
          label: "Collection landing",
          aspect: "ultrawide",
          full: true,
        },
        {
          src: "/assets/projects/36x/02.png",
          label: "Product detail",
          aspect: "wide",
        },
        {
          src: "/assets/projects/36x/03.png",
          label: "Campaign drop",
          aspect: "wide",
        },
        {
          src: "/assets/projects/36x/04.png",
          label: "Product photography",
          aspect: "wide",
        },
        {
          src: "/assets/projects/36x/05.png",
          label: "Express checkout",
          aspect: "wide",
        },
      ],
    },
  },
  {
    slug: "firstmerge",
    name: "FirstMerge",
    description: "A curated feed of beginner-friendly open-source issues",
    categories: ["web", "app"],
    detail: {
      year: "2026",
      sector: "Developer tools",
      live: "https://firstmerge.vercel.app",
      cover: "/assets/projects/firstmerge/cover.png",
      tagline:
        "An issue feed that surfaces the open-source contributions most likely to actually get merged.",
      overview:
        "FirstMerge is a developer tool that helps open-source contributors find beginner-friendly GitHub issues with real merge potential. It vets issues before surfacing them — checking that they're unclaimed, that the repo is actively maintained, and that maintainers accept outside contributions — and rolls those signals into a single Merge Score.",
      challenge:
        "Finding a good first issue on GitHub is a slog: most labelled issues are stale, already claimed, or sit in repos that never merge outside PRs. New contributors burn hours on dead ends. FirstMerge had to turn thousands of noisy issues into a ranked, trustworthy feed.",
      approach:
        "We pull issues across languages through the GitHub API, score each one on maintenance activity, recency and claim status, and cache the results so the feed stays fast and fresh. Filters by language, popularity and issue size let contributors zero in, and verification timestamps make the data's freshness obvious.",
      deliverables: [
        "Product strategy",
        "UX & UI design",
        "Merge Score model",
        "Full-stack build",
        "GitHub API integration",
      ],
      stack: ["Next.js", "TypeScript", "GitHub API", "Tailwind CSS", "Vercel"],
      stats: [
        { value: "1.4k+", label: "Issues tracked" },
        { value: "1k+", label: "Likely to merge" },
        { value: "1.3k", label: "Unclaimed issues" },
        { value: "MIT", label: "Open source" },
      ],
      palette: [
        { name: "Ink", hex: "#141414" },
        { name: "Paper", hex: "#FAF6EF" },
        { name: "Merge Green", hex: "#2DA44E" },
        { name: "Slate", hex: "#57606A" },
      ],
      gallery: [
        {
          src: "/assets/projects/firstmerge/01.png",
          label: "Issue feed",
          aspect: "ultrawide",
          full: true,
        },
        {
          src: "/assets/projects/firstmerge/03.png",
          label: "Merge Score breakdown",
          aspect: "wide",
        },
        {
          src: "/assets/projects/firstmerge/04.png",
          label: "Language & popularity filters",
          aspect: "wide",
        },
        {
          src: "/assets/projects/firstmerge/05.png",
          label: "Issue detail",
          aspect: "wide",
        },
        {
          src: "/assets/projects/firstmerge/06.png",
          label: "Saved & claimed issues",
          aspect: "wide",
        },
        {
          src: "/assets/projects/firstmerge/07.png",
          label: "Repository insights",
          aspect: "wide",
        },
      ],
    },
  },
];

// (FirstMerge gallery uses 01,03–07.png — there is no 02.png in the asset set.)

export const FILTERS: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Websites" },
  { id: "app", label: "Applications" },
  { id: "branding", label: "Branding" },
];

export const CATEGORY_LABEL: Record<Category, string> = {
  web: "Web",
  app: "App",
  branding: "Branding",
};

/** A project by slug, or undefined if it doesn't exist. */
export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** The next project in the list, wrapping around — powers the detail footer. */
export function getNextProject(slug: string): Project {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
}

/** Detail content with a sensible fallback, so any project route renders a
 *  coherent case-study layout. Sections with no data (stats, palette,
 *  challenge…) are simply omitted by the page. */
export function getProjectDetail(project: Project): ProjectDetail {
  if (project.detail) return project.detail;
  return {
    year: "—",
    sector: "Selected work",
    tagline: project.description,
    overview: `${project.description}. A closer look at this project is on the way.`,
    deliverables: ["UX & UI design", "Art direction", "Front-end build"],
    stack: [],
    stats: [],
    palette: [],
    gallery: [
      { label: `${project.name} — overview`, aspect: "ultrawide", full: true },
      { label: "Detail", aspect: "portrait" },
      { label: "Detail", aspect: "portrait" },
    ],
  };
}

// Curated subset shown on the home page. `tall` is kept on the type for callers
// that still want the 3:4 aspect, though the stacked featured layout uses the
// default landscape cover.
export type FeaturedProject = Project & { tall?: boolean };

const bySlug = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug) as Project;

// Single ordered list for the stacked, one-card-per-row featured layout: each
// project gets its own full-width row, with the card itself constrained to a
// left-aligned 70% width on desktop.
export const FEATURED: FeaturedProject[] = [
  { ...bySlug("nestora") },
  { ...bySlug("ledgerly") },
  { ...bySlug("36x") },
  { ...bySlug("firstmerge") },
];
