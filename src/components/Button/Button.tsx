import * as React from 'react';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
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

// Keyframes as a constant to avoid re-injecting
const KEYFRAMES = `
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
  @keyframes reactmodo-hover-reveal {
    0% { transform: translateY(100%); }
    100% { transform: translateY(0%); }
  }
`;

let stylesInjected = false;

const injectStyles = () => {
  if (stylesInjected || typeof document === 'undefined') return;

  const styleId = 'reactmodo-keyframes';
  if (document.getElementById(styleId)) {
    stylesInjected = true;
    return;
  }

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = KEYFRAMES;
  document.head.appendChild(style);
  stylesInjected = true;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
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
      loadingIndicator,
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
    },
    ref
  ) => {
    const [isSubscribed, setIsSubscribed] = React.useState(false);
    const [hoverPosition, setHoverPosition] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    // Merge refs
    React.useImperativeHandle(ref, () => buttonRef.current!);

    // Default loading indicator
    const defaultLoadingIndicator = React.useMemo(
      () =>
        React.createElement('span', {
          style: {
            animation: 'reactmodo-spin 1s linear infinite',
            border: '2px solid currentColor',
            borderRadius: '50%',
            borderTop: '2px solid transparent',
            display: 'inline-block',
            height: '16px',
            width: '16px',
          },
        }),
      []
    );

    const finalLoadingIndicator = loadingIndicator || defaultLoadingIndicator;

    // Inject styles on mount
    React.useEffect(() => {
      injectStyles();
    }, []);

    // Ripple effect logic
    React.useEffect(() => {
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
          zIndex: '0',
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

    const getBaseStyles = React.useCallback((): React.CSSProperties => {
      const sizeMap = {
        large: { fontSize: '18px', padding: '12px 24px' },
        medium: { fontSize: '16px', padding: '8px 16px' },
        small: { fontSize: '14px', padding: '6px 12px' },
      };

      const sizeStyles =
        sizeMap[size as keyof typeof sizeMap] || sizeMap.medium;

      return {
        alignItems: 'center',
        border: '1px solid transparent',
        borderRadius: borderRadius || '6px',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        fontFamily: 'inherit',
        fontSize: sizeStyles.fontSize,
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
        ...(padding ? { padding } : { padding: sizeStyles.padding }),
        ...(borderWidth && { borderWidth }),
        ...(height && { height }),
        ...(!disableElevation && {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }),
        ...(active && {
          boxShadow:
            '0 0 0 2px rgba(59, 130, 246, 0.5), 0 0 0 4px rgba(59, 130, 246, 0.1)',
        }),
      };
    }, [
      size,
      padding,
      isDisabled,
      fullWidth,
      width,
      disableElevation,
      active,
      borderRadius,
      borderWidth,
      height,
    ]);

    const getVariantStyles = React.useCallback((): React.CSSProperties => {
      const variants: Record<string, React.CSSProperties> = {
        'animated-subscribe': {
          backgroundColor:
            backgroundColor || (isSubscribed ? '#6b7280' : '#ec4899'),
          borderColor: borderColor || 'transparent',
          color: textColor || '#ffffff',
        },
        danger: {
          backgroundColor: backgroundColor || '#dc2626',
          borderColor: borderColor || '#dc2626',
          color: textColor || '#ffffff',
        },
        ghost: {
          backgroundColor: backgroundColor || 'transparent',
          borderColor: borderColor || 'transparent',
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
    }, [variant, backgroundColor, textColor, borderColor, isSubscribed]);

    // const getHoverStyles = React.useCallback((): React.CSSProperties => {
    //   if (isDisabled || !isHovered) return {};

    //   const hoverStyles: React.CSSProperties = {};

    //   // Apply hover background color
    //   if (_hoverBackgroundColor) {
    //     hoverStyles.backgroundColor = _hoverBackgroundColor;
    //   }

    //   // Apply hover text color
    //   if (_hoverTextColor) {
    //     hoverStyles.color = _hoverTextColor;
    //   }

    //   // Apply hover border color
    //   if (_hoverBorderColor) {
    //     hoverStyles.borderColor = _hoverBorderColor;
    //   }

    //   // Default hover effects for each variant
    //   if (!_hoverBackgroundColor && !_hoverTextColor && !_hoverBorderColor) {
    //     const variantHoverEffects: Record<string, React.CSSProperties> = {
    //       danger: {
    //         backgroundColor: '#b91c1c',
    //         boxShadow: '0 4px 12px rgba(220, 38, 38, 0.4)',
    //         transform: 'translateY(-1px)',
    //       },
    //       ghost: {
    //         backgroundColor: '#f3f4f6',
    //       },
    //       outline: {
    //         backgroundColor: '#f3f4f6',
    //         borderColor: '#9ca3af',
    //       },
    //       primary: {
    //         backgroundColor: '#1d4ed8',
    //         boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
    //         transform: 'translateY(-1px)',
    //       },
    //       secondary: {
    //         backgroundColor: '#d1d5db',
    //         color: '#111827',
    //       },
    //       success: {
    //         backgroundColor: '#047857',
    //         boxShadow: '0 4px 12px rgba(5, 150, 105, 0.4)',
    //         transform: 'translateY(-1px)',
    //       },
    //       warning: {
    //         backgroundColor: '#b45309',
    //         boxShadow: '0 4px 12px rgba(217, 119, 6, 0.4)',
    //         transform: 'translateY(-1px)',
    //       },
    //     };

    //     return variantHoverEffects[variant] || {};
    //   }

    //   return hoverStyles;
    // }, [
    //   isDisabled,
    //   isHovered,
    //   _hoverBackgroundColor,
    //   _hoverTextColor,
    //   _hoverBorderColor,
    //   variant,
    // ]);

    const handleMouseEnter = React.useCallback(() => {
      setIsHovered(true);
    }, []);

    const handleMouseLeave = React.useCallback(() => {
      setIsHovered(false);
    }, []);

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (variant === 'interactive-hover') {
          const rect = e.currentTarget.getBoundingClientRect();
          setHoverPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }
        if (onMouseMove) onMouseMove(e);
      },
      [variant, onMouseMove]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (
          (e.key === 'Enter' || e.key === ' ') &&
          RootComponent === 'button'
        ) {
          e.preventDefault();
          if (onClick && !isDisabled)
            onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
        }
        if (onKeyDown) onKeyDown(e);
      },
      [onClick, onKeyDown, isDisabled, RootComponent]
    );

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (variant === 'animated-subscribe') setIsSubscribed(prev => !prev);
        if (!isDisabled && onClick) onClick(e);
      },
      [variant, isDisabled, onClick]
    );

    const renderContent = React.useCallback(() => {
      if (loading && loadingPosition === 'center') return finalLoadingIndicator;

      if (variant === 'animated-subscribe') {
        return React.createElement(
          'div',
          {
            style: {
              alignItems: 'center',
              display: 'flex',
              gap: '8px',
              position: 'relative',
              zIndex: 10,
            },
          },
          React.createElement(
            'svg',
            {
              fill: 'none',
              height: '20',
              stroke: 'currentColor',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '2',
              viewBox: '0 0 24 24',
              width: '20',
            },
            React.createElement('path', { d: 'M5 12l5 5l10 -10' })
          ),
          React.createElement(
            'span',
            null,
            isSubscribed ? 'Subscribed' : 'Subscribe'
          )
        );
      }

      return React.createElement(
        'div',
        {
          style: {
            alignItems: 'center',
            display: 'flex',
            gap: '8px',
            position: 'relative',
            zIndex: 10,
          },
        },
        leftIcon &&
          React.createElement(
            'span',
            { style: { display: 'flex', flexShrink: 0 } },
            leftIcon
          ),
        loading && loadingPosition === 'start' && finalLoadingIndicator,
        React.createElement(
          'span',
          {
            style: { opacity: loading && loadingPosition === 'center' ? 0 : 1 },
          },
          children
        ),
        loading && loadingPosition === 'end' && finalLoadingIndicator,
        endIcon &&
          React.createElement(
            'span',
            { style: { display: 'flex', flexShrink: 0 } },
            endIcon
          )
      );
    }, [
      loading,
      loadingPosition,
      finalLoadingIndicator,
      variant,
      isSubscribed,
      leftIcon,
      children,
      endIcon,
    ]);

    const finalStyles: React.CSSProperties = React.useMemo(
      () => ({
        ...getBaseStyles(),
        ...getVariantStyles(),
        // ...getHoverStyles(),
        ...style,
      }),
      [getBaseStyles, getVariantStyles, style]
    );

    return React.createElement(
      RootComponent,
      {
        ...props,
        'aria-describedby': ariaDescribedBy,
        'aria-label': ariaLabel,
        'aria-pressed': ariaPressed,
        className,
        disabled: isDisabled,
        href,
        onBlur,
        onClick: handleClick,
        onFocus,
        onKeyDown: handleKeyDown,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseMove: handleMouseMove,
        ref: buttonRef,
        role,
        style: finalStyles,
      },
      // Hover reveal effect overlay
      variant === 'hover-reveal' &&
        !isDisabled &&
        React.createElement('span', {
          style: {
            backgroundColor:
              _hoverBackgroundColor || 'rgba(255, 255, 255, 0.1)',
            bottom: 0,
            left: 0,
            pointerEvents: 'none',
            position: 'absolute',
            right: 0,
            top: isHovered ? 0 : '100%',
            transition: 'top 0.3s ease-in-out',
            zIndex: 1,
          },
        }),

      // Interactive hover blob
      variant === 'interactive-hover' &&
        !isDisabled &&
        React.createElement('span', {
          style: {
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '50%',
            height: isHovered ? '80px' : '24px',
            left: hoverPosition.x,
            pointerEvents: 'none',
            position: 'absolute',
            top: hoverPosition.y,
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.3s ease, height 0.3s ease',
            width: isHovered ? '80px' : '24px',
            zIndex: 1,
          },
        }),

      // Shimmer effect
      variant === 'shimmer' &&
        !isDisabled &&
        React.createElement('span', {
          style: {
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
            zIndex: 1,
          },
        }),

      // Focus ring
      active &&
        _focusRingColor &&
        React.createElement('span', {
          style: {
            border: `2px solid ${_focusRingColor}`,
            borderRadius: 'inherit',
            bottom: '-4px',
            left: '-4px',
            pointerEvents: 'none',
            position: 'absolute',
            right: '-4px',
            top: '-4px',
            zIndex: -1,
          },
        }),

      renderContent()
    );
  }
);

Button.displayName = 'Button';
