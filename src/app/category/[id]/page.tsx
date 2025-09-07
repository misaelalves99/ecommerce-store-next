// app/categories/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import CategoryDetails from '../../components/Category/CategoryDetails';
import { Category } from '../../types/Category';
import { useCategories } from '../../hooks/useCategories';
import styles from './DetailsCategoryPage.module.css';

export default function DetailsCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };

  const { categories } = useCategories();
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const found = categories.find((c) => c.id === Number(id));
    setCategory(found ?? null);
  }, [categories, id]);

  if (!category) {
    return (
      <div className={styles.notFound}>
        Categoria não encontrada.
        <button
          className={styles.btnPrimary}
          onClick={() => router.push('/category')} // plural
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>Detalhes da Categoria</h2>
      <CategoryDetails category={category} />
      <div className={styles.actions}>
        <button
          className={`btn btn-secondary ${styles.btn}`}
          onClick={() => router.push('/category')} // plural
        >
          Voltar
        </button>
        <button
          className={`btn btn-warning ${styles.btn}`}
          onClick={() => router.push(`/category/edit/${category.id}`)} // plural
        >
          Editar
        </button>
      </div>
    </div>
  );
}
