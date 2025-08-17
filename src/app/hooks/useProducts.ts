// src/hooks/useProducts.ts

import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { ProductContextType } from "../types/ProductContextType";

export function useProducts(): ProductContextType {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
