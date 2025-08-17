// src/mocks/products.ts

import { Product } from '../types/Product';
import { categories } from './categories';
import { brands } from './brands';

export const products: Product[] = [
  {
    id: 1,
    name: "Notebook Gamer",
    description: "Notebook potente para jogos",
    sku: "NB-001",
    price: 5999.9,
    stock: 10,
    categoryId: 1,
    brandId: 1,
    isActive: true,
    category: categories.find((c) => c.id === 1),
    brand: brands.find((b) => b.id === 1),
  },
  {
    id: 2,
    name: "Camiseta Esportiva",
    description: "Camiseta confortável para esportes",
    sku: "CM-002",
    price: 99.9,
    stock: 50,
    categoryId: 2,
    brandId: 2,
    isActive: true,
    category: categories.find((c) => c.id === 2),
    brand: brands.find((b) => b.id === 2),
  },
  {
    id: 3,
    name: "Livro de Programação",
    description: "Livro para aprender programação em JS",
    sku: "LB-003",
    price: 59.9,
    stock: 100,
    categoryId: 3,
    brandId: 3,
    isActive: false,
    category: categories.find((c) => c.id === 3),
    brand: brands.find((b) => b.id === 3),
  },
];
