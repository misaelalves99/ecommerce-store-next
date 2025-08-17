// app/brands/edit/[id]/page.tsx

'use client';

import { useRouter, usePathname } from 'next/navigation';
import BrandForm from '../../../components/Brands/BrandForm';
import { useEffect, useState } from 'react';
import { Brand } from '../../../types/Brand';
import { brands as mockBrands } from '../../../mocks/brands';
import styles from './EditBrandPage.module.css';

export default function EditBrandPage() {
  const router = useRouter();
  const pathname = usePathname();
  const id = Number(pathname.split('/')[3]);

  const [brand, setBrand] = useState<Brand | null>(null);

  useEffect(() => {
    const foundBrand = mockBrands.find((b) => b.id === id);
    if (foundBrand) {
      setBrand(foundBrand);
    } else {
      alert('Marca não encontrada.');
      router.push('/brands');
    }
  }, [id, router]);

  const handleUpdate = (name: string) => {
    console.log('Marca atualizada:', { id, name });
    router.push('/brands');
  };

  const handleCancel = () => {
    router.push('/brands');
  };

  if (!brand) return <p className={styles.loading}>Carregando marca...</p>;

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>Editar Marca</h1>
      <BrandForm initialName={brand.name} onSubmit={handleUpdate} onCancel={handleCancel} />
    </div>
  );
}
