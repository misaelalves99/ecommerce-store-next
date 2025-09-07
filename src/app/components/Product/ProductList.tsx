// app/components/Product/ProductList.tsx

"use client";

import { useRouter } from "next/navigation";
import styles from "./ProductList.module.css";
import { useProducts } from "../../hooks/useProducts";
import { useBrands } from "../../hooks/useBrands";
import { useCategories } from "../../hooks/useCategories";
import type { Product } from "../../types/Product";

export default function ProductList() {
  const { products } = useProducts();
  const { brands } = useBrands();
  const { categories } = useCategories();
  const router = useRouter();

  const getBrandName = (id: number) => {
    const brand = brands.find((b) => b.id === id);
    return brand ? brand.name : "—";
  };

  const getCategoryName = (id: number) => {
    const category = categories.find((c) => c.id === id);
    return category ? category.name : "—";
  };

  return (
    <table className={styles.ProductList}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Preço</th>
          <th>Marca</th>
          <th>Categoria</th>
          <th>Ativo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                R${" "}
                {product.price.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td>{product.brandName || getBrandName(product.brandId)}</td>
              <td>{product.categoryName || getCategoryName(product.categoryId)}</td>
              <td>
                <span
                  className={`${styles.badge} ${
                    product.isActive ? styles.badgeSuccess : styles.badgeSecondary
                  }`}
                >
                  {product.isActive ? "Sim" : "Não"}
                </span>
              </td>
              <td>
                <button
                  className={`${styles.btn} ${styles.btnInfo}`}
                  onClick={() => router.push(`/products/${product.id}`)}
                >
                  Detalhes
                </button>
                <button
                  className={`${styles.btn} ${styles.btnWarning}`}
                  onClick={() => router.push(`/products/edit/${product.id}`)}
                >
                  Editar
                </button>
                <button
                  className={`${styles.btn} ${styles.btnDanger}`}
                  onClick={() => router.push(`/products/delete/${product.id}`)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={7} className={styles.empty}>
              Nenhum produto encontrado.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
