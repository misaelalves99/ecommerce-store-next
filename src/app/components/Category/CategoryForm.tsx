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
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {/* Campo Nome */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Nome</label>
        <input
          className={styles.inputField}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>

      {/* Campo Descrição */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Descrição</label>
        <textarea
          className={styles.textareaField}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <span className={styles.errorText}>{errors.description}</span>
        )}
      </div>

      {/* Botões */}
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.btnPrimary}>
          Salvar
        </button>
        {onCancel && (
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
