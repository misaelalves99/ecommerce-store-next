// app/pages/products/delete/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useProducts } from '../../../hooks/useProducts';
import { Product } from '../../../types/Product';
import styles from './DeleteProductPage.module.css';

export default function DeleteProductPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };

  const { products, removeProduct } = useProducts(); // <-- use removeProduct
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const found = products.find((p) => p.id === Number(id)) || null;
    setProduct(found);
  }, [id, products]);

  if (!product) return <div className={styles.loading}>Carregando...</div>;

  const handleDelete = () => {
    if (!window.confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`)) return;

    removeProduct(product.id); // <-- corrigido
    router.push('/products');
  };

  const handleCancel = () => router.push('/products');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Excluir Produto</h1>
      <p className={styles.message}>
        Tem certeza que deseja excluir o produto <strong>{product.name}</strong>?
      </p>
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.btn} ${styles.btnDanger}`}
          onClick={handleDelete}
        >
          Excluir
        </button>
        <button
          className={`${styles.btn} ${styles.btnSecondary}`}
          onClick={handleCancel}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
