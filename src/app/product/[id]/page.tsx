import { PRODUCTS } from "../../lib/products";
import ProductClient from "./ProductClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#fbfbf4] text-black">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <a className="text-sm text-black/60 hover:text-black" href="/">
            ← Back
          </a>
          <h1 className="mt-6 text-2xl font-semibold">Product not found</h1>
          <p className="mt-2 text-black/60">
            No product exists for id: <span className="font-mono">{id}</span>
          </p>
        </div>
      </main>
    );
  }

  return <ProductClient product={product} />;
}