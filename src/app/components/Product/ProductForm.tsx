// app/components/Product/ProductForm.tsx

'use client';

import { useState, FormEvent } from 'react';
import styles from './ProductForm.module.css';
import { Category, Brand } from '../../types/Product';

// Tipo base do formulário, garante todos os campos obrigatórios
export interface BaseProduct {
  name: string;
  description: string;
  sku: string;
  price: number;
  stock: number;
  categoryId: number;
  categoryName: string;
  brandId: number;
  brandName: string;
  isActive: boolean;
}

interface Props<T extends BaseProduct> {
  initialData: T;
  categories: Category[];
  brands: Brand[];
  onSubmit: (product: T) => Promise<void> | void;
  onCancel: () => void;
  submitLabel?: string;
}

export default function ProductForm<T extends BaseProduct>({
  initialData,
  categories,
  brands,
  onSubmit,
  onCancel,
  submitLabel = 'Salvar',
}: Props<T>) {
  const [formData, setFormData] = useState<T>({
    ...initialData,
    categoryId: initialData.categoryId || 0,
    categoryName: initialData.categoryName || '',
    brandId: initialData.brandId || 0,
    brandName: initialData.brandName || '',
    isActive: initialData.isActive ?? true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let val: string | number | boolean = value;

    if (type === 'checkbox') val = (e.target as HTMLInputElement).checked;
    else if (type === 'number') val = value === '' ? '' : Number(value);

    setFormData(prev => {
      const newData = { ...prev, [name]: val };

      // Sincroniza o nome da categoria
      if (name === 'categoryId') {
        const selectedCategory = categories.find(c => c.id === Number(val));
        newData.categoryName = selectedCategory?.name ?? '';
      }

      // Sincroniza o nome da marca
      if (name === 'brandId') {
        const selectedBrand = brands.find(b => b.id === Number(val));
        newData.brandName = selectedBrand?.name ?? '';
      }

      return newData;
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.description.trim()) newErrors.description = 'Descrição é obrigatória';
    if (!formData.sku.trim()) newErrors.sku = 'SKU é obrigatório';
    if (formData.price <= 0) newErrors.price = 'Preço deve ser maior que zero';
    if (formData.stock < 0) newErrors.stock = 'Estoque não pode ser negativo';
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
      {/* Nome */}
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

      {/* Descrição */}
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

      {/* SKU */}
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

      {/* Preço */}
      <div className={styles.formGroup}>
        <label htmlFor="price" className={styles.controlLabel}>Preço</label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          className={styles.formControl}
          value={formData.price || ''}
          onChange={handleChange}
        />
        {errors.price && <span className={styles.textDanger}>{errors.price}</span>}
      </div>

      {/* Estoque */}
      <div className={styles.formGroup}>
        <label htmlFor="stock" className={styles.controlLabel}>Estoque</label>
        <input
          id="stock"
          name="stock"
          type="number"
          className={styles.formControl}
          value={formData.stock || ''}
          onChange={handleChange}
        />
        {errors.stock && <span className={styles.textDanger}>{errors.stock}</span>}
      </div>

      {/* Categoria */}
      <div className={styles.formGroup}>
        <label htmlFor="categoryId" className={styles.controlLabel}>Categoria</label>
        <select
          id="categoryId"
          name="categoryId"
          className={styles.formControl}
          value={formData.categoryId || ''}
          onChange={handleChange}
        >
          <option value="">-- Selecione --</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        {errors.categoryId && <span className={styles.textDanger}>{errors.categoryId}</span>}
      </div>

      {/* Marca */}
      <div className={styles.formGroup}>
        <label htmlFor="brandId" className={styles.controlLabel}>Marca</label>
        <select
          id="brandId"
          name="brandId"
          className={styles.formControl}
          value={formData.brandId || ''}
          onChange={handleChange}
        >
          <option value="">-- Selecione --</option>
          {brands.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
        {errors.brandId && <span className={styles.textDanger}>{errors.brandId}</span>}
      </div>

      {/* Ativo */}
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

      {/* Botões */}
      <button type="submit" className={`${styles.btn} ${styles.btnSuccess}`}>{submitLabel}</button>
      <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={onCancel}>Cancelar</button>
    </form>
  );
}
