import { wpMedia } from "./media";

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  image: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Fabric Selection",
    description: "Premium materials sourced and tested for durability, comfort, and industry compliance.",
    image: wpMedia.aboutAlt,
  },
  {
    number: "02",
    title: "Design & Development",
    description: "Technical garment prototyping with material innovation and hazard assessment.",
    image: wpMedia.consultingBg,
  },
  {
    number: "03",
    title: "Cutting",
    description: "Precision cutting with optimized patterns for fit, function, and material efficiency.",
    image: wpMedia.videoBg,
  },
  {
    number: "04",
    title: "Stitching",
    description: "Triple-stitched stress points and reinforced construction for long-term reliability.",
    image: wpMedia.coveralls,
  },
  {
    number: "05",
    title: "Quality Inspection",
    description: "Rigorous testing for durability, comfort, and safety compliance at every stage.",
    image: wpMedia.fr,
  },
  {
    number: "06",
    title: "Packing & Logistics",
    description: "Professional packaging and global delivery for bulk orders and contract programs.",
    image: wpMedia.videoBg2,
  },
];
