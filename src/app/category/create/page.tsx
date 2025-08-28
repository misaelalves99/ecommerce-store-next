// app/categories/create/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import CategoryForm from '../../components/Category/CategoryForm';
import { useCategories } from '../../hooks/useCategories';
import styles from './CreateCategoryPage.module.css';

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
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Adicionar Categoria</h1>
      <CategoryForm onSubmit={handleCreate} onCancel={handleCancel} />
    </div>
  );
}
