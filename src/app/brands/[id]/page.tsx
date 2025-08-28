// app/brands/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BrandDetails from '../../components/Brands/BrandDetails';
import { Brand } from '../../types/Brand';
import { brands as mockBrands } from '../../mocks/brands';
import styles from './DetailsBrandPage.module.css';

type PageProps = {
  params: Promise<{ id: string }> | { id: string };
};

export default function DetailsBrandPage({ params }: PageProps) {
  const [brand, setBrand] = useState<Brand | null>(null);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const resolvedParams = await params;
      const { id } = resolvedParams;

      if (id) {
        const foundBrand = mockBrands.find((b) => b.id === Number(id));
        if (foundBrand) {
          setBrand(foundBrand);
        } else {
          alert('Marca não encontrada.');
          router.push('/brands');
        }
      }
    };

    load();
  }, [params, router]);

  if (!brand) {
    return <p className={styles.loading}>Carregando detalhes da marca...</p>;
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>Detalhes da Marca</h1>
      <BrandDetails brand={brand} />
      <div className={styles.actions}>
        <Link href="/brands" className={`btn btn-secondary ${styles.btn}`}>
          Voltar
        </Link>
        <Link
          href={`/brands/edit/${brand.id}`}
          className={`btn btn-warning ${styles.btn}`}
        >
          Editar
        </Link>
      </div>
    </div>
  );
}
