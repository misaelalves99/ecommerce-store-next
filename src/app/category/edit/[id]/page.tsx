// app/categories/edit/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CategoryForm from '../../../components/Category/CategoryForm';
import { Category } from '../../../types/Category';
import { useCategories } from '../../../hooks/useCategories'; // hook do contexto
import styles from './EditCategoryPage.module.css';

interface EditCategoryPageProps {
  params: { id: string };
}

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = params;
  const router = useRouter();

  const { categories, updateCategory } = useCategories();

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      router.push('/category');
      return;
    }

    const found = categories.find((c) => c.id === Number(id)) ?? null;
    if (!found) {
      alert('Categoria não encontrada.');
      router.push('/category');
      return;
    }

    setCategory(found);
    setLoading(false);
  }, [id, categories, router]);

  const handleUpdate = (data: { name: string; description: string }) => {
    if (category) {
      updateCategory(category.id, data); // atualiza no contexto
      router.push('/category');
    }
  };

  const handleCancel = () => {
    router.push('/category');
  };

  if (loading || !category) {
    return <p className={styles.loading}>Carregando categoria...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Editar Categoria</h1>
      <CategoryForm
        initialName={category.name}
        initialDescription={category.description}
        onSubmit={handleUpdate}
        onCancel={handleCancel}
      />
    </div>
  );
}
