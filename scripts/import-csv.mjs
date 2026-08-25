import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const csvPath = join(root, "scripts/wp/wc-product-export.csv");
const outProducts = join(root, "src/data/wp-products.json");
const outCategories = join(root, "src/data/wp-categories.json");
const outCatImages = join(root, "src/data/wp-category-images.json");
const outReport = join(root, "scripts/wp/import-report.json");
const outQuality = join(root, "scripts/wp/data-quality-report.md");

const SLUG_ALIASES = {
  "coveralls-overalls-suits": ["coveralls-overalls"],
  "lab-coats-parachute-cotton": ["lab-coats"],
  "chief-coats-cotton-pieces": ["chief-coats"],
  "flame-resistant-fr-clothing": ["flame-resistant-clothing"],
  "high-visibility-safety-workwear": ["hi-visibility-clothing"],
  "heavy-duty-denim-canvas-clothing": ["heavy-duty-denimcanvas-clothing"],
};

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  const src = text.replace(/\uFEFF/g, "").replace(/^\s+/, "");
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    const n = src[i + 1];
    if (inQuotes) {
      if (c === '"' && n === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c === "\r") {
      if (n === "\n") continue;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/®|™/g, "")
    .replace(/\//g, " ")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function decodeEntities(s = "") {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function normalizeHtml(html = "") {
  return html
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\\n/g, "<br />")
    .replace(/\n/g, "<br />");
}

