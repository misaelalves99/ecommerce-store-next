// app/brands/page.tsx

'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { BrandContext } from '../contexts/BrandContext';
import BrandList from '../components/Brands/BrandList';
import styles from './BrandPage.module.css';

export default function BrandsPage() {
  const { brands } = useContext(BrandContext);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Marcas</h1>
        <Link href="/brands/create" className={styles.btn}>
          Nova Marca
        </Link>
      </div>

      <BrandList brands={brands} />
    </div>
  );
}
