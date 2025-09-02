// app/products/create/page.tsx

"use client";
import { useRouter } from "next/navigation";
import ProductForm from "../../components/Product/ProductForm";
import { useProducts } from "../../hooks/useProducts";
import { Product } from "../../types/Product";
import { categories as mockCategories } from "../../mocks/categories";
import { brands as mockBrands } from "../../mocks/brands";
import styles from "./CreateProductPage.module.css";

export default function CreateProductPage() {
  const router = useRouter();
  const { addProduct } = useProducts();

  const emptyProduct: Product = {
    id: 0,
    name: "",
    description: "",
    sku: "",
    price: 0,
    stock: 0,
    categoryId: 0,
    brandId: 0,
    isActive: true,
    createdAt: new Date().toISOString(), // 🔹 adicionado
  };

  const handleSave = async (newProduct: Product) => {
    addProduct(newProduct);
    router.push("/products");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Adicionar Produto</h1>
      <ProductForm
        initialData={emptyProduct}
        categories={mockCategories}
        brands={mockBrands}
        onSubmit={handleSave}
        onCancel={() => router.push("/products")}
        submitLabel="Adicionar"
      />
    </div>
  );
}
