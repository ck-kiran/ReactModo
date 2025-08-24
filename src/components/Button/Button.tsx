import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Preset variants (optional - can be overridden by custom styles)
  variant?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'ghost'
    | 'outline';
  size?: 'xs' | 'small' | 'medium' | 'large' | 'xl';

  // Custom styling props
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: string;
  borderRadius?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  hoverBorderColor?: string;
  focusRingColor?: string;

  // Layout and spacing
  padding?: string;
  width?: string;
  height?: string;

  // States
  loading?: boolean;
  disabled?: boolean;
  active?: boolean;

  // Icons and content
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loadingIcon?: React.ReactNode;
  children: React.ReactNode;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaPressed?: boolean;
  role?: string;

  // Event handlers
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  // Preset props
  variant = 'primary',
  size = 'medium',

  // Custom styling
  backgroundColor,
  textColor,
  borderColor,
  borderWidth,
  borderRadius,
  hoverBackgroundColor,
  hoverTextColor,
  hoverBorderColor,
  focusRingColor,

  // Layout
  padding,
  width,
  height,

  // States
  loading = false,
  disabled = false,
  active = false,

  // Content
  leftIcon,
  rightIcon,
  loadingIcon = '⟳',
  children,

  // Accessibility
  ariaLabel,
  ariaDescribedBy,
  ariaPressed,
  role = 'button',

  // Events
  onKeyDown,
  onFocus,
  onBlur,
  onClick,

  // Standard props
  className = '',
  style = {},
  ...props
}) => {
  // Base styles that are always applied
  const baseStyles =
    'font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Preset variant styles
  const variantStyles = {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white border border-transparent focus:ring-blue-500',
    secondary:
      'bg-gray-200 hover:bg-gray-300 text-gray-900 border border-gray-300 focus:ring-gray-500',
    danger:
      'bg-red-600 hover:bg-red-700 text-white border border-transparent focus:ring-red-500',
    success:
      'bg-green-600 hover:bg-green-700 text-white border border-transparent focus:ring-green-500',
    warning:
      'bg-yellow-500 hover:bg-yellow-600 text-white border border-transparent focus:ring-yellow-500',
    ghost:
      'bg-transparent hover:bg-gray-100 text-gray-700 border border-transparent focus:ring-gray-500',
    outline:
      'bg-transparent hover:bg-gray-50 text-gray-700 border border-gray-300 focus:ring-gray-500',
  };

  // Preset size styles
  const sizeStyles = {
    xs: 'px-2 py-1 text-xs rounded',
    small: 'px-3 py-1.5 text-sm rounded-md',
    medium: 'px-4 py-2 text-base rounded-md',
    large: 'px-6 py-3 text-lg rounded-lg',
    xl: 'px-8 py-4 text-xl rounded-lg',
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
        onClick(e as any);
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
      className={classes.trim()}
      style={customStyles}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-pressed={ariaPressed}
      role={role}
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={handleClick}
      {...props}
    >
      {/* Left icon */}
      {leftIcon && !loading && (
        <span className="flex-shrink-0" aria-hidden="true">
          {leftIcon}
        </span>
      )}

      {/* Loading icon */}
      {loading && (
        <span className="flex-shrink-0 animate-spin" aria-hidden="true">
          {loadingIcon}
        </span>
      )}

      {/* Button text */}
      <span className={loading ? 'opacity-70' : ''}>{children}</span>

      {/* Right icon */}
      {rightIcon && !loading && (
        <span className="flex-shrink-0" aria-hidden="true">
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
