// app/contexts/CategoryContext.tsx

"use client";

import { createContext } from "react";
import { CategoryContextType } from "../types/CategoryContextType";

export const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  addCategory: () => {},
});
