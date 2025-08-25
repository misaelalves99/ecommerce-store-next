// src/types/CategoryContextType.ts

import { Category } from "./Category";

export interface CategoryContextType {
  categories: Category[];
  addCategory: (category: Omit<Category, "id" | "createdAt">) => void;
  removeCategory: (id: number) => void;
  updateCategory: (id: number, data: Partial<Omit<Category, "id" | "createdAt">>) => void;
}
