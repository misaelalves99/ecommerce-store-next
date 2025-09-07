// src/contexts/ProductContext.tsx

"use client";

import { createContext } from "react";
import type { Product } from "../types/Product";

export interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
}

// Criamos o contexto tipado corretamente
export const ProductContext = createContext<ProductContextType | undefined>(undefined);
