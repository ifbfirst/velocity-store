'use client';

import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/store/cart';
import { Button } from '@/components/ui/button';

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);

  return (
    <Button 
      size="lg" 
      className="w-full md:w-auto md:px-12 gap-3 text-base font-medium shadow-sm"
      onClick={() => addItem(product)}
    >
      <ShoppingCart className="h-5 w-5" />
      Добавить в корзину
    </Button>
  );
}
