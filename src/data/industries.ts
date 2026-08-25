import { wpMedia } from "./media";

export interface Industry {
  id: string;
  name: string;
  image: string;
  description: string;
}

export const industries: Industry[] = [
  { id: "oil-gas", name: "Oil & Gas", description: "Flame-resistant and chemical-resistant workwear for high-risk energy environments.", image: wpMedia.fr },
  { id: "construction", name: "Construction", description: "Durable, high-visibility garments built for demanding construction sites.", image: wpMedia.coveralls },
  { id: "manufacturing", name: "Manufacturing", description: "Functional workwear designed for production floors and industrial facilities.", image: wpMedia.aboutMain },
  { id: "chemical", name: "Chemical", description: "Chemical-resistant suits and protective gear for hazardous material handling.", image: wpMedia.chemical },
  { id: "healthcare", name: "Healthcare", description: "Antibacterial, washable uniforms for hospitals and healthcare professionals.", image: "https://falcontextilegarments.com/wp-content/uploads/2025/08/VentiCool-Mesh-Lab-Coat-1.webp" },
  { id: "logistics", name: "Logistics", description: "Tear-resistant, functional apparel for warehousing and transportation teams.", image: wpMedia.trousers },
  { id: "hospitality", name: "Hospitality", description: "Professional uniforms combining comfort, durability, and brand presentation.", image: "https://falcontextilegarments.com/wp-content/uploads/2025/08/ChefArmor-Pro-Coat-1.webp" },
  { id: "engineering", name: "Engineering", description: "Technical workwear for field engineers and infrastructure professionals.", image: wpMedia.jackets },
  { id: "utilities", name: "Utilities", description: "Arc-rated and FR garments for electrical and utility service teams.", image: wpMedia.hivis },
];
