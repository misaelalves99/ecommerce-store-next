// app/categories/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import CategoryDetails from "../../components/Category/CategoryDetails";
import { Category } from "../../types/Category";
import { categories as mockCategories } from "../../mocks/categories";
import styles from "./DetailsCategoryPage.module.css";

export default function DetailsCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (id) {
      const foundCategory = mockCategories.find((c) => c.id === Number(id));
      if (foundCategory) {
        setCategory(foundCategory);
      } else {
        alert("Categoria não encontrada.");
        router.push("/categories");
      }
    }
  }, [id, router]);

  if (!category) {
    return <p className={styles.loading}>Carregando detalhes da categoria...</p>;
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>Detalhes da Categoria</h1>
      <CategoryDetails category={category} />
      <div className={styles.actions}>
        <Link href="/category" className={`btn btn-secondary ${styles.btn}`}>
          Voltar
        </Link>
        <Link
          href={`/category/edit/${category.id}`}
          className={`btn btn-warning ${styles.btn}`}
        >
          Editar
        </Link>
      </div>
    </div>
  );
}
