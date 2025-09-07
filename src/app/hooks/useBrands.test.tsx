// src/hooks/useBrands.test.tsx

import { renderHook } from '@testing-library/react';
import { BrandProvider } from '../contexts/BrandProvider';
import { useBrands } from './useBrands';
import React from 'react';

describe('useBrands hook', () => {
  it('deve retornar o contexto corretamente dentro do BrandProvider', () => {
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <BrandProvider>{children}</BrandProvider>
    );

    const { result } = renderHook(() => useBrands(), { wrapper });

    expect(result.current.brands).toBeDefined();
    expect(Array.isArray(result.current.brands)).toBe(true);
    expect(typeof result.current.addBrand).toBe('function');
    expect(typeof result.current.updateBrand).toBe('function');
    expect(typeof result.current.removeBrand).toBe('function');
  });

  it('deve lançar erro quando usado fora do BrandProvider', () => {
    expect(() => renderHook(() => useBrands())).toThrow(
      'useBrands must be used within a BrandProvider'
    );
  });
});
