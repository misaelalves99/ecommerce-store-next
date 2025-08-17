// src/types/ProductContextType.ts

import { Product } from "./Product";

export interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
}
