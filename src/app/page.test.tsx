// app/page.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from './page';
import * as nextNavigation from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('HomePage', () => {
  const pushMock = jest.fn();
  const useRouterMock = nextNavigation.useRouter as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    useRouterMock.mockReturnValue({ push: pushMock });
  });

  it('deve renderizar o título principal', () => {
    render(<HomePage />);
    expect(screen.getByText(/Bem-vindo ao Painel Administrativo/i)).toBeInTheDocument();
  });

  it('botões devem chamar router.push com as rotas corretas', () => {
    render(<HomePage />);

    fireEvent.click(screen.getByText(/Gerenciar Marcas/i));
    expect(pushMock).toHaveBeenCalledWith('/brands');

    fireEvent.click(screen.getByText(/Gerenciar Categorias/i));
    expect(pushMock).toHaveBeenCalledWith('/categories');

    fireEvent.click(screen.getByText(/Gerenciar Produtos/i));
    expect(pushMock).toHaveBeenCalledWith('/products');
  });
});
