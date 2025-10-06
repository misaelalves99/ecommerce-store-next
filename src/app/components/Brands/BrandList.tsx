// app/components/Brand/BrandList.tsx

'use client';

import Link from 'next/link';
import { Brand } from '../../types/Brand';
import { FaInfoCircle, FaEdit, FaTrash } from 'react-icons/fa';
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
            <td className={styles.actions}>
              <Link
                href={`/brands/${brand.id}`}
                className={`${styles.btn} ${styles.btnInfo}`}
                title="Ver detalhes"
              >
                <FaInfoCircle />
              </Link>
              <Link
                href={`/brands/edit/${brand.id}`}
                className={`${styles.btn} ${styles.btnWarning}`}
                title="Editar marca"
              >
                <FaEdit />
              </Link>
              <Link
                href={`/brands/delete/${brand.id}`}
                className={`${styles.btn} ${styles.btnDanger}`}
                title="Excluir marca"
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
