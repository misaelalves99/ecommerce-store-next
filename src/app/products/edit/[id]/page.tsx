// app/products/edit/[id]/page.tsx

"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductForm from "../../../components/Product/ProductForm";
import { Product, Category, Brand } from "../../../types/Product";
import { products as mockProducts } from "../../../mocks/products";
import { categories as mockCategories } from "../../../mocks/categories";
import { brands as mockBrands } from "../../../mocks/brands";
import styles from "./EditProductPage.module.css";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    if (id) {
      const found = mockProducts.find((p) => p.id === Number(id));
      setProduct(found ?? null);
      setCategories(mockCategories);
      setBrands(mockBrands);
    }
  }, [id]);

  const handleSave = async (updatedProduct: Product) => {
    console.log("Salvando produto", updatedProduct);
    router.push("/products");
  };

  if (!product) return <div className={styles.loading}>Carregando...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Editar Produto</h1>
      <ProductForm
        initialData={product}
        categories={categories}
        brands={brands}
        onSubmit={handleSave}
        onCancel={() => router.push("/products")}
        submitLabel="Salvar"
      />
    </div>
  );
}
