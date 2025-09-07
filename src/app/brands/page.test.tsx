// app/brands/page.test.tsx

import { render, screen } from '@testing-library/react';
import BrandsPage from './page';
import { BrandContext } from '../contexts/BrandContext';
import { Brand } from '../types/Brand';
import '@testing-library/jest-dom';

describe('BrandsPage', () => {
  const mockBrands: Brand[] = [
    { id: 1, name: 'Marca 1', createdAt: new Date().toISOString(), isActive: true },
    { id: 2, name: 'Marca 2', createdAt: new Date().toISOString(), isActive: true },
  ];

  const renderWithContext = (brands = mockBrands) => {
    render(
      <BrandContext.Provider
        value={{
          brands,
          addBrand: jest.fn(),
          removeBrand: jest.fn(),
          updateBrand: jest.fn(),
        }}
      >
        <BrandsPage />
      </BrandContext.Provider>
    );
  };

  it('renderiza o título da página e botão de adicionar marca', () => {
    renderWithContext();

    expect(screen.getByText('Marcas')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Adicionar Marca/i })).toHaveAttribute(
      'href',
      '/brands/create'
    );
  });

  it('renderiza corretamente a lista de marcas', () => {
    renderWithContext();

    for (const brand of mockBrands) {
      expect(screen.getByText(brand.name)).toBeInTheDocument();
    }
  });

  it('mostra mensagem apropriada quando não há marcas', () => {
    renderWithContext([]);

    expect(screen.queryByText('Marca 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Marca 2')).not.toBeInTheDocument();
    expect(screen.getByText(/Nenhuma marca cadastrada/i)).toBeInTheDocument();
  });
});
