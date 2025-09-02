// app/components/Brand/BrandDetails.test.tsx

import { render, screen } from '@testing-library/react';
import BrandDetails from './BrandDetails';
import { Brand } from '../../types/Brand';

describe('BrandDetails', () => {
  const mockBrand: Brand = {
    id: 1,
    name: 'Marca Teste',
    createdAt: new Date().toISOString(),
    isActive: true,
  };

  it('renderiza os detalhes da marca corretamente', () => {
    render(<BrandDetails brand={mockBrand} />);

    expect(screen.getByText(/Detalhes da Marca/i)).toBeInTheDocument();
    expect(screen.getByText(/ID:/i)).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(/Nome:/i)).toBeInTheDocument();
    expect(screen.getByText('Marca Teste')).toBeInTheDocument();
    expect(screen.getByText(/Status:/i)).toBeInTheDocument();
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });
});
