// app/brands/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BrandDetails from '../../components/Brands/BrandDetails';
import { Brand } from '../../types/Brand';
import { brands as mockBrands } from '../../mocks/brands';
import styles from './DetailsBrandPage.module.css';

export default function DetailsBrandPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [brand, setBrand] = useState<Brand | null>(null);

  useEffect(() => {
    if (id) {
      const foundBrand = mockBrands.find((b) => b.id === Number(id));
      if (foundBrand) {
        setBrand(foundBrand);
      } else {
        alert('Marca não encontrada.');
        router.push('/brands');
      }
    }
  }, [id, router]);

  if (!brand) {
    return <p className={styles.loading}>Carregando detalhes da marca...</p>;
  }

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>Detalhes da Marca</h2>
      <BrandDetails brand={brand} />
      <div className={styles.actions}>
        <button
          className={`btn btn-secondary ${styles.btn}`}
          onClick={() => router.push('/brands')}
        >
          Voltar
        </button>
        <button
          className={`btn btn-warning ${styles.btn}`}
          onClick={() => router.push(`/brands/edit/${brand.id}`)}
        >
          Editar
        </button>
      </div>
    </div>
  );
}
