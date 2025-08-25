/* eslint-disable react-refresh/only-export-components */
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
    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
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
  variant,
  width,
  ...props
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  // Ripple effect logic
  useEffect(() => {
    if (
      !buttonRef.current?.classList.contains('ripple-variant') ||
      disableRipple
    )
      return;
    const button = buttonRef.current;
    const createRipple = (event: MouseEvent) => {
      const circle = document.createElement('span');
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
      circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
      circle.classList.add('ripple-effect');
      const existingRipple = button.querySelector('.ripple-effect');
      if (existingRipple) existingRipple.remove();
      button.appendChild(circle);
    };
    button.addEventListener('click', createRipple);
    return () => button.removeEventListener('click', createRipple);
  }, [variant, disableRipple]);

  // Set ripple color dynamically based on text color
  useEffect(() => {
    if (variant === 'ripple') {
      const rippleColor = textColor ? textColor : 'rgba(255, 255, 255, 0.7)';
      const styleElement = document.createElement('style');
      styleElement.id = 'dynamic-ripple-color';
      styleElement.textContent = `
        .ripple-variant .ripple-effect {
          background-color: ${rippleColor};
        }
      `;
      document.head.appendChild(styleElement);
      return () => {
        const existingStyle = document.getElementById('dynamic-ripple-color');
        if (existingStyle) existingStyle.remove();
      };
    }
  }, [textColor, variant]);

  const RootComponent = component || (href ? 'a' : 'button');
  const isDisabled = disabled || loading;

  const baseStyles =
    'font-medium transition-all duration-300 focus:outline-none focus-visible:shadow-[0_0_0_4px_rgba(147,197,253,0.5)] inline-flex items-center justify-center gap-2 relative overflow-hidden';

  const variantStyles: Record<string, string> = {
    'animated-subscribe': `border border-transparent ${isSubscribed ? 'bg-gray-500' : 'bg-pink-600 hover:bg-pink-700'}`,
    danger:
      'bg-red-600 hover:bg-red-700 border border-transparent focus:ring-red-500',
    ghost:
      'bg-transparent hover:bg-gray-100 border border-transparent focus:ring-gray-500',
    'hover-reveal': 'bg-black border border-black hover-reveal-button',
    'interactive-hover':
      'bg-black border border-transparent interactive-hover-button',
    outline:
      'bg-transparent hover:bg-gray-50 border border-gray-300 focus:ring-gray-500',
    primary:
      'bg-blue-600 hover:bg-blue-700 border border-transparent focus:ring-blue-500',
    ripple:
      'bg-purple-600 hover:bg-purple-700 border border-transparent focus:ring-purple-500',
    secondary:
      'bg-gray-200 hover:bg-gray-300 border border-gray-300 focus:ring-gray-500',
    shimmer:
      'bg-gray-800 border border-transparent focus:ring-gray-500 shimmer-button',
    success:
      'bg-green-600 hover:bg-green-700 border border-transparent focus:ring-green-500',
    warning:
      'bg-yellow-500 hover:bg-yellow-600 border border-transparent focus:ring-yellow-500',
  };

  const sizeStyles = {
    large: 'px-6 py-3 text-lg rounded-lg',
    medium: 'px-4 py-2 text-base rounded-md',
    small: 'px-3 py-1.5 text-sm rounded-md',
  };

  let classes = baseStyles;

  // Always apply variant class if provided for behavior
  if (variant) {
    classes += ` ${variantStyles[variant] || ''}`;
    if (variant === 'ripple') classes += ' ripple-variant';
  }

  // Apply text color if not set by variant
  if (!textColor && variant) {
    switch (variant) {
      case 'ghost':
      case 'outline':
        classes += ' text-gray-700';
        break;
      case 'secondary':
        classes += ' text-gray-900';
        break;
      default:
        classes += ' text-white';
        break;
    }
  }

  if (!padding && !borderRadius)
    classes += ` ${
      typeof size === 'string' && sizeStyles[size as keyof typeof sizeStyles]
        ? sizeStyles[size as keyof typeof sizeStyles]
        : sizeStyles.medium
    }`;

  if (fullWidth) classes += ' w-full';
  if (!disableElevation) classes += ' shadow-md hover:shadow-lg';
  if (isDisabled) classes += ' opacity-50 cursor-not-allowed';
  if (active) classes += ' ring-2 ring-offset-2';
  if (className) classes += ` ${className}`;

  // If no variant -> fully custom
  if (!variant) {
    classes = `${baseStyles} ${
      sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.medium
    }`;
  }

  const customStyles: React.CSSProperties = {
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

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
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
        <div className="flex items-center justify-center gap-2 relative z-10">
          {isSubscribed ? (
            <>
              <svg
                className="h-5 w-5"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 12l5 5l10 -10" />
              </svg>
              <span>Subscribed</span>
            </>
          ) : (
            <>
              <svg
                className="h-5 w-5"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 12l5 5l10 -10" />
              </svg>
              <span>Subscribe</span>
            </>
          )}
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center gap-2 relative z-10">
        {leftIcon && (
          <span aria-hidden="true" className="flex-shrink-0">
            {leftIcon}
          </span>
        )}
        <span className={loading ? 'opacity-0' : 'opacity-100'}>
          {children}
        </span>
        {endIcon && (
          <span aria-hidden="true" className="flex-shrink-0">
            {endIcon}
          </span>
        )}
      </div>
    );
  };

  return (
    <RootComponent
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      className={classes.trim()}
      disabled={isDisabled}
      href={href}
      onBlur={onBlur}
      onClick={handleClick}
      onFocus={onFocus}
      onKeyDown={handleKeyDown}
      onMouseMove={
        variant === 'interactive-hover' ? handleMouseMove : onMouseMove
      }
      ref={buttonRef}
      role={role}
      style={customStyles}
      {...props}
    >
      {variant === 'interactive-hover' && !isDisabled && (
        <span
          className="interactive-hover-blob"
          style={{ left: hoverPosition.x, top: hoverPosition.y }}
        />
      )}
      {loading && loadingPosition !== 'center' && (
        <div
          className={`absolute inset-0 flex items-center ${
            loadingPosition === 'start'
              ? 'justify-start pl-4'
              : 'justify-end pr-4'
          }`}
        >
          {loadingIndicator}
        </div>
      )}
      {loading && loadingPosition === 'center' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {loadingIndicator}
        </div>
      )}
      {renderContent()}
    </RootComponent>
  );
};

