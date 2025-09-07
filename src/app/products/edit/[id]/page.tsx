// app/products/edit/[id]/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductForm, { BaseProduct } from '../../../components/Product/ProductForm';
import { Product } from '../../../types/Product';
import { useProducts } from '../../../hooks/useProducts';
import { useCategories } from '../../../hooks/useCategories';
import { useBrands } from '../../../hooks/useBrands';
import styles from './EditProductPage.module.css';

type Props = { params: { id?: string } };

export default function EditProductPage({ params }: Props) {
  const router = useRouter();
  const id = params?.id;

  const { products, updateProduct } = useProducts();
  const { categories } = useCategories();
  const { brands } = useBrands();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      router.push('/products');
      return;
    }

    const found = products.find(p => p.id === Number(id)) ?? null;
    if (!found) {
      alert('Produto não encontrado.');
      router.push('/products');
      return;
    }

    setProduct(found);
    setLoading(false);
  }, [id, products, router]);

  const handleSave = async (updated: BaseProduct) => {
    if (!product) return;

    const updatedProduct: Product = {
      ...product,
      ...updated, // Já inclui categoryName e brandName
    };

    updateProduct(updatedProduct);

    router.push(`/products`);
  };

  if (loading || !product) return <div className={styles.loading}>Carregando...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Editar Produto</h1>

      <ProductForm<BaseProduct>
        initialData={{
          name: product.name,
          description: product.description,
          sku: product.sku,
          price: product.price,
          stock: product.stock,
          categoryId: product.categoryId,
          categoryName: product.categoryName,
          brandId: product.brandId,
          brandName: product.brandName,
          isActive: product.isActive,
        }}
        categories={categories}
        brands={brands}
        onSubmit={handleSave}
        onCancel={() => router.push(`/products`)}
        submitLabel="Salvar"
      />
    </div>
  );
}
