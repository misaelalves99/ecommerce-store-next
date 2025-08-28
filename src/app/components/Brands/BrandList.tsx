// app/components/Brand/BrandList.tsx

'use client';

import Link from 'next/link';
import { Brand } from '../../types/Brand';
import styles from './BrandList.module.css';

interface BrandListProps {
  brands: Brand[];
}

export default function BrandList({ brands }: BrandListProps) {
  if (brands.length === 0) {
    return <p className={styles.empty}>Nenhuma marca cadastrada.</p>;
  }

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.rowHeader}>
          <th className={styles.cell}>ID</th>
          <th className={styles.cell}>Nome</th>
          <th className={styles.cell}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {brands.map((brand) => (
          <tr key={brand.id} className={styles.row}>
            <td className={styles.cell}>{brand.id}</td>
            <td className={styles.cell}>{brand.name}</td>
            <td className={`${styles.cell} ${styles.actions}`}>
              <Link
                href={`/brands/${brand.id}`}
                className={`${styles.btn} ${styles.btnInfo}`}
              >
                Detalhes
              </Link>
              <Link
                href={`/brands/edit/${brand.id}`}
                className={`${styles.btn} ${styles.btnWarning}`}
              >
                Editar
              </Link>
              <Link
                href={`/brands/delete/${brand.id}`}
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
