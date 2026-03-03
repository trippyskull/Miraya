export type Variant = {
  id: string;
  name: string; // e.g. "50ml" / "Vanilla" / "Small"
  price: number; // in INR
  inStock?: boolean;
};

export type Product = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  images: string[]; // path in /public
  variants: Variant[];
  tags: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    title: "Hydra Cleanser",
    subtitle: "Soft foam, zero tightness",
    description:
      "A gentle daily cleanser that keeps skin balanced and calm—made for a clean, plush finish.",
    images: [
  "/hero/prod1.png",
  "/products/p1-2.svg",
  "/products/p1-3.svg",
  "/products/p1-4.svg",
  "/products/p1-5.svg",
],
    tags: ["Daily", "Gentle", "Glow"],
    variants: [
      { id: "p1-50", name: "50ml", price: 299 },
      { id: "p1-100", name: "100ml", price: 499 },
    ],
  },
  {
    id: "p2",
    title: "Dew Serum",
    subtitle: "Plump + brighten",
    description:
      "A lightweight serum for bounce and clarity. Layers under everything with a glassy glow.",
    images: [
  "/hero/prod2.png",
  "/products/p2-2.svg",
  "/products/p2-3.svg",
  "/products/p2-4.svg",
  "/products/p2-5.svg",
],
    tags: ["Brighten", "Plump", "Daily"],
    variants: [
      { id: "p2-15", name: "15ml", price: 449 },
      { id: "p2-30", name: "30ml", price: 799 },
    ],
  },
  {
    id: "p3",
    title: "Cloud Cream",
    subtitle: "Barrier-first hydration",
    description:
      "A rich-but-breathable moisturizer that seals hydration and supports a calm skin barrier.",
    images: [
  "/hero/prod3.png",
  "/products/p3-2.svg",
  "/products/p3-3.svg",
  "/products/p3-4.svg",
  "/products/p3-5.svg",
],
    tags: ["Barrier", "Moisture", "Soft"],
    variants: [
      { id: "p3-30", name: "30g", price: 499 },
      { id: "p3-50", name: "50g", price: 749 },
    ],
  },
  {
    id: "p4",
    title: "Moon Mist",
    subtitle: "Instant refresh spray",
    description:
      "A fine face mist to reset your skin during the day—hydration without heaviness.",
    images: [
  "/hero/prod4.png",
  "/products/p4-2.svg",
  "/products/p4-3.svg",
  "/products/p4-4.svg",
  "/products/p4-5.svg",
],
    tags: ["Mist", "Refresh", "Travel"],
    variants: [
      { id: "p4-50", name: "50ml", price: 349 },
      { id: "p4-100", name: "100ml", price: 599 },
    ],
  },
  {
    id: "p5",
    title: "Glow Balm",
    subtitle: "Luxe overnight repair",
    description:
      "A buttery night balm that melts in and helps repair the look of dull, stressed skin.",
    images: [
  "/hero/prod5.png",
  "/products/p5-2.svg",
  "/products/p5-3.svg",
  "/products/p5-4.svg",
  "/products/p5-5.svg",
],
    tags: ["Night", "Repair", "Luxe"],
    variants: [
      { id: "p5-15", name: "15g", price: 399 },
      { id: "p5-30", name: "30g", price: 699 },
    ],
  },
  {
    id: "p6",
    title: "SPF Veil",
    subtitle: "Daily sun, no cast",
    description:
      "A comfortable daily SPF that sits well under makeup and keeps skin looking fresh.",
    images: [
  "/hero/prod6.png",
  "/products/p6-2.svg",
  "/products/p6-3.svg",
  "/products/p6-4.svg",
  "/products/p6-5.svg",
],
    tags: ["SPF", "Daily", "No-cast"],
    variants: [
      { id: "p6-30", name: "30ml", price: 499 },
      { id: "p6-50", name: "50ml", price: 749 },
    ],
  },
];