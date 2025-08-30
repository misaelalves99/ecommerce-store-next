// app/products/edit/[id]/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductForm from '../../../components/Product/ProductForm';
import { Product, Category, Brand } from '../../../types/Product';
import { useProducts } from '../../../hooks/useProducts';
import { categories as mockCategories } from '../../../mocks/categories';
import { brands as mockBrands } from '../../../mocks/brands';
import styles from './EditProductPage.module.css';

type Props = { params: { id?: string } };

export default function EditProductPage({ params }: Props) {
  const router = useRouter();
  const id = params?.id;

  const { products, updateProduct } = useProducts();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carrega listas de categorias e marcas (mocks)
    setCategories(mockCategories);
    setBrands(mockBrands);

    if (!id) {
      router.push('/products');
      return;
    }

    // Busca o produto no contexto
    const found = products.find((p) => p.id === Number(id)) ?? null;
    if (!found) {
      alert('Produto não encontrado.');
      router.push('/products');
      return;
    }

    // Normaliza createdAt e campos de relação
    const normalized: Product = {
      ...found,
      createdAt: found.createdAt ?? new Date().toISOString(),
      category: found.category ? { name: found.category.name } : undefined,
      brand: found.brand ? { name: found.brand.name } : undefined,
    };

    setProduct(normalized);
    setLoading(false);
  }, [id, router, products]);

  const handleSave = async (updatedProduct: Product) => {
    if (product) {
      // Atualiza produto no contexto
      updateProduct(product.id, updatedProduct);
      router.push('/products');
    }
  };

  if (loading || !product) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Editar Produto</h1>

      <ProductForm
        initialData={product}
        categories={categories}
        brands={brands}
        onSubmit={handleSave}
        onCancel={() => router.push('/products')}
        submitLabel="Salvar"
      />
    </div>
  );
}
