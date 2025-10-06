// src/components/Category/CategoryList.tsx

'use client';

import Link from 'next/link';
import { Category } from '../../types/Category';
import { FaInfoCircle, FaEdit, FaTrash } from 'react-icons/fa';
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
            <td className={styles.actions}>
              <Link
                href={`/category/${category.id}`}
                className={`${styles.btn} ${styles.btnInfo}`}
                title="Ver detalhes"
              >
                <FaInfoCircle />
              </Link>
              <Link
                href={`/category/edit/${category.id}`}
                className={`${styles.btn} ${styles.btnWarning}`}
                title="Editar categoria"
              >
                <FaEdit />
              </Link>
              <Link
                href={`/category/delete/${category.id}`}
                className={`${styles.btn} ${styles.btnDanger}`}
                title="Excluir categoria"
              >
                <FaTrash />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
