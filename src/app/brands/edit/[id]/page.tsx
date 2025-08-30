// app/brands/edit/[id]/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BrandForm from '../../../components/Brands/BrandForm';
import { Brand } from '../../../types/Brand';
import { useBrands } from '../../../hooks/useBrands';
import styles from './EditBrandPage.module.css';

interface EditBrandPageProps {
  params: { id: string };
}

export default function EditBrandPage({ params }: EditBrandPageProps) {
  const { id } = params;
  const router = useRouter();

  const { brands, updateBrand } = useBrands();

  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      router.push('/brands');
      return;
    }

    const found = brands.find((b) => b.id === Number(id)) ?? null;
    if (!found) {
      alert('Marca não encontrada.');
      router.push('/brands');
      return;
    }

    setBrand(found);
    setLoading(false);
  }, [id, brands, router]);

  const handleUpdate = (name: string) => {
    if (brand) {
      updateBrand(brand.id, name);
      router.push('/brands');
    }
  };

  const handleCancel = () => {
    router.push('/brands');
  };

  if (loading || !brand) {
    return <p className={styles.loading}>Carregando marca...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Editar Marca</h1>
      <BrandForm
        initialName={brand.name}
        onSubmit={handleUpdate}
        onCancel={handleCancel}
      />
    </div>
  );
}
