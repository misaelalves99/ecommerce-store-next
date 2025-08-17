// app/components/Category/CategoryForm.tsx

'use client';

import { useState } from 'react';
import styles from './CategoryForm.module.css';

interface CategoryFormProps {
  initialName?: string;
  initialDescription?: string;
  onSubmit: (data: { name: string; description: string }) => void;
  onCancel?: () => void;
}

export default function CategoryForm({
  initialName = '',
  initialDescription = '',
  onSubmit,
  onCancel,
}: CategoryFormProps) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'O nome é obrigatório.';
    if (!description.trim()) newErrors.description = 'A descrição é obrigatória.';

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({ name: name.trim(), description: description.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Nome</label>
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>

      <div className={`${styles.formGroup} ${styles.mt2}`}>
        <label className={styles.label}>Descrição</label>
        <textarea
          className={styles.input}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <span className={styles.error}>{errors.description}</span>}
      </div>

      <button type="submit" className={`${styles.successBtn} ${styles.mt3}`}>
        Salvar
      </button>
      {onCancel && (
        <button
          type="button"
          className={`${styles.cancelBtn} ${styles.mt3}`}
          onClick={onCancel}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}
