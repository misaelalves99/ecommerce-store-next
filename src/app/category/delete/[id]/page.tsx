'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCategories } from '../../../hooks/useCategories';
import styles from './DeleteCategoryPage.module.css';

export default function DeleteCategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const { categories, removeCategory } = useCategories();

  const category = categories.find((c) => c.id === Number(id));

  if (!category) {
    return (
      <div className={styles.container}>
        <h2>Categoria não encontrada</h2>
        <button className={styles.btn} onClick={() => router.push('/category')}>
          Voltar
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Deseja realmente excluir a categoria "${category.name}"?`)) {
      removeCategory(category.id);
      router.push('/category');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Excluir Categoria</h2>
      <p>Deseja realmente excluir a categoria <strong>{category.name}</strong>?</p>
      <div className={styles.actions}>
        <button className={styles.btnDanger} onClick={handleDelete}>Excluir</button>
        <button className={styles.btnSecondary} onClick={() => router.push('/category')}>Cancelar</button>
      </div>
    </div>
  );
}
