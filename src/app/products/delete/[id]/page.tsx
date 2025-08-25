'use client';

import { useParams, useRouter } from 'next/navigation';
import { useProducts } from '../../../hooks/useProducts';
import styles from './DeleteProductPage.module.css';

export default function DeleteProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { products, removeProduct } = useProducts();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className={styles.container}>
        <h2>Produto não encontrado</h2>
        <button className={styles.btn} onClick={() => router.push('/products')}>
          Voltar
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Deseja realmente excluir o produto "${product.name}"?`)) {
      removeProduct(product.id);
      router.push('/products');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Excluir Produto</h2>
      <p>Deseja realmente excluir o produto <strong>{product.name}</strong>?</p>
      <div className={styles.actions}>
        <button className={styles.btnDanger} onClick={handleDelete}>Excluir</button>
        <button className={styles.btnSecondary} onClick={() => router.push('/products')}>Cancelar</button>
      </div>
    </div>
  );
}
