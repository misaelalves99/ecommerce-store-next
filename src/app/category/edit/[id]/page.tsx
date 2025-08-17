// app/categories/edit/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CategoryForm from '../../../components/Category/CategoryForm';
import { Category } from '../../../types/Category';
import { categories as mockCategories } from '../../../mocks/categories';
import styles from './EditCategoryPage.module.css';

interface EditCategoryPageProps {
  params: { id: string };
}

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = params;
  const router = useRouter();
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (id) {
      const foundCategory = mockCategories.find((c) => c.id === Number(id));
      if (foundCategory) {
        setCategory(foundCategory);
      } else {
        alert('Categoria não encontrada.');
        router.push('/category');
      }
    }
  }, [id, router]);

  const handleUpdate = (data: { name: string; description: string }) => {
    console.log('Categoria atualizada:', { id, ...data });
    // Aqui ficaria a lógica real de atualização via API
    router.push('/category');
  };

  const handleCancel = () => {
    router.push('/category');
  };

  if (!category) {
    return <p className={styles.loading}>Carregando categoria...</p>;
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>Editar Categoria</h1>
      <CategoryForm
        initialName={category.name}
        initialDescription={category.description}
        onSubmit={handleUpdate}
        onCancel={handleCancel}
      />
    </div>
  );
}
