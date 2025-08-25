// src/types/ProductContextType.ts

import { Product } from "./Product";

export interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "createdAt" | "category" | "brand">) => void;
  removeProduct: (id: number) => void;
  updateProduct: (
    id: number,
    data: Partial<Omit<Product, "id" | "createdAt" | "category" | "brand">>
  ) => void;
}
