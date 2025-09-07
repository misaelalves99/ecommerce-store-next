// src/types/ProductContextType.ts

import { Product, NewProduct } from './Product';

export interface ProductContextType {
  products: Product[];
  addProduct: (product: NewProduct) => void;
  updateProduct: (id: number, product: NewProduct) => void;
  removeProduct: (id: number) => void;
}
