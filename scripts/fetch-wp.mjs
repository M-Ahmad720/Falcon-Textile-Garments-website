import { writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";

async function getJson(url) {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.json();
}

async function getAll(url) {
  const first = await fetch(url, { headers: { Accept: "application/json" } });
  if (!first.ok) throw new Error(`${url} ${first.status}`);
  const totalPages = Number(first.headers.get("X-WP-TotalPages") || "1");
  const data = await first.json();
  const all = Array.isArray(data) ? [...data] : data;
  for (let page = 2; page <= totalPages; page++) {
    const sep = url.includes("?") ? "&" : "?";
    const more = await getJson(`${url}${sep}page=${page}`);
    if (Array.isArray(more)) all.push(...more);
  }
  return all;
}

const base = "https://falcontextilegarments.com/wp-json";

const [media, products, cats, pages, posts] = await Promise.all([
  getAll(`${base}/wp/v2/media?per_page=100`),
  getAll(`${base}/wp/v2/product?per_page=100&_embed=1`),
  getJson(`${base}/wp/v2/product_cat?per_page=100`),
  getJson(`${base}/wp/v2/pages?per_page=50`),
  getJson(`${base}/wp/v2/posts?per_page=20`),
]);

mkdirSync("d:/falcon/scripts/wp", { recursive: true });

const mediaSummary = media
  .filter((m) => m.media_type === "image")
  .map((m) => ({
    id: m.id,
    title: m.title?.rendered,
    alt: m.alt_text,
    source: m.source_url,
  }));

const productSummary = products.map((p) => {
  const featured =
    p._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
  return {
    id: p.id,
    slug: p.slug,
    title: decode(p.title?.rendered),
    excerpt: strip(p.excerpt?.rendered),
    content: strip(p.content?.rendered),
    featured,
    link: p.link,
    categories: (p._embedded?.["wp:term"] || []).flat().map((t) => ({
      slug: t.slug,
      name: t.name,
      taxonomy: t.taxonomy,
    })),
  };
});

const catSummary = cats.map((c) => ({
  id: c.id,
  slug: c.slug,
  name: c.name,
  count: c.count,
  description: strip(c.description),
}));

const pageSummary = pages.map((p) => ({
  slug: p.slug,
  title: decode(p.title?.rendered),
  link: p.link,
}));

writeFileSync("d:/falcon/scripts/wp/media.json", JSON.stringify(mediaSummary, null, 2));
writeFileSync("d:/falcon/scripts/wp/products.json", JSON.stringify(productSummary, null, 2));
writeFileSync("d:/falcon/scripts/wp/categories.json", JSON.stringify(catSummary, null, 2));
writeFileSync("d:/falcon/scripts/wp/pages.json", JSON.stringify(pageSummary, null, 2));
writeFileSync(
  "d:/falcon/scripts/wp/posts.json",
  JSON.stringify(
    posts.map((p) => ({
      slug: p.slug,
      title: decode(p.title?.rendered),
      excerpt: strip(p.excerpt?.rendered),
      date: p.date,
      featured: p.featured_media,
    })),
    null,
    2
  )
);

console.log({
  media: mediaSummary.length,
  products: productSummary.length,
  cats: catSummary.length,
  pages: pageSummary.length,
  posts: posts.length,
});
console.log("pages", pageSummary);
console.log("cats", catSummary);
console.log("products", productSummary.map((p) => ({ slug: p.slug, title: p.title, featured: p.featured })));

function strip(html = "") {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}
function decode(s = "") {
  return s.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n)).replace(/&amp;/g, "&");
}
