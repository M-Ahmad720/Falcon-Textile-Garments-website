import { readFileSync, writeFileSync } from "fs";

const media = JSON.parse(readFileSync("d:/falcon/scripts/wp/media.json", "utf8"));
const products = JSON.parse(readFileSync("d:/falcon/scripts/wp/products.json", "utf8"));
const posts = JSON.parse(readFileSync("d:/falcon/scripts/wp/posts.json", "utf8"));

const keywords = [
  "slider", "hero", "banner", "about", "team", "logo", "client", "partner",
  "fabric", "process", "factory", "industry", "testimonial", "coverall",
  "workwear", "homepage", "home", "welcome", "bg", "background"
];

const interesting = media.filter((m) => {
  const t = `${m.title || ""} ${m.alt || ""} ${m.source || ""}`.toLowerCase();
  return keywords.some((k) => t.includes(k));
});

console.log("interesting", interesting.length);
for (const m of interesting.slice(0, 80)) {
  console.log(m.id, m.title, m.source);
}

console.log("\n--- first 40 media ---");
for (const m of media.slice(0, 40)) {
  console.log(m.id, m.title, m.source);
}

writeFileSync(
  "d:/falcon/scripts/wp/interesting-media.json",
  JSON.stringify(interesting, null, 2)
);
console.log("\nposts", posts);
