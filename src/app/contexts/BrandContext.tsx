// app/contexts/BrandContext.ts

"use client";

import { createContext } from "react";
import { BrandContextType } from "../types/BrandContextType";

export const BrandContext = createContext<BrandContextType>({
  brands: [],
  addBrand: () => {},
});
