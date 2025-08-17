// src/hooks/useCategories.ts

import { useContext } from "react";
import { CategoryContext } from "../contexts/CategoryContext";
import { CategoryContextType } from "../types/CategoryContextType";

export function useCategories(): CategoryContextType {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return context;
}
