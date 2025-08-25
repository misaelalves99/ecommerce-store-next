// app/contexts/CategoryContext.tsx

"use client";

import { createContext } from "react";
import { CategoryContextType } from "../types/CategoryContextType";

// Inicializa com valores padrão
export const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  addCategory: () => {},
  removeCategory: () => {},
  updateCategory: () => {},
});
