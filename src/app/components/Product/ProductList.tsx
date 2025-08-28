// app/components/Product/ProductList.tsx

'use client';

import Link from 'next/link';
import styles from './ProductList.module.css';
import { Product } from '../../types/Product';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return <p className={styles.empty}>Nenhum produto cadastrado.</p>;
  }

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.rowHeader}>
          <th className={styles.cell}>Nome</th>
          <th className={styles.cell}>SKU</th>
          <th className={styles.cell}>Preço</th>
          <th className={styles.cell}>Estoque</th>
          <th className={styles.cell}>Categoria</th>
          <th className={styles.cell}>Marca</th>
          <th className={styles.cell}>Status</th>
          <th className={styles.cell}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className={styles.row}>
            <td className={styles.cell}>{product.name}</td>
            <td className={styles.cell}>{product.sku}</td>
            <td className={styles.cell}>
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </td>
            <td className={styles.cell}>{product.stock}</td>
            <td className={styles.cell}>{product.category?.name ?? '-'}</td>
            <td className={styles.cell}>{product.brand?.name ?? '-'}</td>
            <td className={styles.cell}>
              <span className={product.isActive ? styles.badgeSuccess : styles.badgeSecondary}>
                {product.isActive ? 'Ativo' : 'Inativo'}
              </span>
            </td>
            <td className={`${styles.cell} ${styles.actions}`}>
              <Link href={`/products/${product.id}`} className={`${styles.btn} ${styles.btnInfo}`}>
                Detalhes
              </Link>
              <Link href={`/products/edit/${product.id}`} className={`${styles.btn} ${styles.btnWarning}`}>
                Editar
              </Link>
              <Link href={`/products/delete/${product.id}`} className={`${styles.btn} ${styles.btnDanger}`}>
                Excluir
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
