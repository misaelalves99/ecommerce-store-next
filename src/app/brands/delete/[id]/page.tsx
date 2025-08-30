// app/brands/delete/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useBrands } from '../../../hooks/useBrands';
import { Brand } from '../../../types/Brand';
import styles from './DeleteBrandPage.module.css';

export default function DeleteBrandPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };

  const { brands, removeBrand } = useBrands(); // <-- use removeBrand
  const [brand, setBrand] = useState<Brand | null>(null);

  // Buscar marca pelo ID
  useEffect(() => {
    const found = brands.find((b) => b.id === Number(id)) || null;
    setBrand(found);
  }, [id, brands]);

  if (!brand) return <div className={styles.loading}>Carregando...</div>;

  const handleDelete = () => {
    if (!window.confirm(`Tem certeza que deseja excluir a marca "${brand.name}"?`)) return;

    removeBrand(brand.id); // <-- corrigido
    router.push('/brands');
  };

  const handleCancel = () => router.push('/brands');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Excluir Marca</h1>
      <p className={styles.message}>
        Tem certeza que deseja excluir a marca <strong>{brand.name}</strong>?
      </p>
      <div className={styles.buttonGroup}>
        <button className={`${styles.btn} ${styles.btnDanger}`} onClick={handleDelete}>
          Excluir
        </button>
        <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={handleCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
