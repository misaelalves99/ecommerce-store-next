// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './contexts/AuthProvider';
import ProtectedApp from './ProtectedApp';
import { ProductsProvider } from './contexts/ProductProvider';
import { BrandProvider } from './contexts/BrandProvider';
import { CategoryProvider } from './contexts/CategoryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Painel Administrativo',
  description: 'Sistema de gerenciamento de produtos, marcas e categorias',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <ProductsProvider>
            <BrandProvider>
              <CategoryProvider>
                <ProtectedApp>{children}</ProtectedApp>
              </CategoryProvider>
            </BrandProvider>
          </ProductsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
