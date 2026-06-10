export type Category = "web" | "app" | "branding";

/** Aspect ratios supported by the case-study media frames (ProjectMedia). */
export type MediaAspect = "ultrawide" | "wide" | "square" | "portrait" | "tall";

export type ProjectStat = { value: string; label: string };
export type Swatch = { name: string; hex: string };

export type GalleryItem = {
  /**
   * Swap-ready image path under /public (e.g.
   * "/assets/projects/crunchies/menu.jpg"). Leave undefined to render a
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
      cover: "/assets/projects/nestora/cover.jpg",
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
      stack: ["MongoDB", "Express", "React", "Node.js", "Redux Toolkit", "Mapbox"],
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
          src: "/assets/projects/nestora/01.jpg",
          label: "Map-led search results",
          aspect: "ultrawide",
          full: true,
        },
        { src: "/assets/projects/nestora/02.jpg", label: "Listing detail", aspect: "portrait" },
        { src: "/assets/projects/nestora/03.jpg", label: "Saved homes", aspect: "portrait" },
        { src: "/assets/projects/nestora/04.jpg", label: "Photo-first listing cards", aspect: "wide" },
        { src: "/assets/projects/nestora/05.jpg", label: "Virtual tour view", aspect: "wide" },
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
      stack: ["Next.js", "TypeScript", "tRPC", "Prisma", "PostgreSQL", "Recharts"],
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
        { src: "/assets/projects/ledgerly/02.jpg", label: "Mobile portfolio", aspect: "portrait" },
        { src: "/assets/projects/ledgerly/03.jpg", label: "Marketing site", aspect: "portrait" },
        { src: "/assets/projects/ledgerly/04.jpg", label: "Markets & watchlists", aspect: "wide" },
        { src: "/assets/projects/ledgerly/05.jpg", label: "Building the design system", aspect: "wide" },
      ],
    },
  },
  {
    slug: "atelier",
    name: "Atelier",
    description: "A headless commerce storefront on Medusa and Next.js",
    categories: ["web", "branding"],
    detail: {
      year: "2026",
      sector: "Fashion & e-commerce",
      cover: "/assets/projects/atelier/cover.jpg",
      tagline:
        "A headless storefront where the catalogue reads like a lookbook and checkout never interrupts.",
      overview:
        "Atelier is a fashion storefront we built on Medusa and Next.js — a fully headless commerce stack with editorial product pages, region-aware pricing and a checkout that stays out of the way of the clothes.",
      challenge:
        "Template storefronts make every brand look the same. Atelier needed lookbook-grade art direction on top of real commerce plumbing — multi-region carts, live inventory and promotions — without trading away performance.",
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
        { name: "Noir", hex: "#0E0E0E" },
        { name: "Bone", hex: "#F2EDE6" },
        { name: "Camel", hex: "#B08850" },
        { name: "Navy", hex: "#1F2A44" },
      ],
      gallery: [
        {
          src: "/assets/projects/atelier/01.jpg",
          label: "Collection landing",
          aspect: "ultrawide",
          full: true,
        },
        { src: "/assets/projects/atelier/02.jpg", label: "Product detail", aspect: "portrait" },
        { src: "/assets/projects/atelier/03.jpg", label: "Campaign drop", aspect: "portrait" },
        { src: "/assets/projects/atelier/04.jpg", label: "Product photography", aspect: "wide" },
        { src: "/assets/projects/atelier/05.jpg", label: "Express checkout", aspect: "wide" },
      ],
    },
  },
  {
    slug: "plume",
    name: "Plume",
    description: "A digital publication powered by a headless Strapi CMS",
    categories: ["web", "branding"],
    detail: {
      year: "2025",
      sector: "Media & publishing",
      cover: "/assets/projects/plume/cover.jpg",
      tagline:
        "An editorial platform where writers publish in minutes and every article ships print-quality.",
      overview:
        "Plume is a digital publication we designed and built on Strapi and Next.js — a headless newsroom where editors model their own content types and the front end renders every story with magazine-grade typography.",
      challenge:
        "The editorial team was fighting their old CMS: rigid templates, slow previews, and a design that flattened every story into the same grey column. Plume had to give editors freedom without letting the typography fall apart.",
      approach:
        "We modelled articles, essays and photo stories as separate Strapi content types, each with its own art-directed layout. Draft previews render through Next.js in real time, and a strict type scale keeps even the wildest layout readable.",
      deliverables: [
        "Editorial design",
        "Brand & wordmark",
        "Content modelling",
        "Strapi setup",
        "Front-end build",
      ],
      stack: ["Strapi", "Next.js", "PostgreSQL", "Tailwind CSS", "Cloudinary"],
      stats: [
        { value: "120+", label: "Articles migrated" },
        { value: "3min", label: "Editor to live" },
        { value: "2.4×", label: "Average read time" },
        { value: "100", label: "Lighthouse accessibility" },
      ],
      palette: [
        { name: "Ink", hex: "#141414" },
        { name: "Ivory", hex: "#FAF6EF" },
        { name: "Crimson", hex: "#C73E3A" },
        { name: "Gold", hex: "#C9A227" },
      ],
      gallery: [
        {
          src: "/assets/projects/plume/01.jpg",
          label: "Front page",
          aspect: "ultrawide",
          full: true,
        },
        { src: "/assets/projects/plume/02.jpg", label: "Article view", aspect: "portrait" },
        { src: "/assets/projects/plume/03.jpg", label: "Author desk", aspect: "portrait" },
        { src: "/assets/projects/plume/04.jpg", label: "Strapi editor in use", aspect: "wide" },
        { src: "/assets/projects/plume/05.jpg", label: "Reading list", aspect: "wide" },
      ],
    },
  },
];

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

// Curated subset shown on the home page, split into two columns with the
// right column offset downward. `tall` controls the card aspect (3:4 vs 1:1)
// to reproduce the source's varied masonry rhythm.
export type FeaturedProject = Project & { tall?: boolean };

const bySlug = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug) as Project;

export const FEATURED_LEFT: FeaturedProject[] = [
  { ...bySlug("nestora"), tall: true },
  { ...bySlug("atelier") },
];

export const FEATURED_RIGHT: FeaturedProject[] = [
  { ...bySlug("ledgerly"), tall: true },
  { ...bySlug("plume") },
];
