// src/types/Product.ts

export interface Category {
  id: number;
  name: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  sku: string;
  price: number;
  stock: number;
  categoryId: number;
  brandId: number;
  isActive: boolean;
  createdAt: string; // 🔹 adicionado para compatibilidade com ProductProvider

  // relações opcionais resolvidas
  category?: Pick<Category, "name">; // apenas o name quando existir
  brand?: Pick<Brand, "name">;       // apenas o name quando existir
}
