// app/components/Category/CategoryList.tsx

'use client';

import Link from 'next/link';
import { Category } from '../../types/Category';
import styles from './CategoryList.module.css';

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  if (categories.length === 0) {
    return <p className={styles.empty}>Nenhuma categoria cadastrada.</p>;
  }

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.rowHeader}>
          <th className={styles.cell}>ID</th>
          <th className={styles.cell}>Nome</th>
          <th className={styles.cell}>Descrição</th>
          <th className={styles.cell}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id} className={styles.row}>
            <td className={styles.cell}>{category.id}</td>
            <td className={styles.cell}>{category.name}</td>
            <td className={styles.cell}>{category.description}</td>
            <td className={`${styles.cell} ${styles.actions}`}>
              <Link
                href={`/category/${category.id}`}
                className={`${styles.btn} ${styles.btnInfo}`}
              >
                Detalhes
              </Link>
              <Link
                href={`/category/edit/${category.id}`}
                className={`${styles.btn} ${styles.btnWarning}`}
              >
                Editar
              </Link>
              <Link
                href={`/category/delete/${category.id}`}
                className={`${styles.btn} ${styles.btnDanger}`}
              >
                Excluir
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
