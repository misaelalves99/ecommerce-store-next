// src/hooks/useProducts.tsx

import { useContext } from "react";
import { ProductContext, type ProductContextType } from "../contexts/ProductContext";

// Hook com tipagem correta
export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts deve ser usado dentro de ProductsProvider");
  }
  return context;
};
