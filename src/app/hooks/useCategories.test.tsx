// src/hooks/useCategories.test.tsx

import { renderHook } from '@testing-library/react';
import { CategoryProvider } from '../contexts/CategoryProvider';
import { useCategories } from './useCategories';
import React from 'react';

describe('useCategories hook', () => {
  it('deve retornar o contexto corretamente dentro do CategoryProvider', () => {
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <CategoryProvider>{children}</CategoryProvider>
    );

    const { result } = renderHook(() => useCategories(), { wrapper });

    expect(result.current.categories).toBeDefined();
    expect(Array.isArray(result.current.categories)).toBe(true);
    expect(typeof result.current.addCategory).toBe('function');
    expect(typeof result.current.updateCategory).toBe('function');
    expect(typeof result.current.removeCategory).toBe('function');
  });

  it('deve lançar erro quando usado fora do CategoryProvider', () => {
    expect(() => renderHook(() => useCategories())).toThrow(
      'useCategories must be used within a CategoryProvider'
    );
  });
});
