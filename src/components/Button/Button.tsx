import React, { useEffect, useRef, useState } from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  _focusRingColor?: string;
  _hoverBackgroundColor?: string;
  _hoverBorderColor?: string;
  _hoverTextColor?: string;

  active?: boolean;
  ariaDescribedBy?: string;
  ariaLabel?: string;
  ariaPressed?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  borderWidth?: string;
  children: React.ReactNode;
  classes?: object;
  color?: ButtonColor;
  component?: React.ElementType;
  disabled?: boolean;
  disableElevation?: boolean;
  disableRipple?: boolean;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  height?: string;
  href?: string;
  leftIcon?: React.ReactNode;
  loading?: boolean;
  loadingIndicator?: React.ReactNode;
  loadingPosition?: 'center' | 'end' | 'start';
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  padding?: string;
  role?: string;
  size?: 'large' | 'medium' | 'small' | string;
  textColor?: string;
  variant?:
    | 'animated-subscribe'
    | 'danger'
    | 'ghost'
    | 'hover-reveal'
    | 'interactive-hover'
    | 'outline'
    | 'primary'
    | 'ripple'
    | 'secondary'
    | 'shimmer'
    | 'success'
    | 'warning';
  width?: string;
}

type ButtonColor =
  | 'error'
  | 'info'
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | string;

