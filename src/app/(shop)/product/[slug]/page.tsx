import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Product } from '@/types';
import { AddToCartButton } from './add-to-cart-button';
import { mock } from '@/app/mock';

export const revalidate = 60; 

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// async function getProduct(id: string): Promise<Product | null> {
//   try {
//     const res = await fetch(`https://fakestoreapi.com/products/${id}`);

//     if (!res.ok) return null;
//     return res.json();
//   } catch (error) {
//     console.error('Ошибка при получении товара:', error);
//     return null;
//   }
// }

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  // const product = await getProduct(slug);
const product = mock.find((product) => product.id === Number(slug));
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">

      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Назад к покупкам
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <div className="relative aspect-square w-full rounded-2xl bg-white border p-8 flex items-center justify-center shadow-sm">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            className="object-contain p-6"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-semibold text-primary uppercase bg-primary/10 px-2.5 py-1 rounded-full w-fit block">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
              {product.title}
            </h1>
            
            <div className="text-2xl md:text-3xl font-extrabold text-foreground pt-2">
              ${product.price.toFixed(2)}
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">
                Описание
              </h3>
              <p className="text-base text-card-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
