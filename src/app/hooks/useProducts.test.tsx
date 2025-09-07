// src/hooks/useProducts.test.tsx

import { renderHook } from '@testing-library/react';
import { ProductsProvider } from '../contexts/ProductProvider';
import { useProducts } from './useProducts';
import React from 'react';

describe('useProducts hook', () => {
  it('deve retornar o contexto corretamente dentro do ProductsProvider', () => {
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <ProductsProvider>{children}</ProductsProvider>
    );

    const { result } = renderHook(() => useProducts(), { wrapper });

    expect(result.current.products).toBeDefined();
    expect(Array.isArray(result.current.products)).toBe(true);
    expect(typeof result.current.addProduct).toBe('function');
    expect(typeof result.current.updateProduct).toBe('function');
    expect(typeof result.current.removeProduct).toBe('function');
  });

  it('deve lançar erro quando usado fora do ProductsProvider', () => {
    expect(() => renderHook(() => useProducts())).toThrow(
      'useProducts must be used within a ProductProvider'
    );
  });
});
