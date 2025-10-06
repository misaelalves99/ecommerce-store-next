// src/app/components/Navbar/Navbar.tsx
'use client';

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/app/hooks/useAuth";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleNavbar = () => setCollapsed(!collapsed);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.containerNavbar}>
        {/* Logo */}
        <Link href="/" className={styles.navbarBrand}>
          Loja Virtual
        </Link>

        {/* Menu + Perfil wrapper */}
        <div className={styles.navbarMenuProfileWrapper}>
          {/* Toggle Mobile */}
          <button
            className={styles.navbarToggler}
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarMain"
            aria-expanded={!collapsed}
            aria-label="Toggle navigation"
          >
            <span className={styles.navbarTogglerIcon}></span>
          </button>

          {/* Links */}
          <div
            className={`${styles.navbarCollapse} ${collapsed ? styles.collapse : ""}`}
            id="navbarMain"
          >
            <ul className={styles.navbarNav}>
              <li className={styles.navItem}>
                <Link
                  href="/"
                  className={`${styles.navLink} ${isActive("/") ? styles.active : ""}`}
                  onClick={() => setCollapsed(false)}
                >
                  Home
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  href="/products"
                  className={`${styles.navLink} ${isActive("/products") ? styles.active : ""}`}
                  onClick={() => setCollapsed(false)}
                >
                  Produtos
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  href="/category"
                  className={`${styles.navLink} ${isActive("/category") ? styles.active : ""}`}
                  onClick={() => setCollapsed(false)}
                >
                  Categorias
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  href="/brands"
                  className={`${styles.navLink} ${isActive("/brands") ? styles.active : ""}`}
                  onClick={() => setCollapsed(false)}
                >
                  Marcas
                </Link>
              </li>
            </ul>
          </div>

          {/* Perfil */}
          <div className={styles.profileWrapper} ref={profileRef}>
            <button
              className={styles.profileBtn}
              onClick={toggleProfile}
              aria-label="Abrir menu de perfil"
            >
              <FaUserCircle size={28} />
            </button>

            {profileOpen && (
              <div className={styles.profileMenu}>
                <button
                  className={styles.profileMenuItem}
                  onClick={handleLogout}
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
