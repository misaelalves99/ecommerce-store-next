// app/products/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProductDetails from '../../components/Product/ProductDetails';
import { Product } from '../../types/Product';
import { useProducts } from '../../hooks/useProducts';
import styles from './DetailsProductPage.module.css';

export default function DetailsProductPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };

  const { products } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const found = products.find((p) => p.id === Number(id));
    setProduct(found ?? null);
  }, [products, id]);

  if (!product) {
    return (
      <div className={styles.notFound}>
        Produto não encontrado.
        <button className={styles.btnPrimary} onClick={() => router.push('/products')}>
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalhes do Produto</h1>
      <ProductDetails product={product} />
      <div className={styles.actions}>
        <button className={styles.btnPrimary} onClick={() => router.push('/products')}>
          Voltar
        </button>
        <button className={styles.btnSecondary} onClick={() => router.push(`/products/edit/${product.id}`)}>
          Editar
        </button>
      </div>
    </div>
  );
}
