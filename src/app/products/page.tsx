// src/app/products/page.tsx

"use client";

import { useRouter } from "next/navigation";
import styles from "./ProductPage.module.css";
import ProductList from "../components/Product/ProductList";

export default function ProductPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Produtos</h1>
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={() => router.push("/products/create")}
        >
          Novo Produto
        </button>
      </div>

      <ProductList />
    </div>
  );
}
