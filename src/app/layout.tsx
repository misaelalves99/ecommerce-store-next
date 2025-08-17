// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import { ProductProvider } from "./contexts/ProductProvider";
import { BrandProvider } from "./contexts/BrandProvider";
import { CategoryProvider } from "./contexts/CategoryProvider";

export const metadata: Metadata = {
  title: "Painel Administrativo",
  description: "Sistema de gerenciamento de produtos, marcas e categorias",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ProductProvider>
          <BrandProvider>
            <CategoryProvider>
              <Navbar />
              <main className="container" style={{ paddingTop: 20 }}>
                {children}
              </main>
              <Footer />
            </CategoryProvider>
          </BrandProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
