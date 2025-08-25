// app/contexts/BrandContext.ts

"use client";

import { createContext } from "react";
import { BrandContextType } from "../types/BrandContextType";

// Inicializamos o contexto com valores compatíveis
export const BrandContext = createContext<BrandContextType>({
  brands: [],
  addBrand: () => {}, // função vazia
});
