import categoryImages from "./wp-category-images.json";

const cat = categoryImages as Record<string, string>;

export interface MegaVisual {
  type: "hero" | "collage";
  images: string[];
}

export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
  megaMenu?: MegaMenuGroup[];
  megaVisual?: MegaVisual;
}

export interface MegaMenuItem {
  label: string;
  href?: string;
  image?: string;
}

export interface MegaMenuGroup {
  title: string;
  items: MegaMenuItem[];
}

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Company",
    children: [
      { label: "About Company", href: "/about" },
      { label: "Founder & CEO", href: "/founder" },
    ],
  },
  { label: "Falcon Fabric Book", href: "/fabric-guide" },
  {
    label: "Workwear Garments",
    megaVisual: {
      type: "hero",
      images: ["/images/menu/workwear-jacket.png"],
    },
    megaMenu: [
      {
        title: "Core Workwear",
        items: [
          { label: "Coveralls", href: "/product-category/coveralls", image: cat.coveralls },
          { label: "Trousers & Cargo Trousers", href: "/product-category/trousers-cargo-trousers", image: cat["trousers-cargo-trousers"] },
          { label: "Industrial Shirts", href: "/product-category/industrial-shirts", image: cat["industrial-shirts"] },
          { label: "Bibs & Braces", href: "/product-category/bibs-and-braces", image: cat["bibs-and-braces"] },
        ],
      },
      {
        title: "Protective Workwear",
        items: [
          { label: "Flame-Resistant Clothing", href: "/product-category/flame-resistant-clothing", image: cat["flame-resistant-clothing"] },
          { label: "FR + Antistatic", href: "/product-category/fr-antistatic-flame-resistant-clothing", image: cat["flame-resistant-clothing"] },
          { label: "Nomex Coveralls", href: "/product-category/nomex-coveralls", image: cat["nomex-coveralls"] },
          { label: "Chemical Suits", href: "/product-category/chemical-suits", image: cat["chemical-suits"] },
        ],
      },
      {
        title: "Outerwear & Visibility",
        items: [
          { label: "Safety Jackets", href: "/product-category/safety-jackets", image: cat["safety-jackets"] },
          { label: "Wool Jackets", href: "/product-category/wool-jackets", image: cat["wool-jackets"] },
          { label: "Winter Clothing", href: "/product-category/winter-clothing", image: cat["winter-clothing"] },
          { label: "Hi-Visibility Clothing", href: "/product-category/hi-visibility-clothing", image: cat["hi-visibility-clothing"] },
        ],
      },
      {
        title: "Specialized",
        items: [
          { label: "Corporate Contract Clothing", href: "/product-category/corporate-contract-clothing", image: cat["corporate-contract-clothing"] },
          { label: "Heavy-Duty Denim / Canvas", href: "/product-category/heavy-duty-denim-canvas-clothing", image: cat["heavy-duty-denim-canvas-clothing"] },
          { label: "Flame Retardant with Nomex", href: "/product-category/flame-retardant-with-nomex", image: cat["flame-retardant-with-nomex"] },
        ],
      },
    ],
  },
  {
    label: "Accessories",
    megaVisual: {
      type: "hero",
      images: ["/images/menu/accessories-vest.png"],
    },
    megaMenu: [
      {
        title: "Accessories",
        items: [
          { label: "Coveralls & Overalls", href: "/product-category/coveralls-overalls", image: cat["coveralls-overalls"] },
          { label: "Chemical-Resistant Parachute Trousers & Cargo Pants", href: "/product-category/chemical-resistant-parachute-trousers-cargo-pants", image: cat["chemical-resistant-parachute-trousers-cargo-pants"] },
          { label: "Parachute Vest", href: "/product-category/parachute-vest", image: cat["parachute-vest"] },
          { label: "Parachute Hood", href: "/product-category/parachute-hood", image: cat["parachute-hood"] },
        ],
      },
      {
        title: "Specialized",
        items: [
          { label: "Lab Coats (Parachute Cotton)", href: "/product-category/lab-coats", image: cat["lab-coats"] },
          { label: "Chief Coats (Cotton Pieces)", href: "/product-category/chief-coats", image: cat["chief-coats"] },
          { label: "SPECIALIZED CLOTHING" },
          { label: "Flame-Retardant (FR) Clothing", href: "/product-category/flame-retardant-fr-clothing", image: cat["flame-retardant-fr-clothing"] },
          { label: "Flame-Resistant (Nomex®) Clothing", href: "/product-category/flame-resistant-nomex-clothing", image: cat["flame-resistant-nomex-clothing"] },
        ],
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Founder & CEO", href: "/founder" },
  ],
  workwear: [
    { label: "Coveralls", href: "/product-category/coveralls" },
    { label: "Trousers", href: "/product-category/trousers-cargo-trousers" },
    { label: "Safety Jackets", href: "/product-category/safety-jackets" },
    { label: "FR Clothing", href: "/product-category/flame-resistant-clothing" },
    { label: "Hi-Visibility", href: "/product-category/hi-visibility-clothing" },
    { label: "Chemical Suits", href: "/product-category/chemical-suits" },
    { label: "Nomex", href: "/product-category/nomex-coveralls" },
  ],
  accessories: [
    { label: "Coveralls & Overalls", href: "/product-category/coveralls-overalls" },
    { label: "Chemical-Resistant Parachute Trousers & Cargo Pants", href: "/product-category/chemical-resistant-parachute-trousers-cargo-pants" },
    { label: "Parachute Vest", href: "/product-category/parachute-vest" },
    { label: "Parachute Hood", href: "/product-category/parachute-hood" },
    { label: "Lab Coats (Parachute Cotton)", href: "/product-category/lab-coats" },
    { label: "Chief Coats (Cotton Pieces)", href: "/product-category/chief-coats" },
    { label: "Flame-Retardant (FR) Clothing", href: "/product-category/flame-retardant-fr-clothing" },
    { label: "Flame-Resistant (Nomex®) Clothing", href: "/product-category/flame-resistant-nomex-clothing" },
  ],
  resources: [
    { label: "Falcon Fabric Book", href: "/fabric-guide" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/#faq" },
  ],
};

