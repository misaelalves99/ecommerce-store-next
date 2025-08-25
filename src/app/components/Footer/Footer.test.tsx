// app/components/Footer/Footer.test.tsx

import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import '@testing-library/jest-dom';

describe('Footer', () => {
  it('deve renderizar o rodapé com o texto correto', () => {
    render(<Footer />);
    
    const footerElement = screen.getByText(/© 2025 Loja Virtual\. Todos os direitos reservados\./i);
    expect(footerElement).toBeInTheDocument();
  });
});
