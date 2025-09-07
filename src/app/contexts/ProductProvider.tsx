// app/contexts/ProductProvider.tsx

"use client";

import React, { useState } from "react";
import { ProductContext } from "./ProductContext";
import type { Product } from "../types/Product";
import { products as initialProducts } from "../mocks/products";

interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductsProvider: React.FC<ProductProviderProps> = ({ children }) => {
 const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Product) => {
    const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const newProduct: Product = { ...product, id: newId };
    setProducts((prev) => [...prev, newProduct]);
    console.log("Novo produto adicionado:", newProduct);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    console.log("Produto atualizado:", updatedProduct);
  };

  const removeProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    console.log("Produto excluído com id:", id);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
