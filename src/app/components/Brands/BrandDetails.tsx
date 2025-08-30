// app/components/Brand/BrandDetails.tsx

'use client';

import { Brand } from '../../types/Brand';
import styles from './BrandDetails.module.css';

interface BrandDetailsProps {
  brand: Brand;
}

export default function BrandDetails({ brand }: BrandDetailsProps) {
  return (
    <div>
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <h5 className={styles.cardTitle}>{brand.name}</h5>
          <p className={styles.cardText}>
            <strong>ID:</strong> {brand.id}
          </p>
          <p className={styles.cardText}>
            <strong>Nome:</strong> {brand.name}
          </p>
          <p className={styles.cardText}>
            <strong>Status:</strong> {brand.isActive ? 'Ativo' : 'Inativo'}
          </p>
        </div>
      </div>
    </div>
  );
}
