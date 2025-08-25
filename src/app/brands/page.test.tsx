// app/brands/page.test.tsx

import { render, screen } from '@testing-library/react';
import BrandsPage from './page';
import { BrandContext } from '../contexts/BrandContext';
import { Brand } from '../types/Brand';
import '@testing-library/jest-dom';

const mockBrands: Brand[] = [
  { id: 1, name: 'Marca 1', createdAt: new Date().toISOString() },
  { id: 2, name: 'Marca 2', createdAt: new Date().toISOString() },
];

describe('BrandsPage', () => {
  it('renderiza título e botão de adicionar marca', () => {
    render(
      <BrandContext.Provider value={{ brands: mockBrands, addBrand: jest.fn() }}>
        <BrandsPage />
      </BrandContext.Provider>
    );

    expect(screen.getByText('Marcas')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Adicionar Marca/i })).toHaveAttribute('href', '/brands/create');
  });

  it('renderiza a lista de marcas', () => {
    render(
      <BrandContext.Provider value={{ brands: mockBrands, addBrand: jest.fn() }}>
        <BrandsPage />
      </BrandContext.Provider>
    );

    expect(screen.getByText('Marca 1')).toBeInTheDocument();
    expect(screen.getByText('Marca 2')).toBeInTheDocument();
  });
});
