// src/mocks/brands.test.ts

import { brands } from './brands';
import type { Brand } from '../types/Brand';

describe('brands mock', () => {
  it('deve estar definido e ser um array', () => {
    expect(brands).toBeDefined();
    expect(Array.isArray(brands)).toBe(true);
  });

  it('cada brand deve ter id, name, createdAt e isActive com tipos corretos', () => {
    brands.forEach((brand: Brand) => {
      expect(brand).toHaveProperty('id');
      expect(brand).toHaveProperty('name');
      expect(brand).toHaveProperty('createdAt');
      expect(brand).toHaveProperty('isActive');

      expect(typeof brand.id).toBe('number');
      expect(typeof brand.name).toBe('string');
      expect(typeof brand.createdAt).toBe('string');
      expect(typeof brand.isActive).toBe('boolean');
    });
  });

  it('deve conter pelo menos 4 marcas', () => {
    expect(brands.length).toBeGreaterThanOrEqual(4);
  });
});
