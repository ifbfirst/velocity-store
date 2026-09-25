'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2 } from 'lucide-react';
import { Product } from '@/types';
import { mock } from '@/app/mock';



export function SearchInput() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 350); 

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredResults = 
    debouncedQuery.trim().length >= 2 && mock
      ? mock.filter((product: Product) =>
          product.title.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
      : [];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };


  return (
    <div ref={containerRef} className="hidden sm:flex relative max-w-md w-full mx-8">
      <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
          placeholder="Поиск товаров..."
          className="w-full h-9 rounded-full border border-input bg-muted/50 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      {isOpen && filteredResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover text-popover-foreground border rounded-xl shadow-lg z-50 overflow-hidden max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-200">
          <ul className="p-1">
            {filteredResults.map((product) => (
              <li key={product.id}>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setQuery('');
                    router.push(`/product/${product.id}`);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-muted rounded-lg transition-colors"
                >
                  {product.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && debouncedQuery.trim().length >= 2  && filteredResults.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover text-muted-foreground border rounded-xl shadow-lg z-50 p-4 text-center text-sm animate-in fade-in duration-200">
          Ничего не найдено
        </div>
      )}
    </div>
  );
}
