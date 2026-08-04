import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-gold',
  secondary: 'btn-glass',
  danger:
    'border-red-700 bg-gradient-to-b from-red-800 to-red-950 text-red-100 hover:border-red-400 hover:shadow-[0_0_18px_rgb(239_68_68_/_0.3)]',
  success:
    'border-green-700 bg-gradient-to-b from-green-800 to-green-950 text-green-100 hover:border-green-400 hover:shadow-[0_0_18px_rgb(34_197_94_/_0.3)]',
  ghost: 'border-transparent bg-transparent text-game-muted hover:bg-game-hover hover:text-game-text'
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base'
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-lg font-mono font-semibold tracking-wide transition-all duration-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className
      ].join(' ')}
      {...props}
    >
      {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
      <span>{children}</span>
    </button>
  );
};
