// app/brands/[id]/page.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import DetailsBrandPage from './page';
import { brands as mockBrands } from '../../mocks/brands';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('DetailsBrandPage', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    pushMock.mockClear();
  });

  it('mostra mensagem de carregando inicialmente', () => {
    render(<DetailsBrandPage params={{ id: '1' }} />);
    expect(screen.getByText(/Carregando detalhes da marca/i)).toBeInTheDocument();
  });

  it('renderiza os detalhes da marca existente', async () => {
    render(<DetailsBrandPage params={{ id: String(mockBrands[0].id) }} />);

    await waitFor(() => {
      expect(screen.getByText(/Marca - Detalhes/i)).toBeInTheDocument();
      expect(screen.getByText(mockBrands[0].name)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Voltar/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Editar/i })).toBeInTheDocument();
    });
  });

  it('redireciona se a marca não for encontrada', async () => {
    // Mock global alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<DetailsBrandPage params={{ id: '9999' }} />);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Marca não encontrada.');
      expect(pushMock).toHaveBeenCalledWith('/brands');
    });

    alertMock.mockRestore();
  });
});
