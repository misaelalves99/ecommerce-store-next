// app/contexts/BrandProvider.tsx

"use client";

import { ReactNode, useState } from "react";
import { BrandContext } from "./BrandContext";
import { Brand } from "../types/Brand";
import { brands as initialBrands } from "../mocks/brands";

interface BrandProviderProps {
  children: ReactNode;
}

export function BrandProvider({ children }: BrandProviderProps) {
  const [brands, setBrands] = useState<Brand[]>(initialBrands);

  const addBrand = (name: string) => {
    const newId = brands.length ? Math.max(...brands.map((b) => b.id)) + 1 : 1;

    const newBrand: Brand = {
      id: newId,
      name,
      createdAt: new Date().toISOString(),
    };

    setBrands([...brands, newBrand]);
  };

  return (
    <BrandContext.Provider value={{ brands, addBrand }}>
      {children}
    </BrandContext.Provider>
  );
}