export const InjectButtonStyles = () => {
  useEffect(() => {
    const styleId = 'custom-button-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      .ripple-variant .ripple-effect {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 600ms linear;
      }

      @keyframes ripple-animation { to { transform: scale(4); opacity: 0; } }

      .shimmer-button::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 200%;
        height: 100%;
        transform: skewX(-20deg);
        background-image: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent);
        animation: shimmer-animation 1.5s infinite;
      }

      @keyframes shimmer-animation { 100% { left: 100%; } }
      
      .interactive-hover-button {
        isolation: isolate;
      }
      
      .interactive-hover-blob {
        position: absolute;
        width: 24px;
        height: 24px;
        background: white;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        transition: width 0.3s ease, height 0.3s ease;
        z-index: 0;
        opacity: 0.15;
      }
      
      .interactive-hover-button:hover .interactive-hover-blob {
        width: 200px;
        height: 200px;
      }

      .hover-reveal-button {
        isolation: isolate;
      }

      .hover-reveal-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        z-index: -1;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.3s ease-in-out;
      }

      .hover-reveal-button:hover::before {
        transform: scaleX(1);
      }
    `;
    document.head.appendChild(style);

    return () => {
      const styleElement = document.getElementById(styleId);
      if (styleElement) styleElement.remove();
    };
  }, []);

  return null;
};

export const createButtonHoverStyles = (
  selector: string,
  hoverBackgroundColor?: string,
  hoverTextColor?: string,
  hoverBorderColor?: string,
  focusRingColor?: string
) => {
  return `
    ${selector}:hover:not(:disabled) {
      ${hoverBackgroundColor ? `background-color: ${hoverBackgroundColor} !important;` : ''}
      ${hoverTextColor ? `color: ${hoverTextColor} !important;` : ''}
      ${hoverBorderColor ? `border-color: ${hoverBorderColor} !important;` : ''}
    }
    
    ${selector}:focus:not(:disabled) {
      ${focusRingColor ? `--tw-ring-color: ${focusRingColor};` : ''}
    }
  `;
};
