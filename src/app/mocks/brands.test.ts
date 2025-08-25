// src/mocks/brands.test.ts

import { brands } from './brands';

describe('brands mock', () => {
  it('deve existir e ser um array', () => {
    expect(brands).toBeDefined();
    expect(Array.isArray(brands)).toBe(true);
  });

  it('cada brand deve ter id, name e createdAt', () => {
    brands.forEach((brand) => {
      expect(brand).toHaveProperty('id');
      expect(brand).toHaveProperty('name');
      expect(brand).toHaveProperty('createdAt');
      expect(typeof brand.id).toBe('number');
      expect(typeof brand.name).toBe('string');
      expect(typeof brand.createdAt).toBe('string');
    });
  });

  it('deve conter pelo menos 4 marcas', () => {
    expect(brands.length).toBeGreaterThanOrEqual(4);
  });
});
