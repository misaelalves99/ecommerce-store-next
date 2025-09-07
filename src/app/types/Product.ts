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
  createdAt: string;

  category?: Pick<Category, "name">;
  brand?: Pick<Brand, "name">;

  categoryName: string;
  brandName: string;
}

// NewProduct não precisa de id, createdAt, category, brand, categoryName ou brandName
export type NewProduct = Omit<Product, "id" | "createdAt" | "category" | "brand" | "categoryName" | "brandName">;
