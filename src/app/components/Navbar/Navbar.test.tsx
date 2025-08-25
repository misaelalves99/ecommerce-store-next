// app/components/Navbar/Navbar.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import '@testing-library/jest-dom';
import * as nextNavigation from 'next/navigation';
import React from 'react';

// Mock do usePathname
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Navbar', () => {
  const usePathnameMock = nextNavigation.usePathname as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar todos os links corretamente', () => {
    usePathnameMock.mockReturnValue('/');
    render(<Navbar />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Produtos')).toBeInTheDocument();
    expect(screen.getByText('Categorias')).toBeInTheDocument();
    expect(screen.getByText('Marcas')).toBeInTheDocument();

    const logo = screen.getByAltText('Ecommerce');
    expect(logo).toBeInTheDocument();
  });

  it('deve marcar o link ativo corretamente', () => {
    usePathnameMock.mockReturnValue('/products');
    render(<Navbar />);

    const produtosLink = screen.getByText('Produtos');
    // Assumindo que a classe 'active' ou similar é aplicada
    expect(produtosLink).toHaveClass('active'); // Usando toHaveClass do jest-dom

    const homeLink = screen.getByText('Home');
    expect(homeLink).not.toHaveClass('active'); // Usando toHaveClass do jest-dom
  });

  it('deve alternar a navbar ao clicar no botão de toggle', () => {
    usePathnameMock.mockReturnValue('/');
    render(<Navbar />);

    const toggleButton = screen.getByRole('button', { name: /toggle navigation/i });
    // A forma mais robusta é adicionar um data-testid ao elemento da navbar que colapsa.
    // Ex: <div data-testid="navbar-collapse" className={isCollapsed ? 'collapse' : ''}>...</div>
    const collapseDiv = screen.getByTestId('navbar-collapse'); // <-- Mudei aqui

    // Inicialmente, esperamos que não tenha a classe 'collapse'
    expect(collapseDiv).not.toHaveClass('collapse');

    fireEvent.click(toggleButton);
    // Após o clique, esperamos que tenha a classe 'collapse'
    expect(collapseDiv).toHaveClass('collapse');

    fireEvent.click(toggleButton);
    // Após outro clique, esperamos que não tenha mais a classe 'collapse'
    expect(collapseDiv).not.toHaveClass('collapse');
  });
});
