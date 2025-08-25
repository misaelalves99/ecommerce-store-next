// src/mocks/products.test.ts

import { products } from './products';

describe('products mock', () => {
  it('deve existir e ser um array', () => {
    expect(products).toBeDefined();
    expect(Array.isArray(products)).toBe(true);
  });

  it('cada product deve ter propriedades corretas', () => {
    products.forEach((product) => {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('sku');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('stock');
      expect(product).toHaveProperty('categoryId');
      expect(product).toHaveProperty('brandId');
      expect(product).toHaveProperty('isActive');
      expect(product).toHaveProperty('category');
      expect(product).toHaveProperty('brand');

      expect(typeof product.id).toBe('number');
      expect(typeof product.name).toBe('string');
      expect(typeof product.description).toBe('string');
      expect(typeof product.sku).toBe('string');
      expect(typeof product.price).toBe('number');
      expect(typeof product.stock).toBe('number');
      expect(typeof product.categoryId).toBe('number');
      expect(typeof product.brandId).toBe('number');
      expect(typeof product.isActive).toBe('boolean');
      expect(product.category).not.toBeUndefined();
      expect(product.brand).not.toBeUndefined();
    });
  });

  it('deve conter pelo menos 3 produtos', () => {
    expect(products.length).toBeGreaterThanOrEqual(3);
  });
});
