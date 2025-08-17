// src/types/CategoryContextType.ts

import { Category } from "./Category";

export interface CategoryContextType {
  categories: Category[];
  addCategory: (category: Omit<Category, "id" | "createdAt">) => void;
}
