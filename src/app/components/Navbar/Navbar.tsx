// app/components/Navbar/Navbar.tsx

'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleNavbar = () => setCollapsed(!collapsed);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={`${styles.navbar} navbar-expand-lg`}>
      <div className={styles["container-navbar"]}>
        <Link href="/" className={styles["navbar-brand"]}>
          Loja Virtual
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarMain"
          aria-expanded={!collapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`${styles["navbar-collapse"]} ${
            collapsed ? styles.collapse : ""
          }`}
          id="navbarMain"
        >
          <ul className={styles["navbar-nav"]}>
            <li className={styles["nav-item"]}>
              <Link
                href="/"
                className={`${styles["nav-link"]} ${
                  isActive("/") ? styles.active : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li className={styles["nav-item"]}>
              <Link
                href="/products"
                className={`${styles["nav-link"]} ${
                  isActive("/products") ? styles.active : ""
                }`}
              >
                Produtos
              </Link>
            </li>
            <li className={styles["nav-item"]}>
              <Link
                href="/category"
                className={`${styles["nav-link"]} ${
                  isActive("/category") ? styles.active : ""
                }`}
              >
                Categorias
              </Link>
            </li>
            <li className={styles["nav-item"]}>
              <Link
                href="/brands"
                className={`${styles["nav-link"]} ${
                  isActive("/brands") ? styles.active : ""
                }`}
              >
                Marcas
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
