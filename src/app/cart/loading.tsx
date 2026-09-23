
import { Loader2 } from 'lucide-react';

export default function CartLoading() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] px-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground mt-2">Загрузка вашей корзины с сервера...</p>
    </div>
  );
}
