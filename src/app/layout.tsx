// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import { CategoryProvider } from "./contexts/CategoryProvider";
import { BrandProvider } from "./contexts/BrandProvider";
import { ProductsProvider } from "./contexts/ProductProvider";

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
        {/* 🔹 CategoryProvider e BrandProvider precisam envolver o ProductProvider */}
        <CategoryProvider>
          <BrandProvider>
            <ProductsProvider>
              <Navbar />
              <main className="container">{children}</main>
              <Footer />
            </ProductsProvider>
          </BrandProvider>
        </CategoryProvider>
      </body>
    </html>
  );
}
