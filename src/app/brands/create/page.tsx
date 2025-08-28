// app/brands/create/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import BrandForm from '../../components/Brands/BrandForm';
import { useContext } from 'react';
import { BrandContext } from '../../contexts/BrandContext';
import styles from './CreateBrandPage.module.css';

export default function CreateBrandPage() {
  const router = useRouter();
  const { addBrand } = useContext(BrandContext);

  const handleCreate = (name: string) => {
    addBrand(name);
    router.push('/brands');
  };

  const handleCancel = () => {
    router.push('/brands');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Adicionar Marca</h1>
      <BrandForm onSubmit={handleCreate} onCancel={handleCancel} />
    </div>
  );
}
