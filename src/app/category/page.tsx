// app/categories/page.tsx

'use client';

import Link from 'next/link';
import CategoryList from '../components/Category/CategoryList';
import { useCategories } from '../hooks/useCategories';
import styles from './CategoryPage.module.css';

export default function CategoryPage() {
  const { categories } = useCategories();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Categorias</h1>
        <Link
          href="/category/create"
          className={`${styles.btn} ${styles.btnPrimary}`}
        >
          Adicionar Categoria
        </Link>
      </div>

      <CategoryList categories={categories} />
    </div>
  );
}
