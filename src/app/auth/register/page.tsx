'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { useAuth } from '@/app/hooks/useAuth';
import SocialButton from '@/app/components/ui/SocialButton';
import styles from '../AuthForm.module.css';

export default function RegisterPage() {
  const { register, loginWithGoogle, loginWithFacebook } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await register(name, email, password);
    setLoading(false);
    if (success) router.push('/');
  };

  const handleGoogle = async () => {
    setLoading(true);
    const success = await loginWithGoogle();
    setLoading(false);
    if (success) router.push('/');
  };

  const handleFacebook = async () => {
    setLoading(true);
    const success = await loginWithFacebook();
    setLoading(false);
    if (success) router.push('/');
  };

  return (
    <div className={styles.container}>
      {/* Lado esquerdo com imagem e overlay */}
      <div className={styles.imageSide}>
        <div className={styles.overlay}>
          <h2 className={styles.welcomeTitle}>Transformando ideias em soluções eficientes</h2>
          <p className={styles.welcomeText}>
            Inspirando confiança e inovação em cada processo da empresa.
          </p>
        </div>
        <img src="/assets/auth-banner.png" alt="Registro" />
      </div>

      {/* Lado direito com formulário */}
      <div className={styles.formSide}>
        <h1 className={styles.title}>Criar Conta</h1>
        <p className={styles.subtitle}>
          Cadastre-se para acessar o sistema de gerenciamento de funcionários.
        </p>

        <form onSubmit={handleRegister} className={styles.form}>
          <input
            type="text"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />

          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>

        <div className={styles.divider}>ou</div>

        <div className={styles.socialButtons}>
          <SocialButton
            icon={FaGoogle}
            color="#DB4437"
            onClick={handleGoogle}
            ariaLabel="Entrar com Google"
          />
          <SocialButton
            icon={FaFacebookF}
            color="#1877F2"
            onClick={handleFacebook}
            ariaLabel="Entrar com Facebook"
          />
        </div>

        <p className={styles.text}>
          Já possui uma conta?{' '}
          <Link href="/auth/login" className={styles.link}>
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
