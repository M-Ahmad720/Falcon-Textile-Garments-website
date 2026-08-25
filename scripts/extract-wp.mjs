import { readFileSync, writeFileSync, mkdirSync } from "fs";

const mediaPath =
  "C:/Users/itsah/.cursor/projects/d-falcon/agent-tools/33b1aff8-d22a-4002-8977-1f4edec03b20.txt";
const productPath =
  "C:/Users/itsah/.cursor/projects/d-falcon/agent-tools/1a385925-0c55-4ff3-b4c7-a48f8766ad4e.txt";

const media = JSON.parse(readFileSync(mediaPath, "utf8"));
const products = JSON.parse(readFileSync(productPath, "utf8"));

const mediaSummary = media.map((m) => ({
  id: m.id,
  title: m.title?.rendered,
  alt: m.alt_text,
  mime: m.mime_type,
  source: m.source_url,
  type: m.media_type,
}));

const productSummary = products.map((p) => ({
  id: p.id,
  slug: p.slug,
  title: p.title?.rendered,
  excerpt: p.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim(),
  content: p.content?.rendered?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 800),
  featured_media: p.featured_media,
  link: p.link,
  categories: p.product_cat || p.categories,
}));

writeFileSync("d:/falcon/scripts/media-summary.json", JSON.stringify(mediaSummary, null, 2));
writeFileSync("d:/falcon/scripts/product-summary.json", JSON.stringify(productSummary, null, 2));
console.log("media", mediaSummary.length);
console.log("products", productSummary.length);
console.log("sample media", mediaSummary.slice(0, 15));
console.log("sample products", productSummary.slice(0, 8));
