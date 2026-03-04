export type Variant = {
  id: string;
  name: string;
  price: number; // INR
  inStock?: boolean;
};

export type Product = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  images: string[]; // paths in /public
  variants: Variant[];
  tags: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: "corset-bag",
    title: "Corset Bag",
    subtitle: "She’s laced. She’s bold. She’s the moment.",
    description:
      `She’s laced. She’s bold. She’s the moment.
Crafted in premium leather with delicate lace trim and bow lace-up detailing, this structured corset silhouette is pure statement energy. Feminine, fierce, and impossible to ignore. Spacious on the inside with a soft blush lining and secure zip pocket — because style should never compromise practicality.
Lace it tight. Rule the night / Main Character? Obviously.

Dimensions:
• Height: 6.5 inches
• Width: 8.5 inches
• Depth: 3.5 inches
• Handle Drop: 4.5 inches`,
    images: [
      "/products/Corset Bag (front).png",
      "/products/Corset Bag (side).png",
      "/products/Corset Bag (inside).png",
      "/products/Corset bag (bottom).png",
    ],
    variants: [{ id: "corset-standard", name: "Standard", price: 6500 }],
    tags: [],
  },
  {
    id: "croissant-bag",
    title: "Croissant Bag",
    subtitle: "Soft, warm, fresh-out-the-oven energy.",
    description:
      `The Miraya Croissant Bag is crafted from luxuriously smooth genuine leather that feels as soft as the first warm bite of a fresh croissant. The sculpted panels curve like delicate pastry layers — plush, rounded, and perfectly folded into a silhouette that looks almost too good to be real.

This isn’t just a bag.
It’s that soft, warm, fresh-out-the-oven energy.
The kind that makes heads turn — and suddenly crave a croissant.

Dimensions:
• Length: 10 inches
• Height: 5 inches
• Width (Base Depth): 3 inches`,
    images: [
      "/products/Croissant Bag (front).png",
      "/products/Croissant Bag (side).png",
      "/products/Croissant Bag (inside).png",
      "/products/Croissant Bag (bottom).png",
    ],
    variants: [{ id: "croissant-standard", name: "Standard", price: 4000 }],
    tags: [],
  },
  {
    id: "peony-bloom-bag",
    title: "Peony Bloom bag",
    subtitle: "Carry art. Not flowers.",
    description:
      `Designed to resemble a delicate bouquet of peonies, this statement piece blends playful charm with refined craftsmanship. The structured cone silhouette, polka-dot detailing, and soft satin bow create a dreamy aesthetic — while the secure top zip closure and spacious interior make it beautifully functional.
Because why carry flowers, when you can carry art?

Dimensions:
• Height: 12–13 inches
• Top Diameter: 9–10 inches
• Base Width: 4–5 inches`,
    images: [
      "/products/Peony bloom bag (front).png",
      "/products/Peony Bloom bag (side).png",
      "/products/Peony bloom bag (inside).png",
      "/products/Peony bloom bag (bottom).png",
    ],
    variants: [{ id: "peony-standard", name: "Standard", price: 7500 }],
    tags: [],
  },
  {
    id: "pyramid-bag",
    title: "Pyramid Bag",
    subtitle: "Doesn’t follow trends. Creates them.",
    description:
      `Inspired by architectural monuments and ancient pyramids, this structured black statement bag is crafted in rich textured vegan leather with gold-plated trims defining its geometric edges. The magnetic top closure ensures effortless access, while the thoughtfully designed interior offers ample space.
A piece that doesn’t follow trends — it creates them.

Dimensions:
• Height: 7–8 inches
• Base Width: 4–5 inches`,
    images: [
      "/products/Pyramid bag (front).png",
      "/products/Pyramid Bag (side).png",
      "/products/Pyramid Bag (inside).png",
      "/products/Pyramid Bag (bottom).png",
    ],
    variants: [{ id: "pyramid-standard", name: "Standard", price: 4500 }],
    tags: [],
  },
  {
    id: "seashell-clutch",
    title: "Seashell clutch",
    subtitle: "Coastal charm. Timeless elegance.",
    description:
      `Inspired by the gentle curves of a seashell, the Miraya Seashell Clutch is where coastal charm meets timeless elegance. Crafted in premium leather with a sculpted spiral design and a pearl-kiss clasp, it’s your perfect companion for beach soirées, sundowners, and destination weddings.
Wear it as a sling with the gold chain strap or carry it as a statement clutch — either way, it whispers luxury.

Dimensions:
• Width: 7.5 inches
• Height: 6.7 inches
• Depth: 2.4 inches
• Chain drop: 21.7 inches`,
    images: [
      "/products/seashell Clutch (Front).png",
      "/products/seashell Clutch (side).png",
      "/products/seashell Clutch (inside).png",
      "/products/seashell Clutch (bottom).png",
    ],
    variants: [{ id: "seashell-standard", name: "Standard", price: 4500 }],
    tags: [],
  },
  {
    id: "teapot-bag",
    title: "Teapot Bag",
    subtitle: "This won’t make tea for you — but you’ll be the tea of the party.",
    description:
      `This will not make tea for you but you will be the tea of the party.

Inspired by India’s timeless love for chai, crafted in structured premium vegan leather with refined embroidery and gold-tone hardware. The circular zip-around closure opens smoothly to reveal a spacious interior — and a circular mirror attached to the inside of the lid (because quick touch-ups between compliments are essential).

Dimensions:
• Height: 7 inches
• Width (including spout): 10 inches
• Depth: 5 inches`,
    images: [
      "/products/Teapot Bag (front).png",
      "/products/Teapot bag (side).png",
      "/products/Teapot Bag (inside).png",
      "/products/Teapot Bag (bottom).png",
    ],
    variants: [{ id: "teapot-standard", name: "Standard", price: 5999 }],
    tags: [],
  },
];