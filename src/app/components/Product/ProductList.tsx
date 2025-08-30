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
    <table className={styles.ProductList}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Preço</th>
          <th>Categoria</th>
          <th>Marca</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </td>
            <td>{product.category?.name ?? '-'}</td>
            <td>{product.brand?.name ?? '-'}</td>
            <td>
              <span
                className={`${styles.badge} ${
                  product.isActive ? styles.badgeSuccess : styles.badgeSecondary
                }`}
              >
                {product.isActive ? 'Ativo' : 'Inativo'}
              </span>
            </td>
            <td>
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
