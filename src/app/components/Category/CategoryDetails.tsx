// app/components/Category/CategoryDetails.tsx

import { Category } from '../../types/Category';
import styles from './CategoryDetails.module.css';

interface CategoryDetailsProps {
  category: Category;
}

export default function CategoryDetails({ category }: CategoryDetailsProps) {
  return (
    <div className={styles.detailsContainer}>
      <h2 className={styles.heading}>Detalhes da Categoria</h2>
      <div className={styles.detailItem}>
        <strong>ID:</strong> <span>{category.id}</span>
      </div>
      <div className={styles.detailItem}>
        <strong>Nome:</strong> <span>{category.name}</span>
      </div>
      <div className={styles.detailItem}>
        <strong>Descrição:</strong> <span>{category.description}</span>
      </div>
    </div>
  );
}
