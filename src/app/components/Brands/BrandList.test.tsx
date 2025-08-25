// app/components/Brand/BrandList.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import BrandList from './BrandList';
import { Brand } from '../../types/Brand';

describe('BrandList', () => {
  const mockBrands: Brand[] = [
    { id: 1, name: 'Marca A', createdAt: new Date().toISOString() },
    { id: 2, name: 'Marca B', createdAt: new Date().toISOString() },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('exibe mensagem quando não há marcas', () => {
    render(<BrandList brands={[]} />);
    expect(screen.getByText(/Nenhuma marca cadastrada/i)).toBeInTheDocument();
  });

  it('renderiza lista de marcas com detalhes, editar e excluir', () => {
    render(<BrandList brands={mockBrands} />);

    mockBrands.forEach((brand) => {
      expect(screen.getByText(brand.id.toString())).toBeInTheDocument();
      expect(screen.getByText(brand.name)).toBeInTheDocument();

      // verificar href de links separadamente
      const detalhesLink = screen.getByText('Detalhes').closest('a');
      expect(detalhesLink).toHaveAttribute('href', `/brands/${brand.id}`);

      const editarLink = screen.getByText('Editar').closest('a');
      expect(editarLink).toHaveAttribute('href', `/brands/edit/${brand.id}`);

      expect(screen.getByText('Excluir')).toBeInTheDocument();
    });
  });

  it('chama alert ao clicar no botão Excluir', () => {
    render(<BrandList brands={[mockBrands[0]]} />);
    fireEvent.click(screen.getByText('Excluir'));
    expect(window.alert).toHaveBeenCalledWith(`Excluir marca ${mockBrands[0].name}`);
  });
});
