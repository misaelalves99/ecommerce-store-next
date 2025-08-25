// src/types/BrandContextType.ts

import { Brand } from "./Brand";

export interface BrandContextType {
  brands: Brand[];
  addBrand: (name: string) => void;
  removeBrand: (id: number) => void;
  updateBrand: (id: number, name: string) => void;
}
