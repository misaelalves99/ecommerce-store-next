// src/hooks/useProducts.test.tsx

import { renderHook } from '@testing-library/react';
import { ProductProvider } from '../contexts/ProductProvider';
import { useProducts } from './useProducts';
import React from 'react';

describe('useProducts hook', () => {
  it('deve retornar o contexto corretamente quando usado dentro do ProductProvider', () => {
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <ProductProvider>{children}</ProductProvider>
    );

    const { result } = renderHook(() => useProducts(), { wrapper });

    expect(result.current.products).toBeDefined();
    expect(typeof result.current.addProduct).toBe('function');
  });

  it('deve lançar erro quando usado fora do ProductProvider', () => {
    expect(() => renderHook(() => useProducts())).toThrow(
      'useProducts must be used within a ProductProvider'
    );
  });
});
