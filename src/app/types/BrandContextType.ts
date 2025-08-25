// src/types/BrandContextType.ts

import { Brand } from '../types/Brand';

export interface BrandContextType {
  brands: Brand[];
  addBrand: (name: string) => void;
}
