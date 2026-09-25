'use client';

import Image from 'next/image';
import Link from 'next/link'; // 👈 Добавляем импорт Link
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/store/cart';

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-md">
      <Link href={`/product/${product.id}`} className="block cursor-pointer">
        <CardHeader className="p-0">
          <div className="relative aspect-square w-full bg-white">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-contain p-4 transition-transform hover:scale-105"
            />
          </div>
        </CardHeader>
      </Link>
      
      <CardContent className="p-4 flex-1">
        <span className="text-xs text-muted-foreground uppercase">{product.category}</span>
        
        <Link href={`/product/${product.id}`} className="block hover:underline mt-1">
          <CardTitle className="line-clamp-2 text-sm font-semibold h-10">{product.title}</CardTitle>
        </Link>
        
        <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
      </CardContent>
      
      <CardFooter className="p-4 pt-4">
        <Button className="w-full gap-2" onClick={() => addItem(product)}>
          <ShoppingCart className="h-4 w-4" /> В корзину
        </Button>
      </CardFooter>
    </Card>
  );
}
