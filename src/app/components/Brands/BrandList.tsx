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
    <table className={`table table-striped ${styles.table}`}>
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
              <Link href={`/brands/${brand.id}`} className={`btn btn-primary btn-sm ${styles.btnDetalhes}`}>
                Detalhes
              </Link>{' '}
              <Link href={`/brands/edit/${brand.id}`} className={`btn btn-warning btn-sm ${styles.btnEditar}`}>
                Editar
              </Link>{' '}
              <button
                className={`btn btn-danger btn-sm ${styles.btnExcluir}`}
                onClick={() => alert(`Excluir marca ${brand.name}`)}
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
