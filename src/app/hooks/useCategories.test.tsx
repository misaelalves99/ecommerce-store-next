// src/hooks/useCategories.test.tsx

import { renderHook } from '@testing-library/react';
import { CategoryProvider } from '../contexts/CategoryProvider';
import { useCategories } from './useCategories';
import React from 'react';

describe('useCategories hook', () => {
  it('deve retornar o contexto corretamente quando usado dentro do CategoryProvider', () => {
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <CategoryProvider>{children}</CategoryProvider>
    );

    const { result } = renderHook(() => useCategories(), { wrapper });

    expect(result.current.categories).toBeDefined();
    expect(typeof result.current.addCategory).toBe('function');
  });

  it('deve lançar erro quando usado fora do CategoryProvider', () => {
    expect(() => renderHook(() => useCategories())).toThrow(
      'useCategories must be used within a CategoryProvider'
    );
  });
});
