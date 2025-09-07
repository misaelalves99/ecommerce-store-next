import { render, screen } from '@testing-library/react';
import BrandList from './BrandList';
import { Brand } from '../../types/Brand';

describe('BrandList', () => {
  const mockBrands: Brand[] = [
    { id: 1, name: 'Marca A', createdAt: new Date().toISOString(), isActive: true },
    { id: 2, name: 'Marca B', createdAt: new Date().toISOString(), isActive: false },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('exibe mensagem quando não há marcas', () => {
    render(<BrandList brands={[]} />);
    expect(screen.getByText(/Nenhuma marca cadastrada/i)).toBeInTheDocument();
  });

  it('renderiza lista de marcas com links de Detalhes, Editar e Excluir', () => {
    render(<BrandList brands={mockBrands} />);

    mockBrands.forEach((brand) => {
      expect(screen.getByText(brand.id.toString())).toBeInTheDocument();
      expect(screen.getByText(brand.name)).toBeInTheDocument();

      const detalhesLink = screen.getByText('Detalhes').closest('a');
      expect(detalhesLink).toHaveAttribute('href', `/brands/${brand.id}`);

      const editarLink = screen.getByText('Editar').closest('a');
      expect(editarLink).toHaveAttribute('href', `/brands/edit/${brand.id}`);

      const excluirLink = screen.getByText('Excluir').closest('a');
      expect(excluirLink).toHaveAttribute('href', `/brands/delete/${brand.id}`);
    });
  });
});
