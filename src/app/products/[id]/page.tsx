// app/products/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductDetails from '../../components/Product/ProductDetails';
import { Product } from '../../types/Product';
import { products as mockProducts } from '../../mocks/products';
import styles from './DetailsProductPage.module.css';

export default function DetailsProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const found = mockProducts.find((p) => p.id === Number(id));
    setProduct(found ?? null);
  }, [id]);

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

  const handleEdit = () => router.push(`/products/edit/${product.id}`);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalhes do Produto</h1>
      <ProductDetails product={product} />
      <div className={styles.actions}>
        <button className={styles.btnPrimary} onClick={() => router.push('/products')}>
          Voltar
        </button>
        <button className={styles.btnSecondary} onClick={handleEdit}>
          Editar
        </button>
      </div>
    </div>
  );
}
