// Deterministic gradient per slug so each placeholder cover looks distinct
// (and stable between renders) until real artwork is dropped in.
export function gradientFor(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) % 360;
  }
  const a = hash;
  const b = (hash + 55) % 360;
  return `linear-gradient(135deg, hsl(${a} 35% 22%), hsl(${b} 40% 12%))`;
}