function stripHtml(html = "") {
  return decodeEntities(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseImages(raw = "") {
  const seen = new Set();
  const unique = [];
  let duplicateRefs = 0;
  for (const part of raw.split(",")) {
    const url = part.trim();
    if (!url) continue;
    if (seen.has(url)) {
      duplicateRefs += 1;
      continue;
    }
    seen.add(url);
    unique.push(url);
  }
  return { images: unique, duplicateRefs };
}

function parseCategoryField(raw = "") {
  const assignments = [];
  for (const chunk of raw.split(",").map((s) => s.trim()).filter(Boolean)) {
    const parts = chunk.split(">").map((s) => s.trim()).filter(Boolean);
    if (!parts.length) continue;
    assignments.push(parts);
  }
  return assignments;
}

function allSlugsForName(name) {
  const slug = slugify(name);
  return [slug, ...(SLUG_ALIASES[slug] || [])];
}

function strongNames(html = "") {
  const names = [];
  const re = /<strong[^>]*>([\s\S]*?)<\/strong>/gi;
  let m;
  while ((m = re.exec(html))) {
    const text = stripHtml(m[1]);
    if (text.length > 8) names.push(text);
  }
  return names;
}

function emptyToUndef(v) {
  const s = (v ?? "").trim();
  return s === "" ? undefined : s;
}

function toNumber(v) {
  const s = emptyToUndef(v);
  if (s === undefined) return undefined;
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
}

const raw = readFileSync(csvPath, "utf8");
const table = parseCSV(raw);
const header = table[0];
const col = Object.fromEntries(header.map((h, i) => [h, i]));
const dataRows = table.slice(1);

const products = [];
const categoryMap = new Map();
const usedSlugs = new Set();
const issues = [];
let duplicateImageRefs = 0;
const allImageRefs = [];

function registerCategory(name, parentName) {
  const slug = slugify(name);
  if (!categoryMap.has(slug)) {
    categoryMap.set(slug, {
      slug,
      aliases: SLUG_ALIASES[slug] || [],
      name,
      parentSlug: parentName ? slugify(parentName) : null,
      parentName: parentName || null,
      count: 0,
    });
  } else if (parentName && !categoryMap.get(slug).parentSlug) {
    categoryMap.get(slug).parentSlug = slugify(parentName);
    categoryMap.get(slug).parentName = parentName;
  }
  return slug;
}

for (const row of dataRows) {
  const get = (key) => row[col[key]] ?? "";
  const id = get("ID").trim();
  const type = get("Type").trim();
  const name = get("Name");
  if (!name.trim()) {
    issues.push({ product: id || "(blank)", issue: "Missing product name", type: "missing-name" });
    continue;
  }

  const shortDescription = normalizeHtml(get("Short description"));
  const description = normalizeHtml(get("Description"));
  const { images, duplicateRefs } = parseImages(get("Images"));
  duplicateImageRefs += duplicateRefs;
  allImageRefs.push(...get("Images").split(",").map((s) => s.trim()).filter(Boolean));

  const assignments = parseCategoryField(get("Categories"));
  const categoryNames = [];
  const categorySlugs = [];
  const categoryPaths = [];

  for (const parts of assignments) {
    categoryPaths.push(parts.join(" > "));
    let parent = null;
    for (const part of parts) {
      const slug = registerCategory(part, parent);
      if (!categoryNames.includes(part)) categoryNames.push(part);
      for (const s of allSlugsForName(part)) {
        if (!categorySlugs.includes(s)) categorySlugs.push(s);
      }
      parent = part;
    }
  }

  let slug = slugify(name);
  if (!slug) slug = `product-${id}`;
  if (usedSlugs.has(slug)) slug = `${slug}-${id}`;
  usedSlugs.add(slug);

  const sku = emptyToUndef(get("SKU"));
  const regularPrice = emptyToUndef(get("Regular price"));
  const salePrice = emptyToUndef(get("Sale price"));
  const tags = get("Tags")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const stockQty = toNumber(get("Stock"));
  const inStock = get("In stock?") === "1";
  const weight = emptyToUndef(get("Weight (lbs)"));
  const length = emptyToUndef(get("Length (in)"));
  const width = emptyToUndef(get("Width (in)"));
  const height = emptyToUndef(get("Height (in)"));
  const featured = get("Is featured?") === "1";
  const published = get("Published") === "1";
  const visibility = emptyToUndef(get("Visibility in catalog"));
  const brands = emptyToUndef(get("Brands"));
  const parent = emptyToUndef(get("Parent"));
  const upsells = emptyToUndef(get("Upsells"));
  const crossSells = emptyToUndef(get("Cross-sells"));
  const position = toNumber(get("Position"));

  if (!images.length) {
    issues.push({ product: name, issue: "Missing images", type: "missing-images" });
  }
  if (!stripHtml(shortDescription)) {
    issues.push({ product: name, issue: "Missing short description", type: "missing-short-description" });
  }
  if (!stripHtml(description)) {
    issues.push({ product: name, issue: "Missing description", type: "missing-description" });
  }
  if (!categoryNames.length) {
    issues.push({ product: name, issue: "Missing categories", type: "missing-categories" });
  }

  const ignoredLabels = /^(description|key features|features|specifications|applications):?$/i;
  const mentioned = strongNames(shortDescription).filter((n) => !ignoredLabels.test(n));
  for (const mentionedName of mentioned) {
    const a = mentionedName.toLowerCase().replace(/\.+$/, "");
    const b = name.toLowerCase().replace(/\.+$/, "");
    if (a && b && a !== b && !b.includes(a) && !a.includes(b)) {
      issues.push({
        product: name,
        issue: `Description appears to reference another product: "${mentionedName}"`,
        type: "name-mismatch",
      });
    }
  }

  const product = {
    id,
    type,
    slug,
    name,
    shortDescription,
    description,
    categories: categoryNames,
    categorySlugs,
    categoryPaths,
    images,
    image: images[0] || "",
    tags,
    inStock,
    published,
    featured,
    visibility,
  };

  if (sku) product.sku = sku;
  if (regularPrice) product.regularPrice = regularPrice;
  if (salePrice) product.salePrice = salePrice;
  if (stockQty !== undefined) product.stock = stockQty;
  if (weight) product.weight = weight;
  if (length) product.length = length;
  if (width) product.width = width;
  if (height) product.height = height;
  if (brands) product.brands = brands;
  if (parent) product.parent = parent;
  if (upsells) product.upsells = upsells;
  if (crossSells) product.crossSells = crossSells;
  if (position !== undefined) product.position = position;

  products.push(product);
}

for (const p of products) {
  for (const slug of new Set(p.categorySlugs)) {
    const cat = [...categoryMap.values()].find(
      (c) => c.slug === slug || c.aliases.includes(slug)
    );
    if (cat) cat.count += 1;
  }
}

const categories = [...categoryMap.values()].sort((a, b) => a.name.localeCompare(b.name));
const parentCount = categories.filter((c) => !c.parentSlug).length;
const subCount = categories.filter((c) => c.parentSlug).length;

const categoryImages = {};
for (const cat of categories) {
  const match = products.find((p) => p.categorySlugs.includes(cat.slug) && p.image);
  if (match) {
    categoryImages[cat.slug] = match.image;
    for (const alias of cat.aliases) categoryImages[alias] = match.image;
  }
}

const uniqueImages = [...new Set(products.flatMap((p) => p.images))];
const brokenImages = [];

async function checkUrl(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 12000);
  try {
    let res = await fetch(url, { method: "HEAD", signal: ctrl.signal, redirect: "follow" });
    if (res.status === 405 || res.status === 403 || res.status === 501) {
      res = await fetch(url, {
        method: "GET",
        signal: ctrl.signal,
        redirect: "follow",
        headers: { Range: "bytes=0-0" },
      });
    }
    if (!res.ok) throw new Error(String(res.status));
  } catch (err) {
    brokenImages.push({ url, error: err.message || String(err) });
  } finally {
    clearTimeout(t);
  }
}

const skipImages = process.argv.includes("--skip-images");
const concurrency = 8;
if (!skipImages) {
  for (let i = 0; i < uniqueImages.length; i += concurrency) {
    await Promise.all(uniqueImages.slice(i, i + concurrency).map(checkUrl));
    process.stdout.write(
      `Checked images ${Math.min(i + concurrency, uniqueImages.length)}/${uniqueImages.length}\n`
    );
  }
}

const brokenSet = new Set(brokenImages.map((b) => b.url));
const brokenByProduct = products
  .map((p) => ({
    product: p.name,
    urls: p.images.filter((u) => brokenSet.has(u)),
  }))
  .filter((x) => x.urls.length);

writeFileSync(outProducts, JSON.stringify(products, null, 2));
writeFileSync(outCategories, JSON.stringify(categories, null, 2));
writeFileSync(outCatImages, JSON.stringify(categoryImages, null, 2));

const report = {
  csvPath: "scripts/wp/wc-product-export.csv",
  totalCsvRows: dataRows.length,
  totalProductsImported: products.length,
  totalCategories: categories.length,
  totalParentCategories: parentCount,
  totalSubcategories: subCount,
  totalImageReferences: allImageRefs.length,
  totalUniqueImages: uniqueImages.length,
  duplicateImagesRemoved: duplicateImageRefs,
  brokenImages: brokenByProduct,
          brokenImageCount: skipImages ? 0 : brokenImages.length,
  productsMissingImages: products.filter((p) => !p.images.length).map((p) => p.name),
  productsMissingDescriptions: products
    .filter((p) => !stripHtml(p.description))
    .map((p) => p.name),
  productsMissingShortDescriptions: products
    .filter((p) => !stripHtml(p.shortDescription))
    .map((p) => p.name),
  productsMissingCategories: products.filter((p) => !p.categories.length).map((p) => p.name),
  dataInconsistencies: issues.filter((i) => i.type === "name-mismatch"),
  issues,
};

mkdirSync(dirname(outReport), { recursive: true });
writeFileSync(outReport, JSON.stringify(report, null, 2));

const md = `# Falcon Textile CSV import report

- Total CSV rows: **${report.totalCsvRows}**
- Products imported: **${report.totalProductsImported}**
- Categories: **${report.totalCategories}** (${parentCount} parent, ${subCount} subcategories)
- Image references: **${report.totalImageReferences}**
- Unique images: **${report.totalUniqueImages}**
- Duplicate image references removed: **${report.duplicateImagesRemoved}**
- Broken images: **${report.brokenImageCount}**
- Products missing images: **${report.productsMissingImages.length}**
- Products missing descriptions: **${report.productsMissingDescriptions.length}**
- Products missing short descriptions: **${report.productsMissingShortDescriptions.length}**
- Products missing categories: **${report.productsMissingCategories.length}**
- Data inconsistencies: **${report.dataInconsistencies.length}**

## Broken images

${
  brokenByProduct.length
    ? brokenByProduct.map((b) => `- **${b.product}**\n${b.urls.map((u) => `  - ${u}`).join("\n")}`).join("\n")
    : "_None detected._"
}

## Data inconsistencies (not auto-corrected)

${
  report.dataInconsistencies.length
    ? report.dataInconsistencies.map((i) => `- **${i.product}**: ${i.issue}`).join("\n")
    : "_None detected._"
}

## Other issues

${issues
  .filter((i) => i.type !== "name-mismatch")
  .map((i) => `- **${i.product}**: ${i.issue}`)
  .join("\n") || "_None._"}
`;

writeFileSync(outQuality, md);
console.log(md);
