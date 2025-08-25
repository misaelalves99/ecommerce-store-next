// src/mocks/categories.test.ts

import { categories } from './categories';

describe('categories mock', () => {
  it('deve existir e ser um array', () => {
    expect(categories).toBeDefined();
    expect(Array.isArray(categories)).toBe(true);
  });

  it('cada category deve ter id, name, description e createdAt', () => {
    categories.forEach((category) => {
      expect(category).toHaveProperty('id');
      expect(category).toHaveProperty('name');
      expect(category).toHaveProperty('description');
      expect(category).toHaveProperty('createdAt');
      expect(typeof category.id).toBe('number');
      expect(typeof category.name).toBe('string');
      expect(typeof category.description).toBe('string');
      expect(typeof category.createdAt).toBe('string');
    });
  });

  it('deve conter pelo menos 4 categorias', () => {
    expect(categories.length).toBeGreaterThanOrEqual(4);
  });
});
