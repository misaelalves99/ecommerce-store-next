'use client';

import { useParams, useRouter } from 'next/navigation';
import { useBrands } from '../../../hooks/useBrands';
import styles from './DeleteBrandPage.module.css';

export default function DeleteBrandPage() {
  const { id } = useParams();
  const router = useRouter();
  const { brands, removeBrand } = useBrands();

  const brand = brands.find((b) => b.id === Number(id));

  if (!brand) {
    return (
      <div className={styles.container}>
        <h2>Marca não encontrada</h2>
        <button className={styles.btn} onClick={() => router.push('/brands')}>
          Voltar
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja excluir a marca "${brand.name}"?`)) {
      removeBrand(brand.id);
      router.push('/brands');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Excluir Marca</h2>
      <p>Deseja realmente excluir a marca <strong>{brand.name}</strong>?</p>
      <div className={styles.actions}>
        <button className={styles.btnDanger} onClick={handleDelete}>Excluir</button>
        <button className={styles.btnSecondary} onClick={() => router.push('/brands')}>Cancelar</button>
      </div>
    </div>
  );
}
