import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400">
      <div className="container mx-auto px-4 py-12 max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Блок 1: О бренде */}
        <div className="space-y-4">
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent">
            VELOCITY
          </span>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Современный e-commerce маркетплейс, построенный на базе Next.js и Tailwind CSS. Лучшие товары по лучшим ценам.
          </p>
        </div>

        {/* Блок 2: Категории */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Категории</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/electronics" className="hover:text-foreground transition-colors">Электроника</Link></li>
            <li><Link href="/jewelery" className="hover:text-foreground transition-colors">Ювелирные изделия</Link></li>
            <li><Link href="/mens-clothing" className="hover:text-foreground transition-colors">Мужская одежда</Link></li>
            <li><Link href="/womens-clothing" className="hover:text-foreground transition-colors">Женская одежда</Link></li>
          </ul>
        </div>

        {/* Блок 3: Покупателям */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Покупателям</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/cart" className="hover:text-foreground transition-colors">Моя корзина</Link></li>
            <li><Link href="/login" className="hover:text-foreground transition-colors">Личный кабинет</Link></li>
            <li><Link href="/shipping" className="hover:text-foreground transition-colors">Доставка и оплата</Link></li>
            <li><Link href="/faq" className="hover:text-foreground transition-colors">Вопросы и ответы</Link></li>
          </ul>
        </div>

        {/* Блок 4: Контакты */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Контакты</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Email: <a href="mailto:support@velocity.store" className="hover:text-foreground text-zinc-600 dark:text-zinc-400">support@velocity.store</a></li>
            <li>Телефон: <a href="tel:+78005553535" className="hover:text-foreground text-zinc-600 dark:text-zinc-400">8 (800) 555-35-35</a></li>
            <li className="pt-2 flex space-x-3">
              {/* Плейсхолдеры под иконки соцсетей */}
              <span className="text-xs bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded cursor-pointer hover:bg-primary hover:text-white transition-colors">TG</span>
              <span className="text-xs bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded cursor-pointer hover:bg-primary hover:text-white transition-colors">VK</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Нижняя плашка с копирайтом */}
      <div className="w-full border-t py-6 bg-zinc-100/50 dark:bg-zinc-900/50">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            &copy; {currentYear} Velocity Store. Все права защищены.
          </div>
          <div className="flex space-x-4">
            <Link href="/privacy" className="hover:underline">Политика конфиденциальности</Link>
            <Link href="/terms" className="hover:underline">Условия использования</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
