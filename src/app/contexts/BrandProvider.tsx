// src/contexts/BrandProvider.tsx

'use client';

import { ReactNode, useState } from 'react';
import { BrandContext } from './BrandContext';
import { Brand } from '../types/Brand';
import { brands as initialBrands } from '../mocks/brands';
import { BrandContextType } from '../types/BrandContextType';

interface BrandProviderProps {
  children: ReactNode;
}

export function BrandProvider({ children }: BrandProviderProps) {
  const [brands, setBrands] = useState<Brand[]>(initialBrands);

  // 🔹 Adicionar nova marca
  const addBrand: BrandContextType['addBrand'] = (name: string) => {
    const newId = brands.length ? Math.max(...brands.map(b => b.id)) + 1 : 1;
    const newBrand: Brand = {
      id: newId,
      name,
      createdAt: new Date().toISOString(),
      isActive: true,
    };
    setBrands(prev => [...prev, newBrand]);
  };

  // 🔹 Atualizar marca
  const updateBrand: BrandContextType['updateBrand'] = (id: number, name: string) => {
    setBrands(prev =>
      prev.map(b => (b.id === id ? { ...b, name } : b))
    );
  };

  // 🔹 Remover marca
  const removeBrand: BrandContextType['removeBrand'] = (id: number) => {
    setBrands(prev => prev.filter(b => b.id !== id));
  };

  return (
    <BrandContext.Provider
      value={{
        brands,
        addBrand,
        updateBrand,
        removeBrand,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
}
