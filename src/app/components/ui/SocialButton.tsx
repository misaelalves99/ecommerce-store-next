// app/components/ui/SocialButton.tsx
'use client';

import { IconType } from 'react-icons';
import styles from './SocialButton.module.css';

interface Props {
  icon: IconType;
  color: string;            // cor de fundo do botão
  onClick?: () => void | Promise<void>;
  ariaLabel: string;        // acessibilidade
  disabled?: boolean;       // permite desativar o botão
}

export default function SocialButton({
  icon: Icon,
  color,
  onClick,
  ariaLabel,
  disabled = false,
}: Props) {
  return (
    <button
      type="button"
      className={styles.socialBtn}
      style={{
        backgroundColor: color,
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onClick={!disabled ? onClick : undefined}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      <Icon className={styles.icon} />
    </button>
  );
}
