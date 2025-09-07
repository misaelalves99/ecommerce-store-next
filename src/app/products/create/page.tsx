// src/app/products/create/page.tsx

"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./CreateProductPage.module.css";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { useBrands } from "../../hooks/useBrands";
import { Product, NewProduct } from "../../types/Product";

export default function CreateProductPage() {
  const router = useRouter();
  const { addProduct, products } = useProducts();
  const { categories } = useCategories();
  const { brands } = useBrands();

  // Formulário só precisa dos campos "editáveis"
  const [form, setForm] = useState<NewProduct>({
    name: "",
    description: "",
    sku: "",
    price: 0,
    stock: 0,
    brandId: 0,
    categoryId: 0,
    isActive: false,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    let newValue: string | number | boolean = value;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      newValue = e.target.checked;
    }

    if (name === "brandId" || name === "categoryId" || name === "price" || name === "stock") {
      newValue = Number(value);
    }

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

    const newProduct: Product = {
      ...form,
      id: newId,
      createdAt: new Date().toISOString(),
      categoryName: categories.find((c) => c.id === form.categoryId)?.name ?? "-",
      brandName: brands.find((b) => b.id === form.brandId)?.name ?? "-",
    };

    addProduct(newProduct);
    router.push("/products");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Cadastrar Produto</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Nome */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="name">Nome</label>
          <input
            className={styles.formInput}
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            required
          />
        </div>

        {/* Descrição */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="description">Descrição</label>
          <input
            className={styles.formInput}
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            type="text"
            required
          />
        </div>

        {/* SKU */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="sku">SKU</label>
          <input
            className={styles.formInput}
            id="sku"
            name="sku"
            value={form.sku}
            onChange={handleChange}
            type="text"
            required
          />
        </div>

        {/* Preço */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="price">Preço</label>
          <input
            className={styles.formInput}
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            step="0.01"
            min="0"
            required
          />
        </div>

        {/* Estoque */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="stock">Estoque</label>
          <input
            className={styles.formInput}
            id="stock"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            type="number"
            min="0"
            required
          />
        </div>

        {/* Marca */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="brandId">Marca</label>
          <select
            className={styles.formSelect}
            id="brandId"
            name="brandId"
            value={form.brandId}
            onChange={handleChange}
            required
          >
            <option value={0}>Selecione uma marca</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        {/* Categoria */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="categoryId">Categoria</label>
          <select
            className={styles.formSelect}
            id="categoryId"
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            required
          >
            <option value={0}>Selecione uma categoria</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <label className={styles.checkboxLabel}>
          <input
            className={styles.checkboxInput}
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          Ativo
        </label>

        {/* Botões */}
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.buttonSubmit}>Salvar</button>
          <button
            type="button"
            className={styles.buttonCancel}
            onClick={() => router.push("/products")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
