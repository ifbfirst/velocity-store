import { Product } from '@/types';
import { ProductCard } from '@/components/product/product-card';
import { ArrowRight, ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic'; 

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch('https://fakestoreapi.com/products?limit=8');
    if (!res.ok) throw new Error('Не удалось загрузить товары');
    return res.json();
  } catch (error) {
    console.error('Ошибка fetch на главной странице:', error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="w-full pb-16 space-y-16 animate-in fade-in duration-500">
      
      <section className="relative bg-zinc-900 text-white overflow-hidden rounded-b-[2rem] sm:rounded-b-[3rem] shadow-lg">
        <div className="container mx-auto px-4 py-20 md:py-28 max-w-7xl relative z-10 flex flex-col items-center text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full">
            Новая коллекция 2026
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.1]">
            Опережай тренды вместе с <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Velocity</span>
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-xl font-medium">
            Умная электроника, стильные аксессуары и одежда высшего качества с быстрой доставкой до вашей двери.
          </p>
          <div className="pt-4">
            <Link 
              href="/catalog" 
              className="inline-flex items-center gap-2 bg-white text-zinc-950 font-semibold px-8 h-12 rounded-full hover:bg-zinc-200 transition-colors shadow-md"
            >
              Перейти в каталог <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
     
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
      </section>
      <section className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 border-b pb-12 border-zinc-100 dark:border-zinc-800">
          <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
            <div className="p-3 bg-violet-50 dark:bg-violet-950/50 rounded-xl text-primary flex-shrink-0">
              <Truck className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">Быстрая доставка</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Бесплатно при заказе от $50. Доставим в целости и сохранности.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
            <div className="p-3 bg-violet-50 dark:bg-violet-950/50 rounded-xl text-primary flex-shrink-0">
              <ShieldCheck className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">Гарантия качества</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Только оригинальная продукция от проверенных мировых брендов.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors sm:col-span-2 md:col-span-1">
            <div className="p-3 bg-violet-50 dark:bg-violet-950/50 rounded-xl text-primary flex-shrink-0">
              <RotateCcw className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">Обмен и возврат</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Не подошел размер или передумали? Вернем деньги в течение 14 дней.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 max-w-7xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Популярные товары
            </h2>
            <p className="text-sm text-muted-foreground">
              То, что чаще всего выбирают наши покупатели прямо сейчас
            </p>
          </div>
          <Link 
            href="/catalog" 
            className="text-sm font-semibold text-violet-600 dark:text-violet-400 hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
          >
            Смотреть все <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed rounded-2xl bg-card">
            <ShoppingBag className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Не удалось загрузить витрину товаров. Проверьте подключение к сети.</p>
          </div>
        )}
      </section>
      
    </div>
  );
}
