// app/page.tsx

"use client";

import { useRouter } from "next/navigation";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Bem-vindo ao Painel Administrativo
      </h1>

      <div className={styles.buttonsRow}>
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={() => router.push("/brands")}
        >
          Gerenciar Marcas
        </button>

        <button
          className={`${styles.btn} ${styles.btnSuccess}`}
          onClick={() => router.push("/category")}
        >
          Gerenciar Categorias
        </button>

        <button
          className={`${styles.btn} ${styles.btnDark}`}
          onClick={() => router.push("/products")}
        >
          Gerenciar Produtos
        </button>
      </div>
    </div>
  );
}
