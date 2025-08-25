// app/contexts/BrandContext.ts

"use client";

import { createContext } from "react";
import { BrandContextType } from "../types/BrandContextType";

// Inicializa o contexto com valores padrão (funções vazias)
export const BrandContext = createContext<BrandContextType>({
  brands: [],
  addBrand: () => {},
  removeBrand: () => {},
  updateBrand: () => {},
});
