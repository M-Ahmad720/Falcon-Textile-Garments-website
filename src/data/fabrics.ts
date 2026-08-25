import { wpMedia } from "./media";

export interface Fabric {
  id: string;
  name: string;
  composition: string;
  weave?: string;
  dye?: string;
  finish?: string;
  care?: string;
  accent: string;
  standards?: string[];
  features: string[];
  idealFor: string;
  image: string;
}

export const fabrics: Fabric[] = [
  {
    id: "cotton-twill",
    name: "100% Cotton Twill 3/1",
    composition: "100% Cotton",
    weave: "Twill 3/1",
    dye: "Reactive (60°C fastness) or Vat (90°C fastness)",
    finish: "Mercerized & Sanforized (pre-shrunk)",
    accent: "cotton",
    features: [
      "Abrasion resistance",
      "Shrinkage control",
      "Breathable & skin-friendly",
      "Color & dimensional stability after repeated washing",
    ],
    idealFor: "General workwear, hospital uniforms, and kitchen wear",
    image: wpMedia.aboutAlt,
  },
  {
    id: "poly-cotton",
    name: "65% Polyester / 35% Cotton",
    composition: "65% Polyester / 35% Cotton",
    weave: "Twill 2/1",
    care: "Washable up to 40°C or dry-cleanable",
    accent: "poly-cotton",
    features: [
      "High durability",
      "Excellent colorfastness",
      "Abrasion resistance",
      "Color stability maintained over time",
    ],
    idealFor: "Workwear requiring durability and easy maintenance",
    image: wpMedia.coveralls,
  },
  {
    id: "fr-fabric",
    name: "Flame-Retardant Fabric",
    composition: "100% Flame-Retardant Treated Cotton",
    standards: ["EN ISO 11611", "EN ISO 11612", "EN 469"],
    care: "Industrial washable and dry cleanable",
    accent: "fr",
    features: [
      "Permanent FR treatment",
      "No melt, no drip",
      "Breathable and comfortable",
      "High wash durability",
      "Low toxic gas emission",
    ],
    idealFor: "Foundries, welding, utilities, oil & gas, petrochemical industries",
    image: wpMedia.fr,
  },
  {
    id: "hospital-wear",
    name: "Hospital Wear",
    composition: "100% Cotton Twill 3/1",
    dye: "Reactive (60°C) or Vat (90°C)",
    finish: "Mercerized & Sanforized",
    accent: "hospital",
    features: [
      "Antibacterial finish available",
      "Withstands industrial washing with chlorine at 90°C",
      "High color fastness and shape retention",
      "Excellent breathability",
    ],
    idealFor: "Hospital uniforms, healthcare professionals, and kitchen wear",
    image: "https://falcontextilegarments.com/wp-content/uploads/2025/08/VentiCool-Mesh-Lab-Coat-1.webp",
  },
  {
    id: "winter-workwear",
    name: "Winter Workwear",
    composition: "100% Nylon (PU or Rubber Coated) with Polyester Wadding (100-200 GSM)",
    standards: ["EN 342:2004 (below -20°C)"],
    accent: "winter",
    features: [
      "Showerproof/water-repellent finish",
      "Wind-resistant",
      "Excellent heat retention",
      "Breathable inner materials",
    ],
    idealFor: "Outdoor industrial use in cold environments",
    image: "https://falcontextilegarments.com/wp-content/uploads/2025/08/IceShield-Hi-Vis-Parka-1.webp",
  },
  {
    id: "hi-vis",
    name: "Hi-Visibility Workwear",
    composition: "100% Cotton, 80% Poly/20% Cotton, or 65% Poly/35% Cotton",
    standards: ["EN ISO 471:2003"],
    dye: "Fluorescent yellow, orange, red",
    accent: "hivis",
    features: [
      "3M™ Scotchlite™ Reflective Tape",
      "Daylight fluorescence & night retroreflectivity",
      "Enhanced durability and color retention",
      "Strategic placement of visible materials",
    ],
    idealFor: "Construction, road work, emergency services, and low-light environments",
    image: wpMedia.hivis,
  },
];
