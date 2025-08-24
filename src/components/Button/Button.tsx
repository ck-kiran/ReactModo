/* eslint-disable react-refresh/only-export-components */
import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  _focusRingColor?: string;
  _hoverBackgroundColor?: string;

  _hoverBorderColor?: string;
  _hoverTextColor?: string;
  active?: boolean;
  ariaDescribedBy?: string;
  // Accessibility
  ariaLabel?: string;
  ariaPressed?: boolean;
  // Custom styling props
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;

  borderWidth?: string;
  children: React.ReactNode;
  disabled?: boolean;

  height?: string;
  // Icons and content
  leftIcon?: React.ReactNode;
  // States
  loading?: boolean;

  loadingIcon?: React.ReactNode;
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  // Event handlers
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;

  // Layout and spacing
  padding?: string;
  rightIcon?: React.ReactNode;
  role?: string;
  size?: 'large' | 'medium' | 'small' | 'xl' | 'xs';

  textColor?: string;
  // Preset variants (optional - can be overridden by custom styles)
  variant?:
    | 'danger'
    | 'ghost'
    | 'outline'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning';
  width?: string;
}

export const Button: React.FC<ButtonProps> = ({
  _focusRingColor,
  _hoverBackgroundColor,

  _hoverBorderColor,
  _hoverTextColor,
  active = false,
  ariaDescribedBy,
  // Accessibility
  ariaLabel,
  ariaPressed,
  // Custom styling
  backgroundColor,
  borderColor,
  borderRadius,

  borderWidth,
  children,
  // Standard props
  className = '',

  disabled = false,
  height,
  // Content
  leftIcon,

  // States
  loading = false,
  loadingIcon = '⟳',
  onBlur,
  onClick,

  onFocus,
  // Events
  onKeyDown,
  // Layout
  padding,
  rightIcon,

  role = 'button',
  size = 'medium',
  style = {},
  textColor,

  // Preset props
  variant = 'primary',
  width,
  ...props
}) => {
  // Base styles that are always applied
  const baseStyles =
    'font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Preset variant styles
  const variantStyles = {
    danger:
      'bg-red-600 hover:bg-red-700 text-white border border-transparent focus:ring-red-500',
    ghost:
      'bg-transparent hover:bg-gray-100 text-gray-700 border border-transparent focus:ring-gray-500',
    outline:
      'bg-transparent hover:bg-gray-50 text-gray-700 border border-gray-300 focus:ring-gray-500',
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white border border-transparent focus:ring-blue-500',
    secondary:
      'bg-gray-200 hover:bg-gray-300 text-gray-900 border border-gray-300 focus:ring-gray-500',
    success:
      'bg-green-600 hover:bg-green-700 text-white border border-transparent focus:ring-green-500',
    warning:
      'bg-yellow-500 hover:bg-yellow-600 text-white border border-transparent focus:ring-yellow-500',
  };

  // Preset size styles
  const sizeStyles = {
    large: 'px-6 py-3 text-lg rounded-lg',
    medium: 'px-4 py-2 text-base rounded-md',
    small: 'px-3 py-1.5 text-sm rounded-md',
    xl: 'px-8 py-4 text-xl rounded-lg',
    xs: 'px-2 py-1 text-xs rounded',
  };

  // Build classes - start with base, add variant and size if no custom overrides
  let classes = baseStyles;

  // Add variant styles only if not overridden by custom colors
  if (!backgroundColor && !textColor && !borderColor) {
    classes += ` ${variantStyles[variant]}`;
  }

  // Add size styles only if not overridden by custom padding/border-radius
  if (!padding && !borderRadius) {
    classes += ` ${sizeStyles[size]}`;
  }

  // Add active state
  if (active) {
    classes += ' ring-2 ring-offset-2';
  }

  // Add custom className
  if (className) {
    classes += ` ${className}`;
  }

  // Build custom styles object
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

  // Handle keyboard events for accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    // Enter and Space should trigger the button (default behavior)
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick && !disabled && !loading) {
        onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
      }
    }

    // Call custom onKeyDown if provided
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  const isDisabled = disabled || loading;

  return (
    <button
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      className={classes.trim()}
      disabled={isDisabled}
      onBlur={onBlur}
      onClick={handleClick}
      onFocus={onFocus}
      onKeyDown={handleKeyDown}
      role={role}
      style={customStyles}
      {...props}
    >
      {/* Left icon */}
      {leftIcon && !loading && (
        <span aria-hidden="true" className="flex-shrink-0">
          {leftIcon}
        </span>
      )}

      {/* Loading icon */}
      {loading && (
        <span aria-hidden="true" className="flex-shrink-0 animate-spin">
          {loadingIcon}
        </span>
      )}

      {/* Button text */}
      <span className={loading ? 'opacity-70' : ''}>{children}</span>

      {/* Right icon */}
      {rightIcon && !loading && (
        <span aria-hidden="true" className="flex-shrink-0">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

// CSS-in-JS styles for hover effects when using custom colors
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
