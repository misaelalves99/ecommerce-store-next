// app/contexts/ProductContext.tsx

"use client";

import { createContext } from "react";
import { ProductContextType } from "../types/ProductContextType";

// Inicializa o contexto com valores padrão
export const ProductContext = createContext<ProductContextType>({
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
  updateProduct: () => {},
});
