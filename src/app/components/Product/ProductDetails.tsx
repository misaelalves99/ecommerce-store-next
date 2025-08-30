// app/components/Product/ProductDetails.tsx

'use client';

import styles from './ProductDetails.module.css';
import { Product } from '../../types/Product';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div>
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <h5 className={styles.cardTitle}>{product.name}</h5>
          <p className={styles.cardText}>
            <strong>Descrição:</strong> {product.description}
          </p>
          <p className={styles.cardText}>
            <strong>SKU:</strong> {product.sku}
          </p>
          <p className={styles.cardText}>
            <strong>Preço:</strong>{' '}
            {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <p className={styles.cardText}>
            <strong>Estoque:</strong> {product.stock}
          </p>
          <p className={styles.cardText}>
            <strong>Categoria:</strong> {product.category?.name ?? '-'}
          </p>
          <p className={styles.cardText}>
            <strong>Marca:</strong> {product.brand?.name ?? '-'}
          </p>
          <p className={styles.cardText}>
            <strong>Status:</strong> {product.isActive ? 'Ativo' : 'Inativo'}
          </p>
        </div>
      </div>
    </div>
  );
}
