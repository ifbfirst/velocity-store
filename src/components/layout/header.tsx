'use client';

import Link from 'next/link';
import { Zap, ShoppingBag } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { useCart } from '@/store/cart';

export function Header() {
  const count = useCart((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
          <Zap className="h-6 w-6 text-yellow-500 fill-yellow-500" />
          <span>Velocity.Store</span>
        </Link>
        <Link href="/cart" className={buttonVariants({ variant: 'outline', className: 'relative gap-2' })}>
          <ShoppingBag className="h-4 w-4" />
          <span>Корзина</span>
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-destructive text-destructive-content text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
