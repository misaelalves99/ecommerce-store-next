// app/components/Category/CategoryDetails.tsx

'use client';

import { Category } from '../../types/Category';
import styles from './CategoryDetails.module.css';

interface CategoryDetailsProps {
  category: Category;
}

export default function CategoryDetails({ category }: CategoryDetailsProps) {
  return (
    <div>
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <h5 className={styles.cardTitle}>{category.name}</h5>
          <p className={styles.cardText}>
            <strong>ID:</strong> {category.id}
          </p>
          <p className={styles.cardText}>
            <strong>Nome:</strong> {category.name}
          </p>
          <p className={styles.cardText}>
            <strong>Descrição:</strong> {category.description || '-'}
          </p>
        </div>
      </div>
    </div>
  );
}
