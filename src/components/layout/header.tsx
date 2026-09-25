'use client';

import Link from 'next/link';
import { ShoppingBag, User, Heart, Search } from 'lucide-react';
import { useCart } from '@/store/cart';
import { buttonVariants } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { SearchInput } from './search-input';

export function Header() {
  const items = useCart((state) => state.items);
  const [mounted, setMounted] = useState(false);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
        
     
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent">
            VELOCITY
          </span>
        </Link>
    
        <SearchInput />

        <div className="flex items-center space-x-2 sm:space-x-4">
          
       
          <Link 
            href="#" 
            className={buttonVariants({ variant: 'ghost', size: 'icon', className: 'text-muted-foreground hover:text-foreground' })}
          >
            <User className="h-5 w-5" />
            <span className="sr-only">Профиль</span>
          </Link>

   
          <button className={buttonVariants({ variant: 'ghost', size: 'icon', className: 'text-muted-foreground hover:text-foreground hidden xs:flex' })}>
            <Heart className="h-5 w-5" />
          </button>

      
          <Link
            href="/cart"
            className={buttonVariants({ variant: 'outline', className: 'relative gap-2 rounded-full border-zinc-200 dark:border-zinc-800' })}
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden md:inline font-medium text-sm">Корзина</span>
            

            {mounted && totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in duration-300">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
