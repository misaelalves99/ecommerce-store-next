// app/contexts/CategoryProvider.tsx

"use client";

import { ReactNode, useState } from "react";
import { CategoryContext } from "./CategoryContext";
import { Category } from "../types/Category";
import { categories as initialCategories } from "../mocks/categories";
import { CategoryContextType } from "../types/CategoryContextType";

interface CategoryProviderProps {
  children: ReactNode;
}

export function CategoryProvider({ children }: CategoryProviderProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  // Adicionar categoria
  const addCategory: CategoryContextType["addCategory"] = (categoryData) => {
    const newId = categories.length
      ? Math.max(...categories.map(c => c.id)) + 1
      : 1;

    const newCategory: Category = {
      ...categoryData,
      id: newId,
      createdAt: new Date().toISOString(),
    };

    setCategories([...categories, newCategory]);
  };

  // Remover categoria
  const removeCategory: CategoryContextType["removeCategory"] = (id) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  // Atualizar categoria
  const updateCategory: CategoryContextType["updateCategory"] = (id, data) => {
    setCategories(
      categories.map(c => (c.id === id ? { ...c, ...data } : c))
    );
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory, removeCategory, updateCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}
