// app/brands/[id]/page.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DetailsBrandPage from './page';
import { brands as mockBrands } from '../../mocks/brands';
import { useRouter, useParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

describe('DetailsBrandPage', () => {
  const pushMock = jest.fn();
  const useParamsMock = useParams as jest.Mock;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    pushMock.mockClear();
  });

  it('mostra mensagem "Marca não encontrada" se o id não existir', async () => {
    useParamsMock.mockReturnValue({ id: '9999' });

    render(<DetailsBrandPage />);

    await waitFor(() => {
      expect(screen.getByText(/marca não encontrada/i)).toBeInTheDocument();
    });

    const backButton = screen.getByRole('button', { name: /voltar/i });
    fireEvent.click(backButton);

    expect(pushMock).toHaveBeenCalledWith('/brands');
  });

  it('renderiza os detalhes da marca existente', async () => {
    const brand = mockBrands[0];
    useParamsMock.mockReturnValue({ id: String(brand.id) });

    render(<DetailsBrandPage />);

    await waitFor(() => {
      expect(screen.getByText(/detalhes da marca/i)).toBeInTheDocument();
      expect(screen.getByText(brand.name)).toBeInTheDocument();
    });

    const backButton = screen.getByRole('button', { name: /voltar/i });
    fireEvent.click(backButton);
    expect(pushMock).toHaveBeenCalledWith('/brands');
  });
});
