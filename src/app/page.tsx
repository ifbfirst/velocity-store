import { Product } from '@/types';
import { ProductCard } from '@/components/product/product-card';

export const revalidate = 60; 

async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products?limit=8');

  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight mb-8">Популярные товары</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
