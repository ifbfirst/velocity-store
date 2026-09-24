import { Product } from '@/types';
import { ProductCard } from '@/components/product/product-card';
import Link from 'next/link';

export const revalidate = 60;

interface CatalogPageProps {
  searchParams: Promise<{ page?: string }>;
}

const ITEMS_PER_PAGE = 4; 
async function getCatalogData(page: number, limit: number) {
  try {
    const res = await fetch('https://fakestoreapi.com/products?page=${page}&limit=${limit}',{next: { revalidate: 3600 }});
    if (!res.ok) throw new Error('Не удалось загрузить данные');
    
    const allProducts: Product[] = await res.json();
    const total = allProducts.length; 
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = allProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      total
    };
  } catch (error) {
    console.error('Ошибка пагинации:', error);
    return { products: [], total: 0 };
  }
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;

  const { products, total } = await getCatalogData(currentPage, ITEMS_PER_PAGE);
  
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <main className="container mx-auto px-4 py-12 max-w-7xl space-y-10">
      
      <div className="border-b pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Каталог товаров</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Показано {products.length} из {total} товаров
          </p>
        </div>
        <div className="text-sm font-medium text-muted-foreground bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
          Страница {currentPage} из {totalPages}
        </div>
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed rounded-2xl">
          <p className="text-sm text-muted-foreground">Товары на этой странице не найдены.</p>
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-8 border-t border-zinc-100 dark:border-zinc-800">
          
          <Link
            href={`/catalog?page=${currentPage - 1}`}
            className={`inline-flex h-9 items-center justify-center rounded-md border bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-muted ${
              currentPage <= 1 ? 'pointer-events-none opacity-40' : ''
            }`}
          >
            Назад
          </Link>


          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            const isCurrent = pageNumber === currentPage;

            return (
              <Link
                key={pageNumber}
                href={`/catalog?page=${pageNumber}`}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium shadow-sm transition-colors ${
                  isCurrent 
                    ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 font-bold' 
                    : 'border bg-background hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {pageNumber}
              </Link>
            );
          })}
          <Link
            href={`/catalog?page=${currentPage + 1}`}
            className={`inline-flex h-9 items-center justify-center rounded-md border bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-muted ${
              currentPage >= totalPages ? 'pointer-events-none opacity-40' : ''
            }`}
          >
            Вперед
          </Link>
          
        </div>
      )}

    </main>
  );
}
