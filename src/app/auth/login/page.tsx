// app/auth/login/page.tsx

'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import Link from 'next/link';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import SocialButton from '@/app/components/ui/SocialButton';
import styles from '../AuthForm.module.css';

export default function LoginPage() {
  const { login, loginWithGoogle, loginWithFacebook, mapAuthError } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fallback local se o provider não expuser mapAuthError
  const mapError = useMemo(
    () =>
      mapAuthError ??
      ((code?: string) => {
        switch (code) {
          case 'auth/invalid-email':
            return 'E-mail inválido.';
          case 'auth/user-not-found':
            return 'Usuário não encontrado.';
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
            return 'E-mail ou senha incorretos.';
          case 'auth/too-many-requests':
            return 'Muitas tentativas. Tente novamente mais tarde.';
          case 'auth/unauthorized-domain':
            return 'Domínio não autorizado nas configurações do Firebase.';
          default:
            return 'Falha na autenticação. Tente novamente.';
        }
      }),
    [mapAuthError]
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const emailTrim = email.trim();
    const passTrim = password.trim();

    if (!emailTrim || !passTrim) {
      setErrorMsg('Preencha e-mail e senha.');
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);
    try {
      const ok = await login(emailTrim, passTrim);
      if (ok) {
        router.push('/employee');
      } else {
        setErrorMsg(mapError());
      }
    } catch (err: any) {
      setErrorMsg(mapError(err?.code));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (submitting) return;
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const ok = await loginWithGoogle();
      if (ok) router.push('/employee');
      else setErrorMsg(mapError());
    } catch (err: any) {
      setErrorMsg(mapError(err?.code));
    } finally {
      setSubmitting(false);
    }
  };

  const handleFacebookLogin = async () => {
    if (submitting) return;
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const ok = await loginWithFacebook();
      if (ok) router.push('/employee');
      else setErrorMsg(mapError());
    } catch (err: any) {
      setErrorMsg(mapError(err?.code));
    } finally {
      setSubmitting(false);
    }
  };

  const isDisabled = submitting || !email.trim() || !password.trim();

  return (
    <div className={styles.container}>
      {/* Lado esquerdo: imagem e texto */}
      <div className={styles.imageSide}>
        <div className={styles.overlay}>
          <h2 className={styles.welcomeTitle}>Compromisso, Agilidade e Excelência</h2>
          <p className={styles.welcomeText}>
            Valorizando inovação, eficiência e confiança em todas as operações.
          </p>
        </div>

        <img src="/assets/auth-banner.png" alt="Employee Management" />
      </div>

      {/* Lado direito: Formulário */}
      <div className={styles.formSide}>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.subtitle}>Bem-vindo! Entre na sua conta ou registre-se para começar.</p>

        {errorMsg && <div className={styles.error}>{errorMsg}</div>}

        <form onSubmit={handleLogin} className={styles.form} noValidate>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
            autoComplete="email"
            inputMode="email"
            aria-label="E-mail"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
            autoComplete="current-password"
            aria-label="Senha"
          />
          <button type="submit" className={styles.btnPrimary} disabled={isDisabled} aria-disabled={isDisabled}>
            {submitting ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <div className={styles.divider}>ou</div>

        <div className={styles.socialButtons}>
          <SocialButton
            icon={FaGoogle}
            color="#DB4437"
            ariaLabel="Entrar com Google"
            onClick={handleGoogleLogin}
            disabled={submitting}
          />
          <SocialButton
            icon={FaFacebookF}
            color="#1877F2"
            ariaLabel="Entrar com Facebook"
            onClick={handleFacebookLogin}
            disabled={submitting}
          />
        </div>
        <p className={styles.text}>
          Não tem uma conta? <Link href="/auth/register" className={styles.link}>Registre-se</Link>
        </p>
      </div>
    </div>
  );
}
