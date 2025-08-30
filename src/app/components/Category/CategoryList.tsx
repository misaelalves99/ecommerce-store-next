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
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>{category.description}</td>
            <td>
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
