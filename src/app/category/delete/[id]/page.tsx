// app/categories/delete/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useCategories } from '../../../hooks/useCategories';
import { Category } from '../../../types/Category';
import styles from './DeleteCategoryPage.module.css';

export default function DeleteCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };

  const { categories, removeCategory } = useCategories(); // <-- use removeCategory
  const [category, setCategory] = useState<Category | null>(null);

  // Buscar categoria pelo ID
  useEffect(() => {
    const found = categories.find((c) => c.id === Number(id)) || null;
    setCategory(found);
  }, [id, categories]);

  if (!category) return <div className={styles.loading}>Carregando...</div>;

  const handleDelete = () => {
    if (!window.confirm(`Tem certeza que deseja excluir a categoria "${category.name}"?`)) return;

    removeCategory(category.id); // <-- corrigido
    router.push('/category');
  };

  const handleCancel = () => router.push('/category');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Excluir Categoria</h1>
      <p className={styles.message}>
        Tem certeza que deseja excluir a categoria <strong>{category.name}</strong>?
      </p>
      <div className={styles.buttonGroup}>
        <button className={`${styles.btn} ${styles.btnDanger}`} onClick={handleDelete}>
          Excluir
        </button>
        <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={handleCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
