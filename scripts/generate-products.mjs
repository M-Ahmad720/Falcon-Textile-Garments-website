import { readFileSync, writeFileSync } from "fs";

const raw = JSON.parse(readFileSync("d:/falcon/scripts/wp/products.json", "utf8"));
const cats = JSON.parse(readFileSync("d:/falcon/scripts/wp/categories.json", "utf8"));

const alias = {
  "coveralls-overalls-suits": "coveralls-overalls",
  "lab-coats-parachute-cotton": "lab-coats",
  "chief-coats-cotton-pieces": "chief-coats",
  "flame-resistant-fr-clothing": "flame-resistant-clothing",
  "high-visibility-safety-workwear": "hi-visibility-clothing",
};

function decode(s = "") {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, " ")
    .trim();
}

function features(content = "") {
  return decode(content)
    .split(/✅/)
    .map((p) => p.replace(/^Key Features:\s*/i, "").trim())
    .filter((p) => p.length > 8)
    .slice(0, 8);
}

const products = raw.map((p) => {
  const categorySlugs = [
    ...new Set(
      (p.categories || [])
        .filter((c) => c.taxonomy === "product_cat")
        .map((c) => alias[c.slug] || c.slug)
    ),
  ];
  const categoryNames = (p.categories || [])
    .filter((c) => c.taxonomy === "product_cat")
    .map((c) => decode(c.name));

  const excerpt = decode(p.excerpt).replace(/^Description:\s*/i, "");
  const feats = features(p.content);

  return {
    slug: p.slug,
    name: decode(p.title).replace(/\.+$/, ""),
    shortDescription: excerpt.slice(0, 180),
    description: excerpt,
    categories: categoryNames,
    categorySlugs,
    features: feats.length ? feats : ["Industrial-grade construction", "Designed for demanding work environments"],
    image: p.featured,
    images: [p.featured].filter(Boolean),
  };
});

const firstByCat = {};
for (const p of products) {
  for (const slug of p.categorySlugs) {
    if (!firstByCat[slug]) firstByCat[slug] = p.image;
  }
}

writeFileSync("d:/falcon/src/data/wp-products.json", JSON.stringify(products, null, 2));
writeFileSync("d:/falcon/src/data/wp-category-images.json", JSON.stringify(firstByCat, null, 2));
writeFileSync(
  "d:/falcon/src/data/wp-categories.json",
  JSON.stringify(
    cats.map((c) => ({
      slug: alias[c.slug] || c.slug,
      originalSlug: c.slug,
      name: decode(c.name),
      count: c.count,
    })),
    null,
    2
  )
);
console.log("products", products.length);
console.log("cats with images", Object.keys(firstByCat).length);
