// app/contexts/ProductContext.tsx

"use client";

import { createContext } from "react";
import { ProductContextType } from "../types/ProductContextType";

// 🔹 Agora o contexto pode ser undefined
export const ProductContext = createContext<ProductContextType | undefined>(undefined);