export const Button: React.FC<ButtonProps> = ({
  _focusRingColor,
  _hoverBackgroundColor,
  _hoverBorderColor,
  _hoverTextColor,

  active = false,
  ariaDescribedBy,
  ariaLabel,
  ariaPressed,

  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,

  children,
  className = '',
  component,
  disabled = false,
  disableElevation = false,
  disableRipple = false,
  endIcon,
  fullWidth = false,
  height,
  href,
  leftIcon,
  loading = false,
  loadingIndicator = (
    <span
      style={{
        animation: 'reactmodo-spin 1s linear infinite',
        border: '2px solid currentColor',
        borderRadius: '50%',
        borderTop: '2px solid transparent',
        display: 'inline-block',
        height: '16px',
        width: '16px',
      }}
    />
  ),
  loadingPosition = 'center',
  onBlur,
  onClick,
  onFocus,
  onKeyDown,
  onMouseMove,
  padding,
  role = 'button',
  size = 'medium',
  style = {},
  textColor,
  variant = 'primary',
  width,
  ...props
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  // Ripple effect logic
  useEffect(() => {
    if (variant !== 'ripple' || disableRipple || !buttonRef.current) return;

    const button = buttonRef.current;
    const createRipple = (event: MouseEvent) => {
      const circle = document.createElement('span');
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      Object.assign(circle.style, {
        animation: 'reactmodo-ripple 600ms linear',
        backgroundColor: textColor || 'rgba(255, 255, 255, 0.7)',
        borderRadius: '50%',
        height: `${diameter}px`,
        left: `${event.clientX - button.offsetLeft - radius}px`,
        pointerEvents: 'none',
        position: 'absolute',
        top: `${event.clientY - button.offsetTop - radius}px`,
        transform: 'scale(0)',
        width: `${diameter}px`,
      });

      const existingRipple = button.querySelector('.reactmodo-ripple-effect');
      if (existingRipple) existingRipple.remove();

      circle.className = 'reactmodo-ripple-effect';
      button.appendChild(circle);

      setTimeout(() => {
        if (circle.parentNode) {
          circle.parentNode.removeChild(circle);
        }
      }, 600);
    };

    button.addEventListener('click', createRipple);
    return () => button.removeEventListener('click', createRipple);
  }, [variant, disableRipple, textColor]);

  const RootComponent = component || (href ? 'a' : 'button');
  const isDisabled = disabled || loading;

  const getBaseStyles = (): React.CSSProperties => ({
    alignItems: 'center',
    border: '1px solid transparent',
    borderRadius: '6px',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: '500',
    gap: '8px',
    justifyContent: 'center',
    lineHeight: '1.5',
    opacity: isDisabled ? 0.6 : 1,
    outline: 'none',
    overflow: 'hidden',
    position: 'relative',
    textDecoration: 'none',
    transition: 'all 0.2s ease-in-out',
    width: fullWidth ? '100%' : width || 'auto',
    ...(padding ? {} : getSizeStyles()),
    ...(!disableElevation && {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }),
    ...getVariantStyles(),
    ...(active && {
      boxShadow:
        '0 0 0 2px rgba(59, 130, 246, 0.5), 0 0 0 4px rgba(59, 130, 246, 0.1)',
    }),
  });

  const getSizeStyles = (): React.CSSProperties => {
    const sizeMap = {
      large: { fontSize: '18px', padding: '12px 24px' },
      medium: { fontSize: '16px', padding: '8px 16px' },
      small: { fontSize: '14px', padding: '6px 12px' },
    };
    return sizeMap[size as keyof typeof sizeMap] || sizeMap.medium;
  };

  const getVariantStyles = (): React.CSSProperties => {
    const variants: Record<string, React.CSSProperties> = {
      'animated-subscribe': {
        backgroundColor: isSubscribed ? '#6b7280' : '#ec4899',
        borderColor: 'transparent',
        color: '#ffffff',
      },
      danger: {
        backgroundColor: backgroundColor || '#dc2626',
        borderColor: borderColor || '#dc2626',
        color: textColor || '#ffffff',
      },
      ghost: {
        backgroundColor: backgroundColor || 'transparent',
        borderColor: 'transparent',
        color: textColor || '#374151',
      },
      'hover-reveal': {
        backgroundColor: backgroundColor || '#000000',
        borderColor: borderColor || '#000000',
        color: textColor || '#ffffff',
      },
      'interactive-hover': {
        backgroundColor: backgroundColor || '#000000',
        borderColor: borderColor || '#000000',
        color: textColor || '#ffffff',
      },
      outline: {
        backgroundColor: backgroundColor || 'transparent',
        borderColor: borderColor || '#d1d5db',
        color: textColor || '#374151',
      },
      primary: {
        backgroundColor: backgroundColor || '#2563eb',
        borderColor: borderColor || '#2563eb',
        color: textColor || '#ffffff',
      },
      ripple: {
        backgroundColor: backgroundColor || '#7c3aed',
        borderColor: borderColor || '#7c3aed',
        color: textColor || '#ffffff',
      },
      secondary: {
        backgroundColor: backgroundColor || '#e5e7eb',
        borderColor: borderColor || '#d1d5db',
        color: textColor || '#374151',
      },
      shimmer: {
        backgroundColor: backgroundColor || '#1f2937',
        borderColor: borderColor || '#1f2937',
        color: textColor || '#ffffff',
      },
      success: {
        backgroundColor: backgroundColor || '#059669',
        borderColor: borderColor || '#059669',
        color: textColor || '#ffffff',
      },
      warning: {
        backgroundColor: backgroundColor || '#d97706',
        borderColor: borderColor || '#d97706',
        color: textColor || '#ffffff',
      },
    };

    return variants[variant] || variants.primary;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === 'interactive-hover') {
      const rect = e.currentTarget.getBoundingClientRect();
      setHoverPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    if (onMouseMove) onMouseMove(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && RootComponent === 'button') {
      e.preventDefault();
      if (onClick && !isDisabled)
        onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
    if (onKeyDown) onKeyDown(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === 'animated-subscribe') setIsSubscribed(prev => !prev);
    if (!isDisabled && onClick) onClick(e);
  };

  const renderContent = () => {
    if (loading && loadingPosition === 'center') return loadingIndicator;

    if (variant === 'animated-subscribe') {
      return (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: '8px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <svg
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
          >
            <path d="M5 12l5 5l10 -10" />
          </svg>
          <span>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
        </div>
      );
    }

    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: '8px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {leftIcon && (
          <span style={{ display: 'flex', flexShrink: 0 }}>{leftIcon}</span>
        )}
        <span style={{ opacity: loading ? 0 : 1 }}>{children}</span>
        {endIcon && (
          <span style={{ display: 'flex', flexShrink: 0 }}>{endIcon}</span>
        )}
      </div>
    );
  };

  const finalStyles: React.CSSProperties = {
    ...getBaseStyles(),
    ...style,
    ...(backgroundColor && { backgroundColor }),
    ...(textColor && { color: textColor }),
    ...(borderColor && { borderColor }),
    ...(borderWidth && { borderWidth }),
    ...(borderRadius && { borderRadius }),
    ...(padding && { padding }),
    ...(width && { width }),
    ...(height && { height }),
  };

  return (
    <>
      {/* Inject keyframes only once */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes reactmodo-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes reactmodo-ripple {
            to { transform: scale(4); opacity: 0; }
          }
          @keyframes reactmodo-shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }
        `,
        }}
      />

      <RootComponent
        {...props}
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        aria-pressed={ariaPressed}
        className={className}
        disabled={isDisabled}
        href={href}
        onBlur={onBlur}
        // onBlur={e => {
        //   if (!isDisabled) {
        //     e.currentTarget.style.boxShadow =
        //       (finalStyles.boxShadow as string) || '';
        //   }
        //   if (onBlur) onBlur(e);
        // }}
        onClick={handleClick}
        onFocus={onFocus}
        // onFocus={e => {
        //   if (!isDisabled) {
        //     const focusColor = _focusRingColor || '#3b82f6';
        //     e.currentTarget.style.boxShadow = `0 0 0 2px ${focusColor}40, 0 0 0 4px ${focusColor}20`;
        //   }
        //   if (onFocus) onFocus(e);
        // }}
        onKeyDown={handleKeyDown}
        onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
          if (!isDisabled && variant === 'hover-reveal') {
            e.currentTarget.style.backgroundColor =
              _hoverBackgroundColor || '#ffffff';
            e.currentTarget.style.color = _hoverTextColor || '#000000';
          } else if (!isDisabled && variant === 'ghost') {
            e.currentTarget.style.backgroundColor =
              _hoverBackgroundColor || '#f3f4f6';
          } else if (!isDisabled && variant === 'outline') {
            e.currentTarget.style.backgroundColor =
              _hoverBackgroundColor || '#f9fafb';
          } else if (!isDisabled && !backgroundColor) {
            const currentBg = finalStyles.backgroundColor as string;
            if (currentBg) {
              e.currentTarget.style.backgroundColor = darkenColor(
                currentBg,
                0.1
              );
            }
          }
          if (_hoverBorderColor && !isDisabled) {
            e.currentTarget.style.borderColor = _hoverBorderColor;
          }
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
          if (!isDisabled) {
            e.currentTarget.style.backgroundColor =
              finalStyles.backgroundColor as string;
            e.currentTarget.style.color = finalStyles.color as string;
            e.currentTarget.style.borderColor =
              finalStyles.borderColor as string;
          }
        }}
        onMouseMove={handleMouseMove}
        ref={buttonRef}
        role={role}
        style={{
          ...finalStyles,
          ...(variant === 'shimmer' &&
            ({
              '::after': {
                animation: 'reactmodo-shimmer 1.5s infinite',
                background:
                  'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent)',
                content: '""',
                height: '100%',
                left: '-100%',
                position: 'absolute',
                top: 0,
                transform: 'skewX(-20deg)',
                width: '200%',
              },
            } as any)),
        }}
      >
        {/* Interactive hover blob */}
        {variant === 'interactive-hover' && !isDisabled && (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <span
            onMouseEnter={(e: React.MouseEvent<HTMLSpanElement>) => {
              if (buttonRef.current?.matches(':hover')) {
                e.currentTarget.style.width = '200px';
                e.currentTarget.style.height = '200px';
              }
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              height: '24px',
              left: hoverPosition.x,
              pointerEvents: 'none',
              position: 'absolute',
              top: hoverPosition.y,
              transform: 'translate(-50%, -50%)',
              transition: 'width 0.3s ease, height 0.3s ease',
              width: '24px',
              zIndex: 0,
            }}
          />
        )}

        {/* Shimmer effect */}
        {variant === 'shimmer' && !isDisabled && (
          <span
            style={{
              animation: 'reactmodo-shimmer 1.5s infinite',
              background:
                'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent)',
              height: '100%',
              left: '-100%',
              pointerEvents: 'none',
              position: 'absolute',
              top: 0,
              transform: 'skewX(-20deg)',
              width: '200%',
            }}
          />
        )}

        {/* Loading indicators */}
        {loading && loadingPosition !== 'center' && (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              inset: 0,
              justifyContent:
                loadingPosition === 'start' ? 'flex-start' : 'flex-end',
              paddingLeft: loadingPosition === 'start' ? '16px' : '0',
              paddingRight: loadingPosition === 'end' ? '16px' : '0',
              position: 'absolute',
            }}
          >
            {loadingIndicator}
          </div>
        )}

        {loading && loadingPosition === 'center' && (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              inset: 0,
              justifyContent: 'center',
              position: 'absolute',
            }}
          >
            {loadingIndicator}
          </div>
        )}

        {renderContent()}
      </RootComponent>
    </>
  );
};

// Helper function to darken colors
const darkenColor = (color: string, amount: number): string => {
  if (color.startsWith('#')) {
    const num = parseInt(color.slice(1), 16);
    const r = Math.max(0, (num >> 16) - Math.round(255 * amount));
    const g = Math.max(0, ((num >> 8) & 0x00ff) - Math.round(255 * amount));
    const b = Math.max(0, (num & 0x0000ff) - Math.round(255 * amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  }
  return color;
};

export default Button;
