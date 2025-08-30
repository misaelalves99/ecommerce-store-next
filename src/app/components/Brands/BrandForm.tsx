// app/components/Brand/BrandForm.tsx

'use client';

import { useState } from 'react';
import styles from './BrandForm.module.css';

interface BrandFormProps {
  initialName?: string;
  onSubmit: (name: string) => void;
  onCancel?: () => void;
}

export default function BrandForm({
  initialName = '',
  onSubmit,
  onCancel,
}: BrandFormProps) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('O nome da marca é obrigatório.');
      return;
    }
    setError('');
    onSubmit(name.trim());
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Campo Nome */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Nome da Marca</label>
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>

      {/* Botões */}
      <div className={styles.buttons}>
        <button type="submit" className={styles.successBtn}>
          Salvar
        </button>
        {onCancel && (
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
