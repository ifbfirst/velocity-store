'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ArrowLeft, Plus, Minus, Loader2 } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { useCart } from '@/store/cart';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';


export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();

  const [isMount, setIsMount]= useState(false);

  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

useEffect(() => {
  setIsMount(true);
}, []);


if (!isMount) {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] px-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground mt-2">Загрузка корзины...</p>
    </div>
  );
}

if (items.length === 0) {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h2 className="text-2xl font-bold mb-4">Ваша корзина пуста</h2>
      <Link href="/" className={buttonVariants({ variant: 'default' })}>
        Вернуться к покупкам
      </Link>
    </div>
  );
}

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Корзина</h1>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive" onClick={clearCart}>
          Очистить всё
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4 items-center border rounded-lg p-4 bg-card shadow-sm">
              <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden bg-white border">
                <Image src={item.product.image} alt={item.product.title} fill className="object-contain p-2" />
              </div>
              
              <div className="flex-grow min-w-0">
                <h4 className="font-semibold text-sm line-clamp-1">{item.product.title}</h4>
                <p className="text-xs text-muted-foreground uppercase">{item.product.category}</p>
                <span className="font-bold text-sm block mt-1">${item.product.price.toFixed(2)}</span>
              </div>

              <div className="flex items-center gap-2 border rounded-md p-1 bg-muted">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7"
                  disabled={item.quantity <= 1}
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10" 
                onClick={() => removeItem(item.product.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="border rounded-lg p-6 bg-card h-fit space-y-4 shadow-sm">
          <h3 className="font-bold text-lg">Детали заказа</h3>
          <Separator />
          <div className="flex justify-between font-medium text-base">
            <span>Итого к оплате:</span>
            <span className="font-bold text-xl text-primary">${totalPrice.toFixed(2)}</span>
          </div>
          <Button className="w-full mt-4 size-default">Оформить заказ</Button>
          <Link href="/" className={buttonVariants({ variant: 'link', className: 'w-full text-xs gap-1' })}>
            <ArrowLeft className="h-3 w-3" /> Продолжить покупки
          </Link>
        </div>
      </div>
    </main>
  );
}
