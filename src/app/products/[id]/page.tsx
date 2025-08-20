// app/products/[id]/page.tsx

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductDetails from "../../components/Product/ProductDetails";
import { Product } from "../../types/Product";
import { products as mockProducts } from "../../mocks/products";
import styles from "./DetailsProductPage.module.css";

export default function DetailsProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      const found = mockProducts.find((p) => p.id === Number(id));
      setProduct(found ?? null);
    }
  }, [id]);

  if (!product) {
    return (
      <div className={styles.title}>
        Produto não encontrado.
        <br />
        <Link href="/products" className={styles.btnPrimary}>
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <div>
      <ProductDetails product={product} />
      <Link href="/products" className={styles.btnPrimary}>
        Voltar
      </Link>
    </div>
  );
}
