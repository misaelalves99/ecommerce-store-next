// app/components/Brand/BrandDetails.tsx

import { Brand } from '../../types/Brand';
import styles from './BrandDetails.module.css';

interface BrandDetailsProps {
  brand: Brand;
}

export default function BrandDetails({ brand }: BrandDetailsProps) {
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.detailItem}>
        <strong>ID:</strong> <span>{brand.id}</span>
      </div>
      <div className={styles.detailItem}>
        <strong>Nome:</strong> <span>{brand.name}</span>
      </div>
    </div>
  );
}
