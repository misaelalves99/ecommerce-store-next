// app/contexts/ProductProvider.tsx

"use client";

import { ReactNode, useState } from "react";
import { Product } from "../types/Product";
import { products as initialProducts } from "../mocks/products";
import { categories as mockCategories } from "../mocks/categories";
import { brands as mockBrands } from "../mocks/brands";
import { ProductContext } from "./ProductContext";
import { ProductContextType } from "../types/ProductContextType";

interface ProductProviderProps {
  children: ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Adicionar produto
  const addProduct: ProductContextType["addProduct"] = (productData) => {
    const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;

    const category = mockCategories.find((c) => c.id === productData.categoryId);
    const brand = mockBrands.find((b) => b.id === productData.brandId);

    const newProduct: Product = {
      ...productData,
      id: newId,
      createdAt: new Date().toISOString(),
      category,
      brand,
    };

    setProducts([...products, newProduct]);
  };

  // Remover produto
  const removeProduct: ProductContextType["removeProduct"] = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Atualizar produto
  const updateProduct: ProductContextType["updateProduct"] = (id, data) => {
    setProducts(
      products.map((p) =>
        p.id === id
          ? {
              ...p,
              ...data,
              category: data.categoryId
                ? mockCategories.find((c) => c.id === data.categoryId)
                : p.category,
              brand: data.brandId
                ? mockBrands.find((b) => b.id === data.brandId)
                : p.brand,
            }
          : p
      )
    );
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
}
