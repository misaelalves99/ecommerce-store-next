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
    return <p className={`${styles.BrandList} ${styles.empty}`}>Nenhuma marca cadastrada.</p>;
  }

  return (
    <table className={styles.BrandList}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {brands.map((brand) => (
          <tr key={brand.id}>
            <td>{brand.id}</td>
            <td>{brand.name}</td>
            <td>
              <Link href={`/brands/${brand.id}`} className={`${styles.btn} ${styles.btnInfo}`}>
                Detalhes
              </Link>
              <Link href={`/brands/edit/${brand.id}`} className={`${styles.btn} ${styles.btnWarning}`}>
                Editar
              </Link>
              <Link href={`/brands/delete/${brand.id}`} className={`${styles.btn} ${styles.btnDanger}`}>
                Excluir
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
