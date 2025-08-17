// app/contexts/CategoryProvider.tsx

"use client";

import { ReactNode, useState } from "react";
import { Category } from "../types/Category";
import { categories as initialCategories } from "../mocks/categories";
import { CategoryContext } from "./CategoryContext";

interface CategoryProviderProps {
  children: ReactNode;
}

export function CategoryProvider({ children }: CategoryProviderProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const addCategory = (category: Omit<Category, "id" | "createdAt">) => {
    const newId = categories.length
      ? Math.max(...categories.map((c) => c.id)) + 1
      : 1;

    const newCategory: Category = {
      ...category,
      id: newId,
      createdAt: new Date().toISOString(),
    };

    setCategories([...categories, newCategory]);
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}
