export type Category = "web" | "app" | "branding";

export type Project = {
  slug: string;
  name: string;
  description: string;
  categories: Category[];
};

// Mirrors the source grid. Cover images are expected at
// /public/assets/projects/<slug>/cover.jpg (+ cover@2x.jpg for retina).
export const PROJECTS: Project[] = [
  {
    slug: "puntopago",
    name: "Punto Pago",
    description: "The First Super-App in Latin America",
    categories: ["app", "branding"],
  },
  {
    slug: "sca",
    name: "Sweeping Corp of America",
    description: "Redesign for a nationwide sweeping company",
    categories: ["web"],
  },
  {
    slug: "kzero",
    name: "Kelvin Zero",
    description: "A digital product for passwordless authentication",
    categories: ["web"],
  },
  {
    slug: "daoway",
    name: "DaoWay",
    description: "Astrology planner app: plan, achieve, thrive",
    categories: ["app"],
  },
  {
    slug: "flipaclip",
    name: "FlipaClip",
    description: "The best tool for stop-motion animation",
    categories: ["web"],
  },
  {
    slug: "riyadh",
    name: "Riyadh",
    description: "Official website of Riyadh, Saudi Arabia's capital",
    categories: ["web", "app"],
  },
  {
    slug: "zelt",
    name: "Zelt",
    description: "Run HR, IT & Finance in one place",
    categories: ["web", "branding"],
  },
  {
    slug: "potion",
    name: "Potion",
    description: "Sales tool for increasing conversions",
    categories: ["web"],
  },
  {
    slug: "magma",
    name: "Magma",
    description: "The ultimate tool for building in the Web3 era",
    categories: ["web"],
  },
  {
    slug: "cisco",
    name: "Cisco",
    description: "Cloud based network management",
    categories: ["branding"],
  },
  {
    slug: "qvino",
    name: "Qvino",
    description: "Wine marketplace with interactive learning",
    categories: ["app"],
  },
  {
    slug: "ferrumpipe",
    name: "Ferrumpipe",
    description: "Galvanized steel metal frame manufacturer",
    categories: ["web"],
  },
  {
    slug: "nurseclub",
    name: "Nurse CE Club",
    description: "Website revamp with 3D graphics",
    categories: ["web", "branding"],
  },
  {
    slug: "ulesson",
    name: "uLesson",
    description: "Online platform for distance learning",
    categories: ["web", "app"],
  },
  {
    slug: "sleepiest",
    name: "Sleepiest",
    description: "Sleep app helps millions fall asleep every night",
    categories: ["app"],
  },
  {
    slug: "euroauto",
    name: "EuroAuto",
    description: "Largest auto parts supplier in Russia",
    categories: ["app"],
  },
  {
    slug: "genesis",
    name: "Genesis Vision",
    description: "Private trust management and trading platform",
    categories: ["app"],
  },
  {
    slug: "wickret",
    name: "Wickret",
    description: "A new way to think about money",
    categories: ["web"],
  },
  {
    slug: "rallyreader",
    name: "Rally Reader",
    description: "Private reading coach that hears you read",
    categories: ["web", "app"],
  },
  {
    slug: "consumervoice",
    name: "ConsumerVoice",
    description: "A service that helps find verified products",
    categories: ["branding"],
  },
  {
    slug: "monmarche",
    name: "Mon Marché",
    description: "Home delivery of fresh fruit and vegetables",
    categories: ["app"],
  },
  {
    slug: "datalight",
    name: "DataLight",
    description: "Instrument for detailed cryptocurrency market analysis",
    categories: ["branding"],
  },
];

export const FILTERS: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Websites" },
  { id: "app", label: "Applications" },
  { id: "branding", label: "Branding" },
];

// Curated subset shown on the home page, split into two columns with the
// right column offset downward. `tall` controls the card aspect (3:4 vs 1:1)
// to reproduce the source's varied masonry rhythm.
export type FeaturedProject = Project & { tall?: boolean };

const bySlug = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug) as Project;

export const FEATURED_LEFT: FeaturedProject[] = [
  { ...bySlug("puntopago"), tall: true },
  { ...bySlug("sca"), tall: true },
  { ...bySlug("magma"), tall: true },
  { ...bySlug("flipaclip") },
  { ...bySlug("zelt"), tall: true },
  { ...bySlug("ferrumpipe") },
];

export const FEATURED_RIGHT: FeaturedProject[] = [
  { ...bySlug("kzero"), tall: true },
  { ...bySlug("daoway") },
  { ...bySlug("riyadh") },
  { ...bySlug("qvino"), tall: true },
  { ...bySlug("potion") },
  { ...bySlug("cisco") },
];
