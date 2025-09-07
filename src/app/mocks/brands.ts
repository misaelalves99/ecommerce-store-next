// src/mocks/brands.ts

import { Brand } from '../types/Brand';

export const brands: Brand[] = [
  { id: 1, name: 'Nike', createdAt: new Date().toISOString(), isActive: true },
  { id: 2, name: 'Adidas', createdAt: new Date().toISOString(), isActive: true },
  { id: 3, name: 'Apple', createdAt: new Date().toISOString(), isActive: true },
  { id: 4, name: 'Samsung', createdAt: new Date().toISOString(), isActive: true },
];
