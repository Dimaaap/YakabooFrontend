'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { GameContainer, ProductInfoModal } from '../../../../../components';

export default function BoardGamePage() {
  const [showProductModal, setShowProductModal] = useState(false);

  const pathname = usePathname();
  const parts = pathname.split('/');
  const lastPart = parts.pop() || '/';
  const SCROLL_THRESHOLD = 200;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > SCROLL_THRESHOLD) {
        setShowProductModal(true);
      } else {
        setShowProductModal(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <GameContainer />
      {showProductModal && (
        <ProductInfoModal
          productImage="https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/i/m/img_52333.jpg"
          productTitle="Подорожуємо світом. Гра-ходилка"
          productPrice={131}
          oldPrice={156}
        />
      )}
    </div>
  );
}
