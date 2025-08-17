// app/categories/create/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import CategoryForm from '../../components/Category/CategoryForm';
import { useCategories } from '../../hooks/useCategories';

export default function CreateCategoryPage() {
  const router = useRouter();
  const { addCategory } = useCategories();

  const handleCreate = (data: { name: string; description: string }) => {
    addCategory(data);
    router.push('/category');
  };

  const handleCancel = () => {
    router.push('/category');
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: '1.8rem', color: '#333', marginBottom: '1.5rem' }}>
        Adicionar Categoria
      </h1>
      <CategoryForm onSubmit={handleCreate} onCancel={handleCancel} />
    </div>
  );
}
