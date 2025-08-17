// src/hooks/useBrands.ts

import { useContext } from "react";
import { BrandContext } from "../contexts/BrandContext";
import { BrandContextType } from "../types/BrandContextType";

export function useBrands(): BrandContextType {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error("useBrands must be used within a BrandProvider");
  }
  return context;
}
