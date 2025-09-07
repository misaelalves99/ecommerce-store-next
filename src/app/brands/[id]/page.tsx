// app/brands/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useBrands } from '../../hooks/useBrands';
import BrandDetails from '../../components/Brands/BrandDetails';
import { Brand } from '../../types/Brand';
import styles from './DetailsBrandPage.module.css';

export default function DetailsBrandPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };

  const { brands } = useBrands(); // usar contexto
  const [brand, setBrand] = useState<Brand | null>(null);

  useEffect(() => {
    const found = brands.find((b) => b.id === Number(id));
    setBrand(found ?? null);
  }, [brands, id]);

  if (!brand) {
    return (
      <div className={styles.notFound}>
        Marca não encontrada.
        <button className={styles.btnPrimary} onClick={() => router.push('/brands')}>
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalhes da Marca</h1>
      <BrandDetails brand={brand} />
      <button className={styles.btnPrimary} onClick={() => router.push('/brands')}>
        Voltar
      </button>
    </div>
  );
}
