// app/components/Product/ProductForm.tsx

'use client';

import { useState, FormEvent } from 'react';
import styles from './ProductForm.module.css';
import { Product, Category, Brand } from '../../types/Product';

interface Props {
  initialData: Product;
  categories: Category[];
  brands: Brand[];
  onSubmit: (product: Product) => Promise<void> | void;
  onCancel: () => void;
  submitLabel?: string;
}

export default function ProductForm({
  initialData,
  categories,
  brands,
  onSubmit,
  onCancel,
  submitLabel = 'Salvar',
}: Props) {
  const [formData, setFormData] = useState<Product>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    const checked =
      type === 'checkbox' && e.target instanceof HTMLInputElement
        ? e.target.checked
        : undefined;

    let updatedValue: string | number | boolean = value;

    if (type === 'checkbox' && typeof checked === 'boolean') {
      updatedValue = checked;
    } else if (type === 'number') {
      updatedValue = value === '' ? '' : Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.description.trim()) newErrors.description = 'Descrição é obrigatória';
    if (!formData.sku.trim()) newErrors.sku = 'SKU é obrigatório';
    if (formData.price === undefined || formData.price === null || formData.price <= 0)
      newErrors.price = 'Preço deve ser maior que zero';
    if (formData.stock === undefined || formData.stock === null || formData.stock < 0)
      newErrors.stock = 'Estoque não pode ser negativo';
    if (!formData.categoryId) newErrors.categoryId = 'Categoria é obrigatória';
    if (!formData.brandId) newErrors.brandId = 'Marca é obrigatória';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <input type="hidden" name="id" value={formData.id} />

      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.controlLabel}>Nome</label>
        <input
          id="name"
          name="name"
          type="text"
          className={styles.formControl}
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className={styles.textDanger}>{errors.name}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.controlLabel}>Descrição</label>
        <textarea
          id="description"
          name="description"
          className={styles.formControl}
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <span className={styles.textDanger}>{errors.description}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="sku" className={styles.controlLabel}>SKU</label>
        <input
          id="sku"
          name="sku"
          type="text"
          className={styles.formControl}
          value={formData.sku}
          onChange={handleChange}
        />
        {errors.sku && <span className={styles.textDanger}>{errors.sku}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="price" className={styles.controlLabel}>Preço</label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          className={styles.formControl}
          value={formData.price === 0 ? '' : formData.price}
          onChange={handleChange}
        />
        {errors.price && <span className={styles.textDanger}>{errors.price}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="stock" className={styles.controlLabel}>Estoque</label>
        <input
          id="stock"
          name="stock"
          type="number"
          className={styles.formControl}
          value={formData.stock === 0 ? '' : formData.stock}
          onChange={handleChange}
        />
        {errors.stock && <span className={styles.textDanger}>{errors.stock}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="categoryId" className={styles.controlLabel}>Categoria</label>
        <select
          id="categoryId"
          name="categoryId"
          className={styles.formControl}
          value={formData.categoryId === 0 ? '' : formData.categoryId}
          onChange={handleChange}
        >
          <option value="">-- Selecione --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        {errors.categoryId && <span className={styles.textDanger}>{errors.categoryId}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="brandId" className={styles.controlLabel}>Marca</label>
        <select
          id="brandId"
          name="brandId"
          className={styles.formControl}
          value={formData.brandId === 0 ? '' : formData.brandId}
          onChange={handleChange}
        >
          <option value="">-- Selecione --</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>{brand.name}</option>
          ))}
        </select>
        {errors.brandId && <span className={styles.textDanger}>{errors.brandId}</span>}
      </div>

      <div className={styles.formCheck}>
        <input
          id="isActive"
          name="isActive"
          type="checkbox"
          className={styles.formCheckInput}
          checked={formData.isActive}
          onChange={handleChange}
        />
        <label htmlFor="isActive" className={styles.formCheckLabel}>Ativo</label>
      </div>

      <button type="submit" className={`${styles.btn} ${styles.btnSuccess}`}>{submitLabel}</button>
      <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={onCancel}>Cancelar</button>
    </form>
  );
}
