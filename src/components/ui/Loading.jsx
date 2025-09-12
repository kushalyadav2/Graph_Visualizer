import React from 'react';

/**
 * Loading component with various styles and sizes
 * @param {Object} props - Loading component props
 * @param {string} props.size - Size variant: 'sm', 'md', 'lg'
 * @param {string} props.variant - Style variant: 'spinner', 'dots', 'pulse', 'bars'
 * @param {string} props.color - Color variant: 'primary', 'secondary', 'white'
 * @param {string} props.text - Optional loading text
 * @param {boolean} props.overlay - Whether to show as overlay
 * @param {string} props.className - Additional CSS classes
 */
const Loading = ({
  size = 'md',
  variant = 'spinner',
  color = 'primary',
  text,
  overlay = false,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colorClasses = {
    primary: 'text-blue-600 dark:text-blue-400',
    secondary: 'text-gray-600 dark:text-gray-400',
    white: 'text-white',
  };

  const LoadingSpinner = () => (
    <svg
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  const LoadingDots = () => (
    <div className={`flex space-x-1 ${colorClasses[color]}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${size === 'sm' ? 'w-1 h-1' : size === 'lg' ? 'w-3 h-3' : 'w-2 h-2'} bg-current rounded-full animate-pulse`}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s',
          }}
        ></div>
      ))}
    </div>
  );

  const LoadingPulse = () => (
    <div
      className={`${sizeClasses[size]} bg-current rounded-full animate-pulse ${colorClasses[color]}`}
    ></div>
  );

  const LoadingBars = () => (
    <div className={`flex space-x-1 ${colorClasses[color]}`}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`${size === 'sm' ? 'w-1 h-4' : size === 'lg' ? 'w-2 h-8' : 'w-1.5 h-6'} bg-current rounded-sm animate-pulse`}
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: '1.2s',
          }}
        ></div>
      ))}
    </div>
  );

  const renderLoadingIcon = () => {
    switch (variant) {
      case 'dots':
        return <LoadingDots />;
      case 'pulse':
        return <LoadingPulse />;
      case 'bars':
        return <LoadingBars />;
      default:
        return <LoadingSpinner />;
    }
  };

  const content = (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`} {...props}>
      {renderLoadingIcon()}
      {text && (
        <p className={`text-sm font-medium ${colorClasses[color]}`}>
          {text}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl">
          {content}
        </div>
      </div>
    );
  }

  return content;
};

/**
 * Inline loading component for buttons and small spaces
 */
export const InlineLoading = ({ size = 'sm', color = 'white', className = '' }) => (
  <svg
    className={`animate-spin ${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} ${color === 'white' ? 'text-white' : 'text-current'} ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

/**
 * Skeleton loading component for content placeholders
 */
export const Skeleton = ({ 
  width = 'w-full', 
  height = 'h-4', 
  className = '',
  rounded = 'rounded',
  ...props 
}) => (
  <div
    className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${width} ${height} ${rounded} ${className}`}
    {...props}
  ></div>
);

/**
 * Loading overlay for specific components
 */
export const LoadingOverlay = ({ isLoading, children, text = 'Loading...' }) => (
  <div className="relative">
    {children}
    {isLoading && (
      <div className="absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 flex items-center justify-center rounded-lg">
        <Loading text={text} />
      </div>
    )}
  </div>
);

export default Loading;
