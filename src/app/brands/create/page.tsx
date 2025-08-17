// app/brands/create/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import BrandForm from '../../components/Brands/BrandForm';
import { useContext } from 'react';
import { BrandContext } from '../../contexts/BrandContext';

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
    <div>
      <h1 style={{ textAlign: 'center', fontSize: '1.8rem', color: '#333', marginBottom: '1.5rem' }}>
        Adicionar Marca
      </h1>
      <BrandForm onSubmit={handleCreate} onCancel={handleCancel} />
    </div>
  );
}
